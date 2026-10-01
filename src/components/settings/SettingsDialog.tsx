"use client"

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { translations, Language } from '@/lib/translations';
import { Settings, Globe, Volume2, VolumeX, ShieldCheck, Palette, Sun, Moon, Coffee, Eye, Cpu, Zap, Layout } from 'lucide-react';
import Piece, { PieceSetStyle } from '@/components/chess/Piece';

interface SettingsDialogProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  headSkin: PieceSetStyle;
  setHeadSkin: (style: PieceSetStyle) => void;
  bodySkin: PieceSetStyle;
  setBodySkin: (style: PieceSetStyle) => void;
  baseSkin: PieceSetStyle;
  setBaseSkin: (style: PieceSetStyle) => void;
  theme: 'light' | 'dark' | 'brown';
  setTheme: (theme: 'light' | 'dark' | 'brown') => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  lang, 
  setLang, 
  isMuted, 
  setIsMuted,
  headSkin,
  setHeadSkin,
  bodySkin,
  setBodySkin,
  baseSkin,
  setBaseSkin,
  theme,
  setTheme
}) => {
  const t = translations[lang];

  const themeOptions = [
    { 
      id: 'light' as const, 
      icon: Sun, 
      label: t.theme_light, 
      colorClass: "bg-[#f8f9fa]", 
      iconClass: "text-slate-600" 
    },
    { 
      id: 'dark' as const, 
      icon: Moon, 
      label: t.theme_dark, 
      colorClass: "bg-[#0f172a]", 
      iconClass: "text-slate-200" 
    },
    { 
      id: 'brown' as const, 
      icon: Coffee, 
      label: t.theme_brown, 
      colorClass: "bg-[#2a1a0f]", 
      iconClass: "text-[#e6d5c3]" 
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-accent/20 bg-accent/5 hover:bg-accent/10 font-bold text-accent h-8 px-2 sm:px-3"
          title={t.settings_btn}
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">{t.settings_btn}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10">
        <DialogHeader className="h-20 sm:h-24 w-full bg-gradient-to-br from-accent/20 to-accent/5 flex flex-row items-center px-6 sm:px-8 text-left space-y-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-accent p-2 sm:p-2.5 rounded-xl shadow-lg shadow-accent/20">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-black tracking-tight text-foreground uppercase">
                {t.settings_title}
              </DialogTitle>
              <DialogDescription className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.2em] opacity-80">
                {t.settings_subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh]">
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" /> {t.settings_theme_label}
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <Button
                      key={opt.id}
                      variant="outline"
                      onClick={() => setTheme(opt.id)}
                      className={cn(
                        "h-auto py-4 flex flex-col gap-2 border-2",
                        theme === opt.id ? "border-primary bg-primary/10" : "border-transparent bg-secondary/20"
                      )}
                    >
                      <Icon className={cn("w-5 h-5", opt.iconClass)} />
                      <span className="text-[9px] font-black uppercase">{opt.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> {t.settings_pieces_label}
              </Label>
              <div className="flex flex-col items-center p-4 bg-secondary/20 rounded-xl gap-2">
                <div className="w-16 h-16 bg-card rounded-lg p-2 flex items-center justify-center">
                  <Piece type="k" color="white" headStyle={headSkin} />
                </div>
                <Tabs value={headSkin} onValueChange={(v) => {
                  const s = v as PieceSetStyle;
                  setHeadSkin(s); setBodySkin(s); setBaseSkin(s);
                }} className="w-full">
                  <TabsList className="grid grid-cols-2 gap-1 h-10">
                    <TabsTrigger value="geometric" className="text-[9px] uppercase font-bold">Geometric</TabsTrigger>
                    <TabsTrigger value="slimes" className="text-[9px] uppercase font-bold">Slimes</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> {t.settings_lang_label}
              </Label>
              <Tabs value={lang} onValueChange={(v) => setLang(v as Language)} className="w-full">
                <TabsList className="grid grid-cols-2 gap-1 h-10">
                  <TabsTrigger value="en" className="text-[9px] uppercase font-bold">English</TabsTrigger>
                  <TabsTrigger value="ru" className="text-[9px] uppercase font-bold">Русский</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-6">
              <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5" /> {t.settings_sound_label}
              </Label>
              <Switch checked={!isMuted} onCheckedChange={(c) => setIsMuted(!c)} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
