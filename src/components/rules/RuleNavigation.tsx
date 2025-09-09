import React from 'react';

interface RuleNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

const RuleNavigation: React.FC<RuleNavigationProps> = ({ onPrev, onNext }) => {
  return (
    <div className="rule-navigation">
      <button className="nav-button" onClick={onPrev} aria-label="上一张规则">
        ←
      </button>
      <button className="nav-button" onClick={onNext} aria-label="下一张规则">
        →
      </button>
    </div>
  );
};

export default RuleNavigation;