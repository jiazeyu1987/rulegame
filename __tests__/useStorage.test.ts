import { renderHook, act } from '@testing-library/react';
import { useStorage } from '../src/hooks/useStorage';
import { Profession } from '../src/types/game';

describe('useStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should initialize correctly', () => {
    const { result } = renderHook(() => useStorage());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.save).toBe('function');
    expect(typeof result.current.load).toBe('function');
    expect(typeof result.current.getAllSaves).toBe('function');
  });

  test('should handle save operation', async () => {
    const { result } = renderHook(() => useStorage());
    
    const testData = {
      version: '1.0.0',
      playerName: 'TestPlayer',
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

    await act(async () => {
      const saveResult = await result.current.save(testData);
      expect(saveResult).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('should handle loading state during operations', async () => {
    const { result } = renderHook(() => useStorage());
    
    const testData = {
      version: '1.0.0',
      playerName: 'TestPlayer',
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

    // 开始保存操作
    act(() => {
      result.current.save(testData);
    });

    // 检查加载状态
    expect(result.current.isLoading).toBe(true);

    // 等待操作完成
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.isLoading).toBe(false);
  });

  test('should handle errors correctly', async () => {
    const { result } = renderHook(() => useStorage());
    
    // 模拟保存失败
    const invalidData = { invalid: 'data' } as any;

    await act(async () => {
      const saveResult = await result.current.save(invalidData);
      expect(saveResult).toBe(false);
    });

    expect(result.current.error).not.toBeNull();
  });
});