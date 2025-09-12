// 游戏状态接口
export interface GameState {
  time: number;
  profession: Profession;
  hunger: number;
  energy: number;
  sanity: number;
  intelligence: number;
  strength: number;
  speed: number;
  luck: number;
  inventory?: string[];
  flags?: Record<string, boolean>;
  day?: number;
  location?: string;
  attributes?: PlayerAttributes;
}

// 玩家属性接口
export interface PlayerAttributes {
  health: number;        // 生命值 (0-100)
  sanity: number;        // 理智值 (0-100)
  hunger: number;        // 饱食度 (0-100)
  intelligence: number;  // 智力 (0-100)
  strength: number;      // 力量 (0-100)
  speed: number;         // 速度 (0-100)
  luck: number;          // 运气 (0-100)
  profession: Profession; // 职业
}

// 职业类型
export type Profession = '学生' | '老人' | '残疾人' | '律师' | '医生' | '教师' | '工人' | '警察' | '艺术家' | '商人' | string;

// 条件评估结果
export interface EvaluationResult {
  winLevel?: WinLevel;    // 'S' | 'A' | 'B' | 'C'
  deathReason?: DeathReason;
  triggeredConditions: Condition[];
  priority: number;
  timestamp: number;
}

// 通关等级
export type WinLevel = 'S' | 'A' | 'B' | 'C';

// 死亡原因
export type DeathReason = 'health_zero' | 'sanity_zero' | 'hunger_zero' | 'rule_violation' | 'special_event';

// 条件接口
export interface Condition {
  id: string;
  type: 'win' | 'death';
  level?: WinLevel;
  expression: string;
  priority: number;
  description: string;
  message: string;
}

// 条件类型
export type ConditionType = 'win' | 'death';

// 验证结果
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// 游戏结束类型
export type GameEndType = 'win' | 'death' | 'ongoing';

// 游戏结束信息
export interface GameEndInfo {
  type: GameEndType;
  winLevel?: WinLevel;
  deathReason?: DeathReason;
  message: string;
  description: string;
}

// 条件触发器
export interface ConditionTrigger {
  conditionId: string;
  timestamp: number;
  stateSnapshot: GameState;
}

// 条件统计信息
export interface ConditionStats {
  totalConditions: number;
  winConditions: number;
  deathConditions: number;
  triggeredCount: number;
  cacheSize: number;
  averageEvaluationTime: number;
}

// 规则纸张接口
export interface RulePaper {
  id: number;
  title: string;
  found: boolean;
  rules: Rule[];
}

// 规则接口
export interface Rule {
  id: number;
  text: string;
  marked: 'true' | 'false' | 'unknown';
}

// 清除规则接口
export interface ClearRule {
  id: number;
  grade: 'S' | 'A' | 'B' | 'C';
  title: string;
  found: boolean;
  rule: string;
}

// 段落接口
export interface Passage {
  text: string;
  choices: Choice[];
}

// 选择接口
export interface Choice {
  text: string;
  action: string;
  timeChange?: number;
  hungerChange?: number;
  energyChange?: number;
  sanityChange?: number;
  intelligenceChange?: number;
  strengthChange?: number;
  speedChange?: number;
  luckChange?: number;
}

// 要求接口
export interface Requirement {
  type: 'attribute' | 'item' | 'flag';
  key: string;
  operator: '>' | '<' | '=' | '>=' | '<=';
  value: number | string;
}

// 后果接口
export interface Consequence {
  attribute: string;
  change: number;
  message?: string;
}

// 连接接口
export interface Connection {
  from: string;
  to: string;
  condition: string;
  timeChange?: number;
  hungerChange?: number;
  energyChange?: number;
  sanityChange?: number;
  intelligenceChange?: number;
  strengthChange?: number;
  speedChange?: number;
  luckChange?: number;
}