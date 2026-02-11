
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useSpring, useTransform } from 'framer-motion';
import { Menu, X, Clapperboard, ThumbsUp, Camera, Lightbulb, Instagram, Target, Heart, ArrowUpRight, PlayCircle, ChevronDown, Facebook, Linkedin } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';

// --- Premium Animation Constants ---
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as any;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: EASE_PREMIUM } 
  }
};

// --- WhatsApp Logic ---
const WHATSAPP_NUMBER = "351932495020";

const openWhatsApp = (message: string = "Olá! Gostaria de saber mais sobre os serviços da WEE Marketing.") => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// --- Data Structures ---
const CLIENTS_PT = [
  { id: 'pt1', name: 'Aguiam Wedding Photography', image: 'https://i.postimg.cc/zD9stQH5/Design-sem-nome-(1).png' },
  { id: 'pt2', name: 'CurArt', image: 'https://i.postimg.cc/RZT20Vs3/IMG-8879-removebg-preview.png' },
  { id: 'pt3', name: 'icó Original Tapas', image: 'https://i.postimg.cc/7ZNjLYsh/IMG-8880-removebg-preview.png' },
  { id: 'pt4', name: 'Portugal Faz Bem', image: 'https://i.postimg.cc/6phFQ5j2/IMG-8882-removebg-preview.png' },
  { id: 'pt5', name: 'Ana Gomes', image: 'https://i.postimg.cc/y8T2NYQd/IMG-8883-removebg-preview.png' },
  { id: 'pt6', name: 'RE/MAX Grupo Goldenline', image: 'https://i.postimg.cc/VNGTjZcz/IMG-8884-removebg-preview.png' },
  { id: 'pt7', name: 'Paula Ponce', image: 'https://i.postimg.cc/mDPnV3bW/IMG-8885-removebg-preview.png' },
  { id: 'pt8', name: 'Programar', image: 'https://i.postimg.cc/gJx74yYF/IMG-8886-removebg-preview.png' },
  { id: 'pt9', name: 'DS Private Davilla', image: 'https://i.postimg.cc/bJZ5L0z8/IMG-8887-removebg-preview.png' },
  { id: 'pt10', name: 'Awakeness', image: 'https://i.postimg.cc/JnsFK31B/IMG-8888-removebg-preview.png' },
];

