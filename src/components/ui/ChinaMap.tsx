import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { ChinaMapProps, MapInteractionState, ProvinceData } from '../../types/map';
import { CHINA_PROVINCES, calculateProvinceColor } from '../../data/chinaProvinces';
import styles from './ChinaMap.module.css';

export const ChinaMap: React.FC<ChinaMapProps> = React.memo(({
  mode = 'selection',
  selectedProvince,
  provinceData = [],
  onProvinceSelect,
  showDataVisualization = true,
  className = '',
  size = 'medium',
  colorScheme = 'green-red'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [interactionState, setInteractionState] = useState<MapInteractionState>({
    hoveredProvince: null,
    selectedProvince: selectedProvince || null,
    zoomLevel: 1,
    panOffset: [0, 0],
    isDragging: false
  });

  // 计算数据范围
  const { minValue, maxValue } = useMemo(() => {
    const values = provinceData.map(p => p.value);
    return {
      minValue: Math.min(...values, 0),
      maxValue: Math.max(...values, 1)
    };
  }, [provinceData]);

  // 获取省份数据
  const getProvinceData = useCallback((provinceName: string): ProvinceData | undefined => {
    return provinceData.find(p => p.name === provinceName);
  }, [provinceData]);

  // 获取省份颜色
  const getProvinceColor = useCallback((provinceName: string): string => {
    if (!showDataVisualization) return '#e5e7eb';
    
    const data = getProvinceData(provinceName);
    if (!data) return '#f3f4f6';
    
    return calculateProvinceColor(data.value, minValue, maxValue, colorScheme);
  }, [showDataVisualization, getProvinceData, minValue, maxValue, colorScheme]);

  // 处理省份点击
  const handleProvinceClick = useCallback((provinceName: string) => {
    if (mode === 'selection' && onProvinceSelect) {
      setInteractionState(prev => ({
        ...prev,
        selectedProvince: provinceName
      }));
      onProvinceSelect(provinceName);
    }
  }, [mode, onProvinceSelect]);

  // 处理鼠标悬停
  const handleMouseEnter = useCallback((provinceName: string) => {
    setInteractionState(prev => ({
      ...prev,
      hoveredProvince: provinceName
    }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setInteractionState(prev => ({
      ...prev,
      hoveredProvince: null
    }));
  }, []);

  // 处理键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (interactionState.hoveredProvince) {
        handleProvinceClick(interactionState.hoveredProvince);
      }
    }
  }, [interactionState.hoveredProvince, handleProvinceClick]);

  // 渲染省份路径
  const renderProvince = (province: typeof CHINA_PROVINCES[0]) => {
    const isHovered = interactionState.hoveredProvince === province.name;
    const isSelected = interactionState.selectedProvince === province.name;
    const color = getProvinceColor(province.name);
    const data = getProvinceData(province.name);

    return (
      <g key={province.code}>
        <path
          d={province.path}
          fill={color}
          stroke={isSelected ? '#3b82f6' : isHovered ? '#60a5fa' : '#9ca3af'}
          strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
          className={styles.provincePath}
          onClick={() => handleProvinceClick(province.name)}
          onMouseEnter={() => handleMouseEnter(province.name)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={mode === 'selection' ? 0 : -1}
          role={mode === 'selection' ? 'button' : 'img'}
          aria-label={`${province.name}${data ? ` - ${data.value}人通关` : ''}`}
          aria-pressed={isSelected}
        />
        {/* 省份名称标签 */}
        <text
          x={province.center[0]}
          y={province.center[1]}
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.provinceLabel}
          fill={isHovered || isSelected ? '#1f2937' : '#374151'}
          fontSize={size === 'small' ? '10px' : size === 'large' ? '14px' : '12px'}
          fontWeight={isSelected ? 'bold' : 'normal'}
        >
          {province.name}
        </text>
        {/* 数据值显示 */}
        {data && showDataVisualization && (
          <text
            x={province.center[0]}
            y={province.center[1] + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles.dataLabel}
            fill={isHovered || isSelected ? '#374151' : '#6b7280'}
            fontSize={size === 'small' ? '8px' : size === 'large' ? '11px' : '9px'}
          >
            {data.value.toLocaleString()}
          </text>
        )}
      </g>
    );
  };

  // 渲染图例
  const renderLegend = () => {
    if (!showDataVisualization || provinceData.length === 0) return null;

    const steps = 5;
    const stepSize = (maxValue - minValue) / steps;
    
    return (
      <div className={styles.legend}>
        <div className={styles.legendTitle}>通关人数</div>
        <div className={styles.legendGradient}>
          {Array.from({ length: steps }, (_, i) => {
            const value = minValue + stepSize * i;
            const color = calculateProvinceColor(value, minValue, maxValue, colorScheme);
            
            return (
              <div key={i} className={styles.legendItem}>
                <div 
                  className={styles.legendColor}
                  style={{ backgroundColor: color }}
                />
                <span className={styles.legendValue}>
                  {Math.round(value).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 渲染选中省份信息
  const renderSelectedInfo = () => {
    if (!interactionState.selectedProvince) return null;
    
    const data = getProvinceData(interactionState.selectedProvince);
    
    return (
      <div className={styles.selectedInfo}>
        <h3 className={styles.selectedTitle}>{interactionState.selectedProvince}</h3>
        {data && (
          <p className={styles.selectedData}>
            通关人数: {data.value.toLocaleString()}人
          </p>
        )}
        {mode === 'selection' && (
          <p className={styles.selectedHint}>按Enter键确认选择</p>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.chinaMap} ${styles[size]} ${className}`}>
      <div className={styles.mapContainer}>
        <svg
          ref={svgRef}
          viewBox="0 0 500 400"
          className={styles.mapSvg}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 背景 */}
          <rect
            width="500"
            height="400"
            fill="#f9fafb"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          
          {/* 省份渲染 */}
          {CHINA_PROVINCES.map(renderProvince)}
          
          {/* 标题 */}
          <text
            x="250"
            y="20"
            textAnchor="middle"
            className={styles.mapTitle}
            fill="#374151"
            fontSize="16"
            fontWeight="bold"
          >
            中国省份通关数据
          </text>
        </svg>
        
        {/* 悬停提示 */}
        {interactionState.hoveredProvince && (
          <div className={styles.tooltip}>
            <div className={styles.tooltipContent}>
              <strong>{interactionState.hoveredProvince}</strong>
              {(() => {
                const data = getProvinceData(interactionState.hoveredProvince);
                return data ? (
                  <span> - {data.value.toLocaleString()}人通关</span>
                ) : (
                  <span> - 暂无数据</span>
                );
              })()}
            </div>
          </div>
        )}
      </div>
      
      {renderLegend()}
      {renderSelectedInfo()}
    </div>
  );
});

ChinaMap.displayName = 'ChinaMap';