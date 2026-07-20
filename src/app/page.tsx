"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ChessGame, Move } from '@/lib/chess-logic';
import Board from '@/components/chess/Board';
import { PieceSetStyle } from '@/components/chess/Piece';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  RotateCcw, Lightbulb, Trophy, History, Cpu, Users, ChevronRight, 
  Trash2, Copy, Check, ChevronLeft, ChevronLast, ChevronFirst,
  PlayCircle, Zap, Settings
} from 'lucide-react';
import { aiMoveSuggestion } from '@/ai/flows/ai-move-suggestion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { translations, Language } from '@/lib/translations';
import Onboarding from '@/components/onboarding/Onboarding';
import RulesHelp from '@/components/help/RulesHelp';
import SettingsDialog from '@/components/settings/SettingsDialog';
import { soundManager } from '@/lib/sounds';
import { initYandexSDK, showFullscreenAd } from '@/lib/yandex-sdk';

type GameMode = 'pvp' | 'pve';
type Difficulty = 'easy' | 'medium' | 'hard';
type Score = { white: number; black: number; draws: number };

const SCORE_STORAGE_KEY = 'tactical_six_scores';
const HISTORY_STORAGE_KEY = 'tactical_six_history';
const DIFFICULTY_STORAGE_KEY = 'tactical_six_difficulty';
const PIECE_SET_STORAGE_KEY = 'tactical_six_piece_set';

const DIFFICULTY_MAP: Record<Difficulty, number> = {
  easy: 1,
  medium: 3,
  hard: 4
};

