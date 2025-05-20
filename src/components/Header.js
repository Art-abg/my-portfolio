import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaTimes, FaHome, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ToggleSwitch from "./common/ToggleSwitch";
import Logo from "./Logo";

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

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 2;
  position: relative;
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

const ThemeToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-right: 0.5rem;
    transform: translateY(1px);
  }
  
  svg {
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
`;

const Hamburger = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  position: relative;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const HamburgerLine = styled(motion.span)`
  display: block;
  width: 20px;
  height: 2px;
  background: ${({ theme }) => theme.colors.text};
  border-radius: 2px;
  margin: 3px 0;
  transform-origin: center;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background || 'rgba(255, 255, 255, 0.95)'};
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  z-index: 1000;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  will-change: transform;
  pointer-events: auto;
  
  @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.colors.background || 'rgba(26, 32, 44, 0.97)'};
  }
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
  font-size: 1.2rem;
  transition: ${({ theme }) => theme.transitions.default};
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme, $isActive }) => $isActive ? `${theme.colors.primary}15` : 'transparent'};
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
`;

const Header = ({ currentTheme = 'light', toggleTheme = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuControls = useAnimation();
  const hamburgerControls = useAnimation();
  
  const isDark = currentTheme === 'dark';

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

  const handleMenuToggle = async (e) => {
    e.stopPropagation();
    
    if (!menuOpen) {
      // Open menu
      setMenuOpen(true);
      document.body.style.overflow = 'hidden';
      
      // Set initial state for animation
      await menuControls.set({ x: '100%' });
      
      // Animate menu in
      menuControls.start({
        x: 0,
        transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' }
      });
      
      // Animate hamburger icon
      hamburgerControls.start({
        rotate: 180,
        transition: { duration: 0.3 }
      });
    } else {
      // Close menu
      await menuControls.start({
        x: '100%',
        transition: { type: 'spring', damping: 25, stiffness: 250 }
      });
      
      // Reset menu state
      setMenuOpen(false);
      document.body.style.overflow = 'auto';
      
      // Reset hamburger icon
      hamburgerControls.start({
        rotate: 0,
        transition: { duration: 0.3 }
      });
    }
  };

  const closeMenu = () => {
    // Close the menu
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
    
    // Animate the menu out
    menuControls.start({
      x: '100%',
      transition: { type: 'tween', duration: 0.2, ease: 'easeInOut' }
    });
  };
  
  const handleNavigation = (e, path) => {
    e.preventDefault();
    closeMenu();
    // Use a small timeout to ensure the menu closes before navigation
    setTimeout(() => {
      window.location.href = path;
    }, 50);
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <LogoLink to="/" aria-label="Home">
        <Logo />
      </LogoLink>
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
        <ThemeToggleWrapper>
          <ToggleSwitch isDark={isDark} onToggle={toggleTheme} />
        </ThemeToggleWrapper>
        <Hamburger 
          onClick={handleMenuToggle} 
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          initial={false}
          animate={hamburgerControls}
          type="button"
        >
          <HamburgerLine
            animate={menuOpen ? { rotate: 45, y: 8, background: 'currentColor' } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <HamburgerLine
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.1 }}
          />
          <HamburgerLine
            animate={menuOpen ? { rotate: -45, y: -8, background: 'currentColor' } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
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
              transition={{ duration: 0.3 }}
            />
            <MobileMenu
              initial={{ x: "100%" }}
              animate={menuControls}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <CloseButton 
                onClick={closeMenu} 
                aria-label="Close Menu"
                as={motion.button}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                title="Close Menu"
              >
                <FaTimes size={20} />
              </CloseButton>
              <MobileNavList>
                <MobileNavItem>
                  <MobileNavLink 
                    as={motion.div}
                    $isActive={location.pathname === "/"}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleNavigation(e, '/')}
                  >
                    <FaHome size={18} /> Home
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink 
                    as={motion.div}
                    $isActive={location.pathname === "/about"}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleNavigation(e, '/about')}
                  >
                    <FaUser size={18} /> About
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink 
                    as={motion.div}
                    $isActive={location.pathname === "/projects"}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleNavigation(e, '/projects')}
                  >
                    <FaProjectDiagram size={18} /> Projects
                  </MobileNavLink>
                </MobileNavItem>
                <MobileNavItem>
                  <MobileNavLink 
                    as={motion.div}
                    $isActive={location.pathname === "/contact"}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleNavigation(e, '/contact')}
                  >
                    <FaEnvelope size={18} /> Contact
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
