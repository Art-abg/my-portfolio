import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, useInView, useAnimation } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

const ContactSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -30%;
    left: -20%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.primary}10, transparent 70%);
    opacity: 0.3;
    z-index: 0;
    animation: pulse 15s ease-in-out infinite alternate;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -20%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.accent}10, transparent 70%);
    opacity: 0.3;
    z-index: 0;
    animation: pulse 15s ease-in-out 5s infinite alternate;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.4;
    }
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  padding: 2rem;
  position: relative;
`;

const InfoTitle = styled(motion.h3)`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  font-family: ${({ theme }) => theme.fonts.headings};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 2px;
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateX(8px) translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 1.5rem;
  box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
`;

const InfoText = styled.div`
  h4 {
    margin: 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0.5rem 0 0;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  transform-origin: center;
  position: relative;
  border: 1px solid transparent;
  
  &:hover {
    border-color: ${({ theme }) => `${theme.colors.primary}15`};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.accent}20);
    z-index: -1;
    filter: blur(15px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  box-shadow: ${({ theme, error }) => 
    error ? 
    `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px ${theme.colors.accent}` : 
    theme.colors.neumorphicInset
  };
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
  
  &:hover {
    box-shadow: ${({ theme, error }) => 
      error ? 
      `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px ${theme.colors.accent}` : 
      `inset 3px 3px 6px rgba(0, 0, 0, 0.1), inset -3px -3px 6px rgba(255, 255, 255, 0.05)`
    };
    transform: translateY(-2px);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  box-shadow: ${({ theme, error }) => 
    error ? 
    `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px ${theme.colors.accent}` : 
    theme.colors.neumorphicInset
  };
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
  
  &:hover {
    box-shadow: ${({ theme, error }) => 
      error ? 
      `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px ${theme.colors.accent}` : 
      `inset 3px 3px 6px rgba(0, 0, 0, 0.1), inset -3px -3px 6px rgba(255, 255, 255, 0.05)`
    };
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled(motion.span)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
`;

const SubmitButton = styled(motion.button)`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    transition: ${({ theme }) => theme.transitions.slow};
    z-index: -1;
    opacity: 0.8;
  }
  
  &:hover {
    color: white;
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    
    &:before {
      width: 100%;
    }
    
    svg {
      transform: translateX(3px) rotate(15deg);
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  color: #4caf50;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.colors.neumorphicInset};
  font-weight: 600;
`;

// Animated floating cursor effect for the form
const FloatingCursor = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  position: fixed;
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 9999;
  opacity: 0.7;
  filter: blur(1px);
  transform: translate(-50%, -50%);
`;

const SectionHeading = styled(motion.h2)`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  font-family: ${({ theme }) => theme.fonts.headings};
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const contactRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(contactRef, { once: true, amount: 0.2 });

  // Start animation when contact section comes into view
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInView, controls]);
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!recaptchaValue) newErrors.recaptcha = "Please verify you're human";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSending(true);
    try {
      // Replace with your actual EmailJS credentials
      await emailjs.send(
        "service_xxxx",
        "template_xxxx",
        {
          ...formData,
          "g-recaptcha-response": recaptchaValue
        },
        "user_xxxx"
      );

      setSuccessMessage("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
      setRecaptchaValue(null);
    } catch (error) {
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <ContactSection ref={contactRef}>
      <FloatingCursor 
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", damping: 10, mass: 0.05, stiffness: 100 }}
      />
      
      <SectionHeading
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
        Get in Touch
      </SectionHeading>

      <ContactContainer>
        <ContactInfo>
          <InfoTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            Contact Information
          </InfoTitle>

          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <InfoIcon>
              <FaEnvelope />
            </InfoIcon>
            <InfoText>
              <h4>Email</h4>
              <p>artur.abg1@gmail.com</p>
            </InfoText>
          </InfoItem>

          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <InfoIcon>
              <FaPhone />
            </InfoIcon>
            <InfoText>
              <h4>Phone</h4>
              <p>+37495252008</p>
            </InfoText>
          </InfoItem>

          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <InfoIcon>
              <FaMapMarkerAlt />
            </InfoIcon>
            <InfoText>
              <h4>Location</h4>
              <p>Yerevan, Armenia</p>
            </InfoText>
          </InfoItem>

          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <InfoIcon>
              <FaLinkedin />
            </InfoIcon>
            <InfoText>
              <h4>LinkedIn</h4>
              <p><a href="https://linkedin.com/in/artur-abgaryan" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>linkedin.com/in/artur-abgaryan</a></p>
            </InfoText>
          </InfoItem>

          <InfoItem
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <InfoIcon>
              <FaGithub />
            </InfoIcon>
            <InfoText>
              <h4>GitHub</h4>
              <p><a href="https://github.com/Art-abg" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>github.com/Art-abg</a></p>
            </InfoText>
          </InfoItem>
        </ContactInfo>

        <FormContainer
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ boxShadow: theme => theme.shadows.cardHover, y: -5 }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              {errors.name && (
                <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.name}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              {errors.email && (
                <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.email}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
              />
              {errors.message && (
                <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errors.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <ReCAPTCHA
              sitekey="6LcXXXXXXXXXXXXXXXXXXXXX" // Replace with your actual reCAPTCHA site key
              onChange={setRecaptchaValue}
            />
            {errors.recaptcha && (
              <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {errors.recaptcha}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? "Sending..." : "Send Message"}
              <FaPaperPlane />
            </SubmitButton>

            {successMessage && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {successMessage}
              </SuccessMessage>
            )}
          </Form>
        </FormContainer>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
