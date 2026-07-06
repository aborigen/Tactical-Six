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
import { cn } from "@/lib/utils";
import { translations, Language } from '@/lib/translations';
import { Settings, Globe, Volume2, VolumeX, ShieldCheck, Palette, LayoutGrid } from 'lucide-react';
import { PieceSetStyle } from '@/components/chess/Piece';

interface SettingsDialogProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  pieceSet: PieceSetStyle;
  setPieceSet: (style: PieceSetStyle) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ 
  lang, 
  setLang, 
  isMuted, 
  setIsMuted,
  pieceSet,
  setPieceSet
}) => {
  const t = translations[lang];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-accent/20 bg-accent/5 hover:bg-accent/10 font-bold text-accent"
          title={t.settings_btn}
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">{t.settings_btn}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10">
        <div className="h-24 w-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center px-8">
          <div className="flex items-center gap-4">
            <div className="bg-accent p-2.5 rounded-xl shadow-lg shadow-accent/20">
              <Settings className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-white uppercase">
                {t.settings_title}
              </DialogTitle>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] opacity-80">
                {t.settings_subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> {t.settings_lang_label}
              </Label>
              <Badge variant="outline" className="text-[8px] font-mono border-white/10 text-white/40 uppercase">
                ISO_639_1
              </Badge>
            </div>
            <Tabs 
              value={lang} 
              onValueChange={(v) => setLang(v as Language)}
              className="w-full bg-secondary/40 border border-white/5 p-1 rounded-xl"
            >
              <TabsList className="grid grid-cols-2 bg-transparent gap-1 h-10">
                <TabsTrigger value="en" className="data-[state=active]:bg-white data-[state=active]:text-black font-bold rounded-lg px-3">
                  English
                </TabsTrigger>
                <TabsTrigger value="ru" className="data-[state=active]:bg-white data-[state=active]:text-black font-bold rounded-lg px-3">
                  Русский
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Palette className="w-3.5 h-3.5" /> {t.settings_pieces_label}
              </Label>
              <Badge variant="outline" className="text-[8px] font-mono border-white/10 text-white/40 uppercase">
                SKIN_PACK
              </Badge>
            </div>
            <Tabs 
              value={pieceSet} 
              onValueChange={(v) => setPieceSet(v as PieceSetStyle)}
              className="w-full bg-secondary/40 border border-white/5 p-1 rounded-xl"
            >
              <TabsList className="grid grid-cols-2 bg-transparent gap-1 h-10">
                <TabsTrigger value="tactical" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-3">
                  {t.piece_set_tactical}
                </TabsTrigger>
                <TabsTrigger value="cyber" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground font-bold rounded-lg px-3">
                  {t.piece_set_cyber}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                {t.settings_sound_label}
              </Label>
              <Badge variant="outline" className={cn(
                "text-[8px] font-mono border-white/10 uppercase",
                !isMuted ? "text-accent" : "text-destructive"
              )}>
                {isMuted ? "Muted" : "Active"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-tight">Audio Synthesis</span>
                <span className="text-[10px] text-muted-foreground">Web Audio API Protocols</span>
              </div>
              <Switch 
                checked={!isMuted} 
                onCheckedChange={(checked) => setIsMuted(!checked)} 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-xl border border-white/5">
              <ShieldCheck className="w-5 h-5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-wide">
                  System integrity confirmed. 
                </p>
                <p className="text-[8px] text-muted-foreground/40 font-mono uppercase">
                  Local execution mode active.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;