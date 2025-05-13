export const lightTheme = {
  colors: {
    background: "#e0e5ec", // Neumorphic light background
    backgroundAlt: "#d1d9e6",
    cardBackground: "#e0e5ec",
    text: "#333333",
    textSecondary: "#555555",
    primary: "#4277FF", // Vibrant blue
    primaryDark: "#2E5BFF",
    primaryLight: "#6E9FFF", // Lighter shade for gradients
    accent: "#FF5DCD", // Vibrant pink accent
    accentDark: "#D94CAF",
    accentLight: "#FF8AE0",
    success: "#3DD598", // Status colors for feedback
    error: "#FF4D4F",
    warning: "#FFAB2D",
    info: "#3E7BFA",
    border: "#d1d9e6",
    inputBackground: "#e0e5ec",
    footerBackground: "#d1d9e6",
    footerText: "#2c3e50",
    headerBackground: "rgba(224, 229, 236, 0.8)", // Semi-transparent for glassmorphism
    headerText: "#333333",
    mobileMenuBackground: "rgba(224, 229, 236, 0.95)",
    shadowDark: "rgba(163, 177, 198, 0.6)", // Shadow colors for neumorphic effect
    shadowLight: "rgba(255, 255, 255, 0.8)",
    gradientPrimary: "linear-gradient(135deg, #4277FF 0%, #6E9FFF 100%)",
    gradientAccent: "linear-gradient(135deg, #FF5DCD 0%, #FF8AE0 100%)",
    glassMorphism: "rgba(255, 255, 255, 0.25)",
    glassBorder: "1px solid rgba(255, 255, 255, 0.18)",
    glassBoxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    neumorphicInset: "inset 8px 8px 16px rgba(163, 177, 198, 0.6), inset -8px -8px 16px rgba(255, 255, 255, 0.8)",
    neumorphicFlat: "8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.8)",
    neumorphicFloating: "12px 12px 24px rgba(163, 177, 198, 0.6), -12px -12px 24px rgba(255, 255, 255, 0.8)"
  },
  fonts: {
    headings: "'Poppins', sans-serif",
    body: "'Inter', sans-serif"
  },
  shadows: {
    header: "rgba(17, 12, 46, 0.05) 0px 15px 30px -10px", // Modern subtle shadow
    card: "8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.8)",
    cardHover: "10px 10px 20px rgba(163, 177, 198, 0.7), -10px -10px 20px rgba(255, 255, 255, 0.9)",
    cardLight: "rgba(149, 157, 165, 0.1) 0px 8px 24px",
    buttonPressed: "inset 8px 8px 16px rgba(163, 177, 198, 0.6), inset -8px -8px 16px rgba(255, 255, 255, 0.8)",
    buttonPrimary: "10px 10px 20px rgba(163, 177, 198, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.7)",
    buttonPrimaryHover: "14px 14px 28px rgba(163, 177, 198, 0.6), -14px -14px 28px rgba(255, 255, 255, 0.8)",
    mobileMenu: "rgba(100, 100, 111, 0.1) 0px 7px 29px 0px",
    subtle: "rgba(0, 0, 0, 0.04) 0px 3px 5px"
  },
  transitions: {
    default: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    slow: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    bounce: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
    smooth: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
  },
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1600px"
  },
  zIndices: {
    base: 0,
    content: 10,
    navigation: 100,
    modal: 200,
    toast: 300
  }
};

export const darkTheme = {
  colors: {
    background: "#131419", // Neumorphic dark background
    backgroundAlt: "#1c1d24",
    cardBackground: "#131419",
    text: "#d2dae2",
    textSecondary: "#a4b0be",
    primary: "#4277FF", // Vibrant blue that stands out on dark surface
    primaryDark: "#2E5BFF",
    primaryLight: "#6E9FFF", // Lighter shade for gradients
    accent: "#FF5DCD", // Vibrant pink accent
    accentDark: "#D94CAF",
    accentLight: "#FF8AE0",
    success: "#3DD598", // Status colors for feedback
    error: "#FF4D4F",
    warning: "#FFAB2D",
    info: "#3E7BFA",
    border: "#25262c",
    inputBackground: "#1c1d24",
    footerBackground: "#1c1d24",
    footerText: "#d2dae2",
    headerBackground: "rgba(19, 20, 25, 0.8)", // Semi-transparent for glassmorphism
    headerText: "#d2dae2",
    mobileMenuBackground: "rgba(19, 20, 25, 0.95)",
    shadowDark: "rgba(0, 0, 0, 0.5)", // Shadow colors for neumorphic effect
    shadowLight: "rgba(255, 255, 255, 0.05)",
    gradientPrimary: "linear-gradient(135deg, #4277FF 0%, #6E9FFF 100%)",
    gradientAccent: "linear-gradient(135deg, #FF5DCD 0%, #FF8AE0 100%)",
    glassMorphism: "rgba(15, 16, 20, 0.55)",
    glassBorder: "1px solid rgba(255, 255, 255, 0.08)",
    glassBoxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
    neumorphicInset: "inset 8px 8px 16px rgba(0, 0, 0, 0.5), inset -8px -8px 16px rgba(255, 255, 255, 0.05)",
    neumorphicFlat: "8px 8px 16px rgba(0, 0, 0, 0.5), -8px -8px 16px rgba(255, 255, 255, 0.05)",
    neumorphicFloating: "12px 12px 24px rgba(0, 0, 0, 0.5), -12px -12px 24px rgba(255, 255, 255, 0.05)"
  },
  fonts: {
    headings: "'Poppins', sans-serif",
    body: "'Inter', sans-serif"
  },
  shadows: {
    header: "rgba(0, 0, 0, 0.2) 0px 15px 30px -10px", // Modern subtle shadow
    card: "0 10px 15px -3px rgba(0, 0, 0, 0.45), 0 4px 6px -2px rgba(0, 0, 0, 0.35)",
    cardHover: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
    cardLight: "0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
    buttonPressed: "inset 8px 8px 16px rgba(0, 0, 0, 0.5), inset -8px -8px 16px rgba(255, 255, 255, 0.05)",
    buttonPrimary: "10px 10px 20px rgba(0, 0, 0, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.04)",
    buttonPrimaryHover: "14px 14px 28px rgba(0, 0, 0, 0.5), -14px -14px 28px rgba(255, 255, 255, 0.05)",
    mobileMenu: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)",
    subtle: "0 1px 3px rgba(0, 0, 0, 0.2)"
  },
  transitions: {
    default: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    slow: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    bounce: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
    smooth: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
  },
  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1600px"
  },
  zIndices: {
    base: 0,
    content: 10,
    navigation: 100,
    modal: 200,
    toast: 300
  }
};
