import { GameSaveData, StorageConfig } from '../types/storage';

export class StorageManager {
  private config: StorageConfig;
  private storage: Storage;

  constructor(config: StorageConfig = {
    storageKey: 'rulegame_save',
    maxSaveSlots: 5,
    autoSaveInterval: 300000, // 5分钟
    compressionEnabled: true
  }) {
    this.config = config;
    this.storage = window.localStorage;
  }

  /**
   * 保存游戏存档
   */
  async save(data: GameSaveData): Promise<boolean> {
    try {
      // 数据验证
      if (!this.validate(data)) {
        throw new Error('Invalid save data format');
      }

      // 获取现有存档
      const saves = await this.getAllSaves();
      
      // 检查存档槽位限制
      if (saves.length >= this.config.maxSaveSlots) {
        // 删除最旧的存档
        saves.sort((a, b) => a.lastSaveTime - b.lastSaveTime);
        saves.shift();
      }

      // 更新存档数据
      const saveData = {
        ...data,
        lastSaveTime: Date.now(),
        saveCount: (data.saveCount || 0) + 1
      };

      // 序列化数据
      const serializedData = JSON.stringify(saveData);
      
      // 存储数据
      const key = `${this.config.storageKey}_${data.playerName}_${data.currentDay}`;
      this.storage.setItem(key, serializedData);

      // 更新存档索引
      const saveIndex = saves.findIndex(save => 
        save.playerName === data.playerName && save.currentDay === data.currentDay
      );
      
      if (saveIndex >= 0) {
        saves[saveIndex] = saveData;
      } else {
        saves.push(saveData);
      }
      
      this.updateSaveIndex(saves);
      
      console.log(`Game saved successfully: ${key}`);
      return true;
    } catch (error) {
      console.error('Failed to save game:', error);
      return false;
    }
  }

  /**
   * 加载游戏存档
   */
  async load(playerName: string, day: number): Promise<GameSaveData | null> {
    try {
      const key = `${this.config.storageKey}_${playerName}_${day}`;
      const data = this.storage.getItem(key);
      
      if (!data) {
        return null;
      }

      const parsedData = JSON.parse(data) as GameSaveData;
      
      // 验证数据格式
      if (!this.validate(parsedData)) {
        console.warn('Invalid save data format, attempting recovery...');
        return this.attemptDataRecovery(parsedData);
      }

      console.log(`Game loaded successfully: ${key}`);
      return parsedData;
    } catch (error) {
      console.error('Failed to load game:', error);
      return null;
    }
  }

  /**
   * 获取所有存档
   */
  async getAllSaves(): Promise<GameSaveData[]> {
    try {
      const saves: GameSaveData[] = [];
      const keys = this.getSaveKeys();
      
      for (const key of keys) {
        const data = this.storage.getItem(key);
        if (data) {
          try {
            const parsedData = JSON.parse(data) as GameSaveData;
            if (this.validate(parsedData)) {
              saves.push(parsedData);
            }
          } catch (error) {
            console.warn(`Failed to parse save data for key: ${key}`, error);
          }
        }
      }
      
      return saves.sort((a, b) => b.lastSaveTime - a.lastSaveTime);
    } catch (error) {
      console.error('Failed to get all saves:', error);
      return [];
    }
  }

  /**
   * 清除指定存档
   */
  async clear(playerName: string, day: number): Promise<boolean> {
    try {
      const key = `${this.config.storageKey}_${playerName}_${day}`;
      this.storage.removeItem(key);
      
      // 更新存档索引
      const saves = await this.getAllSaves();
      const filteredSaves = saves.filter(save => 
        !(save.playerName === playerName && save.currentDay === day)
      );
      this.updateSaveIndex(filteredSaves);
      
      console.log(`Save cleared successfully: ${key}`);
      return true;
    } catch (error) {
      console.error('Failed to clear save:', error);
      return false;
    }
  }

  /**
   * 清除所有存档
   */
  async clearAll(): Promise<boolean> {
    try {
      const keys = this.getSaveKeys();
      keys.forEach(key => this.storage.removeItem(key));
      this.storage.removeItem(`${this.config.storageKey}_index`);
      
      console.log('All saves cleared successfully');
      return true;
    } catch (error) {
      console.error('Failed to clear all saves:', error);
      return false;
    }
  }

