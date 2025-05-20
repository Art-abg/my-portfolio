import React, { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from "styled-components";

// Styles and Themes
import GlobalStyles from "./styles/globalStyles";
import { lightTheme, darkTheme } from "./styles/theme";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Lazy load pages with prefetching
const lazyWithPrefetch = (importFunction) => {
  const Component = lazy(importFunction);
  Component.prefetch = importFunction;
  return Component;
};

// Lazy-loaded page components
const Home = lazyWithPrefetch(() => import("./pages/Home"));
const About = lazyWithPrefetch(() => import("./pages/About"));
const Projects = lazyWithPrefetch(() => import("./pages/Projects"));
const Contact = lazyWithPrefetch(() => import("./pages/Contact"));

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

  // Prefetch routes when hovering over navigation
  const prefetchRoute = (component) => {
    if (component.prefetch) {
      component.prefetch().catch(() => {});
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<LoadingSpinner fullPage />}>
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
            } 
            onMouseEnter={() => prefetchRoute(About)}
          />
          <Route 
            path="/projects" 
            element={
              <ErrorBoundary>
                <Projects />
              </ErrorBoundary>
            } 
            onMouseEnter={() => prefetchRoute(Projects)}
          />
          <Route 
            path="/contact" 
            element={
              <ErrorBoundary>
                <Contact />
              </ErrorBoundary>
            } 
            onMouseEnter={() => prefetchRoute(Contact)}
          />
        </Routes>
      </Suspense>
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
    <HelmetProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
      <Helmet>
        <title>Artur Abgaryan | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Artur Abgaryan, a software developer specializing in front-end development."
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
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
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
    </HelmetProvider>
  );
}

export default App;
