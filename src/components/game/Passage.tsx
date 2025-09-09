import React, { useState, useEffect, useRef } from 'react';
import type { Passage, Choice } from '../../types/game';

interface PassageComponentProps {
  passage: Passage;
  onChoiceSelect?: (choice: Choice) => void; // 可选参数
  onTextComplete?: () => void; // 添加文本完成回调
  textSpeed?: number; // 文字显示速度（毫秒每字符）
}

const PassageComponent: React.FC<PassageComponentProps> = ({ passage, onTextComplete, textSpeed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const textIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const previousTextRef = useRef<string>(''); // Track previous text to prevent duplicate animations
  const isAnimatingRef = useRef<boolean>(false); // Track if animation is currently running
  const completedTextRef = useRef<string>(''); // Track the text that was completed

  // 当passage.text改变时，重新开始动画
  useEffect(() => {
    console.log('=== PASSAGE USEEFFECT TRIGGERED ===');
    console.log('Trigger timestamp:', Date.now());
    console.log('Previous text ref:', previousTextRef.current);
    console.log('New passage text:', passage?.text);
    console.log('Current display text:', displayText);
    console.log('Is animating ref:', isAnimatingRef.current);
    
    // 更智能的文本变化检测
    const newText = passage?.text || '';
    const oldText = previousTextRef.current;
    
    // 检查是否应该开始动画：
    // 1. 如果文本内容不同，应该开始动画
    // 2. 如果文本内容相同但之前没有完成动画，也应该开始动画
    // 3. 如果文本内容相同且已完成动画，则跳过
    if (newText === oldText && completedTextRef.current === newText && newText !== '') {
      console.log('Text content unchanged and already completed, skipping animation restart');
      return;
    }
    
    if (newText === oldText && completedTextRef.current !== newText) {
      console.log('Text content unchanged but not completed, allowing animation to restart');
    }
    
    // 重置完成状态
    completedTextRef.current = '';
    
    // 更新之前的文本引用
    previousTextRef.current = newText;
    
    console.log('Text changed or first load, starting animation');
    console.log('Passage object:', passage);
    
    // 清除之前的定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      isAnimatingRef.current = false;
    }
    
    // 重置状态
    setDisplayText('');
    textIndexRef.current = 0;
    isAnimatingRef.current = true;
    
    // 增强调试信息
    console.log('=== PASSAGE DEBUG INFO ===');
    console.log('Passage object:', passage);
    console.log('Passage text:', passage?.text);
    console.log('Passage text type:', typeof passage?.text);
    console.log('Passage text length:', passage?.text?.length);
    console.log('Text as array:', passage?.text ? Array.from(passage.text) : 'N/A');
    console.log('Current display index:', textIndexRef.current);
    console.log('Is animating:', isAnimatingRef.current);
    
    // 开始逐字显示动画 - 确保文本存在且有效
    if (passage?.text && typeof passage.text === 'string' && passage.text.trim().length > 0) {
      const cleanText = passage.text.trim();
      
      // 使用Array.from正确处理Unicode字符（包括中文）
      const textArray = Array.from(cleanText);
      
      console.log('Clean text:', cleanText);
      console.log('Text array (Unicode-safe):', textArray);
      console.log('Text array length:', textArray.length);
      console.log('Starting animation from index 0');
      
      intervalRef.current = setInterval(() => {
        console.log('Animation step - Current index:', textIndexRef.current, 'Total length:', textArray.length);
        console.log('Available characters:', textArray.map((char, i) => `[${i}]:${char}`).join(', '));
        
        if (textIndexRef.current < textArray.length) {
          const currentChar = textArray[textIndexRef.current];
          console.log('Adding character:', currentChar, 'at index:', textIndexRef.current);
          
          if (currentChar === undefined) {
            console.error('ERROR: Character is undefined at index', textIndexRef.current);
            console.error('Text array:', textArray);
            console.error('Original text:', cleanText);
            console.error('Text array length:', textArray.length);
            console.error('Current index:', textIndexRef.current);
            // Stop the animation to prevent undefined characters
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return;
          }
          
          setDisplayText(prev => prev + currentChar);
          textIndexRef.current += 1;
        } else {
          console.log('Animation complete at index:', textIndexRef.current);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            isAnimatingRef.current = false;
          }
          // 标记文本已完成
          completedTextRef.current = cleanText;
          console.log('Marked text as completed:', completedTextRef.current);
          
          // 通知文本显示完成
          if (onTextComplete) {
            onTextComplete();
          }
        }
      }, textSpeed); // 使用可配置的速度参数
    } else {
      // 如果没有有效文本，直接标记为完成
      console.log('No valid text found, completing immediately');
      isAnimatingRef.current = false;
      completedTextRef.current = ''; // 重置完成状态
      if (onTextComplete) {
        onTextComplete();
      }
    }
    
    // 清理函数
    return () => {
      console.log('=== PASSAGE USEEFFECT CLEANUP ===');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        isAnimatingRef.current = false;
      }
    };
  }, [passage?.text, onTextComplete, textSpeed]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div id="passage">
      <div className="passage-text">
        <p>
          {displayText || (passage?.text && displayText === '' ? '加载中...' : '等待场景加载...')}
        </p>
      </div>
    </div>
  );
};

export default PassageComponent;