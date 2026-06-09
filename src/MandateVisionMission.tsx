import React from "react";
import { ArrowRight, ArrowLeft, Target, Eye, ShieldCheck, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MandateVisionMission() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans text-[#1E1B18] selection:bg-[#F2901C] selection:text-white overflow-x-hidden">
      {/* Navigation Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate("/")}
          className="pointer-events-auto group flex items-center gap-4 text-[#1E1B18]/45 hover:text-[#1E1B18] transition-colors"
        >
          <div className="w-9 h-9 rounded-full border border-[#1E1B18]/10 flex items-center justify-center group-hover:border-[#1E1B18] transition-colors bg-white/40 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <div className="pointer-events-auto flex flex-col items-end gap-1 opacity-20">
          <div className="w-8 h-0.5 bg-[#1E1B18]"></div>
          <div className="w-4 h-0.5 bg-[#1E1B18]"></div>
        </div>
      </div>

      {/* Hero Section - Editorial Narrative Style */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Column: Chocolate Slate */}
        <div className="w-full lg:w-1/3 bg-[#1E1B18] text-white p-12 lg:p-24 flex flex-col justify-between relative">
          <div className="space-y-12 relative z-10">
            <div className="text-lg font-light tracking-widest text-[#F2901C] uppercase">NEF CORP</div>
            
            <div className="space-y-3">
              <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#C79F6E]">01 MANDATED GROWTH</div>
              <div className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-30">02 SUSTAINABLE ACCESS</div>
              <div className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-30">03 STRATEGIC IMPACT</div>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="h-0.5 w-16 bg-[#F2901C]"></div>
            <p className="text-white/50 text-xs font-light leading-relaxed max-w-xs">
              Driving economic transformation through strategic empowerment and sustainable investment.
            </p>
          </div>

          {/* Vertical Line Accent */}
          <div className="absolute top-0 right-0 w-px h-full bg-white/5 hidden lg:block"></div>
        </div>

        {/* Middle Column: Sand/Peach Gradient & Immersive Photo */}
        <div className="w-full lg:w-2/3 bg-gradient-to-br from-[#FCFAF7] via-[#FAF8F5] to-[#EFE6DA] relative flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative">
            {/* Editorial Heading */}
            <h1 className="text-5xl lg:text-7xl font-sans font-light text-[#1E1B18] tracking-tight leading-none relative z-20 uppercase">
              OUR <br />
              <span className="font-serif italic text-[#E58E62]">PURPOSE</span>
            </h1>
            
            <div className="mt-12 relative z-20">
              <button 
                onClick={() => navigate("/how-to-apply")}
                className="group flex items-center gap-6 text-left"
              >
                <div className="w-14 h-14 rounded-full bg-[#1E1B18] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
                  <ArrowRight className="w-5 h-5 text-[#F2901C]" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1E1B18] block">Apply Now</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18]/40 block">Start Your Journey</span>
                </div>
              </button>
            </div>

            {/* Vertical Line */}
            <div className="absolute top-0 left-0 w-px h-full bg-[#1E1B18]/5 hidden lg:block"></div>
          </div>

          <div className="w-full lg:w-1/2 relative bg-[#1E1B18] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000&auto=format&fit=crop" 
              alt="Empowerment" 
              className="w-full h-full object-cover grayscale opacity-20 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#EFE6DA]/10"></div>
            
            {/* Overlapping Box from Reference */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#110F0E] p-8 flex flex-col justify-end">
              <p className="text-white/50 text-xs font-light leading-relaxed max-w-xs">
                We are a team of dedicated professionals who create and execute your growth strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandate Section - Warm Oatmeal / Sand-Beige */}
      <section className="py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-[#EFE6DA]/40">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          {/* Vertical Text Accent */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right">
            <div className="flex items-center gap-6 text-[8px] font-bold uppercase tracking-[0.4em] text-[#C79F6E]">
              <span>ABOUT US</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E58E62]"></div>
              <span>REGIONAL REACH</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#E58E62]"></div>
              <span>IMPACT METRICS</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[#F2901C]"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C79F6E]">The Mandate</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-sans font-light tracking-tight leading-none uppercase">
                ESTABLISHED <br />
                <span className="font-serif italic text-[#E58E62]">FOR GROWTH</span>
              </h2>
            </div>

            <div className="relative group max-w-md">
              <div className="aspect-square bg-[#EFE6DA] rounded-[2.2rem] overflow-hidden border border-white/60 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                  alt="Mandate" 
                  className="w-full h-full object-cover grayscale opacity-30 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Play Button Overlay */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <button className="w-14 h-14 rounded-full bg-[#F2901C] flex items-center justify-center shadow-lg hover:bg-[#E58E62] hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8">
              <p className="text-lg lg:text-xl font-light leading-relaxed text-[#3A3530]">
                The National Empowerment Fund (NEF) was established by the National Empowerment Fund Act No. 105 of 1998 (the NEF Act), for the purposes of being a driver and thought-leader in promoting and facilitating black economic participation by providing financial and non-financial support to black-empowered businesses, and by promoting a culture of savings and investment among black people.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-4 p-8 bg-[#1E1B18] text-white rounded-[1.8rem] relative group overflow-hidden shadow-sm">
                  <ShieldCheck className="w-7 h-7 text-[#F2901C] relative z-10" />
                  <h3 className="text-sm font-bold uppercase tracking-widest relative z-10">The NEF Act</h3>
                  <p className="text-xs text-white/55 font-light leading-relaxed relative z-10">
                    Legislation designed to redress economic imbalances of the past.
                  </p>
                </div>
                <div className="space-y-4 p-8 border border-[#EFE6DA]/85 hover:border-[#F2901C] rounded-[1.8rem] transition-colors bg-white shadow-sm">
                  <Target className="w-7 h-7 text-[#E58E62]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#1E1B18]">Thought Leadership</h3>
                  <p className="text-xs text-[#3A3530]/70 font-light leading-relaxed">
                    Pioneering new models for sustainable black economic empowerment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-4 group text-[#1E1B18]">
                <div className="w-8 h-px bg-[#E58E62] group-hover:w-16 transition-all"></div>
                READ FULL REPORT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - Immersive Earth Slate */}
      <section className="py-28 bg-[#1E1B18] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 space-y-32">
          {/* Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#F2901C]"></div>
                  <span className="text-[#F2901C] text-[9px] font-bold uppercase tracking-[0.25em]">Our Vision</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-sans font-light tracking-tight leading-none uppercase">
                  LEADING <br />
                  <span className="font-serif italic text-[#E58E62]">THE WAY</span>
                </h2>
              </div>
              <p className="text-xl lg:text-2xl font-light leading-relaxed italic text-white/85 border-l-2 border-[#F2901C] pl-6">
                "To become the leading provider of innovative and sustainable financial and non-financial solutions for black economic empowerment."
              </p>
            </div>
            <div className="relative group">
              <div className="aspect-video bg-[#2C2621]/80 rounded-[2rem] overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Vision" 
                  className="w-full h-full object-cover grayscale opacity-30 transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#F2901C]/95 text-[#1E1B18] flex items-center justify-center rounded-2xl shadow-lg">
                <Eye className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="aspect-video bg-[#2C2621]/80 rounded-[2rem] overflow-hidden border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                  alt="Mission" 
                  className="w-full h-full object-cover grayscale opacity-30 transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 backdrop-blur-sm flex items-center justify-center rounded-2xl border border-white/10">
                <Target className="w-8 h-8 text-[#F2901C]" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#F2901C]"></div>
                  <span className="text-[#F2901C] text-[9px] font-bold uppercase tracking-[0.25em]">Our Mission</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-sans font-light tracking-tight leading-none uppercase">
                  DRIVING <br />
                  <span className="font-serif italic text-[#C79F6E]">IMPACT</span>
                </h2>
              </div>
              <p className="text-base lg:text-lg font-light leading-relaxed text-white/60">
                To promote and facilitate black economic participation by providing financial and non-financial support to black-empowered businesses, and by promoting a culture of savings and investment among black people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section - Muted Warm Sage/Beige Slider layout */}
      <section className="py-28 bg-[#FCFAF7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 space-y-24">
          <div className="max-w-2xl space-y-6">
            <span className="text-[#C79F6E] text-[9px] font-bold uppercase tracking-[0.25em] block">Strategic Focus</span>
            <h2 className="text-4xl lg:text-5xl font-sans font-light tracking-tight leading-none uppercase">
              DELIVERATOR <br />
              <span className="font-serif italic text-[#E58E62]">OBJECTIVES</span>
            </h2>
            <p className="text-[#3A3530]/75 text-base font-light">
              The NEF’s mandate is delivered through a focused set of strategic objectives designed to maximize economic inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Support Broad-Based Black Economic Empowerment (B-BBEE)", id: "01" },
              { title: "Facilitate investment by black people", id: "02" },
              { title: "Promote a culture of savings and investment", id: "03" },
              { title: "Provide financial and non-financial support to black-empowered businesses", id: "04" }
            ].map((obj, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[2rem] space-y-8 group relative overflow-hidden shadow-[0_12px_40px_rgba(42,38,34,0.03)] border border-[#EFE6DA]/40 hover:border-[#F2901C]/30 transition-all duration-300"
              >
                {/* Portait Placeholder with Soft Peach Accent */}
                <div className="relative w-16 h-16 bg-[#FAF8F5] rounded-2xl overflow-hidden mb-8 border border-[#EFE6DA]/50">
                  <img 
                    src={`https://picsum.photos/seed/${obj.id}/200/200?grayscale`} 
                    alt="Objective Icon" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#F2901C]"></div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C79F6E]">{obj.id}</span>
                  <p className="text-base font-medium text-[#1E1B18] leading-snug tracking-tight">
                    {obj.title}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F2901C] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Sunset Peach Gradient */}
      <section className="py-28 bg-gradient-to-br from-[#F2901C] to-[#E58E62] text-center px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl lg:text-7xl font-sans font-light tracking-tight leading-none uppercase text-[#1E1B18]">
            got some <br />
            <span className="font-serif italic text-white text-glow-peach">questions?</span>
          </h2>
          
          <div className="pt-8">
            <button 
              onClick={() => navigate("/how-to-apply")}
              className="px-12 py-4 bg-[#1E1B18] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-900 transition-all rounded-full shadow-lg"
            >
              SEND MESSAGE
            </button>
          </div>

          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#1E1B18]/50 pt-12">
            or reach us via hello@nefcorp.co.za
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-12 lg:px-24 border-t border-[#EFE6DA]/30 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-light tracking-widest text-[#1E1B18]">NEF CORP</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
            © 2026 NATIONAL EMPOWERMENT FUND. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18]/45 cursor-pointer hover:text-[#F2901C] transition-colors">
              Twitter
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#1E1B18]/45 cursor-pointer hover:text-[#F2901C] transition-colors">
              LinkedIn
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
