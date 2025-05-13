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
  FaDownload,
  FaServer,
  FaLaptopCode,
  FaUniversity
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiRedux, SiTailwindcss, SiMui, SiFramer } from "react-icons/si";

// Timeline data
const timelineData = [
  {
    year: "2024-2025",
    title: "Front-End Developer",
    company: "Innovate Solutions Inc. (Remote)",
    description: "Developed responsive user interfaces using React, Redux, and Tailwind CSS/Material UI. Collaborated with UX/UI designers and back-end engineers for API integrations."
  },
  {
    year: "2022-2024",
    title: "Front-End Developer",
    company: "Upwork.com (Freelance)",
    description: "Designed and developed custom websites and web applications for diverse clients using modern front-end technologies."
  },
  {
    year: "2021-2022",
    title: "Customer Service Advocate",
    company: "Service Titan",
    description: "Provided technical support for a complex B2B SaaS platform, enhancing communication and problem-solving skills."
  },
  {
    year: "2019-2020",
    title: "Project Management Intern",
    company: "EKENG CJSC",
    description: "Supported project managers in research and documentation for national e-Government system initiatives."
  }
];

// Education data
const educationData = [
  {
    year: "2023-2024",
    degree: "Advanced JavaScript Bootcamp",
    institution: "Armenian Code Academy",
    description: "Intensive, project-based training focused on Advanced JavaScript, React, Redux, and modern front-end development."
  },
  {
    year: "2017-2020",
    degree: "B.S. in Business",
    institution: "American University of Armenia",
    description: "Bachelor of Science degree with focus on business management and analytics."
  },
  {
    year: "2014-2017",
    degree: "Computer Science (Studies)",
    institution: "American University of Armenia",
    description: "Completed foundational coursework in computer science and programming fundamentals."
  }
];

// Removed Projects data section as it has been moved to the Projects page

// Skill levels data
const skillLevels = {
  React: 95,
  "Next.js": 90,
  JavaScript: 92,
  TypeScript: 88,
  "Tailwind CSS": 90,
  "Material UI": 85,
  "Redux": 85,
  "Framer Motion": 80,
  "HTML5": 95,
  "CSS3": 90,
  "Git": 88,
  "Node.js": 75,
  "REST APIs": 85,
  "AI Integration": 80
};

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -20%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.primary}10, transparent 70%);
    opacity: 0.3;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.card};
  z-index: 1;
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: 12px;
  position: relative;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
  transition: ${({ theme }) => theme.transitions.default};
`;

const BioContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.headings};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 2px;
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
  padding: 1.2rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    transition: ${({ theme }) => theme.transitions.slow};
    z-index: -1;
    opacity: 0.8;
  }
  
  &:hover {
    color: white;
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    
    &:before {
      width: 100%;
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
  }
`;

const TimelineSection = styled.div`
  margin: 6rem 0;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 4px;
    opacity: 0.5;
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  transition: ${({ theme }) => theme.transitions.default};

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: -20px;
    width: 40px;
    height: 4px;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 4px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
    
    &::before {
      display: none;
    }
  }
`;

const TimelineYear = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  z-index: 2;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translate(-50%, -55%);
  }
`;

const SkillsSection = styled.div`
  margin: 6rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -20%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.accent}10, transparent 70%);
    opacity: 0.3;
    z-index: 0;
    pointer-events: none;
  }
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
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  min-height: ${props => props.minHeight || 'auto'};
  
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
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  border-radius: 5px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
`;

const About = () => {
  // Function to render the correct icon for each skill
  const getSkillIcon = (skill) => {
    switch(skill) {
      case 'React': return <FaReact />;
      case 'JavaScript': return <FaJsSquare />;
      case 'TypeScript': return <SiTypescript />;
      case 'Node.js': return <FaNodeJs />;
      case 'HTML5': return <FaHtml5 />;
      case 'CSS3': return <FaCss3Alt />;
      case 'Git': return <FaGitAlt />;
      case 'Next.js': return <SiNextdotjs />;
      case 'Redux': return <SiRedux />;
      case 'Tailwind CSS': return <SiTailwindcss />;
      case 'Material UI': return <SiMui />;
      case 'Framer Motion': return <SiFramer />;
      case 'REST APIs': return <FaServer />;
      case 'AI Integration': return <FaLaptopCode />;
      default: return null;
    }
  };
  
  return (
    <AboutSection>
      <ContentWrapper>
        <IntroSection>
          <ProfileImageWrapper
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.02 }}
          >
            <ProfileImage
              src="/avatar.jpg"
              alt="Artur Abgaryan"
              whileHover={{ filter: 'brightness(1.1)' }}
            />
          </ProfileImageWrapper>

          <BioContent>
            <SectionTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              About Me
            </SectionTitle>

            <BioParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="neumorphic-card"
            >
              Highly motivated Front-End Developer specializing in React to build responsive, user-centric web interfaces. Proven ability to translate complex designs into high-quality, maintainable code and collaborate effectively within agile teams.
            </BioParagraph>

            <BioParagraph
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="neumorphic-card"
            >
              Passionate about leveraging modern web technologies and actively exploring Generative AI (e.g., Flux, Stable Diffusion) and automation tools (n8n) to enhance development workflows and create innovative web solutions. I possess strong problem-solving abilities and excellent English communication skills.
            </BioParagraph>

            <ResumeButton
              href="/resume.pdf"
              download
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaDownload /> Download Resume
            </ResumeButton>
          </BioContent>
        </IntroSection>

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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {index % 2 === 0 ? (
                  <>
                    <TimelineContent
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3>{item.title}</h3>
                      <h4>{item.company}</h4>
                      <p>{item.description}</p>
                    </TimelineContent>
                    <div></div> {/* Empty div for layout */}
                  </>
                ) : (
                  <>
                    <div></div> {/* Empty div for layout */}
                    <TimelineContent
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3>{item.title}</h3>
                      <h4>{item.company}</h4>
                      <p>{item.description}</p>
                    </TimelineContent>
                  </>
                )}
                <TimelineYear
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.year}
                </TimelineYear>
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {index % 2 === 0 ? (
                  <>
                    <TimelineContent
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3>{item.degree}</h3>
                      <h4>{item.institution}</h4>
                      <p>{item.description}</p>
                    </TimelineContent>
                    <div></div>
                  </>
                ) : (
                  <>
                    <div></div>
                    <TimelineContent
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3>{item.degree}</h3>
                      <h4>{item.institution}</h4>
                      <p>{item.description}</p>
                    </TimelineContent>
                  </>
                )}
                <TimelineYear
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUniversity style={{ marginRight: '5px' }} />
                  {item.year}
                </TimelineYear>
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
    </AboutSection>
  );
};

export default About;
