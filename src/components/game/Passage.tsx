import React from 'react';
import type { Passage } from '../../types/game';

interface PassageComponentProps {
  passage: Passage;
  onChoiceSelect: (choice: any) => void; // 这里应该使用更具体的类型
}

const PassageComponent: React.FC<PassageComponentProps> = ({ passage, onChoiceSelect }) => {
  return (
    <div id="passage">
      <div className="passage-text">
        <p>{passage.text}</p>
      </div>
    </div>
  );
};

export default PassageComponent;