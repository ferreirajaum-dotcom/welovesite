
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useSpring, useTransform } from 'framer-motion';
import { Menu, X, Clapperboard, ThumbsUp, Camera, Lightbulb, Instagram, Target, Heart, ArrowUpRight, PlayCircle, ChevronDown } from 'lucide-react';
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
const CLIENTS = [
  { id: 'pt1', name: 'RetailBox', image: 'https://i.postimg.cc/6QZZDPkq/cliente-logo-8.png', region: 'Portugal' },
  { id: 'pt2', name: 'Alupoli', image: 'https://i.postimg.cc/W4ZZQyBt/cliente-logo-9.png', region: 'Portugal' },
  { id: 'pt3', name: 'Cilene Lupi', image: 'https://i.postimg.cc/bvnnK572/cliente-logo-10.png', region: 'Portugal' },
  { id: 'pt4', name: 'RLX Rollox', image: 'https://i.postimg.cc/85VvDHGP/cliente-logo-11.png', region: 'Portugal' },
  { id: 'br1', name: 'Trisoft', image: 'https://i.postimg.cc/PqDDB7Bg/cliente-logo-1.png', region: 'Brasil' },
  { id: 'br2', name: 'Clínica ISTO', image: 'https://i.postimg.cc/zfhh9Qsq/cliente-logo-2.png', region: 'Brasil' },
  { id: 'br3', name: 'Priscila Mattos Venturi', image: 'https://i.postimg.cc/q7KK9FPJ/cliente-logo-3.png', region: 'Brasil' },
  { id: 'br4', name: 'Anexo', image: 'https://i.postimg.cc/3wGGPqsK/cliente-logo-4.png', region: 'Brasil' },
];

