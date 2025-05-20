import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Helmet } from "react-helmet-async";
import { useLazyLoad, useAnimationFrameLoop } from "../utils/optimizations";
import { useTheme } from "styled-components";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import profileImg from "../assets/Artur_profile_photo.png";

// Styled components
const HomeContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  overflow: hidden;
`;

const NeumorphicCard = styled(motion.div)`
  background: ${({ theme }) =>
    theme && theme.colors ? theme.colors.cardBackground : "#e0e5ec"};
  border-radius: 30px;
  box-shadow: ${({ theme }) =>
    theme && theme.colors && theme.colors.neumorphicFlat
      ? theme.colors.neumorphicFlat
      : "2px 2px 5px rgba(0,0,0,0.1)"}; /* Restored, with fallback */
  padding: 3.5rem;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.md : "992px"}) {
    grid-template-columns: 1fr;
    padding: 2rem;
    max-width: 95%;
  }

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "576px"}) {
    padding: 1.2rem;
    border-radius: 20px;
    gap: 1.5rem;
    box-shadow: ${({ theme }) =>
      theme && theme.colors
        ? `0 8px 32px 0 ${theme.colors.shadowLight}`
        : "0 8px 32px 0 rgba(0, 0, 0, 0.1)"};
  }
`;

const ContentSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.md : "992px"}) {
    order: 2;
  }
`;

const ImageSection = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.md : "992px"}) {
    order: 1;
  }
`;

const NeumorphicImageContainer = styled(motion.div)`
  width: 100%;
  height: auto;
  aspect-ratio: 1/1.2;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme && theme.colors && theme.colors.neumorphicFlat
      ? theme.colors.neumorphicFlat
      : "2px 2px 5px rgba(0,0,0,0.1)"}; /* Restored, with fallback */

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "576px"}) {
    aspect-ratio: 1/1.1;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme && theme.colors
        ? `linear-gradient(120deg, ${theme.colors.primary}40, ${theme.colors.accent}40)`
        : "linear-gradient(120deg, #4277FF40, #6E9FFF40)"};
    opacity: 0.2;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 15px;
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1); /* TEMP DEBUG */
    z-index: 0;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 15px;
  position: relative;
  z-index: 1;
  filter: contrast(1.05) brightness(1.03);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: filter 0.3s ease, transform 0.5s ease;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "576px"}) {
    border-radius: 12px;
  }

  ${({ theme }) =>
    theme &&
    theme.isDark &&
    `
    filter: contrast(1.05) brightness(1.05);
  `}
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
    const baseColor = color || primaryColor || "#CCCCCC";
    return `${String(baseColor)}10`;
  }};
  border-radius: 50%;
  z-index: 0;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) =>
    theme && theme.fonts ? theme.fonts.headings : "sans-serif"};
  background: ${({ theme }) =>
    theme && theme.colors && theme.colors.gradientPrimary
      ? theme.colors.gradientPrimary
      : "#4277FF"}; /* Restored, with fallback */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  line-height: 1.1;
  position: relative;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.md : "992px"}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "768px"}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.div)`
  font-size: 1.6rem;
  color: ${({ theme }) =>
    theme && theme.colors ? theme.colors.textSecondary : "#555555"};
  margin-bottom: 2rem;
  font-family: ${({ theme }) =>
    theme && theme.fonts ? theme.fonts.body : "sans-serif"};
  position: relative;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "768px"}) {
    font-size: 1.3rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) =>
    theme && theme.colors ? theme.colors.text : "#333333"};
  margin-bottom: 2rem;
  max-width: 600px;
  position: relative;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "768px"}) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "768px"}) {
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }
`;

const NeumorphicButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) =>
    !["$primary", "primary", "to", "href"].includes(prop),
})`
  background: ${({ theme, $primary }) => {
    if (!theme || !theme.colors) return $primary ? "#4277FF" : "#e0e5ec";
    return $primary ? theme.colors.primary : theme.colors.cardBackground;
  }};
  color: ${({ theme, $primary }) => {
    if (!theme || !theme.colors) return $primary ? "#fff" : "#333";
    return $primary ? "#fff" : theme.colors.text;
  }};
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1.5rem;
  font-family: ${({ theme }) =>
    theme && theme.fonts ? theme.fonts.body : "sans-serif"};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  transition: ${({ theme }) =>
    theme && theme.transitions ? theme.transitions.default : "all 0.3s ease"};
  box-shadow: ${({ theme, $primary }) => {
    if (!theme) return "1px 1px 3px rgba(0,0,0,0.1)";
    return theme.isDark
      ? $primary
        ? "0 4px 15px rgba(66, 119, 255, 0.3)"
        : "0 4px 15px rgba(0, 0, 0, 0.2)"
      : $primary
      ? "0 4px 15px rgba(66, 119, 255, 0.2)"
      : "0 4px 15px rgba(0, 0, 0, 0.1)";
  }};

  ${({ $primary, theme }) =>
    $primary &&
    theme &&
    theme.colors &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }) =>
        theme && theme.colors && theme.colors.gradientPrimary
          ? theme.colors.gradientPrimary
          : "#4277FF"}; /* Restored, with fallback */
      opacity: 1;
      z-index: 0;
      transition: opacity 0.3s ease;
    }

    & > * { /* Ensure text and icon are above gradient */
      position: relative;
      z-index: 1;
    }
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme, $primary }) => {
      if (!theme) return "2px 2px 6px rgba(0,0,0,0.15)";
      return theme.isDark
        ? $primary
          ? "0 6px 20px rgba(66, 119, 255, 0.4)"
          : "0 6px 20px rgba(0, 0, 0, 0.25)"
        : $primary
        ? "0 6px 20px rgba(66, 119, 255, 0.3)"
        : "0 6px 20px rgba(0, 0, 0, 0.15)";
    }};

    ${({ $primary, theme }) =>
      $primary &&
      theme &&
      theme.colors && // Ensure theme and colors are available for hover effect
      `
      &::before {
        opacity: 0.85; /* Slightly fade gradient on hover for effect */
      }
    `}
  }

  &:active {
    transform: translateY(1px);
    box-shadow: ${({ theme, $primary }) => {
      if (!theme) return "inset 1px 1px 2px rgba(0,0,0,0.1)";
      return theme.isDark
        ? $primary
          ? "inset 1px 1px 5px rgba(0, 0, 0, 0.2), 0 2px 10px rgba(66, 119, 255, 0.3)"
          : "inset 1px 1px 5px rgba(0, 0, 0, 0.2)"
        : $primary
        ? "inset 1px 1px 3px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(66, 119, 255, 0.2)"
        : "inset 1px 1px 3px rgba(0, 0, 0, 0.1)";
    }};
  }

  svg {
    font-size: 1.1rem;
  }

  @media (max-width: ${({ theme }) =>
      theme && theme.breakpoints ? theme.breakpoints.sm : "768px"}) {
    width: 100%;
    padding: 0.9rem 1rem;
    font-size: 0.95rem;
    border-radius: 10px;
  }
`;

const SocialContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialButton = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme && theme.colors ? theme.colors.cardBackground : "#e0e5ec"};
  color: ${({ theme }) =>
    theme && theme.colors ? theme.colors.text : "#333333"};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); /* TEMP DEBUG */
  transition: ${({ theme }) =>
    theme && theme.transitions ? theme.transitions.default : "all 0.3s ease"};
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    transform: translateY(-3px);
    color: ${({ theme }) =>
      theme && theme.colors ? theme.colors.primary : "#4277FF"};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15); /* TEMP DEBUG */
  }

  &:active {
    transform: translateY(0);
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1); /* TEMP DEBUG */
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) =>
    theme && theme.colors ? theme.colors.textSecondary : "#555555"};
  font-size: 0.9rem;

  span {
    margin-bottom: 0.5rem;
  }
