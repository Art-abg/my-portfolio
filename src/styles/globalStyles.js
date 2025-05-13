import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.5s ease, color 0.5s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.headings};
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 400;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  button, .btn {
    font-family: ${({ theme }) => theme.fonts.body};
    border: none;
    outline: none;
    cursor: pointer;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: 500;
    font-size: 1rem;
    position: relative;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: ${({ theme }) => theme.transitions.default};
  }

  button:hover, .btn:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-2px);
  }

  button:active, .btn:active {
    box-shadow: ${({ theme }) => theme.shadows.buttonPressed};
    transform: translateY(1px);
  }

  /* Neumorphic form elements */
  input, textarea, select {
    background: ${({ theme }) => theme.colors.inputBackground};
    border: none;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    outline: none;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
    transition: ${({ theme }) => theme.transitions.default};
    margin-bottom: 1.5rem;
    width: 100%;
  }

  input:focus, textarea:focus, select:focus {
    box-shadow: ${({ theme }) => theme.colors.neumorphicFlat};
  }

  /* Neumorphic card */
  .neumorphic-card {
    background: ${({ theme }) => theme.colors.cardBackground};
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.card};
    padding: 1.5rem;
    transition: ${({ theme }) => theme.transitions.default};
  }

  .neumorphic-card:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-5px);
  }

  /* Animations */
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes gradientBg {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Utility classes */
  .text-gradient {
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }

  .float-animation {
    animation: float 4s ease-in-out infinite;
  }

  .pulse-animation {
    animation: pulse 3s ease-in-out infinite;
  }

  /* Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Responsive typography */
  @media (max-width: 768px) {
    h1 {
      font-size: 2.2rem;
    }
    h2 {
      font-size: 1.8rem;
    }
    h3 {
      font-size: 1.3rem;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary}40;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary}80;
  }

  /* Lazy loading enhancement */
  img.lazy-load {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  img.lazy-loaded {
    opacity: 1;
  }

  /* Content visibility for better performance */
  .content-visibility-auto {
    content-visibility: auto;
    contain-intrinsic-size: 0 500px;
  }

  /* Accessibility improvements */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus states for accessibility */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Skip to content link for accessibility */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    z-index: 100;
    transition: top 0.3s ease;
  }

  .skip-to-content:focus {
    top: 0;
  }
`;

export default GlobalStyles;