const INSTAGRAM_POSTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1492691523567-69b9a61e0d45?auto=format&fit=crop&q=80&w=800' },
  { id: 2, image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800' },
  { id: 3, image: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&q=80&w=800', active: true },
  { id: 4, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800' },
];

const SERVICES = [
  {
    id: 1,
    icon: <Clapperboard className="w-6 h-6" />,
    title: "Videomaker",
    tagline: "High-End Visual Production",
    description: "Produzimos vídeos que transformam percepções e geram conexão emocional profunda.",
    fullDescription: "Excelência técnica em captação e edição mobile. Do guião à estratégia de distribuição, cuidamos de cada detalhe para que o seu conteúdo se destaque num mercado saturado de ruído visual."
  },
  {
    id: 2,
    icon: <ThumbsUp className="w-6 h-6" />,
    title: "Gestão de Redes Sociais",
    tagline: "Strategic Presence",
    description: "Gerimos as suas redes com curadoria estética e estratégia baseada em dados.",
    fullDescription: "Atuação no Instagram, YouTube e LinkedIn. Desenvolvemos narrativas visuais que reforçam a autoridade da sua marca enquanto criamos comunidades engajadas."
  },
  {
    id: 3,
    icon: <Camera className="w-6 h-6" />,
    title: "Formação",
    tagline: "Empowerment",
    description: "Aprenda a criar vídeos profissionais utilizando apenas o seu telemóvel.",
    fullDescription: "Masterclass prática de captação, iluminação e edição mobile. Ideal para quem quer independência criativa com resultados cinematográficos."
  },
  {
    id: 4,
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Consultoria",
    tagline: "Insight & Strategy",
    description: "Acesso direto à expertise de Munik Rangel para escalar sua marca.",
    fullDescription: "Consultoria 1-to-1 para diagnosticar gaps de posicionamento e traçar um roteiro claro de crescimento digital personalizado."
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
    title: "Estratégia digital adaptada à identidade e aos objetivos da sua marca",
    text: "Desenvolvemos um plan personalizado de conteúdo alinhado aos valores da sua marca e focado em resultados reais."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Há SEMPRE um plano exclusivo feito à sua medida",
    text: "Cada projeto é único. Analisamos o seu negócio para criar uma estratégia 100% personalizada feita à sua medida."
  }
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(33, 61, 122, 0.05)"]);
  const navShadow = useTransform(scrollY, [0, 100], ["none", "0 10px 15px -3px rgba(0, 0, 0, 0.1)"]);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formChallenge, setFormChallenge] = useState("");

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const sectionMap: Record<string, string> = {
      'inicio': 'inicio',
      'servicos': 'servicos-elite',
      'a-wee': 'quem-somos',
      'clientes': 'clientes',
      'contacto': 'contacto'
    };

    const targetId = sectionMap[id] || id;
    const el = document.getElementById(targetId);
    if (el) {
      const offset = id === 'inicio' ? 0 : 120;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá WEE! Me chamo ${formName}. Meu e-mail é ${formEmail}. Meu desafio é: ${formChallenge}`;
    openWhatsApp(msg);
  };

  return (
    <div className="relative min-h-screen bg-white text-[#213D7A] selection:bg-[#E2BA3D] overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E2BA3D] origin-left z-[100]" style={{ scaleX }} />

      {/* ANNOUNCEMENT TICKER */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#961D1D] text-white h-8 md:h-10 overflow-hidden border-b border-[#E2BA3D]/20">
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
          backgroundColor: navBg,
          borderBottomColor: navBorder,
          boxShadow: navShadow
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-8 md:top-10 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-sm border-b transition-colors duration-300"
      >
        <div className="cursor-pointer" onClick={() => scrollToSection('inicio')}>
           <img src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" alt="WEE" className="h-6 md:h-8 w-auto hover:opacity-80 transition-opacity" />
        </div>
        
        <div className="hidden lg:flex gap-10 text-[10px] font-black tracking-[0.25em] uppercase">
          <button onClick={() => scrollToSection('inicio')} className="hover:text-[#961D1D] transition-all relative group py-2">
            Início
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-500 group-hover:w-full" />
          </button>
          <button onClick={() => scrollToSection('servicos')} className="hover:text-[#961D1D] transition-all relative group py-2">
            Serviços
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-500 group-hover:w-full" />
          </button>
          <button onClick={() => scrollToSection('a-wee')} className="hover:text-[#961D1D] transition-all relative group py-2">
            A Wee
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-500 group-hover:w-full" />
          </button>
          <button onClick={() => scrollToSection('clientes')} className="hover:text-[#961D1D] transition-all relative group py-2">
            Clientes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-500 group-hover:w-full" />
          </button>
          <button onClick={() => scrollToSection('contacto')} className="hover:text-[#961D1D] transition-all relative group py-2">
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-500 group-hover:w-full" />
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2"><Menu className="w-5 h-5" /></button>
      </motion.nav>

      {/* HERO SECTION - REFINED PROPORTIONS */}
      <header id="inicio" className="relative min-h-[85vh] md:min-h-[90vh] lg:h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe 
            src="https://player.vimeo.com/video/1153987727?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&badge=0" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] md:w-[105%] md:h-[105%] object-cover scale-[1.3] md:scale-[1.1]"
            frameBorder="0" 
            allow="autoplay; fullscreen" 
            title="WEE Background Video"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[0.5px]" />

        {/* CONTENT - ORGANIZED & ELEGANT */}
        <div className="relative z-10 w-full flex items-center justify-center px-8 md:px-12 h-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_PREMIUM }}
            className="flex flex-col items-center justify-center w-full max-w-[820px] text-center"
          >
            <h1 className="text-[1.6rem] sm:text-[2.2rem] md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-[1.2] md:leading-[1.15] mb-8 md:mb-12 tracking-tight text-white capitalize text-balance">
              Transformamos presença digital <br className="hidden md:block" /> 
              <span className="text-[#E2BA3D]">em resultados reais.</span>
            </h1>

            <p className="text-[13px] sm:text-[15px] md:text-base lg:text-lg font-light mb-12 md:mb-16 text-white/80 max-w-[32ch] sm:max-w-[42ch] md:max-w-[50ch] lg:max-w-[60ch] leading-relaxed mx-auto opacity-90">
              Estratégia, Formação, Conteúdo e Criatividade para marcas que querem crescer no digital.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openWhatsApp()}
                className="bg-[#E2BA3D] text-[#213D7A] px-10 md:px-14 py-4 md:py-5 rounded-full font-black uppercase tracking-widest text-[9px] md:text-xs shadow-2xl transition-all duration-500 w-full sm:w-auto min-w-[210px]"
              >
                Fale connosco
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none z-10 text-white"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-12 right-8 p-4"><X className="w-8 h-8" /></button>
            <div className="flex flex-col gap-8 text-2xl font-black uppercase tracking-widest">
              <button onClick={() => scrollToSection('inicio')}>Início</button>
              <button onClick={() => scrollToSection('servicos')}>Serviços</button>
              <button onClick={() => scrollToSection('a-wee')}>A Wee</button>
              <button onClick={() => scrollToSection('clientes')}>Clientes</button>
              <button onClick={() => scrollToSection('contacto')}>Contacto</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="servicos-elite" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#E2BA3D] mb-4">Soluções Elite</h2>
              <h3 className="text-3xl md:text-6xl font-heading font-black text-[#213D7A] leading-tight text-balance">CAPACIDADE CRIATIVA SOB DEMANDA.</h3>
            </div>
            <div className="w-full md:w-auto">
              <p className="text-[#213D7A]/40 font-bold uppercase text-[9px] tracking-[0.3em]">Scroll para explorar ✦</p>
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
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative px-2">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://i.postimg.cc/CLT4zhMD/IMG-4720-Original.jpg" className="rounded-3xl h-64 md:h-80 w-full object-cover shadow-2xl" alt="Munik" />
                <img src="https://i.postimg.cc/g0TVddB0/IMG-0825-Original.avif" className="rounded-3xl h-64 md:h-80 w-full object-cover mt-8 md:mt-12 shadow-2xl" alt="Munik" />
                <img src="https://i.postimg.cc/qBCLJhrB/IMG-2788-Original.jpg" className="rounded-3xl h-64 md:h-80 w-full object-cover -mt-8 md:-mt-12 shadow-2xl" alt="Munik" />
                <img src="https://i.postimg.cc/Zn3FVgHw/75813ca3-41b8-4f4b-8acd-0ce036ea3339-Original.jpg" className="rounded-3xl h-64 md:h-80 w-full object-cover shadow-2xl" alt="Munik" />
              </div>
              <div className="absolute -bottom-8 -right-4 md:-bottom-10 md:-right-10 w-32 h-32 md:w-40 md:h-40 bg-[#E2BA3D] rounded-full flex items-center justify-center p-6 text-center leading-tight font-black uppercase text-[8px] md:text-[10px] hidden sm:flex shadow-2xl">
                27 Anos de Experiência Global
              </div>
            </div>
            <div className="space-y-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#961D1D]">The Visionary</h2>
              <h3 className="text-3xl md:text-6xl font-heading font-black text-balance">MUNIK RANGEL.</h3>
              <p className="text-base md:text-lg text-[#213D7A]/60 leading-relaxed font-light">
                Ex-Globo, IBM e BASF. Head de CX e estrategista digital certificada pela New York Film Academy. Munik combina a sofisticação da televisão with a agilidade do digital.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
                <div>
                  <h5 className="font-black uppercase text-[9px] tracking-widest text-[#E2BA3D] mb-2">Expertise</h5>
                  <p className="text-[11px] font-bold opacity-60">High-End Videomaking, Gestão de Marca, CX.</p>
                </div>
                <div>
                  <h5 className="font-black uppercase text-[9px] tracking-widest text-[#E2BA3D] mb-2">Localização</h5>
                  <p className="text-[11px] font-bold opacity-60">Lisboa ✦ Global</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="clientes" className="py-24 bg-[#213D7A]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-white/30 mb-20">Marcas que Confiam em Nós</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-24 gap-x-16 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity duration-1000">
            {CLIENTS.map(c => (
              <motion.div 
                key={c.id} 
                whileHover={{ scale: 1.15 }}
                className="flex flex-col items-center group w-full max-w-[200px] transition-all duration-500"
              >
                <img 
                   src={c.image} 
                   alt={c.name} 
                   className="h-14 md:h-20 w-auto object-contain filter brightness-0 invert group-hover:filter-none transition-all duration-500 drop-shadow-2xl" 
                />
                <span className="mt-8 text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-[#E2BA3D] transition-colors">{c.region}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-[1.8rem] md:text-4xl font-heading font-black text-[#213D7A] mb-16 tracking-widest uppercase">
            O nosso trabalho no Instagram
          </h3>
          
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-6 mb-16">
            {INSTAGRAM_POSTS.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.03 }}
                className={`relative overflow-hidden rounded-2xl shadow-xl w-full sm:w-[45%] md:w-1/4 aspect-square ${post.active ? 'bg-gray-400' : 'bg-gray-100'}`}
              >
                <img 
                  src={post.image} 
                  alt="Portfolio Instagram" 
                  className={`w-full h-full object-cover ${post.active ? 'opacity-70' : 'opacity-100'}`} 
                />
                {post.active && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Instagram className="w-12 h-12 text-white" />
                  </div>
                )}
                {post.active && (
                   <div className="absolute top-4 right-4 w-3 h-3 bg-[#E2BA3D] rounded-full shadow-lg" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWhatsApp()}
            className="px-8 py-3 rounded-full border border-[#213D7A] text-[10px] font-bold text-[#213D7A] uppercase tracking-widest hover:bg-[#213D7A] hover:text-white transition-all duration-300"
          >
            Ver portfólio completo
          </motion.button>
        </div>
      </section>

      <section id="contacto" className="py-24 md:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-7xl font-heading font-black mb-6 uppercase text-balance">VAMOS ESCALAR?</h3>
            <p className="text-[#213D7A]/40 font-bold uppercase text-[10px] tracking-[0.3em]">Preencha para receber uma proposta exclusiva.</p>
          </div>
          
          <form className="space-y-12" onSubmit={handleFormSubmit}>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group border-b border-gray-100 focus-within:border-[#213D7A] transition-colors">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Seu Nome</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent py-4 focus:outline-none text-lg font-medium" 
                  placeholder="Ex: João Silva"
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
                  placeholder="joao@empresa.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
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
              Iniciar Conversa
            </motion.button>
          </form>
        </div>
      </section>

      <footer className="py-20 bg-white border-t-2 border-gray-50 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" alt="WEE" className="h-10 opacity-100 hover:scale-105 transition-transform cursor-pointer" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex gap-12 text-[11px] font-black uppercase tracking-widest">
              <a 
                href="https://www.instagram.com/munikrangel/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#213D7A] hover:text-[#961D1D] transition-all relative group"
              >
                Instagram
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#961D1D] group-hover:w-full transition-all duration-300"></span>
              </a>
              <button 
                onClick={() => openWhatsApp()}
                className="text-[#213D7A] hover:text-[#961D1D] transition-all relative group uppercase"
              >
                WhatsApp
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#961D1D] group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[9px] font-black text-[#213D7A] uppercase tracking-[0.2em]">
              © 2025 WEE MARKETING CRIADO POR: ETHOSS.X
            </p>
            <p className="text-[7px] font-bold opacity-20 uppercase tracking-widest text-balance">Elevando o Padrão de Conteúdo</p>
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
                <p className="text-base md:text-lg font-light opacity-60 leading-relaxed mb-12">
                  {selectedService.fullDescription}
                </p>
                <button 
                  onClick={() => openWhatsApp(`Olá! Gostaria de falar sobre o serviço: ${selectedService.title}`)}
                  className="w-full bg-[#213D7A] text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#961D1D] transition-all"
                >
                  Falar via WhatsApp
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
