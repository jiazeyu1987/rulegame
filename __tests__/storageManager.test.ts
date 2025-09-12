import { StorageManager } from '../src/utils/storageManager';
import { GameSaveData } from '../src/types/storage';
import { Profession } from '../src/types/game';

describe('StorageManager', () => {
  let storageManager: StorageManager;
  
  beforeEach(() => {
    // 清空localStorage
    localStorage.clear();
    storageManager = new StorageManager();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('save functionality', () => {
    test('should save game data successfully', async () => {
      const testData: GameSaveData = {
        version: '1.0.0',
        playerName: 'TestPlayer',
        profession: '学生' as Profession,
        gameState: {
          time: 0,
          profession: '学生' as Profession,
          hunger: 50,
          energy: 100,
          sanity: 100,
          intelligence: 50,
          strength: 50,
          speed: 50,
          luck: 50
        },
        rulePapers: [],
        clearRules: [],
        currentDay: 1,
        currentNode: 'start',
        gameConfigPath: '',
        lastSaveTime: Date.now(),
        createdTime: Date.now(),
        saveCount: 0
      };

      const result = await storageManager.save(testData);
      expect(result).toBe(true);
    });

    test('should handle save slot limit', async () => {
      // 创建超过最大槽位数的存档
      const maxSlots = 5;
      for (let i = 0; i < maxSlots + 2; i++) {
        const testData: GameSaveData = {
          version: '1.0.0',
          playerName: 'TestPlayer',
          profession: '学生' as Profession,
          gameState: {
            time: 0,
            profession: '学生' as Profession,
            hunger: 50,
            energy: 100,
            sanity: 100,
            intelligence: 50,
            strength: 50,
            speed: 50,
            luck: 50
          },
          rulePapers: [],
          clearRules: [],
          currentDay: i + 1,
          currentNode: 'start',
          gameConfigPath: '',
          lastSaveTime: Date.now(),
          createdTime: Date.now(),
          saveCount: 0
        };
        await storageManager.save(testData);
      }

      const allSaves = await storageManager.getAllSaves();
      expect(allSaves.length).toBe(maxSlots);
    });
  });

  describe('load functionality', () => {
    test('should load existing save data', async () => {
      const testData: GameSaveData = {
        version: '1.0.0',
        playerName: 'TestPlayer',
        profession: '学生' as Profession,
        gameState: {
          time: 0,
          profession: '学生' as Profession,
          hunger: 50,
          energy: 100,
          sanity: 100,
          intelligence: 50,
          strength: 50,
          speed: 50,
          luck: 50
        },
        rulePapers: [],
        clearRules: [],
        currentDay: 1,
        currentNode: 'start',
        gameConfigPath: '',
        lastSaveTime: Date.now(),
        createdTime: Date.now(),
        saveCount: 0
      };

      await storageManager.save(testData);
      const loadedData = await storageManager.load('TestPlayer', 1);
      
      expect(loadedData).not.toBeNull();
      expect(loadedData?.playerName).toBe('TestPlayer');
      expect(loadedData?.currentDay).toBe(1);
    });

    test('should return null for non-existent save', async () => {
      const loadedData = await storageManager.load('NonExistent', 1);
      expect(loadedData).toBeNull();
    });
  });

  describe('data validation', () => {
    test('should validate correct data format', () => {
      const validData = {
        version: '1.0.0',
        playerName: 'TestPlayer',
        profession: '学生' as Profession,
        gameState: {
          time: 0,
          profession: '学生' as Profession,
          hunger: 50,
          energy: 100,
          sanity: 100,
          intelligence: 50,
          strength: 50,
          speed: 50,
          luck: 50
        },
        currentDay: 1,
        currentNode: 'start',
        lastSaveTime: Date.now(),
        createdTime: Date.now()
      };

      expect(storageManager.validate(validData)).toBe(true);
    });

    test('should reject invalid data format', () => {
      const invalidData = {
        playerName: 'TestPlayer',
        // 缺少必要字段
      };

      expect(storageManager.validate(invalidData)).toBe(false);
    });
  });

  describe('error handling', () => {
    test('should handle localStorage quota exceeded', async () => {
      // 模拟存储空间不足
      const quotaError = new Error('QuotaExceededError');
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw quotaError;
      });

      const testData: GameSaveData = {
        version: '1.0.0',
        playerName: 'TestPlayer',
        profession: '学生' as Profession,
        gameState: {
          time: 0,
          profession: '学生' as Profession,
          hunger: 50,
          energy: 100,
          sanity: 100,
          intelligence: 50,
          strength: 50,
          speed: 50,
          luck: 50
        },
        rulePapers: [],
        clearRules: [],
        currentDay: 1,
        currentNode: 'start',
        gameConfigPath: '',
        lastSaveTime: Date.now(),
        createdTime: Date.now(),
        saveCount: 0
      };

      const result = await storageManager.save(testData);
      expect(result).toBe(false);
      
      // 恢复原始实现
      jest.restoreAllMocks();
    });

    test('should handle corrupted data gracefully', async () => {
      // 存储无效JSON数据
      localStorage.setItem('rulegame_save_TestPlayer_1', 'invalid json');
      
      const loadedData = await storageManager.load('TestPlayer', 1);
      expect(loadedData).toBeNull();
    });
  });
});