const CLIENTS_BR = [
  { id: 'br1', name: 'Cidad 3', image: 'https://i.postimg.cc/9Mb1ZJRL/IMG-8918.jpg' },
  { id: 'br2', name: 'Clichê 40', image: 'https://i.postimg.cc/gk15zc9W/IMG-8892-removebg-preview.png' },
  { id: 'br3', name: 'Cilene Lupi', image: 'https://i.postimg.cc/2SvtVpmk/IMG-8893-removebg-preview.png' },
  { id: 'br4', name: 'WVS Arquitetura', image: 'https://i.postimg.cc/4xt0mCZX/IMG-8894-removebg-preview.png' },
  { id: 'br5', name: 'Rollox', image: 'https://i.postimg.cc/P5Z7PGhx/IMG-8895-removebg-preview.png' },
  { id: 'br6', name: 'mne Nucleo Nordeste', image: 'https://i.postimg.cc/NjTn5hY5/IMG-8896-removebg-preview.png' },
  { id: 'br7', name: 'Senac', image: 'https://i.postimg.cc/cLYzrqZg/IMG-8898-removebg-preview.png' },
  { id: 'br8', name: 'Priscila Mattos Venturi', image: 'https://i.postimg.cc/VkMhdy10/IMG-8899-removebg-preview.png' },
  { id: 'br9', name: 'Clínica Isto', image: 'https://i.postimg.cc/52vr6c1C/IMG-8900-removebg-preview.png' },
  { id: 'br10', name: 'Adriana Farias', image: 'https://i.postimg.cc/htxYfFgm/IMG-8901-removebg-preview.png' },
  { id: 'br11', name: 'Gestran', image: 'https://i.postimg.cc/3wTcGLJJ/IMG-8903-removebg-preview.png' },
  { id: 'br12', name: 'Cliente Brasil 12', image: 'https://i.postimg.cc/1zQjFW53/IMG-8904-removebg-preview.png' },
  { id: 'br13', name: 'Cliente Brasil 13', image: 'https://i.postimg.cc/JhL2XT4t/IMG-8905-preview.png' },
  { id: 'br14', name: 'Cliente Brasil 14', image: 'https://i.postimg.cc/43gSc8Nh/IMG-8906-removebg-preview.png' },
  { id: 'br15', name: 'Cliente Brasil 15', image: 'https://i.postimg.cc/1zQjFW5f/IMG-8907-removebg-preview.png' },
  { id: 'br16', name: 'Cliente Brasil 16', image: 'https://i.postimg.cc/DzPYPq8M/IMG-8909-removebg-preview.png' },
  { id: 'br17', name: 'Cliente Brasil 17', image: 'https://i.postimg.cc/mDZpXt9z/IMG-8910-removebg-preview.png' },
  { id: 'br18', name: 'Cliente Brasil 18', image: 'https://i.postimg.cc/BvBwBxj9/IMG-8911-removebg-preview.png' },
  { id: 'br19', name: 'Cliente Brasil 19', image: 'https://i.postimg.cc/gJctSnh6/IMG-8912-removebg-preview.png' },
  { id: 'br20', name: 'Cliente Brasil 20', image: 'https://i.postimg.cc/W39WQTmW/IMG-8913-removebg-preview.png' },
  { id: 'br21', name: 'Cliente Brasil 21', image: 'https://i.postimg.cc/sXn6tsPN/IMG-8914-removebg-preview.png' },
  { id: 'br22', name: 'Cliente Brasil 22', image: 'https://i.postimg.cc/pT0GgRQS/IMG-8915-removebg-preview.png' },
  { id: 'br23', name: 'Cliente Brasil 23', image: 'https://i.postimg.cc/50P7Zb5T/IMG-8916-removebg-preview.png' },
];

const INSTAGRAM_POSTS = [
  { 
    id: 1, 
    image: 'https://i.postimg.cc/G2GqXYWB/Whats-App-Image-2026-02-11-at-13-04-55.jpg', 
    active: true,
    link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDY4MDAxNzczMDgyMTc0?story_media_id=3651918309785921823&igsh=MXJ6bWo4d2R0bXBqdg=='
  },
  { 
    id: 2, 
    image: 'https://i.postimg.cc/26h20vsy/Whats-App-Image-2026-02-11-at-13-04-55-(1).jpg', 
    active: true,
    link: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODUwMjk1ODUxNDU0NzQw?story_media_id=3667194396547749721&igsh=NXMwNG8yM2U1OWlw'
  },
];

