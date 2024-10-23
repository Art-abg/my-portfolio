import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeContext } from "./contexts/ThemeContext";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import GlobalStyles from "./styles/globalStyles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { lightTheme, darkTheme } from "./styles/theme";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolioTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("portfolioTheme", newTheme);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <AppContainer>
          <Helmet>
            <title>Your Name | Portfolio</title>
            <meta
              name="description"
              content="Portfolio of Your Name, a software developer specializing in front-end development."
            />
          </Helmet>
          <Router>
            <Header currentTheme={theme} toggleTheme={toggleTheme} />
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </MainContent>
            <Footer />
          </Router>
        </AppContainer>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