  /**
   * 数据验证
   */
  validate(data: any): boolean {
    if (!data || typeof data !== 'object') return false;
    
    const requiredFields = [
      'version', 'playerName', 'profession', 'gameState', 
      'currentDay', 'currentNode', 'lastSaveTime', 'createdTime'
    ];
    
    for (const field of requiredFields) {
      if (!(field in data)) return false;
    }
    
    // 验证版本兼容性
    if (data.version !== '1.0.0') {
      console.warn(`Save data version mismatch: expected 1.0.0, got ${data.version}`);
      return false;
    }
    
    // 验证玩家名称
    if (!data.playerName || typeof data.playerName !== 'string' || data.playerName.trim() === '') {
      return false;
    }
    
    // 验证职业类型
    const validProfessions = ['学生', '老人', '残疾人', '律师', '医生', '教师', '工人', '警察', '艺术家', '商人'];
    if (!validProfessions.includes(data.profession)) {
      return false;
    }
    
    // 验证天数
    if (typeof data.currentDay !== 'number' || data.currentDay < 1) {
      return false;
    }
    
    // 验证游戏状态数据
    if (!this.validateGameState(data.gameState)) return false;
    
    return true;
  }

  /**
   * 验证游戏状态
   */
  private validateGameState(gameState: any): boolean {
    if (!gameState || typeof gameState !== 'object') return false;
    
    // 检查必需字段
    const requiredFields = ['time', 'profession', 'hunger', 'energy', 'sanity'];
    for (const field of requiredFields) {
      if (!(field in gameState)) {
        return false;
      }
    }
    
    // 验证数值字段类型
    const numericFields = ['time', 'hunger', 'energy', 'sanity', 'intelligence', 'strength', 'speed', 'luck'];
    for (const field of numericFields) {
      if (field in gameState && typeof gameState[field] !== 'number') {
        return false;
      }
    }
    
    // 验证profession字段（可以是字符串或数字）
    if (!gameState.profession) {
      return false;
    }
    
    // 验证数值范围
    if (typeof gameState.hunger === 'number' && (gameState.hunger < 0 || gameState.hunger > 100)) return false;
    if (typeof gameState.energy === 'number' && (gameState.energy < 0 || gameState.energy > 100)) return false;
    if (typeof gameState.sanity === 'number' && (gameState.sanity < 0 || gameState.sanity > 100)) return false;
    
    return true;
  }

  /**
   * 数据恢复尝试
   */
  private attemptDataRecovery(data: any): GameSaveData | null {
    try {
      // 尝试恢复缺失的字段
      const recoveredData: GameSaveData = {
        version: data.version || '1.0.0',
        playerName: data.playerName || 'Unknown',
        profession: data.profession || '学生',
        gameState: data.gameState || this.getDefaultGameState(),
        rulePapers: data.rulePapers || [],
        clearRules: data.clearRules || [],
        currentDay: data.currentDay || 1,
        currentNode: data.currentNode || 'start',
        gameConfigPath: data.gameConfigPath || '',
        lastSaveTime: data.lastSaveTime || Date.now(),
        createdTime: data.createdTime || Date.now(),
        saveCount: data.saveCount || 0
      };
      
      return this.validate(recoveredData) ? recoveredData : null;
    } catch (error) {
      console.error('Data recovery failed:', error);
      return null;
    }
  }

  /**
   * 获取默认游戏状态
   */
  private getDefaultGameState() {
    return {
      time: 0,
      profession: '学生',
      hunger: 50,
      energy: 100,
      sanity: 100,
      intelligence: 50,
      strength: 50,
      speed: 50,
      luck: 50
    };
  }

  /**
   * 获取存档键名列表
   */
  private getSaveKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(`${this.config.storageKey}_`)) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * 更新存档索引
   */
  private updateSaveIndex(saves: GameSaveData[]): void {
    const indexData = saves.map(save => ({
      playerName: save.playerName,
      currentDay: save.currentDay,
      lastSaveTime: save.lastSaveTime,
      saveCount: save.saveCount
    }));
    
    this.storage.setItem(`${this.config.storageKey}_index`, JSON.stringify(indexData));
  }

  /**
   * 检查存储空间
   */
  getStorageUsage(): { used: number; remaining: number; total: number } {
    try {
      let used = 0;
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) {
          const value = this.storage.getItem(key);
          if (value) {
            used += key.length + value.length;
          }
        }
      }
      
      // localStorage通常限制为5MB
      const total = 5 * 1024 * 1024; // 5MB
      const remaining = Math.max(0, total - used);
      
      return { used, remaining, total };
    } catch (error) {
      console.error('Failed to check storage usage:', error);
      return { used: 0, remaining: 0, total: 0 };
    }
  }
}