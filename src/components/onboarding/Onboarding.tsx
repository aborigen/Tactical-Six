
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
import { ChevronRight, ChevronLeft, Target, Shield, Cpu, LayoutGrid } from 'lucide-react';
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
      icon: <Target className="w-12 h-12 text-primary" />,
      color: "from-primary/20 to-primary/5"
    },
    {
      title: t.ob_step2_title,
      description: t.ob_step2_desc,
      icon: <LayoutGrid className="w-12 h-12 text-accent" />,
      color: "from-accent/20 to-accent/5"
    },
    {
      title: t.ob_step3_title,
      description: t.ob_step3_desc,
      icon: <Cpu className="w-12 h-12 text-primary" />,
      color: "from-primary/20 to-primary/5"
    },
    {
      title: t.ob_step4_title,
      description: t.ob_step4_desc,
      icon: <Shield className="w-12 h-12 text-accent" />,
      color: "from-accent/20 to-accent/5"
    }
  ];

  const currentStep = steps[step];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleFinish();
    }}>
      <DialogContent className="sm:max-w-[450px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10">
        <div className={cn(
          "h-32 w-full bg-gradient-to-br flex items-center justify-center transition-all duration-700",
          currentStep.color
        )}>
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-150 animate-pulse" />
            <div className="relative z-10 animate-in zoom-in duration-500">
              {currentStep.icon}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <DialogHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                Manoeuvre Protocol {step + 1}/{steps.length}
              </span>
              <Button variant="ghost" size="sm" onClick={handleFinish} className="h-6 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-white">
                {t.ob_skip}
              </Button>
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight text-white mb-2 leading-none">
              {currentStep.title}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium leading-relaxed text-muted-foreground">
              {currentStep.description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-1.5 pt-4 justify-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === step ? "w-8 bg-primary" : "w-2 bg-white/10"
                )}
              />
            ))}
          </div>

          <DialogFooter className="pt-6 sm:justify-between flex-row gap-4 items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep(s => s - 1)}
              className="border-white/5 bg-white/5 hover:bg-white/10 font-bold px-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t.ob_prev}
            </Button>
            
            {step < steps.length - 1 ? (
              <Button
                size="sm"
                onClick={() => setStep(s => s + 1)}
                className="bg-primary hover:bg-primary/90 text-white font-black px-6 shadow-lg shadow-primary/20"
              >
                {t.ob_next}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleFinish}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-black px-6 shadow-lg shadow-accent/20 animate-in fade-in slide-in-from-right-2"
              >
                {t.ob_finish}
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
