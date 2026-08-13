"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { translations, Language } from '@/lib/translations';
import { ChevronRight, ChevronLeft, Target, Shield, Cpu, LayoutGrid, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingProps {
  lang: Language;
}

const STORAGE_KEY = 'tactical_six_onboarding_seen';

export default function Onboarding({ lang }: OnboardingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const t = translations[lang];

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, []);

  const handleFinish = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  const steps = [
    {
      title: t.ob_step1_title,
      description: t.ob_step1_desc,
      icon: <Target className="w-16 h-16 text-primary" />,
      color: "from-primary/20 via-primary/5 to-transparent",
      accent: "border-primary/20"
    },
    {
      title: t.ob_step2_title,
      description: t.ob_step2_desc,
      icon: <LayoutGrid className="w-16 h-16 text-accent" />,
      color: "from-accent/20 via-accent/5 to-transparent",
      accent: "border-accent/20"
    },
    {
      title: t.ob_step3_title,
      description: t.ob_step3_desc,
      icon: <Cpu className="w-16 h-16 text-primary" />,
      color: "from-primary/20 via-primary/5 to-transparent",
      accent: "border-primary/20"
    },
    {
      title: t.ob_step4_title,
      description: t.ob_step4_desc,
      icon: <Terminal className="w-16 h-16 text-accent" />,
      color: "from-accent/20 via-accent/5 to-transparent",
      accent: "border-accent/20"
    }
  ];

  const currentStep = steps[step];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleFinish();
    }}>
      <DialogContent className="sm:max-w-[480px] bg-card/95 backdrop-blur-2xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10">
        {/* Cinematic Header Area */}
        <div className={cn(
          "relative h-48 w-full bg-gradient-to-b flex items-center justify-center transition-all duration-700 overflow-hidden",
          currentStep.color
        )}>
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative z-10 animate-in zoom-in duration-700 ease-out">
              {currentStep.icon}
            </div>
          </div>
          
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 animate-[scan_3s_linear_infinite]" />
        </div>

        <div className="p-8 space-y-6">
          <DialogHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  {t.ob_protocol}
                </span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                   {step + 1} / {steps.length}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleFinish} className="h-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-foreground">
                {t.ob_skip}
              </Button>
            </div>
            
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-black tracking-tighter text-foreground uppercase leading-tight italic">
                {currentStep.title}
              </DialogTitle>
              <DialogDescription className="text-[13px] font-medium leading-relaxed text-muted-foreground text-pretty">
                {currentStep.description}
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Progress Indicators */}
          <div className="flex gap-2 justify-start items-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === step ? "w-12 bg-primary" : i < step ? "w-3 bg-primary/40" : "w-3 bg-white/10"
                )}
              />
            ))}
          </div>

          <DialogFooter className="pt-4 sm:justify-between flex-row gap-4 items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep(s => s - 1)}
              className="border-white/5 bg-secondary/30 hover:bg-secondary/50 font-black text-[10px] uppercase tracking-widest px-6 h-10"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t.ob_prev}
            </Button>
            
            {step < steps.length - 1 ? (
              <Button
                size="sm"
                onClick={() => setStep(s => s + 1)}
                className="bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-widest px-8 h-10 shadow-xl shadow-primary/20"
              >
                {t.ob_next}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleFinish}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-black text-[10px] uppercase tracking-widest px-8 h-10 shadow-xl shadow-accent/20 animate-in fade-in slide-in-from-right-4"
              >
                {t.ob_finish}
                <Shield className="w-4 h-4 ml-2" />
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(192px); }
        }
      `}</style>
    </Dialog>
  );
}
