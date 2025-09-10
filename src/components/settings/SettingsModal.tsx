import React, { useState, useEffect } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 打开设置时开始淡入动画
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 文字速度选项（毫秒每字符）
  const speedOptions = [
    { value: 10, label: '非常快', description: '几乎瞬间显示' },
    { value: 50, label: '快', description: '较快的阅读速度' },
    { value: 100, label: '正常', description: '标准阅读速度' },
    { value: 200, label: '慢', description: '较慢的阅读速度' },
    { value: 500, label: '非常慢', description: '逐字慢慢显示' },
    { value: 1000, label: '极慢', description: '每个字显示1秒' }
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
    <div 
      className={`settings-screen ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99998,
        margin: 0,
        padding: 0,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        transform: 'none',
        maxWidth: 'none'
      }}
      onClick={handleOverlayClick}
    >
      <div 
        className="settings-modal-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div 
          className="settings-content-wrapper"
          style={{
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            border: '2px solid #444',
            borderRadius: '15px',
            padding: '3rem',
            maxWidth: '600px',
            width: '90%',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.9)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            boxShadow: '0 0 50px rgba(100, 100, 100, 0.5)'
          }}
        >
          {/* 标题 */}
          <div 
            className="settings-header"
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h2 
              style={{
                color: '#fff',
                fontSize: '2.5rem',
                margin: 0,
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
              }}
            >
              游戏设置
            </h2>
            <button 
              className="close-button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '0.5rem',
                lineHeight: 1,
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              ×
            </button>
          </div>

          {/* 设置内容 */}
          <div className="settings-main-content">
            <div className="setting-section" style={{ marginBottom: '2rem' }}>
              <h3 
                style={{
                  color: '#ccc',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}
              >
                文字显示速度
              </h3>
              <p 
                style={{
                  color: '#999',
                  fontSize: '1rem',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}
              >
                控制场景中文字逐字显示的速度
              </p>
              
              <div 
                className="speed-options"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}
              >
                {speedOptions.map((option) => (
                  <div 
                    key={option.value} 
                    className={`speed-option ${currentSpeed === option.value ? 'active' : ''}`}
                    onClick={() => handleSpeedSelect(option.value)}
                    style={{
                      backgroundColor: currentSpeed === option.value ? 'rgba(100, 100, 200, 0.3)' : 'rgba(50, 50, 50, 0.5)',
                      border: currentSpeed === option.value ? '2px solid #666' : '2px solid #444',
                      borderRadius: '10px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(80, 80, 80, 0.7)';
                      e.currentTarget.style.borderColor = '#666';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = currentSpeed === option.value ? 'rgba(100, 100, 200, 0.3)' : 'rgba(50, 50, 50, 0.5)';
                      e.currentTarget.style.borderColor = currentSpeed === option.value ? '2px solid #666' : '2px solid #444';
                    }}
                  >
                    <div 
                      className="speed-option-header"
                      style={{ marginBottom: '0.5rem' }}
                    >
                      <input 
                        type="radio" 
                        name="textSpeed" 
                        checked={currentSpeed === option.value}
                        onChange={() => handleSpeedSelect(option.value)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      <label 
                        style={{
                          color: '#fff',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {option.label}
                      </label>
                    </div>
                    <div 
                      className="speed-option-description"
                      style={{
                        color: '#aaa',
                        fontSize: '0.9rem'
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div 
            className="settings-footer"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            <button 
              className="settings-button primary"
              onClick={onClose}
              style={{
                fontSize: '1.2rem',
                padding: '0.8rem 2rem',
                background: 'linear-gradient(135deg, #4a5568, #2d3748)',
                color: 'white',
                border: '2px solid #666',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
                e.currentTarget.style.borderColor = '#777';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(100, 100, 100, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
                e.currentTarget.style.borderColor = '#666';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;