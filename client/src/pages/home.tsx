import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Smile, Plus, X, RotateCcw } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import logoPath from '@assets/1Asset 1zzz.png';
import stencilExample1 from '@assets/Captura de pantalla 2025-05-26 211021.png';
import stencilExample2 from '@assets/Captura de pantalla 2025-05-26 211801.png';
import stencilExample3 from '@assets/Captura de pantalla 2025-05-26 212441.png';
import stencilExample4 from '@assets/Captura de pantalla 2025-05-26 213208.png';
import stencilExample5 from '@assets/Captura de pantalla 2025-05-26 213749.png';
import stencilExample6 from '@assets/Captura de pantalla 2025-05-26 215000.png';

const translations = {
  es: {
    byDarwinEnriquez: "Por Darwin Enriquez",
    notifyMe: "Notifícame",
    heroTitle: "Revoluciona tus Diseños de Tatuajes",
    heroSubtitle: "Herramientas profesionales para tatuadores, impulsadas por IA",
    toolsTitle: "HERRAMIENTAS",
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
    comingSoon: "Próximamente",
    moreApps: "Más aplicaciones en camino",
    moreAppsDescription: "Estamos trabajando en nuevas herramientas innovadoras para mejorar tu flujo de trabajo",
    stayTuned: "Mantente atento",
    stayInformed: "¡Mantente Informado!",
    stayInformedDescription: "Sé el primero en saber cuando TattooStencilPro esté disponible",
    emailPlaceholder: "Tu correo electrónico",
    submit: "Enviar",
    footer: "© 2024 TattooStencilPro por Darwin Enriquez. Todos los derechos reservados.",
    developmentProgress: "Progreso del Desarrollo",
    progressMessage: "¡La revolución del diseño de tatuajes está en camino!",
    subscribeForUpdates: "Suscríbete para recibir actualizaciones sobre nuestro progreso y ser el primero en saber cuando estemos listos.",
    notifyWhenReady: "Notifícame cuando esté listo",
    sending: "Enviando...",
    subscribeSuccess: "¡Gracias por suscribirte!",
    subscribeSuccessMessage: "¡Gracias por suscribirte! Te notificaremos cuando esté disponible.",
    close: "Cerrar",
    subscribeError: "Hubo un error. Por favor, intenta de nuevo.",
    indicatesRequired: "indica que es obligatorio",
    emailAddress: "Dirección de correo electrónico",
    subscribe: "Suscribirse",
    featuredDesigns: "Diseños Destacados",
    stencilExamples: "Ejemplos de Transformación",
    stencilExampleDescription: "Ve cómo nuestro generador de stencils transforma diseños complejos en plantillas perfectas para tatuar"
  },
  en: {
    byDarwinEnriquez: "By Darwin Enriquez",
    notifyMe: "Notify me",
    heroTitle: "Revolutionize your Tattoo Designs",
    heroSubtitle: "Professional AI-powered tools for tattoo artists",
    toolsTitle: "TOOLS",
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
    comingSoon: "Coming Soon",
    moreApps: "More apps on the way",
    moreAppsDescription: "We're working on new innovative tools to enhance your workflow",
    stayTuned: "Stay tuned",
    stayInformed: "Stay Informed!",
    stayInformedDescription: "Be the first to know when TattooStencilPro is available",
    emailPlaceholder: "Your email",
    submit: "Submit",
    footer: "© 2024 TattooStencilPro by Darwin Enriquez. All rights reserved.",
    developmentProgress: "Development Progress",
    progressMessage: "The tattoo design revolution is on its way!",
    subscribeForUpdates: "Subscribe to receive updates on our progress and be the first to know when we're ready.",
    notifyWhenReady: "Notify me when it's ready",
    sending: "Sending...",
    subscribeSuccess: "Thank you for subscribing!",
    subscribeSuccessMessage: "Thank you for subscribing! We'll notify you when it's available.",
    close: "Close",
    subscribeError: "There was an error. Please try again.",
    indicatesRequired: "indicates required",
    emailAddress: "Email Address",
    subscribe: "Subscribe",
    featuredDesigns: "Featured Designs",
    stencilExamples: "Transformation Examples",
    stencilExampleDescription: "See how our stencil generator transforms complex designs into perfect tattoo templates"
  }
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

const ToolCard = ({ title, description, icon: Icon, imageUrl, videoUrl, t }: {
  title: string;
  description: string;
  icon: any;
  imageUrl?: string;
  videoUrl?: string;
  t: (key: string) => string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoUrl && videoRef.current && !isMobile) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoUrl && videoRef.current && !isMobile) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (videoUrl && videoRef.current && isMobile) {
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
            className="w-full h-full object-cover"
            preload="metadata"
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
          {isMobile && videoUrl && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-70 rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">{t(title)}</h3>
          <p className="text-gray-400 mb-4">{t(description)}</p>
        </div>
        <motion.button
          className="bg-blue-600 text-white px-4 py-2 rounded-full mt-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {t('comingSoon')}
        </motion.button>
      </div>
    </motion.div>
  );
};

const MoreAppsCard = ({ t }: { t: (key: string) => string }) => {
  return (
    <motion.div
      className="bg-gray-900 rounded-lg overflow-hidden flex flex-col border border-gray-800 p-6"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-center mb-4">
        <Plus size={48} className="text-blue-400" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white text-center">{t('moreApps')}</h3>
      <p className="text-gray-400 mb-4 text-center">{t('moreAppsDescription')}</p>
      <p className="text-blue-400 text-lg font-semibold text-center mt-auto">{t('stayTuned')}</p>
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

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      value = value?.[k];
    }
    return (value as string) || key;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-black p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img 
            src={logoPath} 
            alt="TattooStencilPro Logo" 
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-2xl font-bold">
              <span className="font-bold">Tattoo</span>
              <span className="font-light">Stencil</span>
              <span className="text-blue-400">Pro</span>
            </h1>
            <p className="text-sm text-gray-400">{t('byDarwinEnriquez')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                language === 'es' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">
              {t('heroTitle')}
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('heroSubtitle')}
          </motion.p>

          <div className="max-w-2xl mx-auto mb-16">
            <ProgressMeter t={t} openModal={openModal} />
          </div>

          <div className="max-w-7xl mx-auto">
            <motion.h3 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-blue-400">{t('toolsTitle')}</span>
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <ToolCard
                title="stencilGenerator.title"
                description="stencilGenerator.description"
                icon={Wand2}
                videoUrl="https://inknationstudio.com/wp-content/uploads/2024/09/video021.mp4"
                imageUrl="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                t={t}
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

              <MoreAppsCard t={t} />
            </div>
          </div>
          
          <motion.button 
            onClick={openModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('notifyMe')}
          </motion.button>
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
          <p className="text-sm">
            Contact: <a href="mailto:contact@tattoostencilpro.app" className="text-blue-400 hover:text-blue-300 transition-colors">contact@tattoostencilpro.app</a>
          </p>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SimpleForm t={t} />
      </Modal>
    </div>
  );
}