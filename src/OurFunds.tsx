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
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-[#162518]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
            alt="Our Funds" 
            className="w-full h-full object-cover grayscale opacity-30 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#162518]/90"></div>
        </div>
        
        <div className="relative z-10 h-full max-w-5xl mx-auto px-6 md:px-8 flex flex-col justify-center">
          <Breadcrumbs />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil block mb-4">NEF Portfolio</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mb-8">
              Our <br />
              <span className="text-gold-foil">Funds</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
              We provide a diverse range of funding solutions tailored to the unique needs of black entrepreneurs 
              across various sectors of the South African economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Funds Grid */}
      <section className="py-24 px-6 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-neutral-100 pb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter text-[#162518]">
              Filter by <span className="text-gold-foil bg-[#162518] px-3 py-1 rounded-xl text-white inline-block">Sector</span>
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
                className="group"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-[2.5rem] border border-neutral-200/50 shadow-lg">
                      <img 
                        src={fund.image} 
                        alt={fund.title} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gold-foil text-black flex items-center justify-center shadow-2xl">
                        <fund.icon size={28} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-mono font-black tracking-tighter text-gold-foil">{fund.id}</span>
                      <div className="w-16 h-px bg-neutral-200"></div>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-[#162518]">
                      {fund.title}
                    </h2>
                    
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed italic font-light">
                      "{fund.description}"
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2.5 text-gold-foil">
                        <div className="w-2 h-2 rounded-full bg-gold-foil"></div>
                        Key Objectives
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">
                        {fund.details.objective}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-8 border-t border-neutral-150">
                      <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2.5 text-[#162518]">
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                        Focus Sectors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {fund.details.sectors.map((sector, i) => (
                          <span key={i} className="px-3 py-1.5 bg-[#FAF9F6] text-neutral-600 border border-neutral-200/60 rounded-full text-[10px] font-black uppercase tracking-wider">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link 
                        to="/how-to-apply"
                        className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-black group/link hover:text-gold-foil transition-colors"
                      >
                        Learn More & Apply 
                        <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-[#162518] border border-neutral-100 group-hover/link:bg-[#162518] group-hover/link:text-gold-foil transition-all">
                          <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
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
      <section className="py-24 px-6 bg-[#FAF9F6] border-y border-neutral-200/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-[#162518]">
            Not Sure Which <span className="text-gold-foil bg-[#162518] px-3 py-1.5 rounded-xl text-white inline-block">Fund</span> is Right?
          </h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Use our comparison tool on the home page to see which fund best aligns with your business goals and requirements.
          </p>
          <Link 
            to="/"
            className="inline-block px-10 py-4 bg-black text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-gold-foil hover:text-black transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-black text-white overflow-hidden relative border-t border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-foil opacity-5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-foil to-white">Journey</span> Today
            </h2>
            <p className="text-lg text-gray-400 mb-12 leading-relaxed font-light">
              Our investment team is ready to support your growth. If you meet our criteria, 
              we invite you to start the application process today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/how-to-apply"
                className="px-10 py-4 bg-gold-foil text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Apply Now
              </Link>
              <Link 
                to="/funding-criteria"
                className="px-10 py-4 border border-white/20 text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
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
