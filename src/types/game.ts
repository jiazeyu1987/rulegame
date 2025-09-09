// 定义游戏状态类型
export interface GameState {
  time: number;
  profession: string;
  hunger: number;
  energy: number;
  sanity: number;
  intelligence: number;
  strength: number;
  speed: number;
  luck: number;
}

// 定义职业类型
export type Profession = 
  | "学生" 
  | "老人" 
  | "残疾人" 
  | "律师" 
  | "医生" 
  | "教师" 
  | "工人" 
  | "警察" 
  | "艺术家" 
  | "商人";

// 定义规则纸张类型
export interface RulePaper {
  id: number;
  title: string;
  found: boolean;
  rules: Rule[];
}

// 定义单条规则类型
export interface Rule {
  id: number;
  text: string;
  marked: "unknown" | "true" | "false";
}

// 定义通关条件类型
export interface ClearRule {
  id: number;
  grade: string;
  title: string;
  found: boolean;
  rule: string;
}

// 定义故事段落类型
export interface Passage {
  text: string;
  choices: Choice[];
}

// 定义选择项类型
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