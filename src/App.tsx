import React, { useState, useEffect } from 'react';
import type { GameState, RulePaper, ClearRule, Passage, Choice, Connection } from './types/game'
import GameHeader from './components/game/GameHeader';
import RulePaperComponent from './components/rules/RulePaper';
import RuleNavigation from './components/rules/RuleNavigation';
import ClearRules from './components/rules/ClearRules';
import PassageComponent from './components/game/Passage';
import Choices from './components/game/Choices';
// 测试窗口功能已整合到设置弹窗中，移除独立组件
// import TestWindow from './components/game/TestWindow';
import SettingsModal from './components/settings/SettingsModal';
import DeathScreen from './components/game/DeathScreen';

// 初始游戏状态
const initialGameState: GameState = {
  time: 22,
  profession: "学生",
  hunger: 80,
  energy: 70,
  sanity: 60,
  intelligence: 50,
  strength: 50,
  speed: 50,
  luck: 50
};

// 可选职业列表
const professions = [
  "学生", "老人", "残疾人", "律师", "医生", 
  "教师", "工人", "警察", "艺术家", "商人"
];

// 规则纸张数据
const rulePapers: RulePaper[] = [
  {
    id: 1,
    title: "寝室规则一",
    found: true,
    rules: [
      { id: 1, text: "晚上11点后不要照镜子", marked: "unknown" },
      { id: 2, text: "不要在黑暗中数床铺数量", marked: "unknown" },
      { id: 3, text: "听到脚步声要立即蒙头睡觉", marked: "unknown" },
      { id: 4, text: "不要回应门外的呼唤声", marked: "unknown" },
      { id: 5, text: "熄灯后不要开手电筒", marked: "unknown" }
    ]
  },
  {
    id: 2,
    title: "寝室规则二",
    found: false,
    rules: [
      { id: 6, text: "不要穿室友的鞋子", marked: "unknown" },
      { id: 7, text: "衣柜里的衣服要按顺序摆放", marked: "unknown" },
      { id: 8, text: "不要触碰墙上的划痕", marked: "unknown" },
      { id: 9, text: "每天必须更换床单", marked: "unknown" }
    ]
  },
  {
    id: 3,
    title: "寝室规则三",
    found: false,
    rules: [
      { id: 10, text: "不要在午夜12点后上厕所", marked: "unknown" },
      { id: 11, text: "发现异常要立即告诉宿管", marked: "unknown" },
      { id: 12, text: "不要独自留在寝室超过30分钟", marked: "unknown" },
      { id: 13, text: "窗户必须在晚上10点前关闭", marked: "unknown" },
      { id: 14, text: "不要移动床位的位置", marked: "unknown" },
      { id: 15, text: "听到哭声要数到10再行动", marked: "unknown" }
    ]
  },
  {
    id: 4,
    title: "寝室规则四",
    found: false,
    rules: [
      { id: 16, text: "不要相信第4个室友说的话", marked: "unknown" },
      { id: 17, text: "发现红字要立即撕掉", marked: "unknown" },
      { id: 18, text: "不要在镜子里寻找自己", marked: "unknown" }
    ]
  }
];

// 通关条件数据
const clearRules: ClearRule[] = [
  {
    id: 1,
    grade: "S",
    title: "S级通关条件",
    found: true,
    rule: "完全理解所有规则的真正含义并在不违反任何规则的前提下生存到天亮"
  },
  {
    id: 2,
    grade: "A",
    title: "A级通关条件",
    found: true,
    rule: "遵守所有已知规则并坚持到午夜，成功逃离寝室并找到安全区域"
  },
  {
    id: 3,
    grade: "B",
    title: "B级通关条件",
    found: true,
    rule: "保持理智值不低于30并发现至少3个隐藏规则"
  },
  {
    id: 4,
    grade: "C",
    title: "C级通关条件",
    found: true,
    rule: "简单遵守表面规则并在寝室中生存超过6小时"
  }
];

// 游戏段落数据
const defaultPassages: Record<string, Passage> = {
  start: {
    text: "欢迎来到寝室规则怪谈！请加载一个故事文件开始游戏。",
    choices: []
  }
};

