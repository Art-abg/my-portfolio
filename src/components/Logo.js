import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.headings};
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  span {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Logo = () => {
  return (
    <LogoContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span>Artur Abgaryan</span>
    </LogoContainer>
  );
};

export default Logo;
