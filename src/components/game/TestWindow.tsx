import React, { useState, useRef } from 'react';

interface TestWindowProps {
  onTestSubmit: (input: string) => void;
}

const TestWindow: React.FC<TestWindowProps> = ({ onTestSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // 解析mermaid内容并映射到游戏场景
      const sceneMapping = parseMermaidToScene(inputValue);
      console.log('场景映射结果:', sceneMapping);
      onTestSubmit(inputValue);
      setInputValue(''); // 清空输入框
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
        setInputValue(content);
      };
      reader.readAsText(file);
    }
  };

  // 解析mermaid内容并映射到游戏场景
  const parseMermaidToScene = (mermaidContent: string) => {
    // 解析mermaid流程图
    const lines = mermaidContent.split('\n');
    const nodes: Record<string, string> = {}; // 节点ID到节点名称的映射
    const connections: Array<{from: string, to: string, condition: string}> = []; // 连接关系
    
    // 提取节点和连接信息
    for (const line of lines) {
      // 匹配节点定义: N1["节点1：卧室醒来"]
      const nodeMatch = line.match(/([A-Z0-9_]+)\["(.+?)"\]/);
      if (nodeMatch) {
        const nodeId = nodeMatch[1];
        const nodeLabel = nodeMatch[2];
        nodes[nodeId] = nodeLabel;
      }
      
      // 匹配连接关系: N1 -->|"看纸条"| N2
      const connectionMatch = line.match(/([A-Z0-9_]+)\s*-->\s*\|(.+?)\|\s*([A-Z0-9_]+)/);
      if (connectionMatch) {
        // 去除条件中的双引号
        const condition = connectionMatch[2].replace(/^"(.+(?="$))"$/, '$1');
        connections.push({
          from: connectionMatch[1],
          to: connectionMatch[3],
          condition: condition
        });
      }
      
      // 匹配简单连接关系: N1 --> N2
      const simpleConnectionMatch = line.match(/([A-Z0-9_]+)\s*-->\s*([A-Z0-9_]+)/);
      if (simpleConnectionMatch) {
        connections.push({
          from: simpleConnectionMatch[1],
          to: simpleConnectionMatch[2],
          condition: '默认'
        });
      }
    }
    
    // 返回解析结果
    return {
      nodes,
      connections
    };
  };

  return (
    <div className="test-window">
      <h3>测试窗口</h3>
      <div className="test-content">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入mermaid内容或读取文件"
          className="test-input"
          style={{ minHeight: '100px', resize: 'vertical' }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".md,.txt,.mermaid"
          style={{ display: 'none' }}
        />
        <button onClick={handleFileRead} className="test-button">
          读取文件
        </button>
        <button onClick={handleSubmit} className="test-button">
          解析并映射场景
        </button>
      </div>
    </div>
  );
};

export default TestWindow;