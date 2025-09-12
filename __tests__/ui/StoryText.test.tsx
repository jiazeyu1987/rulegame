import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { StoryText } from '../../src/components/ui/StoryText';

describe('StoryText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render text content correctly', async () => {
    const testContent = '这是一个测试故事文本。';
    render(<StoryText content={testContent} speed="fast" />);
    
    // Wait for the typing animation to complete
    await waitFor(() => {
      expect(screen.getByText(testContent)).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  test('should display typing animation with cursor', async () => {
    const testContent = '测试文本';
    render(<StoryText content={testContent} speed="fast" />);
    
    // 初始状态应该显示空文本 (使用容器元素而不是不存在的article角色)
    const textElement = screen.getByText('▊').closest('.textContent');
    expect(textElement).toHaveTextContent('▊'); // 只有光标
    
    // 等待打字动画开始
    await waitFor(() => {
      expect(textElement?.textContent).toContain('测');
    }, { timeout: 100 });
    
    // 验证光标存在
    expect(screen.getByText('▊')).toBeInTheDocument();
  });

  test('should call onComplete when animation finishes', async () => {
    const onComplete = jest.fn();
    const testContent = '短文本';
    
    render(<StoryText content={testContent} speed="fast" onComplete={onComplete} />);
    
    // 等待动画完成
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledTimes(1);
    }, { timeout: 500 });
  });

  test('should handle skip functionality', async () => {
    const onComplete = jest.fn();
    const testContent = '这是一个很长的测试文本，用于验证跳过功能。';
    
    render(<StoryText content={testContent} speed="slow" onComplete={onComplete} />);
    
    // 点击跳过按钮
    const skipButton = screen.getByRole('button', { name: '跳过文本动画' });
    fireEvent.click(skipButton);
    
    // 验证立即显示完整文本
    await waitFor(() => {
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });
    
    // 验证回调被调用
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test('should handle different speed settings', async () => {
    const testContent = '速度测试';
    const { rerender } = render(<StoryText content={testContent} speed="slow" />);
    
    // 慢速度应该花更长时间
    const startTime = Date.now();
    await waitFor(() => {
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });
    const slowDuration = Date.now() - startTime;
    
    // 重新渲染为快速度
    rerender(<StoryText content={testContent} speed="fast" />);
    
    const fastStartTime = Date.now();
    await waitFor(() => {
      expect(screen.getByText(testContent)).toBeInTheDocument();
    });
    const fastDuration = Date.now() - fastStartTime;
    
    // 快速度应该比慢速度快
    expect(fastDuration).toBeLessThan(slowDuration);
  });

  test('should handle empty content gracefully', () => {
    const onComplete = jest.fn();
    render(<StoryText content="" speed="fast" onComplete={onComplete} />);
    
    // 空内容应该立即触发完成回调
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test('should cleanup interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const testContent = '测试清理';
    
    const { unmount } = render(<StoryText content={testContent} speed="normal" />);
    
    unmount();
    
    // 验证定时器被清理
    expect(clearIntervalSpy).toHaveBeenCalled();
    
    clearIntervalSpy.mockRestore();
  });
});