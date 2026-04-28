"use client";

import React, { useState, useCallback } from 'react';
import { ChessGame, Move } from '@/lib/chess-logic';
import Board from '@/components/chess/Board';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RotateCcw, Lightbulb, Trophy, History, BrainCircuit, ChevronRight, Cpu } from 'lucide-react';
import { aiMoveSuggestion } from '@/ai/flows/ai-move-suggestion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Home() {
  const [game, setGame] = useState(new ChessGame());
  const [hintMove, setHintMove] = useState<Move | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const { toast } = useToast();

  const resetGame = useCallback(() => {
    setGame(new ChessGame());
    setHintMove(null);
    setExplanation(null);
    toast({
      title: "Board Reset",
      description: "A new battle begins on the 6x6 arena.",
    });
  }, [toast]);

  const handleMove = useCallback((move: Move) => {
    const nextGame = game.clone();
    const success = nextGame.makeMove(move);
    if (success) {
      setGame(nextGame);
      setHintMove(null);
      setExplanation(null);
    }
  }, [game]);

  const getAiHint = async () => {
    if (game.isGameOver || isSuggesting) return;

    setIsSuggesting(true);
    setExplanation(null);

    const boardStr = game.exportToString();
    const legalMoves = game.getLegalMoves(game.turn).map(ChessGame.toAlgebraic);

    try {
      const suggestion = await aiMoveSuggestion({
        boardState: boardStr,
        currentPlayer: game.turn,
        legalMoves: legalMoves
      });

      if (suggestion.suggestedMove) {
        const move = ChessGame.fromAlgebraic(suggestion.suggestedMove);
        setHintMove(move);
        setExplanation(suggestion.explanation);
      }
    } catch (error) {
      console.error('AI Hint Error:', error);
      toast({
        variant: 'destructive',
        title: 'Strategy Tool Error',
        description: 'Unable to get AI move suggestion at this time.'
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 md:p-8 selection:bg-accent selection:text-accent-foreground">
      <header className="max-w-6xl mx-auto w-full mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20 ring-1 ring-white/10 group">
            <svg viewBox="0 0 45 45" className="w-10 h-10 fill-white transition-transform group-hover:scale-110">
              <path d="M22.5 11.63V6M20 8h5M22.5 25s4.5-7.5 3-10c-1.5-2.5-6-2.5-6 0-1.5 2.5 3 10 3 10" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white font-headline leading-none mb-1">TACTICAL SIX</h1>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Advanced 6x6 Strategy Arena
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={resetGame} className="gap-2 bg-secondary/80 border-border hover:bg-secondary font-bold px-6">
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
          <Button 
            onClick={getAiHint} 
            disabled={game.isGameOver || isSuggesting} 
            className="gap-2 bg-primary hover:bg-primary/90 text-white font-black px-8 shadow-lg shadow-primary/30"
          >
            {isSuggesting ? <Cpu className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
            STRATEGY HINT
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          <Card className="bg-card border-border shadow-2xl ring-1 ring-white/5 overflow-hidden">
            <CardHeader className="pb-4 bg-secondary/30">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                <History className="w-4 h-4" /> Logged Manoeuvres
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ScrollArea className="h-[300px] lg:h-[450px] pr-4">
                <div className="space-y-3">
                  {game.history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <History className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm italic font-medium">No movements recorded.<br/>Initiate engagement.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Array.from({ length: Math.ceil(game.history.length / 2) }).map((_, i) => (
                        <div key={i} className="grid grid-cols-2 gap-2">
                          <div className="flex justify-between items-center bg-secondary/20 p-2.5 rounded-lg border border-border/40 text-sm font-mono transition-colors hover:bg-secondary/40">
                            <span className="text-muted-foreground/60 text-[10px] font-bold">{i + 1}W</span>
                            <span className="font-bold">{ChessGame.toAlgebraic(game.history[i * 2])}</span>
                          </div>
                          {game.history[i * 2 + 1] && (
                            <div className="flex justify-between items-center bg-accent/10 p-2.5 rounded-lg border border-accent/20 text-sm font-mono transition-colors hover:bg-accent/20">
                              <span className="text-accent/60 text-[10px] font-bold">{i + 1}B</span>
                              <span className="text-accent font-black">{ChessGame.toAlgebraic(game.history[i * 2 + 1])}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="mb-8 flex justify-between w-full items-center px-4 py-3 bg-secondary/20 rounded-2xl border border-border/50 backdrop-blur-sm">
            <div className={cn(
              "flex items-center gap-3 transition-all duration-300 px-4 py-2 rounded-xl",
              game.turn === 'white' ? "bg-white/10 ring-1 ring-white/20" : "opacity-40 grayscale"
            )}>
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
              <span className="text-sm font-black tracking-tighter">WHITE COMMAND</span>
            </div>
            
            <div className="h-0.5 flex-1 mx-6 bg-gradient-to-r from-white/10 via-primary/20 to-accent/10" />

            <div className={cn(
              "flex items-center gap-3 transition-all duration-300 px-4 py-2 rounded-xl",
              game.turn === 'black' ? "bg-accent/10 ring-1 ring-accent/20" : "opacity-40 grayscale"
            )}>
              <span className="text-sm font-black tracking-tighter text-accent">BLACK COMMAND</span>
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent))]" />
            </div>
          </div>

          <Board game={game} onMove={handleMove} hintMove={hintMove} />

          <div className="mt-10 w-full">
            <div className={cn(
              "p-6 rounded-2xl border transition-all duration-700 backdrop-blur-md relative overflow-hidden group",
              game.isGameOver 
                ? "bg-primary/10 border-primary/50 shadow-2xl shadow-primary/20 ring-4 ring-primary/5" 
                : "bg-secondary/40 border-border shadow-lg"
            )}>
              {game.isGameOver ? (
                <div className="flex flex-col items-center gap-4 relative z-10 animate-in zoom-in duration-500">
                  <div className="bg-primary/20 p-4 rounded-full">
                    <Trophy className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">{game.status}</h2>
                  <Button size="lg" onClick={resetGame} className="mt-2 bg-primary text-white font-black px-10">REPLAY BATTLE</Button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="text-xl font-bold tracking-tight text-foreground/90 italic">{game.status}</span>
                </div>
              )}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-6">
          <Card className="bg-card border-border shadow-2xl ring-1 ring-white/5 h-full flex flex-col">
            <CardHeader className="pb-4 bg-secondary/30">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-accent">
                <Cpu className="w-4 h-4" /> Tactical Engine
              </CardTitle>
              <CardDescription className="text-[10px] font-medium tracking-tight opacity-70">Local Minimax Alpha-Beta Search</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <div className="h-full min-h-[300px] bg-secondary/10 rounded-2xl p-5 border border-white/5 relative overflow-hidden group flex flex-col">
                {!explanation && !isSuggesting && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                      <div className="relative w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center border border-accent/20 transition-all group-hover:scale-110">
                        <Lightbulb className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-white uppercase tracking-wider">Awaiting Directives</p>
                      <p className="text-muted-foreground text-xs font-medium px-4 leading-relaxed">
                        Deploy the Strategy Hint tool to receive instant tactical analysis from the local computational matrix.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={getAiHint} className="border-accent/30 hover:bg-accent/10 hover:text-accent">
                      INITIATE ANALYTICS
                    </Button>
                  </div>
                )}
                {isSuggesting && (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-t-accent rounded-full animate-spin" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-xs font-black text-accent uppercase tracking-[0.2em] animate-pulse">Calculating Vectors</p>
                      <p className="text-[10px] text-muted-foreground font-mono">LOCAL_SEARCH_D3</p>
                    </div>
                  </div>
                )}
                {explanation && !isSuggesting && (
                  <ScrollArea className="h-full">
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <Badge className="bg-accent text-accent-foreground font-black tracking-widest px-4 py-1 text-xs">
                          MOVE: {hintMove ? ChessGame.toAlgebraic(hintMove) : 'N/A'}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-accent/50" />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-accent uppercase tracking-widest opacity-60">Engine Evaluation</h4>
                        <p className="text-sm text-foreground/90 leading-relaxed font-medium italic border-l-2 border-accent/30 pl-4 bg-accent/5 py-4 rounded-r-lg">
                          "{explanation}"
                        </p>
                      </div>
                      <div className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Search Depth</p>
                            <p className="text-lg font-black text-white">3 Ply</p>
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                            <p className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Status</p>
                            <p className="text-lg font-black text-accent">Optimal</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-16 pb-8 text-center">
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase">Tactical Six Operational Intelligence</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <p className="text-muted-foreground text-[9px] font-mono opacity-30">
          V1.2.0 // 6X6_STRAT_ENG // LOCAL_INIT_COMPLETE
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
