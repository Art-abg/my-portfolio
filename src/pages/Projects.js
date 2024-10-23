import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiDocker
} from "react-icons/si";

// Sample Projects Data
const projectsData = [
  {
    id: 1,
    title: "Weather Forecast App",
    description:
      "A responsive web app providing detailed weather forecasts using OpenWeatherMap API.",
    image: "/images/weather-app.png",
    repoLink: "https://github.com/yourusername/weather-app",
    liveLink: "https://yourusername.github.io/weather-app",
    technologies: ["React", "JavaScript", "CSS3", "HTML5"]
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform with user authentication, shopping cart, and Stripe payment integration.",
    image: "/images/ecommerce-platform.png",
    repoLink: "https://github.com/yourusername/ecommerce-platform",
    liveLink: "https://ecommerce.yourdomain.com",
    technologies: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    id: 3,
    title: "Chat Application",
    description:
      "A real-time chat application featuring multiple chat rooms and user authentication.",
    image: "/images/chat-app.png",
    repoLink: "https://github.com/yourusername/chat-app",
    liveLink: "https://chatapp.yourdomain.com",
    technologies: ["Node.js", "Socket.io", "Express", "HTML5", "CSS3"]
  }
  // Add more projects as needed
];

// Technology Icons Mapping
const techIcons = {
  React: <SiReact />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  "Node.js": <SiNodedotjs />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  HTML5: <SiHtml5 />,
  CSS3: <SiCss3 />,
  Docker: <SiDocker />
  // Add other technologies and their icons here
};

// Styled Components
const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  font-family: ${({ theme }) => theme.fonts.headings};
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 150px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const TechIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconLink = styled.a`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Projects = () => {
  return (
    <ProjectsSection>
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </SectionTitle>
      <ProjectsGrid>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <ProjectImageContainer>
              <ProjectImage src={project.image} alt={project.title} />
            </ProjectImageContainer>
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <Technologies>
                {project.technologies.map((tech, idx) => (
                  <TechIcon key={idx} title={tech}>
                    {techIcons[tech] || tech}
                  </TechIcon>
                ))}
              </Technologies>
              <Links>
                {project.repoLink && (
                  <IconLink
                    href={project.repoLink}
                    target="_blank"
                    aria-label="GitHub Repository"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </IconLink>
                )}
                {project.liveLink && (
                  <IconLink
                    href={project.liveLink}
                    target="_blank"
                    aria-label="Live Demo"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                  </IconLink>
                )}
              </Links>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
