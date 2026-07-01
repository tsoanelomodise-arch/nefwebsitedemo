import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, FileText, Clock, Users, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import { PremiumIcon } from "./components/PremiumIcon";

const FAQS = [
  {
    question: "What documents are required for an application?",
    answer: "Required documents typically include a comprehensive business plan, 3-5 year financial projections, B-BBEE certificates, tax clearance certificates, company registration documents (CIPC), and certified ID copies of all directors/owners.",
    iconName: "FileText" as const
  },
  {
    question: "How long does the approval process take?",
    answer: "The duration of the approval process varies depending on the complexity of the project and the completeness of the application. Generally, it can take between 3 to 6 months from the initial submission to final disbursement.",
    iconName: "Clock" as const
  },
  {
    question: "What is the minimum black ownership requirement?",
    answer: "To qualify for NEF funding, a business must have a minimum of 50.1% black ownership and management control. We also look for active operational involvement by the black entrepreneurs in the business.",
    iconName: "Users" as const
  },
  {
    question: "Does the NEF provide non-financial support?",
    answer: "Yes, the NEF provides extensive non-financial support through our Post-Investment unit. This includes business mentorship, technical assistance, and strategic guidance to ensure the long-term sustainability of the business.",
    iconName: "ShieldCheck" as const
  }
];

interface AccordionItemProps {
  question: string;
  answer: string;
  iconName: any;
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ question, answer, iconName, isOpen, onClick }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <div className="flex items-center gap-6">
          <PremiumIcon 
            name={iconName} 
            size={20} 
            variant={isOpen ? "accent" : "boxed"} 
            interactive={false} 
          />
          <h3 className={`text-xl font-bold uppercase tracking-tighter transition-colors ${isOpen ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
            {question}
          </h3>
        </div>
        <div
          className={isOpen ? 'text-gold-foil' : 'text-gray-300'}
        >
          <ChevronDown size={24} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-18 pr-12">
              <p className="text-gray-500 leading-relaxed max-w-2xl font-light">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          <span className="text-xs font-bold uppercase tracking-[0.5em] opacity-40 block mb-4">Support / Help Center</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none mb-8">
            Frequently Asked <br />
            <span className="text-gold-foil bg-black px-4">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Find answers to common questions about our funding solutions, 
            eligibility requirements, and the application process.
          </p>
        </motion.div>

        <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-12 mb-24">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              {...(faq as any)}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="p-12 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">Still have questions?</h2>
            <p className="text-white/60 font-medium leading-relaxed">
              Our team is ready to help you navigate the application process and find the right funding for your business.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/how-to-apply"
              className="px-8 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap"
            >
              How to Apply
            </Link>
            <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors whitespace-nowrap">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
