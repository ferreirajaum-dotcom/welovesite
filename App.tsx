
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X, Mail, ChevronLeft, ChevronRight, ArrowRight, ChevronDown, Clapperboard, ThumbsUp, Camera, Lightbulb, Instagram } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';

// --- Constantes de Animação ---
const TRANSITION_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const ANIMATION_DURATION = 0.8;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: ANIMATION_DURATION, ease: TRANSITION_EASE }
  }
};

const serviceEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: TRANSITION_EASE }
  })
};

// --- Dados ---
const CLIENTS_BR = [
  { id: 'br1', name: 'Trisoft', image: 'https://i.postimg.cc/PqDDB7Bg/cliente-logo-1.png' },
  { id: 'br2', name: 'Clínica ISTO', image: 'https://i.postimg.cc/zfhh9Qsq/cliente-logo-2.png' },
  { id: 'br3', name: 'Priscila Mattos Venturi', image: 'https://i.postimg.cc/q7KK9FPJ/cliente-logo-3.png' },
  { id: 'br4', name: 'Anexo', image: 'https://i.postimg.cc/3wGGPqsK/cliente-logo-4.png' },
  { id: 'br5', name: 'NRC Arq Design', image: 'https://i.postimg.cc/3wGGPqsJ/cliente-logo-5.png' },
  { id: 'br6', name: 'CIDAD', image: 'https://i.postimg.cc/5tzzZrht/cliente-logo-6.png' },
  { id: 'br7', name: 'Simcauto', image: 'https://i.postimg.cc/50Mz13Jm/cliente-logo-19.png' },
  { id: 'br8', name: 'Adriana Farias', image: 'https://i.postimg.cc/kG2qp0Z3/cliente-logo-22.png' },
];

const CLIENTS_PT = [
  { id: 'pt1', name: 'RetailBox', image: 'https://i.postimg.cc/6QZZDPkq/cliente-logo-8.png' },
  { id: 'pt2', name: 'Alupoli', image: 'https://i.postimg.cc/W4ZZQyBt/cliente-logo-9.png' },
  { id: 'pt3', name: 'Cilene Lupi', image: 'https://i.postimg.cc/bvnnK572/cliente-logo-10.png' },
  { id: 'pt4', name: 'RLX Rollox', image: 'https://i.postimg.cc/85VvDHGP/cliente-logo-11.png' },
  { id: 'pt5', name: 'Escola de Empreendedores', image: 'https://i.postimg.cc/LsPPrWcg/cliente-logo-12.png' },
  { id: 'pt6', name: 'Angelina Bunselmeyer', image: 'https://i.postimg.cc/W3PZjnV1/cliente-logo-13.png' },
  { id: 'pt7', name: 'Croni', image: 'https://i.postimg.cc/PqDDB7gx/cliente-logo-7.png' },
];

const SERVICES = [
  {
    id: 1,
    icon: <Clapperboard className="w-8 h-8" />,
    title: "Videomaker",
    description: "Produzimos vídeos profissionais para empresas, profissionais independentes e público em geral.",
    fullDescription: "Produzimos vídeos profissionais para empresas, profissionais independentes e público em geral. Seja para registar eventos privados, criar conteúdos institucionais ou promover a sua marca, cuidamos de cada detalhe: captação de imagem, edição, guião, direcção e estratégia. Transformamos momentos em histórias que criam ligação e despertam emoção.",
    cta: "Solicite um orçamento",
    subText: "Vamos falar"
  },
  {
    id: 2,
    icon: <ThumbsUp className="w-8 h-8" />,
    title: "Gestão de Redes Sociais",
    description: "Gerimos as suas redes sociais de forma estratégica e criativa.",
    fullDescription: "Gerimos as suas redes sociais de forma estratégica e criativa. Atuamos no Instagram, Facebook, YouTube e LinkedIn, desenvolvendo conteúdos relevantes, planeando publicações, interagindo com a audiência e analisando métricas para reforçar a presença digital da sua marca.",
    cta: "Solicite um orçamento",
    subText: "Vamos pensar juntos"
  },
  {
    id: 3,
    icon: <Camera className="w-8 h-8" />,
    title: "Formação",
    description: "Aprenda a criar vídeos profissionais utilizando apenas o seu telemóvel.",
    fullDescription: "Aprenda a criar vídeos profissionais utilizando apenas o seu telemóvel. Formação prática para todo o tipo de público, que combina técnicas de captação, edição e sensibilidade artística. Ideal para quem pretende produzir conteúdos de qualidade sem recorrer a equipamentos dispendiosos.",
    cta: "Saiba mais como funciona",
    subText: "Descobrir como funciona"
  },
  {
    id: 4,
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Consultoria",
    description: "Consultoria personalizada ao vivo com a Munik Rangel.",
    fullDescription: "Consultoria personalizada ao vivo com a Munik Rangel. Para profissionais de qualquer área que pretendem criar conteúdos em vídeo, mas não sabem por onde começar. Orientação sobre luz portátil, microfone, cenário, funcionalidades do Instagram, técnicas de captação, edição e estratégias de publicação. Tudo online, ao seu ritmo.",
    cta: "Agende a sua consultoria",
    subText: "Explica melhor"
  }
];

