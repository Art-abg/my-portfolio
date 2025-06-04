import React from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  FaCode,
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaInfoCircle,
  FaClock,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaCalendarAlt,
  FaAws
} from "react-icons/fa";
import {
  SiTypescript,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiDocker,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiRedux,
  SiFramer,
  SiGraphql,
  SiSass,
  SiVercel
} from "react-icons/si";

const floatKeyframes = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, 20px) scale(1.1); }
  100% { transform: translate(10px, 40px) scale(0.9); }
`;

const floatKeyframes2 = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, -30px) scale(1.2); }
  100% { transform: translate(-40px, -10px) scale(0.95); }
`;

const ProjectsSection = styled.section`
  padding: 6rem 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 4rem 0.5rem;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => `${theme.colors.primary}30`}, transparent);
    filter: blur(60px);
    z-index: 0;
    animation: ${floatKeyframes} 15s infinite alternate ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => `${theme.colors.primary}20`}, transparent);
    filter: blur(80px);
    z-index: 0;
    animation: ${floatKeyframes2} 18s infinite alternate-reverse ease-in-out;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: pointer;
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform-style: preserve-3d;
  perspective: 1000px;
  animation: float 6s ease-in-out infinite alternate;
  animation-delay: ${props => (props.index || 0) % 3}s;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 15px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 20%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.03) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-15px) rotateX(2deg) rotateY(2deg);
    animation-play-state: paused;

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-5px) rotateX(1deg) rotateY(1deg);
    transition: all 0.2s;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 220px;
  border-radius: 12px 12px 0 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
    transition: opacity 0.3s ease;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  filter: brightness(0.95);

  ${ProjectCard}:hover & {
    transform: scale(1.08);
    filter: brightness(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.75rem;
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 600;
  line-height: 1.3;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  ${ProjectCard}:hover &::after {
    width: 100%;
  }
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.neumorphic};
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme, status }) => 
    status === 'in-progress' ? theme.colors.warning : theme.colors.success};
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.neumorphic};
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.6;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Links = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const IconLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.buttonText};
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.button};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
    background-color: ${({ theme }) => theme.colors.buttonBackgroundHover};
  }

  svg {
    font-size: 1rem;
  }
`;

const TechIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transform-origin: center bottom;

  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    text-align: center;
    line-height: 1.2;
    font-weight: 500;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1001;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    width: 95%;
    margin: 1rem;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ModalImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalImageNavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 5;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ModalImageIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
`;

const ImageDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ModalContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProjectStatus = styled.span`
  font-size: 0.9rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: ${({ theme, status }) => 
    status === 'completed' ? theme.colors.success : theme.colors.warning};
`;

const CompletionDate = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.2rem;
  margin-bottom: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const ModalSection = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.headings};
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 3px;
    }
  }
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-left: 1.5rem;

  li {
    position: relative;
    padding-left: 0.5rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};

    &::before {
      content: '•';
      position: absolute;
      left: -0.75rem;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.2rem;
    }
  }
`;

const ModalTechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ModalTechIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    transform: translateY(-3px);
    background-color: ${({ theme }) => `${theme.colors.primary}25`};
  }
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ModalLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background-color: ${({ primary, theme }) => 
    primary ? theme.colors.primary : theme.colors.cardBackground};
  color: ${({ primary, theme }) => 
    primary ? '#ffffff' : theme.colors.text};
  text-decoration: none;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ primary, theme }) => 
    primary ? 'transparent' : `${theme.colors.border}`};

  svg {
    font-size: 1.25rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    background-color: ${({ primary, theme }) => 
      primary ? `${theme.colors.primary}E0` : `${theme.colors.background}`};
  }