`;

const Home = () => {
  const theme = useTheme();

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const springConfig = { stiffness: 150, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.4,
      },
    },
  };

  const shapes = [
    {
      size: 120,
      x: "10%",
      y: "20%",
      duration: 20,
      color: theme.colors.primary,
    },
    { size: 80, x: "70%", y: "70%", duration: 25, color: theme.colors.accent },
    {
      size: 150,
      x: "80%",
      y: "15%",
      duration: 30,
      color: theme.colors.primaryLight,
    },
    {
      size: 60,
      x: "30%",
      y: "80%",
      duration: 22,
      color: theme.colors.accentLight,
    },
    {
      size: 100,
      x: "90%",
      y: "50%",
      duration: 28,
      color: theme.colors.primary,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Art Abgaryan | Portfolio</title>
        <meta
          name="description"
          content="Welcome to Art Abgaryan's portfolio. I am a front-end developer specializing in creating beautiful and functional web experiences."
        />
      </Helmet>

      <HomeContainer>
        <FloatingShapes>
          {shapes.map((shape, index) => (
            <Shape
              key={index}
              color={shape.color}
              style={{
                width: shape.size,
                height: shape.size,
                left: shape.x,
                top: shape.y,
              }}
              animate={{
                x: [20, -20, 20],
                y: [10, -10, 10],
                rotate: [0, 360],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </FloatingShapes>

        <HeroSection>
          <NeumorphicCard
            ref={containerRef}
            onMouseMove={!isMobile ? handleMouseMove : undefined}
            style={
              !isMobile
                ? {
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    perspective: 1000,
                  }
                : {}
            }
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <ContentSection variants={containerVariants}>
              <Name variants={itemVariants}>Hi, I'm Artur Abgaryan</Name>

              <Subtitle variants={itemVariants}>
                <TypeAnimation
                  sequence={[
                    "Front-end Developer",
                    2000,
                    "UX/UI Designer",
                    2000,
                    "Creative Problem Solver",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ display: "inline-block" }}
                />
              </Subtitle>

              <Description variants={itemVariants}>
                I craft beautiful digital experiences with a focus on
                performance, accessibility, and user delight. My passion lies in
                building innovative solutions that make a difference.
              </Description>

              <ButtonContainer variants={itemVariants}>
                <Link
                  to="/projects"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <NeumorphicButton
                    $primary
                    as={motion.button}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    View My Work
                  </NeumorphicButton>
                </Link>

                <Link
                  to="/contact"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <NeumorphicButton
                    as={motion.button}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{
                      y: -2,
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    Contact Me
                  </NeumorphicButton>
                </Link>
              </ButtonContainer>

              <SocialContainer variants={itemVariants}>
                <SocialButton
                  href="https://github.com/Art-abg"
                  target="_blank"
                  whileHover={{ y: -5, color: theme.colors.primary }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub />
                </SocialButton>

                <SocialButton
                  href="https://linkedin.com/in/artur-abgaryan"
                  target="_blank"
                  whileHover={{ y: -5, color: theme.colors.primary }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLinkedin />
                </SocialButton>

                <SocialButton
                  href="mailto:artur.abgaryan@example.com"
                  whileHover={{ y: -5, color: theme.colors.primary }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail />
                </SocialButton>
              </SocialContainer>
            </ContentSection>

            <ImageSection variants={imageVariants}>
              <NeumorphicImageContainer
                animate={{
                  boxShadow: [
                    "1px 1px 3px rgba(0,0,0,0.1)" /* TEMP DEBUG */,
                    "2px 2px 4px rgba(0,0,0,0.15)" /* TEMP DEBUG */,
                    "1px 1px 3px rgba(0,0,0,0.1)" /* TEMP DEBUG */,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                <ProfileImage
                  src={profileImg}
                  alt="Art Abgaryan"
                  animate={{ scale: [1, 1.015, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </NeumorphicImageContainer>
            </ImageSection>
          </NeumorphicCard>
        </HeroSection>
      </HomeContainer>
    </>
  );
};

export default Home;
