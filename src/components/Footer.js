import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBackground};
  color: ${({ theme }) => theme.colors.footerText};
  padding: 2.5rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  position: relative;
  box-shadow: 0 -8px 16px ${({ theme }) => theme.colors.shadowDark};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialLinks = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const SocialIcon = styled(motion.a)`
  color: ${({ theme }) => theme.colors.footerText};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.footerBackground};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-5px);
  }
  
  &:active {
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
    transform: translateY(2px);
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
  position: relative;
  padding-top: 1.5rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 2px;
    margin-bottom: 1rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.footerText};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  font-size: 0.95rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const iconVariants = {
  hover: {
    scale: 1.15,
    rotate: 5,
    transition: { duration: 0.3, type: 'spring', stiffness: 300 }
  }
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#" rel="noopener noreferrer">Home</FooterLink>
          <FooterLink href="#" rel="noopener noreferrer">About</FooterLink>
          <FooterLink href="#" rel="noopener noreferrer">Projects</FooterLink>
          <FooterLink href="#" rel="noopener noreferrer">Resume</FooterLink>
          <FooterLink href="#" rel="noopener noreferrer">Contact</FooterLink>
        </FooterLinks>
        
        <SocialLinks>
          <SocialIcon
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaGithub />
          </SocialIcon>
          <SocialIcon
            href="https://www.linkedin.com/in/yourusername/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaTwitter />
          </SocialIcon>
          <SocialIcon
            href="mailto:your.email@example.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaEnvelope />
          </SocialIcon>
        </SocialLinks>
        
        <FooterText>
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
