import { ArrowRight, Briefcase, ShieldCheck, Users, Zap, Menu, X, ChevronRight, ChevronLeft, Play, CheckCircle2, ArrowLeft, ChevronDown, Twitter, Linkedin, Facebook, Search, Trash2, SlidersHorizontal } from "lucide-react";
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
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [activeSection, setActiveSection] = useState("01");
  const location = useLocation();
  const navigate = useNavigate();

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
  const [selectedFund, setSelectedFund] = useState<typeof NEF_FUNDS[0] | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [comparisonList, setComparisonList] = useState<typeof NEF_FUNDS>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Property search inspired states
  const [selectedFundTab, setSelectedFundTab] = useState<string>("All");
  const [selectedFundingRange, setSelectedFundingRange] = useState<string>("All");
  const [selectedCriteria, setSelectedCriteria] = useState<string>("All");
  const [selectedObjective, setSelectedObjective] = useState<string>("All");
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const filteredFunds = NEF_FUNDS.filter(fund => {
    // 1. Tab filter (category)
    if (selectedFundTab !== "All" && fund.id !== selectedFundTab) {
      return false;
    }
    
    // 2. Sector filter (selectedSector)
    if (selectedSector !== "All" && !fund.details.sectors.includes(selectedSector)) {
      return false;
    }

    // 3. Size / range filter
    if (selectedFundingRange !== "All") {
      if (selectedFundingRange === "small" && fund.id !== "01") return false;
      if (selectedFundingRange === "medium" && fund.id !== "02") return false;
      if (selectedFundingRange === "community" && fund.id !== "03") return false;
      if (selectedFundingRange === "large" && fund.id !== "04") return false;
    }

    // 4. Criteria matching
    if (selectedCriteria !== "All") {
      if (selectedCriteria === "black-owned" && !fund.details.criteria.some(c => c.toLowerCase().includes("black-owned"))) return false;
      if (selectedCriteria === "community" && !fund.details.criteria.some(c => c.toLowerCase().includes("community"))) return false;
      if (selectedCriteria === "industrial" && !fund.details.criteria.some(c => c.toLowerCase().includes("industrial") || c.toLowerCase().includes("strategic"))) return false;
      if (selectedCriteria === "export" && !fund.details.criteria.some(c => c.toLowerCase().includes("export"))) return false;
      if (selectedCriteria === "rural" && !fund.details.criteria.some(c => c.toLowerCase().includes("rural"))) return false;
    }

    // 5. Objective matching
    if (selectedObjective !== "All") {
      const objLower = fund.details.objective.toLowerCase();
      if (selectedObjective === "entrepreneurship" && !objLower.includes("entrepreneur")) return false;
      if (selectedObjective === "bee" && !objLower.includes("participation") && !objLower.includes("bee")) return false;
      if (selectedObjective === "rural" && !objLower.includes("rural") && !objLower.includes("community")) return false;
      if (selectedObjective === "impact" && !objLower.includes("high-impact") && !objLower.includes("industrial")) return false;
    }

    return true;
  });

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
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#E89D7A] selection:text-white flex flex-col relative">
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
                    ? "text-[#E89D7A] border-[#E89D7A]" 
                    : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
                }`}
              >
                About the NEF
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
                    ? "text-[#E89D7A] border-[#E89D7A]" 
                    : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
                }`}
              >
                Funding Solutions
                <ChevronDown size={11} className={`transition-transform duration-300 ${activeMegaMenu === "funding" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* FAQ */}
            <button
              onClick={() => handleNavItemClick({ href: "/faq", isExternal: true })}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer h-full border-b-2 flex items-center ${
                location.pathname === "/faq"
                  ? "text-[#E89D7A] border-[#E89D7A]" 
                  : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
              }`}
            >
              FAQ
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavItemClick({ href: "#contact", isExternal: false })}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer h-full border-b-2 flex items-center ${
                activeSection === "07" && !isSubPage
                  ? "text-[#E89D7A] border-[#E89D7A]" 
                  : "text-neutral-500 border-transparent hover:text-[#1E1B18]"
              }`}
            >
              Contact
            </button>
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
                <div className="text-[10px] text-[#C79F6E] font-extrabold uppercase tracking-wide group-hover:text-[#E89D7A] transition-colors">Ask an Advisor.</div>
              </div>
            </div>

            {/* Social Media Links (Visible at all times inside header) */}
            <div className="flex items-center gap-2 border-r border-[#EFE6DA]/40 pr-4 mr-1">
              <a 
                href="https://twitter.com/nefcorp" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Twitter"
                className="text-neutral-400 hover:text-[#E89D7A] transition-colors p-1"
              >
                <Twitter size={14} />
              </a>
              <a 
                href="https://www.linkedin.com/company/national-empowerment-fund" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-neutral-400 hover:text-[#E89D7A] transition-colors p-1"
              >
                <Linkedin size={14} />
              </a>
              <a 
                href="https://www.facebook.com/NationalEmpowermentFund" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Facebook"
                className="text-neutral-400 hover:text-[#E89D7A] transition-colors p-1"
              >
                <Facebook size={14} />
              </a>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => navigate("/check-eligibility")}
              className="px-6 py-2.5 bg-[#1E1B18] text-[#FCFAF7] hover:bg-[#E89D7A] hover:text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
              Check Eligibility
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#1E1B18] hover:text-[#E89D7A] transition-colors relative z-[120]"
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <ShieldCheck size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <Users size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <Briefcase size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <ArrowRight size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E89D7A]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E89D7A]/10 transition-all duration-500"></div>
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
                        className="relative z-10 mt-6 px-5 py-2 bg-[#1E1B18] text-white hover:bg-[#E89D7A] rounded-full self-start text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer"
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <Briefcase size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs uppercase tracking-tight text-[#1E1B18] group-hover:text-[#C79F6E] transition-colors">Our Main Funds</h5>
                            <p className="text-neutral-500 font-light text-[11px] leading-relaxed mt-1">
                              Structural capital programs addressing franchising, rural, and industrial lifecycles.
                            </p>
                          </div>
                        </button>
                        <button
                          onClick={() => handleNavItemClick({ href: "/funding-criteria", isExternal: true })}
                          className="group p-3 rounded-2xl hover:bg-[#FCFAF7] transition-all duration-300 text-left flex gap-4"
                        >
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <ShieldCheck size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <Zap size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <Users size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-10 h-10 shrink-0 bg-neutral-100 rounded-xl flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <ArrowRight size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-8 h-8 shrink-0 bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200/50 group-hover:bg-[#E89D7A]/15 group-hover:border-[#E89D7A]/30 transition-colors">
                            <Users size={14} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors" />
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
                          <div className="w-8 h-8 shrink-0 bg-[#E89D7A]/10 text-[#E89D7A] rounded-lg flex items-center justify-center border border-[#E89D7A]/20 transition-colors">
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
                          <div className="w-8 h-8 shrink-0 bg-[#E89D7A]/10 text-[#E89D7A] rounded-lg flex items-center justify-center border border-[#E89D7A]/20 transition-colors">
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

                    {/* Column 4: Featured Portal Bento (Charcoal Theme) - Eligibility Focus */}
                    <div className="col-span-3 bg-[#1E1B18] text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-white/5 min-h-[220px] group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E89D7A]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#E89D7A]/15 transition-all duration-500"></div>
                      <div className="space-y-3 relative z-10">
                        <span className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#E89D7A] block">Instant Screening</span>
                        <h4 className="text-lg font-sans font-light uppercase tracking-tight">Partner with the NEF</h4>
                        <p className="text-white/50 text-[11px] font-light leading-relaxed">
                          Take our simplified business screening layout matrix. Verify your matching capital structures online in less than 3 minutes.
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setActiveMegaMenu(null);
                          navigate("/check-eligibility");
                        }}
                        className="relative z-10 mt-6 px-5 py-2 bg-[#E89D7A] text-white hover:bg-white hover:text-[#1E1B18] rounded-full self-start text-[9px] font-bold uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
                      >
                        Check Eligibility
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
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Mandate, Mission & Vision
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/performance-report-2025", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Performance Report 2025
                  </button>
                </div>
              </div>

              {/* Funding Solutions Group */}
              <div className="space-y-2.5">
                <div className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E]">Funding Solutions</div>
                <div className="pl-4 flex flex-col gap-2 border-l border-[#EFE6DA]/60">
                  <button
                    onClick={() => handleNavItemClick({ href: "/our-funds", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Our Funds
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/funding-criteria", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Funding Criteria
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/check-eligibility", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Check Eligibility
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/non-financial-support", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Non-Financial Support
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "/how-to-apply", isExternal: true })}
                    className="text-sm font-sans font-normal text-left text-neutral-600 hover:text-[#E89D7A] transition-colors"
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
                  className="text-xl font-sans font-light text-left uppercase tracking-tight block w-full hover:text-[#E89D7A] transition-colors"
                >
                  Investee Stories
                </button>
              </div>

              {/* FAQ and Contact */}
              <div className="space-y-2">
                <div className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#C79F6E]">Support & Portal</div>
                <div className="flex gap-6 pl-4 border-l border-[#EFE6DA]/60">
                  <button
                    onClick={() => handleNavItemClick({ href: "/faq", isExternal: true })}
                    className="text-sm font-sans text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => handleNavItemClick({ href: "#contact", isExternal: false })}
                    className="text-sm font-sans text-neutral-600 hover:text-[#E89D7A] transition-colors"
                  >
                    Contact
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
              <section id="home" className="relative h-screen overflow-hidden bg-gradient-to-b from-[#8FA3B0] via-[#C9AFA3] to-[#E6A07E]">
                
                {/* 1. Atmospheric Background Blend */}
                <div className="absolute inset-0 z-10 transition-all duration-1000 ease-in-out">
                  <img 
                    src={HERO_SLIDES[currentSlide].image} 
                    alt={HERO_SLIDES[currentSlide].title} 
                    className="w-full h-full object-cover grayscale opacity-20 contrast-125 scale-102 transition-all duration-1000 mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7]/20 via-transparent to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#E6A07E]/10 z-10"></div>
                </div>

                {/* 2. Distinctive Rounded Formatting Frame (Border Overlay Inspired by Mockup) */}
                <div 
                  className="absolute inset-4 md:inset-8 border-[3px] border-white/90 rounded-[2.5rem] pointer-events-none z-30"
                  style={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 32% 100%, 32% 90%, 8% 90%, 8% 100%, 0% 100%)" 
                  }}
                />

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
                              {/* Top metadata row inside card */}
                              <div className="flex items-center justify-between w-full">
                                <div className="p-1 px-2.5 rounded-full bg-white/10 text-[9px] font-mono tracking-wider opacity-90 border border-white/10 uppercase">
                                  {index === 0 && "BEE"}
                                  {index === 1 && "CAPITAL"}
                                  {index === 2 && "MAIN"}
                                </div>
                                <span className={`text-[9px] font-mono font-bold ${isActive ? "text-neutral-400" : "text-white/40"}`}>
                                  {slide.id}
                                </span>
                              </div>

                              {/* Title / Description area inside card */}
                              <div className="mt-4">
                                <h4 className={`text-xs md:text-[13px] font-sans font-black uppercase tracking-wider ${isActive ? "text-[#1E1B18]" : "text-white"}`}>
                                  {index === 0 && "Transformation"}
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
                                  <span className="text-[8.5px] font-sans font-extrabold uppercase tracking-widest text-[#E89D7A] flex items-center gap-1">
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
                    <div className="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col gap-5 text-left md:pl-10">
                      <div>
                        {/* Slide Subtitle tracking label */}
                        <span className="text-[9.5px] font-extrabold uppercase tracking-[0.3em] text-[#E89D7A] block mb-2 font-mono">
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
                            className="px-6 py-3 bg-white text-[#1E1B18] hover:bg-[#E89D7A] hover:text-white rounded-full text-[9px] font-sans font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
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
                      </div>
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

              {/* Funds Grid (Property Listing Search Module) */}
              <section id="funds" className="py-24 px-8 md:px-24 bg-[#FCFAF7] relative overflow-hidden border-b border-[#FAF6F0]">
                {/* Subtle visual grid lines like Adler theme */}
                <div className="absolute top-0 right-1/4 w-px h-full bg-[#1E1B18]/5 pointer-events-none"></div>
                <div className="absolute top-1/3 left-0 w-full h-px bg-[#1E1B18]/5 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                  
                  {/* Headings aligned corresponding to reference image */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-14">
                    <div className="max-w-3xl">
                      <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C79F6E] mb-3 flex items-center gap-2">
                        <SlidersHorizontal size={12} className="text-[#E89D7A]" />
                        Portfolio Finder
                      </div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-[#1E1B18] tracking-tighter uppercase leading-[0.95]">
                        We help you find the <br />
                        <span className="font-serif italic text-[#E89D7A]">fund that will be yours</span>
                      </h2>
                    </div>
                    <div>
                      <p className="text-[#3A3530]/75 text-xs md:text-sm max-w-xs leading-relaxed font-light">
                        Our capital structures are designed for real empowerment, creating lasting economic participation and customized financial fit for black-owned projects.
                      </p>
                    </div>
                  </div>

                  {/* Property Listing Tabs (Buy, Rent, New developments...) */}
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4 bg-neutral-100 p-1 rounded-2xl w-max max-w-full">
                    {[
                      { id: "All", label: "All Capital Models" },
                      { id: "01", label: "iMbewu Fund" },
                      { id: "02", label: "uMnotho Fund" },
                      { id: "03", label: "Rural & Community" },
                      { id: "04", label: "Strategic Projects" },
                    ].map((tab) => {
                      const isActive = selectedFundTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedFundTab(tab.id)}
                          className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                            isActive
                              ? "bg-white text-[#1E1B18] shadow-sm font-black"
                              : "text-neutral-500 hover:text-[#1E1B18] hover:bg-white/50"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* White Search Box with selectors and bottom bar */}
                  <div className="bg-white border border-[#EFE6DA] rounded-3xl p-6 md:p-8 shadow-[0_32px_80px_rgba(42,38,34,0.04)] mb-14">
                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-[#EFE6DA]/60">
                      
                      {/* Sector Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Sector / Industry</label>
                        <div className="relative">
                          <select
                            value={selectedSector}
                            onChange={(e) => setSelectedSector(e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-neutral-150 rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#E89D7A] cursor-pointer"
                          >
                            <option value="All">All Sectors</option>
                            <option value="Franchising">Franchising</option>
                            <option value="Procurement">Procurement</option>
                            <option value="Start-ups">Start-ups</option>
                            <option value="Acquisition Finance">Acquisition Finance</option>
                            <option value="Project Finance">Project Finance</option>
                            <option value="Expansion Capital">Expansion Capital</option>
                            <option value="Capital Markets">Capital Markets</option>
                            <option value="Agro-processing">Agro-processing</option>
                            <option value="Tourism">Tourism & Leisure</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Services">Services Providers</option>
                            <option value="Energy">Energy Sectors</option>
                            <option value="Mining">Mining & Minerals</option>
                            <option value="Infrastructure">Infrastructure Developer</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Funding Range Limit Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Funding Range</label>
                        <div className="relative">
                          <select
                            value={selectedFundingRange}
                            onChange={(e) => setSelectedFundingRange(e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-neutral-150 rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#E89D7A] cursor-pointer"
                          >
                            <option value="All">All ranges (R250k - R50M+)</option>
                            <option value="small">Up to R10 Million (iMbewu)</option>
                            <option value="medium">R10M - R50 Million (uMnotho)</option>
                            <option value="community">Rural & Community Funds</option>
                            <option value="large">R50 Million + (Strategic)</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Criteria Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Target Criteria</label>
                        <div className="relative">
                          <select
                            value={selectedCriteria}
                            onChange={(e) => setSelectedCriteria(e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-neutral-150 rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#E89D7A] cursor-pointer"
                          >
                            <option value="All">All Criteria Settings</option>
                            <option value="black-owned">Majority Black Owned</option>
                            <option value="community">Community Based Entity</option>
                            <option value="industrial">Strategic Industrial Impact</option>
                            <option value="export">High Export Potential</option>
                            <option value="rural">Rural Focus Area</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Objective Select */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Asset Objective</label>
                        <div className="relative">
                          <select
                            value={selectedObjective}
                            onChange={(e) => setSelectedObjective(e.target.value)}
                            className="w-full bg-[#FAF8F5] border border-neutral-150 rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#E89D7A] cursor-pointer"
                          >
                            <option value="All">Any Strategic Objective</option>
                            <option value="entrepreneurship">Promote Startups & Tenders</option>
                            <option value="bee">Acquire BEE Capital Shares</option>
                            <option value="rural">Promote Local Co-Ops</option>
                            <option value="impact">High Industrialization Growth</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                        </div>
                      </div>

                    </div>

                    {/* Bottom Options Bar (More Options & Action Buttons mimicking reference) */}
                    <div className="pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <button
                        onClick={() => setShowMoreOptions(prev => !prev)}
                        className="text-xs font-bold text-neutral-500 hover:text-[#1E1B18] transition-colors flex items-center gap-1 cursor-pointer select-none"
                      >
                        <span className="text-sm">{showMoreOptions ? "−" : "+"}</span> More options & criteria guidance
                      </button>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                        {/* Clear Filters Button mimicking screenshot */}
                        <button
                          onClick={() => {
                            setSelectedSector("All");
                            setSelectedFundTab("All");
                            setSelectedFundingRange("All");
                            setSelectedCriteria("All");
                            setSelectedObjective("All");
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-red-500 hover:bg-neutral-50 transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                          Clear filters
                        </button>

                        {/* High Impact Show Funds Button */}
                        <a
                          href="#funds-results-anchor"
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#161412] hover:bg-[#E89D7A] text-white hover:text-white rounded-xl text-[10px] font-sans font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                        >
                          Show Funds ({filteredFunds.length})
                        </a>
                      </div>
                    </div>

                    {/* Expandable Criteria Block */}
                    <AnimatePresence>
                      {showMoreOptions && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-[#EFE6DA]/40 text-neutral-500 text-[11px] leading-relaxed grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                          <div>
                            <h5 className="font-sans font-bold text-[#1E1B18] uppercase tracking-wider text-[10px] mb-1.5">Compliance Mandatory:</h5>
                            <p>All vehicles require direct operational involvement by black entrepreneurs, validated business plan proof of sustainability, and legal compliance structures.</p>
                          </div>
                          <div>
                            <h5 className="font-sans font-bold text-[#1E1B18] uppercase tracking-wider text-[10px] mb-1.5">Economic Benefit:</h5>
                            <p>Funding allocations focus strictly on job creation leverage points, skills transfer commitment, and measurable local community value contribution.</p>
                          </div>
                          <div>
                            <h5 className="font-sans font-bold text-[#1E1B18] uppercase tracking-wider text-[10px] mb-1.5">Preferential Limits:</h5>
                            <p>Range thresholds map from R250,000 up to R75,000,000. Start-up projects target up to R10M while larger commercial joint-ventures obtain customized strategic capital.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Results Header anchor segment */}
                  <div id="funds-results-anchor" className="scroll-mt-24 mb-8 flex justify-between items-center border-b border-[#EFE6DA]/65 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest font-mono text-neutral-400">
                      Filtered results ({filteredFunds.length} portfolio models available)
                    </span>
                    {filteredFunds.length === 0 && (
                      <span className="text-xs text-red-500 font-bold">No match found. Clear filters above to explore.</span>
                    )}
                  </div>

                  {/* Filtered Funds Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredFunds.map((fund, index) => (
                      <div
                        key={fund.id}
                        onClick={() => setSelectedFund(fund)}
                        className={`p-10 md:p-12 bg-white border border-[#EFE6DA]/85 rounded-[2.2rem] group relative overflow-hidden min-h-[425px] flex flex-col justify-between cursor-pointer transition-all duration-500 hover:shadow-[0_32px_80px_rgba(42,38,34,0.06)] transform hover:-translate-y-1 ${
                          comparisonList.find(f => f.id === fund.id) 
                            ? "ring-2 ring-[#E89D7A] ring-inset shadow-xl scale-[0.99]" 
                            : ""
                        }`}
                      >
                        <div className="relative z-10 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono font-black text-[#E89D7A] tracking-widest">{fund.id}</span>
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
                          
                          {/* Mini dynamic details inside cards to enrich property-style format */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {fund.details.sectors.slice(0, 3).map((sect, sIdx) => (
                              <span key={sIdx} className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded">
                                {sect}
                              </span>
                            ))}
                          </div>
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

                </div>
              </section>

              {/* About Section (Placed directly below `#funds`) */}
              <section id="about" className="py-24 px-8 md:px-24 bg-[#FAF8F5] relative overflow-hidden border-b border-[#FAF6F0]">
                <div className="absolute top-0 right-1/4 w-px h-full bg-[#1E1B18]/5 pointer-events-none"></div>
                <div className="absolute top-1/3 right-0 w-1/4 h-px bg-[#1E1B18]/5 pointer-events-none"></div>
                
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
