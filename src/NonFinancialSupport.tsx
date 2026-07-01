import { motion } from "motion/react";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./components/Breadcrumbs";
import { PremiumIcon } from "./components/PremiumIcon";

const SERVICES = [
  {
    id: "01",
    title: "Mentorship & Coaching",
    description: "Access to experienced business mentors who provide guidance, share industry insights, and help navigate challenges.",
    iconName: "Users" as const
  },
  {
    id: "02",
    title: "Business Planning",
    description: "Assistance in developing robust business plans, financial models, and strategic roadmaps for sustainable growth.",
    iconName: "Lightbulb" as const
  },
  {
    id: "03",
    title: "Technical Assistance",
    description: "Specialized support in areas such as legal compliance, accounting, human resources, and operational efficiency.",
    iconName: "BarChart3" as const
  },
  {
    id: "04",
    title: "Market Access",
    description: "Facilitating connections with potential customers, partners, and supply chain opportunities in various sectors.",
    iconName: "Globe" as const
  },
  {
    id: "05",
    title: "Training & Development",
    description: "Workshops and programs designed to enhance entrepreneurial skills, financial literacy, and management capabilities.",
    iconName: "GraduationCap" as const
  }
];

const BENEFITS = [
  "Improved business sustainability and survival rates.",
  "Enhanced management and leadership capabilities.",
  "Better access to markets and procurement opportunities.",
  "Strengthened financial management and reporting.",
  "Increased competitiveness in the local and global economy.",
  "Support in achieving B-BBEE compliance and transformation goals."
];

export default function NonFinancialSupport() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
            alt="Non-Financial Support"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="bg-gold-foil text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                Support Services
              </span>
              <div className="h-px w-12 bg-white/20"></div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-none">
              Non-Financial <br />
              <span className="text-gold-foil">Support</span>
            </h1>
            
            <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
              Beyond financial investment, we provide comprehensive support to ensure 
              black-owned businesses have the tools, skills, and networks they need to succeed.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-8 py-24">
        <Breadcrumbs />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 overflow-hidden mb-24">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-12 group hover:bg-black transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-sm font-bold opacity-40 group-hover:text-white transition-colors">{service.id}</span>
                <PremiumIcon 
                  name={service.iconName} 
                  size={24} 
                  variant="outlined" 
                  className="group-hover:bg-[#F2901C] group-hover:text-white group-hover:border-transparent transition-all duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4">
              <div className="w-8 h-px bg-black"></div>
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {BENEFITS.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border-l-4 border-[#F2901C]">
                  <PremiumIcon name="CheckCircle2" size={16} variant="minimal" color="#F2901C" interactive={false} className="mt-1" />
                  <p className="text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="p-8 bg-black text-white">
              <PremiumIcon name="Info" size={24} variant="accent" className="mb-6 bg-white/10 text-white" />
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">Who Qualifies?</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Our non-financial support is primarily aimed at:
              </p>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F2901C]"></div>
                  NEF Investees
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F2901C]"></div>
                  Potential Applicants
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#F2901C]"></div>
                  Black-owned SMEs
                </li>
              </ul>
            </div>
            
            <div className="p-8 border border-gray-200">
              <PremiumIcon name="Target" size={24} variant="boxed" className="mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">Our Vision</h3>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "To create a vibrant ecosystem of sustainable black-owned businesses that contribute 
                meaningfully to South Africa's economic growth and transformation."
              </p>
            </div>
          </div>
        </div>

        <div className="p-12 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">Need Support?</h2>
            <p className="font-medium opacity-70">
              Contact our Post-Investment or Business Development teams to learn more about how we can help your business grow.
            </p>
          </div>
          <Link 
            to="/#contact"
            className="px-12 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
