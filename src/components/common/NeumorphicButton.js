import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $size }) => {
    switch($size) {
      case 'small': return '0.5rem 1.25rem';
      case 'large': return '0.875rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  border: none;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  font-size: ${({ $size }) => {
    switch($size) {
      case 'small': return '0.85rem';
      case 'large': return '1.1rem';
      default: return '1rem';
    }
  }};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  outline: none;
  white-space: nowrap;
  overflow: hidden;
  z-index: 1;
  
  /* Base styles for all buttons */
  ${({ $variant, theme }) => {
    if ($variant === 'primary') {
      return css`
        background: ${theme.colors.primary};
        color: white;
        box-shadow: ${theme.shadows.buttonPrimary};
        
        &:hover {
          box-shadow: ${theme.shadows.buttonPrimaryHover};
          transform: translateY(-2px);
        }
        
        &:active {
          box-shadow: ${theme.shadows.buttonPressed};
          transform: translateY(1px);
        }
      `;
    } else if ($variant === 'secondary') {
      return css`
        background: ${theme.colors.cardBackground};
        color: ${theme.colors.primary};
        box-shadow: ${theme.shadows.neumorphicLight};
        
        &:hover {
          box-shadow: ${theme.shadows.neumorphicLightHover};
          transform: translateY(-2px);
        }
        
        &:active {
          box-shadow: ${theme.shadows.buttonPressed};
          transform: translateY(1px);
        }
      `;
    } else if ($variant === 'accent') {
      return css`
        background: ${theme.colors.accent};
        color: white;
        box-shadow: 0 4px 14px ${theme.colors.accent}40;
        
        &:hover {
          box-shadow: 0 6px 20px ${theme.colors.accent}60;
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(1px);
          box-shadow: 0 2px 10px ${theme.colors.accent}30;
        }
      `;
    }
    
    // Default/fallback
    return css`
      background: ${theme.colors.cardBackground};
      color: ${theme.colors.text};
      box-shadow: ${theme.shadows.neumorphicLight};
      
      &:hover {
        box-shadow: ${theme.shadows.neumorphicLightHover};
        transform: translateY(-2px);
      }
      
      &:active {
        box-shadow: ${theme.shadows.buttonPressed};
        transform: translateY(1px);
      }
    `;
  }}
  
  /* Disabled state */
  ${({ disabled }) => disabled && css`
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  `}
  
  /* Full width */
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  /* Icon styling */
  svg {
    margin-right: ${({ $iconOnly }) => $iconOnly ? '0' : '0.5rem'};
    width: ${({ $size }) => {
      switch($size) {
        case 'small': return '0.9em';
        case 'large': return '1.2em';
        default: return '1em';
      }
    }};
    height: ${({ $size }) => {
      switch($size) {
        case 'small': return '0.9em';
        case 'large': return '1.2em';
        default: return '1em';
      }
    }};
  }
  
  /* Ripple effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NeumorphicButton = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon: Icon,
  iconOnly = false,
  disabled = false,
  className,
  style,
  onClick,
  ...rest
}, ref) => {
  const buttonRef = React.useRef(null);
  const mergedRef = ref || buttonRef;
  
  const handleClick = (e) => {
    if (disabled) return;
    
    // Ripple effect
    const button = mergedRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      // Remove any existing ripples
      const existingRipples = button.getElementsByClassName('ripple');
      while (existingRipples[0]) {
        existingRipples[0].parentNode.removeChild(existingRipples[0]);
      }
      
      button.appendChild(ripple);
      
      // Clean up ripple after animation
      setTimeout(() => {
        if (ripple && ripple.parentNode === button) {
          button.removeChild(ripple);
        }
      }, 600);
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <StyledButton
      ref={mergedRef}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly}
      disabled={disabled}
      className={className}
      style={style}
      onClick={handleClick}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...rest}
    >
      <ButtonContent>
        {Icon && <Icon />}
        {!iconOnly && children}
      </ButtonContent>
    </StyledButton>
  );
});

NeumorphicButton.displayName = 'NeumorphicButton';

export default NeumorphicButton;
