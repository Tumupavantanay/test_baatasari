'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, LayoutDashboard, Users, Briefcase, FileText, CalendarClock, UserCheck,
  Settings, HelpCircle, X, ChevronDown, ChevronUp, Download, Link2, Globe, ExternalLink,
  Eye, Star, Calendar, ShieldCheck, MapPin, GraduationCap, CheckCircle, Lightbulb
} from 'lucide-react';
import { recruitmentNavItems } from '@/data/recruitmentData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// ── Utility ───────────────────────────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ── Toast ─────────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'info' | 'error';
interface Toast { message: string; type: ToastType }

function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = (message: string, type: ToastType = 'success') => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 3200);
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return { toast, show };
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.ElementType> = {
  LayoutDashboard, Users, Briefcase, FileText, CalendarClock, UserCheck, Settings
};

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-60 bg-foreground border-r border-border flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto lg:flex-shrink-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-white">CC</span>
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-bold text-background">Campus Connect</p>
              <p className="text-[9px] text-muted font-medium tracking-widest uppercase">by BAATASARI</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-white/10">
            <X size={16} className="text-muted" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {recruitmentNavItems.map((item) => {
              const Icon = NAV_ICONS[item.icon] ?? LayoutDashboard;
              return (
                <li key={item.id}>
                  <Link href={item.href} onClick={onClose} aria-current={item.isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative group',
                      item.isActive ? 'bg-white/10 text-background font-semibold' : 'text-muted hover:bg-white/5 hover:text-background'
                    )}>
                    {item.isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />}
                    <Icon size={15} className={cn('flex-shrink-0', item.isActive ? 'text-primary' : 'text-muted group-hover:text-primary')} />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help card */}
        <div className="mx-3 mb-4 p-3.5 bg-white/5 border border-white/10 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <HelpCircle size={14} className="text-primary flex-shrink-0" />
            <p className="text-[11px] font-semibold text-background">Need help?</p>
          </div>
          <p className="text-[10px] text-muted leading-relaxed mb-2.5">
            View guide to manage applications and interviews.
          </p>
          <button className="flex items-center gap-1.5 text-[11px] font-bold text-primary hover:text-primary/80 transition-colors">
            <FileText size={12} /> View Guide
          </button>
        </div>
      </aside>
    </>
  );
}

// ── Main Page Components ────────────────────────────────────────────────────────

const candidate = {
  name: 'Sneha Reddy',
  role: 'Frontend Developer',
  major: 'CSE', year: '2nd Year', university: 'GITAM University', location: 'Visakhapatnam',
  appliedTime: 'Applied 2 hours ago',
  appId: 'CC-FTD-2026-0008',
  avatar: 'SR',
  avatarColor: '#374151', 
  answers: [
    { q: '1. Why do you want to join the Tech Club?', a: 'I want to be part of a community that builds, learns and shares knowledge. I believe the Tech Club will help me grow as a developer and collaborate on impactful projects.' },
    { q: '2. Describe a project you are proud of.', a: 'I built a fully functional e-commerce platform using Next.js and Stripe.' },
    { q: '3. What technologies are you most comfortable with?', a: 'React, Next.js, Tailwind CSS, TypeScript, and Node.js.' },
    { q: '4. How do you handle tight deadlines?', a: 'I prioritize tasks based on impact and ensure constant communication with stakeholders.' },
    { q: '5. Anything else you\'d like us to know?', a: 'I am a fast learner and always eager to take on new challenges.' },
  ],
  attachments: [
    { name: 'Resume_SnehaReddy.pdf', size: '512 KB', type: 'pdf', link: '#' },
    { name: 'GitHub Profile', sub: 'github.com/sneha-reddy', type: 'github', link: '#' },
    { name: 'Portfolio', sub: 'sneha.dev', type: 'link', link: '#' },
    { name: 'LinkedIn Profile', sub: 'linkedin.com/in/sneha-reddy', type: 'linkedin', link: '#' },
  ]
};

