import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Smile, X, RotateCcw, Sparkles, Menu, ChevronDown, ExternalLink, Palette, User, LogOut } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { LoginModal } from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import logoPath from '@assets/1Asset 1zzz.png';
import stencilExample1 from '@assets/Captura de pantalla 2025-05-26 211021.png';
import stencilExample2 from '@assets/Captura de pantalla 2025-05-26 211801.png';
import stencilExample3 from '@assets/Captura de pantalla 2025-05-26 212441.png';
import stencilExample4 from '@assets/Captura de pantalla 2025-05-26 213208.png';
import stencilExample5 from '@assets/Captura de pantalla 2025-05-26 213749.png';
import stencilExample6 from '@assets/Captura de pantalla 2025-05-26 215000.png';
import medusaOriginal from '@assets/DALL·E 2024-08-29 12.18.53 - A 3D illustration of Medusa in a medium grey tone, very detailed and realistic, looking forward with a serious and intense expression. Her head is sur.webp';
import medusaStencil from '@assets/tattoostencilpro_00001_ (13).png';
import roseTattoo from '@assets/generated_images/rose_tattoo_stencil_01ea124b.png';
import eagleTattoo from '@assets/generated_images/eagle_tattoo_stencil_4c9fc26a.png';
import dragonTattoo from '@assets/generated_images/dragon_tattoo_stencil_2da98a82.png';
import mandalaTattoo from '@assets/generated_images/mandala_tattoo_stencil_10675b74.png';
import aiEditorImage from '@assets/Ai editor_1755352512747.webp';

const translations = {
  es: {
    byDarwinEnriquez: "Por Darwin Enriquez",
    notifyMe: "Notifícame",
    heroTitle: "Revoluciona tus Diseños de Tatuajes",
    heroSubtitle: "Herramientas profesionales para tatuadores, impulsadas por IA",
    toolsTitle: "HERRAMIENTAS",
    transformYourIdeas: "Transforma tus ideas en arte profesional",
    professionalTools: "Herramientas avanzadas para artistas del tatuaje",
    
    // Navigation menu
    nav: {
      product: "Tools",
      stencilConverter: "Convertir a Stencil",
      aiImageEditor: "Editor de imágenes (IA)",
      howItWorks: "Cómo funciona",
      security: "Seguridad & Privacidad",
      pricing: "Planes y Precios",
      tutorials: "Tutoriales & Guías",
      gallery: "Galería",
      blog: "Blog",
      support: "Soporte",
      faq: "FAQ",
      contact: "Contacto",

    },
    stencilGenerator: {
      title: "Generador de Stencils",
      description: "Convierte diseños en stencils estilo hecho a mano"
    },
    expressionModifier: {
      title: "Modificador de Expresiones",
      description: "Ajusta expresiones faciales y posiciones"
    },
    angleRotationModifier: {
      title: "Modificador de Ángulo y Rotación",
      description: "Transforma la perspectiva de tus diseños 2D con ajustes precisos de ángulo y rotación"
    },
    aiImageEditor: {
      title: "Editor de Imágenes AI",
      description: "Generador avanzado de tatuajes con inteligencia artificial"
    },
    comingSoon: "Próximamente",

    stayInformed: "¡Mantente Informado!",
    stayInformedDescription: "Sé el primero en saber cuando TattooStencilPro esté disponible",
    emailPlaceholder: "Tu correo electrónico",
    submit: "Enviar",
    footer: "© 2024 TattooStencilPro por Darwin Enriquez. Todos los derechos reservados.",

    featuredDesigns: "Diseños Destacados",
    stencilExamples: "Portafolio Profesional",
    stencilExampleDescription: "Ve cómo nuestro generador de stencils transforma diseños complejos en plantillas perfectas para tatuar",
    tryNow: "Probar Ahora"
  },
  en: {
    byDarwinEnriquez: "By Darwin Enriquez",
    notifyMe: "Notify me",
    heroTitle: "Revolutionize your Tattoo Designs",
    heroSubtitle: "Professional AI-powered tools for tattoo artists",
    toolsTitle: "TOOLS",
    transformYourIdeas: "Transform your ideas into professional art",
    professionalTools: "Advanced tools for tattoo artists",
    
    // Navigation menu
    nav: {
      product: "Tools",
      stencilConverter: "Convert to Stencil",
      aiImageEditor: "AI Image Editor",
      howItWorks: "How it works",
      security: "Security & Privacy",
      pricing: "Plans & Pricing",
      tutorials: "Tutorials & Guides",
      gallery: "Gallery",
      blog: "Blog",
      support: "Support",
      faq: "FAQ",
      contact: "Contact",

    },
    stencilGenerator: {
      title: "Stencil Generator",
      description: "Convert designs into hand-drawn style stencils"
    },
    expressionModifier: {
      title: "Expression Modifier",
      description: "Adjust facial expressions and positions"
    },
    angleRotationModifier: {
      title: "Angle and Rotation Modifier",
      description: "Transform the perspective of your 2D designs with precise angle and rotation adjustments"
    },
    aiImageEditor: {
      title: "AI Image Editor",
      description: "Advanced AI-powered tattoo generator and image editor"
    },
    comingSoon: "Coming Soon",

    stayInformed: "Stay Informed!",
    stayInformedDescription: "Be the first to know when TattooStencilPro is available",
    emailPlaceholder: "Your email",
    submit: "Submit",
    footer: "© 2024 TattooStencilPro by Darwin Enriquez. All rights reserved.",

    featuredDesigns: "Featured Designs",
    stencilExamples: "Portfolio Showcase",
    stencilExampleDescription: "See how our stencil generator transforms complex designs into perfect tattoo templates",
    tryNow: "Try Now"
  }
};