const SERVICES = [
  {
    id: 1,
    icon: <Clapperboard className="w-6 h-6" />,
    title: "Videomaker",
    tagline: "High-End Visual Production",
    description: "Produzimos vídeos profissionais para empresas, profissionais independentes e público em geral.",
    fullDescription: "Produzimos vídeos profissionais para empresas, profissionais independentes e público em geral. Seja para registar eventos privados, criar conteúdos institucionais ou promover a sua marca, cuidamos de cada detalhe: captação de imagem, edição, guião, direcção e estratégia. Transformamos momentos em histórias que criam ligação e despertam emoção.",
    cta: "vamos falar"
  },
  {
    id: 2,
    icon: <ThumbsUp className="w-6 h-6" />,
    title: "Gestão de Redes Sociais",
    tagline: "Strategic Presence",
    description: "Gerimos as suas redes sociais de forma estratégica e criativa.",
    fullDescription: "Atuamos no Instagram, Facebook, YouTube e LinkedIn, desenvolvendo conteúdos relevantes, planeando publicações, interagindo com a audiência e analisando métricas para reforçar a presença digital da sua marca.",
    cta: "vamos pensar juntos"
  },
  {
    id: 3,
    icon: <Camera className="w-6 h-6" />,
    title: "Formação",
    tagline: "Empowerment",
    description: "Aprenda a criar vídeos profissionais utilizando apenas o seu telemóvel.",
    fullDescription: "Formação prática para todo o tipo de público, que combina técnicas de captação, edição e sensibilidade artística.\n\nIdeal para quem pretende produzir conteúdos de qualidade sem recorrer a equipamentos dispendiosos.",
    cta: "descobrir como funciona"
  },
  {
    id: 4,
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Consultoria",
    tagline: "Insight & Strategy",
    description: "Consultoria personalizada ao vivo com Munik Rangel.",
    fullDescription: "Consultoria personalizada ao vivo com Munik Rangel. Dirigida a profissionais que pretendam criar conteúdos em vídeo, mas não sabem por onde começar.\n\nEla vai orientar-te sobre a utilização de equipamentos práticos como luz portátil, microfone, cenário e as mais recentes funcionalidades do Instagram, técnicas de captação, edição e estratégias de publicação.\n\nTudo online, ao seu ritmo.",
    cta: "explica melhor"
  }
];

