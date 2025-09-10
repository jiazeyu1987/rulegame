import React, { useState, useEffect } from 'react';

interface DeathScreenProps {
  onRestart: () => void;
}

const DeathScreen: React.FC<DeathScreenProps> = ({ onRestart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);

  console.log('DeathScreen mounted, initial state:', { isVisible, showButton });

  useEffect(() => {
    console.log('DeathScreen useEffect triggered');
    // 组件挂载后立即开始淡入动画
    const fadeInTimer = setTimeout(() => {
      console.log('Setting isVisible to true');
      setIsVisible(true);
    }, 50); // 稍微减少延迟，让动画更快开始

    // 延迟显示重新开始按钮，创造戏剧效果
    const buttonTimer = setTimeout(() => {
      console.log('Setting showButton to true');
      setShowButton(true);
    }, 2500); // 增加到2.5秒，让用户充分感受死亡氛围

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(buttonTimer);
    };
  }, []); // 空依赖数组确保只在挂载时运行一次

  console.log('DeathScreen rendering with state:', { isVisible, showButton });

  return (
    <div 
      className={`death-screen ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        margin: 0,
        padding: 0,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        transform: 'none',
        maxWidth: 'none'
      }}
    >
      <div 
        className="death-modal"
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
          className="death-content"
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <div 
            className="death-character-container"
            style={{
              marginBottom: '4rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transition: 'opacity 2s ease-out, transform 2s ease-out',
              transitionDelay: '0.5s'
            }}
          >
            <div 
              className="death-character"
              style={{
                fontSize: '25rem',
                fontWeight: '900',
                color: '#8b0000',
                textShadow: `
                  0 0 100px #ff0000,
                  0 0 200px #ff0000,
                  0 0 300px #ff0000,
                  0 0 400px #ff0000
                `,
                fontFamily: 'serif',
                letterSpacing: '-0.1em',
                opacity: '0.9',
                animation: 'death-glow 3s ease-in-out infinite',
                userSelect: 'none',
                cursor: 'default'
              }}
            >
              死
            </div>
          </div>
          {showButton && (
            <div 
              className="death-actions"
              style={{
                opacity: showButton ? 1 : 0,
                transform: showButton ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease-out, transform 1s ease-out'
              }}
            >
              <button 
                className="restart-button" 
                onClick={onRestart}
                style={{
                  fontSize: '1.8rem',
                  padding: '1.2rem 4rem',
                  background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                  color: 'white',
                  border: '2px solid #ff4444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: '0.15em',
                  boxShadow: `
                    0 0 20px rgba(220, 38, 38, 0.5),
                    inset 0 0 20px rgba(255, 255, 255, 0.1)
                  `
                }}
              >
                重新开始
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeathScreen;