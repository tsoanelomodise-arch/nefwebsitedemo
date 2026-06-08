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
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#E89D7A] selection:text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-24">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-left"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C79F6E] block mb-4">Funding Process</span>
          <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight uppercase leading-none mb-8 text-[#1E1B18]">
            How to Apply <br />
            <span className="text-[#FAF6F0] bg-[#1E1B18] px-5 py-2 inline-block rounded-2xl transform -rotate-1 shadow-md font-sans text-3xl md:text-4xl mt-3">for Funding</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-2xl leading-relaxed font-light">
            The NEF follows a rigorous and transparent process to ensure that funding is allocated to viable, 
            sustainable, and high-impact black-owned businesses.
          </p>
        </motion.div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-[#EFE6DA]/85"></div>

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
              <div className="absolute left-[21px] md:left-[29px] top-6 w-2.5 h-2.5 bg-[#E89D7A] rounded-full z-20 border-2 border-[#FCFAF7] shadow-sm"></div>

              <div className="bg-white p-8 md:p-12 border border-[#EFE6DA]/70 rounded-[2.2rem] group-hover:bg-[#1E1B18] transition-all duration-500 shadow-sm hover:shadow-[0_32px_80px_rgba(42,38,34,0.06)]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                  {/* Step Day Pill Inspired by Design Reference "Day 1-3" etc */}
                  <div className="inline-flex items-center gap-3">
                    <span className="px-5 py-2.5 rounded-full bg-[#FCFAF7] text-[#1E1B18] text-[9px] font-mono tracking-widest font-bold uppercase group-hover:bg-[#E89D7A] group-hover:text-white transition-all duration-500 shadow-sm border border-[#EFE6DA]/60 group-hover:border-[#E89D7A]">
                      Phase {step.id}
                    </span>
                    <span className="h-px w-8 bg-[#EFE6DA] group-hover:bg-white/10 transition-all"></span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#FAF8F5] group-hover:bg-white/10 flex items-center justify-center transition-all duration-500 shadow-xs">
                    <step.icon size={18} className="text-[#1E1B18] group-hover:text-[#E89D7A] transition-colors duration-500" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-sans font-light uppercase tracking-tight mb-4 text-[#1E1B18] group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-neutral-500 group-hover:text-white/70 transition-colors duration-500 leading-relaxed font-light text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-28 p-12 bg-[#1E1B18] text-white rounded-[2.2rem] relative overflow-hidden border border-white/5 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E89D7A]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10 text-left">
            <h2 className="text-2xl md:text-3xl font-sans font-light uppercase tracking-tight mb-6">Ready to start your journey?</h2>
            <p className="text-white/50 mb-10 leading-relaxed font-light text-sm md:text-base">
              Ensure you have all your documentation ready, including your BEE certificate, business plan, 
              and financial statements for the last three years (if applicable).
            </p>
            <button className="px-10 py-4 bg-[#E89D7A] text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#1E1B18] rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95">
              Download Application Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
