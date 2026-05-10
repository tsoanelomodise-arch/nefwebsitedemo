import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Briefcase, TrendingUp, Building2, FolderCheck, Award, 
  AlertTriangle, XCircle, RotateCcw, ShieldCheck, FileText, 
  ChevronDown, Calculator, Zap, Mail, Printer, ArrowLeft, X,
  TrendingDown, BarChart3, Send, Loader2, CheckCircle2 
} from "lucide-react";
import React, { useState, useMemo } from "react";
import Breadcrumbs from "./components/Breadcrumbs";

const allQuestions = [
  {
    id: 'ownership',
    icon: <Users className="w-12 h-12 text-gold-foil mb-6" />,
    title: "Black Economic Empowerment",
    question: "Is your business majority-owned by Black entrepreneurs or a Black-owned group?",
    description: "The NEF provides funds specifically to facilitate access to finance in support of Broad-Based BEE.",
    type: 'boolean',
    requiredAnswer: true
  },
  {
    id: 'operational',
    icon: <Briefcase className="w-12 h-12 text-gold-foil mb-6" />,
    title: "Operational Involvement",
    question: "Are the Black shareholders actively involved in the day-to-day operations and management of the business?",
    description: "There must be operational involvement at the executive or management level, not just passive ownership.",
    type: 'boolean',
    requiredAnswer: true
  },
  {
    id: 'viability',
    icon: <TrendingUp className="w-12 h-12 text-gold-foil mb-6" />,
    title: "Business Plan & Projections",
    question: "Do you have a completed Business Plan and 5-year financial projections?",
    description: "A commercially viable case and detailed multi-year projections are mandatory.",
    type: 'boolean',
    requiredAnswer: true
  },
  {
    id: 'business_stage',
    icon: <Building2 className="w-12 h-12 text-gold-foil mb-6" />,
    title: "Business Stage",
    question: "What is the current stage or nature of your business?",
    description: "This helps us tailor the specific document checklist for your situation.",
    type: 'choice',
    options: [
      { value: 'startup', label: 'Start-up Business' },
      { value: 'existing', label: 'Existing Business' },
      { value: 'franchise', label: 'Franchise Acquisition' }
    ]
  },
  {
    id: 'core_docs',
    icon: <FolderCheck className="w-12 h-12 text-gold-foil mb-6" />,
    title: "Core Required Documents",
    question: "Do you have the following core documents ready?",
    bullets: ["Certified IDs", "Detailed CVs", "Asset & Liability Statements", "Company Registration docs"],
    description: "These personal and compliance documents are strictly required.",
    type: 'boolean',
    requiredAnswer: true
  }
];

const nefChecklistItems = [
    "Application form and Business plan",
    "Affidavit from members or directors that they are aware of the contents of the application form",
    "Three (3) year audited financials (Income Statement, Balance Sheet, Cash Flow Statement)",
    "Five (5) year financial projections (Income Statement, Balance Sheet and monthly Cash Flow Statement) with first year prepared on a monthly basis",
    "Recent management accounts (Income Statement and Balance Sheet)",
    "Personal Statements of Assets and Liabilities of all the members or directors including those of spouses if person is married in Community of Property",
    "Business bank statements for the past twelve (12) months",
    "Certified ID copies of all members or directors",
    "Registration Documents and all the relevant legal documents relevant to the entity",
    "Detailed profile of the Franchisor",
    "Details of why the business is for sale",
    "Sale Agreement",
    "Franchise Agreement",
    "Historical financials of other franchises that are similar in size and in similar locations",
    "Indication from the Franchisor of how much a new Franchise in a similar location would cost",
    "Indication of whether the lease agreement will be ceded to the new company after the sale or a new lease agreement will be signed. If lease is ceded, how long will it still run for before renewal? New lease if it is a new franchise.",
    "The prospective buyer must have been approved by the franchisor",
    "Fica compliance - Proof of residence",
    "Detailed CV of principle Applicant"
];

