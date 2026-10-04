"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { translations, Language } from '@/lib/translations';
import { Zap, Target, Activity, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TitleScreenProps {
  isOpen: boolean;
  onStart: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function TitleScreen({ isOpen, onStart, lang, setLang }: TitleScreenProps) {
  const t = translations[lang];
  const [isInitializing, setIsInitializing] = useState(false);

  const handleStart = () => {
    setIsInitializing(true);
    setTimeout(() => {
      onStart();
      setIsInitializing(false);
    }, 800);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-none w-full h-svh p-0 bg-background border-none z-50 overflow-hidden flex flex-col items-center justify-center">
        {/* Background Grid & Aura */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        {/* Top-Right Language Switcher */}
        <div className="absolute top-6 right-6 z-20 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Tabs value={lang} onValueChange={(v) => setLang(v as Language)} className="bg-secondary/40 backdrop-blur-md border border-white/5 p-1 rounded-xl shadow-2xl">
            <TabsList className="bg-transparent gap-1 h-8">
              <TabsTrigger value="en" className="data-[state=active]:bg-primary data-[state=active]:text-white font-black rounded-lg px-3 text-[9px] uppercase tracking-wider">
                EN
              </TabsTrigger>
              <TabsTrigger value="ru" className="data-[state=active]:bg-primary data-[state=active]:text-white font-black rounded-lg px-3 text-[9px] uppercase tracking-wider">
                RU
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-12 animate-in fade-in zoom-in duration-1000 px-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse-glow" />
            <div className="bg-primary p-6 rounded-[2rem] shadow-2xl shadow-primary/40 ring-2 ring-white/20 transform transition-transform group-hover:scale-105 duration-500">
              <svg viewBox="0 0 24 24" className="w-16 h-16 sm:w-20 sm:h-20 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <circle cx="12" cy="11" r="3" className="fill-white/20" />
                <path d="M12 8v6" />
                <path d="M10 11h4" />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-foreground uppercase italic leading-none">
              {t.title}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-primary/40" />
              <p className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-[0.4em] opacity-80">
                {t.subtitle}
              </p>
              <div className="h-px w-8 bg-primary/40" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-[320px]">
            <Button 
              size="lg" 
              onClick={handleStart}
              disabled={isInitializing}
              className={cn(
                "w-full h-14 sm:h-16 bg-primary hover:bg-primary/90 text-white font-black text-base uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 transition-all duration-300",
                isInitializing ? "scale-95 opacity-50" : "hover:scale-105 active:scale-95"
              )}
            >
              {isInitializing ? (
                <Activity className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-3 fill-white" />
                  {t.title_screen_cta}
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-4 text-[8px] font-black text-muted-foreground uppercase tracking-widest animate-pulse">
              <Activity className="w-3 h-3 text-accent" />
              <span>{t.title_screen_status}</span>
              <Target className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>

        {/* Tactical Corner Details */}
        <div className="absolute top-8 left-8 hidden sm:block border-l-2 border-t-2 border-primary/20 w-12 h-12 rounded-tl-xl" />
        <div className="absolute top-8 right-8 hidden sm:block border-r-2 border-t-2 border-primary/20 w-12 h-12 rounded-tr-xl" />
        <div className="absolute bottom-8 left-8 hidden sm:block border-l-2 border-b-2 border-primary/20 w-12 h-12 rounded-bl-xl" />
        <div className="absolute bottom-8 right-8 hidden sm:block border-r-2 border-b-2 border-primary/20 w-12 h-12 rounded-br-xl" />
      </DialogContent>
    </Dialog>
  );
}