const BeforeAfterSlider = ({ beforeImage, afterImage, t }: { 
  beforeImage: string; 
  afterImage: string; 
  t: (key: string) => string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalTouchEnd = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        updatePosition(e.clientX);
      }
    };
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
        updatePosition(e.touches[0].clientX);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 overflow-hidden rounded-lg shadow-2xl select-none cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Before image */}
      <img
        src={beforeImage}
        alt="Original design"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      
      {/* After image with clip */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={afterImage}
          alt="Stencil result"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Slider line and handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-blue-500 hover:scale-110 transition-transform duration-200">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-medium">
        Stencil
      </div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm font-medium">
        Original
      </div>
    </div>
  );
};

const ProgressMeter = ({ t, openModal }: { t: (key: string) => string; openModal: () => void }) => {
  return (
    <div className="my-12 text-center">
      <h3 className="text-2xl font-bold mb-4">{t('developmentProgress')}</h3>
      <div className="w-full bg-gray-700 rounded-full h-6 mb-4 overflow-hidden">
        <motion.div 
          className="bg-blue-600 h-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear"
          }}
        />
      </div>
      <p className="text-lg">{t('progressMessage')}</p>
      <p className="mt-4 text-gray-400">{t('subscribeForUpdates')}</p>
      <button
        onClick={openModal}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
      >
        {t('notifyWhenReady')}
      </button>
    </div>
  );
};

