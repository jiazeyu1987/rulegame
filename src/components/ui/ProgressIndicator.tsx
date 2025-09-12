import React from 'react';
import styles from './ProgressIndicator.module.css';

export interface ProgressIndicatorProps {
  currentDay: number;
  completedDays: number[];
  totalDays: number;
  onDayClick?: (day: number) => void;
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'linear' | 'circular' | 'calendar';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = React.memo(({
  currentDay,
  completedDays,
  totalDays,
  onDayClick,
  showLabels = true,
  size = 'medium',
  variant = 'linear'
}) => {
  const getDayStatus = (day: number) => {
    if (completedDays.includes(day)) return 'completed';
    if (day === currentDay) return 'current';
    if (day < currentDay) return 'available';
    return 'locked';
  };

  const getProgressPercentage = () => {
    return (completedDays.length / totalDays) * 100;
  };

  const handleDayClick = (day: number) => {
    if (onDayClick && day <= currentDay) {
      onDayClick(day);
    }
  };

  const renderLinearProgress = () => (
    <div className={styles.linearContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <div className={styles.progressInfo}>
        <span className={styles.progressText}>
          进度: {completedDays.length}/{totalDays} 天
        </span>
        <span className={styles.currentDayText}>
          当前: 第{currentDay + 1}天
        </span>
      </div>
    </div>
  );

  const renderCalendarProgress = () => (
    <div className={styles.calendarContainer}>
      <div className={`${styles.calendarGrid} ${styles[size]}`}>
        {Array.from({ length: totalDays }, (_, index) => {
          const day = index;
          const status = getDayStatus(day);
          
          return (
            <button
              key={day}
              className={`${styles.dayCell} ${styles[status]} ${styles[size]}`}
              onClick={() => handleDayClick(day)}
              disabled={day > currentDay}
              aria-label={`第${day + 1}天 - ${getStatusText(status)}`}
            >
              <span className={styles.dayNumber}>{day + 1}</span>
              {showLabels && (
                <span className={styles.dayLabel}>
                  {getDayLabel(day, status)}
                </span>
              )}
              {status === 'completed' && (
                <span className={styles.checkMark} aria-hidden="true">✓</span>
              )}
              {status === 'current' && (
                <span className={styles.currentIndicator} aria-hidden="true">●</span>
              )}
            </button>
          );
        })}
      </div>
      {showLabels && (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.completed}`}></span>
            <span>已完成</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.current}`}></span>
            <span>当前</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.available}`}></span>
            <span>可访问</span>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.locked}`}></span>
            <span>未解锁</span>
          </div>
        </div>
      )}
    </div>
  );

  const getStatusText = (status: string) => {
    const statusMap = {
      completed: '已完成',
      current: '当前进行',
      available: '可访问',
      locked: '未解锁'
    };
    return statusMap[status as keyof typeof statusMap] || '未知';
  };

  const getDayLabel = (day: number, status: string) => {
    if (status === 'completed') return '完成';
    if (status === 'current') return '当前';
    return `第${day + 1}天`;
  };

  return (
    <div className={`${styles.progressIndicator} ${styles[size]} ${styles[variant]}`}>
      {variant === 'linear' && renderLinearProgress()}
      {variant === 'calendar' && renderCalendarProgress()}
    </div>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';