`;

const projectsData = [
  {
    id: 1,
    title: "AI Photo Studio",
    description: "Advanced AI-powered photo editing platform with automated background removal, enhancement, and style transfer capabilities.",
    fullDescription: "AI Photo Studio leverages cutting-edge machine learning models to provide a seamless photo editing experience. The platform features automated background removal with pixel-perfect precision, smart portrait enhancement that preserves natural features, and AI style transfer that can apply artistic styles while maintaining the subject's integrity.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    repoLink: "https://github.com/Art-abg/ai-photostudio",
    liveLink: "https://ai-photostudio-demo.netlify.app",
    technologies: ["React", "Node.js", "TensorFlow.js", "CSS3", "Express", "AWS"],
    features: [
      "Advanced AI-powered photo processing",
      "Real-time style transfer",
      "Background removal with edge refinement",
      "Batch processing capabilities",
      "Custom filter creation"
    ],
    category: "fullstack",
    status: "completed",
    completionDate: "2023-11-15",
    featured: true
  },
  {
    id: 2,
    title: "LilArt Photo Studio",
    description: "Professional photography studio website showcasing portfolios, booking system, and client gallery.",
    fullDescription: "LilArt Photo Studio is a comprehensive platform for professional photographers to showcase their work and manage client interactions. The site features a sophisticated booking system with availability calendar, automated reminders, and payment processing. Clients can access private galleries to view, download, and share their photos after sessions.",
    image: "https://images.unsplash.com/photo-1513151233551-47dbde48a2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513151233551-47dbde48a2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    repoLink: "https://github.com/Art-abg/lilart_photo_studio",
    liveLink: "https://lilart-photostudio.netlify.app",
    technologies: ["React", "Express", "MongoDB", "Node.js", "Redux", "Stripe"],
    features: [
      "Client booking system with calendar integration",
      "Private galleries with password protection",
      "Photographer portfolio showcase",
      "Client management dashboard",
      "Payment processing with Stripe"
    ],
    category: "fullstack",
    status: "completed",
    completionDate: "2023-09-20",
    featured: true
  },
  {
    id: 3,
    title: "Trading Dashboard",
    description: "Real-time cryptocurrency and stock market tracking dashboard with portfolio management and analytics.",
    fullDescription: "The Trading Dashboard provides real-time data visualization and analysis for cryptocurrency and stock markets. Users can track their investments, set alerts for price movements, and view historical performance with customizable charts. The platform integrates with multiple market APIs to provide comprehensive data coverage and analysis tools.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1642790551116-18e150f248e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2002&q=80"
    ],
    repoLink: "https://github.com/Art-abg/trading-dashboard",
    liveLink: "https://crypto-trader-dashboard.netlify.app",
    technologies: ["React", "TypeScript", "Redux", "D3.js", "Firebase", "WebSockets"],
    features: [
      "Real-time market data visualization",
      "Portfolio performance tracking",
      "Customizable alerts and notifications",
      "Historical data analysis",
      "Multi-exchange integration"
    ],
    category: "frontend",
    status: "completed",
    completionDate: "2024-01-10",
    featured: true
  },
  {
    id: 4,
    title: "AMMA Track",
    description: "Comprehensive project management and task tracking application with team collaboration features.",
    fullDescription: "AMMA Track is a robust project management system built for team collaboration. It features task assignment, progress tracking, time management, and resource allocation. The platform includes interactive Kanban boards, Gantt charts for project timelines, and detailed analytics to measure team productivity and project health.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    ],
    repoLink: "https://github.com/manevardazaryan1/AMMA-Track",
    liveLink: "https://amma-track.vercel.app",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "GraphQL"],
    features: [
      "Real-time collaboration with Socket.io",
      "Kanban board for visual task management",
      "Time tracking and reporting",
      "User permission management",
      "File sharing and commenting system"
    ],
    category: "fullstack",
    status: "in-progress",
    completionDate: null,
    featured: false
  },
  {
    id: 5,
    title: "Interactive Data Visualization Tool",
    description: "Advanced data visualization dashboard with interactive charts and filtering capabilities.",
    fullDescription: "This Interactive Data Visualization Tool transforms complex datasets into intuitive visual representations. Users can create custom dashboards with interactive charts, graphs, and maps that respond to real-time data changes. The tool supports data import from multiple sources and offers advanced filtering, drill-down capabilities, and export options.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1553484771-11998c592b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    repoLink: "https://github.com/Art-abg/data-viz-tool",
    liveLink: "https://interactive-data-viz.netlify.app",
    technologies: ["React", "D3.js", "TypeScript", "CSS3", "REST APIs", "Vercel"],
    features: [
      "Interactive data visualization components",
      "Customizable dashboard layouts",
      "Real-time data filtering",
      "Export to multiple formats",
      "Data source integration"
    ],
    category: "frontend",
    status: "completed",
    completionDate: "2024-03-05",
    featured: false
  },
  {
    id: 6,
    title: "DevConnect Social Platform",
    description: "Professional networking platform specifically designed for developers and tech professionals.",
    fullDescription: "DevConnect is a specialized social networking platform that connects developers, designers, and tech professionals. The platform facilitates skill sharing, project collaboration, and career growth through community engagement. Features include a project showcase section, job board, mentorship matching, and technical discussions organized by technology stacks.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
    ],
    repoLink: "https://github.com/Art-abg/dev-connect",
    liveLink: "https://devconnect-social.vercel.app",
    technologies: ["React", "Node.js", "MongoDB", "Express", "GraphQL", "Firebase"],
    features: [
      "Developer profiles with skill showcases",
      "Project collaboration matching",
      "Mentorship program",
      "Technical forums by technology",
      "Job board and recruitment tools"
    ],
    category: "fullstack",
    status: "in-progress",
    completionDate: null,
    featured: false
  },
  {
    id: 7,
    title: "E-Commerce Storefront",
    description: "Modern e-commerce platform with advanced product filtering, user accounts, and secure payment processing.",
    fullDescription: "This E-Commerce Storefront is a complete online shopping solution with a focus on user experience and conversion optimization. The platform features advanced product categorization, smart search with auto-suggestions, dynamic filtering, user accounts with order history, and secure payment processing with multiple options. The admin dashboard provides inventory management, order processing, and sales analytics.",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    repoLink: "https://github.com/Art-abg/modern-ecommerce",
    liveLink: "https://modern-shop-demo.vercel.app",
    technologies: ["Next.js", "MongoDB", "Stripe", "Redux", "Tailwind CSS", "Vercel"],
    features: [
      "Product catalog with advanced filtering",
      "User accounts and order management",
      "Secure payment processing",
      "Inventory management system",
      "Analytics dashboard"
    ],
    category: "fullstack",
    status: "completed",
    completionDate: "2024-02-18",
    featured: false
  }
];

const techIcons = {
  React: <SiReact />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  "Node.js": <SiNodedotjs />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  HTML5: <SiHtml5 />,
  CSS3: <SiCss3 />,
  Docker: <SiDocker />,
  "Next.js": <SiNextdotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  "Material UI": <SiMui />,
  Redux: <SiRedux />,
  "Framer Motion": <SiFramer />,
  "REST APIs": <SiNodedotjs />,
  "D3.js": <SiJavascript />,
  GraphQL: <SiGraphql />,
  Firebase: <SiFirebase />,
  AWS: <FaAws />,
  SASS: <SiSass />,
  Vercel: <SiVercel />
};

const Projects = () => {
  // State declarations
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Animation controls
  const controls = useAnimation();
  const projectsRef = React.useRef(null);
  
  // Modal functions
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };
  
  const nextImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const prevImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  };
  
  const setImage = (index) => {
    if (selectedProject && selectedProject.gallery && index >= 0 && index < selectedProject.gallery.length) {
      setCurrentImageIndex(index);
    }
  };

  // Animation and scroll handling for projects section
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = projectsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  // Display featured projects at the top (simple one-time sorting)
  const sortedProjects = [...projectsData].sort((a, b) => {
    // First by featured status
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then by completion date (newest first)
    if (a.completionDate && b.completionDate) {
      return new Date(b.completionDate) - new Date(a.completionDate);
    }
    
    // In-progress projects after completed ones
    if (!a.completionDate && b.completionDate) return 1;
    if (a.completionDate && !b.completionDate) return -1;
    
    return 0;
  });

  return (
    <ProjectsSection>
      <SectionContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </SectionTitle>
      </SectionContainer>

      <ProjectsGrid ref={projectsRef}>
        <AnimatePresence mode="wait">
          {sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 }
                  }
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                whileHover={{
                  scale: 1.03,
                  rotateX: '2deg',
                  rotateY: '2deg',
                  boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                  y: -15
                }}
                onClick={() => openProjectModal(project)}
              >
                <ProjectImageContainer>
                  <ProjectImage src={project.image} alt={project.title} />
                  {project.featured && (
                    <FeaturedBadge>
                      <FaStar /> Featured
                    </FeaturedBadge>
                  )}
                  {project.status === 'in-progress' && (
                    <StatusBadge status="in-progress">
                      <FaClock /> In Progress
                    </StatusBadge>
                  )}
                </ProjectImageContainer>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <Technologies>
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <TechIcon
                        key={idx}
                        title={tech}
                        whileHover={{ scale: 1.1, y: -5 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                      >
                        {React.isValidElement(techIcons[tech]) ? (
                          techIcons[tech]
                        ) : (
                          <FaCode />
                        )}
                        <span>{tech}</span>
                      </TechIcon>
                    ))}
                    {project.technologies.length > 4 && (
                      <TechIcon
                        title="More technologies"
                        whileHover={{ scale: 1.1, y: -5 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + 4 * 0.05 }}
                      >
                        <FaInfoCircle />
                        <span>+{project.technologies.length - 4} more</span>
                      </TechIcon>
                    )}
                  </Technologies>
                  <Links>
                    <IconLink
                      as="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectModal(project);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInfoCircle /> Details
                    </IconLink>
                    {project.repoLink && (
                      <IconLink
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub /> GitHub
                      </IconLink>
                    )}
                    {project.liveLink && (
                      <IconLink
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </IconLink>
                    )}
                  </Links>
                </ProjectContent>
              </ProjectCard>
            ))}
        </AnimatePresence>
        
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
            >
              <ModalContainer
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalCloseButton onClick={closeProjectModal}>
                  <FaTimes />
                </ModalCloseButton>
                
                <ModalHeader>
                  <ModalImage 
                    src={selectedProject.gallery[currentImageIndex]} 
                    alt={selectedProject.title}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    key={currentImageIndex}
                  />
                  
                  {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                    <>
                      <ModalImageNavButton 
                        direction="left" 
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <FaChevronLeft />
                      </ModalImageNavButton>
                      
                      <ModalImageNavButton 
                        direction="right" 
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <FaChevronRight />
                      </ModalImageNavButton>
                      
                      <ModalImageIndicator>
                        {selectedProject.gallery.map((_, index) => (
                          <ImageDot 
                            key={index} 
                            active={currentImageIndex === index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setImage(index);
                            }}
                          />
                        ))}
                      </ModalImageIndicator>
                    </>
                  )}
                </ModalHeader>
                
                <ModalContent>
                  <div>
                    <ModalTitle>
                      {selectedProject.title}
                      {selectedProject.status && (
                        <ProjectStatus status={selectedProject.status}>
                          {selectedProject.status === 'completed' ? (
                            <><FaCheckCircle /> Completed</>
                          ) : (
                            <><FaClock /> In Progress</>
                          )}
                        </ProjectStatus>
                      )}
                    </ModalTitle>
                    
                    {selectedProject.completionDate && (
                      <CompletionDate>
                        <FaCalendarAlt />
                        Completed: {new Date(selectedProject.completionDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CompletionDate>
                    )}
                  </div>
                  
                  <ModalDescription>
                    {selectedProject.fullDescription}
                  </ModalDescription>
                  
                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <ModalSection>
                      <h3>Key Features</h3>
                      <FeatureList>
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </FeatureList>
                    </ModalSection>
                  )}
                  
                  <ModalSection>
                    <h3>Technologies Used</h3>
                    <ModalTechContainer>
                      {selectedProject.technologies.map((tech, idx) => (
                        <ModalTechIcon key={idx}>
                          {React.isValidElement(techIcons[tech]) ? (
                            techIcons[tech]
                          ) : (
                            <FaCode />
                          )}
                          <span>{tech}</span>
                        </ModalTechIcon>
                      ))}
                    </ModalTechContainer>
                  </ModalSection>
                  
                  <ModalLinks>
                    {selectedProject.liveLink && (
                      <ModalLink 
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        primary
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt /> View Live Demo
                      </ModalLink>
                    )}
                    
                    {selectedProject.repoLink && (
                      <ModalLink 
                        href={selectedProject.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub /> View Source Code
                      </ModalLink>
                    )}
                  </ModalLinks>
                </ModalContent>
              </ModalContainer>
            </ModalOverlay>
          )}
        </AnimatePresence>
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