const UNIQUE_VALUES = [
  {
    icon: <Camera className="w-5 h-5" />,
    title: "Produção de conteúdos em vídeo com telemóvel que contam a sua história com emoção e impacto",
    text: "Utilizamos técnicas profissionais de captação e edição mobile, criando vídeos autênticos que ligam emocionalmente com o seu público."
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Estratégia digital adaptada à identidade e aos objectivos da sua marca",
    text: "Desenvolvemos um plano personalizado de conteúdos, alinhado com os valores da sua marca e focado em resultados reais."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Há SEMPRE um plano exclusivo feito à sua medida",
    text: "Cada projecto é único. Analisamos o seu negócio para criar uma estratégia 100% personalizada, feita à sua medida."
  }
];

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navBackground = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
  const navShadow = useTransform(scrollY, [0, 100], ["none", "0 4px 6px -1px rgb(0 0 0 / 0.1)"]);
  const navTextColor = useTransform(scrollY, [0, 100], ["#FFFFFF", "#213D7A"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0.05)"]);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formChallenge, setFormChallenge] = useState("");

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // Normalize string to lowercase and handle common variations
    const normalizedInput = id.toLowerCase().trim();
    
    const sectionMap: Record<string, string> = {
      'início': 'inicio',
      'inicio': 'inicio',
      'serviços': 'servicos-elite',
      'servicos': 'servicos-elite',
      'quem somos': 'quem-somos',
      'quem-somos': 'quem-somos',
      'portefólio': 'portfolio',
      'portfolio': 'portfolio',
      'clientes': 'clientes',
      'contacto': 'contacto'
    };

    const targetId = sectionMap[normalizedInput] || normalizedInput;
    const el = document.getElementById(targetId);
    
    if (el) {
      const offset = (normalizedInput === 'início' || normalizedInput === 'inicio') ? 0 : 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Novo Contacto WEE Marketing - ${formName}`);
    const body = encodeURIComponent(`Nome: ${formName}\nEmail: ${formEmail}\nWhatsApp: ${formPhone}\nDesafio: ${formChallenge}`);
    window.location.href = `mailto:contato@weemarketing.pt?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-[#213D7A] selection:bg-[#E2BA3D] overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E2BA3D] origin-left z-[110]" style={{ scaleX }} />

      <div className="fixed top-0 left-0 right-0 z-[105] bg-[#961D1D] text-white h-8 md:h-10 overflow-hidden border-b border-[#E2BA3D]/20">
        <motion.div 
          className="whitespace-nowrap flex items-center h-full gap-8 md:gap-16"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-6 flex-shrink-0">
              <span className="text-[8px] md:text-[11px] font-black tracking-wider uppercase leading-none">
                EM BREVE: 4º WORKSHOP DE VÍDEOS E EDIÇÃO COM TELEMÓVEL!
              </span>
              <a 
                href="https://forms.gle/F4SHYr5nRvPWCscQ9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#E2BA3D] text-[#213D7A] px-2.5 md:px-4 py-0.5 md:py-1 rounded-full text-[7px] md:text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-lg flex-shrink-0"
              >
                PRÉ-INSCRIÇÃO AQUI
              </a>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.nav 
        style={{ 
          backgroundColor: navBackground,
          boxShadow: navShadow,
          borderBottomColor: navBorder
        }}
        className="fixed top-8 md:top-10 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-12 py-5 border-b transition-all duration-300"
      >
        <div className="cursor-pointer" onClick={() => scrollToSection('início')}>
           <motion.img 
            style={{ filter: useTransform(scrollY, [0, 100], ["brightness(0) invert(1)", "none"]) }}
            src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" 
            alt="WEE" 
            className="h-6 md:h-8 w-auto hover:opacity-80 transition-opacity" 
           />
        </div>
        
        <div className="hidden lg:flex gap-10 text-[10px] font-black tracking-[0.25em] uppercase">
          {['Início', 'Serviços', 'Quem Somos', 'Portefólio', 'Clientes', 'Contacto'].map((item) => (
            <motion.button 
              key={item}
              style={{ color: navTextColor }}
              onClick={() => scrollToSection(item)} 
              className="hover:text-[#E2BA3D] transition-all relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E2BA3D] transition-all duration-500 group-hover:w-full" />
            </motion.button>
          ))}
        </div>

        <motion.button 
          style={{ color: navTextColor }}
          onClick={() => setMobileMenuOpen(true)} 
          className="lg:hidden p-2"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.nav>

      <header id="inicio" className="relative h-[100svh] min-h-[100svh] md:min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('https://i.postimg.cc/wvL4w0q5/logo-wee.png')]" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <iframe 
              src="https://player.vimeo.com/video/1153987727?background=1&autoplay=1&loop=1&muted=1&playsinline=1&title=0&byline=0&portrait=0&badge=0&quality=1080p&autopause=0&dnt=1" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              title="WEE Background Video"
              aria-hidden="true"
              style={{ objectFit: 'cover', pointerEvents: 'none' }}
              loading="eager"
            />
          </motion.div>
        </div>

        <div className="absolute inset-0 z-[1] bg-black/50 backdrop-blur-[0.5px]" />

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_PREMIUM }}
            className="flex flex-col items-center text-center w-full"
          >
            <h1 className="font-heading font-bold text-white capitalize text-balance
              text-[26px] leading-[1.2] max-w-[88vw] 
              md:text-[52px] md:leading-[1.08] md:max-w-[760px]
              lg:text-[64px] lg:leading-[1.05] lg:max-w-[900px]">
              Transformamos presença digital <br className="hidden md:block" /> 
              <span className="text-[#E2BA3D]">em resultados reais.</span>
            </h1>

            <p className="font-light text-white/80 opacity-90 mx-auto mt-5 md:mt-8
              text-[13px] leading-[1.5] max-w-[82vw]
              md:text-[16px] md:leading-[1.5] md:max-w-[640px]
              lg:text-[18px] lg:max-w-[720px]">
              Estratégia, Formação, Conteúdo e Criatividade para marcas que querem crescer no digital.
            </p>

            <div className="mt-[28px] md:mt-[32px]">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openWhatsApp()}
                className="bg-[#E2BA3D] text-[#213D7A] px-10 md:px-14 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl transition-all duration-500 min-w-[210px]"
              >
                Fale connosco
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none z-10 text-white"
        >
          <ChevronDown className="w-8 h-8 md:w-10 md:h-10" />
        </motion.div>
      </header>

      <section id="servicos-elite" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-6xl font-heading font-black text-[#213D7A] leading-tight text-balance">O QUE FAZEMOS.</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <motion.div
                key={s.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-10 bg-gray-50 border border-gray-100 rounded-[3rem] group hover:bg-[#213D7A] hover:text-white transition-all duration-700 flex flex-col min-h-[400px]"
              >
                <div className="mb-8 w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#213D7A] group-hover:scale-105 transition-transform">
                  {s.icon}
                </div>
                <div className="mt-auto">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">{s.tagline}</p>
                  <h4 className="text-xl md:text-2xl font-heading font-bold mb-4">{s.title}</h4>
                  <p className="text-sm opacity-60 leading-relaxed mb-8 line-clamp-3">{s.description}</p>
                  <button onClick={() => setSelectedService(s)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b border-current pb-1 w-fit group-hover:border-[#E2BA3D]">
                    Detalhes <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 bg-[#213D7A] text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E2BA3D] mb-4">Exclusividade</h2>
             <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter">O que nos torna únicos</h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-16 md:gap-24">
            {UNIQUE_VALUES.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-6 cursor-default p-6 rounded-[2rem] hover:bg-white/5 transition-colors group"
              >
                <motion.div 
                  whileHover={{ rotate: 15 }}
                  className="text-[#E2BA3D] w-12 h-12 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 bg-[#213D7A]"
                >
                  {val.icon}
                </motion.div>
                <div className="space-y-4">
                  <h4 className="text-lg md:text-xl font-heading font-black uppercase tracking-tight leading-tight min-h-[4rem] flex items-center group-hover:text-[#E2BA3D] transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-white/50 leading-relaxed font-light text-sm md:text-base">
                    {val.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="quem-somos" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
            <div className="relative px-2">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://i.postimg.cc/CLT4zhMD/IMG-4720-Original.jpg" className="rounded-3xl h-64 md:h-80 w-full object-cover shadow-2xl" alt="Munik" />
                <img src="https://i.postimg.cc/g0TVddB0/IMG-0825-Original.avif" className="rounded-3xl h-64 md:h-80 w-full object-cover mt-8 md:mt-12 shadow-2xl" alt="Munik" />
                <img src="https://i.postimg.cc/qBCLJhrB/IMG-2788-Original.jpg" className="rounded-3xl h-64 md:h-80 w-full object-cover -mt-8 md:-mt-12 shadow-2xl" alt="Munik" />
                <img src="https://i.postimg.cc/Zn3FVgHw/75813ca3-41b8-4f4b-8acd-0ce036ea3339-Original.jpg" className="rounded-3xl h-64 md:h-80 w-full object-cover shadow-2xl" alt="Munik" />
              </div>
            </div>
            <div className="space-y-10">
              <div className="flex flex-col">
                <h2 className="text-[14px] font-black uppercase tracking-[0.4em] text-[#961D1D] mb-1">QUEM SOMOS</h2>
                <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">A VISIONÁRIA</h4>
                
                <p className="text-[#213D7A] font-bold text-base md:text-lg mb-8 leading-relaxed">
                   Nós somos uma agência de marketing que atende clientes no Brasil e em Portugal.
                </p>

                <h3 className="text-3xl md:text-7xl font-heading font-black text-[#213D7A] tracking-tighter leading-none mb-10">
                  MUNIK RANGEL.
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium">Estratega de marketing brasileira, há 25 anos</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium">Certificada pela New York Film Academy</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium">Experiência em grandes empresas como TV Globo, MTV, IBM, BASF e DELL</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium">Head Customer Experience do app My Heineken</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium">Nos últimos anos, dedica-se ao marketing digital, gestão de redes sociais e produção de conteúdo em vídeo</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium">Ajuda marcas a fortalecer sua presença digital e aumentar sua percepção de valor</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[#E2BA3D] text-xl mt-[-4px]">➤</span>
                    <span className="text-[#213D7A]/80 text-base md:text-lg font-medium leading-relaxed">Na Europa, além do nicho de imobiliária, estética e terapia, colaborou com duas revistas e realizou a cobertura de eventos em Lisboa, Paris, na Semana de Design de Milão - Itália e na Euroshop em Düsseldorf - Alemanha.</span>
                  </li>
                </ul>

                {/* --- Expertise Section --- */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#961D1D] mb-8">EXPERTISE</h5>
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    {['Criatividade', 'Valor', 'Autenticidade', 'Emoção', 'Conexão Real'].map((item) => (
                      <div key={item} className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E2BA3D] group-hover:scale-150 transition-transform duration-300" />
                        <span className="text-[#213D7A] font-heading font-bold text-[13px] md:text-[15px] uppercase tracking-tighter">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clientes" className="py-24 bg-[#213D7A]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-white/30 mb-20">Marcas que Confiam em Nós</h2>
          
          <div className="space-y-32">
            <div>
              <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-12 border-l-2 border-[#E2BA3D] pl-4">Portugal</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-16 items-center">
                {CLIENTS_PT.map(c => (
                  <motion.div 
                    key={c.id} 
                    whileHover={{ scale: 1.05 }} 
                    className="flex items-center justify-center group w-full h-14 md:h-20 leading-[0]"
                  >
                    <img 
                      src={c.image} 
                      alt={c.name} 
                      className="block max-h-[52px] max-w-[150px] md:max-h-[72px] md:max-w-[220px] w-auto h-auto object-contain filter brightness-0 invert opacity-60 group-hover:filter-none group-hover:opacity-100 transition-all duration-500" 
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-12 border-l-2 border-[#E2BA3D] pl-4">Brasil</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12 md:gap-16 items-center">
                {CLIENTS_BR.map(c => (
                  <motion.div 
                    key={c.id} 
                    whileHover={{ scale: 1.05 }} 
                    className="flex items-center justify-center group w-full h-14 md:h-20 leading-[0]"
                  >
                    <img 
                      src={c.image} 
                      alt={c.name} 
                      className="block max-h-[52px] max-w-[150px] md:max-h-[72px] md:max-w-[220px] w-auto h-auto object-contain filter brightness-0 invert opacity-60 group-hover:filter-none group-hover:opacity-100 transition-all duration-500" 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-[1.8rem] md:text-4xl font-heading font-black text-[#213D7A] mb-16 tracking-widest uppercase">
            Portefólio
          </h3>
          
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 md:gap-10 mb-16">
            {INSTAGRAM_POSTS.map((post) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl w-full sm:w-[48%] md:w-1/3 aspect-square block ${post.active ? 'bg-gray-400' : 'bg-gray-100'}`}
              >
                <img src={post.image} alt="Portfolio Content" className={`w-full h-full object-cover ${post.active ? 'opacity-70' : 'opacity-100'}`} />
                {post.active && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="w-12 h-12 text-white" />
                  </div>
                )}
                {post.active && (
                   <div className="absolute top-4 right-4 w-3 h-3 bg-[#E2BA3D] rounded-full shadow-lg" />
                )}
              </motion.a>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDY4MDAxNzczMDgyMTc0?igsh=aWVrc3JxZmd3Mjhp', '_blank')}
            className="px-8 py-3 rounded-full border border-[#213D7A] text-[10px] font-bold text-[#213D7A] uppercase tracking-widest hover:bg-[#213D7A] hover:text-white transition-all duration-300"
          >
            VER PORTEFÓLIO COMPLETO.
          </motion.button>
        </div>
      </section>

      <section id="contacto" className="py-24 md:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-7xl font-heading font-black mb-6 uppercase text-balance leading-tight">A sua marca, mais forte no digital.</h3>
            <p className="text-[#213D7A]/40 font-bold uppercase text-[10px] tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">Preencha para receber uma proposta com Estratégia, conteúdo e resultados que fazem crescer o seu negócio.</p>
          </div>
          
          <form className="space-y-12" onSubmit={handleFormSubmit}>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group border-b border-gray-100 focus-within:border-[#213D7A] transition-colors">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent py-4 focus:outline-none text-lg font-medium" 
                  placeholder=""
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="group border-b border-gray-100 focus-within:border-[#213D7A] transition-colors">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40">E-mail Corporativo</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent py-4 focus:outline-none text-lg font-medium" 
                  placeholder=""
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="group border-b border-gray-100 focus-within:border-[#213D7A] transition-colors">
              <label className="text-[9px] font-black uppercase tracking-widest opacity-40">WhatsApp (Obrigatório)</label>
              <input 
                type="tel" 
                required
                className="w-full bg-transparent py-4 focus:outline-none text-lg font-medium" 
                placeholder="+351 000 000 000"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
            </div>

            <div className="group border-b border-gray-100 focus-within:border-[#213D7A] transition-colors">
              <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Descreva seu Desafio</label>
              <textarea 
                rows={3} 
                required
                className="w-full bg-transparent py-4 focus:outline-none text-lg font-medium resize-none" 
                placeholder="O que pretende alcançar conosco?"
                value={formChallenge}
                onChange={(e) => setFormChallenge(e.target.value)}
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-[#213D7A] text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#961D1D] transition-all shadow-xl"
            >
              SUBMETER
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="py-20 bg-white border-t-2 border-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" alt="WEE" className="h-10 opacity-100 hover:scale-105 transition-transform cursor-pointer" />
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-12 text-[11px] font-black uppercase tracking-widest mb-4">
              <a href="https://www.instagram.com/munikrangel/" target="_blank" rel="noopener noreferrer" className="text-[#213D7A] hover:text-[#961D1D] transition-all flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="https://www.facebook.com/share/1TsLHwk4bD/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-[#213D7A] hover:text-[#961D1D] transition-all flex items-center gap-2">
                <Facebook className="w-4 h-4" /> Facebook
              </a>
              <a href="https://www.linkedin.com/in/munik-rangel?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-[#213D7A] hover:text-[#961D1D] transition-all flex items-center gap-2">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
            <button onClick={() => openWhatsApp()} className="text-[10px] font-black uppercase tracking-widest text-[#E2BA3D] hover:text-[#961D1D] transition-all">
              WHATSAPP DIRETO
            </button>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[9px] font-black text-[#213D7A] uppercase tracking-[0.2em]">
              © 2025 WEE MARKETING CRIADO POR: ETHOSS.X
            </p>
            <p className="text-[7px] font-bold opacity-20 uppercase tracking-widest text-balance text-center">Elevando o Padrão de Conteúdo</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedService && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-[#213D7A]/95 z-[100] backdrop-blur-2xl"
            />
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[85vh] overflow-y-auto p-10 md:p-20 relative"
              >
                <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-[#213D7A]/20 hover:text-[#213D7A] transition-colors"><X className="w-6 h-6" /></button>
                <div className="text-[#E2BA3D] mb-8">{selectedService.icon}</div>
                <h3 className="text-3xl md:text-4xl font-heading font-black mb-8 leading-tight">{selectedService.title}</h3>
                <div className="text-base md:text-lg font-light opacity-60 leading-relaxed mb-12 whitespace-pre-line">
                  {selectedService.fullDescription}
                </div>
                <button 
                  onClick={() => openWhatsApp(`Olá! Gostaria de falar sobre o serviço: ${selectedService.title}`)}
                  className="w-full bg-[#213D7A] text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#961D1D] transition-all"
                >
                  {selectedService.cta}
                </button>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
