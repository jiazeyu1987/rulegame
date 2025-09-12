import React, { useState, useEffect, useRef } from 'react';
import styles from './StoryText.module.css';

export interface StoryTextProps {
  content: string;
  speed?: 'slow' | 'normal' | 'fast';
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
}

const SPEED_MAP = {
  slow: 100,
  normal: 50,
  fast: 25
};

export const StoryText: React.FC<StoryTextProps> = React.memo(({
  content,
  speed = 'normal',
  onComplete,
  className = '',
  showCursor = true,
  cursorChar = '▊'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 重置状态
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);

    // 如果内容为空，立即完成
    if (content.length === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // 开始打字机效果
    const typingSpeed = SPEED_MAP[speed];
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        
        if (nextIndex > content.length) {
          // 完成打字
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsComplete(true);
          onComplete?.();
          return prev;
        }
        
        setDisplayText(content.slice(0, nextIndex));
        return nextIndex;
      });
    }, typingSpeed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [content, speed, onComplete]);

  const handleSkip = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(content);
    setCurrentIndex(content.length);
    setIsComplete(true);
    onComplete?.();
  };

  return (
    <div className={`${styles.storyText} ${className}`}>
      <div className={styles.textContent}>
        {displayText}
        {showCursor && !isComplete && (
          <span className={styles.cursor}>{cursorChar}</span>
        )}
      </div>
      {!isComplete && (
        <button 
          className={styles.skipButton}
          onClick={handleSkip}
          aria-label="跳过文本动画"
        >
          跳过
        </button>
      )}
    </div>
  );
});

StoryText.displayName = 'StoryText';