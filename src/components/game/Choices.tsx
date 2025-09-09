import React, { useState, useEffect } from 'react';
import type { Choice } from '../../types/game';

interface ChoicesProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  isPassageTextComplete?: boolean; // 添加场景文字完成状态
}

const Choices: React.FC<ChoicesProps> = ({ choices, onChoiceSelect, isPassageTextComplete = false }) => {
  const [isChoicesVisible, setIsChoicesVisible] = useState(false);

  // 当场景文字显示完成时，开始显示选择项
  useEffect(() => {
    if (isPassageTextComplete) {
      // 设置一个延迟，让场景文字显示完成后再显示选择项
      const timer = setTimeout(() => {
        setIsChoicesVisible(true);
      }, 500); // 0.5秒后开始显示选择项
      
      return () => clearTimeout(timer);
    } else {
      // 当场景文字未完成时，立即隐藏选择项
      setIsChoicesVisible(false);
    }
  }, [isPassageTextComplete]);

  return (
    <div id="choices">
      <div className="choice-title">请选择你的行动：</div>
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onChoiceSelect(choice)}
          style={{
            opacity: isChoicesVisible ? 1 : 0,
            filter: isChoicesVisible ? 'blur(0px)' : 'blur(5px)',
            transition: 'opacity 1s ease, filter 1s ease',
            transitionDelay: isChoicesVisible ? `${index * 0.2}s` : '0s',
            pointerEvents: isChoicesVisible ? 'auto' : 'none' // 在动画完成前禁用点击
          }}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Choices;