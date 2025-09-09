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

  // 当passage.text改变时，重新开始动画
  useEffect(() => {
    // 清除之前的定时器
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // 重置状态
    setDisplayText('');
    textIndexRef.current = 0;
    
    // 增强调试信息
    console.log('=== PASSAGE DEBUG INFO ===');
    console.log('Passage object:', passage);
    console.log('Passage text:', passage?.text);
    console.log('Passage text type:', typeof passage?.text);
    console.log('Passage text length:', passage?.text?.length);
    console.log('Text as array:', passage?.text ? Array.from(passage.text) : 'N/A');
    console.log('Current display index:', textIndexRef.current);
    
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
          }
          // 通知文本显示完成
          if (onTextComplete) {
            onTextComplete();
          }
        }
      }, textSpeed); // 使用可配置的速度参数
    } else {
      // 如果没有有效文本，直接标记为完成
      console.log('No valid text found, completing immediately');
      if (onTextComplete) {
        onTextComplete();
      }
    }
    
    // 清理函数
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [passage?.text, onTextComplete, textSpeed]); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div id="passage">
      <div className="passage-text">
        <p>{displayText || (passage?.text ? '加载中...' : '等待场景加载...')}</p>
      </div>
    </div>
  );
};

export default PassageComponent;