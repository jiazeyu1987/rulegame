import type { GameState, Condition, WinLevel, DeathReason, EvaluationResult } from '../types/game';

/**
 * 条件评估引擎
 * 负责评估游戏中的通关和死亡条件
 */
export class ConditionEvaluator {
  private conditions: Condition[] = [];
  private cache: Map<string, EvaluationResult> = new Map();
  private cacheTimeout = 1000; // 1秒缓存
  private debugMode = false; // 调试模式

  constructor(conditions: Condition[], debugMode: boolean = false) {
    // 按优先级降序排序，高优先级条件先处理
    this.conditions = conditions.sort((a, b) => b.priority - a.priority);
    this.debugMode = debugMode;
  }

  /**
   * 评估所有条件
   */
  evaluateConditions(state: GameState): EvaluationResult {
    const cacheKey = this.generateCacheKey(state);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached;
    }

    const result = this.performEvaluation(state);
    this.cache.set(cacheKey, result);
    return result;
  }

  /**
   * 检查通关条件
   */
  checkWinConditions(state: GameState): WinLevel | null {
    for (const condition of this.conditions) {
      if (condition.type === 'win' && this.evaluateExpression(condition.expression, state)) {
        return condition.level!;
      }
    }
    return null;
  }

  /**
   * 检查死亡条件
   */
  checkDeathConditions(state: GameState): DeathReason | null {
    for (const condition of this.conditions) {
      if (condition.type === 'death' && this.evaluateExpression(condition.expression, state)) {
        return this.parseDeathReason(condition.expression);
      }
    }
    return null;
  }

  /**
   * 验证条件表达式
   */
  static validateConditionExpression(expr: string): { valid: boolean; error?: string } {
    try {
      // 简单的语法验证 - 检查括号平衡
      let leftParentheses = 0;
      let rightParentheses = 0;
      
      for (const char of expr) {
        if (char === '(') leftParentheses++;
        if (char === ')') rightParentheses++;
      }
      
      if (leftParentheses !== rightParentheses) {
        throw new Error('Unbalanced parentheses');
      }

      // 尝试解析表达式结构
      new ConditionEvaluator([]).parseExpression(expr);
      
      return { valid: true };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }

  /**
   * 执行条件评估
   */
  private performEvaluation(state: GameState): EvaluationResult {
    const triggeredConditions: Condition[] = [];
    let winLevel: WinLevel | undefined;
    let deathReason: DeathReason | undefined;
    let maxPriority = -1;

    for (const condition of this.conditions) {
      if (this.evaluateExpression(condition.expression, state)) {
        triggeredConditions.push(condition);
        
        if (condition.priority > maxPriority) {
          maxPriority = condition.priority;
          
          if (condition.type === 'win') {
            winLevel = condition.level;
            deathReason = undefined;
          } else if (condition.type === 'death') {
            deathReason = this.parseDeathReason(condition.expression);
            winLevel = undefined;
          }
        }
      }
    }

    return {
      winLevel,
      deathReason,
      triggeredConditions,
      priority: maxPriority,
      timestamp: Date.now()
    };
  }

  /**
   * 评估表达式 - 优化错误处理
   */
  private evaluateExpression(expr: string, state: GameState): boolean {
    try {
      // 替换属性引用和函数调用
      const processedExpr = this.processExpression(expr, state);
      
      // Debug logging for troubleshooting
      if (this.debugMode || process.env.NODE_ENV === 'development') {
        console.log(`Evaluating expression: ${expr}`);
        console.log(`Processed expression: ${processedExpr}`);
      }
      
      // 安全评估处理后的表达式
      const result = this.safeEvaluate(processedExpr);
      
      if (this.debugMode || process.env.NODE_ENV === 'development') {
        console.log(`Result: ${result}`);
      }
      
      return result;
    } catch (error) {
      // 只在开发环境或调试模式下输出详细错误信息
      if (process.env.NODE_ENV === 'development' || this.debugMode) {
        console.warn('Expression evaluation failed:', expr, error);
      }
      return false;
    }
  }

  /**
   * 处理表达式，替换变量引用 - 修复版本，支持直接属性访问
   */
  private processExpression(expr: string, state: GameState): string {
    let processedExpr = expr;
    
    if (this.debugMode || process.env.NODE_ENV === 'development') {
      console.log(`Original expression: ${expr}`);
    }
    
    // 首先处理直接属性访问: sanity -> attributes.sanity
    // 修复：确保不匹配已经带有attributes.前缀的属性
    const directAttrPatterns = ['health', 'hunger', 'sanity', 'intelligence', 'strength', 'speed', 'luck', 'profession'];
    directAttrPatterns.forEach(attr => {
      // 使用负向前瞻确保不匹配attributes.health中的health
      const regex = new RegExp(`(?<!attributes\\.)\\b${attr}\\b`, 'g');
      processedExpr = processedExpr.replace(regex, `attributes.${attr}`);
    });
    
    if (this.debugMode || process.env.NODE_ENV === 'development') {
      console.log(`After direct attribute replacement: ${processedExpr}`);
    }
    
    // 替换属性访问: attributes.health -> 85
    processedExpr = processedExpr.replace(/attributes\.(\w+)/g, (match, attr) => {
      const value = (state.attributes as any)[attr];
      const result = value !== undefined ? String(value) : '0';
      if (this.debugMode || process.env.NODE_ENV === 'development') {
        console.log(`Replacing ${match} with ${result} (attr: ${attr}, value: ${value})`);
      }
      return result;
    });
    
    if (this.debugMode || process.env.NODE_ENV === 'development') {
      console.log(`After attribute value replacement: ${processedExpr}`);
    }
    
    // 替换库存长度: inventory.length -> 3
    processedExpr = processedExpr.replace(/inventory\.length/g, String(state.inventory.length));
    
    // 替换库存包含检查: inventory.includes("item") -> true/false
    processedExpr = processedExpr.replace(/inventory\.includes\(['"](.+?)['"]\)/g, (match, item) => {
      return String(state.inventory.includes(item));
    });
    
    // 替换标记访问: flags.xxx -> true/false
    processedExpr = processedExpr.replace(/flags\.(\w+)/g, (match, flag) => {
      return String(state.flags[flag] || false);
    });
    
    // 替换基本状态
    processedExpr = processedExpr.replace(/\bday\b/g, String(state.day));
    processedExpr = processedExpr.replace(/\btime\b/g, String(state.time));
    processedExpr = processedExpr.replace(/\blocation\b/g, `'${state.location}'`);

    if (this.debugMode || process.env.NODE_ENV === 'development') {
      console.log(`Final processed expression: ${processedExpr}`);
    }

    return processedExpr;
  }

  /**
   * 安全评估处理后的表达式 - 修复版本，允许游戏相关属性访问
   */
  private safeEvaluate(expr: string): boolean {
    try {
      // 检查是否包含危险的函数调用和关键字
      const dangerousPatterns = [
        /\b(eval|Function|setTimeout|setInterval|require|module|exports|global|process|constructor|prototype|__proto__)\b/,
        /\b(delete|void|with|debugger)\b/,
        /\\/,  // 阻止转义字符
        /\$/,  // 阻止jQuery等
        /\[\s*['"]\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*['"]\s*\]/,  // 阻止数组访问：['key'] 或 ["key"]
        /\[\s*[0-9]+\s*\]/,  // 阻止数字索引访问：[0]
        /\{\s*[a-zA-Z_$]/   // 阻止对象构造：{key
      ];

      // 首先检查危险模式
      for (const pattern of dangerousPatterns) {
        if (pattern.test(expr)) {
          if (this.debugMode) {
            console.warn('Expression contains dangerous patterns:', expr);
          }
          return false;
        }
      }

      // 使用Function构造器安全评估
      const result = new Function(`return (${expr})`)();
      return Boolean(result);
    } catch (error) {
      if (this.debugMode) {
        console.warn('Expression evaluation failed:', expr, error);
      }
      return false;
    }
  }

  /**
   * 解析表达式（用于验证）
   */
  private parseExpression(expr: string): void {
    // 检查基本的语法正确性 - 检查括号平衡
    let leftParentheses = 0;
    let rightParentheses = 0;
    
    for (const char of expr) {
      if (char === '(') leftParentheses++;
      if (char === ')') rightParentheses++;
    }
    
    if (leftParentheses !== rightParentheses) {
      throw new Error('Unbalanced parentheses');
    }

    // 检查是否包含不安全的字符模式
    const unsafePatterns = [
      /\b(eval|Function|setTimeout|setInterval|require|module|exports|global|process)\b/,
      /\b(delete|void|with)\b/,
      /[{};]/,
      /\$/
    ];

    for (const pattern of unsafePatterns) {
      if (pattern.test(expr)) {
        throw new Error('Expression contains unsafe patterns');
      }
    }

    // 检查表达式是否完整 - 不能以下列操作符结尾
    const incompletePatterns = [
      /[+\-*/%]$/,     // 以算术运算符结尾
      /[=<>!]$/,       // 以比较运算符结尾
      /&&$/,           // 以逻辑与结尾
      /\|\|$/,         // 以逻辑或结尾
      /\.$/,           // 以点号结尾
      /\b(and|or|not)$/i  // 以逻辑关键字结尾
    ];

    for (const pattern of incompletePatterns) {
      if (pattern.test(expr.trim())) {
        throw new Error('Expression appears to be incomplete');
      }
    }

    // 检查是否有不完整的函数调用或属性访问
    if (/\w+\.$/.test(expr.trim())) {
      throw new Error('Expression contains incomplete property access');
    }

    if (/\w+\($/.test(expr.trim())) {
      throw new Error('Expression contains incomplete function call');
    }
  }

  /**
   * 解析死亡原因
   */
  private parseDeathReason(expr: string): DeathReason {
    if (expr.includes('health')) return 'health_zero';
    if (expr.includes('sanity')) return 'sanity_zero';
    if (expr.includes('hunger')) return 'hunger_zero';
    if (expr.includes('rule')) return 'rule_violation';
    return 'special_event';
  }

  /**
   * 生成缓存键
   */
  private generateCacheKey(state: GameState): string {
    return JSON.stringify({
      attributes: state.attributes,
      inventory: state.inventory,
      flags: state.flags,
      day: state.day,
      time: state.time,
      location: state.location
    });
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 获取统计信息
   */
  getStats(): { cacheSize: number; conditionCount: number } {
    return {
      cacheSize: this.cache.size,
      conditionCount: this.conditions.length
    };
  }
}

/**
 * 条件评估器工厂函数
 */
export function createConditionEvaluator(conditions: Condition[]): ConditionEvaluator {
  return new ConditionEvaluator(conditions);
}

/**
 * 创建标准游戏条件评估器
 */
export function createStandardConditionEvaluator(): ConditionEvaluator {
  const standardConditions: Condition[] = [
    {
      id: 'win_s',
      type: 'win',
      level: 'S',
      expression: 'day >= 7 && attributes.health >= 80 && attributes.sanity >= 80 && inventory.includes("golden_key")',
      priority: 100,
      description: '完美通关：存活7天且保持高属性并获得黄金钥匙',
      message: '恭喜！你以完美的表现通关了游戏！'
    },
    {
      id: 'win_a',
      type: 'win',
      level: 'A',
      expression: 'day >= 7 && attributes.health >= 60 && attributes.sanity >= 60',
      priority: 90,
      description: '优秀通关：存活7天且保持良好状态',
      message: '很好！你成功通关了游戏！'
    },
    {
      id: 'win_b',
      type: 'win',
      level: 'B',
      expression: 'day >= 7',
      priority: 80,
      description: '普通通关：存活7天',
      message: '你勉强通关了游戏。'
    },
    {
      id: 'win_c',
      type: 'win',
      level: 'C',
      expression: 'day >= 5 && attributes.health > 0',
      priority: 70,
      description: '勉强通关：存活5天',
      message: '你以最低标准通关了游戏。'
    },
    {
      id: 'death_health',
      type: 'death',
      expression: 'attributes.health <= 0',
      priority: 1000,
      description: '生命值归零死亡',
      message: '你的生命走到了尽头...'
    },
    {
      id: 'death_sanity',
      type: 'death',
      expression: 'attributes.sanity <= 0',
      priority: 1000,
      description: '理智值归零死亡',
      message: '你的精神崩溃了...'
    },
    {
      id: 'death_hunger',
      type: 'death',
      expression: 'attributes.hunger <= 0',
      priority: 1000,
      description: '饥饿死亡',
      message: '你被饿死了...'
    }
  ];

  return new ConditionEvaluator(standardConditions);
}