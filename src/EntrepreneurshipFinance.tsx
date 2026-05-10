import { motion } from "motion/react";
import { CheckCircle2, Zap, Target, Users, TrendingUp, ShieldCheck, Info } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";

const FEATURES = [
  {
    id: "01",
    title: "Funding Range",
    description: "Financial support ranging from R250,000 up to R10 million per project.",
    icon: Zap
  },
  {
    id: "02",
    title: "Ownership Requirement",
    description: "Targeted at businesses with at least 50.1% black ownership and management.",
    icon: Users
  },
  {
    id: "03",
    title: "Strategic Support",
    description: "Provision of both financial and non-financial support to ensure business sustainability.",
    icon: ShieldCheck
  },
  {
    id: "04",
    title: "Growth Focus",
    description: "Supports both new start-ups and the expansion of existing black-owned enterprises.",
    icon: TrendingUp
  }
];

const CRITERIA = [
  "Minimum of 50.1% black ownership and management control.",
  "Operational involvement by black entrepreneurs in the business.",
  "The business must be viable and demonstrate sustainable growth potential.",
  "Compliance with Broad-Based Black Economic Empowerment (B-BBEE) requirements.",
  "Clear business plan with financial projections.",
  "The project must have a significant impact on job creation and transformation."
];

export default function EntrepreneurshipFinance() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black">
      <div className="max-w-5xl mx-auto px-8 py-24">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-xs font-bold uppercase tracking-[0.5em] opacity-40 block mb-4">iMbewu Fund / Product</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none mb-8">
            Entrepreneurship <br />
            <span className="text-gold-foil bg-black px-4">Finance</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Designed to support black entrepreneurs to start new businesses, as well as providing 
            expansion capital to existing black-owned enterprises. We believe in the power of 
            new ideas and the strength of established ones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 overflow-hidden mb-24">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-12 group hover:bg-black transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-sm font-bold opacity-40 group-hover:text-white transition-colors">{feature.id}</span>
                <feature.icon size={32} className="text-black group-hover:text-gold-foil transition-colors" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4">
              <div className="w-8 h-px bg-black"></div>
              Key Criteria
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {CRITERIA.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border-l-4 border-gold-foil">
                  <CheckCircle2 size={20} className="text-black mt-1 shrink-0" />
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="p-8 bg-black text-white">
              <Info size={32} className="text-gold-foil mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">Focus Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {["Franchising", "Procurement", "Start-ups", "Expansion Capital"].map((sector, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 text-[10px] font-bold uppercase tracking-wider">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-8 border border-gray-200">
              <Target size={32} className="text-black mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">Our Objective</h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "To promote and support entrepreneurship and business growth among black people through 
                innovative and accessible funding solutions."
              </p>
            </div>
          </div>
        </div>

        <div className="p-12 bg-gold-foil text-black flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">Start Your Application</h2>
            <p className="font-medium opacity-70">
              Ready to take your business to the next level? Our team is here to support your vision.
            </p>
          </div>
          <Link 
            to="/how-to-apply"
            className="px-12 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors whitespace-nowrap"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
