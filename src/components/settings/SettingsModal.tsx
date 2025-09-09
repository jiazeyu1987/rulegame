import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentSpeed, 
  onSpeedChange 
}) => {
  if (!isOpen) return null;

  // 文字速度选项（毫秒每字符）
  const speedOptions = [
    { value: 10, label: '非常快 (0.01秒/字)', description: '几乎瞬间显示' },
    { value: 50, label: '快 (0.05秒/字)', description: '较快的阅读速度' },
    { value: 100, label: '正常 (0.1秒/字)', description: '标准阅读速度' },
    { value: 200, label: '慢 (0.2秒/字)', description: '较慢的阅读速度' },
    { value: 500, label: '非常慢 (0.5秒/字)', description: '逐字慢慢显示' },
    { value: 1000, label: '极慢 (1秒/字)', description: '每个字显示1秒' }
  ];

  const handleSpeedSelect = (speed: number) => {
    onSpeedChange(speed);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="settings-modal-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal">
        <div className="settings-header">
          <h2>游戏设置</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-content">
          <div className="setting-section">
            <h3>文字显示速度</h3>
            <p className="setting-description">控制场景中文字逐字显示的速度</p>
            
            <div className="speed-options">
              {speedOptions.map((option) => (
                <div 
                  key={option.value} 
                  className={`speed-option ${currentSpeed === option.value ? 'active' : ''}`}
                  onClick={() => handleSpeedSelect(option.value)}
                >
                  <div className="speed-option-header">
                    <input 
                      type="radio" 
                      name="textSpeed" 
                      checked={currentSpeed === option.value}
                      onChange={() => handleSpeedSelect(option.value)}
                    />
                    <label>{option.label}</label>
                  </div>
                  <div className="speed-option-description">
                    {option.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="settings-footer">
          <button className="settings-button primary" onClick={onClose}>
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;