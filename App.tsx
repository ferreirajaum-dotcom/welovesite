/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Mail, ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import { Artist } from './types';

// --- Animation Constants & Variants (Optimized for 60FPS Fluidity) ---
const TRANSITION_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]; 
const ANIMATION_DURATION = 0.8; // Slightly faster for snappier feel

const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, // Reduced further for smoother mobile performance
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_DURATION, 
      ease: TRANSITION_EASE 
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.05
    }
  }
};

const serviceEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, 
      duration: 0.8,
      ease: TRANSITION_EASE
    }
  })
};

const serviceHoverVariants: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -5, // Reduced movement
    scale: 1.01, 
    boxShadow: "0 20px 25px -12px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
  tap: { scale: 0.95 }
};

// --- Data Constants ---
const CLIENTS: Artist[] = [
  { id: '1', name: 'Trisoft', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/PqDDB7Bg/cliente-logo-1.png', description: 'Soluções Acústicas Sustentáveis' },
  { id: '2', name: 'Clínica ISTO', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/zfhh9Qsq/cliente-logo-2.png', description: 'Saúde e Bem-estar' },
  { id: '3', name: 'Priscila Mattos Venturi', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/q7KK9FPJ/cliente-logo-3.png', description: 'Arquitetura e Interiores' },
  { id: '4', name: 'Anexo', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/3wGGPqsK/cliente-logo-4.png', description: 'Instituto de Tecnologia' },
  { id: '5', name: 'NRC Arq Design', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/3wGGPqsJ/cliente-logo-5.png', description: 'Arq . Design' },
  { id: '6', name: 'CIDAD', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/5tzzZrht/cliente-logo-6.png', description: 'Centro de Informação' },
  { id: '7', name: 'Croni', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/PqDDB7gx/cliente-logo-7.png', description: 'Store Makers' },
  { id: '8', name: 'RetailBox', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/6QZZDPkq/cliente-logo-8.png', description: 'Projetos para varejo' },
  { id: '9', name: 'Alupoli', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/W4ZZQyBt/cliente-logo-9.png', description: 'Coberturas e Fachadas' },
  { id: '10', name: 'Cilene Lupi', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/bvnnK572/cliente-logo-10.png', description: 'Arq + Design' },
  { id: '11', name: 'RLX Rollox', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/85VvDHGP/cliente-logo-11.png', description: 'Home Decor' },
  { id: '12', name: 'Escola de Empreendedores', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/LsPPrWcg/cliente-logo-12.png', description: 'Educação Empreendedora' },
  { id: '13', name: 'Angelina Bunselmeyer', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/W3PZjnV1/cliente-logo-13.png', description: 'Arquitetura' },
  { id: '14', name: 'NNe + Senac', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/63NZw0Kq/cliente-logo-14.png', description: 'Núcleo Nordeste' },
  { id: '15', name: 'Clichê 40', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/Y9wFk37h/cliente-logo-15.png', description: 'Papelaria de aconchego' },
  { id: '16', name: 'Spazio Arquitetura', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/Ssp9qr4z/cliente-logo-16.png', description: 'Arquitetura' },
  { id: '17', name: 'IM Sound', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/rmL4cJTD/cliente-logo-17.png', description: 'Áudio Profissional' },
  { id: '18', name: 'UpSoul', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/C1V8YN0s/cliente-logo-18.png', description: 'Desenvolvimento Pessoal' },
  { id: '19', name: 'Simcauto', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/50Mz13Jm/cliente-logo-19.png', description: 'Automotivo' },
  { id: '20', name: 'Adriana Farias', genre: 'Parceiro', day: '2025', image: 'https://i.postimg.cc/kG2qp0Z3/cliente-logo-22.png', description: 'Interiores' },
];

const SERVICES = [
  {
    id: 1,
    category: "SERVIÇO",
    title: "Videomaker",
    description: "Profissionais (individuais ou empresas)\nPúblico em Geral (registo de eventos privados)",
    fullDescription: "Produzimos vídeos profissionais para empresas, profissionais individuais e público em geral. Seja para registar eventos privados, criar conteúdo institucional ou promover a sua marca, cuidamos de cada detalhe: captação de imagens, edição, roteiro, direção e estratégia. Transformamos momentos em histórias que conectam e encantam.",
    ctaText: "Entre em Contato",
  },
  {
    id: 2,
    category: "SERVIÇO",
    title: "Gestão de Redes Sociais",
    description: "Instagram, Facebook, Youtube e Linkedin",
    fullDescription: "Gerimos as suas redes sociais de forma estratégica e criativa. Atuamos no Instagram, Facebook, Youtube e Linkedin, criando conteúdo relevante, planejando publicações, interagindo com a audiência e analisando métricas para fortalecer a presença digital da sua marca.",
    ctaText: "Solicite um Orçamento",
  },
  {
    id: 3,
    category: "EDUCAÇÃO",
    title: "Formação em Vídeos com Telemóvel",
    description: "Todo o tipo de público. Técnicas aliadas à sensibilidade para gravação e edição.",
    fullDescription: "Aprenda a criar vídeos profissionais usando apenas o seu telemóvel. Formação prática para todo o tipo de público, combinando técnicas de gravação, edição e sensibilidade artística. Ideal para quem quer produzir conteúdo de qualidade sem equipamentos caros.",
    ctaText: "Saiba Mais sobre a Formação",
  },
  {
    id: 4,
    category: "CONSULTORIA",
    title: "Consultoria Online: Da Criação do Vídeo ao Post",
    description: "Profissionais de qualquer área que querem gravar conteúdo em vídeo...",
    fullDescription: "Consultoria personalizada para profissionais de qualquer área que desejam criar conteúdo em vídeo, mas não sabem por onde começar. Orientamos sobre uso de gadgets, últimas novidades do Instagram, técnicas de gravação, edição e estratégias de publicação. Tudo online, no seu ritmo.",
    ctaText: "Agende sua Consultoria",
  }
];

const NAV_ITEMS = [
  { label: 'Quem somos', id: 'experience' },
  { label: 'Clientes', id: 'clientes' },
  { label: 'Garanta', id: 'tickets' }
];

const UNIQUE_ITEMS = [
  {
    title: "Produção de conteúdos em vídeo com telemóvel que contam a sua história com emoção e impacto",
    answer: "Utilizamos técnicas profissionais de captação e edição mobile, criando vídeos autênticos que conectam emocionalmente com o seu público e fortalecem a identidade da sua marca."
  },
  {
    title: "Estratégia digital adaptada à identidade e aos objetivos da sua marca",
    answer: "Desenvolvemos um plano personalizado de conteúdo e presença digital, alinhado aos valores da sua marca e focado em resultados mensuráveis nas redes sociais."
  },
  {
    title: "Há SEMPRE um plano exclusivo feito à sua medida.",
    answer: "Cada projeto é único. Analisamos o seu negócio, público-alvo e objetivos para criar uma estratégia 100% personalizada que atenda às suas necessidades específicas."
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  
  // Clients Pagination Logic with Responsive detection
  const [clientPage, setClientPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset page when switching modes to avoid index issues
  useEffect(() => {
    setClientPage(0);
  }, [isMobile]);

  // Dynamic items per page: 6 for mobile (2cols * 3rows), 15 for desktop (5cols * 3rows)
  const clientsPerPage = isMobile ? 6 : 15;
  const totalClientPages = Math.ceil(CLIENTS.length / clientsPerPage);

  const handlePrevClient = () => {
    setClientPage((prev) => (prev - 1 + totalClientPages) % totalClientPages);
  };

  const handleNextClient = () => {
    setClientPage((prev) => (prev + 1) % totalClientPages);
  };

  const visibleClients = CLIENTS.slice(
    clientPage * clientsPerPage,
    (clientPage + 1) * clientsPerPage
  );

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="relative min-h-screen text-[#213D7A] selection:bg-[#E2BA3D] selection:text-[#213D7A] cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.0, ease: TRANSITION_EASE }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 bg-white/80 backdrop-blur-md border-b border-[#213D7A]/10"
      >
        <div className="z-50 cursor-default">
           <img 
             src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" 
             alt="WEELOVE" 
             className="h-8 md:h-10 w-auto object-contain"
           />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {NAV_ITEMS.map((item) => (
            <motion.button 
              key={item.label} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#961D1D] transition-colors text-[#213D7A] cursor-pointer bg-transparent border-none relative group"
              data-hover="true"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}
        </div>
        <motion.button 
          onClick={() => scrollToSection('tickets')}
          className="hidden md:inline-block border border-[#213D7A] px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#213D7A] hover:text-white transition-all duration-300 text-[#213D7A] cursor-pointer bg-transparent rounded-full"
          data-hover="true"
          variants={buttonHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
        >
          Contacto
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#213D7A] z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X color="white" /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#213D7A]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden text-white"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="text-4xl font-heading font-bold hover:text-[#E2BA3D] transition-colors uppercase bg-transparent border-none text-white"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('tickets')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-[#213D7A]"
            >
              Contacto
            </button>
            
            <div className="absolute bottom-10 flex gap-6">
               <a href="https://x.com/GoogleAIStudio" className="text-white/50 hover:text-white transition-colors">Twitter</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20 will-change-transform"
        >
          {/* Main Title */}
          <motion.div 
            className="relative w-full flex justify-center items-center mt-20 md:mt-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: TRANSITION_EASE, delay: 0.2 }}
          >
            <GradientText 
              text="WEELOVE" 
              as="h1" 
              className="text-[15vw] md:text-[14vw] leading-[0.9] font-black tracking-tighter text-center text-[#213D7A]" 
            />
          </motion.div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.4, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#213D7A]/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.0, ease: TRANSITION_EASE }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-[#213D7A]/80 leading-relaxed px-4"
          >
            Social Media
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-[#213D7A] text-white z-20 overflow-hidden border-y-4 border-[#E2BA3D] shadow-lg">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => scrollToSection('services')}
                    className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4 bg-transparent border-none cursor-pointer hover:text-[#E2BA3D] transition-colors"
                  >
                    WEELOVE WORKSHOP 2026 <span className="text-[#E2BA3D] text-2xl md:text-4xl">●</span> 
                  </button>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10 py-20 bg-white border-b border-[#213D7A]/10">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={serviceEntranceVariants}
                className="h-full"
              >
                <motion.div
                  className="group relative flex flex-col justify-between bg-gradient-to-br from-[#566B99] to-[#213D7A] rounded-2xl shadow-xl transition-all duration-300 p-8 overflow-hidden h-full min-h-[300px] border border-transparent will-change-transform"
                  initial="rest"
                  whileHover="hover"
                  variants={serviceHoverVariants}
                >
                  <motion.div 
                    className="absolute inset-0 border-2 border-[#E2BA3D]/0 rounded-2xl pointer-events-none"
                    variants={{ hover: { borderColor: "rgba(226, 186, 61, 0.3)" } }} 
                  />

                  {/* Subtle Decorative Overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                  
                  <motion.div 
                    className="relative z-10"
                    variants={{ hover: { y: -5 } }}
                    transition={{ duration: 0.3 }}
                  >
                     {/* Category Badge */}
                     <span className="inline-block bg-[#E2BA3D] text-[#213D7A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 shadow-sm">
                        {service.category}
                     </span>

                     {/* Title */}
                     <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-4 leading-tight">
                       {service.title}
                     </h3>
                     
                     {/* Short Description */}
                     <p className="text-white/85 text-sm font-light leading-relaxed whitespace-pre-line line-clamp-3">
                       {service.description}
                     </p>
                  </motion.div>
                  
                  {/* Action Button */}
                  <motion.div 
                    className="relative z-10 mt-8"
                    variants={{ hover: { y: -5 } }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                     <button 
                       onClick={() => setSelectedService(service)}
                       className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white border border-white/30 px-6 py-2 rounded-full hover:bg-[#E2BA3D] hover:text-[#213D7A] hover:border-[#E2BA3D] transition-all duration-300 group-hover:pl-8"
                       data-hover="true"
                     >
                       Saiba mais
                       <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-300" />
                     </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / QUEM SOMOS SECTION */}
      <section id="experience" className="relative z-10 py-20 md:py-32 bg-white border-t border-[#213D7A]/10 overflow-hidden">
        
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative">
          
          {/* Intro Text */}
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
             <h2 className="text-4xl md:text-7xl font-heading font-bold mb-4 leading-tight text-[#213D7A]">
                Quem <br/> <GradientText text="SOMOS" className="text-5xl md:text-8xl" />
              </h2>
              <motion.h3 
                variants={fadeInUp}
                className="text-2xl md:text-3xl font-heading font-bold text-[#E2BA3D] mb-12 uppercase tracking-wide"
              >
                Munik Rangel
              </motion.h3>

              <motion.div 
                variants={fadeInUp}
                className="text-base md:text-xl text-[#213D7A]/80 font-light leading-relaxed text-left mx-auto max-w-3xl"
              >
                <ul className="space-y-4 list-disc pl-5 marker:text-[#E2BA3D]">
                  <li>Estratega de marketing brasileira, há 27 anos.</li>
                  <li>Certificada pela New York Film Academy.</li>
                  <li>Experiência em grandes empresas como TV Globo, MTV, IBM, BASF e DELL.</li>
                  <li>Head de Customer Experience do app My Heineken.</li>
                  <li>Nos últimos anos, dedica-se ao marketing digital, gestão de redes sociais e produção de conteúdo em vídeo.</li>
                  <li>Ajuda marcas a fortalecer sua presença digital e aumentar sua percepção de valor.</li>
                  <li>Na Europa, tem trabalhado com diferentes nichos como imobiliário, terapias, estética, restauração e medicina integrativa.</li>
                  <li>Colaborou com duas revistas e realizou coberturas de eventos em Lisboa, Paris e na Semana de Design de Milão.</li>
                </ul>
              </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CLIENTS SECTION - Compact version */}
      <section id="clientes" className="relative z-10 py-10 md:py-16 bg-[#213D7A] w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative">
          
          {/* Header */}
          <motion.div 
            className="flex flex-col items-center justify-center mb-10 md:mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
             {/* Thin Line above title */}
             <div className="w-24 h-[1px] bg-white mb-6"></div>
             
             <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-white tracking-widest">
              CLIENTES
            </h2>
          </motion.div>

          <div className="flex items-center justify-center relative">
             {/* Previous Button */}
             <button 
               type="button"
               onClick={handlePrevClient}
               className="hidden md:flex absolute -left-12 lg:-left-24 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-20"
               aria-label="Previous Clients"
             >
               <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
             </button>

             {/* Grid Container */}
             {/* Dynamic min-height based on mobile (300px for 6 items) or desktop (350px for 15) */}
             <div className="w-full flex items-center justify-center min-h-[350px] transition-[min-height] duration-300">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={clientPage}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.4, ease: "easeInOut" }}
                   // Mobile: 2 cols (3 rows = 6 items). Desktop: 5 cols (3 rows = 15 items)
                   className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8 md:gap-x-12 md:gap-y-12 w-full items-start justify-items-center content-start"
                 >
                   {visibleClients.map((client, index) => (
                     <motion.div
                       key={client.id}
                       className="w-full flex items-center justify-center h-24 md:h-32 px-2 md:px-4 will-change-transform"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ 
                         duration: 0.4, 
                         delay: index * 0.02, 
                         ease: "easeOut" 
                       }}
                       whileHover={{ scale: 1.05, opacity: 1 }} 
                     >
                        {/* Logo Image */}
                         <img 
                           src={client.image} 
                           alt={client.name} 
                           className="w-auto max-h-20 md:max-h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                           loading="eager"
                         />
                     </motion.div>
                   ))}
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Next Button */}
             <button 
               type="button"
               onClick={handleNextClient}
               className="hidden md:flex absolute -right-12 lg:-right-24 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-20"
               aria-label="Next Clients"
             >
               <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
             </button>
          </div>

          {/* Mobile Navigation (Visible only on small screens) */}
          <div className="flex md:hidden justify-center gap-8 mt-12">
             <button 
               type="button"
               onClick={handlePrevClient}
               className="text-white/50 hover:text-white transition-colors p-2"
             >
               <ChevronLeft className="w-8 h-8" />
             </button>
             <button 
               type="button"
               onClick={handleNextClient}
               className="text-white/50 hover:text-white transition-colors p-2"
             >
               <ChevronRight className="w-8 h-8" />
             </button>
          </div>

        </div>
      </section>

      {/* TICKETS / GARANTA SECTION - MOVED ABOVE UNIQUE */}
      <section id="tickets" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#FFFFFF]">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="text-center">
             <h2 className="text-5xl md:text-9xl font-heading font-bold text-[#213D7A]/10">
               GARANTA
             </h2>
             <p className="text-[#213D7A] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base mb-10 font-bold">
               SEU SUCESSO ONLINE
             </p>
             
             <motion.button 
               className="relative z-10 inline-flex items-center gap-3 px-12 py-5 bg-[#961D1D] text-white hover:bg-[#213D7A] transition-all duration-300 rounded-full font-bold tracking-widest uppercase text-sm shadow-lg group"
               data-hover="true"
               onClick={() => window.open('https://wa.me/', '_blank')}
               variants={buttonHover}
               initial="rest"
               whileHover="hover"
               whileTap="tap"
             >
               <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
               Entrar em contacto
             </motion.button>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION: O QUE NOS TORNA ÚNICOS - Blue Background + White Card */}
      <section id="unique" className="relative z-10 py-16 md:py-24 bg-[#213D7A] border-t border-white/10 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative">
          
          {/* White Card Wrapper */}
          <motion.div 
            className="bg-white rounded-[2rem] px-6 py-8 md:px-12 md:py-12 max-w-5xl mx-auto shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
              <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-6xl font-heading font-bold mb-6 md:mb-8 leading-tight uppercase">
                    <GradientText text="O QUE NOS TORNA ÚNICOS" className="text-3xl md:text-6xl" />
                  </h2>
                  
                  {/* Decorative Line */}
                  <div className="w-16 h-1.5 bg-[#E2BA3D] mx-auto rounded-full mb-8 md:mb-10 opacity-90"></div>

                  {/* FAQ-style Cards with Accordion */}
                  <motion.div 
                    className="flex flex-col gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {UNIQUE_ITEMS.map((item, index) => {
                      const isOpen = activeAccordion === index;
                      return (
                       <motion.div 
                        key={index}
                        variants={fadeInUp}
                        onClick={() => setActiveAccordion(isOpen ? null : index)}
                        className="flex flex-col w-full bg-white border border-[#213D7A]/15 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden relative will-change-transform"
                        whileHover={{ y: -4, borderColor: "rgba(33, 61, 122, 0.3)" }}
                        transition={{ duration: 0.3 }}
                       >
                          <div className="flex items-center justify-between p-4 md:p-6">
                             <span className="text-base md:text-lg text-[#213D7A] font-medium text-left leading-relaxed">{item.title}</span>
                             <motion.div
                               animate={{ rotate: isOpen ? 180 : 0 }}
                               transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                             >
                                <ChevronDown className="w-5 h-5 text-[#213D7A] shrink-0 ml-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                             </motion.div>
                          </div>
                          
                          <AnimatePresence>
                             {isOpen && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                               >
                                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                                     <div className="w-full h-px bg-[#213D7A]/10 mb-3"></div>
                                     <p className="text-sm md:text-base text-[#213D7A]/70 leading-relaxed text-left">
                                       {item.answer}
                                     </p>
                                  </div>
                               </motion.div>
                             )}
                          </AnimatePresence>
                       </motion.div>
                      );
                    })}
                  </motion.div>
              </div>
          </motion.div>

        </div>
      </section>

      <footer className="relative z-10 border-t border-white/20 py-12 md:py-16 bg-[#213D7A] text-white">
        <motion.div 
          className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div>
             <div className="mb-4">
               <img 
                 src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" 
                 alt="WEELOVE" 
                 className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
               />
             </div>
             <div className="flex gap-2 text-xs font-mono text-white/60">
               <span>Criado por: @ethoss.x</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="https://www.instagram.com/wee_marketing/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#E2BA3D] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Instagram
            </a>
          </div>
        </motion.div>
      </footer>

      {/* SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {selectedService && (
          <React.Fragment>
             {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            
            {/* Modal Container */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative pointer-events-auto flex flex-col"
              >
                {/* Modal Header */}
                <div className="sticky top-0 right-0 p-6 flex justify-end bg-white/80 backdrop-blur-sm z-10">
                   <button 
                     onClick={() => setSelectedService(null)}
                     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                     aria-label="Close"
                   >
                     <X className="w-6 h-6 text-[#213D7A]" />
                   </button>
                </div>

                {/* Modal Content */}
                <div className="px-8 pb-10 pt-2">
                   <h3 className="text-3xl md:text-4xl font-heading font-bold text-[#213D7A] mb-6 leading-tight">
                     {selectedService.title}
                   </h3>
                   
                   <div className="w-20 h-1 bg-[#E2BA3D] mb-8" />
                   
                   <p className="text-[#213D7A]/80 text-lg leading-relaxed mb-10 whitespace-pre-line">
                     {selectedService.fullDescription}
                   </p>

                   <motion.button 
                     onClick={() => {
                        window.open('https://wa.me/', '_blank');
                        setSelectedService(null);
                     }}
                     className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#213D7A] text-white hover:bg-[#961D1D] transition-colors rounded-full font-bold tracking-widest uppercase text-sm shadow-lg group"
                     variants={buttonHover}
                     initial="rest"
                     whileHover="hover"
                     whileTap="tap"
                   >
                     {selectedService.ctaText}
                     <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </motion.button>
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
