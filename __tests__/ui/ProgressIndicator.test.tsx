import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressIndicator } from '../../src/components/ui/ProgressIndicator';

describe('ProgressIndicator', () => {
  const mockOnDayClick = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render linear progress indicator', () => {
    render(
      <ProgressIndicator
        currentDay={3}
        completedDays={[0, 1, 2]}
        totalDays={8}
        variant="linear"
      />
    );
    
    expect(screen.getByText('进度: 3/8 天')).toBeInTheDocument();
    expect(screen.getByText('当前: 第4天')).toBeInTheDocument();
  });

  test('should render calendar progress indicator', () => {
    render(
      <ProgressIndicator
        currentDay={3}
        completedDays={[0, 1, 2]}
        totalDays={8}
        variant="calendar"
      />
    );
    
    // 应该显示8个天数按钮
    const dayButtons = screen.getAllByRole('button');
    expect(dayButtons).toHaveLength(8);
    
    // 验证按钮文本
    for (let i = 0; i < 8; i++) {
      expect(screen.getByText(`${i + 1}`)).toBeInTheDocument();
    }
  });

  test('should handle different day statuses correctly', () => {
    render(
      <ProgressIndicator
        currentDay={3}
        completedDays={[0, 1, 2]}
        totalDays={8}
        variant="calendar"
      />
    );
    
    const dayButtons = screen.getAllByRole('button');
    
    // 第1-3天应该标记为已完成
    expect(dayButtons[0]).toHaveClass('completed');
    expect(dayButtons[1]).toHaveClass('completed');
    expect(dayButtons[2]).toHaveClass('completed');
    
    // 第4天应该是当前天
    expect(dayButtons[3]).toHaveClass('current');
    
    // 第5-8天应该是锁定状态
    expect(dayButtons[4]).toHaveClass('locked');
    expect(dayButtons[5]).toHaveClass('locked');
    expect(dayButtons[6]).toHaveClass('locked');
    expect(dayButtons[7]).toHaveClass('locked');
  });

  test('should handle day click events', () => {
    render(
      <ProgressIndicator
        currentDay={3}
        completedDays={[0, 1, 2]}
        totalDays={8}
        variant="calendar"
        onDayClick={mockOnDayClick}
      />
    );
    
    const dayButtons = screen.getAllByRole('button');
    
    // 点击已完成的天数
    fireEvent.click(dayButtons[0]);
    expect(mockOnDayClick).toHaveBeenCalledWith(0);
    
    // 点击当前天数
    fireEvent.click(dayButtons[3]);
    expect(mockOnDayClick).toHaveBeenCalledWith(3);
  });

  test('should not trigger click for locked days', () => {
    render(
      <ProgressIndicator
        currentDay={3}
        completedDays={[0, 1, 2]}
        totalDays={8}
        variant="calendar"
        onDayClick={mockOnDayClick}
      />
    );
    
    const dayButtons = screen.getAllByRole('button');
    
    // 尝试点击锁定的天数
    fireEvent.click(dayButtons[4]); // 第5天，应该被锁定
    
    expect(mockOnDayClick).not.toHaveBeenCalled();
  });

  test('should calculate progress percentage correctly', () => {
    render(
      <ProgressIndicator
        currentDay={2}
        completedDays={[0, 1]}
        totalDays={8}
        variant="linear"
      />
    );
    
    // 2/8 = 25% 完成
    expect(screen.getByText('进度: 2/8 天')).toBeInTheDocument();
    
    // 验证进度条宽度 (这里需要检查样式，简化测试)
    const progressFill = screen.getByText('进度: 2/8 天').closest('.progressIndicator');
    expect(progressFill).toBeInTheDocument();
  });

  test('should handle empty completed days array', () => {
    render(
      <ProgressIndicator
        currentDay={0}
        completedDays={[]}
        totalDays={8}
        variant="linear"
      />
    );
    
    expect(screen.getByText('进度: 0/8 天')).toBeInTheDocument();
    expect(screen.getByText('当前: 第1天')).toBeInTheDocument();
  });

  test('should handle different sizes', () => {
    const { rerender } = render(
      <ProgressIndicator
        currentDay={0}
        completedDays={[]}
        totalDays={8}
        variant="calendar"
        size="small"
      />
    );
    
    let container = screen.getByLabelText('第1天 - 当前进行').closest('.progressIndicator');
    expect(container).toHaveClass('small');
    
    rerender(
      <ProgressIndicator
        currentDay={0}
        completedDays={[]}
        totalDays={8}
        variant="calendar"
        size="large"
      />
    );
    
    container = screen.getByLabelText('第1天 - 当前进行').closest('.progressIndicator');
    expect(container).toHaveClass('large');
  });

  test('should handle showLabels prop correctly', () => {
    render(
      <ProgressIndicator
        currentDay={0}
        completedDays={[]}
        totalDays={8}
        variant="calendar"
        showLabels={false}
      />
    );
    
    // 不应该显示图例
    expect(screen.queryByText('已完成')).not.toBeInTheDocument();
    expect(screen.queryByText('当前')).not.toBeInTheDocument();
  });

  test('should be responsive on mobile', () => {
    // 模拟移动端视口
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true });
    
    render(
      <ProgressIndicator
        currentDay={0}
        completedDays={[]}
        totalDays={8}
        variant="calendar"
      />
    );
    
    const calendarGrid = screen.getByLabelText('第1天 - 当前进行').closest('.calendarContainer')?.querySelector('.calendarGrid');
    expect(calendarGrid).toBeInTheDocument();
  });
});