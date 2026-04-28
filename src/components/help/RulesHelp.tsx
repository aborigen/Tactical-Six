
"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { translations, Language } from '@/lib/translations';
import { BookOpen, Target, Shield, Zap, ChevronRight, AlertCircle, Info } from 'lucide-react';
import Piece from '@/components/chess/Piece';
import { PieceType } from '@/lib/chess-logic';

interface RulesHelpProps {
  lang: Language;
}

const RulesHelp: React.FC<RulesHelpProps> = ({ lang }) => {
  const t = translations[lang];

  const pieceRules: { type: PieceType; title: string; desc: string }[] = [
    { type: 'p', title: t.rules_pawn_title, desc: t.rules_pawn_desc },
    { type: 'r', title: t.rules_rook_title, desc: t.rules_rook_desc },
    { type: 'n', title: t.rules_knight_title, desc: t.rules_knight_desc },
    { type: 'b', title: t.rules_bishop_title, desc: t.rules_bishop_desc },
    { type: 'q', title: t.rules_queen_title, desc: t.rules_queen_desc },
    { type: 'k', title: t.rules_king_title, desc: t.rules_king_desc },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 font-bold text-primary">
          <BookOpen className="w-4 h-4" />
          {t.rules_btn}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10">
        <div className="h-24 w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center px-8">
          <div className="flex items-center gap-4">
            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight text-white uppercase">
                {t.rules_title}
              </DialogTitle>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">
                {t.rules_subtitle}
              </p>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[70vh] p-8">
          <div className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> {t.rules_win_title}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-xl border border-white/5 space-y-2">
                  <p className="text-sm font-medium leading-relaxed text-foreground/80">
                    {t.rules_win_desc}
                  </p>
                </div>
                
                <div className="grid gap-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-primary uppercase mb-1">{t.rules_checkmate_title}</h4>
                      <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                        {t.rules_checkmate_desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/5 rounded-xl border border-accent/20 flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-accent uppercase mb-1">{t.rules_stalemate_title}</h4>
                      <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                        {t.rules_stalemate_desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" /> {t.ob_protocol}
              </h3>
              <div className="grid gap-4">
                {pieceRules.map((piece) => (
                  <div key={piece.type} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group transition-all hover:bg-white/10 hover:border-primary/20">
                    <div className="w-12 h-12 shrink-0 bg-secondary/50 rounded-lg p-2 transition-transform group-hover:scale-110">
                      <Piece type={piece.type} color="white" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-primary uppercase tracking-tight">
                        {piece.title}
                      </h4>
                      <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                        {piece.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-xl border border-white/5">
                <Info className="w-5 h-5 text-muted-foreground shrink-0" />
                <p className="text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-wide">
                  {t.op_intel}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RulesHelp;
