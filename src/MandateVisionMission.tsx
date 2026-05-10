import React from "react";
import { ArrowRight, ArrowLeft, Target, Eye, ShieldCheck, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MandateVisionMission() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-gold-foil selection:text-black overflow-x-hidden">
      {/* Navigation Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => navigate("/")}
          className="pointer-events-auto group flex items-center gap-4 text-black/40 hover:text-black transition-colors"
        >
          <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>
        <div className="pointer-events-auto flex flex-col items-end gap-1">
          <div className="w-8 h-0.5 bg-black"></div>
          <div className="w-4 h-0.5 bg-black"></div>
        </div>
      </div>

      {/* Hero Section - Brutalist Style */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Column: Black & Info */}
        <div className="w-full lg:w-1/3 bg-black text-white p-12 lg:p-24 flex flex-col justify-between relative">
          <div className="space-y-12 relative z-10">
            <div className="text-xl font-bold tracking-tighter text-gold-foil">NEF CORP</div>
            
            <div className="space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">01 we can absolutely help you</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">02</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">03</div>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="h-px w-24 bg-gold-foil"></div>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              Driving economic transformation through strategic empowerment and sustainable investment.
            </p>
          </div>

          {/* Vertical Line Accent */}
          <div className="absolute top-0 right-0 w-px h-full bg-white/10 hidden lg:block"></div>
        </div>

        {/* Middle Column: Yellow & Image */}
        <div className="w-full lg:w-2/3 bg-gold-foil relative flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative">
            {/* Large Heading Overlapping */}
            <h1 className="text-6xl lg:text-9xl font-bold text-black tracking-tighter leading-none relative z-20 mix-blend-multiply">
              OUR <br />
              PURPOSE
            </h1>
            
            <div className="mt-12 relative z-20">
              <button 
                onClick={() => navigate("/how-to-apply")}
                className="group flex items-center gap-6 text-left"
              >
                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-6 h-6 text-gold-foil" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-black block">Apply Now</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block">Start Your Journey</span>
                </div>
              </button>
            </div>

            {/* Vertical Line */}
            <div className="absolute top-0 left-0 w-px h-full bg-black/10 hidden lg:block"></div>
          </div>

          <div className="w-full lg:w-1/2 relative bg-black overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000&auto=format&fit=crop" 
              alt="Empowerment" 
              className="w-full h-full object-cover grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Overlapping Box from Reference */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-black p-8 flex flex-col justify-end">
              <p className="text-white/60 text-xs font-light leading-relaxed max-w-xs">
                We are a team of dedicated professionals who create and execute your growth strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mandate Section - Gray Brutalist */}
      <section className="py-32 bg-[#e5e5e5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          {/* Vertical Text Accent */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right">
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black">
              <span>ABOUT US</span>
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <span>UPCOMING NEWS</span>
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <span>OUR PROJECTS</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-black"></div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Mandate</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none uppercase">
                ESTABLISHED <br />
                FOR GROWTH
              </h2>
            </div>

            <div className="relative group">
              <div className="aspect-square bg-black overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
                  alt="Mandate" 
                  className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Play Button Overlay */}
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <button className="w-16 h-16 rounded-full bg-gold-foil flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-black fill-black ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8">
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-black/80">
                The National Empowerment Fund (NEF) was established by the National Empowerment Fund Act No. 105 of 1998 (the NEF Act), for the purposes of being a driver and thought-leader in promoting and facilitating black economic participation by providing financial and non-financial support to black-empowered businesses, and by promoting a culture of savings and investment among black people.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                <div className="space-y-4 p-8 bg-black text-white relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-1 h-full bg-gold-foil transition-all duration-300 group-hover:w-full opacity-10"></div>
                  <ShieldCheck className="w-8 h-8 text-gold-foil relative z-10" />
                  <h3 className="text-lg font-bold uppercase tracking-widest relative z-10">The NEF Act</h3>
                  <p className="text-sm text-white/40 font-light leading-relaxed relative z-10">
                    Legislation designed to redress economic imbalances of the past.
                  </p>
                </div>
                <div className="space-y-4 p-8 border border-black/10 hover:border-black transition-colors">
                  <Target className="w-8 h-8 text-black" />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Thought Leadership</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    Pioneering new models for sustainable black economic empowerment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-12">
              <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-4 group">
                <div className="w-12 h-px bg-black group-hover:w-24 transition-all"></div>
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section - Black Brutalist */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 space-y-32">
          {/* Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-gold-foil"></div>
                  <span className="text-gold-foil text-xs font-bold uppercase tracking-[0.3em]">Our Vision</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none uppercase">
                  LEADING <br />
                  <span className="text-transparent border-t-2 border-b-2 border-white/20 py-2">THE WAY</span>
                </h2>
              </div>
              <p className="text-2xl lg:text-3xl font-light leading-tight italic text-white/80 border-l-4 border-gold-foil pl-8">
                "To become the leading provider of innovative and sustainable financial and non-financial solutions for black economic empowerment."
              </p>
            </div>
            <div className="relative group">
              <div className="aspect-video bg-gray-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
                  alt="Vision" 
                  className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gold-foil/10 backdrop-blur-sm flex items-center justify-center">
                <Eye className="w-12 h-12 text-gold-foil" />
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="aspect-video bg-gray-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                  alt="Mission" 
                  className="w-full h-full object-cover grayscale opacity-50 transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-12 h-12 text-gold-foil" />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-gold-foil"></div>
                  <span className="text-gold-foil text-xs font-bold uppercase tracking-[0.3em]">Our Mission</span>
                </div>
                <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none uppercase">
                  DRIVING <br />
                  <span className="text-transparent border-t-2 border-b-2 border-white/20 py-2 text-white">IMPACT</span>
                </h2>
              </div>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-white/60">
                To promote and facilitate black economic participation by providing financial and non-financial support to black-empowered businesses, and by promoting a culture of savings and investment among black people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section - Gray In-House Team Style */}
      <section className="py-32 bg-[#e5e5e5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-12 lg:px-24 space-y-24">
          <div className="max-w-2xl space-y-6">
            <span className="text-black text-xs font-bold uppercase tracking-[0.5em] block">Strategic Focus</span>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none uppercase">
              check our <br />
              <span className="text-gray-400">in-house team</span>
            </h2>
            <p className="text-gray-500 text-lg font-light">
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
                className="bg-white p-12 space-y-8 group relative overflow-hidden"
              >
                {/* Portrait Placeholder with Yellow Accent */}
                <div className="relative w-24 h-24 bg-gray-100 overflow-hidden mb-8">
                  <img 
                    src={`https://picsum.photos/seed/${obj.id}/200/200?grayscale`} 
                    alt="Objective Icon" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gold-foil"></div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{obj.id}</span>
                  <p className="text-lg font-bold text-black leading-tight tracking-tight">
                    {obj.title}
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-foil scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-12">
            <div className="flex items-center gap-12">
              <button className="p-4 border border-black/10 hover:border-black transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button className="p-4 border border-black/10 hover:border-black transition-colors">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Yellow Brutalist */}
      <section className="py-32 bg-gold-foil text-center px-12 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-none uppercase text-black">
            got some <br />
            questions?
          </h2>
          
          <div className="pt-12">
            <button 
              onClick={() => navigate("/how-to-apply")}
              className="w-full md:w-auto px-16 py-6 border-2 border-black text-black text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-gold-foil transition-all"
            >
              SEND MESSAGE
            </button>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 pt-12">
            or reach us via hello@nefcorp.co.za
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-12 lg:px-24 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-tighter">NEF CORP</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © 2026 NATIONAL EMPOWERMENT FUND. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer hover:text-black transition-colors">
              Twitter
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer hover:text-black transition-colors">
              LinkedIn
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
