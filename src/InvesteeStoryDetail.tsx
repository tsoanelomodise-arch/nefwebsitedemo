import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Quote, Calendar, User, Share2, Facebook, Twitter, Linkedin, ArrowRight, Check,
  TrendingUp, Users, Briefcase, Maximize, Hospital, Bed, Stethoscope, Store
} from "lucide-react";
import { STORIES, getYouTubeEmbedUrl } from "./data/stories";

const IconMap: Record<string, any> = {
  TrendingUp, Users, Briefcase, Maximize, Hospital, Bed, Stethoscope, Store
};

export default function InvesteeStoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = STORIES.find((s) => s.id === id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this investee story from NEF: ${story?.title}`;
    
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter">Story Not Found</h1>
          <button 
            onClick={() => navigate("/investee-stories")}
            className="text-gold-foil font-bold uppercase tracking-widest hover:text-black transition-colors"
          >
            Back to All Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative min-h-[60vh] md:min-h-[75vh] flex items-end bg-black pt-44 md:pt-48 pb-16 md:pb-24">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={story.image} 
            alt={story.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="bg-gold-foil text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                {story.category}
              </span>
              <div className="h-px w-12 bg-white/20"></div>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-3 h-3" /> {story.date}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-tight uppercase">
              {story.title}
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl italic border-l border-gold-foil/40 pl-4">
              "{story.summary}"
            </p>
          </motion.div>
        </div>

        {/* Back Button - Positioned to clear the sticky header */}
        <motion.button 
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/investee-stories")}
          className="absolute top-24 left-6 md:top-28 md:left-12 z-20 group flex items-center gap-4 text-white/50 hover:text-gold-foil transition-colors"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-foil transition-colors bg-black/25 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Stories</span>
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Left Column: Sidebar (Stats & Share) */}
          <aside className="lg:col-span-4 space-y-16">
            {/* Impact Stats */}
            <div className="bg-black text-white p-12 space-y-12 sticky top-32">
              <div className="space-y-2">
                <span className="text-gold-foil text-[10px] font-bold uppercase tracking-widest">The Numbers</span>
                <h3 className="text-3xl font-bold tracking-tighter">Key Impact</h3>
              </div>
              
              <div className="space-y-8">
                {story.stats?.map((stat, i) => {
                  const Icon = stat.icon ? IconMap[stat.icon] : null;
                  return (
                    <div key={i} className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold-foil shrink-0">
                        {Icon && <Icon className="w-6 h-6" />}
                      </div>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold text-gold-foil leading-none">{stat.value}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-12 border-t border-white/10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/how-to-apply")}
                  className="w-full bg-gold-foil text-black py-5 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                  Apply for Funding <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Share (Moved inside stats block for compactness or kept separate below) */}
              <div className="pt-12 border-t border-white/10 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Share this story</span>
                  <AnimatePresence>
                    {copied && (
                      <motion.span 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[10px] font-bold uppercase tracking-widest text-gold-foil flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Link Copied
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "var(--gold-foil)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("facebook")}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all group"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4 text-white/40 group-hover:text-black" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "var(--gold-foil)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("twitter")}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all group"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-4 h-4 text-white/40 group-hover:text-black" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "var(--gold-foil)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("linkedin")}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all group"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-white/40 group-hover:text-black" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "var(--gold-foil)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleShare("copy")}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all group"
                    title="Copy Link"
                  >
                    <Share2 className="w-4 h-4 text-white/40 group-hover:text-black" />
                  </motion.button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-8 text-gray-700 leading-relaxed text-xl font-light">
              {(story.fullContent || story.content).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* YouTube Video Embed */}
            <div className="space-y-6 pt-4">
              <span className="text-gold-foil text-[10px] font-bold uppercase tracking-widest block">Video Showcase</span>
              <h3 className="text-2xl font-bold tracking-tighter text-black uppercase">Watch Their Success Story</h3>
              <div className="aspect-video w-full rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl bg-gray-950 relative group">
                <iframe
                  src={getYouTubeEmbedUrl(story.videoUrl, false)}
                  title={story.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                
                {/* Fallback floating button for sandbox/embed restrictions */}
                <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                  <a
                    href={story.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black/75 hover:bg-[#F2901C] text-white hover:text-black rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    Watch on YouTube ↗
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 bg-amber-50/40 rounded-2xl text-[11px] text-neutral-600 border border-amber-100/50 gap-2">
                <span className="font-sans font-medium">Facing playback issues or configuration Error 153 in the development sandbox?</span>
                <a
                  href={story.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#F2901C] hover:underline flex items-center gap-1 uppercase tracking-wider shrink-0 text-[10px]"
                >
                  Watch Directly on YouTube ↗
                </a>
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative p-16 bg-gray-50 border-l-8 border-gold-foil">
              <Quote className="absolute top-8 right-8 w-16 h-16 text-gold-foil/20" />
              <p className="text-3xl font-medium text-gray-900 leading-tight relative z-10">
                {story.quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-px bg-gray-300"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Stakeholder</span>
              </div>
            </div>

            {/* Gallery */}
            {story.gallery && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
                {story.gallery.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="aspect-[4/3] overflow-hidden bg-gray-100"
                  >
                    <img 
                      src={img} 
                      alt={`Gallery ${i}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* More Stories */}
      <section className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <span className="text-gold-foil text-xs font-bold uppercase tracking-[0.5em] block">Next Stories</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">READ <span className="text-gray-400">MORE</span></h2>
            </div>
            <motion.button 
              whileHover={{ x: 5, color: "var(--gold-foil)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/investee-stories")}
              className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1 transition-colors"
            >
              View All
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.filter(s => s.id !== id).slice(0, 3).map((s) => (
              <motion.div 
                key={s.id}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/investee-stories/${s.id}`)}
                className="bg-white group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>
                <div className="p-8 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-foil">{s.category}</span>
                  <h3 className="text-xl font-bold tracking-tighter group-hover:text-gold-foil transition-colors">{s.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Read Story <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
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
