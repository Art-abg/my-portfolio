import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  height: 40px;
  border-radius: 50px;
  padding: 0 10px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.glassMorphism};
  border: ${({ theme }) => theme.colors.glassBorder};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const ToggleIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  transition: all 0.3s ease;
  z-index: 1;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ToggleKnob = styled(motion.div)`
  position: absolute;
  top: 6px;
  left: ${({ $isDark }) => $isDark ? 'calc(100% - 34px)' : '6px'};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: 2;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ToggleSwitch = ({ isDark, onToggle }) => {
  return (
    <ToggleContainer 
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      whileTap={{ scale: 0.95 }}
    >
      <ToggleIcon $active={!isDark}>
        <FaSun />
      </ToggleIcon>
      <ToggleKnob 
        $isDark={isDark}
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      <ToggleIcon $active={isDark}>
        <FaMoon />
      </ToggleIcon>
    </ToggleContainer>
  );
};

export default ToggleSwitch;
