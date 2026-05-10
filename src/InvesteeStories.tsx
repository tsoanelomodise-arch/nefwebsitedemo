import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, ArrowRight, Quote, Calendar, User, Filter,
  TrendingUp, Users, Briefcase, Maximize, Hospital, Bed, Stethoscope, Store
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STORIES } from "./data/stories";

const IconMap: Record<string, any> = {
  TrendingUp, Users, Briefcase, Maximize, Hospital, Bed, Stethoscope, Store
};

export default function InvesteeStories() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(STORIES.map((s) => s.category)))];
  }, []);

  const filteredStories = useMemo(() => {
    setCurrentPage(1); // Reset to first page on category change
    if (selectedCategory === "All") return STORIES;
    return STORIES.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  
  const paginatedStories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStories, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1517245327032-96a1c4a161a7?q=80&w=2000&auto=format&fit=crop" 
            alt="Success Stories"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <span className="text-gold-foil text-xs font-bold uppercase tracking-[0.5em] block">Success Stories</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              INVESTEE <br />
              <span className="text-transparent border-t-2 border-b-2 border-white/20 py-2">STORIES</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Real stories of transformation, resilience, and economic empowerment across South Africa.
            </p>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.button 
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="absolute top-12 left-12 z-20 group flex items-center gap-4 text-white/40 hover:text-gold-foil transition-colors"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-foil transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Home</span>
        </motion.button>
      </header>

      {/* Filter Section */}
      <section className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <Filter className="w-3 h-3 text-gold-foil" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">Industry Focus</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400">Refine Stories</span>
            </div>
          </div>
          
          <div className="relative flex flex-wrap justify-center md:justify-end gap-2 p-1 bg-gray-50 rounded-full border border-gray-100">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gold-foil rounded-full shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{category}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-32">
          <AnimatePresence mode="popLayout">
            {paginatedStories.map((story, index) => (
              <motion.article 
                key={story.id}
                layout
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-16 md:gap-24 items-start`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-8 left-8 bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest">
                      {story.category}
                    </div>
                  </div>
                  
                  {/* Impact Infographic */}
                  <div className="pt-8 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-6">Key Impact</span>
                    <div className="grid grid-cols-2 gap-6">
                      {story.stats?.slice(0, 4).map((stat, i) => {
                        const Icon = stat.icon ? IconMap[stat.icon] : null;
                        return (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gold-foil/10 flex items-center justify-center text-gold-foil shrink-0">
                              {Icon && <Icon className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-lg font-bold text-black leading-none">{stat.value}</div>
                              <div className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {story.date}</span>
                      <span className="flex items-center gap-2"><User className="w-3 h-3" /> {story.author}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                      {story.title}
                    </h2>
                    <p className="text-xl text-gray-500 font-light leading-relaxed italic">
                      "{story.summary}"
                    </p>
                  </div>

                  <div className="space-y-8 text-gray-600 leading-relaxed text-lg font-light">
                    {story.content.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="relative p-12 bg-gray-50 border-l-4 border-gold-foil">
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-gold-foil/20" />
                    <p className="text-xl font-medium text-gray-800 leading-relaxed relative z-10">
                      {story.quote}
                    </p>
                  </div>

                  <motion.button 
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/investee-stories/${story.id}`)}
                    className="group flex items-center gap-4 text-black hover:text-gold-foil transition-colors"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest">Read Full Case Study</span>
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-gold-foil transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.9 }}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="group flex items-center gap-4 text-black disabled:opacity-20 disabled:cursor-not-allowed hover:text-gold-foil transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-gold-foil transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Previous</span>
              </motion.button>

              <div className="flex items-center gap-2 px-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 text-[10px] font-bold transition-all ${
                      currentPage === page 
                        ? "bg-black text-white" 
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.9 }}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="group flex items-center gap-4 text-black disabled:opacity-20 disabled:cursor-not-allowed hover:text-gold-foil transition-colors"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">Next</span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-gold-foil transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-black py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <span className="text-gold-foil text-xs font-bold uppercase tracking-[0.5em] block">Your Story Starts Here</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">
            READY TO BUILD YOUR <br />
            <span className="text-transparent border-t-2 border-b-2 border-white/20 py-2">LEGACY?</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            Join the hundreds of black entrepreneurs who have transformed their visions into reality with the NEF.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/how-to-apply")}
              className="bg-gold-foil text-black px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all w-full md:w-auto"
            >
              Apply for Funding
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/funding-criteria")}
              className="border border-white/20 text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all w-full md:w-auto"
            >
              View Criteria
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter">NEF CORP</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © 2026 NEF CORP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <motion.span 
              whileHover={{ scale: 1.1, color: "#000" }}
              whileTap={{ scale: 0.9 }}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer transition-colors"
            >
              Twitter
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.1, color: "#000" }}
              whileTap={{ scale: 0.9 }}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer transition-colors"
            >
              LinkedIn
            </motion.span>
          </div>
        </div>
      </footer>
    </div>
  );
}
