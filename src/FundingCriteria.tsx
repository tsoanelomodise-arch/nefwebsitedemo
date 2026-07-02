import { motion } from "motion/react";
import { Play } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import { PremiumIcon } from "./components/PremiumIcon";

const CRITERIA_SECTIONS = [
  {
    id: "01",
    title: "General Criteria",
    items: [
      "The business must be at least 50.1% black-owned and managed.",
      "The business must be viable and demonstrate sustainable growth potential.",
      "Operational involvement by black entrepreneurs in the business is required.",
      "Compliance with Broad-Based Black Economic Empowerment (B-BBEE) requirements.",
      "The project must have a significant impact on job creation and transformation.",
      "Clear business plan with financial projections for at least 3-5 years."
    ]
  },
  {
    id: "02",
    title: "Financial Requirements",
    items: [
      "Minimum funding request of R250,000.",
      "Maximum funding request of R75 million (depending on the fund).",
      "Own contribution by the entrepreneur (usually 10-20% of the total project cost).",
      "Security/Collateral where applicable.",
      "Financial statements (audited or independently reviewed) for existing businesses."
    ]
  },
  {
    id: "03",
    title: "Exclusions",
    items: [
      "Primary agriculture (except for agro-processing).",
      "Gambling, tobacco, and alcohol (except for retail/distribution).",
      "Speculative property developments.",
      "Refinancing of existing debt (unless part of an expansion/acquisition).",
      "Illegal activities or businesses that harm the environment."
    ]
  }
];

export default function FundingCriteria() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#F2901C] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-[#1E1B18]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop" 
            alt="Empowerment" 
            className="w-full h-full object-cover grayscale opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1E1B18]/90"></div>
        </div>
        
        <div className="relative z-10 h-full max-w-5xl mx-auto px-8 flex flex-col justify-center text-left">
          <Breadcrumbs />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F2901C] block mb-4">NEF Mandate</span>
            <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight uppercase leading-none text-white mb-8">
              Funding <br />
              <span className="font-serif italic text-[#F2901C]">Criteria</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
              The National Empowerment Fund (NEF) supports black-owned businesses that are viable, 
              sustainable, and contribute to the economic transformation of South Africa.
            </p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate("/check-eligibility")}
                className="px-8 py-4 bg-[#F2901C] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#1E1B18] rounded-full shadow-md transition-all"
              >
                Check Eligibility
              </button>
              <button className="px-8 py-4 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#1E1B18] rounded-full transition-all bg-white/5">
                Download Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Integration Section */}
      <section className="py-24 px-8 bg-[#FAF8F5] border-y border-[#EFE6DA]/45">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight flex items-center gap-4">
              <div className="w-8 h-px bg-[#F2901C]"></div>
              Understanding Our Process
            </h2>
            <p className="text-neutral-500 leading-relaxed font-light text-sm md:text-base">
              Watch our short guide on what we look for in a funding application and how we evaluate 
              business viability and transformation impact.
            </p>
            <div className="flex items-center gap-4 p-6 bg-white border-l-2 border-[#F2901C] rounded-r-3xl shadow-sm border-y border-r border-[#EFE6DA]/40">
              <PremiumIcon name="Info" size={16} variant="accent" color="#F2901C" interactive={false} />
              <p className="text-xs text-neutral-500 italic font-light">
                "Our goal is to ensure that every funded project has the best chance of long-term success."
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-[#FAF8F5] rounded-[2rem] overflow-hidden shadow-md group border border-white/60"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
              alt="Video Placeholder" 
              className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-14 h-14 bg-[#F2901C] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#E58E62] hover:scale-110 transition-transform">
                <PremiumIcon name="Play" size={18} variant="minimal" color="currentColor" interactive={false} className="translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Criteria Content */}
      <section className="py-24 px-8 bg-[#FCFAF7]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-24">
            {CRITERIA_SECTIONS.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-left"
              >
                <div className="flex items-center gap-6 mb-12">
                  <span className="text-3xl font-mono tracking-tighter opacity-10 font-bold">{section.id}</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight text-[#1E1B18]">{section.title}</h2>
                  <div className="flex-grow h-px bg-[#EFE6DA]/40"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-8 bg-white border border-[#EFE6DA]/80 hover:bg-[#1E1B18] group transition-all duration-300 rounded-[2rem] shadow-2xs hover:shadow-lg">
                      <PremiumIcon name="CheckCircle2" size={16} variant="minimal" color="currentColor" className="text-[#F2901C] shrink-0 mt-0.5 group-hover:text-white" interactive={false} />
                      <p className="text-neutral-500 group-hover:text-white/80 transition-colors leading-relaxed font-light text-sm md:text-base">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-8 bg-[#1E1B18] text-white overflow-hidden relative shadow-xl border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F2901C] opacity-5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-sans font-light uppercase tracking-tight mb-8 leading-none">
              Ready to <span className="font-serif italic text-[#F2901C]">Transform</span> Your Business?
            </h2>
            <p className="text-sm md:text-base text-white/50 mb-12 leading-relaxed font-light">
              If you meet our criteria, we invite you to start the application process today. 
              Our investment team is ready to support your growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/how-to-apply"
                className="px-10 py-4 bg-[#F2901C] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#1E1B18] rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </Link>
              <button className="px-10 py-4 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-white hover:text-[#1E1B18] transition-all duration-300 hover:scale-105 bg-white/5">
                Contact Advisor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
