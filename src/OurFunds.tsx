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
      <section className="relative h-[70vh] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
            alt="Our Funds" 
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        </div>
        
        <div className="relative z-10 h-full max-w-5xl mx-auto px-8 flex flex-col justify-center">
          <Breadcrumbs />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-gold-foil block mb-4">NEF Portfolio</span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-white mb-8">
              Our <br />
              <span className="text-gold-foil">Funds</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              We provide a diverse range of funding solutions tailored to the unique needs of black entrepreneurs 
              across various sectors of the South African economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Funds Grid */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h2 className="text-3xl font-bold uppercase tracking-tighter">
              Filter by <span className="text-gold-foil">Sector</span>
            </h2>
            <SectorFilter 
              selectedSector={selectedSector} 
              onSelectSector={setSelectedSector} 
            />
          </div>

          <div className="grid grid-cols-1 gap-32">
            {filteredFunds.map((fund, index) => (
              <motion.div
                key={fund.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                      <img 
                        src={fund.image} 
                        alt={fund.title} 
                        className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute inset-0 ${fund.color} mix-blend-multiply opacity-20`}></div>
                      <div className="absolute bottom-12 left-12">
                        <fund.icon size={64} className="text-white drop-shadow-2xl" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold tracking-tighter opacity-10">{fund.id}</span>
                      <div className="w-12 h-px bg-black"></div>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
                      {fund.title}
                    </h2>
                    
                    <p className="text-lg text-gray-600 leading-relaxed italic">
                      "{fund.description}"
                    </p>

                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold-foil"></div>
                        Key Objectives
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {fund.details.objective}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-8 border-t border-gray-100">
                      <h4 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold-foil"></div>
                        Focus Sectors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {fund.details.sectors.map((sector, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8">
                      <Link 
                        to="/how-to-apply"
                        className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest group/link"
                      >
                        Learn More & Apply 
                        <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
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
      <section className="py-24 px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            Not Sure Which <span className="text-gold-foil">Fund</span> is Right?
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Use our comparison tool on the home page to see which fund best aligns with your business goals and requirements.
          </p>
          <Link 
            to="/"
            className="inline-block px-12 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-gold-foil hover:text-black transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-8 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-foil opacity-5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
              Start Your <span className="text-gold-foil">Journey</span> Today
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Our investment team is ready to support your growth. If you meet our criteria, 
              we invite you to start the application process today.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                to="/how-to-apply"
                className="px-12 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Apply Now
              </Link>
              <Link 
                to="/funding-criteria"
                className="px-12 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
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
