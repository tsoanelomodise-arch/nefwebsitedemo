import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Download, TrendingUp, Users, Briefcase, Globe, Award, BarChart3, PieChart, Activity, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom high-fidelity NEF Logo Component from the Cover Page
const NefLogo = ({ className = "text-white" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-9 h-9 flex-shrink-0 text-current">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor">
        {/* Three legendary curved empowerment lines from official logo */}
        <path d="M25,15 C10,35 10,65 25,85" strokeWidth="8" strokeLinecap="round" opacity="0.65" />
        <path d="M40,15 C25,35 25,65 40,85" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
        <path d="M55,15 C40,35 40,65 55,85" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
    <div className="flex flex-col leading-[1.05] text-current">
      <span className="font-serif font-black text-[11px] md:text-xs tracking-wider uppercase text-left">National</span>
      <span className="font-serif font-black text-[11px] md:text-xs tracking-wider uppercase text-left">Empowerment</span>
      <span className="font-serif font-black text-[11px] md:text-xs tracking-wider uppercase text-left">Fund</span>
      <span className="text-[5.5px] font-sans font-light tracking-wide opacity-80 uppercase mt-0.5 text-left">Growing Black Economic Participation</span>
    </div>
  </div>
);

// Interactive Infographics Dataset definitions
const SECTOR_DATA = [
  { name: "Agro-Processing", share: 24, keyProj: "Eastern Cape Citrus Farms", ticket: "R10m - R50m", jobs: "26,800+" },
  { name: "Retail & Franchise", share: 22, keyProj: "National Food Retail Cooperatives", ticket: "R5m - R15m", jobs: "14,500+" },
  { name: "Healthcare & Services", share: 21, keyProj: "Busamed Clinic Extensions", ticket: "R8m - R30m", jobs: "22,600+" },
  { name: "Construction & Infra", share: 18, keyProj: "Municipal Infrastructure Rail Project", ticket: "R15m - R45m", jobs: "19,200+" },
  { name: "Renewable Energy", share: 15, keyProj: "Karas Solar Power Fields", ticket: "R20m - R75m", jobs: "8,900+" }
];

const PROVINCIAL_DATA = [
  { code: "GP", name: "Gauteng", share: "28%", capital: "R2.07bn", description: "Industrial manufacturing and commercial franchising hubs." },
  { code: "KZN", name: "KwaZulu-Natal", share: "22%", capital: "R1.63bn", description: "Maritime logistics, sugar farming, and automotive supplies." },
  { code: "WC", name: "Western Cape", share: "14%", capital: "R1.04bn", description: "Agro-processing, green energy, and technology startups." },
  { code: "LP", name: "Limpopo", share: "10%", capital: "R0.74bn", description: "Mining operations partnerships and local commercial retail." },
  { code: "MP", name: "Mpumalanga", share: "9%", capital: "R0.67bn", description: "Forestry, coal supply logistics, and tourism networks." },
  { code: "EC", name: "Eastern Cape", share: "8%", capital: "R0.59bn", description: "Automotive assembly supply chain and community farming." },
  { code: "FS", name: "Free State", share: "5%", capital: "R0.37bn", description: "Agricultural grain processing and community development." },
  { code: "NW", name: "North West", share: "3%", capital: "R0.22bn", description: "Local mining services and small-scale manufacturing." },
  { code: "NC", name: "Northern Cape", share: "1%", capital: "R0.07bn", description: "Solar power field initiatives and eco-tourism structures." }
];

const TRANS_TRAJECTORY = [
  { year: "2021", approvals: "R4.8bn", disbursed: "R4.1bn", highlight: "Pillar Phase 1 launch with provincial pilot offices.", jobs: "64,000" },
  { year: "2022", approvals: "R5.3bn", disbursed: "R4.6bn", highlight: "Agro-Processing focus boosting food security.", jobs: "72,500" },
  { year: "2023", approvals: "R6.1bn", disbursed: "R5.2bn", highlight: "Green Grid initiative supporting renewable startups.", jobs: "81,000" },
  { year: "2024", approvals: "R6.8bn", disbursed: "R5.9bn", highlight: "Township Revitalization Scheme deployed nationally.", jobs: "95,000" },
  { year: "2025", approvals: "R7.4bn", disbursed: "R6.5bn", highlight: "Black Industrialists capstone and record integration.", jobs: "112,000" }
];

export default function PerformanceReport2025() {
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'financial' | 'social'>('all');
  
  // State for interactive infographics
  const [activeSector, setActiveSector] = useState(0);
  const [activeProvince, setActiveProvince] = useState<string | null>("GP");
  const [activeYearIndex, setActiveYearIndex] = useState(4); // Default to latest (2025)

  const stats = [
    { label: "Total Approvals", value: "R7.4bn", description: "All-time high strategic funding approvals", icon: Award, color: "bg-[#F2901C]", textColor: "text-white" },
    { label: "Jobs Supported", value: "112,000+", description: "Decent opportunities created & sustained", icon: Users, color: "bg-[#C79F6E]", textColor: "text-white" },
    { label: "SMMEs Funded", value: "1,240+", description: "Black-owned small and medium enterprises", icon: Briefcase, color: "bg-[#F2901C]", textColor: "text-white" },
    { label: "Black Women Owned", value: "42%", description: "Direct ownership by black female industrialists", icon: Globe, color: "bg-[#C79F6E]", textColor: "text-white" },
  ];

  const highlights = [
    {
      title: "Strategic Growth Catalyst",
      description: "Significant capital expansion supporting high-growth industries including agro-processing, green energy, telecommunications, and advanced manufacturing.",
      trend: "+18% YoY Growth",
      icon: TrendingUp
    },
    {
      title: "Streamlined Dispensation Protocols",
      description: "Implemented state-of-the-art diagnostic assessment systems, cutting application turnaround times by up to 30% without breaching compliance frameworks.",
      trend: "30% Faster Turnaround",
      icon: BarChart3
    },
    {
      title: "Township & Rural Revitalization",
      description: "Delivering crucial economic support directly to overlooked municipal jurisdictions, reinforcing local bakeries, clinics, and infrastructure networks.",
      trend: "R1.2bn Disbursed",
      icon: PieChart
    }
  ];

  const socialImpactMetrics = [
    { label: "Black Youth Ownership", value: "34%", target: "30% Target met" },
    { label: "Broad-Based Schemes", value: "56", target: "Community trusts supported" },
    { label: "Provincial Spread Index", value: "9/9", target: "All South African provinces touched" },
    { label: "Non-Financial Incubation", value: "4,500+", target: "Entrepreneurs trained in 2025" }
  ];

  const handleDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      
      // Simulate clean academic file download
      const element = document.createElement("a");
      const file = new Blob([
        `NATIONAL EMPOWERMENT FUND (NEF) - PERFORMANCE REPORT 2025\n\n` +
        `This is a high-fidelity summary report generated in the testing environment.\n` +
        `Key Performance Indicators:\n` +
        `- Total Approvals: R7.4bn\n` +
        `- Jobs Supported: 112,000+\n` +
        `- Business Mentorship programs completed: 1,240\n` +
        `- Black Women-Owned Enterprises ratio: 42%\n` +
        `- Rural & Local Township Funding: R1.2bn\n` +
        `\nThank you for reviewing the National Empowerment Fund manual and performance indicators.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "NEF_Performance_Report_2025_Summary.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#161412] text-white font-sans selection:bg-[#F2901C] selection:text-[#1E1B18] relative overflow-x-hidden">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-100"
        style={{
          backgroundImage: 'url("https://donotdelete.wonderlandstudio.co.za/nef/background_2.png")',
        }}
      ></div>

      {/* Glow Backdrops */}
      <div className="absolute top-0 right-1/4 w-128 h-128 bg-[#F2901C]/5 rounded-full blur-[10rem] pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#C79F6E]/5 rounded-full blur-[10rem] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#F2901C]/5 rounded-full blur-[10rem] pointer-events-none z-0"></div>

      {/* Premium Branded Navigation - Glass Dark Theme */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#161412]/80 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C79F6E] hover:text-[#F2901C] transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Small center logo */}
        <div className="hidden lg:flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <NefLogo className="text-white" />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2.5 bg-[#F2901C] text-white text-[9px] font-sans font-extrabold uppercase tracking-widest hover:bg-white hover:text-[#1E1B18] transition-all flex items-center gap-2 shadow-md rounded-full hover:-translate-y-0.5 active:translate-y-0"
          >
            {downloading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Compiling...
              </>
            ) : (
              <>
                <Download size={14} />
                Download PDF
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Book-Cover Section - Refitted as Dark Cinematic Marvel */}
      <header className="pt-24 pb-12 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="relative min-h-[75vh] md:min-h-[85vh] bg-[#1E1B18] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-16 border border-white/5">
          
          {/* Background Image Layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-100"
            style={{
              backgroundImage: 'url("https://donotdelete.wonderlandstudio.co.za/nef/crane_image_202606291236.jpeg")',
            }}
          ></div>

          {/* Central content Spacer */}
          <div className="relative z-10 w-full mb-8"></div>

          {/* Core Content Zone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 w-full mt-auto">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="col-span-1 lg:col-span-7 text-left p-2 md:p-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 text-[#C79F6E] rounded-full mb-6">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider font-bold">
                  Promotion of Access to Economic Equality
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-sans font-black tracking-tight leading-[1.05] uppercase text-white">
                Performance <br />
                <span className="font-serif italic text-[#F2901C] lowercase">manual 2025</span>
              </h1>

              <div className="h-1.5 w-24 bg-[#F2901C] my-6 rounded-full"></div>

              <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-xl font-light">
                In terms of the National Empowerment Fund Act, No 105 of 1998, 
                this document showcases key performance indicators (KPIs), operational 
                disbursements, enterprise funding frameworks, and social transformation 
                outcomes for the latest financial review period.
              </p>
            </motion.div>

            {/* Right spacer zone */}
            <div className="hidden lg:block lg:col-span-5 h-1"></div>
          </div>

        </div>
      </header>

      {/* Secondary Quick Download Notification Banner */}
      <AnimatePresence>
        {downloadSuccess && (
          <div className="max-w-7xl mx-auto px-4 md:px-12 mb-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-left gap-4 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F2901C] text-white flex items-center justify-center">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F2901C]">Performance Report Compiled</h4>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">Your official offline copy reference file has successfully downloaded to your computer.</p>
                </div>
              </div>
              <button 
                onClick={() => setDownloadSuccess(false)}
                className="text-xs font-bold text-neutral-400 hover:text-white uppercase px-3"
              >
                Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pb-32 px-4 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Core Financial Indicators */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-8 text-left">
            <div>
              <span className="text-[#C79F6E] text-[10px] font-mono uppercase tracking-[0.4em] mb-2 block">Empowerment Dimensions</span>
              <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight uppercase leading-none text-white">
                Core <span className="font-serif italic text-[#F2901C] lowercase">performance highlights</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-md">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'all' ? 'bg-[#F2901C] text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
              >
                Comprehensive
              </button>
              <button 
                onClick={() => setActiveTab('financial')}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'financial' ? 'bg-[#F2901C] text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
              >
                Financial KPIs
              </button>
              <button 
                onClick={() => setActiveTab('social')}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'social' ? 'bg-[#F2901C] text-white shadow-md' : 'text-neutral-400 hover:text-white'}`}
              >
                Transformation
              </button>
            </div>
          </div>

          {/* Core Stats Grid (Matched to Annual Review style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              // Filtering logic
              if (activeTab === 'financial' && (index === 1 || index === 3)) return null;
              if (activeTab === 'social' && (index === 0 || index === 2)) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 border border-white/5 rounded-[2rem] p-8 hover:border-[#F2901C]/20 transition-all duration-300 group shadow-xl relative overflow-hidden text-left backdrop-blur-sm"
                >
                  {/* Neon Spotlight Glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2901C]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#F2901C]/10 transition-all duration-500"></div>
                  
                  {/* Top neon accent bar */}
                  <div className={`absolute top-0 inset-x-0 h-1 ${stat.color}`}></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-[#1E1B18] scale-100 group-hover:scale-110 transition-transform shadow-md shadow-[#F2901C]/10`}>
                      <stat.icon size={22} />
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#F2901C] font-bold bg-[#F2901C]/10 px-2.5 py-1 rounded-full">Approved</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl md:text-5xl font-black tracking-tight text-white group-hover:text-[#F2901C] transition-colors">{stat.value}</div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#C79F6E]">{stat.label}</h3>
                    <p className="text-[11px] text-neutral-400 font-light leading-relaxed">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Detailed Insights & Pillars */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
          
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[#C79F6E] text-[9px] font-mono uppercase tracking-[0.4em] mb-2 block">Strategic Intent</span>
            <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-white uppercase leading-none">
              Transformational <br /><span className="font-serif italic text-[#F2901C] lowercase">pillars of SA</span>
            </h2>
            <div className="h-1.5 w-16 bg-[#F2901C] rounded-full"></div>
            
            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              We leverage deliberate, commercial, and structural capital tools to catalyze significant 
              and permanent economic integration of historically disadvantaged business operators 
              across key national economic segments.
            </p>

            <div className="bg-white/5 border border-white/5 backdrop-blur-md p-6 rounded-2xl space-y-3 border-l-4 border-l-[#F2901C]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C79F6E]">Empowerment Charter Compliance</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Our active transaction verification models score above average on strategic industrial codes, ensuring absolute trust and maximum national impact.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {highlights.map((item, index) => (
              <div 
                key={index} 
                className="p-8 bg-white/5 border border-white/5 rounded-3xl relative overflow-hidden group hover:border-[#F2901C]/20 transition-all duration-350 shadow-xl flex flex-col justify-between"
              >
                {/* Spotlights */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2901C]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#F2901C]/10 transition-all duration-500"></div>

                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F2901C]/10 text-[#F2901C] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3 group-hover:text-[#F2901C] transition-colors">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">{item.description}</p>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#F2901C]"></div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#F2901C] font-bold">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== INTERACTIVE INFOGRAPHICS SECTION ==================== */}
        <section className="mb-28 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8 text-left">
            <div>
              <span className="text-[#C79F6E] text-[10px] font-mono uppercase tracking-[0.4em] mb-2 block">Empowerment Informatics</span>
              <h2 className="text-3xl md:text-4xl font-sans font-light uppercase tracking-tight text-white">
                Interactive <span className="font-serif italic text-[#F2901C] lowercase">allocation & dynamics</span>
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm font-light text-left md:text-right">
              Explore dynamic capital distribution sector weightings, regional investment metrics, and the 5-year transformation trajectory.
            </p>
          </div>

          {/* Grid Layout for Infographics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 1. Sector Allocation Infographic Card */}
            <div className="col-span-1 lg:col-span-7 bg-white/5 border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-xl hover:border-l-4 hover:border-l-[#F2901C] transition-all text-left backdrop-blur-sm animate-in fade-in duration-500">
              <span className="text-[9px] font-mono text-[#F2901C] uppercase tracking-[0.3em] font-black block mb-4">Capital Distribution</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-6">Strategic Sector Allocation Portfolio</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Custom SVG Segmented Wheel (Pie representation) */}
                <div className="md:col-span-5 flex justify-center relative">
                  <div className="relative w-44 h-44">
                    <svg className="w-full h-full transform -rotate-90 select-none" viewBox="0 0 100 100">
                      {/* Dark frame track background */}
                      <circle cx="50" cy="50" r="38" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="5" />
                      
                      {/* Segmented pieces of the portfolio */}
                      {SECTOR_DATA.map((sec, idx) => {
                        let cumulativeOffset = 0;
                        for (let k = 0; k < idx; k++) {
                          cumulativeOffset += SECTOR_DATA[k].share;
                        }
                        const isSelected = activeSector === idx;
                        
                        return (
                          <motion.circle
                            key={idx}
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            className="cursor-pointer transition-all duration-300"
                            stroke={isSelected ? (idx % 2 === 0 ? "#F2901C" : "#C79F6E") : (idx % 2 === 0 ? "#F2901C80" : "#C79F6E60")}
                            strokeWidth={isSelected ? 10 : 6}
                            strokeDasharray={238.7 * (sec.share / 100)}
                            strokeDashoffset={-238.7 * (cumulativeOffset / 100)}
                            strokeLinecap="round"
                            onClick={() => setActiveSector(idx)}
                            whileHover={{ scale: 1.02 }}
                          />
                        );
                      })}
                    </svg>

                    {/* Central read-out details */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <motion.span 
                        key={activeSector}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-black text-white"
                      >
                        {SECTOR_DATA[activeSector].share}%
                      </motion.span>
                      <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">Share Allocation</span>
                    </div>
                  </div>
                </div>

                {/* Vertical Interactive Sector Buttons */}
                <div className="md:col-span-7 space-y-2">
                  {SECTOR_DATA.map((sector, idx) => {
                    const isSelected = activeSector === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveSector(idx)}
                        className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                          isSelected 
                            ? 'bg-white/10 border-white/20 shadow-md' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${idx % 2 === 0 ? 'bg-[#F2901C]' : 'bg-[#C79F6E]'}`}></div>
                          <span className="text-[11px] font-extrabold uppercase tracking-tight text-white/90">{sector.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#F2901C]' : 'text-neutral-400 group-hover:text-white'}`}>
                          {sector.share}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Bottom Read-Out Panel */}
              <motion.div 
                key={activeSector}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-gradient-to-r from-white/[0.04] to-white/[0.01] rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center"
              >
                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">Selected Strategic Project</span>
                  <h4 className="text-sm font-bold text-[#F2901C] uppercase">{SECTOR_DATA[activeSector].keyProj}</h4>
                  <p className="text-[11px] text-neutral-350 font-light">Typical transaction size range is <span className="font-semibold text-white">{SECTOR_DATA[activeSector].ticket}</span> per project.</p>
                </div>
                <div className="shrink-0 bg-white/5 border border-white/5 p-3 rounded-xl shadow-2xs text-center min-w-[120px]">
                  <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest block">Jobs Catalyzed</span>
                  <span className="text-lg font-black text-[#F2901C] block leading-none mt-1">{SECTOR_DATA[activeSector].jobs}</span>
                </div>
              </motion.div>
            </div>

            {/* 2. Provincial Contribution Infographic Card */}
            <div className="col-span-1 lg:col-span-5 bg-white/5 border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-xl hover:border-l-4 hover:border-l-[#C79F6E] transition-all text-left flex flex-col justify-between backdrop-blur-sm animate-in fade-in duration-500">
              <div>
                <span className="text-[9px] font-mono text-[#F2901C] uppercase tracking-[0.3em] font-black block mb-4">Regional Footprint</span>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">Provincial Contribution</h3>
                <p className="text-[11px] text-neutral-400 font-light mb-6">Select a province to preview local sector focuses and capital allocation metrics.</p>
                
                {/* Interactive bar list with custom dark styling */}
                <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  {PROVINCIAL_DATA.map((prov) => {
                    const isSelected = activeProvince === prov.code;
                    const barWidth = prov.share;
                    return (
                      <div 
                        key={prov.code}
                        onClick={() => setActiveProvince(isSelected ? null : prov.code)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#F2901C]/10 border-[#F2901C]/30 shadow-md' 
                            : 'border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-mono font-bold bg-[#F2901C] text-white px-1.5 py-0.5 rounded-sm">{prov.code}</span>
                            <span className="text-[10px] font-extrabold text-[#C79F6E] uppercase tracking-tight">{prov.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-bold text-white">{prov.capital}</span>
                            <span className="text-[9px] font-mono text-neutral-400">({prov.share})</span>
                          </div>
                        </div>

                        {/* Interactive progress track */}
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: barWidth }}
                            transition={{ duration: 0.8 }}
                            className={`h-full rounded-full ${isSelected ? 'bg-[#F2901C]' : 'bg-[#C79F6E]'}`}
                          ></motion.div>
                        </div>

                        {/* Collapsed interactive description */}
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-[10px] text-neutral-400 font-light leading-relaxed pt-2 border-t border-white/5">
                                {prov.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Spread index benchmark block */}
              <div className="pt-4 border-t border-white/5 text-[10px] text-neutral-400 font-mono flex items-center justify-between mt-4">
                <span>Total National Coverage</span>
                <span className="font-bold text-[#F2901C]">9 / 9 Provinces Handled</span>
              </div>
            </div>
          </div>

          {/* 3. The 5-Year Trajectory Line/Area Infographic */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-xl hover:border-l-4 hover:border-l-[#F2901C] transition-all text-left backdrop-blur-sm animate-in fade-in duration-500">
            <span className="text-[9px] font-mono text-[#F2901C] uppercase tracking-[0.3em] font-black block mb-4">Growth Curve</span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-8">5-Year Empowerment Capital Trajectory</h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Dynamic Line node graph inside 8 columns */}
              <div className="lg:col-span-8 flex flex-col justify-between min-h-[240px]">
                
                {/* SVG Area spline projection */}
                <div className="relative w-full h-[180px] mt-6">
                  <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradientLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F2901C" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#F2901C" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Shaded Area area */}
                    <path 
                      d="M 20,85 C 120,78 120,78 135,76 C 235,63 235,63 250,62 C 350,45 350,45 365,44 C 465,30 465,30 480,28 L 480,95 L 20,95 Z" 
                      fill="url(#areaGradientLine)" 
                      className="transition-all duration-500"
                    />

                    {/* Smooth Spline Accent Path */}
                    <path 
                      d="M 20,85 C 120,78 120,78 135,76 C 235,63 235,63 250,62 C 350,45 350,45 365,44 C 465,30 465,30 480,28" 
                      fill="none" 
                      stroke="#F2901C" 
                      strokeWidth="2.5" 
                    />

                    {/* Horizontal Guideline Grids */}
                    <line x1="20" y1="28" x2="480" y2="28" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="20" y1="62" x2="480" y2="62" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="20" y1="85" x2="480" y2="85" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                  </svg>

                  {/* Absolute Timeline interactive Node Buttons */}
                  <div className="absolute inset-x-0 inset-y-0 px-[4%] flex justify-between pointer-events-none">
                    {TRANS_TRAJECTORY.map((item, idx) => {
                      const isSelected = activeYearIndex === idx;
                      const heights = ["bottom-[8%]", "bottom-[18%]", "bottom-[32%]", "bottom-[50%]", "bottom-[66%]"];
                      
                      return (
                        <div 
                          key={idx} 
                          className={`absolute ${heights[idx]} -ml-4 pointer-events-auto cursor-pointer flex flex-col items-center group`}
                          style={{ left: `${4% + (idx * 22.5)}%` }}
                          onClick={() => setActiveYearIndex(idx)}
                        >
                          <motion.div 
                            whileHover={{ scale: 1.25 }}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm select-none ${
                              isSelected 
                                ? 'bg-[#F2901C] border-[#161412] text-[#161412] z-20 font-black' 
                                : 'bg-[#1E1B18] border-[#C79F6E] text-[#C79F6E] group-hover:bg-white/10 font-extrabold'
                            }`}
                          >
                            <span className="text-[9.5px] font-mono">{item.year}</span>
                          </motion.div>
                          
                          {/* Floating Micro-Badge */}
                          <div className={`absolute -top-11 bg-white text-[#1E1B18] text-[8.5px] font-mono px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap shadow-md pointer-events-none ${
                            isSelected ? 'opacity-100 bg-[#F2901C] text-white z-20 scale-105' : ''
                          }`}>
                            {item.approvals} Approved
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between px-2 pt-4 border-t border-white/5 text-[9px] text-neutral-400 font-mono uppercase tracking-widest">
                  <span>Audit Base (2021)</span>
                  <span>Record High Execution (2025)</span>
                </div>
              </div>

              {/* Dynamic Summary Card */}
              <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#F2901C] font-mono">FY {TRANS_TRAJECTORY[activeYearIndex].year} Performance</span>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">Audited</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-extrabold text-white uppercase leading-tight">Key Strategic Milestone</h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">{TRANS_TRAJECTORY[activeYearIndex].highlight}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 mt-8">
                  <div>
                    <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block">Jobs Impacted</span>
                    <span className="text-xl font-black text-white leading-none block mt-1">{TRANS_TRAJECTORY[activeYearIndex].jobs}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block">Capital Disbursed</span>
                    <span className="text-xl font-black text-[#F2901C] leading-none block mt-1">{TRANS_TRAJECTORY[activeYearIndex].disbursed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Milestone Spotlight Section */}
        <section className="mb-28">
          <div className="bg-[#1E1B18] text-white border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            
            {/* Spotlocks / radial glows inside the card */}
            <div className="absolute top-0 right-10 w-96 h-96 bg-[#F2901C]/5 rounded-full blur-[7rem] pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C79F6E]/5 rounded-full blur-[7rem] pointer-events-none"></div>

            {/* Elegant Background Stripes */}
            <div className="absolute inset-x-0 inset-y-0 overflow-hidden pointer-events-none opacity-10">
              <div className="absolute left-[20%] -bottom-[10%] w-12 h-[120%] bg-white rotate-[35deg] rounded-full transform origin-bottom-left block"></div>
              <div className="absolute left-[30%] -bottom-[20%] w-12 h-[130%] bg-white rotate-[35deg] rounded-full transform origin-bottom-left block"></div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#C79F6E] font-black">Industrial Blueprint</span>
                <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight uppercase leading-none text-white">
                  Transformation <br />
                  <span className="font-serif italic text-[#F2901C] lowercase">by the numbers</span>
                </h2>
                <p className="text-xs md:text-sm text-neutral-300 font-light leading-relaxed">
                  Through active monitoring of transformation milestones, we guarantee that disbursed funds directly advance the black industrial class.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={handleDownload}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#F2901C] hover:bg-white hover:text-[#1E1B18] text-white font-sans font-extrabold uppercase text-[9px] tracking-widest transition-all rounded-full shadow-md cursor-pointer"
                  >
                    <Download size={14} />
                    Extract Raw Dataset
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialImpactMetrics.map((tech, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-[#C79F6E] uppercase tracking-widest block mb-2">Milestone 0{i + 1}</span>
                      <h4 className="text-3xl font-black tracking-tight text-white">{tech.value}</h4>
                    </div>
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <p className="text-[11px] font-bold text-neutral-350 uppercase tracking-wider">{tech.label}</p>
                      <p className="text-[10px] text-neutral-400 font-light mt-0.5">{tech.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Interactive Action Block */}
        <section className="text-center py-20 border-t border-white/5 max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C79F6E] font-black block">Take Action</span>
          <h2 className="text-3xl md:text-5xl font-sans font-light tracking-tight uppercase text-white">
            Ready to <span className="font-serif italic text-[#F2901C] lowercase">pioneer change?</span>
          </h2>
          
          <p className="text-sm text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
            Verify whether your business model conforms with the regulatory mandates and criteria for NEF funding participation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={() => navigate('/check-eligibility')}
              className="px-10 py-4 bg-[#F2901C] hover:bg-white hover:text-[#1E1B18] text-white text-[10px] font-sans font-extrabold uppercase tracking-widest transition-all rounded-full shadow-lg hover:-translate-y-0.5"
            >
              Check Your Eligibility
            </button>
            <button 
              onClick={handleDownload}
              className="px-10 py-4 border border-white/25 bg-transparent text-white text-[10px] font-sans font-extrabold uppercase tracking-widest hover:border-white transition-all rounded-full"
            >
              Download Full Guidelines
            </button>
          </div>
        </section>
      </main>

      {/* Styled Branded Footer */}
      <footer className="bg-[#161412] text-white py-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <NefLogo className="text-white" />
            <p className="text-[9px] font-mono tracking-widest uppercase opacity-40 max-w-xs leading-relaxed mt-2 animate-pulse">
              National Empowerment Fund Corp. © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-extrabold uppercase tracking-widest opacity-80">
            <a href="#" className="hover:text-[#F2901C] transition-colors">Privacy Policy Reference</a>
            <a href="#" className="hover:text-[#F2901C] transition-colors">Information Manual Access</a>
            <a href="#" className="hover:text-[#F2901C] transition-colors">Empowerment Guidelines</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
