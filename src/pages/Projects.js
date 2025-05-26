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
    title: "AI Photo Studio",
    description: "Advanced AI-powered photo editing platform with automated background removal, enhancement, and style transfer capabilities.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    repoLink: "https://github.com/Art-abg/ai-photostudio",
    technologies: ["React", "Node.js", "TensorFlow.js", "CSS3"],
    category: "fullstack"
  },
  {
    id: 2,
    title: "LilArt Photo Studio",
    description: "Professional photography studio website showcasing portfolios, booking system, and client gallery.",
    image: "https://images.unsplash.com/photo-1513151233551-47dbde48a2a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    repoLink: "https://github.com/Art-abg/lilart_photo_studio",
    technologies: ["React", "Express", "MongoDB", "Node.js"],
    category: "fullstack"
  },
  {
    id: 3,
    title: "Trading Dashboard",
    description: "Real-time cryptocurrency and stock market tracking dashboard with portfolio management and analytics.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    repoLink: "https://github.com/Art-abg/trading-dashboard",
    technologies: ["React", "TypeScript", "Redux", "D3.js"],
    category: "frontend"
  },
  {
    id: 4,
    title: "AMMA Track",
    description: "Comprehensive project management and task tracking application with team collaboration features.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    repoLink: "https://github.com/manevardazaryan1/AMMA-Track",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    category: "fullstack"
  },
  {
    id: 5,
    title: "Interactive Data Visualization Tool",
    description: "Advanced data visualization dashboard with interactive charts and filtering capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    repoLink: "https://github.com/Art-abg/data-viz-tool",
    technologies: ["React", "D3.js", "TypeScript", "CSS3"],
    category: "frontend"
  }
];

const ProjectsSection = styled.section`
  padding: 6rem 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 5rem 0.5rem;
  }
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

const FilterButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})`
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
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground || theme.colors.background};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card || '0 4px 6px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border || 'rgba(0, 0, 0, 0.1)'};
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover || '0 10px 20px rgba(0, 0, 0, 0.15)'};
    border-color: ${({ theme }) => `${theme.colors.primary || '#4f46e5'}30`};
  }
  
  @media (max-width: 480px) {
    border-radius: 12px;
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
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text || '#1a202c'};
  font-family: ${({ theme }) => theme.fonts?.headings || 'sans-serif'};
  position: relative;
  display: inline-block;
  line-height: 1.3;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg, 
      ${({ theme }) => theme.colors.primary || '#4f46e5'}, 
      ${({ theme }) => theme.colors.accent || '#7c3aed'}
    );
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary || '#4a5568'};
  margin-bottom: 1.25rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const TechIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: ${({ theme }) => `${theme.colors.primary || '#4f46e5'}10`};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary || '#4f46e5'};
  cursor: default;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  svg {
    color: ${({ theme }) => theme.colors.primary || '#4f46e5'};
    font-size: 1rem;
  }
  
  span {
    font-size: 0.8em;
  }
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${({ theme }) => `${theme.colors.primary || '#4f46e5'}15`};
  }
  
  @media (max-width: 480px) {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
    
    svg {
      font-size: 0.9rem;
    }
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
