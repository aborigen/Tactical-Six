"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Settings, Globe, Volume2, VolumeX, ShieldCheck, Palette, Sun, Moon, Coffee } from 'lucide-react';
import { PieceSetStyle } from '@/components/chess/Piece';

interface SettingsDialogProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  pieceSet: PieceSetStyle;
  setPieceSet: (style: PieceSetStyle) => void;
  theme: 'light' | 'dark' | 'brown';
  setTheme: (theme: 'light' | 'dark' | 'brown') => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  lang, 
  setLang, 
  isMuted, 
  setIsMuted,
  pieceSet,
  setPieceSet,
  theme,
  setTheme
}) => {
  const t = translations[lang];

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
      <DialogContent className="sm:max-w-[420px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10">
        <div className="h-20 sm:h-24 w-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center px-6 sm:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-accent p-2 sm:p-2.5 rounded-xl shadow-lg shadow-accent/20">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-black tracking-tight text-foreground uppercase">
                {t.settings_title}
              </DialogTitle>
              <p className="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.2em] opacity-80">
                {t.settings_subtitle}
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[75vh]">
          <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {t.settings_theme_label}
                </Label>
                <Badge variant="outline" className="text-[7px] sm:text-[8px] font-mono border-border text-muted-foreground uppercase px-1.5 py-0">
                  VISION_MODE
                </Badge>
              </div>
              <Tabs 
                value={theme} 
                onValueChange={(v) => setTheme(v as 'light' | 'dark' | 'brown')}
                className="w-full bg-secondary/40 border border-border p-1 rounded-xl"
              >
                <TabsList className="grid grid-cols-3 bg-transparent gap-1 h-9 sm:h-10">
                  <TabsTrigger value="light" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-2 uppercase text-[9px] sm:text-[10px]">
                    <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" /> {t.theme_light}
                  </TabsTrigger>
                  <TabsTrigger value="dark" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-2 uppercase text-[9px] sm:text-[10px]">
                    <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" /> {t.theme_dark}
                  </TabsTrigger>
                  <TabsTrigger value="brown" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-2 uppercase text-[9px] sm:text-[10px]">
                    <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" /> {t.theme_brown}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {t.settings_lang_label}
                </Label>
                <Badge variant="outline" className="text-[7px] sm:text-[8px] font-mono border-border text-muted-foreground uppercase px-1.5 py-0">
                  ISO_639_1
                </Badge>
              </div>
              <Tabs 
                value={lang} 
                onValueChange={(v) => setLang(v as Language)}
                className="w-full bg-secondary/40 border border-border p-1 rounded-xl"
              >
                <TabsList className="grid grid-cols-2 bg-transparent gap-1 h-9 sm:h-10">
                  <TabsTrigger value="en" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-2 text-[9px] sm:text-[10px]">
                    English
                  </TabsTrigger>
                  <TabsTrigger value="ru" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-2 text-[9px] sm:text-[10px]">
                    Русский
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Palette className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {t.settings_pieces_label}
                </Label>
                <Badge variant="outline" className="text-[7px] sm:text-[8px] font-mono border-border text-muted-foreground uppercase px-1.5 py-0">
                  SKIN_PACK
                </Badge>
              </div>
              <Tabs 
                value={pieceSet} 
                onValueChange={(v) => setPieceSet(v as PieceSetStyle)}
                className="w-full bg-secondary/40 border border-border p-1 rounded-xl"
              >
                <TabsList className="grid grid-cols-3 bg-transparent gap-1 h-9 sm:h-10">
                  <TabsTrigger value="vanguard" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-1 text-[8px] sm:text-[9px] uppercase">
                    {t.piece_set_tactical}
                  </TabsTrigger>
                  <TabsTrigger value="cyber" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground font-bold rounded-lg px-1 text-[8px] sm:text-[9px] uppercase">
                    {t.piece_set_cyber}
                  </TabsTrigger>
                  <TabsTrigger value="classical" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-1 text-[8px] sm:text-[9px] uppercase">
                    {t.piece_set_classical}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  {t.settings_sound_label}
                </Label>
                <Badge variant="outline" className={cn(
                  "text-[7px] sm:text-[8px] font-mono border-border uppercase px-1.5 py-0",
                  !isMuted ? "text-accent" : "text-destructive"
                )}>
                  {isMuted ? "Muted" : "Active"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 sm:p-4 bg-secondary/30 rounded-xl border border-border">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-tight">Audio Synthesis</span>
                  <span className="text-[8px] sm:text-[10px] text-muted-foreground">Web Audio API Protocols</span>
                </div>
                <Switch 
                  checked={!isMuted} 
                  onCheckedChange={(checked) => setIsMuted(!checked)} 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-secondary/10 rounded-xl border border-border">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-wide">
                    System integrity confirmed. 
                  </p>
                  <p className="text-[7px] sm:text-[8px] text-muted-foreground/40 font-mono uppercase">
                    Local execution mode active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
