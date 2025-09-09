import React from 'react';

interface DeathScreenProps {
  onRestart: () => void;
}

const DeathScreen: React.FC<DeathScreenProps> = ({ onRestart }) => {
  return (
    <div className="death-screen">
      <div className="death-content">
        <div className="death-character">死</div>
        <div className="death-message">你已经死亡</div>
        <button className="restart-button" onClick={onRestart}>
          重新开始
        </button>
      </div>
    </div>
  );
};

export default DeathScreen;