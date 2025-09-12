import { useState, useEffect, useCallback } from 'react';
import { StorageManager } from '../utils/storageManager';
import type { GameSaveData } from '../types/storage';

export interface UseStorageReturn {
  save: (data: GameSaveData) => Promise<boolean>;
  load: (playerName: string, day: number) => Promise<GameSaveData | null>;
  getAllSaves: () => Promise<GameSaveData[]>;
  clear: (playerName: string, day: number) => Promise<boolean>;
  clearAll: () => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  storageUsage: { used: number; remaining: number; total: number };
}

export const useStorage = (): UseStorageReturn => {
  const [storageManager] = useState(() => new StorageManager());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storageUsage, setStorageUsage] = useState({ used: 0, remaining: 0, total: 0 });

  // 更新存储使用情况
  const updateStorageUsage = useCallback(() => {
    const usage = storageManager.getStorageUsage();
    setStorageUsage(usage);
  }, [storageManager]);

  useEffect(() => {
    updateStorageUsage();
  }, [updateStorageUsage]);

  const save = useCallback(async (data: GameSaveData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await storageManager.save(data);
      updateStorageUsage();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [storageManager, updateStorageUsage]);

  const load = useCallback(async (playerName: string, day: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await storageManager.load(playerName, day);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [storageManager]);

  const getAllSaves = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const saves = await storageManager.getAllSaves();
      updateStorageUsage();
      return saves;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [storageManager, updateStorageUsage]);

  const clear = useCallback(async (playerName: string, day: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await storageManager.clear(playerName, day);
      updateStorageUsage();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [storageManager, updateStorageUsage]);

  const clearAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await storageManager.clearAll();
      updateStorageUsage();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [storageManager, updateStorageUsage]);

  return {
    save,
    load,
    getAllSaves,
    clear,
    clearAll,
    isLoading,
    error,
    storageUsage
  };
};