export default function CheckEligibility() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<any>({});
  const [showResults, setShowResults] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showMasterScore, setShowMasterScore] = useState(false);
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [showProjectionsModal, setShowProjectionsModal] = useState(false);
  
  const [checklistState, setChecklistState] = useState(new Array(nefChecklistItems.length).fill(false));
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Business Plan Data
  const [planData, setPlanData] = useState({
    blackOwnership: '', womenOwnership: '', jobsCreated: '', womenJobs: '',
    youthJobs: '', disabledJobs: '', locationType: 'Urban', monthlyUnits: '',
    unitPrice: '', unitCost: '', monthlyOverhead: ''
  });

  const [vaultState, setVaultState] = useState({
    bbbeeCert: false, managementCvs: false, offtakeAgreements: false
  });

  // Personal Statement Data
  const [assets, setAssets] = useState({ property: '', cash: '', investments: '', vehicles: '', other: '' });
  const [liabilities, setLiabilities] = useState({ mortgage: '', vehicleFinance: '', loans: '', creditCards: '', other: '' });
  const [income, setIncome] = useState({ salary: '', commission: '', rental: '', other: '' });
  const [expenses, setExpenses] = useState({ deductions: '', housing: '', transport: '', foodUtilities: '', insurance: '', debt: '', education: '', other: '' });

  // Helper logic for Personal Statement Math
  const sumValues = (obj: any) => Object.values(obj).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0);
  
  const statementTotals = useMemo(() => {
      const totalAssets = Number(sumValues(assets));
      const totalLiabilities = Number(sumValues(liabilities));
      const netAssets = totalAssets - totalLiabilities;
      const totalIncome = Number(sumValues(income));
      const totalExpenses = Number(sumValues(expenses));
      const netSurplus = totalIncome - totalExpenses;
      return { totalAssets, totalLiabilities, netAssets, totalIncome, totalExpenses, netSurplus };
  }, [assets, liabilities, income, expenses]);

  const calculateCompliance = () => {
    const finalQuestions = allQuestions;
    const failedCriteria = finalQuestions.filter(q => q.type === 'boolean' && answers[q.id] !== q.requiredAnswer);
    return { passed: failedCriteria.length === 0, failedCriteria };
  };

  const scoreData = useMemo(() => {
    const compliance = calculateCompliance();
    let compScore = compliance.passed ? 30 : 5;
    let mandateScore = 0;
    if (parseFloat(planData.blackOwnership) >= 51) mandateScore += 10;
    if (parseFloat(planData.womenOwnership) >= 30) mandateScore += 5;
    if (planData.locationType === 'Rural/Township') mandateScore += 5;
    
    let impactScore = 0;
    const totalJobs = parseFloat(planData.jobsCreated) || 0;
    if (totalJobs >= 5) impactScore += 5;
    if (parseFloat(planData.womenJobs) > 0) impactScore += 5;
    if (parseFloat(planData.youthJobs) > 0) impactScore += 5;
    if (parseFloat(planData.disabledJobs) > 0) impactScore += 5;
    
    let commercialScore = 0;
    const revenue = (parseFloat(planData.monthlyUnits) || 0) * (parseFloat(planData.unitPrice) || 0);
    const netProfit = (revenue - ((parseFloat(planData.monthlyUnits) || 0) * (parseFloat(planData.unitCost) || 0))) - (parseFloat(planData.monthlyOverhead) || 0);
    if (netProfit > 0) commercialScore += 10;
    if (vaultState.bbbeeCert) commercialScore += 5;
    if (vaultState.offtakeAgreements) commercialScore += 10;
    if (vaultState.managementCvs) commercialScore += 5;
    
    const total = Math.min(compScore + mandateScore + impactScore + commercialScore, 100);
    return { total, compliance: compScore, mandate: mandateScore, impact: impactScore, commercial: commercialScore, passedAll: compliance.passed, failedCriteria: compliance.failedCriteria };
  }, [answers, planData, vaultState]);

  const readinessScore = scoreData.total;
  const formatZAR = (val: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(val);

  const revenue = (parseFloat(planData.monthlyUnits) || 0) * (parseFloat(planData.unitPrice) || 0);
  const cogs = (parseFloat(planData.monthlyUnits) || 0) * (parseFloat(planData.unitCost) || 0);
  const netProfit = (revenue - cogs) - (parseFloat(planData.monthlyOverhead) || 0);
  const grossMargin = revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0;

  const stageName = {
      startup: 'Start-up', existing: 'Existing Business', franchise: 'Franchise'
  }[answers.business_stage as keyof typeof answers] || 'Business';

  const handleAnswer = (answer: any) => {
    const activeQuestions = allQuestions;
    const newAnswers = { ...answers, [activeQuestions[currentStep].id]: answer };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentStep < activeQuestions.length - 1) setCurrentStep(currentStep + 1);
      else setShowResults(true);
    }, 300);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(-1);
    setShowResults(false);
    setShowBuilder(false);
    setShowMasterScore(false);
    setShowChecklistModal(false);
    setShowStatementModal(false);
    setChecklistState(new Array(nefChecklistItems.length).fill(false));
    setAssets({ property: '', cash: '', investments: '', vehicles: '', other: '' });
    setLiabilities({ mortgage: '', vehicleFinance: '', loans: '', creditCards: '', other: '' });
    setIncome({ salary: '', commission: '', rental: '', other: '' });
    setExpenses({ deductions: '', housing: '', transport: '', foodUtilities: '', insurance: '', debt: '', education: '', other: '' });
  };

  const toggleChecklistItem = (index: number) => {
    const newState = [...checklistState];
    newState[index] = !newState[index];
    setChecklistState(newState);
  };

  const StatementInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
      <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-forest-earth/40 p-4 rounded-3xl border border-cotton-blush/10 hover:border-gold-foil/30 transition-all">
          <span className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/70 mb-2 sm:mb-0 sm:w-1/2">{label}</span>
          <div className="relative w-full sm:w-1/2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cotton-blush/30 font-black">R</span>
              <input 
                  type="number" 
                  value={value} 
                  onChange={e => onChange(e.target.value)} 
                  className="w-full bg-pine-oak/40 border border-cotton-blush/10 p-3 rounded-xl pl-10 text-right font-black text-cotton-blush focus:outline-none focus:border-cotton-blush focus:bg-pine-oak/60 hover:border-cotton-blush/30 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  placeholder="0" 
              />
          </div>
      </div>
  );

  const renderResults = () => (
    <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700 no-print">
      <div className="flex justify-center mb-8">
        {scoreData.passedAll ? <Award className="w-24 h-24 text-gold-foil" /> : <AlertTriangle className="w-24 h-24 text-gold-foil" />}
      </div>
      <h1 className="text-6xl md:text-8xl font-black uppercase text-cotton-blush mb-6 tracking-tighter">
        {scoreData.passedAll ? "Ready to Apply" : "Gaps Detected"}
      </h1>
      <p className="text-xl max-w-2xl mx-auto mb-12 text-cotton-blush/70 uppercase tracking-widest font-light">
        {scoreData.passedAll ? "You meet the core compliance mandates. Proceed to model your investment case." : "Review the critical areas below. You can use the Builder to draft out your missing requirements."}
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <button onClick={() => setShowBuilder(true)} className="bg-gold-foil text-forest-earth font-black py-5 px-12 rounded-full text-xl uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
          {scoreData.passedAll ? "Open Builder" : "Open Remediation Builder"}
        </button>
        <button onClick={() => setShowMasterScore(true)} className="border-2 border-cotton-blush/20 text-cotton-blush font-black py-5 px-12 rounded-full text-xl uppercase tracking-widest hover:border-gold-foil transition-all">View Master Score</button>
      </div>
      {!scoreData.passedAll && (
        <div className="mt-12 text-left w-full max-w-2xl bg-pine-oak/60 p-10 rounded-[3rem] border border-cotton-blush/10 shadow-2xl">
          <h3 className="font-bold text-cotton-blush text-xs uppercase tracking-[0.4em] mb-6 border-b border-cotton-blush/10 pb-4">Missing Requirements</h3>
          <ul className="space-y-4">
            {scoreData.failedCriteria.map((c, i) => (
              <li key={i} className="flex items-start gap-4 text-cotton-blush/80 font-bold uppercase text-xs tracking-wider">
                <XCircle className="w-5 h-5 text-gold-foil shrink-0" /> {c.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-forest-earth text-cotton-blush font-sans relative flex p-4 md:p-8 overflow-hidden print:bg-white"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1547471080-7cb2ac6470b9?auto=format&fit=crop&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
      
      <div className="absolute inset-0 bg-forest-earth/70 backdrop-blur-[2px] print:hidden" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[60%] bg-gold-foil/10 blur-[150px] rounded-full pointer-events-none print:hidden" />

      <div className="relative z-10 flex-1 border-[6px] border-cotton-blush/20 rounded-[4rem] p-6 md:p-12 flex flex-col backdrop-blur-md bg-pine-oak/40 shadow-2xl overflow-y-auto no-scrollbar print:border-0 print:p-0 print:bg-white">
        
        <header className="flex justify-between items-center mb-16 no-print">
          <div className="flex items-center gap-4">
            {currentStep >= 0 && (
              <button onClick={handleRestart} className="flex items-center gap-2 border-2 border-cotton-blush/20 bg-forest-earth/40 px-6 py-3 rounded-full hover:bg-gold-foil/10 hover:border-gold-foil text-[10px] font-black tracking-widest uppercase transition-all">
                <RotateCcw className="w-4 h-4" /> Restart
              </button>
            )}
            <button onClick={() => setShowMasterScore(true)} className="flex items-center gap-2 border-2 border-gold-foil/30 bg-gold-foil/5 px-6 py-3 rounded-full text-[10px] font-black tracking-widest uppercase text-gold-foil hover:bg-gold-foil/10 transition-all shadow-lg">
              <ShieldCheck className="w-4 h-4" /> Master Score
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-3 border-2 border-cotton-blush/20 bg-forest-earth/40 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:border-gold-foil">
                <FileText className="w-4 h-4 text-gold-foil" /> Downloads <ChevronDown className="w-3 h-3" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-4 w-64 bg-pine-oak/95 border-2 border-gold-foil/30 rounded-[2rem] overflow-hidden shadow-2xl z-50 backdrop-blur-xl">
                  <button onClick={() => { setCurrentStep(allQuestions.length); setShowBuilder(true); setShowResults(false); setShowDropdown(false); }} className="w-full text-left p-5 text-[10px] font-black uppercase border-b border-white/5 hover:bg-gold-foil/10 text-cotton-blush tracking-widest transition-colors">Business Planner</button>
                  <button onClick={() => { setShowStatementModal(true); setShowDropdown(false); }} className="w-full text-left p-5 text-[10px] font-black uppercase border-b border-white/5 hover:bg-gold-foil/10 text-cotton-blush tracking-widest transition-colors">Personal Statement</button>
                  <button onClick={() => { setShowChecklistModal(true); setShowDropdown(false); }} className="w-full text-left p-5 text-[10px] font-black uppercase hover:bg-gold-foil/10 text-cotton-blush tracking-widest transition-colors">NEF Checklist</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col print:block">
          <div className="mb-8 no-print">
            <Breadcrumbs />
          </div>

          {currentStep === -1 ? (
            <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left animate-in fade-in duration-1000 no-print">
              <h1 className="text-8xl md:text-[9.5rem] font-black uppercase leading-[0.82] mb-10 text-cotton-blush tracking-tighter">Funding<br/><span className="text-gold-foil">Pre-Check</span></h1>
              <p className="text-xl md:text-2xl text-cotton-blush/70 max-w-2xl mb-12 font-light leading-relaxed tracking-wide uppercase">Evaluate your business case against NEF developmental mandates before initiating a formal application process.</p>
              <button onClick={() => setCurrentStep(0)} className="bg-gold-foil text-forest-earth font-black uppercase tracking-[0.3em] py-6 px-14 rounded-full text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(197,160,89,0.3)]">Start Evaluation</button>
            </div>
          ) : showBuilder ? (
            <div className="flex-1 flex flex-col lg:flex-row gap-12 animate-in fade-in duration-700 print:block">
              <div className="flex-1 space-y-10 pr-4 overflow-y-auto no-scrollbar no-print">
                 <div className="bg-cotton-blush/5 p-10 rounded-[3rem] border border-cotton-blush/20 shadow-xl">
                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-8 flex items-center gap-3"><Users className="w-5 h-5"/> Empowerment Mandate</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Black Ownership %</label>
                       <input type="number" value={planData.blackOwnership} onChange={e => setPlanData({...planData, blackOwnership: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Women Ownership %</label>
                       <input type="number" value={planData.womenOwnership} onChange={e => setPlanData({...planData, womenOwnership: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Location Focus</label>
                       <select value={planData.locationType} onChange={e => setPlanData({...planData, locationType: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300 appearance-none cursor-pointer">
                         <option value="Urban">Urban / Metro</option>
                         <option value="Rural/Township">Rural / Township</option>
                       </select>
                     </div>
                   </div>
                 </div>

                 <div className="bg-cotton-blush/5 p-10 rounded-[3rem] border border-cotton-blush/20 shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil flex items-center gap-3"><Calculator className="w-5 h-5"/> Financial Assumptions</h3>
                      <button 
                        onClick={() => setShowProjectionsModal(true)}
                        className="text-[10px] font-black uppercase tracking-widest text-gold-foil border border-gold-foil/30 px-4 py-2 rounded-full hover:bg-gold-foil hover:text-forest-earth transition-all"
                      >
                        Detailed Projections
                      </button>
                    </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Monthly Units Sold</label>
                       <input type="number" value={planData.monthlyUnits} onChange={e => setPlanData({...planData, monthlyUnits: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Unit Selling Price</label>
                       <input type="number" value={planData.unitPrice} onChange={e => setPlanData({...planData, unitPrice: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Unit Direct Cost</label>
                       <input type="number" value={planData.unitCost} onChange={e => setPlanData({...planData, unitCost: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Monthly Fixed Overhead</label>
                       <input type="number" value={planData.monthlyOverhead} onChange={e => setPlanData({...planData, monthlyOverhead: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                   </div>
                 </div>

                 <div className="bg-cotton-blush/5 p-10 rounded-[3rem] border border-cotton-blush/20 shadow-xl">
                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-8 flex items-center gap-3"><Zap className="w-5 h-5"/> Social Impact (Jobs)</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Total Jobs</label>
                       <input type="number" value={planData.jobsCreated} onChange={e => setPlanData({...planData, jobsCreated: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Women</label>
                       <input type="number" value={planData.womenJobs} onChange={e => setPlanData({...planData, womenJobs: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Youth</label>
                       <input type="number" value={planData.youthJobs} onChange={e => setPlanData({...planData, youthJobs: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Disabled</label>
                       <input type="number" value={planData.disabledJobs} onChange={e => setPlanData({...planData, disabledJobs: e.target.value})} className="w-full bg-pine-oak/20 border-2 border-cotton-blush/10 p-5 rounded-2xl text-xl font-black text-cotton-blush outline-none hover:border-cotton-blush/30 focus:border-cotton-blush focus:bg-pine-oak/40 transition-all duration-300" />
                     </div>
                   </div>
                 </div>

                 <div className="bg-cotton-blush/5 p-10 rounded-[3rem] border border-cotton-blush/20 shadow-xl">
                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-8 flex items-center gap-3"><FolderCheck className="w-5 h-5"/> Evidence Vault</h3>
                   <div className="flex flex-col gap-6">
                     <label className="flex items-center gap-5 cursor-pointer group">
                       <input type="checkbox" checked={vaultState.bbbeeCert} onChange={e => setVaultState({...vaultState, bbbeeCert: e.target.checked})} className="w-8 h-8 accent-gold-foil cursor-pointer" />
                       <span className="text-sm font-black uppercase tracking-widest text-cotton-blush group-hover:text-gold-foil transition-colors">Valid B-BBEE Certificate Available</span>
                     </label>
                     <label className="flex items-center gap-5 cursor-pointer group">
                       <input type="checkbox" checked={vaultState.managementCvs} onChange={e => setVaultState({...vaultState, managementCvs: e.target.checked})} className="w-8 h-8 accent-gold-foil cursor-pointer" />
                       <span className="text-sm font-black uppercase tracking-widest text-cotton-blush group-hover:text-gold-foil transition-colors">Key Management CVs Ready</span>
                     </label>
                     <label className="flex items-center gap-5 cursor-pointer group">
                       <input type="checkbox" checked={vaultState.offtakeAgreements} onChange={e => setVaultState({...vaultState, offtakeAgreements: e.target.checked})} className="w-8 h-8 accent-gold-foil cursor-pointer" />
                       <span className="text-sm font-black uppercase tracking-widest text-cotton-blush group-hover:text-gold-foil transition-colors">Secured Offtake Contracts / LOIs</span>
                     </label>
                   </div>
                 </div>
                 
                 <div className="bg-gold-foil/10 p-10 rounded-[3rem] border border-gold-foil/30 shadow-xl mt-6">
                   <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-6 flex items-center gap-3"><FileText className="w-5 h-5"/> Executive Summary Draft</h3>
                   <p className="text-cotton-blush leading-relaxed font-light text-lg">
                       This <strong className="text-white font-bold">{stageName.toLowerCase()}</strong> is currently structured with <strong className="text-gold-foil font-bold">{planData.blackOwnership || 0}% Black Ownership</strong> and <strong className="text-gold-foil font-bold">{planData.womenOwnership || 0}% Women Ownership</strong>, operating primarily in an <strong className="text-white font-bold">{planData.locationType}</strong> setting. 
                       Financially, the projections indicate a monthly gross revenue of <strong className="text-gold-foil font-bold">{formatZAR(revenue)}</strong> operating at a <strong className="text-white font-bold">{grossMargin.toFixed(1)}% gross margin</strong>, leading to a net profitability of <strong className="text-gold-foil font-bold">{formatZAR(netProfit)}</strong> per month. 
                       From a socio-economic perspective, the venture is positioned to create <strong className="text-white font-bold">{planData.jobsCreated || 0} total jobs</strong>, actively prioritizing marginalized demographics including {planData.womenJobs || 0} women and {planData.youthJobs || 0} youth.
                   </p>
                 </div>
              </div>

              <div className="w-full lg:w-[450px] flex flex-col gap-8 print:w-full">
                <div className="bg-pine-oak p-12 rounded-[4rem] border-[3px] border-gold-foil/30 text-center shadow-2xl relative overflow-hidden backdrop-blur-lg">
                   <div className="text-9xl font-black text-gold-foil mb-2 tracking-tighter drop-shadow-lg">{readinessScore}</div>
                   <div className="text-xs font-black text-cotton-blush uppercase tracking-[0.5em] mb-8">Investment Readiness</div>
                   <div className="h-3 w-full bg-forest-earth rounded-full overflow-hidden shadow-inner border border-cotton-blush/10">
                      <div className="h-full bg-gold-foil transition-all duration-1000 shadow-[0_0_20px_#C5A059]" style={{ width: `${readinessScore}%` }} />
                   </div>
                </div>

                <div className="bg-cotton-blush/5 p-10 rounded-[3rem] border border-cotton-blush/10 space-y-8 backdrop-blur-md print:bg-white print:border-black/20">
                   <h4 className="text-cotton-blush text-xs font-black uppercase tracking-[0.4em] flex items-center gap-4 border-b border-cotton-blush/10 pb-6 print:text-black">Performance Dashboard</h4>
                   <div className="space-y-6">
                     <div className="flex justify-between items-baseline"><span className="text-[10px] font-black text-cotton-blush/40 uppercase tracking-widest print:text-black/60">Gross Revenue</span><span className="text-xl font-black text-cotton-blush print:text-black">{formatZAR(revenue)}</span></div>
                     <div className="flex justify-between items-baseline"><span className="text-[10px] font-black text-cotton-blush/40 uppercase tracking-widest print:text-black/60">Profit Margin</span><span className="text-xl font-black text-cotton-blush print:text-black">{grossMargin.toFixed(1)}%</span></div>
                     <div className="pt-6 border-t border-cotton-blush/10 flex justify-between items-center"><span className="text-xs font-black text-gold-foil uppercase tracking-widest">Net Profitability</span><span className={`text-3xl font-black ${netProfit >= 0 ? 'text-gold-foil' : 'text-red-500'} drop-shadow-md`}>{formatZAR(netProfit)}</span></div>
                   </div>
                </div>

                <div className="flex gap-4 no-print">
                   <button onClick={() => setShowEmailModal(true)} className="flex-1 bg-gold-foil text-forest-earth font-black py-6 rounded-full uppercase tracking-widest text-[10px] hover:bg-[#D4B473] transition-all shadow-xl flex items-center justify-center gap-3"><Mail className="w-4 h-4"/> Email Case</button>
                   <button onClick={() => window.print()} className="flex-1 border-2 border-cotton-blush/20 text-cotton-blush font-black py-6 rounded-full uppercase tracking-widest text-[10px] hover:border-gold-foil transition-all shadow-md flex items-center justify-center gap-3"><Printer className="w-4 h-4"/> Print Case</button>
                </div>
              </div>
            </div>
          ) : showResults ? (
            renderResults()
          ) : (
            <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center animate-in slide-in-from-right-10 duration-500 no-print">
               <div className="text-center mb-12">
                  <div className="p-4 bg-gold-foil/10 rounded-full inline-block mb-6 shadow-xl border border-gold-foil/20">{allQuestions[currentStep].icon}</div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-cotton-blush">{allQuestions[currentStep].question}</h2>
                  <p className="text-lg text-cotton-blush/60 italic uppercase tracking-wider">{allQuestions[currentStep].description}</p>
               </div>
               
               {allQuestions[currentStep].type === 'choice' ? (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allQuestions[currentStep].options?.map(opt => (
                        <button key={opt.value} onClick={() => handleAnswer(opt.value)} className="p-10 border-2 border-cotton-blush/20 rounded-[3rem] font-black uppercase tracking-widest text-cotton-blush hover:bg-gold-foil hover:text-forest-earth hover:border-gold-foil transition-all shadow-lg">
                            {opt.label}
                        </button>
                    ))}
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button onClick={() => handleAnswer(true)} className="p-10 border-2 border-cotton-blush/20 rounded-[3rem] font-black uppercase tracking-widest text-cotton-blush hover:bg-gold-foil hover:text-forest-earth hover:border-gold-foil transition-all shadow-lg">Yes, Confirmed</button>
                    <button onClick={() => handleAnswer(false)} className="p-10 border-2 border-cotton-blush/20 rounded-[3rem] font-black uppercase tracking-widest text-cotton-blush hover:bg-gold-foil hover:text-forest-earth hover:border-gold-foil transition-all shadow-lg">No / Pending</button>
                 </div>
               )}
            </div>
          )}
        </main>
      </div>

      {/* Overlays & Modals */}
      
      <AnimatePresence>
        {showChecklistModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-forest-earth/95 backdrop-blur-3xl flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="bg-pine-oak border-[6px] border-gold-foil/20 rounded-[4rem] md:rounded-[5rem] w-full max-w-5xl h-[90vh] md:h-[85vh] relative shadow-[0_50px_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden p-6 md:p-12"
             >
                <div className="shrink-0 pb-8 flex justify-start border-b border-cotton-blush/10 mb-6">
                    <button onClick={() => setShowChecklistModal(false)} className="font-black uppercase text-[10px] tracking-[0.3em] text-cotton-blush flex items-center gap-3 hover:text-gold-foil transition-all"><ArrowLeft className="w-6 h-6"/> Close Checklist</button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar pr-4 md:pr-8">
                    <h3 className="text-gold-foil text-xs font-black uppercase tracking-[0.6em] mb-8 text-center">NEF Document & Information Checklist</h3>
                    <div className="space-y-4">
                       {nefChecklistItems.map((item, index) => (
                         <label key={index} className="flex items-start gap-5 cursor-pointer group p-5 bg-forest-earth/40 rounded-3xl border border-cotton-blush/10 hover:border-gold-foil/50 transition-all shadow-sm">
                           <input type="checkbox" checked={checklistState[index]} onChange={() => toggleChecklistItem(index)} className="w-6 h-6 mt-1 accent-gold-foil cursor-pointer shrink-0" />
                           <span className="text-sm md:text-base font-medium text-cotton-blush group-hover:text-white transition-colors leading-relaxed">
                             <strong className="text-gold-foil mr-2">{index + 1}.</strong>{item}
                           </span>
                         </label>
                       ))}
                    </div>
                </div>
             </motion.div>
          </motion.div>
        )}

        {showStatementModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-forest-earth/95 backdrop-blur-3xl flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="bg-pine-oak border-[6px] border-gold-foil/20 rounded-[4rem] md:rounded-[5rem] w-full max-w-6xl h-[90vh] md:h-[85vh] relative shadow-[0_50px_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden p-6 md:p-12"
             >
                <div className="shrink-0 pb-8 flex justify-start border-b border-cotton-blush/10 mb-6">
                    <button onClick={() => setShowStatementModal(false)} className="font-black uppercase text-[10px] tracking-[0.3em] text-cotton-blush flex items-center gap-3 hover:text-gold-foil transition-all"><ArrowLeft className="w-6 h-6"/> Close Statement</button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar pr-4 md:pr-8">
                    <div className="text-center mb-12">
                        <h3 className="text-gold-foil text-xs font-black uppercase tracking-[0.6em] mb-4">Personal Statement of Assets & Liabilities</h3>
                        <p className="text-cotton-blush/60 text-sm font-light uppercase tracking-widest">Confidential Financial Declaration</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Column: Assets & Liabilities */}
                        <div className="space-y-8">
                            <div className="bg-cotton-blush/5 p-8 rounded-[3rem] border border-cotton-blush/10 shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-6 flex items-center gap-3"><Building2 className="w-5 h-5"/> Assets</h4>
                                <div className="space-y-4">
                                    <StatementInput label="Fixed Property" value={assets.property} onChange={v => setAssets({...assets, property: v})} />
                                    <StatementInput label="Cash & Bank Balances" value={assets.cash} onChange={v => setAssets({...assets, cash: v})} />
                                    <StatementInput label="Investments (Shares/Trusts)" value={assets.investments} onChange={v => setAssets({...assets, investments: v})} />
                                    <StatementInput label="Motor Vehicles" value={assets.vehicles} onChange={v => setAssets({...assets, vehicles: v})} />
                                    <StatementInput label="Other (Equipment/Furniture)" value={assets.other} onChange={v => setAssets({...assets, other: v})} />
                                </div>
                                <div className="mt-6 pt-6 border-t border-cotton-blush/10 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/60">Total Assets</span>
                                    <span className="text-xl font-black text-cotton-blush">{formatZAR(statementTotals.totalAssets)}</span>
                                </div>
                            </div>

                            <div className="bg-cotton-blush/5 p-8 rounded-[3rem] border border-cotton-blush/10 shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-6 flex items-center gap-3"><TrendingDown className="w-5 h-5"/> Liabilities</h4>
                                <div className="space-y-4">
                                    <StatementInput label="Mortgage Bonds" value={liabilities.mortgage} onChange={v => setLiabilities({...liabilities, mortgage: v})} />
                                    <StatementInput label="Vehicle Finance" value={liabilities.vehicleFinance} onChange={v => setLiabilities({...liabilities, vehicleFinance: v})} />
                                    <StatementInput label="Unsecured Loans" value={liabilities.loans} onChange={v => setLiabilities({...liabilities, loans: v})} />
                                    <StatementInput label="Credit Cards" value={liabilities.creditCards} onChange={v => setLiabilities({...liabilities, creditCards: v})} />
                                    <StatementInput label="Other Liabilities" value={liabilities.other} onChange={v => setLiabilities({...liabilities, other: v})} />
                                </div>
                                <div className="mt-6 pt-6 border-t border-cotton-blush/10 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/60">Total Liabilities</span>
                                    <span className="text-xl font-black text-cotton-blush">{formatZAR(statementTotals.totalLiabilities)}</span>
                                </div>
                            </div>

                            <div className="bg-gold-foil/10 p-8 rounded-[3rem] border-[3px] border-gold-foil/30 shadow-2xl flex justify-between items-center relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-10"><Briefcase className="w-32 h-32 text-gold-foil"/></div>
                                <div className="relative z-10">
                                    <span className="block text-[10px] font-black uppercase tracking-widest text-gold-foil/70 mb-1">Net Asset Value</span>
                                    <span className={`text-4xl font-black ${statementTotals.netAssets >= 0 ? 'text-gold-foil' : 'text-red-500'}`}>{formatZAR(statementTotals.netAssets)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Income & Expenses */}
                        <div className="space-y-8">
                            <div className="bg-cotton-blush/5 p-8 rounded-[3rem] border border-cotton-blush/10 shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-6 flex items-center gap-3"><TrendingUp className="w-5 h-5"/> Monthly Income</h4>
                                <div className="space-y-4">
                                    <StatementInput label="Gross Salary" value={income.salary} onChange={v => setIncome({...income, salary: v})} />
                                    <StatementInput label="Commission / Bonuses" value={income.commission} onChange={v => setIncome({...income, commission: v})} />
                                    <StatementInput label="Rental Income" value={income.rental} onChange={v => setIncome({...income, rental: v})} />
                                    <StatementInput label="Other Income" value={income.other} onChange={v => setIncome({...income, other: v})} />
                                </div>
                                <div className="mt-6 pt-6 border-t border-cotton-blush/10 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/60">Total Income</span>
                                    <span className="text-xl font-black text-cotton-blush">{formatZAR(statementTotals.totalIncome)}</span>
                                </div>
                            </div>

                            <div className="bg-cotton-blush/5 p-8 rounded-[3rem] border border-cotton-blush/10 shadow-xl">
                                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-gold-foil mb-6 flex items-center gap-3"><Calculator className="w-5 h-5"/> Monthly Expenses</h4>
                                <div className="space-y-4">
                                    <StatementInput label="Salary Deductions (Tax)" value={expenses.deductions} onChange={v => setExpenses({...expenses, deductions: v})} />
                                    <StatementInput label="Housing (Bond/Rent)" value={expenses.housing} onChange={v => setExpenses({...expenses, housing: v})} />
                                    <StatementInput label="Transport & Fuel" value={expenses.transport} onChange={v => setExpenses({...expenses, transport: v})} />
                                    <StatementInput label="Food & Utilities" value={expenses.foodUtilities} onChange={v => setExpenses({...expenses, foodUtilities: v})} />
                                    <StatementInput label="Insurances & Medical" value={expenses.insurance} onChange={v => setExpenses({...expenses, insurance: v})} />
                                    <StatementInput label="Debt Repayments" value={expenses.debt} onChange={v => setExpenses({...expenses, debt: v})} />
                                    <StatementInput label="Education & Other" value={expenses.education} onChange={v => setExpenses({...expenses, education: v})} />
                                </div>
                                <div className="mt-6 pt-6 border-t border-cotton-blush/10 flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/60">Total Expenses</span>
                                    <span className="text-xl font-black text-cotton-blush">{formatZAR(statementTotals.totalExpenses)}</span>
                                </div>
                            </div>

                            <div className="bg-gold-foil/10 p-8 rounded-[3rem] border-[3px] border-gold-foil/30 shadow-2xl flex justify-between items-center relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 opacity-10"><BarChart3 className="w-32 h-32 text-gold-foil"/></div>
                                <div className="relative z-10">
                                    <span className="block text-[10px] font-black uppercase tracking-widest text-gold-foil/70 mb-1">Net Surplus / Deficit</span>
                                    <span className={`text-4xl font-black ${statementTotals.netSurplus >= 0 ? 'text-gold-foil' : 'text-red-500'}`}>{formatZAR(statementTotals.netSurplus)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </motion.div>
          </motion.div>
        )}

        {showProjectionsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-forest-earth/95 backdrop-blur-3xl flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="bg-pine-oak border-[6px] border-gold-foil/20 rounded-[4rem] md:rounded-[5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar relative shadow-[0_50px_100px_rgba(0,0,0,1)] p-8 md:p-16"
             >
                <div className="flex justify-between items-center mb-12">
                    <h3 className="text-gold-foil text-xs font-black uppercase tracking-[0.6em]">Financial Projections Builder</h3>
                    <button onClick={() => setShowProjectionsModal(false)} className="bg-cotton-blush/10 p-4 rounded-full hover:bg-cotton-blush/20 transition-all"><X className="w-6 h-6 text-cotton-blush"/></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Monthly Units Sold</label>
                            <input type="number" value={planData.monthlyUnits} onChange={e => setPlanData({...planData, monthlyUnits: e.target.value})} className="w-full bg-forest-earth/40 border-2 border-cotton-blush/10 p-6 rounded-3xl text-2xl font-black text-cotton-blush outline-none focus:border-gold-foil transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Unit Selling Price (R)</label>
                            <input type="number" value={planData.unitPrice} onChange={e => setPlanData({...planData, unitPrice: e.target.value})} className="w-full bg-forest-earth/40 border-2 border-cotton-blush/10 p-6 rounded-3xl text-2xl font-black text-cotton-blush outline-none focus:border-gold-foil transition-all" />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Unit Production Cost (R)</label>
                            <input type="number" value={planData.unitCost} onChange={e => setPlanData({...planData, unitCost: e.target.value})} className="w-full bg-forest-earth/40 border-2 border-cotton-blush/10 p-6 rounded-3xl text-2xl font-black text-cotton-blush outline-none focus:border-gold-foil transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-widest text-cotton-blush/50">Monthly Fixed Overheads (R)</label>
                            <input type="number" value={planData.monthlyOverhead} onChange={e => setPlanData({...planData, monthlyOverhead: e.target.value})} className="w-full bg-forest-earth/40 border-2 border-cotton-blush/10 p-6 rounded-3xl text-2xl font-black text-cotton-blush outline-none focus:border-gold-foil transition-all" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-forest-earth/60 p-8 rounded-[3rem] border border-cotton-blush/10">
                        <div className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/30 mb-2">Monthly Revenue</div>
                        <div className="text-3xl font-black text-cotton-blush">R {revenue.toLocaleString()}</div>
                    </div>
                    <div className="bg-forest-earth/60 p-8 rounded-[3rem] border border-cotton-blush/10">
                        <div className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/30 mb-2">Gross Margin</div>
                        <div className="text-3xl font-black text-gold-foil">{revenue > 0 ? (((revenue - cogs) / revenue) * 100).toFixed(1) : 0}%</div>
                    </div>
                    <div className="bg-forest-earth/60 p-8 rounded-[3rem] border border-cotton-blush/10">
                        <div className="text-[10px] font-black uppercase tracking-widest text-cotton-blush/30 mb-2">Net Monthly Profit</div>
                        <div className={`text-3xl font-black ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>R {netProfit.toLocaleString()}</div>
                    </div>
                </div>

                <div className="mt-16 pt-12 border-t border-cotton-blush/10 flex justify-center">
                    <button onClick={() => setShowProjectionsModal(false)} className="bg-gold-foil text-forest-earth px-12 py-6 rounded-full font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-2xl">Apply to Case</button>
                </div>
             </motion.div>
          </motion.div>
        )}

        {showMasterScore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-forest-earth/95 backdrop-blur-3xl flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="bg-pine-oak border-[6px] border-gold-foil/20 rounded-[4rem] md:rounded-[5rem] w-full max-w-5xl h-[90vh] md:h-[85vh] relative shadow-[0_50px_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden p-6 md:p-12"
             >
                <div className="shrink-0 pb-8 flex justify-start">
                    <button onClick={() => setShowMasterScore(false)} className="font-black uppercase text-[10px] tracking-[0.3em] text-cotton-blush flex items-center gap-3 hover:text-gold-foil transition-all"><ArrowLeft className="w-6 h-6"/> Dismiss</button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar pr-4 md:pr-8 text-center">
                    <h3 className="text-gold-foil text-xs font-black uppercase tracking-[0.6em] mb-8">Master Evaluation Summary</h3>
                    
                    <div className="relative inline-flex items-center justify-center mb-12">
                        <svg viewBox="0 0 100 100" className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90">
                            <circle
                                cx="50"
                                cy="50"
                                r="44"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-cotton-blush/5"
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="44"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray="276.46"
                                initial={{ strokeDashoffset: 276.46 }}
                                animate={{ strokeDashoffset: 276.46 * (1 - readinessScore / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                strokeLinecap="round"
                                className="text-gold-foil shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <div className="text-[8rem] md:text-[11rem] font-black text-cotton-blush leading-none tracking-tighter drop-shadow-2xl">{readinessScore}</div>
                            <div className="text-[10px] font-black text-cotton-blush/30 uppercase tracking-[0.4em]">Readiness Index</div>
                        </div>
                    </div>

                    <div className="text-xs font-black text-cotton-blush/50 uppercase tracking-[0.4em] mb-16 underline decoration-gold-foil decoration-2 underline-offset-8">Score Breakdown</div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                       {[
                         { label: 'Compliance', score: scoreData.compliance, max: 30, icon: <ShieldCheck className="w-5 h-5"/> },
                         { label: 'Mandate', score: scoreData.mandate, max: 20, icon: <Users className="w-5 h-5"/> },
                         { label: 'Social Impact', score: scoreData.impact, max: 20, icon: <Zap className="w-5 h-5"/> },
                         { label: 'Commercial', score: scoreData.commercial, max: 30, icon: <BarChart3 className="w-5 h-5"/> }
                       ].map((cat, idx) => (
                         <div key={idx} className="bg-forest-earth/40 p-8 rounded-[3rem] border border-cotton-blush/10 flex flex-col items-center shadow-lg group">
                            <div className="text-gold-foil mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                            <div className="text-4xl font-black text-cotton-blush mb-2">{cat.score}<span className="text-[12px] opacity-20 ml-1">/{cat.max}</span></div>
                            <div className="text-[9px] font-black uppercase tracking-widest text-cotton-blush/40 leading-relaxed mb-4">{cat.label}</div>
                            <div className="w-full h-1 bg-cotton-blush/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(cat.score / cat.max) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.5 + idx * 0.1, ease: "easeOut" }}
                                    className="h-full bg-gold-foil shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                />
                            </div>
                         </div>
                       ))}
                    </div>
                    
                    <div className="bg-forest-earth/60 p-12 rounded-[4rem] border-2 border-cotton-blush/10 shadow-inner">
                      <p className="text-xl text-cotton-blush font-bold italic uppercase tracking-wider leading-relaxed">
                        {readinessScore >= 75 
                          ? "Exceptional investment alignment. Core mandates are satisfied and commercial metrics demonstrate strong viability." 
                          : readinessScore >= 40 
                            ? "Viable with optimizations. Ensure all documentation in the 'Evidence Vault' is verified to maximize application strength." 
                            : "Critical mandate gaps found. Review ownership structure and geographic focus to align with NEF developmental goals."}
                      </p>
                    </div>
                </div>
             </motion.div>
          </motion.div>
        )}

        {showEmailModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
          >
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-cotton-blush rounded-[4rem] w-full max-w-xl p-16 text-forest-earth shadow-2xl relative text-center"
             >
                <button onClick={() => { setShowEmailModal(false); setIsSent(false); }} className="absolute top-10 left-10 font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3"><ArrowLeft className="w-5 h-5"/> Back</button>
                {!isSent ? (
                  <>
                    <Mail className="w-20 h-20 mx-auto mb-10 opacity-20"/>
                    <h3 className="text-5xl font-black uppercase tracking-tighter mb-6">Email Case</h3>
                    <p className="font-bold uppercase text-[10px] tracking-[0.2em] mb-12 opacity-70 leading-relaxed">Send a formal investment readiness summary to your business email.</p>
                    <form onSubmit={(e) => { e.preventDefault(); setIsSending(true); setTimeout(() => { setIsSending(false); setIsSent(true); }, 2000); }} className="space-y-6">
                      <input required type="email" placeholder="owner@business.co.za" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} className="w-full bg-pine-oak/5 rounded-3xl p-7 text-sm font-black border border-pine-oak/10 focus:outline-none focus:border-pine-oak focus:bg-pine-oak/10 hover:border-pine-oak/30 transition-all duration-300 placeholder-pine-oak/30 shadow-inner"/>
                      <button disabled={isSending} type="submit" className="w-full bg-pine-oak text-cotton-blush font-black uppercase tracking-[0.4em] py-7 rounded-3xl flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-2xl">
                        {isSending ? <Loader2 className="animate-spin w-5 h-5"/> : <Send className="w-5 h-5"/>} {isSending ? 'Sending...' : 'Send Summary'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-20 h-20 text-green-700 mx-auto mb-10"/>
                    <h3 className="text-5xl font-black uppercase tracking-tighter mb-6">Case Sent</h3>
                    <p className="font-bold uppercase text-[10px] tracking-[0.2em] mb-12 opacity-70">Check your inbox. Your NEF Readiness Summary is arriving at {emailValue}.</p>
                    <button onClick={() => { setShowEmailModal(false); setIsSent(false); }} className="w-full bg-pine-oak text-cotton-blush font-black uppercase py-7 rounded-3xl tracking-[0.4em] shadow-lg">Return to Builder</button>
                  </div>
                )}
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
