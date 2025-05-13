import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import GlobalStyles from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  margin-top: 60px;
`;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={
          <ErrorBoundary>
            <Projects />
          </ErrorBoundary>
        } />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioTheme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }

    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("portfolioTheme", newTheme);
  };

  if (isLoading) {
    return null; // Or return a loading spinner
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Helmet>
        <title>Your Name | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Your Name, a software developer specializing in front-end development."
        />
        <meta
          name="theme-color"
          content={
            theme === "light"
              ? lightTheme.colors.background
              : darkTheme.colors.background
          }
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Router>
        <ErrorBoundary>
          <AppContainer>
            <Header currentTheme={theme} toggleTheme={toggleTheme} />
            <MainContent>
              <PageContainer>
                <AnimatedRoutes />
              </PageContainer>
            </MainContent>
            <Footer />
          </AppContainer>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
