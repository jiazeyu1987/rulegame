import { StorageManager } from '../src/utils/storageManager';
import { GameSaveData } from '../src/types/storage';
import { Profession } from '../src/types/game';

describe('StorageManager - 调试测试', () => {
  let storageManager: StorageManager;
  
  beforeEach(() => {
    localStorage.clear();
    storageManager = new StorageManager();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('验证具体字段', () => {
    const testData = {
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

    console.log('测试数据:', JSON.stringify(testData, null, 2));
    
    // 逐个检查必需字段
    const requiredFields = [
      'version', 'playerName', 'profession', 'gameState', 
      'currentDay', 'currentNode', 'lastSaveTime', 'createdTime'
    ];
    
    for (const field of requiredFields) {
      console.log(`检查字段 ${field}:`, field in testData);
      if (!(field in testData)) {
        console.log(`缺少字段: ${field}`);
      }
    }
    
    // 检查版本
    console.log('版本检查:', testData.version === '1.0.0');
    
    // 检查玩家名称
    console.log('玩家名称检查:', testData.playerName, typeof testData.playerName, testData.playerName.trim() === '');
    
    // 检查职业
    const validProfessions = ['学生', '老人', '残疾人', '律师', '医生', '教师', '工人', '警察', '艺术家', '商人'];
    console.log('职业检查:', testData.profession, validProfessions.includes(testData.profession));
    
    // 检查天数
    console.log('天数检查:', testData.currentDay, typeof testData.currentDay, testData.currentDay < 1);
    
    // 检查游戏状态
    console.log('游戏状态存在:', 'gameState' in testData);
    if ('gameState' in testData) {
      console.log('游戏状态类型:', typeof testData.gameState);
      const gameState = testData.gameState;
      const requiredStats = [
        'time', 'profession', 'hunger', 'energy', 'sanity',
        'intelligence', 'strength', 'speed', 'luck'
      ];
      
      for (const stat of requiredStats) {
        console.log(`游戏状态字段 ${stat}:`, stat in gameState, typeof gameState[stat]);
        if (!(stat in gameState) || typeof gameState[stat] !== 'number') {
          console.log(`游戏状态验证失败: ${stat}`);
        }
      }
      
      // 检查数值范围
      console.log('饥饿值范围:', gameState.hunger, gameState.hunger < 0 || gameState.hunger > 100);
      console.log('能量值范围:', gameState.energy, gameState.energy < 0 || gameState.energy > 100);
      console.log('理智值范围:', gameState.sanity, gameState.sanity < 0 || gameState.sanity > 100);
    }
    
    const result = storageManager.validate(testData);
    console.log('验证结果:', result);
    
    expect(result).toBe(true);
  });

  test('最小化测试数据', async () => {
    const minimalData: GameSaveData = {
      version: '1.0.0',
      playerName: 'Test',
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

    console.log('最小化数据验证:', storageManager.validate(minimalData));
    
    const saveResult = await storageManager.save(minimalData);
    console.log('保存结果:', saveResult);
    
    expect(saveResult).toBe(true);
  });
});