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
  const [activeTab, setActiveTab] = useState<'speed' | 'test'>('speed');

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 文字速度选项
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

  // 渲染语速设置内容
  const renderSpeedContent = () => (
    <div className="speed-content">
      <div className="setting-section">
        <h3 style={{ color: '#ccc', fontSize: '1.5rem', marginBottom: '1rem' }}>
          文字显示速度
        </h3>
        <p style={{ color: '#999', fontSize: '1rem', marginBottom: '2rem' }}>
          控制场景中文字逐字显示的速度
        </p>
        
        <div className="speed-options" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
            >
              <div className="speed-option-header" style={{ marginBottom: '0.5rem' }}>
                <input 
                  type="radio" 
                  name="textSpeed" 
                  checked={currentSpeed === option.value}
                  onChange={() => handleSpeedSelect(option.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                <label style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {option.label}
                </label>
              </div>
              <div className="speed-option-description" style={{ color: '#aaa', fontSize: '0.9rem' }}>
                {option.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 渲染测试内容
  const renderTestContent = () => (
    <div className="test-content" style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ color: '#ccc', fontSize: '1.5rem', marginBottom: '1rem' }}>测试功能</h3>
      <p style={{ color: '#999', fontSize: '1.2rem', lineHeight: '1.8' }}>
        这是一个测试功能
      </p>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(50, 50, 50, 0.5)', borderRadius: '10px' }}>
        <p style={{ color: '#aaa', fontSize: '1rem' }}>
          更多测试功能正在开发中...
        </p>
      </div>
    </div>
  );

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
            padding: '2rem',
            maxWidth: '800px',
            width: '90%',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.9)',
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            boxShadow: '0 0 50px rgba(100, 100, 100, 0.5)'
          }}
        >
          {/* 顶部标题和退出按钮 */}
          <div 
            className="settings-header"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              marginBottom: '2rem',
              padding: '0 3rem'
            }}
          >
            <h2 
              style={{
                color: '#fff',
                fontSize: '2.5rem',
                margin: 0,
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
              }}
            >
              游戏设置
            </h2>
            <button 
              className="close-button"
              onClick={onClose}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
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

          {/* 主要内容区域 */}
          <div 
            className="settings-main-content"
            style={{
              display: 'flex',
              flex: 1,
              gap: '2rem',
              minHeight: 0
            }}
          >
            {/* 左侧页签导航 */}
            <div 
              className="settings-tabs"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                minWidth: '120px'
              }}
            >
              <button
                className={`tab-button ${activeTab === 'speed' ? 'active' : ''}`}
                onClick={() => setActiveTab('speed')}
                style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: activeTab === 'speed' ? 'rgba(100, 100, 200, 0.3)' : 'rgba(50, 50, 50, 0.5)',
                  color: activeTab === 'speed' ? '#fff' : '#aaa',
                  border: activeTab === 'speed' ? '2px solid #666' : '2px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                语速
              </button>
              <button
                className={`tab-button ${activeTab === 'test' ? 'active' : ''}`}
                onClick={() => setActiveTab('test')}
                style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: activeTab === 'test' ? 'rgba(100, 100, 200, 0.3)' : 'rgba(50, 50, 50, 0.5)',
                  color: activeTab === 'test' ? '#fff' : '#aaa',
                  border: activeTab === 'test' ? '2px solid #666' : '2px solid #444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                测试
              </button>
            </div>

            {/* 右侧内容区域 */}
            <div 
              className="tab-content"
              style={{
                flex: 1,
                backgroundColor: 'rgba(30, 30, 30, 0.5)',
                borderRadius: '10px',
                padding: '2rem',
                overflowY: 'auto'
              }}
            >
              {activeTab === 'speed' ? renderSpeedContent() : renderTestContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;