const GameApp: React.FC = () => {
  // 游戏状态
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // 当前规则纸张索引
  const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);
  
  // 当前段落ID
  const [currentPassageId, setCurrentPassageId] = useState<string>('start');
  
  // 游戏段落数据状态
  const [passages, setPassages] = useState<Record<string, Passage>>(defaultPassages);
  
  // 规则纸张数据（可变状态）
  const [papers, setPapers] = useState<RulePaper[]>(rulePapers);
  
  // 当前段落
  const currentPassage = passages[currentPassageId];
  
  // 调试：显示当前段落信息
  console.log('=== APP DEBUG INFO ===');
  console.log('Current passage ID:', currentPassageId);
  console.log('Current passage object:', currentPassage);
  console.log('Available passages:', Object.keys(passages));
  console.log('Passages data:', passages);
  console.log('Passages reference changed:', Date.now()); // Add timestamp to track changes
  
  // 当前规则纸张
  const currentPaper = papers[currentPaperIndex];
  
  // 场景文字是否显示完成
  const [isPassageTextComplete, setIsPassageTextComplete] = useState(false);
  
  // 文字显示速度（毫秒每字符）
  const [textSpeed, setTextSpeed] = useState<number>(50); // 默认50ms每字符
  
  // 设置面板是否显示
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  // 死亡状态
  const [isDead, setIsDead] = useState<boolean>(false);

  // 自动加载Python故事文件
  const autoLoadPythonStory = async () => {
    try {
      console.log('尝试自动加载Python故事文件...');
      
      // 尝试加载day1_story.py文件
      const response = await fetch('/day1_story.py');
      if (response.ok) {
        const pythonContent = await response.text();
        console.log('成功加载day1_story.py文件，内容长度:', pythonContent.length);
        
        if (pythonContent.includes('flowchart_data') && pythonContent.includes('start_node')) {
          console.log('检测到Python故事格式，开始自动解析...');
          
          // 自动解析并加载故事
          handleTestSubmit(pythonContent, 'python');
          
          // 保存到localStorage以便后续使用
          localStorage.setItem('lastContentType', 'python');
          localStorage.setItem('lastPythonContent', pythonContent);
          
          console.log('✅ Python故事文件已自动加载并解析');
          return true;
        } else {
          console.log('文件内容不符合Python故事格式');
        }
      } else {
        console.log('无法加载day1_story.py文件，状态码:', response.status);
      }
    } catch (error) {
      console.error('自动加载Python故事文件时出错:', error);
    }
    return false;
  };

  // 自动解析测试2弹框中的Python内容的函数
  const autoParseTest2Content = () => {
    try {
      // 从localStorage获取测试2的输入内容
      const test2Content = localStorage.getItem('test2Input');
      
      if (test2Content && test2Content.trim()) {
        console.log('检测到测试2弹框中有内容，尝试自动解析...');
        
        // 检查是否是Python格式（简单的格式检查）
        if (test2Content.includes('flowchart_data') && test2Content.includes('start_node')) {
          console.log('检测到Python格式，开始自动解析...');
          
          // 自动解析内容
          handleTestSubmit(test2Content, 'python');
          
          console.log('✅ 测试2弹框中的Python内容已自动解析');
        } else {
          console.log('测试2弹框中的内容不是Python格式，跳过自动解析');
        }
      } else {
        console.log('测试2弹框中没有内容，跳过自动解析');
      }
    } catch (error) {
      console.error('自动解析测试2内容时出错:', error);
    }
  };
  
  // 组件挂载时加载保存的故事和设置
  useEffect(() => {
    // 加载保存的文字速度
    const savedTextSpeed = localStorage.getItem('textSpeed');
    if (savedTextSpeed) {
      const speed = parseInt(savedTextSpeed, 10);
      if (!isNaN(speed) && speed > 0) {
        setTextSpeed(speed);
      }
    }
    
    // 首先尝试自动加载Python故事文件
    setTimeout(async () => {
      const loaded = await autoLoadPythonStory();
      if (!loaded) {
        // 如果自动加载失败，再尝试从localStorage加载保存的内容
        const lastContentType = localStorage.getItem('lastContentType');
        const lastMermaidContent = localStorage.getItem('lastMermaidContent');
        const lastPythonContent = localStorage.getItem('lastPythonContent');
        
        if (lastContentType === 'python' && lastPythonContent && lastPythonContent.trim()) {
          // 如果有保存的Python故事内容，使用Python解析器
          handleTestSubmit(lastPythonContent, 'python');
        } else if (lastContentType === 'mermaid' && lastMermaidContent && lastMermaidContent.trim()) {
          // 如果有保存的Mermaid故事内容，使用Mermaid解析器
          handleTestSubmit(lastMermaidContent, 'mermaid');
        } else if (lastMermaidContent && lastMermaidContent.trim()) {
          // 向后兼容：如果没有内容类型但有Mermaid内容，使用Mermaid解析器
          handleTestSubmit(lastMermaidContent, 'mermaid');
        }
      }
    }, 100);
    
    // 自动解析测试2弹框中的Python内容（如果有的话）
    setTimeout(() => {
      autoParseTest2Content();
    }, 200); // 延迟稍长，确保其他初始化完成
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps
  
  // 死亡检测逻辑
  useEffect(() => {
    console.log('=== DEATH EFFECT RUNNING ===');
    console.log('Current game state:', gameState);
    console.log('Is already dead:', isDead);
    
    // 检查是否满足死亡条件
    const checkDeathConditions = () => {
      // 死亡条件1：理智值降为0
      if (gameState.sanity <= 0) {
        console.log('DEATH: Sanity <= 0');
        return true;
      }
      
      // 死亡条件2：体力值降为0
      if (gameState.energy <= 0) {
        console.log('DEATH: Energy <= 0');
        return true;
      }
      
      // 死亡条件3：饥饿值降为0
      if (gameState.hunger <= 0) {
        console.log('DEATH: Hunger <= 0');
        return true;
      }
      
      console.log('DEATH: All conditions checked, player alive');
      return false;
    };
    
    const shouldDie = checkDeathConditions();
    console.log('Should die:', shouldDie, 'Is already dead:', isDead);
    
    if (shouldDie && !isDead) {
      console.log('TRIGGERING DEATH!');
      setIsDead(true);
    }
  }, [gameState, isDead]);
  
  // 改变职业
  const changeProfession = () => {
    const currentIndex = professions.indexOf(gameState.profession);
    const nextIndex = (currentIndex + 1) % professions.length;
    setGameState(prev => ({
      ...prev,
      profession: professions[nextIndex]
    }));
  };
  
  // 打开设置面板
  const openSettings = () => {
    setShowSettings(true);
  };
  
  // 关闭设置面板
  const closeSettings = () => {
    setShowSettings(false);
  };
  
  // 移除调试用的立即死亡功能，死亡应该通过故事节点触发
  // const debugKillPlayer = () => {
  //   console.log('DEBUG: Manually triggering death');
  //   setGameState(prev => {
  //     console.log('DEBUG: Setting sanity to 0, current state:', prev);
  //     return {
  //       ...prev,
  //       sanity: 0 // 将理智值设为0触发死亡
  //     };
  //   });
  // };

  // 测试死亡界面 - 直接触发死亡状态（已移除，因为按钮已被删除）
  // const testDeathScreen = () => {
  //   console.log('TEST: Triggering death screen for testing');
  //   console.log('Current isDead state:', isDead);
  //   setIsDead(true);
  //   console.log('After setting isDead to true');
  // };
  
  // 重新开始游戏
  const restartGame = () => {
    // 重置游戏状态到初始值
    setGameState(initialGameState);
    
    // 重置规则纸张状态
    setPapers(rulePapers);
    
    // 重置当前规则纸张索引
    setCurrentPaperIndex(0);
    
    // 重置场景文字完成状态
    setIsPassageTextComplete(false);
    
    // 清除死亡状态
    setIsDead(false);
    
    // 获取上次保存的故事内容和类型
    const lastContentType = localStorage.getItem('lastContentType');
    const lastMermaidContent = localStorage.getItem('lastMermaidContent');
    const lastPythonContent = localStorage.getItem('lastPythonContent');
    
    if (lastContentType === 'python' && lastPythonContent && lastPythonContent.trim()) {
      // 如果有保存的Python故事内容，使用Python解析器
      handleTestSubmit(lastPythonContent, 'python');
    } else if (lastContentType === 'mermaid' && lastMermaidContent && lastMermaidContent.trim()) {
      // 如果有保存的Mermaid故事内容，使用Mermaid解析器
      handleTestSubmit(lastMermaidContent, 'mermaid');
    } else if (lastMermaidContent && lastMermaidContent.trim()) {
      // 向后兼容：如果没有内容类型但有Mermaid内容，使用Mermaid解析器
      handleTestSubmit(lastMermaidContent, 'mermaid');
    } else {
      // 如果没有保存的故事内容，重置到默认状态
      setPassages(defaultPassages);
      setCurrentPassageId('start');
    }
  };
  
  // 改变文字速度
  const changeTextSpeed = (speed: number) => {
    setTextSpeed(speed);
    // 保存到localStorage
    localStorage.setItem('textSpeed', speed.toString());
  };
  
  // 切换规则标记
  const toggleRuleMark = (ruleId: number) => {
    setPapers(prev => {
      return prev.map(paper => {
        if (paper.id === papers[currentPaperIndex].id) {
          return {
            ...paper,
            rules: paper.rules.map(rule => {
              if (rule.id === ruleId) {
                // Cycle through states: unknown -> true -> false -> unknown
                let newStatus: "unknown" | "true" | "false" = "unknown";
                if (rule.marked === 'unknown') {
                  newStatus = 'true';
                } else if (rule.marked === 'true') {
                  newStatus = 'false';
                } else if (rule.marked === 'false') {
                  newStatus = 'unknown';
                }
                return { ...rule, marked: newStatus };
              }
              return rule;
            })
          };
        }
        return paper;
      });
    });
  };
  
  // 发现规则纸张
  const findRulePaper = (paperId: number) => {
    setPapers(prev => {
      return prev.map(paper => {
        if (paper.id === paperId && !paper.found) {
          return { ...paper, found: true };
        }
        return paper;
      });
    });
  };
  
  // 上一个规则纸张
  const prevRule = () => {
    setCurrentPaperIndex(prev => (prev - 1 + papers.length) % papers.length);
  };
  
  // 下一个规则纸张
  const nextRule = () => {
    setCurrentPaperIndex(prev => (prev + 1) % papers.length);
  };
  
  // 跳转到指定段落
  const goToPassage = (choice: Choice) => {
    // 特殊处理：发现规则纸张
    if (choice.action === 'findRule2') {
      findRulePaper(2); // 发现规则纸张2
    } else if (choice.action === 'findRule3') {
      findRulePaper(3); // 发现规则纸张3
    } else if (choice.action === 'findRule4') {
      findRulePaper(4); // 发现规则纸张4
    }
    
    // 重置场景文字完成状态
    setIsPassageTextComplete(false);
    
    // 更新游戏状态
    setGameState(prev => {
      let newTime = prev.time + (choice.timeChange || 0);
      if (newTime >= 24) {
        newTime -= 24; // 24小时循环
      }
      if (newTime < 0) {
        newTime += 24; // 处理负时间
      }
      
      return {
        time: newTime,
        profession: prev.profession,
        hunger: Math.max(0, Math.min(100, prev.hunger + (choice.hungerChange || 0))),
        energy: Math.max(0, Math.min(100, prev.energy + (choice.energyChange || 0))),
        sanity: Math.max(0, Math.min(100, prev.sanity + (choice.sanityChange || 0))),
        intelligence: Math.max(0, Math.min(100, prev.intelligence + (choice.intelligenceChange || 0))),
        strength: Math.max(0, Math.min(100, prev.strength + (choice.strengthChange || 0))),
        speed: Math.max(0, Math.min(100, prev.speed + (choice.speedChange || 0))),
        luck: Math.max(0, Math.min(100, prev.luck + (choice.luckChange || 0)))
      };
    });
    
    // 检查目标段落是否是死亡节点
    const targetPassage = passages[choice.action];
    if (targetPassage && targetPassage.text.includes('你死了：')) {
      console.log('DEATH: Reached death node:', choice.action);
      setIsDead(true);
    }
    
    // 更新当前段落
    setCurrentPassageId(choice.action);
  };
  
  // 处理测试窗口提交 - 支持Mermaid和Python格式
  const handleTestSubmit = (input: string, type: 'mermaid' | 'python' = 'mermaid') => {
    console.log('测试输入类型:', type);
    console.log('测试输入:', input);
    
    if (type === 'mermaid') {
      // 解析mermaid内容并映射到游戏场景
      const sceneMapping = parseMermaidToScene(input);
      console.log('Mermaid场景映射结果:', sceneMapping);
      // 根据解析结果更新游戏段落数据
      updatePassagesFromMapping(sceneMapping);
    } else if (type === 'python') {
      // 解析Python故事脚本
      const sceneMapping = parsePythonStory(input);
      console.log('Python场景映射结果:', sceneMapping);
      if (sceneMapping) {
        // 根据解析结果更新游戏段落数据
        updatePassagesFromMapping(sceneMapping);
      } else {
        alert('Python故事脚本解析失败，请检查格式是否正确');
      }
    }
  };
  
  // 解析mermaid内容并映射到游戏场景
  const parseMermaidToScene = (mermaidContent: string) => {
    // 解析mermaid流程图
    const lines = mermaidContent.split('\n');
    const nodes: Record<string, string> = {}; // 节点ID到节点名称的映射
    const connections: Array<{from: string, to: string, condition: string}> = []; // 连接关系
    
    // 提取节点和连接信息
    for (const line of lines) {
      // 匹配节点定义: N1["节点1：卧室醒来"]
      const nodeMatch = line.match(/([A-Z0-9_]+)\["(.+?)"\]/);
      if (nodeMatch) {
        const nodeId = nodeMatch[1];
        const nodeLabel = nodeMatch[2];
        nodes[nodeId] = nodeLabel;
      }
      
      // 匹配连接关系: N1 -->|"看纸条"| N2
      const connectionMatch = line.match(/([A-Z0-9_]+)\s*-->\s*\|"(.+?)"\|\s*([A-Z0-9_]+)/);
      if (connectionMatch) {
        // 去除条件中的双引号
        const condition = connectionMatch[2].replace(/^"(.+(?="$))"$/, '$1');
        connections.push({
          from: connectionMatch[1],
          to: connectionMatch[3],
          condition: condition
        });
      }
      
      // 匹配简单连接关系: N1 --> N2
      const simpleConnectionMatch = line.match(/([A-Z0-9_]+)\s*-->\s*([A-Z0-9_]+)/);
      if (simpleConnectionMatch) {
        connections.push({
          from: simpleConnectionMatch[1],
          to: simpleConnectionMatch[2],
          condition: '默认'
        });
      }
    }
    
    // 返回解析结果
    return {
      nodes,
      connections
    };
  };

  // 解析Python故事脚本内容 - 完整修复版，正确处理实际文件结构
  const parsePythonStory = (pythonContent: string) => {
    try {
      console.log('开始解析Python故事脚本...');
      
      // 找到主flowchart_data结构
      const mainFlowchartStart = pythonContent.indexOf('flowchart_data = {');
      if (mainFlowchartStart === -1) {
        console.log('未能找到主flowchart_data');
        return null;
      }
      
      // 提取完整的主flowchart_data结构
      let braceCount = 0;
      let inString = false;
      let escapeNext = false;
      let mainFlowchartEnd = -1;
      
      for (let i = mainFlowchartStart + 'flowchart_data = {'.length; i < pythonContent.length; i++) {
        const char = pythonContent[i];
        
        if (escapeNext) {
          escapeNext = false;
          continue;
        }
        
        if (char === '\\') {
          escapeNext = true;
          continue;
        }
        
        if (char === '"' && !inString) {
          inString = true;
        } else if (char === '"' && inString) {
          inString = false;
        }
        
        if (!inString) {
          if (char === '{') {
            braceCount++;
          } else if (char === '}') {
            braceCount--;
            if (braceCount === 0) {
              mainFlowchartEnd = i;
              break;
            }
          }
        }
      }
      
      if (mainFlowchartEnd === -1) {
        console.log('未能找到主flowchart_data的结束位置');
        return null;
      }
      
      const mainDataBlock = pythonContent.substring(mainFlowchartStart + 'flowchart_data = '.length, mainFlowchartEnd + 1);
      
      // 从主数据块中提取标题和开始节点
      const titleMatch = mainDataBlock.match(/"title":\s*"([^"]+)"/);
      const title = titleMatch ? titleMatch[1] : '未命名故事';
      
      const startNodeMatch = mainDataBlock.match(/"start_node":\s*"(\w+)"/);
      const startNode = startNodeMatch ? startNodeMatch[1] : 'N1';
      
      // 从主数据块中提取节点
      const nodes: { [key: string]: string } = {};
      const nodesSection = extractSection(mainDataBlock, 'nodes');
      if (nodesSection) {
        const nodePattern = /"(\w+)":\s*\{[^}]*"content":\s*"([^"]*)"[^}]*\}/g;
        let nodeMatch;
        let nodeCount = 0;
        while ((nodeMatch = nodePattern.exec(nodesSection)) !== null) {
          const nodeId = nodeMatch[1];
          const content = nodeMatch[2];
          nodes[nodeId] = content;
          nodeCount++;
          if (nodeCount <= 3) {
            console.log(`解析节点: ${nodeId} = ${content.substring(0, 50)}...`);
          }
        }
        console.log(`总共解析了 ${nodeCount} 个节点`);
      }
      
      // 从主flowchart_data之后的内容中提取边 - 更新以处理time_change字段
      const afterMainFlowchart = pythonContent.substring(mainFlowchartEnd + 1);
      const connections = [];
      
      // 在剩余内容中查找边对象 - 更新以处理所有属性字段
      const edgeObjectPattern = /\{\s*"from":\s*"([^"]+)",\s*"to":\s*"([^"]+)",\s*"label":\s*"([^"]*)"(?:,\s*"time_change":\s*(\d+))?(?:,\s*"hunger_change":\s*(-?\d+))?(?:,\s*"energy_change":\s*(-?\d+))?(?:,\s*"sanity_change":\s*(-?\d+))?(?:,\s*"strength_change":\s*(-?\d+))?(?:,\s*"speed_change":\s*(-?\d+))?(?:,\s*"luck_change":\s*(-?\d+))?\s*\}/g;
      let edgeMatch;
      let edgeCount = 0;
      while ((edgeMatch = edgeObjectPattern.exec(afterMainFlowchart)) !== null) {
        connections.push({
          from: edgeMatch[1],
          to: edgeMatch[2],
          condition: edgeMatch[3],
          timeChange: edgeMatch[4] ? parseInt(edgeMatch[4]) : 0,
          hungerChange: edgeMatch[5] ? parseInt(edgeMatch[5]) : 0,
          energyChange: edgeMatch[6] ? parseInt(edgeMatch[6]) : 0,
          sanityChange: edgeMatch[7] ? parseInt(edgeMatch[7]) : 0,
          strengthChange: edgeMatch[8] ? parseInt(edgeMatch[8]) : 0,
          speedChange: edgeMatch[9] ? parseInt(edgeMatch[9]) : 0,
          luckChange: edgeMatch[10] ? parseInt(edgeMatch[10]) : 0
        });
        edgeCount++;
        if (edgeCount <= 3) { // 显示前3个边以验证属性配置
          console.log(`解析边 ${edgeCount}: ${edgeMatch[1]} -> ${edgeMatch[2]} (${edgeMatch[3]})`);
          console.log(`  时间: ${edgeMatch[4] || 0}min, 饱食: ${edgeMatch[5] || 0}, 体力: ${edgeMatch[6] || 0}, 理智: ${edgeMatch[7] || 0}, 力量: ${edgeMatch[8] || 0}, 速度: ${edgeMatch[9] || 0}, 运气: ${edgeMatch[10] || 0}`);
        }
      }
      console.log(`总共解析了 ${edgeCount} 条边`);
      
      console.log(`解析完成: ${Object.keys(nodes).length} 个节点, ${connections.length} 条边`);
      return { nodes, connections, title, start_node: startNode };
      
    } catch (error) {
      console.error('Python故事解析错误:', error);
      return null;
    }
  }
  
  // 辅助函数：使用大括号匹配提取章节
  function extractSection(data: string, sectionName: string): string | null {
    const sectionStart = data.indexOf(`"${sectionName}": {`);
    if (sectionStart === -1) return null;
    
    let braceCount = 0;
    let inString = false;
    let escapeNext = false;
    let sectionEnd = -1;
    let startBraceFound = false;
    
    for (let i = sectionStart; i < data.length; i++) {
      const char = data[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"' && !inString) {
        inString = true;
      } else if (char === '"' && inString) {
        inString = false;
      }
      
      if (!inString) {
        if (char === '{') {
          braceCount++;
          startBraceFound = true;
        } else if (char === '}' && startBraceFound) {
          braceCount--;
          if (braceCount === 0) {
            sectionEnd = i;
            break;
          }
        }
      }
    }
    
    if (sectionEnd !== -1) {
      const contentStart = data.indexOf('{', sectionStart) + 1;
      return data.substring(contentStart, sectionEnd);
    }
    
    return null;
  }
  
  // 根据解析结果更新游戏段落数据
  const updatePassagesFromMapping = (mapping: {nodes: Record<string, string>, connections: Connection[]}) => {
    console.log('=== UPDATE PASSAGES DEBUG ===');
    console.log('Mapping nodes:', mapping.nodes);
    console.log('Mapping connections:', mapping.connections);
    
    // 创建新的段落数据
    const newPassages: Record<string, Passage> = {};
    
    // 为每个节点创建段落
    for (const [nodeId, nodeLabel] of Object.entries(mapping.nodes)) {
      console.log('Processing node:', nodeId, 'Label:', nodeLabel);
      
      // 提取节点名称（去掉前缀）- 处理节点编号前缀
      let nodeName = nodeLabel;
      
      // 移除节点前缀（节点数字：）
      const prefixMatch = nodeLabel.match(/^节点\d+：(.+)$/);
      if (prefixMatch) {
        nodeName = prefixMatch[1];
      }
      
      // 清理任何残留的引号或空白字符
      nodeName = nodeName.replace(/^["']|["']$/g, '').trim();
      
      console.log('Processed node name:', nodeName);
      
      // 创建段落ID（使用节点ID）
      const passageId = nodeId;
      
      // 初始化选择项数组
      const choices: Choice[] = [];
      
      // 查找从当前节点出发的连接
      const outgoingConnections = mapping.connections.filter(conn => conn.from === nodeId);
      
      // 为每个连接创建选择项 - 包含所有属性变化
      for (const conn of outgoingConnections) {
        const targetNodeLabel = mapping.nodes[conn.to];
        if (targetNodeLabel) {
          choices.push({
            text: conn.condition,
            action: conn.to, // 使用目标节点ID作为action
            timeChange: conn.timeChange || 0, // 从连接中获取时间变化，默认为0
            hungerChange: conn.hungerChange || 0, // 饱食度变化
            energyChange: conn.energyChange || 0, // 体力变化
            sanityChange: conn.sanityChange || 0, // 理智值变化
            strengthChange: conn.strengthChange || 0, // 力量变化
            speedChange: conn.speedChange || 0, // 速度变化
            luckChange: conn.luckChange || 0 // 运气变化
          });
        }
      }
      
      // 特殊处理死亡节点和第二天节点
      if (nodeLabel.includes('死亡')) {
        newPassages[passageId] = {
          text: `你死了：${nodeName}`,
          choices: []
        };
      } else if (nodeLabel.includes('第二天')) {
        newPassages[passageId] = {
          text: "你成功度过了第一天，迎来了第二天。",
          choices: [
            { text: "继续探索", action: "N1" } // 默认回到开始节点
          ]
        };
      } else {
        // 为普通节点创建段落
        console.log('Creating normal passage for node:', nodeId, 'with text:', nodeName);
        newPassages[passageId] = {
          text: `${nodeName}`,
          choices: choices
        };
        console.log('Created passage:', passageId, 'Text:', newPassages[passageId].text);
      }
    }
    
    // 更新段落数据状态
    console.log('Setting new passages:', newPassages);
    console.log('Passages update timestamp:', Date.now());
    setPassages(newPassages);
    // 将当前段落ID设置为第一个节点
    const firstNodeId = Object.keys(mapping.nodes)[0];
    if (firstNodeId) {
      console.log('Setting current passage ID to:', firstNodeId);
      setCurrentPassageId(firstNodeId);
    }
  };
  
  return (
    <div className="app-container">
      {/* 顶部标题栏 */}
      <div className="title-bar">
        <div className="title-controls">
          <button className="title-button" onClick={openSettings}>设置</button>
          <button className="title-button">语言</button>
          <button className="title-button">退出</button>
        </div>
        <h1 className="game-title">寝室规则怪谈</h1>
        <div className="title-controls-placeholder"></div>
      </div>
      
      {/* 主内容区域 */}
      <div className="main-content">
        {/* 规则面板组件 */}
        <div className="rules-container">
          {/* 规则纸张组件 */}
          <RulePaperComponent 
            paper={currentPaper} 
            onToggleRuleMark={toggleRuleMark} 
          />
          
          {/* 规则导航组件 */}
          <RuleNavigation 
            onPrev={prevRule} 
            onNext={nextRule} 
          />
        </div>
        
        {/* 游戏区域组件 */}
        <div className="game-area">
          <div id="game-container">
            {/* 游戏头部组件 */}
            <GameHeader 
              gameState={gameState} 
              onChangeProfession={changeProfession} 
              // onOpenSettings={openSettings} // 设置按钮已被移除
              // 移除调试用的立即死亡功能
              // onDebugKill={debugKillPlayer}
              // 移除测试死亡界面功能
              // onTestDeath={testDeathScreen}
            />
            
            {/* 故事段落组件 */}
            <PassageComponent 
              passage={currentPassage} 
              onChoiceSelect={goToPassage} 
              onTextComplete={() => setIsPassageTextComplete(true)}
              textSpeed={textSpeed}
            />
            
            {/* 选择组件 */}
            <Choices 
              key={currentPassageId}  // 使用当前段落ID作为key，强制组件重新挂载
              choices={currentPassage.choices} 
              onChoiceSelect={goToPassage} 
              isPassageTextComplete={isPassageTextComplete}
            />
          </div>
        </div>
        
        {/* 右侧容器 */}
        <div className="right-container">
          {/* 通关规则面板组件 */}
          <div className="clear-rules-container">
            <ClearRules clearRules={clearRules} />
          </div>
          
          {/* 测试窗口功能已整合到设置弹窗中，移除独立组件 */}
          {/* <TestWindow onTestSubmit={handleTestSubmit} /> */}
        </div>
      </div>
      
      {/* 设置模态框 */}
      <SettingsModal 
        isOpen={showSettings}
        onClose={closeSettings}
        currentSpeed={textSpeed}
        onSpeedChange={changeTextSpeed}
        onTestSubmit={handleTestSubmit}
      />
      
      {/* 死亡屏幕 */}
      {isDead && (
        <DeathScreen onRestart={restartGame} />
      )}
      
      {/* 调试用：显示当前死亡状态 */}
      {import.meta.env.DEV && (
        <div className="debug-panel">
          Dead: {isDead ? 'YES' : 'NO'} | Sanity: {gameState.sanity} | Energy: {gameState.energy} | Hunger: {gameState.hunger}
          {/* 移除KILL PLAYER按钮，死亡应该通过故事节点触发 */}
          {/* <br /> */}
          {/* <button onClick={debugKillPlayer} style={{ background: 'red', color: 'white', border: 'none', padding: '5px', marginTop: '5px' }}> */}
          {/*   KILL PLAYER */}
          {/* </button> */}
        </div>
      )}
      
      {/* 调试用：显示当前死亡状态 */}
      {import.meta.env.DEV && (
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', background: 'black', color: 'white', padding: '10px', zIndex: 10000 }}>
          Dead: {isDead ? 'YES' : 'NO'} | Sanity: {gameState.sanity} | Energy: {gameState.energy} | Hunger: {gameState.hunger}
        </div>
      )}
    </div>
  );
};

export default GameApp;