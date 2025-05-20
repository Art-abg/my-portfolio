import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NeumorphicCircle from '../common/NeumorphicCircle';
import { FaCode, FaLaptopCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { useTheme } from 'styled-components';

const Section = styled.section`
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const SkillCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 1.5rem 0 1rem;
`;

const SkillDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const NeumorphicSection = () => {
  const theme = useTheme();
  const isDark = theme.colors.background === '#131419'; // Dark theme background color
  
  const skills = [
    {
      icon: <FaCode size={40} />,
      title: "Frontend",
      description: "Modern React applications with responsive design and smooth animations using Framer Motion.",
      color: "#4277FF"
    },
    {
      icon: <FaServer size={40} />,
      title: "Backend",
      description: "Scalable server-side solutions with Node.js, Express, and modern database technologies.",
      color: "#FF5DCD"
    },
    {
      icon: <FaLaptopCode size={40} />,
      title: "Full Stack",
      description: "End-to-end web applications with seamless integration between frontend and backend.",
      color: "#3DD598"
    },
    {
      icon: <FaMobileAlt size={40} />,
      title: "Mobile First",
      description: "Responsive designs that work beautifully on all devices, from mobile to desktop.",
      color: "#FFAB2D"
    }
  ];

  return (
    <Section>
      <Container>
        <SectionHeader>
          <Title>My Expertise</Title>
          <Subtitle>
            I specialize in creating beautiful, functional, and user-centered digital experiences.
            Here are a few things I'm good at.
          </Subtitle>
        </SectionHeader>
        
        <Grid>
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NeumorphicCircle 
                size={120}
                variant={isDark ? 'dark' : 'light'}
                hoverEffect={true}
              >
                <div style={{ color: skill.color, fontSize: '2.5rem' }}>
                  {skill.icon}
                </div>
              </NeumorphicCircle>
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillDescription>{skill.description}</SkillDescription>
            </SkillCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default NeumorphicSection;
