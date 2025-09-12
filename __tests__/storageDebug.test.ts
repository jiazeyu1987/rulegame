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
        attributes: {
          health: 100,
          sanity: 100,
          hunger: 50,
          intelligence: 50,
          strength: 50,
          speed: 50,
          luck: 50,
          profession: '学生'
        },
        inventory: [],
        flags: {},
        day: 1,
        time: 0,
        location: 'dormitory'
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
      
      // 检查必需的游戏状态属性
      const requiredGameStateProps = ['attributes', 'inventory', 'flags', 'day', 'time', 'location'];
      for (const prop of requiredGameStateProps) {
        console.log(`游戏状态属性 ${prop}:`, prop in gameState);
        if (!(prop in gameState)) {
          console.log(`游戏状态缺少属性: ${prop}`);
        }
      }
      
      // 检查属性对象
      if ('attributes' in gameState) {
        const attributes = gameState.attributes;
        const requiredStats = [
          'health', 'sanity', 'hunger', 'intelligence', 'strength', 'speed', 'luck', 'profession'
        ];
        
        for (const stat of requiredStats) {
          console.log(`属性字段 ${stat}:`, stat in attributes, typeof (attributes as any)[stat]);
          if (!(stat in attributes)) {
            console.log(`属性验证失败: ${stat}`);
          }
        }
        
        // 检查数值范围
        console.log('饥饿值范围:', attributes.hunger, attributes.hunger < 0 || attributes.hunger > 100);
        console.log('理智值范围:', attributes.sanity, attributes.sanity < 0 || attributes.sanity > 100);
      }
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
        attributes: {
          health: 100,
          sanity: 100,
          hunger: 50,
          intelligence: 50,
          strength: 50,
          speed: 50,
          luck: 50,
          profession: '学生' as Profession
        },
        inventory: [],
        flags: {},
        day: 1,
        time: 0,
        location: 'dormitory'
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