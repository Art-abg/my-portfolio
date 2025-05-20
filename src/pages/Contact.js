import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from 'react-icons/fi';
import NeumorphicButton from '../components/common/NeumorphicButton';

// Styled Components
const ContactContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 5rem 1rem;
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  background: ${({ color, theme }) => {
    const primaryColor = theme && theme.colors && theme.colors.primary;
    const baseColor = color || primaryColor || '#CCCCCC';
    return `${String(baseColor)}10`;
  }};
  border-radius: 50%;
  filter: blur(10px);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.headings};
  position: relative;
  display: inline-block;
  width: 100%;
  left: 0;
  transform: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    transform: translateX(-50%);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.2rem;
  }
`;

const ContactCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 3rem;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }
`;

const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

const ContactValue = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;



const Contact = () => {
  const controls = useAnimation();
  const [shapesArray, setShapesArray] = useState([]);
  
  useEffect(() => {
    // Generate random floating shapes
    const shapes = [];
    const colors = ['#4277FF', '#FF5DCD', '#3DD598', '#FFAB2D'];
    
    for (let i = 0; i < 6; i++) {
      const size = Math.random() * 300 + 100;
      shapes.push({
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    
    setShapesArray(shapes);
    controls.start('visible');
  }, [controls]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <ContactContainer>
      <Helmet>
        <title>Contact | Art Abgaryan Portfolio</title>
        <meta name="description" content="Get in touch with Art Abgaryan. Contact information and social media links." />
      </Helmet>
      
      <FloatingShapes>
        {shapesArray.map((shape, index) => (
          <Shape
            key={index}
            color={shape.color}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
            }}
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, 20, 40, 20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </FloatingShapes>
      
      <ContentWrapper>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </PageTitle>
        
        <ContactCard
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <ContactGrid>
            <ContactInfo>
              <ContactMethod variants={itemVariants}>
                <IconWrapper>
                  <FiMail />
                </IconWrapper>
                <ContactDetails>
                  <ContactLabel>Email</ContactLabel>
                  <ContactValue>artur.abg1@gmail.com</ContactValue>
                </ContactDetails>
              </ContactMethod>
              
              <ContactMethod variants={itemVariants}>
                <IconWrapper>
                  <FiPhone />
                </IconWrapper>
                <ContactDetails>
                  <ContactLabel>Phone</ContactLabel>
                  <ContactValue>+37495252008</ContactValue>
                </ContactDetails>
              </ContactMethod>
              
              <ContactMethod variants={itemVariants}>
                <IconWrapper>
                  <FiMapPin />
                </IconWrapper>
                <ContactDetails>
                  <ContactLabel>Location</ContactLabel>
                  <ContactValue>Yerevan, Armenia</ContactValue>
                </ContactDetails>
              </ContactMethod>
              
              <SocialLinks>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NeumorphicButton
                    as="a"
                    href="https://linkedin.com/in/artur-abgaryan"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    icon={FiLinkedin}
                  >
                    LinkedIn
                  </NeumorphicButton>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NeumorphicButton
                    as="a"
                    href="https://github.com/Art-abg"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    icon={FiGithub}
                  >
                    GitHub
                  </NeumorphicButton>
                </motion.div>
              </SocialLinks>
            </ContactInfo>
          </ContactGrid>
        </ContactCard>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;