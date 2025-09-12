import { GameState, Profession, RulePaper, ClearRule } from './game';

// 存档版本号，用于兼容性处理
export const SAVE_VERSION = '1.0.0';

// 完整的游戏存档数据结构
export interface GameSaveData {
  version: string;                    // 存档版本号
  playerName: string;                 // 玩家名称
  profession: Profession;             // 职业选择
  gameState: GameState;               // 游戏状态
  rulePapers: RulePaper[];            // 规则纸条状态
  clearRules: ClearRule[];            // 通关条件状态
  currentDay: number;                 // 当前天数
  currentNode: string;                // 当前故事节点
  gameConfigPath: string;             // 游戏配置文件路径
  lastSaveTime: number;               // 最后保存时间戳
  createdTime: number;                // 存档创建时间
  saveCount: number;                  // 保存次数
}

// 存储管理器配置
export interface StorageConfig {
  storageKey: string;                 // localStorage键名
  maxSaveSlots: number;               // 最大存档槽位数
  autoSaveInterval: number;           // 自动保存间隔（毫秒）
  compressionEnabled: boolean;        // 是否启用压缩
}