import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.footerBackground};
  color: ${({ theme }) => theme.colors.footerText};
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  margin-bottom: 1rem;
`;

const SocialIcon = styled.a`
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.colors.footerText};
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <SocialIcon
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </SocialIcon>
        <SocialIcon
          href="https://www.linkedin.com/in/yourusername/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </SocialIcon>
        {/* Add more social icons as needed */}
      </SocialLinks>
      <FooterText>
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
