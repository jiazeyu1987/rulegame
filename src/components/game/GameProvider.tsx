import React, { useState } from 'react';
import type { GameState, Profession, RulePaper, ClearRule, Passage } from '../../types/game';

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
const professions: Profession[] = [
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

  // 游戏段落数据 (暂时注释掉，等待后续使用)
// const passages: Record<string, Passage> = {
//   start: {
//     text: "欢迎来到寝室规则怪谈！你是一个刚入学的新生，现在是晚上10点，你独自在寝室里。墙上贴着一些奇怪的规则纸条，你需要小心遵守它们。",
//     choices: [
//       { text: "仔细查看规则纸条", action: "checkRules", timeChange: 0.25, hungerChange: 0, energyChange: -5, sanityChange: -10, intelligenceChange: 5 },
//       { text: "准备睡觉", action: "goToBed", timeChange: 0.5, hungerChange: 0, energyChange: -10, sanityChange: 5, strengthChange: 5 },
//       { text: "离开寝室去图书馆", action: "leaveRoom", timeChange: 1, hungerChange: -5, energyChange: -15, sanityChange: -20, speedChange: -5 }
//     ]
//   },
//   checkRules: {
//     text: "你仔细查看了墙上的规则纸条，发现这些规则都很奇怪。有些规则看起来互相矛盾，有些规则似乎在暗示着什么可怕的事情。",
//     choices: [
//       { text: "研究规则之间的矛盾", action: "analyzeContradictions", timeChange: 0.5, hungerChange: 0, energyChange: -10, sanityChange: -15, intelligenceChange: 10 },
//       { text: "尝试验证某条规则", action: "testRule", timeChange: 1, hungerChange: -5, energyChange: -15, sanityChange: -20, luckChange: -10 },
//       { text: "回到床铺", action: "goToBed", timeChange: 0.25, hungerChange: 0, energyChange: -5, sanityChange: 10, strengthChange: 5 }
//     ]
//   },
//   goToBed: {
//     text: "你爬上了床铺，准备睡觉。但是你注意到寝室里似乎有些不对劲...墙上的一些规则纸条在黑暗中似乎在发光。",
//     choices: [
//       { text: "开灯仔细查看", action: "turnOnLight", timeChange: 0.25, hungerChange: 0, energyChange: -5, sanityChange: -10, intelligenceChange: 5 },
//       { text: "蒙头睡觉", action: "sleep", timeChange: 2, hungerChange: 0, energyChange: 10, sanityChange: -5, strengthChange: 10 },
//       { text: "起床继续研究规则", action: "checkRules", timeChange: 0.5, hungerChange: 0, energyChange: -10, sanityChange: -15, intelligenceChange: 5 }
//     ]
//   },
//   leaveRoom: {
//     text: "你决定离开寝室去图书馆。当你打开门时，你注意到走廊里异常安静，而且走廊的灯似乎比平时暗淡。",
//     choices: [
//       { text: "前往图书馆", action: "library", timeChange: 1, hungerChange: -10, energyChange: -20, sanityChange: -30, intelligenceChange: 10 },
//       { text: "返回寝室", action: "start", timeChange: 0.5, hungerChange: 0, energyChange: -5, sanityChange: 15, luckChange: 5 }
//     ]
//   },
//   analyzeContradictions: {
//     text: "你发现规则纸条之间确实存在矛盾。比如一张纸条说'不要在黑暗中数床铺数量'，而另一张却说'必须每天确认床铺数量'。这让你感到非常困惑和不安。",
//     choices: [
//       { text: "尝试解决矛盾", action: "solveContradiction", timeChange: 1, hungerChange: -5, energyChange: -15, sanityChange: -25, intelligenceChange: 15 },
//       { text: "忽略矛盾继续睡觉", action: "goToBed", timeChange: 0.5, hungerChange: 0, energyChange: -10, sanityChange: 10, strengthChange: 5 }
//     ]
//   },
//   testRule: {
//     text: "你决定验证第一条规则：'晚上11点后不要照镜子'。现在是10:30，你拿起手电筒走向镜子。当你照镜子时，你发现镜子里的自己似乎在微笑，但你并没有笑。",
//     choices: [
//       { text: "立即关灯", action: "turnOffLight", timeChange: 0.1, hungerChange: 0, energyChange: -10, sanityChange: -30, speedChange: 10 },
//       { text: "仔细观察镜子里的自己", action: "observeMirror", timeChange: 0.5, hungerChange: 0, energyChange: -15, sanityChange: -40, luckChange: -15 }
//     ]
//   },
//   turnOnLight: {
//     text: "你打开了灯，仔细查看墙上的规则纸条。在明亮的灯光下，你发现有些规则字迹似乎在慢慢变化，而且你确信刚才有些规则的内容和现在不一样了。你注意到墙角似乎还有一张被遮挡的纸条。",
//     choices: [
//       { text: "记录变化的规则", action: "documentChanges", timeChange: 0.5, hungerChange: 0, energyChange: -10, sanityChange: -20, intelligenceChange: 10 },
//       { text: "查看被遮挡的纸条", action: "findRule2", timeChange: 0.25, hungerChange: 0, energyChange: -5, sanityChange: -15, luckChange: -5 },
//       { text: "立即关灯", action: "turnOffLight", timeChange: 0.1, hungerChange: 0, energyChange: -5, sanityChange: 5, strengthChange: 5 }
//     ]
//   }
// };
    //   }
// };
  //   }
// };
// };
  //   }
// };

const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 游戏状态
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // 当前规则纸张索引
  const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);
  
  // 当前通关规则索引 (暂时注释掉，等待后续使用)
  // const [currentClearRuleIndex, setCurrentClearRuleIndex] = useState<number>(0);
  
  // 规则纸张数据（可变状态）
  const [papers, setPapers] = useState<RulePaper[]>(rulePapers);
  
  // 改变职业 (暂时注释掉，等待后续使用)
  // const changeProfession = () => {
  //   const currentIndex = professions.indexOf(gameState.profession as Profession);
  //   const nextIndex = (currentIndex + 1) % professions.length;
  //   setGameState(prev => ({
  //     ...prev,
  //     profession: professions[nextIndex]
  //   }));
  // };
  
  // 标记规则 (暂时注释掉，等待后续使用)
  // const markRule = (ruleId: number, status: "unknown" | "true" | "false") => {
  //   setPapers(prev => {
  //     return prev.map(paper => {
  //       if (paper.id === papers[currentPaperIndex].id) {
  //         return {
  //           ...paper,
  //           rules: paper.rules.map(rule => 
  //             rule.id === ruleId ? { ...rule, marked: status } : rule
  //           )
  //         };
  //       }
  //       return paper;
  //     });
  //   });
  // };
  
  // 切换规则标记 (暂时注释掉，等待后续使用)
  // const toggleRuleMark = (ruleId: number) => {
  //   setPapers(prev => {
  //     return prev.map(paper => {
  //       if (paper.id === papers[currentPaperIndex].id) {
  //         return {
  //           ...paper,
  //           rules: paper.rules.map(rule => {
  //             if (rule.id === ruleId) {
  //               // Cycle through states: unknown -> true -> false -> unknown
  //               let newStatus: "unknown" | "true" | "false" = "unknown";
  //               if (rule.marked === 'unknown') {
  //                 newStatus = 'true';
  //               } else if (rule.marked === 'true') {
  //                 newStatus = 'false';
  //               } else if (rule.marked === 'false') {
  //                 newStatus = 'unknown';
  //               }
  //               return { ...rule, marked: newStatus };
  //             }
  //             return rule;
  //           })
  //         };
  //       }
  //       return paper;
  //     });
  //   });
  // };
  
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
  
  // 上一个规则纸张 (暂时注释掉，等待后续使用)
  // const prevRule = () => {
  //   setCurrentPaperIndex(prev => (prev - 1 + papers.length) % papers.length);
  // };
  
  // 下一个规则纸张 (暂时注释掉，等待后续使用)
  // const nextRule = () => {
  //   setCurrentPaperIndex(prev => (prev + 1) % papers.length);
  // };
  
  // 上一个通关规则 (暂时注释掉，等待后续使用)
  // const prevClearRule = () => {
  //   setCurrentClearRuleIndex(prev => (prev - 1 + clearRules.length) % clearRules.length);
  // };
  
  // 下一个通关规则 (暂时注释掉，等待后续使用)
  // const nextClearRule = () => {
  //   setCurrentClearRuleIndex(prev => (prev + 1) % clearRules.length);
  // };
  
  // 跳转到指定段落 (暂时注释掉，等待后续使用)
  // const goToPassage = (passageId: string, timeChange = 0, hungerChange = 0, energyChange = 0, sanityChange = 0, intelligenceChange = 0, strengthChange = 0, speedChange = 0, luckChange = 0) => {
  //   // 特殊处理：发现规则纸张
  //   if (passageId === 'findRule2') {
  //     findRulePaper(2); // 发现规则纸张2
  //   } else if (passageId === 'findRule3') {
  //     findRulePaper(3); // 发现规则纸张3
  //   } else if (passageId === 'findRule4') {
  //     findRulePaper(4); // 发现规则纸张4
  //   }
  //   
  //   // 更新游戏状态
  //   setGameState(prev => {
  //     let newTime = prev.time + timeChange;
  //     if (newTime >= 24) {
  //       newTime -= 24; // 24小时循环
  //     }
  //     if (newTime < 0) {
  //       newTime += 24; // 处理负时间
  //     }
  //     
  //     return {
  //       time: newTime,
  //       profession: prev.profession,
  //       hunger: Math.max(0, Math.min(100, prev.hunger + hungerChange)),
  //       energy: Math.max(0, Math.min(100, prev.energy + energyChange)),
  //       sanity: Math.max(0, Math.min(100, prev.sanity + sanityChange)),
  //       intelligence: Math.max(0, Math.min(100, prev.intelligence + intelligenceChange)),
  //       strength: Math.max(0, Math.min(100, prev.strength + strengthChange)),
  //       speed: Math.max(0, Math.min(100, prev.speed + speedChange)),
  //       luck: Math.max(0, Math.min(100, prev.luck + luckChange))
  return (
    <>{children}</>
  );
};

export default GameProvider;