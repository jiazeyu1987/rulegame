import React from 'react';
import type { GameState } from '../../types/game';

interface GameHeaderProps {
  gameState: GameState;
  onChangeProfession: () => void;
  // onOpenSettings: () => void; // 设置按钮已被移除
  // onDebugKill?: () => void; // 调试用：立即死亡（已移除）
  // onTestDeath?: () => void; // 测试死亡界面（已移除）
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameState, onChangeProfession }) => {
  // 格式化时间显示
  const formatTime = (time: number): string => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-header">
      <div className="time-profession-container">
        <div 
          className="profession-display" 
          id="profession-display" 
          onClick={onChangeProfession}
        >
          {gameState.profession}
        </div>
        <div className="time-display" id="time-display">
          {formatTime(gameState.time)}
        </div>
        {/* 移除设置按钮，因为左上角已经有设置按钮了 */}
        {/* <button 
          className="settings-button" 
          id="settings-button"
          onClick={onOpenSettings}
          title="游戏设置"
        >
          ⚙️
        </button> */}
        {/* 移除测试死亡界面按钮 */}
        {/* {onTestDeath && (
          <button 
            className="test-death-button" 
            id="test-death-button"
            onClick={onTestDeath}
            title="测试死亡界面"
            style={{ 
              backgroundColor: '#8b0000', 
              color: 'white', 
              marginLeft: '5px',
              border: '1px solid #ff4444',
              borderRadius: '4px',
              padding: '5px 8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            死
          </button>
        )} */}
        {/* 移除调试用的立即死亡按钮，死亡应该通过故事节点触发 */}
        {/* {import.meta.env.DEV && onDebugKill && (
          <button 
            className="debug-kill-button" 
            id="debug-kill-button"
            onClick={onDebugKill}
            title="调试用：立即死亡"
            style={{ backgroundColor: '#ff0000', color: 'white', marginLeft: '5px' }}
          >
            💀
          </button>
        )} */}
      </div>
      <div className="stats-container">
        <div className="stat-item">
          <div>饱食度</div>
          <div className="stat-value" id="hunger-value">{gameState.hunger}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill hunger-fill" 
              style={{ width: `${gameState.hunger}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div>体力</div>
          <div className="stat-value" id="energy-value">{gameState.energy}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill energy-fill" 
              style={{ width: `${gameState.energy}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div>理智值</div>
          <div className="stat-value" id="sanity-value">{gameState.sanity}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill sanity-fill" 
              style={{ width: `${gameState.sanity}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div>力量</div>
          <div className="stat-value" id="strength-value">{gameState.strength}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill strength-fill" 
              style={{ width: `${gameState.strength}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div>速度</div>
          <div className="stat-value" id="speed-value">{gameState.speed}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill speed-fill" 
              style={{ width: `${gameState.speed}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div>运气</div>
          <div className="stat-value" id="luck-value">{gameState.luck}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill luck-fill" 
              style={{ width: `${gameState.luck}%` }}
            ></div>
          </div>
        </div>
        <div className="stat-item">
          <div>智力</div>
          <div className="stat-value" id="intelligence-value">{gameState.intelligence}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill intelligence-fill" 
              style={{ width: `${gameState.intelligence}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;