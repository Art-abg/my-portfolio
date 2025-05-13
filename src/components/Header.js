import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme, $scrolled }) => $scrolled ? theme.colors.headerBackground : 'transparent'};
  color: ${({ theme }) => theme.colors.headerText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $scrolled }) => $scrolled ? '1rem 2.5rem' : '1.2rem 2.5rem'};
  position: fixed;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.navigation};
  box-shadow: ${({ theme, $scrolled }) => $scrolled ? theme.shadows.header : 'none'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(10px)' : 'none'};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: ${({ theme }) => theme.transitions.default};
  border-bottom: ${({ theme, $scrolled }) => $scrolled ? theme.colors.glassBorder : 'none'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ $scrolled }) => $scrolled ? '0.8rem 1.5rem' : '1rem 1.5rem'};
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.headings};
  position: relative;
  z-index: 2;
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }

  span {
    background: ${({ theme }) => theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    position: relative;
    
    &::after {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      background: ${({ theme }) => theme.colors.gradientAccent};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
  }
  
  &:hover span::after {
    opacity: 1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.3rem;
  }
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
`;

const NavItem = styled.li``;

const NavLinkStyled = styled(Link)`
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.headerText};
  text-decoration: none;
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};
  font-family: ${({ theme }) => theme.fonts.body};
  position: relative;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  background-color: ${({ theme, $isActive }) => $isActive ? `${theme.colors.primary}15` : 'transparent'};
  box-shadow: ${({ theme, $isActive }) => $isActive ? theme.colors.neumorphicInset : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ $isActive }) => $isActive ? '600' : '500'};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ isActive }) => isActive ? '60%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    transition: ${({ theme }) => theme.transitions.smooth};
    border-radius: 2px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}10`};
    transform: translateY(-3px);
    
    &:after {
      width: 60%;
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ThemeToggle = styled.button`
  background: ${({ theme }) => theme.colors.glassMorphism};
  border: ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.isDark ? '#FFD700' : '#4F6BFF'};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: ${({ theme }) => theme.isDark ? '0 3px 15px rgba(0, 0, 0, 0.3)' : theme.shadows.cardLight};
  transition: ${({ theme }) => theme.transitions.default};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => theme.isDark ? 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)' : 'radial-gradient(circle, rgba(79,107,255,0.2) 0%, rgba(79,107,255,0) 70%)'};
    opacity: 0;
    border-radius: 50%;
    transform: scale(0);
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.isDark ? '0 5px 20px rgba(0, 0, 0, 0.4)' : theme.shadows.cardHover};
    transform: translateY(-3px);
    
    &::before {
      opacity: 0.6;
      transform: scale(1);
    }
  }

  &:active {
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
    transform: translateY(1px);
  }
  
  svg {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
`;

const Hamburger = styled.button`
  background: ${({ theme }) => theme.colors.glassMorphism};
  border: ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.headerText};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: ${({ theme }) => theme.shadows.cardLight};
  transition: ${({ theme }) => theme.transitions.default};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => theme.colors.gradientAccent};
    opacity: 0;
    border-radius: 50%;
    transform: scale(0);
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-3px);
    
    &::before {
      opacity: 0.1;
      transform: scale(1);
    }
  }

  &:active {
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
    transform: translateY(1px);
  }
  
  svg {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mobileMenuBackground};
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  z-index: ${({ theme }) => theme.zIndices.modal};
  box-shadow: ${({ theme }) => theme.shadows.mobileMenu};
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-left: ${({ theme }) => theme.colors.glassBorder};
  overflow-y: auto;
  will-change: transform;
`;

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const MobileNavItem = styled.li``;

const MobileNavLink = styled(Link)`
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.headerText};
  text-decoration: none;
  font-size: 1.5rem;
  transition: ${({ theme }) => theme.transitions.default};
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  display: inline-block;
  background-color: ${({ theme, $isActive }) => $isActive ? `${theme.colors.primary}10` : 'transparent'};
  box-shadow: ${({ theme, $isActive }) => $isActive ? theme.colors.neumorphicInset : 'none'};
  width: 100%;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
`;

const CloseButton = styled.button`
  background: ${({ theme }) => theme.colors.glassMorphism};
  border: ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.headerText};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  align-self: flex-end;
  box-shadow: ${({ theme }) => theme.shadows.cardLight};
  transition: ${({ theme }) => theme.transitions.default};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: ${({ theme }) => theme.colors.gradientAccent};
    opacity: 0;
    border-radius: 50%;
    transform: scale(0);
    transition: ${({ theme }) => theme.transitions.default};
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    color: ${({ theme }) => theme.colors.error};
    transform: translateY(-3px) rotate(90deg);
    
    &::before {
      opacity: 0.1;
      transform: scale(1);
    }
  }

  &:active {
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
    transform: translateY(1px);
  }
  
  svg {
    position: relative;
    z-index: 1;
  }
`;

// Add an overlay for the mobile menu
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: 998;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); /* For Safari */
  /* Allow clicks but handle them in the onClick handler */
  pointer-events: auto;
  /* Make sure the body doesn't scroll behind */
  touch-action: none;
`;

const Header = ({ currentTheme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = (e) => {
    // Only close if clicking the overlay or close button
    if (e.currentTarget === e.target || e.currentTarget.getAttribute('aria-label') === 'Close Menu') {
      setMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <Logo to="/">
        <span>Artur Abgaryan</span>
      </Logo>
      <Nav>
        <NavList>
          <NavItem>
            <NavLinkStyled to="/" $isActive={location.pathname === "/"}>
              Home
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/about" $isActive={location.pathname === "/about"}>
              About
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/projects" $isActive={location.pathname === "/projects"}>
              Projects
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/contact" $isActive={location.pathname === "/contact"}>
              Contact
            </NavLinkStyled>
          </NavItem>
        </NavList>
      </Nav>
      <IconsContainer>
        <ThemeToggle 
          onClick={toggleTheme} 
          aria-label="Toggle Theme"
          as={motion.button}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          title={currentTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {currentTheme === "light" ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
        <Hamburger 
          onClick={handleMenuToggle} 
          aria-label="Menu"
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBars />
        </Hamburger>
      </IconsContainer>
      <AnimatePresence>
        {menuOpen && (
          <>
            <Overlay 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
            >
              <CloseButton 
                onClick={closeMenu} 
                aria-label="Close Menu"
                as={motion.button}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes />
              </CloseButton>
              <MobileNavList>
                <MobileNavItem>
                  <MobileNavLink 
                    to="/" 
                    onClick={closeMenu}
                    $isActive={location.pathname === "/"}
                    as={motion.a}
                    whileHover={{ x: 10 }}
                  >
                    Home
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink 
                    to="/about" 
                    onClick={closeMenu}
                    $isActive={location.pathname === "/about"}
                    as={motion.a}
                    whileHover={{ x: 10 }}
                  >
                    About
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink 
                    to="/projects" 
                    onClick={closeMenu}
                    $isActive={location.pathname === "/projects"}
                    as={motion.a}
                    whileHover={{ x: 10 }}
                  >
                    Projects
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink 
                    to="/contact" 
                    onClick={closeMenu}
                    $isActive={location.pathname === "/contact"}
                    as={motion.a}
                    whileHover={{ x: 10 }}
                  >
                    Contact
                  </MobileNavLink>
                </MobileNavItem>
              </MobileNavList>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
