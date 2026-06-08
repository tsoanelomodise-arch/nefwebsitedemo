import { ArrowRight, Briefcase, ShieldCheck, Users, Zap, Menu, X, ChevronRight, ChevronLeft, Play, CheckCircle2, ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import HowToApply from "./HowToApply";
import EntrepreneurshipFinance from "./EntrepreneurshipFinance";
import FundingCriteria from "./FundingCriteria";
import InvesteeStories from "./InvesteeStories";
import InvesteeStoryDetail from "./InvesteeStoryDetail";
import OurFunds from "./OurFunds";
import NonFinancialSupport from "./NonFinancialSupport";
import FundChatbot from "./components/FundChatbot";
import SectorFilter from "./components/SectorFilter";
import BackToTopButton from "./components/BackToTopButton";
import { NEF_FUNDS } from "./data/funds";

import MandateVisionMission from "./MandateVisionMission";
import FAQ from "./FAQ";
import CheckEligibility from "./CheckEligibility";
import PerformanceReport2025 from "./PerformanceReport2025";

const HERO_SLIDES = [
  {
    id: "01",
    subtitle: "we can absolutely help you",
    title: "Empowering Black Business",
    description: "The National Empowerment Fund is dedicated to the economic empowerment of black South Africans through innovative funding solutions.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    subtitle: "driving transformation",
    title: "Sustainable Economic Growth",
    description: "We provide financial and non-financial support to black-owned businesses, ensuring sustainable growth and economic transformation.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    subtitle: "funding the future",
    title: "Innovative Funding Solutions",
    description: "Our diverse range of funds is designed to meet the unique needs of black entrepreneurs across various sectors.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
  }
];

const NAV_LINKS = [
  { id: "01", title: "Home", href: "#home", isExternal: false },
  { 
    id: "02", 
    title: "About", 
    href: "#about", 
    isExternal: false,
    subLinks: [
      { id: "02a", title: "Mandate, Vision & Mission", href: "/about/mandate-vision-mission", isExternal: true }
    ]
  },
  { 
    id: "03", 
    title: "Funding Solutions", 
    href: "#funds",
    isExternal: false,
    subLinks: [
      { id: "03a", title: "Our Funds", href: "/our-funds", isExternal: true },
      { id: "03b", title: "Non-Financial Support", href: "/non-financial-support", isExternal: true },
      { id: "03c", title: "How to Apply", href: "/how-to-apply", isExternal: true },
      { id: "03d", title: "Funding Criteria", href: "/funding-criteria", isExternal: true },
      { id: "03e", title: "Check Eligibility", href: "/check-eligibility", isExternal: true }
    ]
  },
  { id: "04", title: "Investee Stories", href: "/investee-stories", isExternal: true },
  { id: "05", title: "FAQ", href: "/faq", isExternal: true },
  { id: "06", title: "Performance Report 2025", href: "/performance-report-2025", isExternal: true },
  { id: "07", title: "Contact", href: "#contact", isExternal: false }
];

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // Fallback for any layout shifts or browser scroll restoration
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(() => {
    return localStorage.getItem("nef-sidebar-hidden") === "true";
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarHidden(prev => {
      const newVal = !prev;
      localStorage.setItem("nef-sidebar-hidden", String(newVal));
      return newVal;
    });
  };
  const [activeSection, setActiveSection] = useState("01");
  const location = useLocation();
  const navigate = useNavigate();

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const isSubPage = location.pathname !== "/";

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isSubPage) {
        if (location.pathname.startsWith("/about/")) {
          setActiveSection("02");
        } else if (location.pathname.startsWith("/products/") || location.pathname === "/how-to-apply" || location.pathname === "/funding-criteria" || location.pathname === "/our-funds" || location.pathname === "/non-financial-support") {
          setActiveSection("03");
        } else if (location.pathname.startsWith("/investee-stories")) {
          setActiveSection("04");
        } else if (location.pathname === "/") {
          setActiveSection("01");
        }
        return;
      }
      
      const sections = NAV_LINKS.filter(link => !link.isExternal).map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, i) => {
        if (section) {
          const top = (section as HTMLElement).offsetTop;
          const height = (section as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Find the corresponding NAV_LINK id
            const actualLink = NAV_LINKS.filter(link => !link.isExternal)[i];
            setActiveSection(actualLink.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubPage, location.pathname]);
  const [selectedFund, setSelectedFund] = useState<typeof NEF_FUNDS[0] | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [comparisonList, setComparisonList] = useState<typeof NEF_FUNDS>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredFunds = selectedSector === "All" 
    ? NEF_FUNDS 
    : NEF_FUNDS.filter(fund => fund.details.sectors.includes(selectedSector));

  const toggleComparison = (fund: typeof NEF_FUNDS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setComparisonList(prev => {
      if (prev.find(f => f.id === fund.id)) {
        return prev.filter(f => f.id !== fund.id);
      }
      if (prev.length >= 3) return prev; // Limit to 3 for side-by-side readability
      return [...prev, fund];
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black flex flex-col md:flex-row">
      <ScrollToTop />
      {/* Sticky Sidebar Navigation */}
      <div className={`hidden md:flex w-1/3 h-screen bg-forest-earth flex-col justify-between p-16 text-white fixed top-0 left-0 z-[100] border-r border-white/5 transition-transform duration-500 ease-in-out ${isSidebarHidden ? "-translate-x-full" : "translate-x-0"}`}>
        <div className="space-y-24">
          <div className="flex items-center justify-between">
            <img src="https://empowerment-pulse-tracker.lovable.app/assets/nef-logo-B_u3VTf0.png" alt="NEF Logo" className="h-24 w-auto object-contain" />
            <button
              onClick={toggleSidebar}
              title="Hide Navigation Menu"
              className="p-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-gold-foil hover:bg-gold-foil hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
          
          <div className="space-y-12">
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <div 
                  key={link.id} 
                  className="space-y-4"
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <button 
                    onClick={() => {
                      if (link.isExternal) {
                        navigate(link.href);
                      } else {
                        if (isSubPage) {
                          navigate("/");
                          setTimeout(() => {
                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        } else {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="group flex items-center gap-6 text-left w-full"
                  >
                    <span className={`text-xs font-bold transition-colors ${activeSection === link.id ? "text-gold-foil" : "opacity-40 group-hover:opacity-100"}`}>
                      {link.id}
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold uppercase tracking-widest transition-all ${activeSection === link.id ? "text-white translate-x-2" : "opacity-20 group-hover:opacity-60"}`}>
                        {link.title}
                      </span>
                      {link.subLinks && (
                        <div className="h-0.5 bg-gold-foil mt-1 transition-all duration-500 origin-left" style={{ width: hoveredLink === link.id ? '100%' : '0%' }}></div>
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {link.subLinks && (hoveredLink === link.id || (activeSection === link.id && !hoveredLink)) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="ml-12 flex flex-col gap-4 overflow-hidden"
                      >
                        {link.subLinks.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              if (sub.isExternal) {
                                navigate(sub.href);
                              } else {
                                document.querySelector(sub.href)?.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="group flex items-center gap-4 text-left font-mono"
                          >
                            <div className={`w-1 h-1 bg-gold-foil transition-transform ${location.pathname === sub.href ? "scale-100" : "scale-0"}`}></div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${location.pathname === sub.href ? "text-gold-foil" : "opacity-30 group-hover:opacity-100"}`}>
                              {sub.title}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-6">
            <a 
              href="https://twitter.com/nefcorp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-gold-foil transition-all duration-300"
            >
              Twitter
            </a>
            <a 
              href="https://www.linkedin.com/company/national-empowerment-fund" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-gold-foil transition-all duration-300"
            >
              LinkedIn
            </a>
          </div>
          <div className="space-y-2">
            <div className="h-px w-12 bg-gold-foil"></div>
            <div className="h-px w-8 bg-white opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`md:hidden fixed top-0 left-0 w-full z-[110] flex justify-between items-center px-8 py-6 transition-colors duration-500 ease-in-out ${isMenuOpen ? "bg-black" : "bg-transparent"}`}>
        <div className={`transition-all duration-500 ${isMenuOpen ? "text-white" : "text-white mix-blend-difference"}`}>
          <img src="https://empowerment-pulse-tracker.lovable.app/assets/nef-logo-B_u3VTf0.png" alt="NEF Logo" className="h-12 w-auto object-contain" />
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:opacity-70 transition-opacity relative w-10 h-10 flex items-center justify-center z-[120]"
        >
          <div>
            {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white mix-blend-difference" />}
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[105] bg-black text-white p-12 flex flex-col justify-center overflow-y-auto will-change-transform"
          >
            <div className="flex flex-col gap-8 mt-20">
              {NAV_LINKS.map((link, i) => (
                <div 
                  key={link.id} 
                  className="space-y-4"
                >
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (link.isExternal) {
                        navigate(link.href);
                      } else {
                        if (isSubPage) {
                          navigate("/");
                          setTimeout(() => {
                            document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        } else {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="text-4xl font-bold uppercase tracking-tighter text-left group"
                  >
                    <span className={`transition-colors duration-300 ${activeSection === link.id ? "text-gold-foil" : "opacity-40 group-hover:opacity-100"}`}>
                      {link.title}
                    </span>
                  </button>
                  {link.subLinks && (
                    <div 
                      className="flex flex-col gap-4 pl-4 border-l border-white/10 overflow-hidden"
                    >
                      {link.subLinks.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setIsMenuOpen(false);
                            if (sub.isExternal) {
                              navigate(sub.href);
                            } else {
                              document.querySelector(sub.href)?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className={`text-xl font-bold uppercase tracking-widest text-left transition-colors duration-300 ${location.pathname === sub.href ? "text-gold-foil" : "opacity-30 hover:opacity-100"}`}
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Sidebar Floating Button (Desktop only, when hidden) */}
      <AnimatePresence>
        {isSidebarHidden && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSidebar}
            title="Show Navigation Menu"
            className="hidden md:flex fixed top-8 left-8 z-[110] items-center gap-2 bg-neutral-900/95 text-white border border-white/15 px-4 py-2.5 rounded-full hover:bg-gold-foil hover:text-black hover:border-gold-foil transition-all duration-300 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-black/40 group cursor-pointer"
          >
            <Menu size={14} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Show Menu</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`w-full transition-all duration-500 ease-in-out ${isSidebarHidden ? "md:w-full md:ml-0" : "md:w-2/3 md:ml-[33.333%]"}`}>
        <Routes>
          <Route path="/about/mandate-vision-mission" element={<MandateVisionMission />} />
          <Route path="/our-funds" element={<OurFunds />} />
          <Route path="/non-financial-support" element={<NonFinancialSupport />} />
          <Route path="/how-to-apply" element={<HowToApply />} />
          <Route path="/funding-criteria" element={<FundingCriteria />} />
          <Route path="/investee-stories" element={<InvesteeStories />} />
          <Route path="/investee-stories/:id" element={<InvesteeStoryDetail />} />
          <Route path="/products/entrepreneurship-finance" element={<EntrepreneurshipFinance />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/check-eligibility" element={<CheckEligibility />} />
          <Route path="/performance-report-2025" element={<PerformanceReport2025 />} />
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <section id="home" className="relative h-screen overflow-hidden bg-[#FAF6F0]">
                <div className="absolute inset-0">
                  {/* Image Background */}
                  <div className="absolute inset-0 bg-[#EFE6DA]/85 z-0"></div>
                  <div className="absolute inset-0 z-10 transition-all duration-1000 ease-in-out">
                    <img 
                      src={HERO_SLIDES[currentSlide].image} 
                      alt={HERO_SLIDES[currentSlide].title} 
                      className="w-full h-full object-cover grayscale opacity-30 contrast-110 scale-102 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-[#FAF6F0]/65 z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FFF1E6]/40 z-10"></div>
                  </div>

                  {/* Content Box */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-24 max-w-7xl mx-auto">
                    <div className="glass-card p-10 md:p-16 rounded-[2.5rem] max-w-2xl shadow-[0_40px_100px_rgba(42,38,34,0.08)] animate-in fade-in zoom-in-95 duration-700 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#E89D7A]/10 rounded-full blur-3xl pointer-events-none"></div>
                      
                      {/* Category Tag Inspired by Reference Screen Pill Design */}
                      <span className="inline-block px-4 py-1.5 rounded-full bg-[#E89D7A] text-[#1E1B18] text-[9px] font-bold uppercase tracking-widest mb-6 border border-white/40 shadow-sm shadow-[#E89D7A]/25">
                        NEF Catalyst
                      </span>

                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light text-[#1E1B18] leading-[1.08] mb-6 uppercase tracking-tight">
                        {HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                          <React.Fragment key={i}>
                            {i === 1 ? <span className="font-serif italic text-peach-accent text-glow-peach">{word}</span> : word}{' '}
                            {i === 0 && <br />}
                          </React.Fragment>
                        ))}
                      </h1>
                      
                      <p className="text-[#3A3530] text-sm md:text-base max-w-md mb-8 leading-relaxed font-light">
                        {HERO_SLIDES[currentSlide].description}
                      </p>

                      {/* Pill Sliders Inspired by Reference */}
                      <div className="flex gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                          className="w-11 h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-[#1E1B18] hover:bg-[#E89D7A] hover:text-white hover:border-[#E89D7A] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                          className="w-11 h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-[#1E1B18] hover:bg-[#E89D7A] hover:text-white hover:border-[#E89D7A] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide Indicators - Styled elegantly */}
                <div className="absolute bottom-12 right-8 md:right-16 z-30 flex gap-2 w-auto bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/50">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === i ? "w-8 bg-[#E58E62]" : "w-1.5 bg-[#1E1B18]/25 hover:bg-[#1E1B18]/45"}`}
                    />
                  ))}
                </div>
              </section>

              {/* About Section */}
              <section id="about" className="py-24 px-8 md:px-24 bg-[#FAF8F5] relative overflow-hidden border-b border-[#FAF6F0]">
                <div className="absolute top-0 right-1/4 w-px h-full bg-[#1E1B18]/5"></div>
                <div className="absolute top-1/3 right-0 w-1/4 h-px bg-[#1E1B18]/5"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto relative z-10">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-[#E89D7A]"></div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C79F6E]">Our Legacy</span>
                      <Zap size={14} className="text-[#E89D7A]" />
                    </div>
                    <p className="text-[#3A3530] max-w-md leading-relaxed text-base md:text-lg font-light">
                      The NEF provides financial and non-financial support to black-owned businesses, ensuring sustainable growth and economic transformation.
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light text-[#1E1B18] tracking-tight leading-none uppercase">
                      About Our <br />
                      <span className="text-[#FAF6F0] bg-[#1E1B18] px-5 py-2 inline-block rounded-2xl transform -rotate-1 shadow-md font-sans text-3xl md:text-4xl mt-3">Mission</span>
                    </h2>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-[#EFE6DA] rounded-[2.5rem] overflow-hidden relative group shadow-[0_24px_60px_rgba(42,38,34,0.08)] border border-white/60">
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                        alt="Culture" 
                        className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/40 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          className="w-16 h-16 bg-[#E89D7A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E58E62] hover:scale-110 active:scale-95 transition-all duration-300 relative group"
                        >
                          <span className="absolute inset-x-0 inset-y-0 rounded-full bg-[#E89D7A]/30 group-hover:animate-ping"></span>
                          <Play fill="white" size={18} className="relative z-10 text-white translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute -bottom-8 -left-8 bg-white border border-neutral-100 p-6 rounded-3xl shadow-[0_30px_60px_rgba(42,38,34,0.06)] max-w-xs hidden md:block group hover:-translate-y-1 transition-transform duration-500">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#E58E62] border border-neutral-100 group-hover:bg-[#E89D7A] group-hover:text-white transition-colors duration-300">
                          <ArrowRight size={14} />
                        </div>
                        <button 
                          onClick={() => navigate("/about/mandate-vision-mission")}
                          className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18]"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Funds Grid */}
              <section id="funds" className="py-24 px-8 md:px-24 bg-[#FCFAF7]">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 max-w-7xl mx-auto">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light text-[#1E1B18] tracking-tight leading-none uppercase">
                    Our <span className="text-[#FAF6F0] bg-[#1E1B18] px-5 py-2 rounded-2xl text-xl md:text-4xl inline-block shadow-md font-sans">Funds</span>
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    <SectorFilter 
                      selectedSector={selectedSector} 
                      onSelectSector={setSelectedSector} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                  {filteredFunds.map((fund, index) => (
                    <div
                      key={fund.id}
                      onClick={() => setSelectedFund(fund)}
                      className={`p-10 md:p-12 bg-white border border-[#EFE6DA]/85 rounded-[2.2rem] group relative overflow-hidden min-h-[420px] flex flex-col justify-between cursor-pointer transition-all duration-500 hover:shadow-[0_32px_80px_rgba(42,38,34,0.06)] transform hover:-translate-y-1 ${
                        comparisonList.find(f => f.id === fund.id) 
                          ? "ring-2 ring-[#E89D7A] ring-inset shadow-xl scale-[0.99]" 
                          : ""
                      }`}
                    >
                      <div className="relative z-10 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-black text-[#E89D7A] tracking-widest">{fund.id}</span>
                          {comparisonList.find(f => f.id === fund.id) && (
                            <div className="bg-[#E89D7A] text-[#1E1B18] rounded-full p-0.5">
                              <CheckCircle2 size={12} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={(e) => toggleComparison(fund, e)}
                          className={`text-[8px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${
                            comparisonList.find(f => f.id === fund.id)
                              ? "bg-[#1E1B18] text-white border-[#1E1B18]"
                              : "border-[#1E1B18]/10 text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white hover:border-[#1E1B18]"
                          }`}
                        >
                          {comparisonList.find(f => f.id === fund.id) ? "Selected" : "+ Compare"}
                        </button>
                      </div>

                      <div className="relative z-10 my-8">
                        <h3 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight text-[#1E1B18] mb-4">{fund.title}</h3>
                        <p className="text-neutral-500 text-xs md:text-sm max-w-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-500 ease-in-out leading-relaxed font-light">
                          {fund.description}
                        </p>
                      </div>
                      
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="w-11 h-11 rounded-full bg-[#1E1B18] flex items-center justify-center text-white group-hover:bg-[#E89D7A] group-hover:text-white transition-colors duration-300 shadow-sm">
                          <fund.icon size={18} />
                        </div>
                        <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18]">Learn More</span>
                          <ArrowRight size={12} className="text-[#1E1B18]" />
                        </div>
                      </div>

                      {/* Accent image background overlay */}
                      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 group-hover:opacity-10 transition-all duration-700 ease-out transform pointer-events-none group-hover:scale-105">
                        <img 
                          src={fund.image} 
                          alt={fund.title} 
                          className="w-full h-full object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Success Stories Preview Section */}
              <section className="py-24 px-8 md:px-24 bg-[#1E1B18] text-white overflow-hidden relative border-t border-white/5">
                <div className="absolute top-0 left-1/2 w-px h-full bg-white opacity-5"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-white opacity-5"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative z-10 max-w-7xl mx-auto">
                  <div className="space-y-12">
                    <div className="space-y-6">
                      <span className="text-[#E89D7A] text-[9px] font-bold uppercase tracking-[0.25em] block">Impact & Transformation</span>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight leading-none uppercase">
                        INVESTEE <br />
                        <span className="font-serif italic text-[#E89D7A]">STORIES</span>
                      </h2>
                    </div>
                    
                    <p className="text-white/50 text-sm md:text-base max-w-md font-light leading-relaxed">
                      Discover how the NEF has partnered with black entrepreneurs to build sustainable businesses and create lasting economic impact across South Africa.
                    </p>

                    <button 
                      onClick={() => navigate("/investee-stories")}
                      className="group flex items-center gap-6 text-left"
                    >
                      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#E89D7A] group-hover:bg-[#E89D7A] hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                        <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold uppercase tracking-widest block text-[#C79F6E] group-hover:text-[#E89D7A] transition-colors">View All Stories</span>
                        <span className="text-[9px] font-mono tracking-widest font-bold uppercase opacity-30 block">Real Impact. Real People.</span>
                      </div>
                    </button>
                  </div>

                  <div className="relative grid grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div 
                        onClick={() => navigate("/investee-stories/the-orchards")}
                        className="aspect-[3/4] bg-[#2C2621]/80 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/5 shadow-xl"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1555633514-abcee6ad93e1?q=80&w=1000&auto=format&fit=crop" 
                          alt="Story 1" 
                          className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                          <span className="text-[8px] font-bold uppercase tracking-widest bg-[#E89D7A] text-[#1E1B18] px-4 py-1.5 rounded-full shadow-lg">Retail</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                            <ArrowRight size={12} className="text-white" />
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={() => navigate("/investee-stories/busamed-healthcare")}
                        className="aspect-square bg-[#2C2621]/80 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/5 shadow-xl"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop" 
                          alt="Story 2" 
                          className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                          <span className="text-[8px] font-bold uppercase tracking-widest bg-[#E89D7A] text-[#1E1B18] px-4 py-1.5 rounded-full shadow-lg">Healthcare</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                            <ArrowRight size={12} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 pt-12">
                      <div 
                        onClick={() => navigate("/investee-stories/mamelodi-square")}
                        className="aspect-square bg-[#2C2621]/80 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/5 shadow-xl"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" 
                          alt="Story 3" 
                          className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                          <span className="text-[8px] font-bold uppercase tracking-widest bg-[#E89D7A] text-[#1E1B18] px-4 py-1.5 rounded-full shadow-lg">Property</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                            <ArrowRight size={12} className="text-white" />
                          </div>
                        </div>
                      </div>
                      <div 
                        onClick={() => navigate("/investee-stories")}
                        className="aspect-[3/4] bg-[#2C2621]/80 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-white/5 shadow-xl"
                      >
                        <img 
                          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop" 
                          alt="Story 4" 
                          className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                          <span className="text-[8px] font-bold uppercase tracking-widest bg-[#E89D7A] text-[#1E1B18] px-4 py-1.5 rounded-full shadow-lg">Services</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                            <ArrowRight size={12} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Team/Impact Section */}
              <section className="bg-[#161412] py-28 px-8 md:px-24 text-white overflow-hidden border-t border-white/5 relative">
                <div className="absolute top-0 right-10 w-44 h-44 bg-[#E89D7A]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-10 w-44 h-44 bg-[#C79F6E]/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
                  <span className="text-[#C79F6E] text-[10px] font-mono uppercase tracking-[0.4em] mb-4 block">A Legacy of Empowerment</span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight mb-10 leading-none">
                    "We are a team of visionaries, <br />
                    <span className="font-serif italic text-peach-accent text-glow-peach">shaping the future</span> of SA."
                  </h2>
                  <div className="flex justify-center gap-12">
                    <div className="text-center px-8 py-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm shadow-xl">
                      <div className="text-4xl md:text-5xl font-light text-[#E89D7A] mb-1 font-sans">R10B+</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest opacity-40">Disbursed</div>
                    </div>
                    <div className="text-center px-8 py-4 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm shadow-xl">
                      <div className="text-4xl md:text-5xl font-light text-[#E89D7A] mb-1 font-sans">1000+</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest opacity-40">Businesses</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                  <div className="space-y-6 flex flex-col justify-center">
                    <span className="text-[#E89D7A] text-xs font-mono uppercase tracking-widest">In-house leadership</span>
                    <h3 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight text-white leading-tight">Check our <br /> in-house team</h3>
                    <div className="h-0.5 w-16 bg-[#E89D7A] rounded-full"></div>
                  </div>
                  
                  <div className="relative group">
                    <div className="aspect-[3/4] bg-neutral-900 rounded-[2.2rem] overflow-hidden relative border border-white/5 shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                        alt="Team" 
                        className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-70 group-hover:scale-102 transition-all duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 right-6 bg-[#E89D7A]/95 text-[#1E1B18] text-[8px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Insert Eyes</div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                        <div className="flex justify-between items-end">
                          <div>
                            <h4 className="font-sans font-light text-lg text-white uppercase tracking-tight">Mike</h4>
                            <p className="text-[10px] text-[#E89D7A] font-mono opacity-80 mt-0.5">da spike!</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#E89D7A] group-hover:text-white transition-all duration-300">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="aspect-[3/4] bg-neutral-900 rounded-[2.2rem] overflow-hidden relative border border-white/5 shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" 
                        alt="Team" 
                        className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-70 group-hover:scale-102 transition-all duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-6 right-6 bg-[#E89D7A]/95 text-[#1E1B18] text-[8px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Insert Eyes</div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                        <div className="flex justify-between items-end">
                          <div>
                            <h4 className="font-sans font-light text-lg text-white uppercase tracking-tight">Steven</h4>
                            <p className="text-[10px] text-[#E89D7A] font-mono opacity-80 mt-0.5">da handy!</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-[#E89D7A] group-hover:text-white transition-all duration-300">
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-28 px-8 md:px-24 bg-gradient-to-br from-[#E89D7A] to-[#E58E62] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-3xl mx-auto relative z-10">
                  <span className="text-[#1E1B18] text-[9px] font-bold uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight mb-10 text-[#1E1B18] uppercase leading-none">
                    Got some questions?
                  </h2>
                  <button 
                    className="group relative px-10 py-4 bg-[#1E1B18] text-white font-bold uppercase text-[10px] tracking-widest overflow-hidden rounded-full shadow-xl hover:scale-105 duration-300"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-[#1E1B18] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">Send Message</span>
                  </button>
                  <p className="mt-10 text-xs font-semibold text-[#1E1B18]/75 tracking-wider">
                    or reach us via <a href="mailto:hello@nefcorp.co.za" className="border-b border-[#1E1B18] font-bold hover:opacity-100 transition-opacity">hello@nefcorp.co.za</a>
                  </p>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-[#FAF8F5] py-12 px-8 md:px-24 border-t border-[#EFE6DA]/40 flex flex-col md:flex-row justify-between items-center gap-8 text-[#1E1B18]">
                <div className="text-[10px] font-bold tracking-widest uppercase opacity-40">© 2026 NEF CORP. ALL RIGHTS RESERVED.</div>
                <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
                  <a 
                    href="#" 
                    className="transition-colors hover:text-[#E89D7A]"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/national-empowerment-fund" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#E89D7A]"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://twitter.com/nefcorp" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-[#E89D7A]"
                  >
                    Twitter
                  </a>
                </div>
              </footer>
            </>
          } />
        </Routes>
        <FundChatbot />
        <BackToTopButton hasActiveComparison={comparisonList.length > 0} />
      </main>

      {/* Comparison Bar */}
      {comparisonList.length > 0 && (
        <div
          className="fixed bottom-0 left-0 w-full bg-black text-white z-[60] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-1">Comparison</span>
              <span className="text-sm font-bold">{comparisonList.length} Funds Selected</span>
            </div>
            <div className="flex gap-2">
              {comparisonList.map(fund => (
                <div key={fund.id} className="relative group">
                  <button 
                    onClick={() => setComparisonList(prev => prev.filter(f => f.id !== fund.id))}
                    className={`w-12 h-12 ${fund.color} flex items-center justify-center transition-transform hover:scale-110 active:scale-95`}
                    title={`Remove ${fund.title}`}
                  >
                    <fund.icon size={20} className="text-black" />
                  </button>
                  <div className="absolute -top-2 -right-2 bg-gold-foil text-black rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <X size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={() => setComparisonList([])}
                className="flex-1 md:flex-none px-8 py-3 text-xs font-bold uppercase tracking-widest border border-white/20 transition-colors hover:bg-white/10"
              >
                Clear
              </button>
              <button 
                onClick={() => setShowComparison(true)}
                disabled={comparisonList.length < 2}
                className="flex-1 md:flex-none px-8 py-3 bg-gold-foil text-black text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-foil/80"
              >
                Compare Now
              </button>
            </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
          <div
            onClick={() => setShowComparison(false)}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          
          <div
            className="relative w-full max-w-7xl bg-white overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="p-8 md:p-12 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Fund Comparison</h2>
              <button 
                onClick={() => setShowComparison(false)}
                className="p-2 bg-black text-white hover:bg-gold-foil hover:text-black transition-colors hover:rotate-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="min-w-[1000px] p-8 md:p-12">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-1/4 p-6 text-left bg-gray-50 border-b border-gray-200">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Features</span>
                      </th>
                      {comparisonList.map((fund) => (
                        <th key={fund.id} className="w-1/4 p-6 text-left border-b border-gray-200">
                          <div className="flex flex-col gap-4">
                            <div className={`w-12 h-12 ${fund.color} flex items-center justify-center`}>
                              <fund.icon size={24} className="text-black" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 block">{fund.id}</span>
                              <h3 className="text-xl font-bold uppercase tracking-tighter leading-none">{fund.title}</h3>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-6 bg-gray-50 align-top">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Objective</h4>
                      </td>
                      {comparisonList.map((fund) => (
                        <td key={fund.id} className="p-6 align-top">
                          <p className="text-sm text-gray-600 leading-relaxed italic">"{fund.details.objective}"</p>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-6 bg-gray-50 align-top">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Key Criteria</h4>
                      </td>
                      {comparisonList.map((fund) => (
                        <td key={fund.id} className="p-6 align-top">
                          <ul className="space-y-3">
                            {fund.details.criteria.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-xs text-gray-500">
                                <CheckCircle2 size={14} className="text-black mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-6 bg-gray-50 align-top">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Sectors</h4>
                      </td>
                      {comparisonList.map((fund) => (
                        <td key={fund.id} className="p-6 align-top">
                          <div className="flex flex-wrap gap-1.5">
                            {fund.details.sectors.map((sector, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 text-[9px] font-bold uppercase tracking-wider">
                                {sector}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-6 bg-gray-50 align-top">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Action</h4>
                      </td>
                      {comparisonList.map((fund) => (
                        <td key={fund.id} className="p-6 align-top">
                          <button 
                            onClick={() => {
                              setShowComparison(false);
                              setSelectedFund(fund);
                            }}
                            className="w-full py-3 border border-black text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                          >
                            View Full Details
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fund Detail Modal */}
      {selectedFund && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div
            onClick={() => setSelectedFund(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <div
            className="relative w-full max-w-5xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={() => setSelectedFund(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-black text-white hover:bg-gold-foil hover:text-black transition-colors hover:rotate-90"
            >
              <X size={24} />
            </button>

            <div className="w-full md:w-2/5 relative h-64 md:h-auto">
              <img 
                src={selectedFund.image} 
                alt={selectedFund.title} 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold-foil mix-blend-multiply opacity-40"></div>
              <div className="absolute bottom-8 left-8">
                <selectedFund.icon size={48} className="text-white" />
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-16 overflow-y-auto">
              <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 block">Fund Details / {selectedFund.id}</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 uppercase">{selectedFund.title}</h2>
              
              <div className="space-y-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold-foil"></div>
                    Objective
                  </h4>
                  <p className="text-xl text-gray-600 leading-relaxed italic">
                    "{selectedFund.details.objective}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-foil"></div>
                      Key Criteria
                    </h4>
                    <ul className="space-y-4">
                      {selectedFund.details.criteria.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                          <CheckCircle2 size={16} className="text-black mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-foil"></div>
                      Focus Sectors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFund.details.sectors.map((sector, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedFund.products && selectedFund.products.length > 0 && (
                  <div className="pt-12 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-foil"></div>
                      Available Products
                    </h4>
                    <div className="grid grid-cols-1 gap-6">
                      {selectedFund.products.map((product, i) => (
                        <div 
                          key={i} 
                          onClick={() => {
                            if (product.href) {
                              setSelectedFund(null);
                              navigate(product.href);
                            }
                          }}
                          className={`p-6 bg-gray-50 border-l-4 border-gold-foil group transition-all duration-300 hover:bg-black hover:text-white ${product.href ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <h5 className="font-bold uppercase tracking-tighter mb-2 group-hover:text-white transition-colors">{product.name}</h5>
                            {product.href && <ArrowRight size={16} className="text-gold-foil opacity-0 group-hover:opacity-100 transition-opacity" />}
                          </div>
                          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{product.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      setSelectedFund(null);
                      const ctaSection = document.getElementById('contact-section');
                      ctaSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gold-foil hover:text-black transition-colors flex items-center justify-center gap-4"
                  >
                    Apply Now <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
