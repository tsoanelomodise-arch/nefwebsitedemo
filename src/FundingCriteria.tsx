import { motion } from "motion/react";
import { CheckCircle2, Info, Target, ShieldCheck, Users, Zap, Play } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";

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
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop" 
            alt="Empowerment" 
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
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-gold-foil block mb-4">NEF Mandate</span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-white mb-8">
              Funding <br />
              <span className="text-gold-foil">Criteria</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              The National Empowerment Fund (NEF) supports black-owned businesses that are viable, 
              sustainable, and contribute to the economic transformation of South Africa.
            </p>
            
            <div className="mt-12 flex flex-wrap gap-6">
              <button className="px-12 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Check Eligibility
              </button>
              <button className="px-12 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Download Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Integration Section */}
      <section className="py-24 px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-4">
              <div className="w-8 h-px bg-black"></div>
              Understanding Our Process
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Watch our short guide on what we look for in a funding application and how we evaluate 
              business viability and transformation impact.
            </p>
            <div className="flex items-center gap-4 p-6 bg-white border-l-4 border-gold-foil shadow-sm">
              <Info className="text-gold-foil shrink-0" />
              <p className="text-sm text-gray-500 italic">
                "Our goal is to ensure that every funded project has the best chance of long-term success."
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-black group overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
              alt="Video Placeholder" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-gold-foil rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play fill="black" size={32} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Criteria Content */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-24">
            {CRITERIA_SECTIONS.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-6 mb-12">
                  <span className="text-4xl font-bold tracking-tighter opacity-10">{section.id}</span>
                  <h2 className="text-4xl font-bold uppercase tracking-tighter">{section.title}</h2>
                  <div className="flex-grow h-px bg-gray-100"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-8 bg-gray-50 hover:bg-black group transition-colors duration-500">
                      <CheckCircle2 size={24} className="text-gold-foil shrink-0 mt-1" />
                      <p className="text-gray-600 group-hover:text-gray-400 transition-colors leading-relaxed">
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
      <section className="py-24 px-8 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-foil opacity-5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
              Ready to <span className="text-gold-foil">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              If you meet our criteria, we invite you to start the application process today. 
              Our investment team is ready to support your growth.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                to="/how-to-apply"
                className="px-12 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                Apply Now
              </Link>
              <button className="px-12 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Contact Advisor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
