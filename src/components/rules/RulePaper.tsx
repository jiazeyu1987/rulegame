import React from 'react';
import type { RulePaper } from '../../types/game';

interface RulePaperProps {
  paper: RulePaper;
  onToggleRuleMark: (ruleId: number) => void;
}

const RulePaperComponent: React.FC<RulePaperProps> = ({ paper, onToggleRuleMark }) => {
  return (
    <div className="rule-paper" id="current-rule">
      <div className="rule-title" id="current-rule-title">{paper.title}</div>
      <div className="rule-item" id="current-rule-item">
        {paper.found ? (
          paper.rules.map((rule) => {
            // 根据标记状态设置规则文本颜色
            let ruleTextColor = '#dddddd'; // 默认灰色
            if (rule.marked === 'true') {
              ruleTextColor = '#88cc88'; // 浅绿色
            } else if (rule.marked === 'false') {
              ruleTextColor = '#cc8888'; // 浅红色
            }
            
            return (
              <div className="rule-item" key={rule.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="rule-text" style={{ color: ruleTextColor }}>
                    {rule.text}
                  </span>
                  <button 
                    className="mark-button-inline" 
                    onClick={() => onToggleRuleMark(rule.id)}
                    data-marked={rule.marked}
                  >
                    {rule.marked === 'true' ? '真' : rule.marked === 'false' ? '假' : '?'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          // 规则未找到时显示提示
          <div className="rule-item">
            <div style={{ 
              textAlign: 'center', 
              color: '#888', 
              fontStyle: 'italic', 
              padding: '30px', 
              fontSize: '16px', 
              background: 'rgba(136, 136, 136, 0.1)', 
              borderRadius: '8px', 
              border: '1px dashed #d2b48c' 
            }}>
              规则未找到
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulePaperComponent;