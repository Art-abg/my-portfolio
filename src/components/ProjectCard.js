import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-8px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, ${({ theme }) => theme.colors.cardBackground} 100%);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.8rem;
  font-weight: 600;
  
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.5rem 0 1.2rem;
  flex: 1;
`;

const CardLink = styled(Link)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-2px);
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:active {
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
    transform: translateY(1px);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const ProjectCard = ({ project }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="neumorphic-card"
      whileHover={{ scale: 1.02 }}
    >
      <CardImage src={project.image} alt={project.title} />
      <CardContent>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
        
        {project.tags && (
          <Tags>
            {project.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>
        )}
        
        <CardLink to={project.link}>View Project</CardLink>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
