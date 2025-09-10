import React, { useState, useEffect, useRef } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
  onTestSubmit: (input: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentSpeed, 
  onSpeedChange,
  onTestSubmit
}) => {
  // 所有Hook必须在组件顶层，在任何条件语句之前
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'speed' | 'test'>('speed');
  const [testInput, setTestInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // 注意：Hook调用必须在任何return语句之前
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

  // 渲染测试内容 - 包含完整的测试窗口功能
  const renderTestContent = () => {

    // 解析mermaid内容并映射到游戏场景
    const parseMermaidToScene = (mermaidContent: string) => {
      const lines = mermaidContent.split('\n');
      const nodes: Record<string, string> = {};
      const connections: Array<{from: string, to: string, condition: string}> = [];
      
      for (const line of lines) {
        const nodeMatch = line.match(/([A-Z0-9_]+)\["(.+?)"\]/);
        if (nodeMatch) {
          const nodeId = nodeMatch[1];
          const nodeLabel = nodeMatch[2];
          nodes[nodeId] = nodeLabel;
        }
        
        const connectionMatch = line.match(/([A-Z0-9_]+)\s*-->\s*\|(.+?)\|\s*([A-Z0-9_]+)/);
        if (connectionMatch) {
          const condition = connectionMatch[2].replace(/^"(.+(?="$))"$/, '$1');
          connections.push({
            from: connectionMatch[1],
            to: connectionMatch[3],
            condition: condition
          });
        }
        
        const simpleConnectionMatch = line.match(/([A-Z0-9_]+)\s*-->\s*([A-Z0-9_]+)/);
        if (simpleConnectionMatch) {
          connections.push({
            from: simpleConnectionMatch[1],
            to: simpleConnectionMatch[2],
            condition: '默认'
          });
        }
      }
      
      return { nodes, connections };
    };

    const handleTestSubmit = () => {
      if (testInput.trim()) {
        const sceneMapping = parseMermaidToScene(testInput);
        console.log('测试解析结果:', sceneMapping);
        // 保存到localStorage
        localStorage.setItem('lastStoryContent', testInput);
        // 调用父组件的onTestSubmit
        onTestSubmit(testInput);
      }
    };

    const handleFileRead = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setTestInput(content);
        };
        reader.readAsText(file);
      }
    };

    const handleSave = () => {
      if (testInput.trim()) {
        localStorage.setItem('lastStoryContent', testInput);
      }
    };

    const handleLoad = () => {
      const savedContent = localStorage.getItem('lastStoryContent');
      if (savedContent) {
        setTestInput(savedContent);
        onTestSubmit(savedContent);
      }
    };

    return (
      <div className="test-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ color: '#ccc', fontSize: '1.5rem', marginBottom: '0.5rem' }}>故事测试功能</h3>
          <p style={{ color: '#999', fontSize: '1rem' }}>
            在这里输入或加载mermaid格式的故事内容，测试故事解析功能
          </p>
        </div>
        
        {/* 文本输入区域 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="请输入mermaid内容，例如：\nflowchart TD\nN1[卧室醒来] -->|看纸条| N2[阅读规则]"
            style={{
              flex: 1,
              backgroundColor: 'rgba(40, 40, 40, 0.8)',
              border: '2px solid #555',
              borderRadius: '8px',
              color: '#fff',
              padding: '1rem',
              fontSize: '1rem',
              fontFamily: 'monospace',
              resize: 'vertical',
              minHeight: '200px'
            }}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".md,.txt,.mermaid"
            style={{ display: 'none' }}
          />
        </div>

        {/* 操作按钮区域 */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleFileRead}
            style={{
              flex: 1,
              minWidth: '120px',
              background: 'linear-gradient(135deg, #4a5568, #2d3748)',
              color: 'white',
              border: '2px solid #666',
              borderRadius: '6px',
              padding: '0.8rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
              e.currentTarget.style.borderColor = '#777';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
              e.currentTarget.style.borderColor = '#666';
            }}
          >
            读取文件
          </button>
          
          <button
            onClick={handleTestSubmit}
            style={{
              flex: 1,
              minWidth: '140px',
              background: 'linear-gradient(135deg, #4a5568, #2d3748)',
              color: 'white',
              border: '2px solid #666',
              borderRadius: '6px',
              padding: '0.8rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
              e.currentTarget.style.borderColor = '#777';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
              e.currentTarget.style.borderColor = '#666';
            }}
          >
            解析并映射场景
          </button>
          
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              minWidth: '100px',
              background: 'linear-gradient(135deg, #4a5568, #2d3748)',
              color: 'white',
              border: '2px solid #666',
              borderRadius: '6px',
              padding: '0.8rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
              e.currentTarget.style.borderColor = '#777';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
              e.currentTarget.style.borderColor = '#666';
            }}
          >
            保存故事
          </button>
          
          <button
            onClick={handleLoad}
            style={{
              flex: 1,
              minWidth: '100px',
              background: 'linear-gradient(135deg, #4a5568, #2d3748)',
              color: 'white',
              border: '2px solid #666',
              borderRadius: '6px',
              padding: '0.8rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
              e.currentTarget.style.borderColor = '#777';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
              e.currentTarget.style.borderColor = '#666';
            }}
          >
            加载故事
          </button>
        </div>
      </div>
  );
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
          {/* 顶部标题 */}
          <div 
            className="settings-header"
            style={{
              marginBottom: '2rem',
              textAlign: 'center'
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

          {/* 底部关闭按钮 */}
          <div 
            className="settings-footer"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
              paddingTop: '1rem',
              borderTop: '1px solid #444'
            }}
          >
            <button 
              className="close-button-text"
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #4a5568, #2d3748)',
                color: 'white',
                border: '2px solid #666',
                borderRadius: '8px',
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
                e.currentTarget.style.borderColor = '#777';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(100, 100, 100, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
                e.currentTarget.style.borderColor = '#666';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(1px)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;