import React from 'react';
import type { ClearRule } from '../../types/game';

interface ClearRulesProps {
  clearRules: ClearRule[];
}

const ClearRules: React.FC<ClearRulesProps> = ({ clearRules }) => {
  return (
    <div className="clear-rules-container">
      <div className="rule-paper" id="current-clear-rule">
        <div className="rule-title" id="current-clear-rule-title">通关条件</div>
        <div className="rule-item" id="current-clear-rule-item">
          {clearRules.map((paper) => (
            <div className="rule-item" key={paper.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className="rule-text" style={{ color: '#dddddd' }}>
                  <strong>{paper.title}:</strong> {paper.rule}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClearRules;