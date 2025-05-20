import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaLinkedin, 
  FaGithub,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa'; // Added missing icons

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const ContactSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    left: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.primary}05, transparent 60%);
    z-index: 0;
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    right: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, ${({ theme }) => theme.colors.accent}05, transparent 60%);
    z-index: 0;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.neumorphicLight};
  overflow: hidden;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 700px;
  }
  
  @media (max-width: 768px) {
    gap: 2.5rem;
    border-radius: 20px;
  }
`;

const ContactInfo = styled.div`
  padding: 4rem 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  
  @media (max-width: 1024px) {
    padding: 3rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem;
  }
`;

const SectionTitle = styled(motion.h1)`
  font-size: 2.75rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.headings};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.2;
  position: relative;
  display: inline-block;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
      height: 8px;
      background: ${({ theme }) => `${theme.colors.primary}30`};
      z-index: -1;
      border-radius: 4px;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 90%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const ContactInfoGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const InfoItem = styled(motion.a)`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.neumorphicLight};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}10`};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.neumorphicLightHover};
    border-color: ${({ theme }) => `${theme.colors.primary}20`};
  }
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 1.5rem;
  font-size: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.neumorphicLight};
  transition: all 0.3s ease;
  
  ${InfoItem}:hover & {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.05);
  }
  
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
    margin-right: 1rem;
    font-size: 1.1rem;
  }
`;

const InfoText = styled.div`
  h4 {
    margin: 0 0 0.25rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s ease;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.3s ease;
  }
  
  ${InfoItem}:hover & h4 {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 480px) {
    h4 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const FormContainer = styled(motion.div)`
  padding: 4rem 3rem;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors.primary}, 
      ${({ theme }) => theme.colors.accent}
    );
  }
  
  @media (max-width: 1024px) {
    padding: 3rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  
  ${({ $hasError }) => $hasError && `
    color: #ff4d4f;
  `}
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  box-shadow: ${({ theme, $hasError }) => 
    $hasError 
      ? `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px #ff4d4f` 
      : theme.shadows.neumorphicLight
  };
  transition: all 0.3s ease;
  -webkit-appearance: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary}80;
  }
  
  &:focus {
    outline: none;
    box-shadow: ${({ theme, $hasError }) => 
      $hasError 
        ? `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px #ff4d4f`
        : `inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.2), 0 0 0 2px ${theme.colors.primary}80`
    };
  }
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
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  min-height: 150px;
  resize: vertical;
  box-shadow: ${({ theme, $hasError }) => 
    $hasError 
      ? `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px #ff4d4f` 
      : theme.shadows.neumorphicLight
  };
  transition: all 0.3s ease;
  -webkit-appearance: none;
  line-height: 1.6;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary}80;
  }
  
  &:focus {
    outline: none;
    box-shadow: ${({ theme, $hasError }) => 
      $hasError 
        ? `inset 4px 4px 8px rgba(255, 77, 77, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.05), 0 0 0 2px #ff4d4f`
        : `inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.2), 0 0 0 2px ${theme.colors.primary}80`
    };
  }
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.card};
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled(motion.span)`
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  svg {
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  a {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.25rem;
    box-shadow: ${({ theme }) => theme.shadows.neumorphicLight};
    transition: all 0.3s ease;
    
    &:hover {
      color: white;
      background: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.shadows.neumorphicLightHover};
    }
    
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(61, 213, 152, 0.1);
  border: 1px solid rgba(61, 213, 152, 0.2);
  color: #3DD598;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  
  svg {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
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

// Add missing styled components
const InfoTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  
  const formRef = useRef();
  const contactRef = useRef(null);
  const recaptchaRef = useRef();
  const controls = useAnimation();
  const isInView = useInView(contactRef, { once: true, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Add reCAPTCHA site key (replace with your actual key)
  const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LcXXXXXXXXXXXXXXXXXXXXX';
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInView, controls]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!recaptchaValue) newErrors.recaptcha = "Please complete the reCAPTCHA";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSending(true);

    try {
      // Prepare the form data
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Message from Portfolio',
        message: formData.message,
        'g-recaptcha-response': recaptchaValue
      };

      // Send the email using EmailJS
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key'
      );

      // Reset form state on success
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSuccessMessage("Your message has been sent successfully! I'll get back to you soon.");

      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 10000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
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

            <div style={{ margin: '1.5rem 0' }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(value) => setRecaptchaValue(value)}
                onExpired={() => setRecaptchaValue(null)}
                onErrored={() => setRecaptchaValue(null)}
                theme={document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'}
              />
              {errors.recaptcha && (
                <ErrorMessage 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '0.5rem' }}
                >
                  <FaExclamationCircle /> {errors.recaptcha}
                </ErrorMessage>
              )}
            </div>


            <SubmitButton
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? "Sending..." : "Send Message"}
              <FaPaperPlane />
            </SubmitButton>

            {errors.submit && (
              <ErrorMessage 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '1rem' }}
              >
                <FaExclamationCircle /> {errors.submit}
              </ErrorMessage>
            )}
            {successMessage && (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ marginTop: '1rem' }}
              >
                <FaCheckCircle style={{ marginRight: '0.5rem' }} />
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
