import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  background-image: url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80");
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: calc(100vh - 60px);
  margin-top: 60px; /* Adjust for fixed header */

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    opacity: 0.7;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 5px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 2rem;
    width: 200px;
    height: 200px;
  }
`;

const HeroText = styled.div`
  flex: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.headings};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-right: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    margin-right: 0;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
`;

const Home = () => {
  return (
    <HeroSection>
      <HeroContent>
        <ProfileImage
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          alt="Your Name"
        />
        <HeroText>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hello, I'm Your Name
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            I'm a passionate software developer specializing in front-end
            development. I love building beautiful and functional web
            applications.
          </HeroSubtitle>
          <ButtonGroup>
            <CTAButton to="/projects">View My Work</CTAButton>
            <SecondaryButton to="/contact">Get in Touch</SecondaryButton>
          </ButtonGroup>
        </HeroText>
      </HeroContent>
    </HeroSection>
  );
};

export default Home;