export default function Home() {
  const [game, setGame] = useState(new ChessGame());
  const [gameMode, setGameMode] = useState<GameMode>('pve'); 
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [pieceSet, setPieceSet] = useState<PieceSetStyle>('vanguard');
  const [hintMove, setHintMove] = useState<Move | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [isMuted, setIsMuted] = useState(false);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [scores, setScores] = useState<Score>({ white: 0, black: 0, draws: 0 });
  const [gameCounted, setGameCounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [viewIndex, setViewIndex] = useState<number>(-1); 
  const { toast } = useToast();

  const t = translations[lang];

  useEffect(() => {
    const savedScores = localStorage.getItem(SCORE_STORAGE_KEY);
    if (savedScores) {
      try {
        setScores(JSON.parse(savedScores));
      } catch (e) {
        console.error('Failed to load scores', e);
      }
    }

    const savedDifficulty = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
    if (savedDifficulty) {
      setDifficulty(savedDifficulty as Difficulty);
    }

    const savedPieceSet = localStorage.getItem(PIECE_SET_STORAGE_KEY);
    if (savedPieceSet) {
      setPieceSet(savedPieceSet as PieceSetStyle);
    }

    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      try {
        const moves = JSON.parse(savedHistory) as Move[];
        if (moves.length > 0) {
          const newGame = ChessGame.fromHistory(moves);
          setGame(newGame);
        }
      } catch (e) {
        console.error('Failed to load history', e);
      }
    }

    const setupYandex = async () => {
      const sdk = await initYandexSDK();
      if (sdk) {
        const sdkLang = sdk.environment.i18n.lang.split('-')[0];
        if (sdkLang === 'ru') {
          setLang('ru');
        } else {
          setLang('en');
        }
        
        showFullscreenAd({
          onOpen: () => setIsAdPlaying(true),
          onClose: () => setIsAdPlaying(false)
        });
      }
    };
    setupYandex();

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
  }, [scores, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty);
  }, [difficulty, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(PIECE_SET_STORAGE_KEY, pieceSet);
  }, [pieceSet, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    if (game.history.length > 0) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(game.history));
    } else {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, [game.history, isInitialized]);

  useEffect(() => {
    if (game.isGameOver && !gameCounted) {
      const status = game.status.toLowerCase();
      let nextScores = { ...scores };
      
      if (status.includes('white wins')) {
        nextScores.white += 1;
      } else if (status.includes('black wins')) {
        nextScores.black += 1;
      } else if (status.includes('draw') || status.includes('stalemate') || status.includes('insufficient material')) {
        nextScores.draws += 1;
      }
      
      setScores(nextScores);
      setGameCounted(true);
      
      const adTimeout = setTimeout(() => {
        showFullscreenAd({
          onOpen: () => setIsAdPlaying(true),
          onClose: () => setIsAdPlaying(false)
        });
      }, 3000);
      return () => clearTimeout(adTimeout);
    }
  }, [game.isGameOver, game.status, gameCounted, scores]);

  const displayedGame = useMemo(() => {
    if (viewIndex === -1 || viewIndex >= game.history.length) {
      return game;
    }
    return ChessGame.fromHistory(game.history, viewIndex);
  }, [game, viewIndex]);

  const isReviewMode = viewIndex !== -1 && viewIndex < game.history.length - 1;

  const getLocalizedStatus = useCallback((status: string) => {
    if (status.includes('Checkmate')) {
      return status.includes('White') ? t.status_checkmate_white : t.status_checkmate_black;
    }
    if (status.includes('Insufficient material')) return t.status_draw_material;
    if (status.includes('Draw')) return t.status_draw;
    
    const isCheck = status.includes('(Check!)');
    const base = status.includes('White') ? t.status_white_turn : t.status_black_turn;
    return `${base}${isCheck ? ` ${t.status_check}` : ''}`;
  }, [t]);

  const resetGame = useCallback(() => {
    if (isAdPlaying) return;
    
    showFullscreenAd({
      onOpen: () => setIsAdPlaying(true),
      onClose: () => setIsAdPlaying(false)
    });
    
    setGame(new ChessGame());
    setHintMove(null);
    setExplanation(null);
    setGameCounted(false);
    setViewIndex(-1);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    toast({
      title: t.toast_reset_title,
      description: t.toast_reset_desc,
    });
  }, [toast, t, isAdPlaying]);

  const resetScores = useCallback(() => {
    const defaultScore = { white: 0, black: 0, draws: 0 };
    setScores(defaultScore);
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(defaultScore));
    toast({
      title: t.score_reset,
      description: t.toast_score_reset,
    });
  }, [toast, t]);

  const handleMove = useCallback((move: Move) => {
    if (isReviewMode || isAdPlaying) return;

    const isCapture = !!game.board[move.to.row][move.to.col];
    const nextGame = game.clone();
    const success = nextGame.makeMove(move);
    if (success) {
      if (!isMuted && !isAdPlaying) {
        if (nextGame.isGameOver) {
          soundManager.playGameOver();
        } else if (nextGame.isInCheck(nextGame.turn)) {
          soundManager.playCheck();
        } else if (isCapture) {
          soundManager.playCapture();
        } else {
          soundManager.playMove();
        }
      }
      setGame(nextGame);
      setHintMove(null);
      setExplanation(null);
    }
  }, [game, isMuted, isReviewMode, isAdPlaying]);

  useEffect(() => {
    if (gameMode === 'pve' && game.turn === 'black' && !game.isGameOver && !isSuggesting && !isReviewMode && !isAdPlaying) {
      const triggerAiOpponent = async () => {
        setIsSuggesting(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        try {
          const boardStr = game.exportToString();
          const legalMoves = game.getLegalMoves(game.turn).map(ChessGame.toAlgebraic);
          const suggestion = await aiMoveSuggestion({
            boardState: boardStr,
            currentPlayer: 'black',
            legalMoves: legalMoves,
            depth: DIFFICULTY_MAP[difficulty]
          });

          if (suggestion.suggestedMove) {
            const move = ChessGame.fromAlgebraic(suggestion.suggestedMove);
            handleMove(move);
            setExplanation(suggestion.explanation);
          }
        } catch (error) {
          console.error('AI Opponent Error:', error);
          toast({
            variant: 'destructive',
            title: t.toast_ai_fail_title,
            description: t.toast_ai_fail_desc
          });
        } finally {
          setIsSuggesting(false);
        }
      };

      triggerAiOpponent();
    }
  }, [game.turn, gameMode, game.isGameOver, handleMove, toast, game, t, isSuggesting, isReviewMode, difficulty, isAdPlaying]);

  const getAiHint = async () => {
    if (game.isGameOver || isSuggesting || isReviewMode || isAdPlaying) return;

    setIsSuggesting(true);
    setExplanation(null);

    const boardStr = game.exportToString();
    const legalMoves = game.getLegalMoves(game.turn).map(ChessGame.toAlgebraic);

    try {
      const suggestion = await aiMoveSuggestion({
        boardState: boardStr,
        currentPlayer: game.turn,
        legalMoves: legalMoves,
        depth: DIFFICULTY_MAP[difficulty]
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
        title: t.toast_hint_fail_title,
        description: t.toast_hint_fail_desc
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const copyHistory = () => {
    const historyText = game.history
      .map((move, i) => `${i % 2 === 0 ? Math.floor(i / 2) + 1 + '.' : ''} ${ChessGame.toAlgebraic(move)}`)
      .join(' ');
    
    navigator.clipboard.writeText(historyText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
    toast({
      title: "History Copied",
      description: "Tactical logs have been copied to clipboard.",
    });
  };

  const setLive = () => setViewIndex(-1);
  const setStep = (idx: number) => setViewIndex(idx);

  // Common UI components reused between mobile/desktop layouts
  const HistoryPanel = (
    <div className="flex flex-col h-full overflow-hidden">
      {game.history.length > 0 && (
        <div className="grid grid-cols-5 gap-1 pb-3 border-b border-border/40 mb-3">
          <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => setStep(0)} disabled={viewIndex === 0}>
            <ChevronFirst className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => setStep(Math.max(0, (viewIndex === -1 ? game.history.length - 1 : viewIndex) - 1))} disabled={viewIndex === 0}>
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <Button variant={isReviewMode ? "default" : "outline"} size="icon" className={cn("h-7 w-full", !isReviewMode && "opacity-40")} onClick={setLive}>
            <PlayCircle className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => setStep(Math.min(game.history.length - 1, (viewIndex === -1 ? game.history.length - 1 : viewIndex) + 1))} disabled={viewIndex === -1 || viewIndex === game.history.length - 1}>
            <ChevronRight className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => setStep(game.history.length - 1)} disabled={viewIndex === game.history.length - 1}>
            <ChevronLast className="w-3 h-3" />
          </Button>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {game.history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <History className="w-8 h-8 text-muted-foreground opacity-20 mb-2" />
              <p className="text-muted-foreground text-[10px] italic font-medium uppercase tracking-widest">{t.history_empty_title}</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {Array.from({ length: Math.ceil(game.history.length / 2) }).map((_, i) => (
                <div key={i} className="grid grid-cols-2 gap-1.5">
                  <div onClick={() => setStep(i * 2)} className={cn("flex justify-between items-center px-2 py-1.5 rounded border text-[10px] font-mono cursor-pointer transition-all", viewIndex === i * 2 ? "bg-primary/20 border-primary" : "bg-secondary/20 border-border/40 hover:bg-secondary/40")}>
                    <span className="text-muted-foreground/60 font-bold">{i + 1}W</span>
                    <span className="font-bold">{ChessGame.toAlgebraic(game.history[i * 2])}</span>
                  </div>
                  {game.history[i * 2 + 1] && (
                    <div onClick={() => setStep(i * 2 + 1)} className={cn("flex justify-between items-center px-2 py-1.5 rounded border text-[10px] font-mono cursor-pointer transition-all", viewIndex === i * 2 + 1 ? "bg-accent/20 border-accent" : "bg-accent/5 border-accent/20 hover:bg-accent/10")}>
                      <span className="text-accent/60 font-bold">{i + 1}B</span>
                      <span className="text-accent font-bold">{ChessGame.toAlgebraic(game.history[i * 2 + 1])}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      {isReviewMode && (
        <Button size="sm" variant="secondary" className="w-full font-bold h-8 mt-2 text-[10px]" onClick={setLive}>
           <PlayCircle className="w-3 h-3 mr-1" /> {t.history_playback_back}
        </Button>
      )}
    </div>
  );

  const EnginePanel = (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3 text-accent" /> {t.engine_difficulty_label}
          </label>
        </div>
        <Tabs value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)} className="w-full">
          <TabsList className="grid grid-cols-3 bg-secondary/40 p-0.5 h-8 border border-white/5">
            <TabsTrigger value="easy" className="text-[9px] font-bold uppercase py-1">{t.diff_easy}</TabsTrigger>
            <TabsTrigger value="medium" className="text-[9px] font-bold uppercase py-1">{t.diff_medium}</TabsTrigger>
            <TabsTrigger value="hard" className="text-[9px] font-bold uppercase py-1">{t.diff_hard}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 min-h-0 bg-secondary/10 rounded-xl p-4 border border-white/5 relative overflow-hidden flex flex-col">
        {isReviewMode ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <History className="w-10 h-10 text-muted-foreground/30" />
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">{t.history_playback_back}</p>
          </div>
        ) : (
          <>
            {!explanation && !isSuggesting && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <Lightbulb className="w-8 h-8 text-accent/40" />
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t.engine_awaiting}</p>
                <Button variant="outline" size="sm" onClick={getAiHint} className="h-7 text-[9px] border-accent/30">{t.engine_initiate}</Button>
              </div>
            )}
            {isSuggesting && (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                <p className="text-[9px] font-black text-accent uppercase tracking-widest animate-pulse">{t.engine_calculating}</p>
              </div>
            )}
            {explanation && !isSuggesting && (
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  <Badge className="bg-accent/20 text-accent font-black tracking-widest px-3 py-0.5 text-[8px] border border-accent/30">{t.engine_eval}</Badge>
                  <p className="text-[10px] text-foreground/90 leading-relaxed font-medium italic border-l border-accent/30 pl-3">"{explanation}"</p>
                </div>
              </ScrollArea>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn(
      "h-svh flex flex-col transition-opacity duration-300 bg-background overflow-hidden",
      isAdPlaying ? "opacity-20 pointer-events-none" : "opacity-100"
    )}>
      <Onboarding lang={lang} />
      
      {/* Optimized Compact Header */}
      <header className="px-4 py-2 flex items-center justify-between shrink-0 border-b border-white/5 bg-secondary/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20 ring-1 ring-white/10">
            <svg viewBox="0 0 45 45" className="w-5 h-5 fill-white">
              <path d="M22.5 11.63V6M20 8h5M22.5 25s4.5-7.5 3-10c-1.5-2.5-6-2.5-6 0-1.5 2.5 3 10 3 10" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm md:text-xl font-black tracking-tighter text-white uppercase leading-none">{t.title}</h1>
            <p className="hidden xs:block text-[8px] font-black text-accent/60 uppercase tracking-widest">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tally - Super Compact on mobile */}
          <div className="flex items-center gap-1.5 bg-secondary/40 border border-white/5 p-1 rounded-lg">
            <div className="px-1.5 flex flex-col items-center">
              <span className="text-[7px] font-black text-white/40 leading-none">W</span>
              <span className="text-[10px] font-black text-white">{scores.white}</span>
            </div>
            <div className="px-1.5 flex flex-col items-center border-l border-white/5">
              <span className="text-[7px] font-black text-accent/40 leading-none">B</span>
              <span className="text-[10px] font-black text-accent">{scores.black}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <RulesHelp lang={lang} />
            <SettingsDialog 
              lang={lang} 
              setLang={setLang} 
              isMuted={isMuted} 
              setIsMuted={setIsMuted} 
              pieceSet={pieceSet}
              setPieceSet={setPieceSet}
            />
            <Button variant="secondary" size="icon" onClick={resetGame} className="h-8 w-8 bg-secondary/50">
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:p-6 overflow-hidden">
        
        {/* Left Side (Desktop Only) */}
        <div className="hidden lg:col-span-3 lg:flex flex-col gap-6 overflow-hidden">
          <Card className="flex-1 bg-card border-border shadow-2xl overflow-hidden flex flex-col">
            <CardHeader className="py-3 px-4 bg-secondary/20 flex flex-row items-center justify-between border-b border-border/50">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <History className="w-3 h-3" /> {t.history_title}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={copyHistory} className="h-6 w-6">
                {hasCopied ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-4">
              {HistoryPanel}
            </CardContent>
          </Card>
        </div>

        {/* Center: Board and Status */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 lg:p-0 min-h-0">
          
          {/* Active Turn Header */}
          <div className="w-full max-w-[550px] mb-2 flex justify-between items-center px-4 py-2 bg-secondary/10 rounded-xl border border-white/5 backdrop-blur-sm shrink-0">
            <div className={cn(
              "flex items-center gap-2 transition-all duration-300",
              displayedGame.turn === 'white' ? "opacity-100" : "opacity-20 grayscale"
            )}>
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_5px_white]" />
              <span className="text-[10px] font-black tracking-tight">{t.player_white_command}</span>
            </div>
            
            <div className="flex-1 mx-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className={cn(
              "flex items-center gap-2 transition-all duration-300",
              displayedGame.turn === 'black' ? "opacity-100" : "opacity-20 grayscale"
            )}>
              <span className="text-[10px] font-black tracking-tight text-accent">{t.player_black_command}</span>
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_5px_hsl(var(--accent))]" />
            </div>
          </div>

          {/* Board Container - Dynamic sizing */}
          <div className="relative flex-1 w-full max-w-[550px] flex items-center justify-center min-h-0">
            <Board game={displayedGame} onMove={handleMove} hintMove={hintMove} pieceSet={pieceSet} />
            {(isReviewMode || isAdPlaying) && (
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none z-10 rounded-2xl flex items-center justify-center">
                <div className="bg-primary/90 text-white px-4 py-1.5 rounded-full shadow-2xl font-black text-[9px] uppercase tracking-widest border border-white/20">
                  {isAdPlaying ? "TRANSMISSION ACTIVE" : "REVIEW MODE"}
                </div>
              </div>
            )}
          </div>

          {/* Game Status - Compact on mobile */}
          <div className="w-full max-w-[550px] mt-2 shrink-0">
            <div className={cn(
              "px-4 py-3 rounded-xl border transition-all duration-500",
              displayedGame.isGameOver 
                ? "bg-primary/20 border-primary/50 shadow-xl" 
                : "bg-secondary/40 border-white/5"
            )}>
              {displayedGame.isGameOver ? (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-primary animate-bounce" />
                    <h2 className="text-xs font-black text-white uppercase italic">{getLocalizedStatus(displayedGame.status)}</h2>
                  </div>
                  {!isReviewMode && (
                    <Button size="sm" onClick={resetGame} className="h-7 bg-primary text-white font-black px-4 text-[9px]">{t.replay}</Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full bg-primary", !isReviewMode && "animate-ping")} />
                    <span className="text-[11px] font-bold text-foreground/90 italic tracking-tight uppercase">
                      {isSuggesting && gameMode === 'pve' && displayedGame.turn === 'black' && !isReviewMode
                        ? t.engine_calculating
                        : getLocalizedStatus(displayedGame.status)
                      }
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={getAiHint} 
                    disabled={game.isGameOver || isSuggesting || isReviewMode || isAdPlaying}
                    className="h-7 w-7 p-0"
                  >
                    <Lightbulb className={cn("w-4 h-4", isSuggesting ? "animate-spin text-accent" : "text-muted-foreground")} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side (Desktop Only) */}
        <div className="hidden lg:col-span-3 lg:flex flex-col gap-6 overflow-hidden">
          <Card className="flex-1 bg-card border-border shadow-2xl overflow-hidden flex flex-col">
            <CardHeader className="py-3 px-4 bg-secondary/20 border-b border-border/50">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-accent">
                <Cpu className="w-3 h-3" /> {t.engine_title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-4">
              {EnginePanel}
            </CardContent>
          </Card>
        </div>

        {/* Mobile Tabs (Bottom Area) */}
        <div className="lg:hidden shrink-0 h-[200px] px-2 pb-2">
          <Tabs defaultValue="history" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-2 bg-secondary/30 h-8 p-0.5 rounded-lg border border-white/5">
              <TabsTrigger value="history" className="text-[9px] font-black uppercase gap-2">
                <History className="w-3 h-3" /> {t.history_title}
              </TabsTrigger>
              <TabsTrigger value="engine" className="text-[9px] font-black uppercase gap-2">
                <Cpu className="w-3 h-3" /> {t.engine_title}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="flex-1 mt-1 overflow-hidden bg-card/50 rounded-lg p-2 border border-white/5">
              {HistoryPanel}
            </TabsContent>
            <TabsContent value="engine" className="flex-1 mt-1 overflow-hidden bg-card/50 rounded-lg p-2 border border-white/5">
              {EnginePanel}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
