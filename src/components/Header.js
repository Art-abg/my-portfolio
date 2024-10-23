import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.headerText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.header};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.headings};
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
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.headerText};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Hamburger = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.headerText};
  font-size: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
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
  padding: 2rem;
  z-index: 999;
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
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  font-size: 1.5rem;
  transition: color 0.3s;
  font-family: ${({ theme }) => theme.fonts.body};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.headerText};
  font-size: 2rem;
  cursor: pointer;
  align-self: flex-end;
`;

const Header = ({ currentTheme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo to="/">YourLogo</Logo>
      <Nav>
        <NavList>
          <NavItem>
            <NavLinkStyled to="/">Home</NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/about">About</NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/projects">Projects</NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/contact">Contact</NavLinkStyled>
          </NavItem>
        </NavList>
      </Nav>
      <IconsContainer>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
          {currentTheme === "light" ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
        <Hamburger onClick={handleMenuToggle} aria-label="Menu">
          <FaBars />
        </Hamburger>
      </IconsContainer>
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <CloseButton onClick={closeMenu} aria-label="Close Menu">
              <FaTimes />
            </CloseButton>
            <MobileNavList>
              <MobileNavItem>
                <MobileNavLink to="/" onClick={closeMenu}>
                  Home
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/about" onClick={closeMenu}>
                  About
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/projects" onClick={closeMenu}>
                  Projects
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/contact" onClick={closeMenu}>
                  Contact
                </MobileNavLink>
              </MobileNavItem>
            </MobileNavList>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
