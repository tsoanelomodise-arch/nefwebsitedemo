import { ArrowRight, Briefcase, ShieldCheck, Users, Zap, Menu, X, ChevronRight, ChevronLeft, Play, CheckCircle2, ArrowLeft, ChevronDown, Twitter, Linkedin, Facebook, Youtube, Instagram, Search, Trash2, SlidersHorizontal, HelpCircle, MessageSquare, Phone, Eye, Target } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { PremiumIcon } from "./components/PremiumIcon";
import HowToApply from "./HowToApply";
import EntrepreneurshipFinance from "./EntrepreneurshipFinance";
import FundingCriteria from "./FundingCriteria";
import InvesteeStories from "./InvesteeStories";
import InvesteeStoryDetail from "./InvesteeStoryDetail";
import OurFunds from "./OurFunds";
import NonFinancialSupport from "./NonFinancialSupport";
import FundChatbot from "./components/FundChatbot";
import BackToTopButton from "./components/BackToTopButton";
import { NEF_FUNDS } from "./data/funds";
import { STORIES, getYouTubeEmbedUrl } from "./data/stories";

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
    image: "https://nef.wonderlandstudio.co.za/images/be58a4d8-d701-4998-b65a-6b3c7f29e28f.png"
  },
  {
    id: "02",
    subtitle: "driving transformation",
    title: "Sustainable Economic Growth",
    description: "We provide financial and non-financial support to black-owned businesses, ensuring sustainable growth and economic transformation.",
    image: "https://donotdelete.wonderlandstudio.co.za/nef/crane_image_202606291236.jpeg"
  },
  {
    id: "03",
    subtitle: "funding the future",
    title: "Innovative Funding Solutions",
    description: "Our diverse range of funds is designed to meet the unique needs of black entrepreneurs across various sectors.",
    image: "https://donotdelete.wonderlandstudio.co.za/nef/carpenter.jpeg"
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
    href: "/our-funds",
    isExternal: true,
    subLinks: [
      { id: "03b", title: "Portfolio Finder", href: "/our-funds", isExternal: true },
      { id: "03c", title: "Non-Financial Support", href: "/non-financial-support", isExternal: true },
      { id: "03d", title: "How to Apply", href: "/how-to-apply", isExternal: true },
      { id: "03e", title: "Funding Criteria", href: "/funding-criteria", isExternal: true },
      { id: "03f", title: "Check Eligibility", href: "/check-eligibility", isExternal: true }
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
  // Sort the stories by date descending for the success stories slider
  const sortedStories = useMemo(() => {
    return [...STORIES].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const activeStory = sortedStories[activeStoryIndex] || sortedStories[0] || STORIES[0];
  const latestStory = activeStory; // Bind slider active story to latestStory to preserve all references

  // Auto-play interval for the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % sortedStories.length);
    }, 6000); // 6 seconds auto-play interval
    return () => clearInterval(timer);
  }, [sortedStories.length]);

  const handlePrevStory = () => {
    setActiveStoryIndex((prev) => (prev - 1 + sortedStories.length) % sortedStories.length);
  };

  const handleNextStory = () => {
    setActiveStoryIndex((prev) => (prev + 1) % sortedStories.length);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingHomeVideo, setPlayingHomeVideo] = useState(false);

  const [activeSection, setActiveSection] = useState("01");
  const location = useLocation();
  const navigate = useNavigate();

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // States & Handler for Contact Form
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const mailtoLink = `mailto:tsoanelomodise@gmail.com?subject=${encodeURIComponent(
      `Got some questions - Inquiry from ${contactForm.name}`
    )}&body=${encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Trigger user's mail client with pre-filled content
      window.location.href = mailtoLink;
    }, 1000);
  };

  useEffect(() => {
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

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
  const [menuHoverTimeout, setMenuHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuId: string) => {
    if (menuHoverTimeout) clearTimeout(menuHoverTimeout);
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
    setMenuHoverTimeout(timeout);
  };

  const handleNavItemClick = (item: { href: string; isExternal: boolean }) => {
    setIsMenuOpen(false);
    setActiveMegaMenu(null);
    
    if (item.isExternal) {
      navigate(item.href);
    } else {
      if (isSubPage) {
        navigate("/");
        setTimeout(() => {
          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        }, 250);
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#F2901C] selection:text-white flex flex-col relative">
      <ScrollToTop />
      
      {/* Sticky Horizontal Navigation Bar */}
      <header 
        className="fixed top-0 left-0 w-full z-[100] bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#EFE6DA]/40 h-20 transition-all duration-300"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-8 flex items-center justify-between relative">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavItemClick({ href: "#home", isExternal: false })}
          >
            <img 
              src="https://empowerment-pulse-tracker.lovable.app/assets/nef-logo-B_u3VTf0.png" 
              alt="NEF Logo" 
              className="h-11 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-102" 
            />
          </div>

          {/* Desktop Navigation Links (Middle) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 h-full">
            
            {/* About Navigation Trigger */}
            <div 
              className="relative h-full"
              onMouseEnter={() => handleMouseEnter("about")}
            >
              <button
                onClick={() => handleNavItemClick({ href: "/about/mandate-vision-mission", isExternal: true })}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer h-full border-b-2 flex items-center gap-1.5 ${
                  activeMegaMenu === "about" || location.pathname.startsWith("/about/") || location.pathname === "/performance-report-2025"
                    ? "text-[#F2901C] border-[#F2901C]" 
                    : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
                }`}
              >
                About NEF
                <ChevronDown size={11} className={`transition-transform duration-300 ${activeMegaMenu === "about" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Funding Solutions Navigation Trigger */}
            <div 
              className="relative h-full"
              onMouseEnter={() => handleMouseEnter("funding")}
            >
              <button
                onClick={() => handleNavItemClick({ href: "/our-funds", isExternal: true })}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer h-full border-b-2 flex items-center gap-1.5 ${
                  activeMegaMenu === "funding" || location.pathname === "/our-funds" || location.pathname === "/funding-criteria" || location.pathname === "/check-eligibility" || location.pathname === "/how-to-apply" || location.pathname === "/non-financial-support"
                    ? "text-[#F2901C] border-[#F2901C]" 
                    : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
                }`}
              >
                Funding Solutions
                <ChevronDown size={11} className={`transition-transform duration-300 ${activeMegaMenu === "funding" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Contact & Support Navigation Trigger */}
            <div 
              className="relative h-full"
              onMouseEnter={() => handleMouseEnter("contact")}
            >
              <button
                onClick={() => handleNavItemClick({ href: "#contact", isExternal: false })}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer h-full border-b-2 flex items-center gap-1.5 ${
                  activeMegaMenu === "contact" || (activeSection === "07" && !isSubPage) || location.pathname === "/faq"
                    ? "text-[#F2901C] border-[#F2901C]" 
                    : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
                }`}
              >
                Contact & Support
                <ChevronDown size={11} className={`transition-transform duration-300 ${activeMegaMenu === "contact" ? "rotate-180" : ""}`} />
              </button>
            </div>
          </nav>

          {/* Right Area (Have Questions & Eligibility Action) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            
            {/* Have Questions Advisor Bubble Inspired by Mockup */}
            <div 
              onClick={() => {
                const chatbotBtn = document.querySelector('.fixed.bottom-8.right-8') as HTMLButtonElement;
                if (chatbotBtn) chatbotBtn.click();
              }}
              className="hidden xl:flex items-center gap-3 cursor-pointer group px-3 py-1.5 rounded-full hover:bg-[#EFE6DA]/20 transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" 
                  alt="Advisor Professional" 
                  className="w-10 h-10 rounded-full object-cover border border-[#EFE6DA]/85 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#FCFAF7] rounded-full animate-pulse"></span>
              </div>
              <div className="text-left leading-tight">
                <div className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Have Questions?</div>
                <div className="text-[10px] text-[#C79F6E] font-extrabold uppercase tracking-wide group-hover:text-[#F2901C] transition-colors">Ask an Advisor.</div>
              </div>
            </div>

            {/* Group with stacked Check Eligibility action button and social media icons */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button
                onClick={() => navigate("/check-eligibility")}
                className="px-5 py-2 bg-[#1E1B18] text-[#FCFAF7] hover:bg-[#F2901C] hover:text-white rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95 cursor-pointer text-center"
              >
                Check Eligibility
              </button>
            </div>
          </div>

          {/* Mobile menu trigger button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#1E1B18] hover:text-[#F2901C] transition-colors relative z-[120]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* --- DESKTOP MEGA MENU DRAWER RENDERER --- */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-0 w-full bg-white border-b border-[#EFE6DA]/80 shadow-[0_24px_50px_rgba(42,38,34,0.06)] py-12 px-8 z-[-1] overflow-hidden"
              onMouseEnter={() => {
                if (menuHoverTimeout) clearTimeout(menuHoverTimeout);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12">
                
                {/* 1. ABOUT MEGA MENU */}
                {activeMegaMenu === "about" && (
                  <>
                    {/* Column 1: Strategic Compass */}
                    <div className="col-span-4 flex flex-col gap-6">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Strategic Compass</h4>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleNavItemClick({ href: "/about/mandate-vision-mission", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <ShieldCheck size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Mandate, Vision & Mission</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Understand our legal directives, socioeconomic impact values, and transformation targets.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "/about/mandate-vision-mission", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <Users size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Leadership & Board</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Review our executive leadership panels, investment committees, and charter directives.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Scorecard & Transparency */}
                    <div className="col-span-4 flex flex-col gap-6 border-l border-[#EFE6DA]/40 pl-8">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Transparency & Audit</h4>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleNavItemClick({ href: "/performance-report-2025", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <Briefcase size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Performance Report 2025</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Examine our dynamic scorecard highlighting disbursements, portfolio valuations, and jobs created.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "/faq", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <ArrowRight size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">General FAQ & Criteria</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Review compliance, BEE thresholds, application guidelines, and financial limits.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Column 3: Featured Bento Card (Mockup Inspired) */}
                    <div className="col-span-4 bg-[#FCFAF7] p-6 rounded-3xl border border-[#EFE6DA]/70 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2901C]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F2901C]/10 transition-all duration-500"></div>
                      <div className="space-y-3 relative z-10">
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] block">Milestone Impact</span>
                        <h4 className="text-lg font-sans font-light uppercase tracking-tight text-[#1E1B18]">Driving South Africa's Growth</h4>
                        <p className="text-neutral-500 text-[11px] font-light leading-relaxed">
                          The NEF has deployed over R15 Billion across agricultural, manufacturing, and franchising portfolios, expanding rural transformation and socioeconomic opportunity.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveMegaMenu(null);
                          navigate("/performance-report-2025");
                        }}
                        className="relative z-10 mt-6 px-5 py-2 bg-[#1E1B18] text-white hover:bg-[#F2901C] rounded-full self-start text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        View Interactive Report
                      </button>
                    </div>
                  </>
                )}

                {/* 2. FUNDING solutions MEGA MENU */}
                {activeMegaMenu === "funding" && (
                  <>
                    {/* Column 1: Financial Options */}
                    <div className="col-span-3 flex flex-col gap-6">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Financial Options</h4>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleNavItemClick({ href: "/our-funds", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <SlidersHorizontal size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Portfolio Finder</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Interactive search tool to match your profile with our capital models.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "/funding-criteria", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <ShieldCheck size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Funding Criteria</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Evaluate your company metrics against our transformation, equity, and BEE thresholds.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "/check-eligibility", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <Zap size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Check Your Eligibility</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Leverage our rapid digital advisor checklist to verify matching finance structures.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Support & Execution */}
                    <div className="col-span-3 flex flex-col gap-6 border-l border-[#EFE6DA]/40 pl-6">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Support & Execution</h4>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleNavItemClick({ href: "/non-financial-support", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <Users size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Non-Financial Support</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Sustain growth with mentorship, training workshops, and incubation guidance.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "/how-to-apply", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <ArrowRight size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Application Roadmap</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Step-by-step masterclass guidelines on assembling file submissions successfully.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Column 3: Success Stories & Impact */}
                    <div className="col-span-3 flex flex-col gap-6 border-l border-[#EFE6DA]/40 pl-6">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Investee Stories</h4>
                      <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <button
                          onClick={() => handleNavItemClick({ href: "/investee-stories", isExternal: true })}
                          className="group p-2.5 rounded-xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-3"
                        >
                          <div className="w-8 h-8 shrink-0 bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <Users size={14} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">All Stories</h5>
                            <p className="text-neutral-500 font-light text-[10px] leading-relaxed mt-0.5">
                              Discover our full portfolio of black-owned enterprise success.
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavItemClick({ href: "/investee-stories/the-orchards", isExternal: true })}
                          className="group p-2.5 rounded-xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-3"
                        >
                          <div className="w-8 h-8 shrink-0 bg-[#F2901C]/10 text-[#F2901C] rounded-lg flex items-center justify-center border border-[#F2901C]/20 transition-colors">
                            <span className="text-[10px] font-mono font-black">01</span>
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">The Orchards</h5>
                            <p className="text-neutral-500 font-light text-[10px] leading-relaxed mt-0.5">
                              Agricultural export development and black economic transformation.
                            </p>
                          </div>
                        </button>

                        <button
                          onClick={() => handleNavItemClick({ href: "/investee-stories/busamed-healthcare", isExternal: true })}
                          className="group p-2.5 rounded-xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-3"
                        >
                          <div className="w-8 h-8 shrink-0 bg-[#F2901C]/10 text-[#F2901C] rounded-lg flex items-center justify-center border border-[#F2901C]/20 transition-colors">
                            <span className="text-[10px] font-mono font-black">02</span>
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Busamed Group</h5>
                            <p className="text-neutral-500 font-light text-[10px] leading-relaxed mt-0.5">
                              High-impact BEE hospital network scaling healthcare across SA.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Column 4: Featured Portal Bento (Charcoal Theme) - Featured Success Story */}
                    <div className="col-span-3 bg-[#1E1B18] text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-white/5 min-h-[220px] group cursor-pointer"
                      onClick={() => {
                        setActiveMegaMenu(null);
                        navigate("/investee-stories/mamelodi-square");
                      }}
                    >
                      {/* Background styled image with dark blending */}
                      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-all duration-500 bg-cover bg-center mix-blend-luminosity"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18] via-[#1E1B18]/70 to-transparent z-10"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2901C]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F2901C]/20 transition-all duration-500 z-10"></div>
                      
                      <div className="space-y-3 relative z-20">
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#F2901C] block">Latest Success Story</span>
                        <h4 className="text-lg font-sans font-black uppercase tracking-tight text-white group-hover:text-[#F2901C] transition-colors">Mamelodi Square</h4>
                        <p className="text-white/60 text-[11px] font-light leading-relaxed">
                          How a landmark R50M retail development created 250+ community jobs and transformed local commerce infrastructure.
                        </p>
                      </div>
                      <div className="relative z-20 mt-6 flex justify-between items-center w-full">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#F2901C] flex items-center gap-1.5 group-hover:translate-x-1 transition-all duration-300">
                          Read Story <span className="text-xs">→</span>
                        </span>
                        <span className="text-[8px] font-mono font-bold text-white/30 uppercase">Urban Property</span>
                      </div>
                    </div>
                  </>
                )}

                {/* 3. CONTACT & SUPPORT MEGA MENU */}
                {activeMegaMenu === "contact" && (
                  <>
                    {/* Column 1: Help & Assistance channels */}
                    <div className="col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Support Channels</h4>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleNavItemClick({ href: "/faq", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <HelpCircle size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Frequently Asked Questions</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Get instant answers regarding fund terms, BEE criteria, limits, and application processes in our FAQ Hub.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "#contact", isExternal: false })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#F2901C]/15 group-hover:border-[#F2901C]/30 transition-colors">
                            <MessageSquare size={18} className="text-[#1E1B18] group-hover:text-[#F2901C] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Submit an Inquiry</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Send your general or fund-specific inquiries directly to our administrative desk.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Column 2: Regional Presence & Operations */}
                    <div className="col-span-4 flex flex-col gap-6 border-l border-[#EFE6DA]/40 pl-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C79F6E] border-b border-[#EFE6DA]/30 pb-2">Direct Contact</h4>
                      <div className="space-y-4 text-left p-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#C79F6E] block font-extrabold">HQ Office / Johannesburg</span>
                          <span className="text-[13px] font-medium text-[#1E1B18] block">Melrose Arch, 18 Melrose Boulevard</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block">Telephone</span>
                            <a href="tel:+27113058000" className="text-[12px] font-bold text-[#1E1B18] hover:text-[#F2901C] transition-colors">+27 11 305 8000</a>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block">Email Support</span>
                            <a href="mailto:applications@nefcorp.co.za" className="text-[11px] font-bold text-[#1E1B18] hover:text-[#F2901C] transition-colors break-all">applications@nefcorp.co.za</a>
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-400 italic">
                          Operating Hours: Mon - Fri (08:00 - 17:00). Closed on weekends and official public holidays.
                        </p>
                      </div>
                    </div>

                    {/* Column 3: AI Advisor Assistant */}
                    <div className="col-span-4 bg-[#1E1B18] text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-white/5 min-h-[220px] group animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2901C]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F2901C]/15 transition-all duration-500"></div>
                      <div className="space-y-3 relative z-10">
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#F2901C] block">Digital Engagement</span>
                        <h4 className="text-lg font-sans font-light uppercase tracking-tight">Speak with AI Advisor</h4>
                        <p className="text-white/50 text-[11px] font-light leading-relaxed">
                          Unsure which fund applies to your BEE structure, or have quick compliance questions? Get instant criteria matching.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveMegaMenu(null);
                          const chatbotBtn = document.querySelector('.fixed.bottom-8.right-8') as HTMLButtonElement;
                          if (chatbotBtn) chatbotBtn.click();
                        }}
                        className="relative z-10 mt-6 px-5 py-2 bg-[#F2901C] text-white hover:bg-white hover:text-[#1E1B18] rounded-full self-start text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
                      >
                        Launch Interactive Chat
                      </button>
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer Navigation (Slide-down with beautiful transparency) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[105] bg-white text-[#1E1B18] pt-28 px-6 pb-10 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-4">
              
              {/* About Group */}
              <div className="space-y-2.5">
                <div className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E]">About Us</div>
                <div className="pl-4 flex flex-col gap-2 border-l border-[#EFE6DA]/60">
                  <button
                    onClick={() => handleNavItemClick({ href: "/about/mandate-vision-mission", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    Mandate, Mission & Vision
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/performance-report-2025", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    Performance Report 2025
                  </button>
                </div>
              </div>              {/* Funding Solutions Group */}
              <div className="space-y-2.5">
                <div className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E]">Funding Solutions</div>
                <div className="pl-4 flex flex-col gap-2 border-l border-[#EFE6DA]/60">
                  <button
                    onClick={() => handleNavItemClick({ href: "/our-funds", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    Portfolio Finder
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/funding-criteria", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    Funding Criteria
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/check-eligibility", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    Check Eligibility
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/non-financial-support", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    Non-Financial Support
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/how-to-apply", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#F2901C] transition-colors"
                  >
                    How to Apply
                  </button>
                </div>
              </div>

              {/* Success Stories */}
              <div className="space-y-1.5">
                <div className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E]">Case Studies</div>
                <button
                  onClick={() => handleNavItemClick({ href: "/investee-stories", isExternal: true })}
                  className="text-xl font-sans font-light text-left uppercase tracking-tight block w-full hover:text-[#F2901C] transition-colors"
                >
                  Investee Stories
                </button>
              </div>

              {/* FAQ and Contact */}
              <div className="space-y-2.5">
                <div className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E]">Contact & Support</div>
                <div className="pl-4 flex flex-col gap-2.5 border-l border-[#EFE6DA]/60">
                  <button
                    onClick={() => handleNavItemClick({ href: "#contact", isExternal: false })}
                    className="text-sm font-sans font-medium text-left text-[#1E1B18] hover:text-[#F2901C] transition-colors"
                  >
                    Contact Info & Form
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/faq", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-500 hover:text-[#F2901C] transition-colors pl-4 border-l border-[#F2901C]/40"
                  >
                    ↳ Frequently Asked Questions (FAQ)
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions inside responsive mobile menu overlay */}
            <div className="mt-8 pt-6 border-t border-[#EFE6DA]/60 flex flex-col gap-3">
              <button
                onClick={() => handleNavItemClick({ href: "/check-eligibility", isExternal: true })}
                className="w-full py-3 bg-[#1E1B18] text-white font-bold text-[10px] uppercase tracking-widest rounded-full text-center shadow-md active:scale-98 cursor-pointer"
              >
                Check Eligibility
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  const chatbotBtn = document.querySelector('.fixed.bottom-8.right-8') as HTMLButtonElement;
                  if (chatbotBtn) chatbotBtn.click();
                }}
                className="w-full py-3 border border-[#1E1B18]/15 text-[#1E1B18] font-bold text-[10px] uppercase tracking-widest rounded-full text-center hover:bg-neutral-50 active:scale-98 cursor-pointer"
              >
                Ask an AI Assistant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area: Takes Full Width on Desktop & Mobile */}
      <main className="w-full pt-20 transition-all duration-500 min-h-screen">
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
              <section id="home" className="relative h-screen overflow-hidden bg-[#CE7E34]">
                
                {/* 1. Underlying Image Layer with See-Through Gradient Overlay */}
                <div className="absolute inset-0 z-10">
                  <AnimatePresence initial={false}>
                    <motion.img 
                      key={currentSlide}
                      src={HERO_SLIDES[currentSlide].image} 
                      alt={HERO_SLIDES[currentSlide].title} 
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                      style={{
                        ...(currentSlide === 0 
                          ? { transform: 'scaleX(-1) scale(1.02)', transformOrigin: 'center' } 
                          : currentSlide === 1
                          ? { transform: 'scale(1.28) translateX(-15%)', transformOrigin: 'center' }
                          : { transform: 'scale(1.02)', transformOrigin: 'center' }),
                        objectPosition: currentSlide === 1 ? '10% center' : 'center'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  {/* Background gradient layout modified to allow the top lighter shade to be see-through */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#DF8D3C]/20 to-[#CE7E34] z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#DF8D3C]/20 z-10"></div>
                </div>

                {/* 2. Distinctive Rounded Formatting Frame (Border Overlay Inspired by Mockup) */}
                <div 
                  className="absolute inset-4 md:inset-8 border-[3px] border-white/90 rounded-[2.5rem] pointer-events-none z-30"
                  style={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 32% 100%, 32% 90%, 8% 90%, 8% 100%, 0% 100%)" 
                  }}
                />

                {/* 6. Social Media Links (Moved to Top) */}
                <div className="absolute top-8 md:top-14 right-8 md:right-16 z-30 flex gap-3">
                  <a href="https://x.com/NEFCORP" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white hover:bg-[#F2901C] hover:-translate-y-1 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer">
                    <Twitter size={18} strokeWidth={2} />
                  </a>
                  <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGIKFgf-74C5AAAAZ7vbLtIvQyUibcVhd58vM2kHca3daF7QIewXC54Pa8_tNBaBEbHeDDM82layCmmYH2CEtV3xCGaECWdfz4Q5xHNMPqL6qHuiNtbo3Ka1xHvrlWBLLxXHDs=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fnef1%2Fpeople%2F%3FviewAsMember%3Dtrue" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white hover:bg-[#F2901C] hover:-translate-y-1 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer">
                    <Linkedin size={18} strokeWidth={2} />
                  </a>
                  <a href="https://www.youtube.com/@nef-nationalempowermentfun6193" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white hover:bg-[#F2901C] hover:-translate-y-1 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer">
                    <Youtube size={18} strokeWidth={2} />
                  </a>
                  <a href="https://www.instagram.com/nationalempowermentfund/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white hover:bg-[#F2901C] hover:-translate-y-1 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer">
                    <Instagram size={18} strokeWidth={2} />
                  </a>
                  <a href="https://www.facebook.com/NationalEmpowermentFund/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black text-white hover:bg-[#F2901C] hover:-translate-y-1 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer">
                    <Facebook size={18} strokeWidth={2} />
                  </a>
                </div>

                {/* 3. "SCROLL DOWN" Custom Cutout Marker Inspired by Mockup */}
                <div className="absolute bottom-8 left-[10%] md:left-[11%] lg:left-[12%] text-white text-[9.5px] font-sans font-extrabold uppercase tracking-[0.3em] z-30 select-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white/90 rounded-full animate-ping"></span>
                  SCROLL DOWN
                </div>

                {/* 4. Interactive Hero Layout Content Grid */}
                <div className="absolute inset-4 md:inset-8 z-20 pt-28 pb-14 px-6 md:px-14 flex flex-col justify-end pointer-events-none">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-end w-full mt-auto pointer-events-auto">
                    
                    {/* A. LEFT AREA: Interactive Side-by-Side Cards (Mapping to Slides & Adler UX) */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col gap-4">
                      
                      {/* Column Deck Wrapper */}
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                        {HERO_SLIDES.map((slide, index) => {
                          const isActive = currentSlide === index;
                          return (
                            <button 
                              key={slide.id}
                              onClick={() => setCurrentSlide(index)}
                              className={`flex-1 text-left flex flex-col justify-between min-h-[160px] md:min-h-[195px] rounded-3xl cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
                                isActive 
                                  ? "bg-white/95 backdrop-blur-md border-white text-[#1E1B18] shadow-[0_20px_40px_rgba(42,38,34,0.12)] p-4 md:p-5 hover:scale-101" 
                                  : "bg-[#1E1B18]/15 hover:bg-white/5 border-white/10 hover:border-white/30 text-white p-4 md:p-5"
                              }`}
                            >
                              {/* Title / Description area inside card */}
                              <div className="mt-4">
                                <h4 className={`text-xs md:text-[13px] font-sans font-black uppercase tracking-wider ${isActive ? "text-[#1E1B18]" : "text-white"}`}>
                                  {index === 0 && "Financial Support"}
                                  {index === 1 && "Sustained Growth"}
                                  {index === 2 && "Our Solutions"}
                                </h4>
                                
                                {/* Vertical small details inspired by mockup (TIME / PRICE lists) */}
                                <div className="mt-3.5 flex flex-col gap-1 border-t border-dashed pt-3 border-current/10">
                                  <div className="flex justify-between items-center text-[8.5px] uppercase tracking-widest font-mono">
                                    <span className={isActive ? "text-neutral-400" : "text-white/40"}>Direct:</span>
                                    <span className="font-bold">
                                      {index === 0 && "Empower"}
                                      {index === 1 && "Disburse"}
                                      {index === 2 && "Strategic"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-[8.5px] uppercase tracking-widest font-mono">
                                    <span className={isActive ? "text-neutral-400" : "text-white/40"}>Limit:</span>
                                    <span className="font-bold">
                                      {index === 0 && "R10M+"}
                                      {index === 1 && "R50M+"}
                                      {index === 2 && "Flexible"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Card Footer action indicators */}
                              <div className="mt-4 pt-2 flex items-center justify-between w-full border-t border-current/5">
                                {isActive ? (
                                  <span className="text-[8.5px] font-sans font-extrabold uppercase tracking-widest text-[#F2901C] flex items-center gap-1">
                                    Active <span className="text-[10px]">→</span>
                                  </span>
                                ) : (
                                  <span className="text-[8.5px] font-sans font-extrabold uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-1 transition-colors">
                                    Select <span className="text-[10px] opacity-40">→</span>
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* B. RIGHT AREA: High Impact Display Typography, Description, Actions */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col gap-5 text-left md:pl-10 transform -translate-y-3 md:-translate-y-6 lg:-translate-y-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-full"
                        >
                          {/* Slide Subtitle tracking label */}
                          <span className="text-[9.5px] font-extrabold uppercase tracking-[0.3em] text-[#F2901C] block mb-2 font-mono">
                            {HERO_SLIDES[currentSlide].subtitle}
                          </span>

                          {/* Slide Master Heading */}
                          <h1 className="text-3xl md:text-5xl lg:text-[4.5rem] font-sans font-black uppercase text-white tracking-tighter leading-[0.95] mb-5">
                            {HERO_SLIDES[currentSlide].title}
                          </h1>

                          {/* Slide Description paragraph */}
                          <p className="text-white/80 text-xs md:text-sm lg:text-base font-sans font-light leading-relaxed mb-6 max-w-lg">
                            {HERO_SLIDES[currentSlide].description}
                          </p>

                          {/* High fidelity Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => navigate("/our-funds")}
                              className="px-6 py-3 bg-white text-[#1E1B18] hover:bg-[#F2901C] hover:text-white rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                            >
                              Explore Solutions
                            </button>
                            
                            <button
                              onClick={() => navigate("/check-eligibility")}
                              className="px-6 py-3 border-[1.5px] border-white/30 hover:border-white hover:bg-white/10 text-white rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer"
                            >
                              Apply Screen Online
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* 5. Sleek Horizontal Slide Indicators (Left Edge Margin) */}
                <div className="absolute bottom-11 right-8 md:right-16 z-30 flex gap-2 w-auto bg-white/15 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                        currentSlide === i ? "w-8 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

              </section>

              {/* Portfolio Finder has been moved to Our Funds page under /our-funds */}

              {/* About Section (Placed directly below `#funds`) */}
              <section id="about" className="py-28 md:py-36 px-6 sm:px-8 md:px-24 bg-[#FCFAF9] relative overflow-hidden border-b border-[#FAF6F0]">
                {/* Clean, delicate grid line overlays mimicking modern line art */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(242,144,28,0.035)_0%,transparent_60%)] pointer-events-none"></div>
                <div className="absolute left-12 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-200/50 via-[#1E1B18]/5 to-neutral-200/50 opacity-40 hidden xl:block pointer-events-none"></div>
                <div className="absolute right-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-[#1E1B18]/5 to-transparent opacity-20 hidden xl:block pointer-events-none"></div>

                {/* Ambient Warm-Orange Soft Glow Orbs */}
                <div className="absolute -left-32 top-10 w-[30rem] h-[30rem] rounded-full bg-[#F2901C]/5 blur-3xl pointer-events-none"></div>
                <div className="absolute right-10 bottom-24 w-[35rem] h-[35rem] rounded-full bg-[#E58E62]/4 blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                  {/* Unified Section Header */}
                  <div className="text-center md:text-left space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-3 py-1 px-3 bg-white/60 border border-[#EFE6DA]/40 rounded-full backdrop-blur-sm shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C] animate-pulse"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C79F6E]">Our Legacy & Foundations</span>
                      <PremiumIcon name="Zap" size={12} variant="minimal" color="#F2901C" interactive={true} />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight leading-[1.05] uppercase text-[#1E1B18]">
                      About Our <span className="font-serif italic text-[#F2901C] lowercase">mission & pillars</span>
                    </h2>
                    <p className="text-[#3A3530]/70 leading-relaxed text-base md:text-lg font-light">
                      The National Empowerment Fund is established by Act 105 of 1998 to drive economic transformation, catalyze black economic empowerment, and promote a culture of savings and investment.
                    </p>
                  </div>

                  {/* Integrated Bento Grid of Core Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

                    {/* Bento Card 3: Legislative Mandate */}
                    <div className="group relative bg-white rounded-[2.2rem] p-9 border border-[#EFE6DA]/40 shadow-[0_12px_45px_rgba(42,38,34,0.02)] hover:shadow-[0_28px_70px_rgba(42,38,34,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#DF8D3C]/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="space-y-6 relative z-10">
                        <PremiumIcon name="ShieldCheck" size={24} variant="accent" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#C79F6E] block">FOUNDATION</span>
                          <h3 className="text-xl md:text-2xl font-sans font-normal uppercase tracking-tight text-[#1E1B18]">Legislative Mandate</h3>
                        </div>
                        <p className="text-[#3A3530]/75 font-light text-[13px] leading-relaxed">
                          Established by the <strong className="font-medium text-neutral-800">NEF Act No. 105 of 1998</strong> to drive and facilitate black economic participation.
                        </p>
                        <div className="space-y-2 pt-3 border-t border-neutral-100">
                          <div className="flex items-center gap-2.5 text-xs text-neutral-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C]"></span>
                            <span>Governed by the PFMA</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-neutral-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C]"></span>
                            <span>Savings and Investment Culture</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bento Card 5: Our Vision */}
                    <div className="group relative bg-white rounded-[2.2rem] p-9 border-2 border-[#F2901C] shadow-[0_20px_60px_rgba(242,144,28,0.08)] hover:shadow-[0_32px_80px_rgba(242,144,28,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-5 right-5 bg-[#F2901C] text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm z-20">
                        Strategic Focus
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-[#F2901C]/5 via-transparent to-transparent pointer-events-none"></div>
                      <div className="space-y-6 relative z-10">
                        <PremiumIcon name="Eye" size={24} variant="glowing" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#C79F6E] block">ASPIRATION</span>
                          <h3 className="text-xl md:text-2xl font-sans font-normal uppercase tracking-tight text-[#1E1B18]">Our Vision</h3>
                        </div>
                        <p className="text-[#3A3530]/80 font-light text-[13px] leading-relaxed">
                          To become the <strong className="font-medium text-neutral-800">leading provider of innovative transformation solutions</strong> for an economically inclusive South Africa.
                        </p>
                        <div className="space-y-2 pt-3 border-t border-[#F2901C]/20">
                          <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C] shadow-sm"></span>
                            <span className="font-medium">Inclusive South Africa</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-neutral-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C] shadow-sm"></span>
                            <span className="font-medium">Sustainable Growth</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bento Card 6: Our Mission */}
                    <div className="group relative bg-white rounded-[2.2rem] p-9 border border-[#EFE6DA]/40 shadow-[0_12px_45px_rgba(42,38,34,0.02)] hover:shadow-[0_28px_70px_rgba(42,38,34,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B18]/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="space-y-6 relative z-10">
                        <PremiumIcon name="Target" size={24} variant="boxed" />
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#C79F6E] block">EXECUTION</span>
                          <h3 className="text-xl md:text-2xl font-sans font-normal uppercase tracking-tight text-[#1E1B18]">Our Mission</h3>
                        </div>
                        <p className="text-[#3A3530]/75 font-light text-[13px] leading-relaxed">
                          Catalyzing <strong className="font-medium text-neutral-800">Broad-Based Black Economic Empowerment</strong> by implementing innovative investment solutions.
                        </p>
                        <div className="space-y-2 pt-3 border-t border-neutral-100">
                          <div className="flex items-center gap-2.5 text-xs text-neutral-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C]"></span>
                            <span>B-BBEE Catalyst</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-neutral-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C]"></span>
                            <span>Empowerment Solutions</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Success Stories Preview Section */}
              <section className="py-28 px-8 md:px-24 bg-gradient-to-br from-[#1E1B18] via-[#26211D] to-[#12100E] text-white overflow-hidden relative">
                {/* Background Image (Custom Pastel Gradient matching the reference) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-500 z-0"
                  style={{
                    backgroundImage: 'url("https://donotdelete.wonderlandstudio.co.za/nef/background_1.png")',
                    opacity: 1.0, // Set to exactly 100% as requested for premium visual balance and high readability
                  }}
                  id="investee-stories-bg"
                ></div>

                {/* Decorative Amber and Warm Sand Glowing Blobs */}
                <div className="absolute top-1/4 -left-32 w-[35rem] h-[35rem] rounded-full bg-[#F2901C]/5 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] rounded-full bg-[#C79F6E]/4 blur-3xl pointer-events-none"></div>
                
                {/* Visual grid lines to represent premium layout architecture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10 max-w-7xl mx-auto">
                  
                  {/* Left Column: Brand Typography and Dynamic CTA (Inspired by the Design Reference layout) */}
                  <div className="space-y-12 lg:col-span-5 flex flex-col justify-between h-full">
                    <div className="space-y-8">
                      {/* Premium glass-styled category badge */}
                      <div className="inline-flex items-center gap-3 py-1.5 px-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-sm w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F2901C] animate-pulse"></span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C79F6E]">Latest Success Spotlight</span>
                      </div>
                      
                      {/* High-End, Massive Display Typography matching the "Africa" layout style */}
                      <h2 className="text-5xl md:text-6xl lg:text-7.5xl font-sans font-light tracking-tight leading-[0.95] uppercase">
                        INVESTEE <br />
                        <span className="font-serif italic text-[#F2901C] lowercase tracking-normal block mt-1 pl-1 relative">
                          stories
                        </span>
                      </h2>

                      {/* Content Area with a neat, warm light border top divider */}
                      <div className="space-y-4 pt-8 border-t border-white/10">
                        <span className="text-[9px] font-mono tracking-widest text-[#C79F6E] uppercase block font-bold">Featured Partner</span>
                        <h3 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight text-white leading-tight">
                          {latestStory.title}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base max-w-md font-light leading-relaxed">
                          {latestStory.summary}
                        </p>
                      </div>
                    </div>

                    {/* Premium Call-To-Action Layout (Modern pill + supporting meta label) */}
                    <div className="pt-6 space-y-6">
                      <div className="flex flex-wrap items-center gap-6">
                        <button 
                          onClick={() => navigate("/investee-stories")}
                          className="group inline-flex items-center gap-5 px-8 py-4.5 bg-[#FAF8F5] hover:bg-[#F2901C] text-[#1E1B18] font-sans font-bold text-[10px] tracking-widest uppercase rounded-full shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                        >
                          <span>View All Stories</span>
                          <div className="w-6 h-6 rounded-full bg-[#1E1B18]/5 group-hover:bg-[#1E1B18]/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                            <ArrowRight size={11} />
                          </div>
                        </button>
                        
                        <div className="flex items-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                          <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-white/40 block">Real Impact. Real People.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Stacked Glass/Image Boards (Directly inspired by Design Reference's layered layout) */}
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative">
                    
                    {/* ENLARGED HERO VIDEO CARD (Landscape portrait card with custom play interactive frame) */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingHomeVideo(true);
                        }}
                        className="aspect-[3/4] bg-[#2C2621]/90 rounded-[2.8rem] overflow-hidden relative group border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
                      >
                        <img 
                          src={latestStory.image} 
                          alt={latestStory.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* High-Contrast Floating White Play Button from Design Reference */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-16 h-16 rounded-full bg-white text-[#1E1B18] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-[#F2901C] group-hover:text-white relative">
                            <span className="absolute inset-0 rounded-full bg-white/30 animate-ping group-hover:bg-[#F2901C]/30"></span>
                            <Play size={18} fill="currentColor" className="relative z-10 translate-x-0.5" />
                          </div>
                        </div>

                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                        
                        {/* Metadata Tagline Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 gap-4">
                          <div className="space-y-2 text-left">
                            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] bg-[#F2901C] text-[#1E1B18] px-3.5 py-1.5 rounded-full shadow-lg block w-max">Success Documentary</span>
                            <h4 className="text-base font-sans font-medium text-white line-clamp-1">{latestStory.title}</h4>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-[#F2901C] group-hover:text-[#1E1B18] shrink-0">
                            <ArrowRight size={12} className="text-white group-hover:text-[#1E1B18]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Supporting cards row stacked vertically (Testimonial & Impact stats) */}
                    <div className="md:col-span-5 flex flex-col gap-8 justify-between">
                      
                      {/* Card 1: Testimonial Card */}
                      <div 
                        onClick={() => navigate(`/investee-stories/${latestStory.id}`)}
                        className="flex-1 bg-white/5 rounded-[2.2rem] p-8 flex flex-col justify-between relative group cursor-pointer border border-white/10 shadow-xl overflow-hidden hover:border-[#F2901C]/30 hover:bg-white/10 transition-all duration-500"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2901C]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#F2901C]/10 transition-all duration-500"></div>
                        
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#F2901C] block mb-4">Testimonial</span>
                        
                        <p className="text-white/80 text-[11px] md:text-xs font-light leading-relaxed italic relative z-10 my-auto line-clamp-5">
                          "{latestStory.quote}"
                        </p>
                        
                        <div className="flex justify-between items-center relative z-10 mt-6 pt-4 border-t border-white/5">
                          <span className="text-[8px] font-mono tracking-widest text-[#C79F6E] uppercase group-hover:text-[#F2901C] transition-colors font-bold">{latestStory.author}</span>
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F2901C] group-hover:text-[#1E1B18] transition-all">
                            <ArrowRight size={10} className="text-white group-hover:text-[#1E1B18]" />
                          </div>
                        </div>
                      </div>

                      {/* Card 2: Impact stats Card */}
                      <div 
                        onClick={() => navigate(`/investee-stories/${latestStory.id}`)}
                        className="flex-1 bg-white/5 rounded-[2.2rem] p-8 flex flex-col justify-between relative group cursor-pointer border border-white/10 shadow-xl overflow-hidden hover:border-[#F2901C]/30 hover:bg-white/10 transition-all duration-500"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2901C]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#F2901C]/10 transition-all duration-500"></div>
                        
                        <div className="space-y-4">
                          <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#F2901C] block">Impact stats</span>
                          <h4 className="text-xs md:text-sm font-sans font-bold uppercase tracking-tight text-white line-clamp-2 leading-snug group-hover:text-[#F2901C] transition-colors">
                            {latestStory.title}
                          </h4>
                          <div className="space-y-2 pt-3 border-t border-white/10">
                            {latestStory.impact?.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-[10px] text-white/70 font-light font-sans">
                                <span className="text-[#C79F6E] mt-0.5 font-bold">•</span>
                                <span className="line-clamp-2">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center relative z-10 mt-6 border-t border-white/10 pt-4">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#F2901C] flex items-center gap-1.5 group-hover:translate-x-1 transition-all duration-300">
                            Read Full Story <span className="text-xs">→</span>
                          </span>
                          <span className="text-[8px] font-mono font-bold text-white/30 uppercase">Interactive</span>
                        </div>
                      </div>

                    </div>

                    {/* Decorative Design Elements: Carousel Indicators exactly inspired by Design Reference */}
                    <div className="md:col-span-12 pt-6 flex items-center justify-between mt-4">
                      {/* Left/Right small circular controls from Design Reference */}
                      <div className="flex gap-3">
                        <button 
                          onClick={handlePrevStory}
                          className="w-10 h-10 rounded-full border border-white/10 hover:border-[#F2901C] flex items-center justify-center text-white/50 hover:text-[#F2901C] hover:bg-white/5 transition-all duration-300 cursor-pointer"
                        >
                          <span className="text-xs">←</span>
                        </button>
                        <button 
                          onClick={handleNextStory}
                          className="w-10 h-10 rounded-full border border-white/10 hover:border-[#F2901C] flex items-center justify-center text-white/50 hover:text-[#F2901C] hover:bg-white/5 transition-all duration-300 cursor-pointer"
                        >
                          <span className="text-xs">→</span>
                        </button>
                      </div>

                      {/* Timeline line representation "01 ----------- 08" */}
                      <div className="flex items-center gap-4 text-white/40">
                        <span className="text-[10px] font-mono font-bold tracking-widest">
                          {String(activeStoryIndex + 1).padStart(2, '0')}
                        </span>
                        <div className="w-24 md:w-36 h-px bg-white/10 relative">
                          <div 
                            className="absolute top-0 left-0 h-full bg-[#F2901C] transition-all duration-500"
                            style={{ width: `${((activeStoryIndex + 1) / sortedStories.length) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-widest">
                          {String(sortedStories.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* Team/Impact Section */}
              <section className="bg-[#161412] py-28 px-8 md:px-24 text-white overflow-hidden relative">

                <div className="max-w-6xl mx-auto relative z-10">
                  <div className="text-center mb-16">
                    <span className="text-[#C79F6E] text-[11px] font-mono font-bold uppercase tracking-[0.4em] mb-4 block">A Legacy of Empowerment</span>
                    <h2 className="text-3xl md:text-5xl lg:text-3xl font-sans font-semibold tracking-tight mb-6 leading-none uppercase text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                      Annual Review <br />
                      <span className="font-serif italic text-[#F2901C] lowercase font-medium">performance highlights</span>
                    </h2>
                    <p className="text-neutral-200 text-xs md:text-sm max-w-2xl mx-auto font-normal leading-relaxed [text-shadow:0_1px_5px_rgba(0,0,0,0.6)]">
                      A summary of our economic transformation, enterprise development, and job creation impact across South Africa during the latest review period.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="text-center px-4 py-8 bg-black/60 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-xl hover:border-[#F2901C]/30 transition-all duration-300 group">
                      <div className="text-3xl md:text-4xl font-semibold text-[#F2901C] mb-2 group-hover:scale-105 transition-transform">R7.4bn</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-300 font-semibold opacity-90">Total Approvals</div>
                    </div>
                    <div className="text-center px-4 py-8 bg-black/60 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-xl hover:border-[#F2901C]/30 transition-all duration-300 group">
                      <div className="text-3xl md:text-4xl font-semibold text-[#F2901C] mb-2 group-hover:scale-105 transition-transform">112k+</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-300 font-semibold opacity-90">Jobs Supported</div>
                    </div>
                    <div className="text-center px-4 py-8 bg-black/60 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-xl hover:border-[#F2901C]/30 transition-all duration-300 group">
                      <div className="text-3xl md:text-4xl font-semibold text-[#F2901C] mb-2 group-hover:scale-105 transition-transform">1,240</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-300 font-semibold opacity-90">SMMEs Funded</div>
                    </div>
                    <div className="text-center px-4 py-8 bg-black/60 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-xl hover:border-[#F2901C]/30 transition-all duration-300 group">
                      <div className="text-3xl md:text-4xl font-semibold text-[#F2901C] mb-2 group-hover:scale-105 transition-transform">42%</div>
                      <div className="text-[9px] font-mono uppercase tracking-widest text-neutral-300 font-semibold opacity-90">Black Women Owned</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="flex gap-4 p-6 bg-black/60 border border-white/10 rounded-2xl items-center text-left backdrop-blur-md shadow-lg">
                      <div className="text-3xl font-semibold text-[#F2901C]">85%</div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Black Ownership</h4>
                        <p className="text-[11px] text-neutral-200 font-normal mt-1">Average black ownership maintained across our investment portfolio.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-6 bg-black/60 border border-white/10 rounded-2xl items-center text-left backdrop-blur-md shadow-lg">
                      <div className="text-3xl font-semibold text-[#F2901C]">R1.2bn</div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Rural Development</h4>
                        <p className="text-[11px] text-neutral-200 font-normal mt-1">Dedicated funding deployed to support township and rural economies.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={() => navigate('/performance-report-2025')}
                      className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#F2901C] hover:text-white transition-colors bg-black/45 hover:bg-black/65 border border-[#F2901C]/30 hover:border-white/50 px-6 py-3 rounded-full backdrop-blur-xs shadow-md transition-all duration-300"
                    >
                      View Full Performance Report 2025 <span className="text-xs">→</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-24 px-8 md:px-24 bg-gradient-to-br from-[#F2901C] to-[#E58E62] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-xl mx-auto relative z-10">
                  <span className="text-[#1E1B18] text-[9px] font-bold uppercase tracking-[0.3em] mb-3 block text-center">Get In Touch</span>
                  <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight mb-8 text-[#1E1B18] uppercase leading-none text-center">
                    Got some questions?
                  </h2>

                  <AnimatePresence mode="wait">
                    {!submitSuccess ? (
                      <motion.form 
                        key="contact-form"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleContactSubmit} 
                        className="space-y-4 text-left"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18] block pl-1">Your Name</label>
                            <input
                              type="text"
                              required
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              placeholder="e.g. Sipho Nkosi"
                              className="w-full px-4 h-11 bg-white/30 hover:bg-white/40 focus:bg-white/60 text-[#1E1B18] placeholder-[#1E1B18]/40 border border-[#1E1B18]/10 rounded-2xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#1E1B18] transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18] block pl-1">Your Email</label>
                            <input
                              type="email"
                              required
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              placeholder="e.g. sipho@company.co.za"
                              className="w-full px-4 h-11 bg-white/30 hover:bg-white/40 focus:bg-white/60 text-[#1E1B18] placeholder-[#1E1B18]/40 border border-[#1E1B18]/10 rounded-2xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#1E1B18] transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18] block pl-1">How can we help you?</label>
                          <textarea
                            required
                            rows={4}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            placeholder="Tell us about your business or inquiry..."
                            className="w-full px-4 py-3 bg-white/30 hover:bg-white/40 focus:bg-white/60 text-[#1E1B18] placeholder-[#1E1B18]/40 border border-[#1E1B18]/10 rounded-2xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#1E1B18] transition-all resize-none"
                          ></textarea>
                        </div>

                        <div className="text-center pt-2">
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative px-10 py-3.5 bg-[#1E1B18] text-white font-bold uppercase text-[9px] tracking-widest overflow-hidden rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-50 cursor-pointer min-w-[200px]"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {isSubmitting ? "Sending message..." : "Send Message"}
                              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/30 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] text-center space-y-4"
                      >
                        <div className="w-14 h-14 bg-[#1E1B18] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                          <CheckCircle2 size={24} className="text-[#F2901C]" />
                        </div>
                        <h3 className="text-xl font-sans font-light uppercase tracking-tight text-[#1E1B18]">Message Sent Successfully</h3>
                        <p className="text-xs text-[#1E1B18]/80 leading-relaxed font-light">
                          Thank you for reaching out, <strong className="font-bold">{contactForm.name}</strong>. Your inquiry has been routed dynamically to our support team and we will respond to you at <strong className="font-bold">{contactForm.email}</strong> within 24 working hours.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitSuccess(false);
                            setContactForm({ name: "", email: "", message: "" });
                          }}
                          className="px-6 py-2 bg-[#1E1B18] text-white hover:bg-white hover:text-[#1E1B18] rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="mt-8 text-[11px] font-light text-[#1E1B18]/75 tracking-wider text-center">
                    or email us directly at <a href="mailto:tsoanelomodise@gmail.com" className="border-b border-[#1E1B18] font-bold hover:opacity-100 transition-opacity">tsoanelomodise@gmail.com</a>
                  </p>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-[#FAF8F5] pt-16 pb-12 px-8 md:px-24 border-t border-[#EFE6DA]/40 text-[#1E1B18]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#EFE6DA]/40">
                  {/* Brand Column */}
                  <div className="md:col-span-4 space-y-4 text-left">
                    <div 
                      className="cursor-pointer inline-block" 
                      onClick={() => handleNavItemClick({ href: "#home", isExternal: false })}
                    >
                      <img 
                        src="https://empowerment-pulse-tracker.lovable.app/assets/nef-logo-B_u3VTf0.png" 
                        alt="NEF Logo" 
                        className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]" 
                      />
                    </div>
                    <p className="text-neutral-500 text-xs font-light leading-relaxed max-w-sm">
                      A catalyst for Broad-Based Black Economic Empowerment, accelerating business development, asset transformation, and operational sustainability across South Africa.
                    </p>
                  </div>

                  {/* Funding Solutions Column */}
                  <div className="md:col-span-3 space-y-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E] block mb-2">Funding Solutions</span>
                    <ul className="space-y-2.5">
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/our-funds", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Portfolio Finder
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/funding-criteria", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Funding Criteria
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/check-eligibility", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Eligibility Checklist
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/non-financial-support", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Non-Financial Support
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/how-to-apply", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          How to Apply
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* About & Impact Column */}
                  <div className="md:col-span-2 space-y-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E] block mb-2">About & Impact</span>
                    <ul className="space-y-2.5">
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/about/mandate-vision-mission", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Mandate, Vision & Mission
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/performance-report-2025", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Performance Report 2025
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/investee-stories", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Investee Success Stories
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Support Column */}
                  <div className="md:col-span-3 space-y-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E] block mb-2">Support & Connect</span>
                    <ul className="space-y-2.5">
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "/faq", isExternal: true })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Frequently Asked Questions
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavItemClick({ href: "#contact", isExternal: false })}
                          className="text-xs text-neutral-500 hover:text-[#F2901C] transition-colors font-light text-left shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Contact & General Inquiries
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            const chatbotBtn = document.querySelector('.fixed.bottom-8.right-8') as HTMLButtonElement;
                            if (chatbotBtn) chatbotBtn.click();
                          }}
                          className="text-xs text-[#F2901C] hover:underline transition-all font-semibold tracking-wide text-left flex items-center gap-1.5 shadow-none p-0 bg-transparent border-0 cursor-pointer"
                        >
                          Speak with AI Advisor 💬
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                    © 2026 NATIONAL EMPOWERMENT FUND. ALL RIGHTS RESERVED.
                  </div>
                  <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
                    <a 
                      href="#" 
                      className="transition-colors hover:text-[#F2901C]"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/national-empowerment-fund" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#F2901C]"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="https://twitter.com/nefcorp" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[#F2901C]"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </footer>
            </>
          } />
        </Routes>
        <FundChatbot />
        <BackToTopButton />
      </main>



      {/* Investee Story Video Lightbox Modal */}
      <AnimatePresence>
        {playingHomeVideo && (
          <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPlayingHomeVideo(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setPlayingHomeVideo(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#F2901C] hover:text-[#1E1B18] flex items-center justify-center transition-all duration-300"
              >
                <X size={20} />
              </button>
              
              <iframe
                src={getYouTubeEmbedUrl(latestStory.videoUrl, true)}
                title={latestStory.title}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

              {/* Sandbox/Embed Fallback Bar */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                <a
                  href={latestStory.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black/75 hover:bg-[#F2901C] text-white hover:text-black rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center lg:gap-1.5 backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Watch on YouTube ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
