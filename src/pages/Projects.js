import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaCode } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiDocker,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiFramer,
} from "react-icons/si";
import { SiMui } from "react-icons/si";

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
  "Redux": <SiRedux />,
  "Framer Motion": <SiFramer />,
  "REST APIs": <SiNodedotjs />,
  "D3.js": <SiJavascript />,
};

const projectsData = [
  {
    id: 1,
    title: "AI Realistic Portrait Generator",
    description: "Full-stack web application allowing users to generate realistic portraits via Flux AI model integration and LORA fine-tuning.",
    image: "/images/ai-portrait-generator.jpg",
    repoLink: "https://github.com/Art-abg/ai-portrait-generator",
    liveLink: "https://ai-portrait.example.com",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    category: "fullstack"
  },
  {
    id: 2,
    title: "Bonton AI Trading Dashboard",
    description: "Dynamic and responsive UI for visualizing complex real-time trading data, integrating multiple financial data APIs.",
    image: "/images/trading-dashboard.jpg",
    repoLink: "https://github.com/Art-abg/bonton-trading",
    liveLink: "https://bonton-trading.example.com",
    technologies: ["React", "Material UI", "JavaScript", "REST APIs"],
    category: "frontend"
  },
  {
    id: 3,
    title: "ACA Team Project Task Management App",
    description: "Developed core UI components and enabled intuitive task organization through drag-and-drop functionality.",
    image: "/images/task-management.jpg",
    repoLink: "https://github.com/Art-abg/aca-task-management",
    liveLink: "https://aca-tasks.example.com",
    technologies: ["React", "Redux", "JavaScript", "CSS3"],
    category: "frontend"
  },
  {
    id: 4,
    title: "Website for LilArt Photo Studio",
    description: "Visually engaging, multi-language portfolio website with a seamless responsive experience.",
    image: "/images/lilart-studio.jpg",
    repoLink: "https://github.com/Art-abg/lilart-studio",
    liveLink: "https://lilart-studio.example.com",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "HTML5"],
    category: "frontend"
  },
  {
    id: 5,
    title: "Interactive Data Visualization Tool",
    description: "Advanced data visualization dashboard with interactive charts and filtering capabilities.",
    image: "/images/data-viz.jpg",
    repoLink: "https://github.com/Art-abg/data-viz-tool",
    liveLink: "https://data-viz.example.com",
    technologies: ["React", "D3.js", "TypeScript", "CSS3"],
    category: "frontend"
  }
];

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

const FilterContainer = styled.div`
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 25px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.cardBackground};
  color: ${({ active, theme }) => (active ? "#ffffff" : theme.colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }
  
  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.primary : `${theme.colors.primary}CC`};
    color: #ffffff;
    transform: translateY(-2px);
    
    &::before {
      width: 300px;
      height: 300px;
    }
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.4s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    border-color: ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 70%, ${({ theme }) => theme.colors.background});
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  ${ProjectCard}:hover &::after {
    opacity: 0.7;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
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
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.headings};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 3px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const TechIcon = styled(motion.div)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: default;
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
`;

const IconLink = styled(motion.a)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.6rem 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    border-color: ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

// Empty project message when no results are found
const EmptyProjectsMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  margin: 0 auto;
  max-width: 600px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
  }
`;

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    console.log("[Projects.js] useEffect triggered. searchTerm:", searchTerm, "activeCategory:", activeCategory);
    console.log("[Projects.js] projectsData at start of useEffect:", projectsData); // Log 1
    let tempProjects = projectsData;

    // Filter by category
    if (activeCategory !== "all") {
      console.log("[Projects.js] tempProjects before category filter:", tempProjects); // Log 2
      if (tempProjects && typeof tempProjects.filter === 'function') {
        tempProjects = tempProjects.filter(
          (project) => project.category === activeCategory
        );
      } else {
        console.error("[Projects.js] CRITICAL: tempProjects is not an array or is undefined before category filter! Value:", tempProjects);
        tempProjects = []; // Fallback to empty array to prevent further errors
      }
      console.log("[Projects.js] tempProjects after category filter:", tempProjects);
    }

    // Filter by search term
    if (searchTerm) {
      console.log("[Projects.js] tempProjects before search filter:", tempProjects); // Log 3
      if (tempProjects && typeof tempProjects.filter === 'function') {
        tempProjects = tempProjects.filter((project) => {
          if (!project || typeof project.title !== 'string' || typeof project.description !== 'string' || !Array.isArray(project.technologies)) {
            // console.warn("[Projects.js] Invalid project item for search:", project);
            return false;
          }
          const searchTermLower = searchTerm.toLowerCase();
          return (
            project.title.toLowerCase().includes(searchTermLower) ||
            project.description.toLowerCase().includes(searchTermLower) ||
            project.technologies.some(tech => 
              typeof tech === 'string' && tech.toLowerCase().includes(searchTermLower)
            )
          );
        });
      } else {
        console.error("[Projects.js] CRITICAL: tempProjects is not an array or is undefined before search filter! Value:", tempProjects);
        tempProjects = []; // Fallback to empty array
      }
      console.log("[Projects.js] tempProjects after search filter:", tempProjects);
    }
    
    console.log("[Projects.js] Final tempProjects to be set:", tempProjects); // Log 4
    setFilteredProjects(tempProjects);
  }, [searchTerm, activeCategory]);

  const categories = ["all", "frontend", "backend", "fullstack", "mobile"];

  const projectsRef = useRef(null);
  const isInView = useInView(projectsRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  // Start animation when projects come into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <ProjectsSection>
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Featured Projects
      </SectionTitle>

      <FilterContainer>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <CategoryFilters>
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </CategoryFilters>
      </FilterContainer>

      <ProjectsGrid ref={projectsRef}>
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                whileHover={{ scale: 1.02 }}
              >
                <ProjectImageContainer>
                  <ProjectImage src={project.image} alt={project.title} />
                </ProjectImageContainer>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <Technologies>
                    {project.technologies.map((tech, idx) => (
                      <TechIcon 
                        key={idx} 
                        title={tech}
                        whileHover={{ scale: 1.1, y: -5 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (idx * 0.05) }}
                      >
                        {React.isValidElement(techIcons[tech]) ? techIcons[tech] : <FaCode />}
                        <span>{tech}</span>
                      </TechIcon>
                    ))}
                  </Technologies>
                  <Links>
                    {project.repoLink && (
                      <IconLink
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </IconLink>
                    )}
                  </Links>
                </ProjectContent>
              </ProjectCard>
            ))
          ) : (
            <EmptyProjectsMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </EmptyProjectsMessage>
          )}
        </AnimatePresence>
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
