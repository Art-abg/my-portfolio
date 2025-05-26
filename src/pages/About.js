import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaServer,
  FaLaptopCode,
  FaUniversity,
  FaFileDownload
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiMui,
  SiFramer
} from "react-icons/si";
import profileImgPng from "../assets/Artur_profile_photo.png";
import ResumePDF from "../assets/Resume_Artur_Abgaryan.pdf";

// Timeline data
const timelineData = [
  {
    year: "2024-2025",
    title: "Front-End Developer",
    company: "Innovate Solutions Inc. (Remote)",
    description:
      "Developed responsive user interfaces using React, Redux, and Tailwind CSS/Material UI. Collaborated with UX/UI designers and back-end engineers for API integrations."
  },
  {
    year: "2022-2024",
    title: "Front-End Developer",
    company: "Upwork.com (Freelance)",
    description:
      "Designed and developed custom websites and web applications for diverse clients using modern front-end technologies."
  },
  {
    year: "2021-2022",
    title: "Customer Service Advocate",
    company: "Service Titan",
    description:
      "Provided technical support for a complex B2B SaaS platform, enhancing communication and problem-solving skills."
  },
  {
    year: "2019-2020",
    title: "Project Management Intern",
    company: "EKENG CJSC",
    description:
      "Supported project managers in research and documentation for national e-Government system initiatives."
  }
];

// Education data
const educationData = [
  {
    year: "2023-2024",
    degree: "Advanced JavaScript Bootcamp",
    institution: "Armenian Code Academy",
    description:
      "Intensive, project-based training focused on Advanced JavaScript, React, Redux, and modern front-end development."
  },
  {
    year: "2017-2020",
    degree: "B.S. in Business",
    institution: "American University of Armenia",
    description:
      "Bachelor of Science degree with focus on business management and analytics."
  },
  {
    year: "2014-2017",
    degree: "Computer Science (Studies)",
    institution: "American University of Armenia",
    description:
      "Completed foundational coursework in computer science and programming fundamentals."
  }
];

// Skill levels data
const skillLevels = {
  React: 95,
  "Next.js": 90,
  JavaScript: 92,
  TypeScript: 88,
  "Tailwind CSS": 90,
  "Material UI": 85,
  Redux: 85,
  "Framer Motion": 80,
  HTML5: 95,
  CSS3: 90,
  Git: 88,
  "Node.js": 75,
  "REST APIs": 85,
  "AI Integration": 80
};

const AboutContainer = styled.div`
  padding: 2rem 5%;
  max-width: 1200px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 1.5rem 5%;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.default};
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};

    img {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const BioContent = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  font-family: ${({ theme }) => theme.fonts.headings};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryLight}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.primaryLight}
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BioParagraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryLight}
  );
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.buttonPrimary};
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  z-index: 1;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.buttonPrimaryHover};
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: ${({ theme }) => theme.shadows.buttonPressed};
  }
`;

const TimelineSection = styled.div`
  margin: 5rem 0;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin: 4rem 0;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 0;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
  position: relative;
`;

const TimelineContent = styled(motion.div)`
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  transition: ${({ theme }) => theme.transitions.default};
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    font-family: ${({ theme }) => theme.fonts.headings};
    font-size: 1.4rem;
  }

  h4 {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TimelineYear = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-weight: bold;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  align-self: flex-start;
  box-shadow: ${({ theme }) => theme.shadows.buttonPrimary};

  svg {
    margin-right: 8px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.buttonPrimaryHover};
  }
`;

const SkillsSection = styled.div`
  margin: 5rem 0;
  position: relative;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  position: relative;
  z-index: 1;
`;

const SkillItem = styled(motion.div)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  min-height: ${(props) => props.minHeight || "auto"};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.primaryLight}
    );
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const SkillName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 600;

  svg {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const SkillBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryLight}
  );
  border-radius: 5px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const About = () => {
  // Function to render the correct icon for each skill
  const getSkillIcon = (skill) => {
    switch (skill) {
      case "React":
        return <FaReact />;
      case "JavaScript":
        return <FaJsSquare />;
      case "TypeScript":
        return <SiTypescript />;
      case "Node.js":
        return <FaNodeJs />;
      case "HTML5":
        return <FaHtml5 />;
      case "CSS3":
        return <FaCss3Alt />;
      case "Git":
        return <FaGitAlt />;
      case "Next.js":
        return <SiNextdotjs />;
      case "Redux":
        return <SiRedux />;
      case "Tailwind CSS":
        return <SiTailwindcss />;
      case "Material UI":
        return <SiMui />;
      case "Framer Motion":
        return <SiFramer />;
      case "REST APIs":
        return <FaServer />;
      case "AI Integration":
        return <FaLaptopCode />;
      default:
        return null;
    }
  };

  return (
    <AboutContainer>
      <ContentWrapper>
        <ProfileSection>
          <ProfileImageWrapper
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <picture>
              <source srcSet="/assets/Artur_profile_photo.webp" type="image/webp" />
              <img src={profileImgPng} alt="Artur Abgaryan" style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "15px",
              }} />
            </picture>
          </ProfileImageWrapper>

          <BioContent>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "inherit"
              }}
            >
              About Me
            </motion.h1>
            <BioParagraph>
              I'm a passionate Front-End Developer with a strong foundation in
              web development and a keen eye for design. With experience in both
              freelance and team environments, I specialize in creating
              responsive, user-friendly interfaces using modern technologies
              like React, Next.js, and TypeScript.
            </BioParagraph>
            <BioParagraph>
              My journey in tech started with a curiosity for how things work,
              which led me to pursue a degree in Computer Science. Since then,
              I've been on a mission to create seamless digital experiences that
              not only look great but also solve real-world problems.
            </BioParagraph>
            <ResumeButton
              as="a"
              href={ResumePDF}
              download="Artur_Abgaryan_Resume.pdf"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileDownload /> Download Resume
            </ResumeButton>
          </BioContent>
        </ProfileSection>

        <TimelineSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            Professional Experience
          </SectionTitle>
          <Timeline>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TimelineYear
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  {item.year}
                </TimelineYear>
                <TimelineContent
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
                >
                  <h3>{item.title}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>

        <TimelineSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            Education
          </SectionTitle>
          <Timeline>
            {educationData.map((item, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TimelineYear
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  <FaUniversity />
                  {item.year}
                </TimelineYear>
                <TimelineContent
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
                >
                  <h3>{item.degree}</h3>
                  <h4>{item.institution}</h4>
                  <p>{item.description}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineSection>

        <SkillsSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            Technical Skills
          </SectionTitle>
          <SkillGrid>
            {Object.entries(skillLevels).map(([skill, level], index) => (
              <SkillItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <SkillName>
                  {getSkillIcon(skill)}
                  <span>{skill}</span>
                  <span>{level}%</span>
                </SkillName>
                <SkillBar>
                  <SkillProgress
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </SkillBar>
              </SkillItem>
            ))}
          </SkillGrid>
        </SkillsSection>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;
