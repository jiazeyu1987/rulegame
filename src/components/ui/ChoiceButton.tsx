import React, { useState } from 'react';
import styles from './ChoiceButton.module.css';

export interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = React.memo(({
  text,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  className = '',
  ariaLabel
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
      onClick();
      setTimeout(() => setIsPressed(false), 150);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const buttonClasses = `
    ${styles.choiceButton}
    ${styles[variant]}
    ${styles[size]}
    ${loading ? styles.loading : ''}
    ${isPressed ? styles.pressed : ''}
    ${disabled ? styles.disabled : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      aria-label={ariaLabel || text}
      aria-disabled={disabled || loading}
      aria-pressed={isPressed}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          ⟳
        </span>
      )}
      {icon && !loading && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.text}>{text}</span>
    </button>
  );
});

ChoiceButton.displayName = 'ChoiceButton';