const UNIQUE_ITEMS = [
  {
    title: "Produção de conteúdos em vídeo com telemóvel que contam a sua história com emoção e impacto",
    answer: "Utilizamos técnicas profissionais de captação e edição mobile, criando vídeos autênticos que ligam emocionalmente com o seu público."
  },
  {
    title: "Estratégia digital adaptada à identidade e aos objetivos da sua marca",
    answer: "Desenvolvemos um plano personalizado de conteúdo alinhado aos valores da sua marca e focado em resultados reais."
  },
  {
    title: "Há SEMPRE um plano exclusivo feito à sua medida.",
    answer: "Cada projeto é único. Analisamos o seu negócio para criar uma estratégia 100% personalizada."
  }
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [clientPage, setClientPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const clientsPerPage = isMobile ? 6 : 15;
  const allClients = [...CLIENTS_PT, ...CLIENTS_BR]; 
  const totalClientPages = Math.ceil(allClients.length / clientsPerPage);
  const visibleClients = allClients.slice(clientPage * clientsPerPage, (clientPage + 1) * clientsPerPage);

  const handlePrevClient = () => setClientPage((prev) => (prev - 1 + totalClientPages) % totalClientPages);
  const handleNextClient = () => setClientPage((prev) => (prev + 1) % totalClientPages);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#213D7A] selection:bg-[#E2BA3D] selection:text-[#213D7A] bg-white">
      <CustomCursor />
      <FluidBackground />

      {/* TOP CRAWL BAR */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#961D1D] text-white py-2 overflow-hidden border-b border-[#E2BA3D]">
        <motion.div 
          className="whitespace-nowrap flex items-center gap-8"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-bold uppercase tracking-tighter text-sm">Em breve: 4º Workshop de Vídeos e Edição com Telemóvel!</span>
              <a 
                href="https://forms.gle/F4SHYr5nRvPWCscQ9" 
                target="_blank" 
                className="bg-[#E2BA3D] text-[#213D7A] px-3 py-0.5 rounded-full text-[10px] font-black uppercase hover:scale-105 transition-transform"
              >
                Pré-inscrição aqui
              </a>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-9 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-white/90 backdrop-blur-md border-b border-[#213D7A]/10 shadow-sm"
      >
        <div className="z-50 cursor-pointer" onClick={() => scrollToSection('inicio')}>
           <img 
             src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" 
             alt="WEE MARKETING" 
             className="h-8 md:h-10 w-auto object-contain"
           />
        </div>
        
        <div className="hidden lg:flex gap-8 text-[11px] font-bold tracking-widest uppercase">
          {['Início', 'O que fazemos', 'Quem somos', 'Clientes', 'Portefólio', 'Contacto'].map((label) => (
            <button 
              key={label} 
              onClick={() => scrollToSection(label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-'))}
              className="hover:text-[#961D1D] transition-colors relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#961D1D] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <button 
          className="lg:hidden text-[#213D7A] z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-30 bg-[#213D7A] flex flex-col items-center justify-center gap-8 text-white"
          >
            {['Início', 'O que fazemos', 'Quem somos', 'Clientes', 'Portefólio', 'Contacto'].map((label) => (
              <button
                key={label}
                onClick={() => scrollToSection(label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-'))}
                className="text-3xl font-heading font-bold uppercase"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="inicio" className="relative h-screen flex flex-col items-center justify-center pt-20">
        <div className="max-w-5xl mx-auto px-6 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-heading font-black leading-[1.1] mb-6"
          >
            Transformamos presença digital em resultados reais.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-light mb-10 text-[#213D7A]/80 max-w-3xl mx-auto"
          >
            Estratégia, Formação, Conteúdo e Criatividade para marcas que querem crescer no digital.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contacto')}
            className="bg-[#213D7A] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:bg-[#961D1D] transition-colors"
          >
            Fale connosco
          </motion.button>
        </div>
        
        {/* Video Background */}
        <div className="absolute inset-0 -z-10 opacity-10 flex items-center justify-center overflow-hidden">
           <iframe 
             src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ" 
             className="w-[150%] h-[150%] object-cover pointer-events-none"
             title="Munik Intro"
           ></iframe>
        </div>
      </header>

      {/* SERVIÇOS SECTION */}
      <section id="o-que-fazemos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase mb-4">O que fazemos</h2>
            <div className="w-20 h-1.5 bg-[#E2BA3D] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={serviceEntranceVariants}
                className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-shadow group"
              >
                <div>
                  <div className="text-[#E2BA3D] mb-6 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                  <h3 className="text-xl font-heading font-bold mb-4">{service.title}</h3>
                  <p className="text-sm text-[#213D7A]/70 mb-8 leading-relaxed line-clamp-4">{service.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="text-[10px] font-black uppercase tracking-widest bg-[#213D7A] text-white py-3 rounded-full hover:bg-[#961D1D] transition-colors"
                  >
                    {service.cta}
                  </button>
                  <span className="text-[9px] uppercase font-bold text-center opacity-40">{service.subText}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE NOS TORNA ÚNICOS */}
      <section className="py-20 bg-[#213D7A] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase mb-12">O que nos torna únicos</h2>
          <div className="space-y-4">
            {UNIQUE_ITEMS.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
                <h3 className="font-bold text-lg mb-2 text-[#E2BA3D]">{item.title}</h3>
                <p className="text-sm opacity-80">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS SECTION - FUNDO BRANCO */}
      <section id="quem-somos" className="py-24 bg-white text-[#213D7A] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-4">Munik Rangel</h2>
                <p className="text-lg font-light text-[#961D1D]">Nós somos uma agência de marketing que atende clientes no Brasil e em Portugal.</p>
              </div>
              
              <ul className="space-y-4 list-disc pl-5 marker:text-[#E2BA3D] text-sm md:text-base opacity-90 leading-relaxed font-light">
                <li>Estratega de marketing brasileira, há 27 anos.</li>
                <li>Certificada pela New York Film Academy.</li>
                <li>Experiência em grandes empresas como TV Globo, MTV, IBM, BASF e DELL.</li>
                <li>Head Customer Experience do app My Heineken.</li>
                <li>Nos últimos anos, dedica-se ao marketing digital, gestão de redes sociais e produção de conteúdo em vídeo.</li>
                <li>Ajuda marcas a fortalecer sua presença digital e aumentar sua percepção de valor.</li>
                <li>Na Europa, tem trabalhado com diferentes nichos como imobiliário, terapias, estética, restauração e medicina integrativa.</li>
                <li>Colaborou com duas revistas e coberturas de eventos em Lisboa, Paris e na Semana de Design de Milão.</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-64 w-full object-cover shadow-xl border border-gray-100" alt="Munik" />
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-64 w-full object-cover mt-8 shadow-xl border border-gray-100" alt="Munik Working" />
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-64 w-full object-cover -mt-8 shadow-xl border border-gray-100" alt="Team" />
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" className="rounded-2xl h-64 w-full object-cover shadow-xl border border-gray-100" alt="Success" />
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTES SECTION */}
      <section id="clientes" className="relative z-10 py-20 bg-[#213D7A] w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative">
          
          <motion.div 
            className="flex flex-col items-center justify-center mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
             <div className="w-24 h-[1px] bg-white mb-6 opacity-30"></div>
             <h2 className="text-4xl md:text-5xl font-heading font-black uppercase text-white tracking-widest">
              CLIENTES
            </h2>
          </motion.div>

          <div className="flex items-center justify-center relative">
             <button 
               type="button"
               onClick={handlePrevClient}
               className="hidden md:flex absolute -left-12 lg:-left-24 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-20"
             >
               <ChevronLeft className="w-10 h-10" />
             </button>

             <div className="w-full flex items-center justify-center min-h-[350px]">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={clientPage}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.4 }}
                   className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 w-full items-center justify-items-center"
                 >
                   {visibleClients.map((client, index) => (
                     <motion.div
                       key={client.id}
                       className="w-full flex flex-col items-center justify-center px-4"
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: index * 0.02 }}
                     >
                         <img 
                           src={client.image} 
                           alt={client.name} 
                           className="w-auto max-h-20 md:max-h-28 object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
                           loading="eager"
                         />
                         <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/40">{client.id.startsWith('pt') ? 'Portugal' : 'Brasil'}</span>
                     </motion.div>
                   ))}
                 </motion.div>
               </AnimatePresence>
             </div>

             <button 
               type="button"
               onClick={handleNextClient}
               className="hidden md:flex absolute -right-12 lg:-right-24 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-20"
             >
               <ChevronRight className="w-10 h-10" />
             </button>
          </div>

          <div className="flex md:hidden justify-center gap-12 mt-12">
             <button onClick={handlePrevClient} className="text-white/50"><ChevronLeft className="w-10 h-10" /></button>
             <button onClick={handleNextClient} className="text-white/50"><ChevronRight className="w-10 h-10" /></button>
          </div>
        </div>
      </section>

      {/* PORTEFOLIO SECTION */}
      <section id="portefolio" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-heading font-black uppercase mb-12">O nosso trabalho no Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative group cursor-pointer shadow-lg">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Instagram className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-12 text-[10px] font-black uppercase tracking-widest border-2 border-[#213D7A] px-10 py-4 rounded-full hover:bg-[#213D7A] hover:text-white transition-all shadow-md">
            Ver Portefólio Completo
          </button>
        </div>
      </section>

      {/* CONTACTO SECTION */}
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-4 leading-tight">A sua marca, mais forte no digital.</h2>
          <p className="text-lg opacity-60 mb-12 max-w-2xl mx-auto font-light">Estratégia, conteúdo e resultados que fazem crescer o seu negócio.</p>
          
          <form className="space-y-6 text-left bg-gray-50 p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nome</label>
                <input type="text" className="w-full bg-white border-b-2 border-gray-200 py-3 px-4 focus:outline-none focus:border-[#213D7A] rounded-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40">E-mail</label>
                <input type="email" className="w-full bg-white border-b-2 border-gray-200 py-3 px-4 focus:outline-none focus:border-[#213D7A] rounded-lg" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Mensagem</label>
              <textarea rows={4} className="w-full bg-white border-b-2 border-gray-200 py-3 px-4 focus:outline-none focus:border-[#213D7A] rounded-lg" />
            </div>
            <button className="w-full bg-[#213D7A] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#961D1D] transition-colors shadow-xl">Enviar Mensagem</button>
          </form>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <img 
            src="https://i.postimg.cc/wvL4w0q5/logo-wee.png" 
            alt="WEE MARKETING" 
            className="h-10 md:h-12 w-auto object-contain"
          />
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-40">
             <a href="https://www.instagram.com/wee_marketing/" target="_blank" className="hover:opacity-100 transition-opacity">Instagram</a>
             <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
             <a href="#" className="hover:opacity-100 transition-opacity">YouTube</a>
          </div>
          <p className="text-[10px] opacity-40 font-mono tracking-tighter">© 2025 WEE MARKETING. Criado por @ethoss.x</p>
        </div>
      </footer>

      {/* SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {selectedService && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 md:p-12"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-[#E2BA3D]">{selectedService.icon}</div>
                  <button onClick={() => setSelectedService(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X /></button>
                </div>
                <h3 className="text-3xl font-heading font-bold mb-6">{selectedService.title}</h3>
                <p className="text-lg opacity-70 leading-relaxed mb-10 whitespace-pre-line">{selectedService.fullDescription}</p>
                <button 
                  onClick={() => window.open('https://wa.me/', '_blank')}
                  className="w-full bg-[#213D7A] text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#961D1D] transition-colors"
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