const StarRating = ({ rating, total }: { rating: number; total: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const fill = (i + 1) <= rating ? 'primary' : i + 0.5 === rating ? 'url(#half-fill)' : 'none';
        const color = (i + 1) <= rating || i + 0.5 === rating ? 'primary' : 'border';
        return (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="half-fill">
                <stop offset="50%" stopColor="primary" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
};

export default function CandidateDetailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'answers' | 'attachments'>('answers');
  const [expandedQ, setExpandedQ] = useState<number | null>(0);
  const [recommendation, setRecommendation] = useState<string>('strong');
  const router = useRouter();

  const handleAction = (action: string) => {
    // Navigate back to the pipeline view after taking an action to simulate progression
    router.push('/recruitment');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-muted">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Bar Area */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
          <Link href="/recruitment" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to New Applications
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"><ArrowLeft size={14} className="text-muted-foreground" /></button>
              <span className="text-sm font-semibold text-foreground px-2">2 of 8</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"><ArrowRight size={14} className="text-muted-foreground" /></button>
            </div>
            <div className="h-6 w-px bg-border hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-xs font-bold border-2 border-white shadow-sm">TC</div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-foreground">Tech Club</p>
                <p className="text-[10px] text-muted-foreground font-medium">Club Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-10">
          
          <div className="max-w-6xl mx-auto px-6 py-8">
            
            {/* Top Profile Card */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-sm" style={{ backgroundColor: candidate.avatarColor }}>
                  {candidate.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-50 text-orange-700 border border-orange-200 mb-2">
                    New Application
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1 truncate">{candidate.name}</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-3 truncate">{candidate.role}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1.5"><GraduationCap size={14} className="flex-shrink-0" /> <span className="truncate">{candidate.major} • {candidate.year}</span></div>
                    <div className="flex items-center gap-1.5"><LayoutDashboard size={14} className="flex-shrink-0" /> <span className="truncate">{candidate.university}</span></div>
                    <div className="flex items-center gap-1.5"><MapPin size={14} className="flex-shrink-0" /> <span className="truncate">{candidate.location}</span></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between lg:justify-center gap-4 sm:gap-6 mt-2 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border">
                <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
                  <button className="flex flex-col items-center justify-center w-[70px] h-[70px] sm:w-16 sm:h-16 rounded-xl border border-border hover:bg-muted hover:border-primary transition-all group flex-shrink-0">
                    <FileText size={18} className="text-foreground mb-1 group-hover:text-primary" />
                    <span className="text-[10px] font-semibold text-muted-foreground">Resume</span>
                    <span className="text-[9px] text-muted-foreground">PDF</span>
                  </button>
                  <button className="flex flex-col items-center justify-center w-[70px] h-[70px] sm:w-16 sm:h-16 rounded-xl border border-border hover:bg-muted hover:border-primary transition-all group flex-shrink-0">
                    <Link2 size={18} className="text-foreground mb-1 group-hover:text-primary" />
                    <span className="text-[10px] font-semibold text-muted-foreground">GitHub</span>
                    <span className="text-[9px] text-muted-foreground">View</span>
                  </button>
                  <button className="flex flex-col items-center justify-center w-[70px] h-[70px] sm:w-16 sm:h-16 rounded-xl border border-border hover:bg-muted hover:border-primary transition-all group flex-shrink-0">
                    <Globe size={18} className="text-foreground mb-1 group-hover:text-primary" />
                    <span className="text-[10px] font-semibold text-muted-foreground">Portfolio</span>
                    <span className="text-[9px] text-muted-foreground">Visit</span>
                  </button>
                </div>
                <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium text-left lg:text-right w-full sm:w-auto">
                  {candidate.appliedTime} <br className="sm:hidden" /> <span className="hidden sm:inline">•</span> Application ID: {candidate.appId}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Application Section */}
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Application</h2>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex border-b border-border px-5">
                    <button onClick={() => setActiveTab('answers')}
                      className={cn('px-4 py-3 text-sm font-bold border-b-2 transition-colors', 
                        activeTab === 'answers' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                      Answers
                    </button>
                    <button onClick={() => setActiveTab('attachments')}
                      className={cn('px-4 py-3 text-sm font-bold border-b-2 transition-colors', 
                        activeTab === 'attachments' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                      Attachments
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="p-5">
                    {activeTab === 'answers' ? (
                      <Accordion className="space-y-3 w-full">
                        {candidate.answers.map((item, i) => (
                          <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl bg-card hover:border-primary transition-colors px-0 data-[state=open]:border-primary">
                            <AccordionTrigger className="w-full flex items-center justify-between p-4 text-left text-sm font-bold text-foreground hover:no-underline data-[state=open]:text-primary [&>svg]:text-muted-foreground [&>svg]:data-[state=open]:text-primary">
                              {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="p-4 pt-0 border-t border-muted bg-muted/50 text-sm text-muted-foreground leading-relaxed mt-0">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground text-sm font-medium">Select Attachments tab below for a detailed list.</div>
                    )}
                  </div>
                </div>

                {/* Attachments Section */}
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Attachments ({candidate.attachments.length})</h2>
                  </div>
                  <div className="p-5 space-y-3">
                    {candidate.attachments.map((att, i) => (
                      <a href={att.link} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary transition-colors group cursor-pointer bg-card">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", 
                            att.type === 'pdf' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700')}>
                            {att.type === 'pdf' ? <FileText size={20} /> : att.type === 'github' ? <Link2 size={20} /> : att.type === 'linkedin' ? <Globe size={20} /> : <Link2 size={20} />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{att.name}</p>
                            {att.sub && <p className="text-xs text-muted-foreground truncate">{att.sub}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {att.size && <span className="text-xs font-semibold text-muted-foreground">{att.size}</span>}
                          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-border text-foreground transition-colors">
                            {att.type === 'pdf' ? <Download size={16} /> : <ExternalLink size={16} className="lucide-external-link" />}
                          </button>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-6">
                
                {/* Evaluation Section */}
                <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">Evaluation</h2>
                  
                  <div className="mb-8">
                    <p className="text-sm font-bold text-foreground mb-4">Overall Score</p>
                    <div className="flex items-center gap-6">
                      {/* Circular Progress */}
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <path className="text-border" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                          <path className="text-primary" strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-foreground leading-none">82</span>
                          <span className="text-[9px] font-bold text-muted-foreground">/100</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#10B981] mb-1">Good Fit</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">Strong skills and relevant experience. Great potential for the role.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-foreground mb-4">Score Breakdown</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Technical Skills', score: 20, max: 25, stars: 4 },
                        { label: 'Projects & Portfolio', score: 20, max: 25, stars: 4 },
                        { label: 'Problem Solving', score: 15, max: 20, stars: 3.5 },
                        { label: 'Communication', score: 14, max: 15, stars: 4.5 },
                        { label: 'Leadership & Initiative', score: 13, max: 15, stars: 4.5 },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-muted-foreground">{item.label}</p>
                          <div className="flex items-center gap-3">
                            <StarRating rating={item.stars} total={5} />
                            <p className="text-xs font-bold text-foreground w-12 whitespace-nowrap text-right">{item.score} <span className="text-muted-foreground font-medium">/ {item.max}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                      <p className="text-sm font-bold text-foreground">Total</p>
                      <p className="text-sm font-bold text-foreground">82 / 100</p>
                    </div>
                  </div>
                </div>

                {/* Recommendation Section */}
                <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                  <h2 className="text-lg font-bold text-foreground mb-5">Recommendation</h2>
                  
                  <div className="space-y-2.5 mb-6">
                    {[
                      { id: 'strong', label: 'Strong Hire', desc: 'Excellent fit for the role' },
                      { id: 'hire', label: 'Hire', desc: 'Good fit, minor gaps' },
                      { id: 'maybe', label: 'Maybe', desc: 'Potential, needs more evaluation' },
                      { id: 'no', label: 'No Hire', desc: 'Not a good fit for the role' },
                    ].map(opt => (
                      <div key={opt.id} onClick={() => setRecommendation(opt.id)} className={cn("flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all", 
                        recommendation === opt.id ? 'border-primary bg-orange-50/30' : 'border-border hover:border-primary')}>
                        <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0", 
                          recommendation === opt.id ? 'border-primary' : 'border-')}>
                          {recommendation === opt.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span className={cn("text-sm font-bold", recommendation === opt.id ? 'text-foreground' : 'text-muted-foreground')}>{opt.label}</span>
                          <span className="text-xs text-muted-foreground text-right">{opt.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-foreground mb-3">Remarks</p>
                    <textarea 
                      className="w-full h-28 p-3 text-sm text-foreground bg-muted border border-border rounded-xl focus:outline-none focus:border-primary resize-none"
                      defaultValue="Sneha has excellent technical skills and has built some impressive projects. Her problem solving approach is good and she communicates clearly. Would be a valuable addition to the frontend team."
                    />
                    <p className="text-right text-[10px] text-muted-foreground mt-1 font-medium">186 / 500</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-6 mt-6">
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-base font-bold text-foreground">Take Action</h3>
                  <p className="text-xs text-muted-foreground font-medium">Choose the next step for this candidate</p>
                </div>
                
                <div className="flex flex-wrap lg:flex-nowrap gap-3">
                  <button onClick={() => handleAction('Move to Review')} className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors group">
                    <Eye size={18} className="text-amber-600 mb-1" />
                    <span className="text-xs font-bold text-amber-900 text-center">Move to Review</span>
                    <span className="text-[10px] text-amber-700 font-medium mt-0.5 text-center">Keep reviewing</span>
                  </button>
                  
                  <button onClick={() => handleAction('Shortlist')} className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors group">
                    <Star size={18} className="text-orange-600 mb-1" />
                    <span className="text-xs font-bold text-orange-900 text-center">Shortlist</span>
                    <span className="text-[10px] text-orange-700 font-medium mt-0.5 text-center">Good fit for role</span>
                  </button>
                  
                  <button onClick={() => handleAction('Schedule Interview')} className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors group">
                    <Calendar size={18} className="text-purple-600 mb-1" />
                    <span className="text-xs font-bold text-purple-900 text-center">Schedule Interview</span>
                    <span className="text-[10px] text-purple-700 font-medium mt-0.5 text-center">Invite for interview</span>
                  </button>
                  
                  <button onClick={() => handleAction('Select')} className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-emerald-50 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors group">
                    <ShieldCheck size={18} className="text-emerald-600 mb-1" />
                    <span className="text-xs font-bold text-emerald-900 text-center">Select</span>
                    <span className="text-[10px] text-emerald-700 font-medium mt-0.5 text-center">Choose for position</span>
                  </button>
                  
                  <button onClick={() => handleAction('Reject')} className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-colors group">
                    <X size={18} className="text-red-600 mb-1" />
                    <span className="text-xs font-bold text-red-900 text-center">Reject</span>
                    <span className="text-[10px] text-red-700 font-medium mt-0.5 text-center">Not a good fit</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <Lightbulb size={14} className="text-orange-500 flex-shrink-0" />
                  <p className="text-[11px] text-muted-foreground font-medium">Tip: Use arrow keys <span className="font-mono bg-border text-foreground px-1 py-0.5 rounded text-[9px]">←</span> <span className="font-mono bg-border text-foreground px-1 py-0.5 rounded text-[9px]">→</span> to move between candidates quickly.</p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
