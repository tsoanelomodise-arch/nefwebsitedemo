import { motion } from "motion/react";
import { CheckCircle2, FileText, Search, ClipboardCheck, Scale, CreditCard } from "lucide-react";
import React from "react";
import Breadcrumbs from "./components/Breadcrumbs";

const STEPS = [
  {
    id: "01",
    title: "Application Form",
    description: "The first step is to complete the official NEF application form, providing basic details about your business and funding requirements.",
    icon: FileText
  },
  {
    id: "02",
    title: "Business Plan Submission",
    description: "Submit a comprehensive business plan that outlines your market analysis, financial projections, and operational strategy.",
    icon: ClipboardCheck
  },
  {
    id: "03",
    title: "Initial Screening",
    description: "Our investment team will conduct an initial screening to ensure your project aligns with NEF's mandate and criteria.",
    icon: Search
  },
  {
    id: "04",
    title: "Due Diligence",
    description: "A thorough due diligence process is conducted, including site visits, financial audits, and background checks.",
    icon: CheckCircle2
  },
  {
    id: "05",
    title: "Investment Committee",
    description: "The project is presented to the NEF Investment Committee for final review and approval.",
    icon: Scale
  },
  {
    id: "06",
    title: "Legal & Disbursement",
    description: "Once approved, legal agreements are finalized, and funds are disbursed according to the agreed milestones.",
    icon: CreditCard
  }
];

export default function HowToApply() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil block mb-4">Funding Process</span>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none mb-8">
            How to Apply <br />
            <span className="text-white bg-[#162518] px-4 py-1.5 rounded-2xl inline-block shadow-md">for Funding</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light">
            The NEF follows a rigorous and transparent process to ensure that funding is allocated to viable, 
            sustainable, and high-impact black-owned businesses.
          </p>
        </motion.div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-neutral-200"></div>

          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16 md:pl-24 group"
            >
              {/* Connector dot on the line */}
              <div className="absolute left-[21px] md:left-[29px] top-6 w-2.5 h-2.5 bg-gold-foil rounded-full z-20 border-2 border-white shadow-md"></div>

              <div className="bg-[#FAF9F6] p-8 md:p-12 border border-neutral-200/50 rounded-[2.5rem] group-hover:bg-[#162518] transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_rgba(22,37,24,0.08)]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  {/* Step Day Pill Inspired by Design Reference "Day 1-3" etc */}
                  <div className="inline-flex items-center gap-3">
                    <span className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-mono tracking-widest font-black uppercase group-hover:bg-gold-foil group-hover:text-black transition-all duration-500 shadow-sm">
                      Phase {step.id}
                    </span>
                    <span className="h-px w-8 bg-neutral-200 group-hover:bg-white/20 transition-all"></span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white group-hover:bg-white/10 flex items-center justify-center transition-all duration-500 shadow-sm">
                    <step.icon size={22} className="text-black group-hover:text-gold-foil transition-colors duration-500" />
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#162518] group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-500 leading-relaxed font-light text-base md:text-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-28 p-12 bg-black text-white rounded-[2.5rem] relative overflow-hidden border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-foil/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">Ready to start your journey?</h2>
            <p className="text-gray-400 mb-10 leading-relaxed font-light text-base md:text-lg">
              Ensure you have all your documentation ready, including your BEE certificate, business plan, 
              and financial statements for the last three years (if applicable).
            </p>
            <button className="px-10 py-4 bg-gold-foil text-black font-black uppercase text-xs tracking-widest hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
              Download Application Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
