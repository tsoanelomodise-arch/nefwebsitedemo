import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, CheckCircle2, Play, SlidersHorizontal, ChevronDown, Trash2, X, Briefcase, Zap, ShieldCheck
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import { NEF_FUNDS } from "./data/funds";

export default function OurFunds() {
  const navigate = useNavigate();

  // --- PORTFOLIO FINDER STATES ---
  const [selectedFund, setSelectedFund] = useState<typeof NEF_FUNDS[0] | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [comparisonList, setComparisonList] = useState<typeof NEF_FUNDS>([]);
  const [showComparison, setShowComparison] = useState(false);

  const [selectedFundTab, setSelectedFundTab] = useState<string>("All");
  const [selectedFundingRange, setSelectedFundingRange] = useState<string>("All");
  const [selectedCriteria, setSelectedCriteria] = useState<string>("All");
  const [selectedObjective, setSelectedObjective] = useState<string>("All");
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  // --- PORTFOLIO FINDER FILTER LOGIC ---
  const filteredFundsFinder = useMemo(() => {
    return NEF_FUNDS.filter(fund => {
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
  }, [selectedFundTab, selectedSector, selectedFundingRange, selectedCriteria, selectedObjective]);

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

  // --- HASH SMOOTH SCROLL ---
  useEffect(() => {
    if (window.location.hash === "#portfolio-finder") {
      setTimeout(() => {
        const el = document.getElementById("portfolio-finder");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#F2901C] selection:text-white pb-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-[#1E1B18]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
            alt="Our Funds" 
            className="w-full h-full object-cover grayscale opacity-20 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1E1B18]/90"></div>
        </div>
        
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 md:px-8 flex flex-col justify-center text-left">
          <Breadcrumbs />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F2901C] block mb-4">NEF Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight uppercase leading-none text-white mb-8">
              Our <br />
              <span className="font-serif italic text-[#F2901C]">Funds</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed font-light">
              We provide a diverse range of funding solutions tailored to the unique needs of black entrepreneurs 
              across various sectors of the South African economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Finder Section (Moved from Home page in its entirety) */}
      <section id="portfolio-finder" className="py-24 px-8 md:px-24 bg-[#FCFAF7] relative overflow-hidden border-y border-[#EFE6DA]/40">
        {/* Subtle visual grid lines */}
        <div className="absolute top-0 right-1/4 w-px h-full bg-[#1E1B18]/5 pointer-events-none"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-[#1E1B18]/5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Headings */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-14">
            <div className="max-w-3xl text-left">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C79F6E] mb-3 flex items-center gap-2">
                <SlidersHorizontal size={12} className="text-[#F2901C]" />
                Portfolio Finder
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-3xl font-sans font-black text-[#1E1B18] tracking-tighter uppercase leading-[0.95]">
                We help you find the <br />
                <span className="font-serif italic text-[#F2901C] text-4xl md:text-5xl">fund that will be yours</span>
              </h2>
            </div>
            <div className="text-left">
              <p className="text-[#3A3530]/75 text-xs md:text-sm max-w-xs leading-relaxed font-light">
                Our capital structures are designed for real empowerment, creating lasting economic participation and customized financial fit for black-owned projects.
              </p>
            </div>
          </div>

          {/* Property Listing Tabs */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-4 bg-neutral-200/40 p-1 rounded-2xl w-max max-w-full">
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
          <div className="bg-white border border-[#EFE6DA] rounded-3xl p-6 md:p-8 shadow-[0_32px_80px_rgba(42,38,34,0.04)] mb-14 text-left">
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-[#EFE6DA]/60">
              
              {/* Sector Select */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Sector / Industry</label>
                <div className="relative">
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#EFE6DA] rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#F2901C] cursor-pointer"
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
                    className="w-full bg-[#FAF8F5] border border-[#EFE6DA] rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#F2901C] cursor-pointer"
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
                    className="w-full bg-[#FAF8F5] border border-[#EFE6DA] rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#F2901C] cursor-pointer"
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
                    className="w-full bg-[#FAF8F5] border border-[#EFE6DA] rounded-xl px-4 py-3 text-xs text-[#1E1B18] font-medium appearance-none focus:outline-none focus:ring-1 focus:ring-[#F2901C] cursor-pointer"
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

            {/* Bottom Options Bar */}
            <div className="pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button
                onClick={() => setShowMoreOptions(prev => !prev)}
                className="text-xs font-bold text-neutral-500 hover:text-[#1E1B18] transition-colors flex items-center gap-1 cursor-pointer select-none"
              >
                <span className="text-sm">{showMoreOptions ? "−" : "+"}</span> More options & criteria guidance
              </button>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
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

                <a
                  href="#funds-results-anchor"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#161412] hover:bg-[#F2901C] text-white hover:text-white rounded-xl text-[10px] font-sans font-extrabold uppercase tracking-widest transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                >
                  Show Funds ({filteredFundsFinder.length})
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

          {/* Results Header */}
          <div id="funds-results-anchor" className="scroll-mt-24 mb-8 flex justify-between items-center border-b border-[#EFE6DA]/65 pb-4">
            <span className="text-[10px] font-black uppercase tracking-widest font-mono text-neutral-400">
              Filtered results ({filteredFundsFinder.length} portfolio models available)
            </span>
            {filteredFundsFinder.length === 0 && (
              <span className="text-xs text-red-500 font-bold">No match found. Clear filters above to explore.</span>
            )}
          </div>

          {/* Filtered Funds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFundsFinder.map((fund, index) => (
              <div
                key={fund.id}
                onClick={() => setSelectedFund(fund)}
                className={`p-10 md:p-12 bg-white border border-[#EFE6DA]/85 rounded-[2.2rem] group relative overflow-hidden min-h-[425px] flex flex-col justify-between text-left cursor-pointer transition-all duration-500 hover:shadow-[0_32px_80px_rgba(42,38,34,0.06)] transform hover:-translate-y-1 ${
                  comparisonList.find(f => f.id === fund.id) 
                    ? "ring-2 ring-[#F2901C] ring-inset shadow-xl scale-[0.99]" 
                    : ""
                }`}
              >
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-black text-[#F2901C] tracking-widest">{fund.id}</span>
                    {comparisonList.find(f => f.id === fund.id) && (
                      <div className="bg-[#F2901C] text-[#1E1B18] rounded-full p-0.5">
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
                  
                  {/* Mini dynamic details inside cards */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {fund.details.sectors.slice(0, 3).map((sect, sIdx) => (
                      <span key={sIdx} className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded">
                        {sect}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-full bg-[#1E1B18] flex items-center justify-center text-white group-hover:bg-[#F2901C] group-hover:text-white transition-colors duration-300 shadow-sm">
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

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-[#1E1B18] text-white overflow-hidden relative border-t border-white/5 shadow-xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F2901C] opacity-5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-sans font-light uppercase tracking-tight mb-8 leading-none">
              Start Your <span className="font-serif italic text-[#F2901C]">Journey</span> Today
            </h2>
            <p className="text-sm md:text-base text-white/50 mb-12 leading-relaxed font-light">
              Our investment team is ready to support your growth. If you meet our criteria, 
              we invite you to start the application process today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/how-to-apply"
                className="px-10 py-4 bg-[#F2901C] text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-white hover:text-[#1E1B18] transition-all duration-300 hover:scale-105 shadow-md"
              >
                Apply Now
              </Link>
              <Link 
                to="/funding-criteria"
                className="px-10 py-4 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-white hover:text-[#1E1B18] transition-all duration-300 hover:scale-105 bg-white/5"
              >
                View Criteria
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARATIVE OVERLAYS (Copied from App.tsx in its entirety) --- */}

      {/* Comparison Bar */}
      {comparisonList.length > 0 && (
        <div
          className="fixed bottom-0 left-0 w-full bg-black text-white z-[60] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-8">
            <div className="hidden md:block text-left">
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
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-left">Fund Comparison</h2>
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
                            <div className="text-left">
                              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 block">{fund.id}</span>
                              <h3 className="text-xl font-bold uppercase tracking-tighter leading-none">{fund.title}</h3>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-left">
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
              className="absolute top-6 right-6 z-10 p-2 bg-black text-white hover:bg-gold-foil hover:text-black transition-colors hover:rotate-90 animate-spin-once"
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
              <div className="absolute inset-0 bg-[#F2901C] mix-blend-multiply opacity-40 animate-fade-in"></div>
              <div className="absolute bottom-8 left-8">
                <selectedFund.icon size={48} className="text-white" />
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-16 overflow-y-auto">
              <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 block text-left">Fund Details / {selectedFund.id}</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 uppercase text-left leading-none">{selectedFund.title}</h2>
              
              <div className="space-y-12 text-left">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F2901C]"></div>
                    Objective
                  </h4>
                  <p className="text-lg text-gray-600 leading-relaxed italic font-light">
                    "{selectedFund.details.objective}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F2901C]"></div>
                      Key Criteria
                    </h4>
                    <ul className="space-y-4">
                      {selectedFund.details.criteria.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-500 font-light">
                          <CheckCircle2 size={16} className="text-black mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F2901C]"></div>
                      Focus Sectors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFund.details.sectors.map((sector, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedFund.products && selectedFund.products.length > 0 && (
                  <div className="pt-12 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#F2901C]"></div>
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
                          className={`p-6 bg-gray-50 border-l-4 border-[#F2901C] group transition-all duration-300 hover:bg-black hover:text-white ${product.href ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <h5 className="font-bold uppercase tracking-tighter mb-2 group-hover:text-white transition-colors text-sm">{product.name}</h5>
                            {product.href && <ArrowRight size={16} className="text-[#F2901C] opacity-0 group-hover:opacity-100 transition-opacity" />}
                          </div>
                          <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors font-light">{product.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      setSelectedFund(null);
                      navigate("/how-to-apply");
                    }}
                    className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#F2901C] hover:text-[#1E1B18] transition-colors flex items-center justify-center gap-4 text-xs"
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