const ToolCard = ({ title, description, icon: Icon, imageUrl, videoUrl, t, href, isActive = false, onTryNow }: {
  title: string;
  description: string;
  icon: any;
  imageUrl?: string;
  videoUrl?: string;
  t: (key: string) => string;
  href?: string;
  isActive?: boolean;
  onTryNow?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoUrl && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay prevented:', error);
        }
      };
      playVideo();
    }
  }, [videoUrl]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoUrl && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoUrl && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (videoUrl && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-lg overflow-hidden flex flex-col border border-gray-800"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        {videoUrl ? (
          <video 
            ref={videoRef}
            src={videoUrl}
            loop
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover"
            preload="auto"
            poster={imageUrl}
          />
        ) : (
          <img 
            src={imageUrl}
            alt={t(title)}
            className="w-full h-full object-cover"
          />
        )}
        <div className={`absolute inset-0 bg-black ${isHovered || isPlaying ? 'bg-opacity-20' : 'bg-opacity-50'} flex items-center justify-center transition-opacity duration-300`}>
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={48} className={`text-blue-400 ${isHovered || isPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
          </motion.div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">{t(title)}</h3>
          <p className="text-gray-400 mb-4">{t(description)}</p>
        </div>
        {isActive && (href || onTryNow) ? (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              if (onTryNow) {
                onTryNow();
              } else if (href) {
                window.open(href, '_blank');
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mt-auto text-center transition-colors inline-block w-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {t('tryNow') || 'Try Now'}
          </motion.button>
        ) : (
          <motion.button
            className="bg-gray-600 text-white px-4 py-2 rounded-full mt-auto cursor-not-allowed"
            disabled
          >
            {t('comingSoon')}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};



const SimpleForm = ({ t }: { t: (key: string) => string }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit to MailChimp in the background
      const formData = new FormData();
      formData.append('EMAIL', email);
      formData.append('b_88c7d7ba6a43db8f37cac54c7_24acc3709e', '');
      
      fetch('https://build.us14.list-manage.com/subscribe/post?u=88c7d7ba6a43db8f37cac54c7&id=24acc3709e&f_id=001694e1f0', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      // Show success immediately
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitted(true); // Still show success since we can't check response in no-cors mode
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gray-900 p-8 rounded-lg max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{t('subscribeSuccess')}</h3>
          <p className="text-gray-400">{t('subscribeSuccessMessage')}</p>
        </div>
        <motion.button
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('close')}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center text-white">{t('stayInformed')}</h3>
      <p className="text-gray-400 mb-6 text-center">{t('stayInformedDescription')}</p>
      <form onSubmit={handleSubmit}>
        <div className="indicates-required mb-2">
          <span className="asterisk text-red-500">*</span>{' '}
          <span className="text-gray-400 text-sm">{t('indicatesRequired')}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            {t('emailAddress')} <span className="asterisk text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
        >
          {isSubmitting ? t('sending') : t('subscribe')}
        </motion.button>
      </form>
    </div>
  );
};

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);
  
  const { user, session, signOut } = useAuth();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    return (value as string) || key;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if click is outside dropdown container (but not on the button itself)
      const dropdownContainer = target.closest('.dropdown-container');
      const dropdownButton = target.closest('.dropdown-button');
      
      if (!dropdownContainer && !dropdownButton) {
        setIsProductDropdownOpen(false);
      }
      
      // Check mobile menu
      const mobileMenuContainer = target.closest('.mobile-menu-container');
      const mobileMenuButton = target.closest('.mobile-menu-button');
      
      if (!mobileMenuContainer && !mobileMenuButton) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isProductDropdownOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProductDropdownOpen, isMobileMenuOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle tool redirect with authentication
  const handleToolRedirect = (toolUrl: string) => {
    if (session) {
      // User is authenticated, redirect with tokens
      const url = new URL(toolUrl);
      url.hash = `access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
      window.open(url.toString(), '_blank');
    } else {
      // User not authenticated, show login modal
      setPendingRedirect(toolUrl);
      setIsLoginModalOpen(true);
    }
  };

  // Handle successful authentication
  useEffect(() => {
    if (session && pendingRedirect) {
      // User just logged in and has a pending redirect
      const url = new URL(pendingRedirect);
      url.hash = `access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
      window.open(url.toString(), '_blank');
      setPendingRedirect(null);
      setIsLoginModalOpen(false);
    }
  }, [session, pendingRedirect]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-gradient-to-b from-gray-900 via-gray-900/95 to-black/90 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="TattooStencilPro Logo" 
                className="h-12 w-12"
              />
              <div>
                <h1 className="text-xl font-bold">
                  <span className="font-bold">Tattoo</span>
                  <span className="font-light">Stencil</span>
                  <span className="text-blue-400">Pro</span>
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">{t('byDarwinEnriquez')}</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Tools Dropdown */}
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                  className="dropdown-button flex items-center space-x-2 text-gray-300 font-medium px-4 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200 group"
                >
                  <span className="text-sm tracking-wide">Tools</span>
                  <ChevronDown size={16} className={`transition-all duration-200 text-gray-400 group-hover:text-blue-400 ${isProductDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                {isProductDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <a 
                      href="https://ink-stencil-darwintattoo1.replit.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-4 text-gray-300 hover:text-white hover:bg-blue-600/10 transition-all duration-200 border-b border-gray-800 group"
                    >
                      <div className="flex items-center gap-3">
                        <Palette size={18} className="text-gray-400" />
                        <div>
                          <div className="font-medium text-sm">{t('nav.stencilConverter')}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Convert images to stencils</div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a 
                      href="https://darwinfluxkontext.replit.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-5 py-4 text-gray-300 hover:text-white hover:bg-blue-600/10 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Wand2 size={18} className="text-gray-400" />
                        <div>
                          <div className="font-medium text-sm">{t('nav.aiImageEditor')}</div>
                          <div className="text-xs text-gray-500 mt-0.5">AI-powered design tools</div>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </a>
                  </motion.div>
                )}
              </div>
              
              <a href="#pricing" className="relative text-gray-300 font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200 tracking-wide group">
                <span>{t('nav.pricing')}</span>
                <span className="absolute bottom-1 left-4 right-4 h-px bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>

              {/* User Account Section */}
              {user ? (
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
                >
                  Sign In
                </button>
              )}
            </nav>
            
            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"></div>
                <div className="relative flex">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      language === 'en' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('es')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      language === 'es' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/25' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button lg:hidden p-2.5 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden mobile-menu-container"
          >
            <div className="px-6 py-4 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-lg border-t border-gray-800/50">
              <div className="space-y-2">
                <div className="pb-2 mb-2 border-b border-gray-800/50">
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3 flex items-center">
                    <span className="text-blue-400">Tools</span>
                  </h4>
                  <div className="space-y-1">
                    <a 
                      href="https://ink-stencil-darwintattoo1.replit.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Palette size={18} className="text-gray-400" />
                        <span className="font-medium text-sm">{t('nav.stencilConverter')}</span>
                      </div>
                      <ExternalLink size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a 
                      href="https://darwinfluxkontext.replit.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <Wand2 size={18} className="text-gray-400" />
                        <span className="font-medium text-sm">{t('nav.aiImageEditor')}</span>
                      </div>
                      <ExternalLink size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </a>
                  </div>
                </div>
                
                <a href="#pricing" className="block p-3 rounded-lg text-gray-300 font-medium text-sm hover:text-white hover:bg-white/5 transition-all duration-200">{t('nav.pricing')}</a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <section className="pt-10 pb-6 px-4 overflow-visible">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">
              {t('heroTitle')}
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* Video Container with Floating Images */}
          <motion.div
            className="max-w-3xl mx-auto mb-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Floating Image Top Left */}
            <motion.div
              className="absolute -top-4 -left-20 w-28 h-28 rounded-xl overflow-hidden shadow-lg z-10 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={roseTattoo} 
                alt="Rose tattoo stencil"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Image Bottom Left */}
            <motion.div
              className="absolute -bottom-4 -left-12 w-24 h-24 rounded-xl overflow-hidden shadow-lg z-10 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={eagleTattoo} 
                alt="Eagle tattoo stencil"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Images Right Side */}
            <motion.div
              className="absolute top-8 -right-20 hidden lg:flex flex-col gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.div 
                className="w-24 h-28 rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={dragonTattoo} 
                  alt="Dragon tattoo stencil"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="w-24 h-28 rounded-xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={mandalaTattoo} 
                  alt="Mandala tattoo stencil"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Main Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-2xl"
                poster={medusaStencil}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9606-7wXjUza5iHfO4woAkktUJemkhAYzvt.MP4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              

            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-1 px-4">
        <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-400 mb-2 text-lg">
                {t('transformYourIdeas')}
              </p>
              <h3 className="text-3xl font-bold">
                <span className="text-blue-400">{t('toolsTitle')}</span>
              </h3>
              <p className="text-gray-500 mt-2 text-sm">
                {t('professionalTools')}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <ToolCard
                title="stencilGenerator.title"
                description="stencilGenerator.description"
                icon={Wand2}
                videoUrl="https://inknationstudio.com/wp-content/uploads/2024/09/video021.mp4"
                imageUrl="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                t={t}
                onTryNow={() => handleToolRedirect("https://ink-stencil-darwintattoo1.replit.app/")}
                isActive={true}
              />

              <ToolCard
                title="aiImageEditor.title"
                description="aiImageEditor.description"
                icon={Sparkles}
                imageUrl={aiEditorImage}
                t={t}
                onTryNow={() => handleToolRedirect("https://darwinfluxkontext.replit.app/")}
                isActive={true}
              />

              <ToolCard
                title="expressionModifier.title"
                description="expressionModifier.description"
                icon={Smile}
                videoUrl="https://inknationstudio.com/wp-content/uploads/2024/09/video-expresiones.mp4"
                imageUrl="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                t={t}
              />

              <ToolCard
                title="angleRotationModifier.title"
                description="angleRotationModifier.description"
                icon={RotateCcw}
                videoUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9606-7wXjUza5iHfO4woAkktUJemkhAYzvt.MP4"
                imageUrl="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                t={t}
              />


            </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">{t('stencilExamples')}</h3>
          <p className="text-gray-400 mb-12">{t('stencilExampleDescription')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { src: stencilExample1, alt: "Medusa design transformation" },
              { src: stencilExample2, alt: "Portrait design transformation" },
              { src: stencilExample3, alt: "Lion design transformation" },
              { src: stencilExample4, alt: "Raven design transformation" },
              { src: stencilExample5, alt: "Angel design transformation" },
              { src: stencilExample6, alt: "Demon mask design transformation" }
            ].map((example, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img 
                  src={example.src}
                  alt={example.alt}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 text-center text-gray-500 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <p className="mb-2">{t('footer')}</p>
          <p className="text-sm mb-4">
            Contact: <a href="mailto:contact@tattoostencilpro.app" className="text-blue-400 hover:text-blue-300 transition-colors">contact@tattoostencilpro.app</a>
          </p>
          
          {/* Copyright Notice */}
          <div className="border-t border-gray-800 pt-4 mt-4">
            <p className="text-xs text-gray-600 mb-2">
              © {new Date().getFullYear()} TattooStencilPro. All rights reserved.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              This application, including its design, code, algorithms, and intellectual property, is protected by copyright law. 
              Unauthorized reproduction, distribution, or reverse engineering is strictly prohibited.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Patent Pending • Proprietary Technology • Trademark Protected
            </p>
            <p className="text-xs text-gray-500 mt-3">
              <a href="/terms-of-service" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                Terms of Service
              </a> • 
              <a href="mailto:contact@tattoostencilpro.app?subject=Legal Notice - TattooStencilPro&body=Dear Legal Department,%0A%0APlease describe your legal inquiry below:%0A%0A" className="text-blue-400 hover:text-blue-300 transition-colors underline ml-1">
                Legal Notice
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SimpleForm t={t} />
      </Modal>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        redirectTo={pendingRedirect || undefined}
      />
    </div>
  );
}