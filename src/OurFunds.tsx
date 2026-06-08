import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import SectorFilter from "./components/SectorFilter";
import { NEF_FUNDS } from "./data/funds";

export default function OurFunds() {
  const [selectedSector, setSelectedSector] = useState<string>("All");

  const filteredFunds = selectedSector === "All" 
    ? NEF_FUNDS 
    : NEF_FUNDS.filter(fund => fund.details.sectors.includes(selectedSector));

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#E89D7A] selection:text-white">
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
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E89D7A] block mb-4">NEF Portfolio</span>
            <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight uppercase leading-none text-white mb-8">
              Our <br />
              <span className="font-serif italic text-[#E89D7A]">Funds</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed font-light">
              We provide a diverse range of funding solutions tailored to the unique needs of black entrepreneurs 
              across various sectors of the South African economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Funds Grid */}
      <section className="py-24 px-6 md:px-8 bg-[#FCFAF7]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-[#EFE6DA]/40 pb-12">
            <h2 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight text-[#1E1B18]">
              Filter by <span className="text-white bg-[#1E1B18] px-4 py-1.5 rounded-xl text-xs md:text-sm inline-block font-sans lowercase shadow-sm">Sector</span>
            </h2>
            <SectorFilter 
              selectedSector={selectedSector} 
              onSelectSector={setSelectedSector} 
            />
          </div>

          <div className="grid grid-cols-1 gap-28">
            {filteredFunds.map((fund, index) => (
              <motion.div
                key={fund.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF8F5] rounded-[2.2rem] border border-[#EFE6DA]/80 shadow-[0_24px_50px_rgba(42,38,34,0.06)]">
                      <img 
                        src={fund.image} 
                        alt={fund.title} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-10 left-10 w-12 h-12 rounded-full bg-[#E89D7A]/95 text-white flex items-center justify-center shadow-lg">
                        <fund.icon size={20} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-mono font-black tracking-tighter text-[#E89D7A]">{fund.id}</span>
                      <div className="w-16 h-px bg-[#EFE6DA]"></div>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-sans font-light uppercase tracking-tight leading-none text-[#1E1B18]">
                      {fund.title}
                    </h2>
                    
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed italic font-light">
                      "{fund.description}"
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#E89D7A]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E89D7A]"></div>
                        Key Objectives
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed font-light">
                        {fund.details.objective}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-8 border-t border-[#EFE6DA]/40">
                      <h4 className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#1E1B18]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1E1B18]"></div>
                        Focus Sectors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {fund.details.sectors.map((sector, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white text-neutral-600 border border-[#EFE6DA]/80 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link 
                        to="/how-to-apply"
                        className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#1E1B18] group/link hover:text-[#E89D7A] transition-colors"
                      >
                        Learn More & Apply 
                        <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#1E1B18] border border-[#EFE6DA]/60 group-hover/link:bg-[#E89D7A] group-hover/link:text-white transition-all shadow-2xs">
                          <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="py-24 px-6 bg-[#FAF8F5] border-y border-[#EFE6DA]/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-light uppercase tracking-tight mb-6 text-[#1E1B18]">
            Not Sure Which <span className="text-[#FAF6F0] bg-[#1E1B18] px-3 py-1.5 rounded-xl text-base md:text-2xl inline-block font-sans shadow-sm">Fund</span> is Right?
          </h2>
          <p className="text-sm md:text-base text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Use our comparison tool on the home page to see which fund best aligns with your business goals and requirements.
          </p>
          <Link 
            to="/"
            className="inline-block px-10 py-4 bg-[#1E1B18] text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-[#E89D7A] transition-all duration-300 hover:scale-105 shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-[#1E1B18] text-white overflow-hidden relative border-t border-white/5 shadow-xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E89D7A] opacity-5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-sans font-light uppercase tracking-tight mb-8 leading-none">
              Start Your <span className="font-serif italic text-[#E89D7A]">Journey</span> Today
            </h2>
            <p className="text-sm md:text-base text-white/50 mb-12 leading-relaxed font-light">
              Our investment team is ready to support your growth. If you meet our criteria, 
              we invite you to start the application process today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/how-to-apply"
                className="px-10 py-4 bg-[#E89D7A] text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-white hover:text-[#1E1B18] transition-all duration-300 hover:scale-105 shadow-md"
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
    </div>
  );
}
