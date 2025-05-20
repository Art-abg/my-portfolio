import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NeumorphicCircle = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size = 150 }) => size}px;
  height: ${({ size = 150 }) => size}px;
  border-radius: 50%;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    transition: all 0.3s ease;
    ${({ theme, variant = 'light' }) => 
      variant === 'dark' 
        ? `box-shadow: ${theme.shadows?.neumorphicDark || '8px 8px 20px rgba(0, 0, 0, 0.5), -8px -8px 20px rgba(255, 255, 255, 0.1)'};`
        : `box-shadow: ${theme.shadows?.neumorphicLight || '8px 8px 20px #a9a8b7, -8px -8px 20px #fff'};`
    }
  }

  ${({ hoverEffect, theme, variant = 'light' }) => 
    hoverEffect && `
    &:hover::before {
      ${variant === 'dark' 
        ? `box-shadow: ${theme.shadows?.neumorphicDarkHover || '8px 8px 20px rgba(0, 0, 0, 0.5), -8px -8px 20px rgba(255, 255, 255, 0.2), inset 8px 8px 20px rgba(0, 0, 0, 0.8), inset -8px -8px 20px rgba(255, 255, 255, 0.2)'};`
        : `box-shadow: ${theme.shadows?.neumorphicLightHover || '8px 8px 20px #a9a8b7, -8px -8px 20px #fff, inset -8px -8px 20px #fff, inset 8px 8px 20px #a9a8b7'};`
      }
      transform: scale(${variant === 'dark' ? '1.05' : '1.02'});
    }
  `}

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: ${({ size = 150 }) => size * 0.8}px;
    height: ${({ size = 150 }) => size * 0.8}px;
  }
`;

const NeumorphicCircleComponent = ({
  children,
  size,
  variant = 'light',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <NeumorphicCircle
      size={size}
      variant={variant}
      hoverEffect={hoverEffect}
      onClick={onClick}
      {...props}
    >
      {children}
    </NeumorphicCircle>
  );
};

export default NeumorphicCircleComponent;
