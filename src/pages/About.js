import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiWebpack } from "react-icons/si";

// Container for the entire About section
const AboutSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  min-height: calc(100vh - 120px); /* Adjusted for header and footer */

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

// Title of the section
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-family: ${({ theme }) => theme.fonts.headings};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Container for content
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Profile Image
const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 5px solid ${({ theme }) => theme.colors.primary};
  margin-right: 3rem;

  @media (max-width: 992px) {
    margin-right: 0;
    margin-bottom: 2rem;
    width: 250px;
    height: 250px;
  }

  @media (max-width: 576px) {
    width: 200px;
    height: 200px;
  }
`;

// Biography Section
const Bio = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 992px) {
    text-align: center;
  }
`;

const BioParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
`;

// Skills Section
const SkillsWrapper = styled.div`
  margin-top: 4rem;
`;

const SkillsTitle = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.headings};

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const SkillCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  padding: 2rem;
  width: 150px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  @media (max-width: 576px) {
    width: 120px;
    padding: 1.5rem;
  }
`;

const SkillIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const SkillName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const About = () => {
  return (
    <AboutSection>
      <SectionTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Me
      </SectionTitle>
      <ContentWrapper>
        <ProfileImage
          src="https://via.placeholder.com/300"
          alt="Your Name"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <Bio>
          <BioParagraph>
            Hi! I'm <Highlight>Your Name</Highlight>, a passionate{" "}
            <Highlight>Software Developer</Highlight> specializing in building
            exceptional digital experiences. With a strong foundation in{" "}
            <Highlight>JavaScript</Highlight> and modern frameworks, I create
            dynamic and responsive web applications that solve real-world
            problems.
          </BioParagraph>
          <BioParagraph>
            I thrive in collaborative environments and love turning complex
            ideas into seamless and user-friendly interfaces. When I'm not
            coding, you can find me exploring new technologies, contributing to
            open-source projects, or enjoying outdoor adventures.
          </BioParagraph>
        </Bio>
      </ContentWrapper>
      <SkillsWrapper>
        <SkillsTitle
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          My Tech Stack
        </SkillsTitle>
        <SkillsGrid>
          {/* React */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaReact />
            </SkillIcon>
            <SkillName>React</SkillName>
          </SkillCard>
          {/* Node.js */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaNodeJs />
            </SkillIcon>
            <SkillName>Node.js</SkillName>
          </SkillCard>
          {/* Express */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <SiExpress />
            </SkillIcon>
            <SkillName>Express</SkillName>
          </SkillCard>
          {/* MongoDB */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <SiMongodb />
            </SkillIcon>
            <SkillName>MongoDB</SkillName>
          </SkillCard>
          {/* HTML5 */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaHtml5 />
            </SkillIcon>
            <SkillName>HTML5</SkillName>
          </SkillCard>
          {/* CSS3 */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaCss3Alt />
            </SkillIcon>
            <SkillName>CSS3</SkillName>
          </SkillCard>
          {/* JavaScript */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaJsSquare />
            </SkillIcon>
            <SkillName>JavaScript</SkillName>
          </SkillCard>
          {/* TypeScript */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <SiTypescript />
            </SkillIcon>
            <SkillName>TypeScript</SkillName>
          </SkillCard>
          {/* Webpack */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <SiWebpack />
            </SkillIcon>
            <SkillName>Webpack</SkillName>
          </SkillCard>
          {/* Git */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaGitAlt />
            </SkillIcon>
            <SkillName>Git</SkillName>
          </SkillCard>
          {/* Database */}
          <SkillCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SkillIcon>
              <FaDatabase />
            </SkillIcon>
            <SkillName>SQL</SkillName>
          </SkillCard>
          {/* Add More Skills as Needed */}
        </SkillsGrid>
      </SkillsWrapper>
    </AboutSection>
  );
};

export default About;
