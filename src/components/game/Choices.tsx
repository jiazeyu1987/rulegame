import React from 'react';
import type { Choice } from '../../types/game';

interface ChoicesProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
}

const Choices: React.FC<ChoicesProps> = ({ choices, onChoiceSelect }) => {
  return (
    <div id="choices">
      <div className="choice-title">请选择你的行动：</div>
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onChoiceSelect(choice)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default Choices;