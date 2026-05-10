import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, TrendingUp, Users, Briefcase, Globe, Award, BarChart3, PieChart, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PerformanceReport2025 = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Approvals", value: "R7.4bn", icon: Award, color: "bg-gold-foil" },
    { label: "Jobs Supported", value: "112,000+", icon: Users, color: "bg-black" },
    { label: "SMMEs Funded", value: "1,240", icon: Briefcase, color: "bg-gold-foil" },
    { label: "Black Women Owned", value: "42%", icon: Globe, color: "bg-black" },
  ];

  const highlights = [
    {
      title: "Strategic Growth",
      description: "Significant increase in funding approvals for black-owned enterprises in the manufacturing and green energy sectors.",
      icon: TrendingUp
    },
    {
      title: "Operational Excellence",
      description: "Streamlined application processes resulting in a 30% faster turnaround time for funding disbursements.",
      icon: BarChart3
    },
    {
      title: "Social Impact",
      description: "Deepened impact in rural and township economies through targeted financial and non-financial support programs.",
      icon: PieChart
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gold-foil selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gold-foil transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        <div className="text-sm font-bold tracking-tighter uppercase">
          NEF <span className="text-gold-foil">Performance</span> 2025
        </div>
        <button className="px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-gold-foil hover:text-black transition-colors flex items-center gap-2">
          <Download size={14} />
          PDF Report
        </button>
      </nav>

      <main className="pt-32 pb-24 px-8 md:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-foil mb-4 block">Annual Review</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
              Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-gold-foil">Report 2025</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              A comprehensive overview of the National Empowerment Fund's impact on economic transformation, 
              enterprise development, and job creation across South Africa during the 2024/2025 financial year.
            </p>
          </motion.div>
        </header>

        {/* Key Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border border-gray-100 hover:border-gold-foil transition-colors group"
            >
              <div className={`w-12 h-12 ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} className={stat.color === 'bg-black' ? 'text-white' : 'text-black'} />
              </div>
              <div className="text-4xl font-bold tracking-tighter mb-2">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-40">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* Detailed Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6">Strategic <br />Highlights</h2>
            <div className="w-12 h-1 bg-gold-foil mb-8"></div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our commitment to driving inclusive economic growth remains steadfast. 
              This year, we've focused on high-impact sectors that promise long-term sustainability 
              and significant job creation.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, index) => (
              <div key={index} className="p-8 bg-gray-50 border-l-4 border-gold-foil">
                <item.icon size={32} className="mb-6 text-black" />
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Visualization Placeholder */}
        <section className="mb-32">
          <div className="bg-black text-white p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-12">Economic <br />Transformation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <div className="text-5xl font-bold text-gold-foil mb-4">85%</div>
                  <p className="text-sm opacity-60 uppercase tracking-widest font-bold">Black Ownership in Portfolio</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gold-foil mb-4">R1.2bn</div>
                  <p className="text-sm opacity-60 uppercase tracking-widest font-bold">Rural Development Funding</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gold-foil mb-4">15k</div>
                  <p className="text-sm opacity-60 uppercase tracking-widest font-bold">New Jobs Created</p>
                </div>
              </div>
            </div>
            {/* Abstract background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-foil/10 skew-x-12 translate-x-1/4"></div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-24 border-t border-gray-100">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-8">Ready to transform your business?</h2>
          <button 
            onClick={() => navigate('/check-eligibility')}
            className="px-12 py-4 bg-gold-foil text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            Check Eligibility
          </button>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white py-12 px-8 md:px-24 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xs font-bold tracking-widest uppercase opacity-40">© 2026 NEF CORP. PERFORMANCE REPORT</div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-gold-foil transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold-foil transition-colors">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
};

export default PerformanceReport2025;
