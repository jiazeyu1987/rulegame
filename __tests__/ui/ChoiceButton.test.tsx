import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ChoiceButton } from '../../src/components/ui/ChoiceButton';

describe('ChoiceButton', () => {
  const mockOnClick = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render button with text', () => {
    render(<ChoiceButton text="测试按钮" onClick={mockOnClick} />);
    
    expect(screen.getByRole('button', { name: '测试按钮' })).toBeInTheDocument();
  });

  test('should handle click events', async () => {
    const user = userEvent.setup();
    render(<ChoiceButton text="点击我" onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should handle keyboard navigation', async () => {
    render(<ChoiceButton text="键盘测试" onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    
    // 测试Enter键
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    
    // 测试Space键 (等待一小段时间避免快速点击检测)
    await new Promise(resolve => setTimeout(resolve, 200));
    fireEvent.keyDown(button, { key: ' ' });
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  test('should handle disabled state', async () => {
    const user = userEvent.setup();
    render(<ChoiceButton text="禁用按钮" onClick={mockOnClick} disabled />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    await user.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test('should handle loading state', () => {
    render(<ChoiceButton text="加载中" onClick={mockOnClick} loading />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('⟳')).toBeInTheDocument();
  });

  test('should apply different variants correctly', () => {
    const { rerender } = render(<ChoiceButton text="主要按钮" onClick={mockOnClick} variant="primary" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('primary');
    
    rerender(<ChoiceButton text="次要按钮" onClick={mockOnClick} variant="secondary" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
    
    rerender(<ChoiceButton text="危险按钮" onClick={mockOnClick} variant="danger" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('danger');
  });

  test('should apply different sizes correctly', () => {
    const { rerender } = render(<ChoiceButton text="小按钮" onClick={mockOnClick} size="small" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('small');
    
    rerender(<ChoiceButton text="中按钮" onClick={mockOnClick} size="medium" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('medium');
    
    rerender(<ChoiceButton text="大按钮" onClick={mockOnClick} size="large" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('large');
  });

  test('should display icon when provided', () => {
    const testIcon = <span>🎮</span>;
    render(<ChoiceButton text="带图标" onClick={mockOnClick} icon={testIcon} />);
    
    expect(screen.getByText('🎮')).toBeInTheDocument();
  });

  test('should handle aria attributes correctly', () => {
    render(<ChoiceButton text="ARIA测试" onClick={mockOnClick} ariaLabel="自定义标签" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '自定义标签');
    expect(button).toHaveAttribute('aria-disabled', 'false');
  });

  test('should prevent rapid clicks', async () => {
    const user = userEvent.setup();
    render(<ChoiceButton text="快速点击" onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    
    // 快速连续点击
    await user.click(button);
    await user.click(button);
    await user.click(button);
    
    // 应该只触发一次（因为按钮有按压状态的延迟）
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});