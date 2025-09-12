import { StorageManager } from '../src/utils/storageManager';
import { GameSaveData } from '../src/types/storage';
import { Profession } from '../src/types/game';

describe('StorageManager - 简化测试', () => {
  let storageManager: StorageManager;
  
  beforeEach(() => {
    localStorage.clear();
    storageManager = new StorageManager();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('基本保存和读取功能', async () => {
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

    // 测试保存
    const saveResult = await storageManager.save(testData);
    expect(saveResult).toBe(true);

    // 测试读取
    const loadedData = await storageManager.load('TestPlayer', 1);
    expect(loadedData).not.toBeNull();
    expect(loadedData?.playerName).toBe('TestPlayer');
    expect(loadedData?.currentDay).toBe(1);
  });

  test('数据验证功能', () => {
    const validData = {
      version: '1.0.0',
      playerName: 'TestPlayer',
      profession: '学生',
      gameState: {
        time: 0,
        profession: '学生',
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

  test('存储空间监控', () => {
    const usage = storageManager.getStorageUsage();
    expect(usage).toHaveProperty('used');
    expect(usage).toHaveProperty('remaining');
    expect(usage).toHaveProperty('total');
    expect(usage.total).toBe(5 * 1024 * 1024); // 5MB
  });

  test('清除功能', async () => {
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

    // 保存数据
    await storageManager.save(testData);
    
    // 验证数据存在
    let loadedData = await storageManager.load('TestPlayer', 1);
    expect(loadedData).not.toBeNull();

    // 清除数据
    const clearResult = await storageManager.clear('TestPlayer', 1);
    expect(clearResult).toBe(true);

    // 验证数据已被清除
    loadedData = await storageManager.load('TestPlayer', 1);
    expect(loadedData).toBeNull();
  });

  test('错误处理 - 损坏的数据', async () => {
    // 存储无效JSON数据
    localStorage.setItem('rulegame_save_TestPlayer_1', 'invalid json');
    
    const loadedData = await storageManager.load('TestPlayer', 1);
    expect(loadedData).toBeNull();
  });

  test('性能测试 - 保存响应时间', async () => {
    const testData: GameSaveData = {
      version: '1.0.0',
      playerName: 'PerformanceTest',
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

    const startTime = performance.now();
    const result = await storageManager.save(testData);
    const endTime = performance.now();
    
    expect(result).toBe(true);
    expect(endTime - startTime).toBeLessThan(100); // 应小于100ms
  });
});