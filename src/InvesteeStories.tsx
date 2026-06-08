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
    <div className="min-h-screen bg-[#FCFAF7] text-[#1E1B18] selection:bg-[#E89D7A] selection:text-white font-sans">
      {/* Header */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#1E1B18]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1517245327032-96a1c4a161a7?q=80&w=2000&auto=format&fit=crop" 
            alt="Success Stories"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1B18]/60 via-transparent to-[#1E1B18]"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <span className="text-[#E89D7A] text-[9px] font-bold uppercase tracking-[0.25em] block">Success Stories</span>
            <h1 className="text-4xl md:text-6xl font-sans font-light text-white tracking-tight leading-none uppercase">
              INVESTEE <br />
              <span className="font-serif italic text-[#E89D7A]">STORIES</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Real stories of transformation, resilience, and economic empowerment across South Africa.
            </p>
          </motion.div>
        </div>

        {/* Back Button */}
        <motion.button 
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          className="absolute top-12 left-12 z-20 group flex items-center gap-4 text-white/40 hover:text-white transition-colors"
        >
          <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E89D7A] transition-colors bg-[#1E1B18]/30 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 text-white" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#E89D7A]">Back to Home</span>
        </motion.button>
      </header>

      {/* Filter Section */}
      <section className="pt-24 px-6 max-w-7xl mx-auto text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-[#EFE6DA]/40 pb-12">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#1E1B18] flex items-center justify-center text-[#E89D7A] shadow-xs">
              <Filter className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18]">Industry Focus</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-neutral-400 mt-0.5">Refine Stories</span>
            </div>
          </div>
          
          <div className="relative flex flex-wrap justify-center md:flex-end gap-2 p-1.5 bg-[#FAF8F5] rounded-full border border-[#EFE6DA]/60">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 z-10 ${
                    isActive ? "bg-[#1E1B18] text-white shadow-xs" : "text-neutral-400 hover:text-[#1E1B18]"
                  }`}
                >
                  <span className="relative z-20">{category}</span>
                </button>
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
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-16 md:gap-24 items-start text-left`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 space-y-8">
                  <div className="relative aspect-[4/5] overflow-hidden group rounded-[2.2rem] border border-[#EFE6DA]/60 shadow-md bg-white">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-1000 ease-out group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 bg-[#E89D7A] text-white px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-md">
                      {story.category}
                    </div>
                  </div>
                  
                  {/* Impact Infographic */}
                  <div className="pt-8 border-t border-[#EFE6DA]/40">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C79F6E] block mb-6">Key Impact</span>
                    <div className="grid grid-cols-2 gap-6">
                      {story.stats?.slice(0, 4).map((stat, i) => {
                        const Icon = stat.icon ? IconMap[stat.icon] : null;
                        return (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-[#E89D7A]/10 flex items-center justify-center text-[#E89D7A] shrink-0 border border-[#E89D7A]/5">
                              {Icon && <Icon className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-base font-light text-[#1E1B18] leading-none mb-1 font-sans">{stat.value}</div>
                              <div className="text-[8px] uppercase tracking-widest text-[#C79F6E] font-bold">{stat.label}</div>
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
                    <div className="flex items-center gap-6 text-[8px] font-bold uppercase tracking-widest text-neutral-400">
                      <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#E89D7A]" /> {story.date}</span>
                      <span className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-[#E89D7A]" /> {story.author}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-sans font-light tracking-tight leading-tight text-[#1E1B18] uppercase">
                      {story.title}
                    </h2>
                    <p className="text-base md:text-lg text-neutral-500 font-light leading-relaxed italic border-l-2 border-[#E89D7A] pl-5">
                      "{story.summary}"
                    </p>
                  </div>

                  <div className="space-y-6 text-neutral-500 leading-relaxed text-sm md:text-base font-light">
                    {story.content.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="relative p-10 bg-white border border-[#EFE6DA]/75 rounded-[2rem] shadow-2xs">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-[#E89D7A]/20" />
                    <p className="text-base md:text-lg font-light text-[#1E1B18] leading-relaxed relative z-10 italic">
                      {story.quote}
                    </p>
                  </div>

                  <motion.button 
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/investee-stories/${story.id}`)}
                    className="group flex items-center gap-4 text-[#1E1B18] hover:text-[#E89D7A] transition-colors"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">Read Full Case Study</span>
                    <div className="w-8 h-8 rounded-full border border-[#1E1B18]/10 flex items-center justify-center group-hover:border-[#E89D7A] group-hover:bg-[#E89D7A] group-hover:text-white transition-all shadow-2xs bg-white">
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
          <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-[#EFE6DA]/40">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C79F6E]">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="group flex items-center gap-4 text-[#1E1B18] disabled:opacity-20 disabled:cursor-not-allowed hover:text-[#E89D7A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-[#EFE6DA]/70 flex items-center justify-center group-hover:border-[#E89D7A] transition-colors bg-white">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest">Previous</span>
              </button>

              <div className="flex items-center gap-2 px-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 text-[9px] font-mono font-bold rounded-full transition-all ${
                      currentPage === page 
                        ? "bg-[#1E1B18] text-white shadow-xs" 
                        : "text-neutral-400 hover:text-[#1E1B18] bg-transparent"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="group flex items-center gap-4 text-[#1E1B18] disabled:opacity-20 disabled:cursor-not-allowed hover:text-[#E89D7A] transition-colors"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest">Next</span>
                <div className="w-8 h-8 rounded-full border border-[#EFE6DA]/70 flex items-center justify-center group-hover:border-[#E89D7A] transition-colors bg-white">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#1E1B18] py-32 px-6 text-center shadow-xl border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#E89D7A]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-12 relative z-10">
          <span className="text-[#E89D7A] text-[9px] font-bold uppercase tracking-[0.25em] block">Your Story Starts Here</span>
          <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tight leading-none uppercase">
            READY TO BUILD YOUR <br />
            <span className="font-serif italic text-[#E89D7A]">LEGACY?</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-light max-w-xl mx-auto lead-relaxed">
            Join the hundreds of black entrepreneurs who have transformed their visions into reality with the NEF.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 max-w-md mx-auto">
            <button 
              onClick={() => navigate("/how-to-apply")}
              className="bg-[#E89D7A] text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#1E1B18] transition-all w-full md:w-auto rounded-full shadow-md hover:scale-105"
            >
              Apply for Funding
            </button>
            <button 
              onClick={() => navigate("/funding-criteria")}
              className="border border-white/10 text-white px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#1E1B18] transition-all w-full md:w-auto bg-white/5 rounded-full hover:scale-105"
            >
              View Criteria
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-12 border-t border-[#EFE6DA]/30 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-light tracking-widest text-[#1E1B18]">NEF CORP</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
            © 2026 NEF CORP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 cursor-pointer hover:text-[#E89D7A] transition-colors">
              Twitter
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 cursor-pointer hover:text-[#E89D7A] transition-colors">
              LinkedIn
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
