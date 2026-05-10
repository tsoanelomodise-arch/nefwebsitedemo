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
      <div className="max-w-5xl mx-auto px-8 py-24">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="text-xs font-bold uppercase tracking-[0.5em] opacity-40 block mb-4">Funding Process</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none mb-8">
            How to Apply <br />
            <span className="text-gold-foil bg-black px-4">for Funding</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            The NEF follows a rigorous and transparent process to ensure that funding is allocated to viable, 
            sustainable, and high-impact black-owned businesses.
          </p>
        </motion.div>

        <div className="relative space-y-12">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>

          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20 group"
            >
              {/* Marker */}
              <div className="absolute left-0 top-0 w-12 h-12 bg-black flex items-center justify-center z-10 group-hover:bg-gold-foil transition-colors duration-500">
                <span className="text-white text-xs font-bold group-hover:text-black transition-colors duration-500">{step.id}</span>
              </div>
              
              {/* Connector dot on the line */}
              <div className="absolute left-[23px] top-6 w-2 h-2 bg-gold-foil rounded-full z-20"></div>

              <div className="bg-white p-8 md:p-12 border border-gray-100 group-hover:bg-black transition-all duration-500 shadow-sm hover:shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <step.icon size={32} className="text-black group-hover:text-gold-foil transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-black text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6">Ready to start your journey?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Ensure you have all your documentation ready, including your BEE certificate, business plan, 
              and financial statements for the last three years (if applicable).
            </p>
            <button className="px-12 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Download Application Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
