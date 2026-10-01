"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ChessGame, Move, PieceType, PlayerColor } from '@/lib/chess-logic';
import Board from '@/components/chess/Board';
import Piece, { PiecePartStyle } from '@/components/chess/Piece';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  RotateCcw, Lightbulb, Trophy, History, Cpu, Users, ChevronRight, 
  Check, Copy, ChevronLeft, ChevronLast, ChevronFirst,
  PlayCircle, Zap, X, Target, Swords, Activity, Star, PartyPopper, Info, BarChart3
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
import { initYandexSDK, showFullscreenAd, gameReady, setYandexLeaderboardScore } from '@/lib/yandex-sdk';

type GameMode = 'pvp' | 'pve';
type Difficulty = 'recruit' | 'cadet' | 'specialist' | 'commander' | 'grandmaster';
type Score = { white: number; black: number; draws: number; tacticalPoints: number };
type ThemeMode = 'light' | 'dark' | 'brown';

const SCORE_STORAGE_KEY = 'tactical_six_scores';
const HISTORY_STORAGE_KEY = 'tactical_six_history';
const DIFFICULTY_STORAGE_KEY = 'tactical_six_difficulty';
const HEAD_SKIN_STORAGE_KEY = 'tactical_six_head_skin';
const BODY_SKIN_STORAGE_KEY = 'tactical_six_body_skin';
const BASE_SKIN_STORAGE_KEY = 'tactical_six_base_skin';
const GAME_MODE_STORAGE_KEY = 'tactical_six_game_mode';
const THEME_STORAGE_KEY = 'tactical_six_theme';

const DIFFICULTY_MAP: Record<Difficulty, number> = {
  recruit: 1,
  cadet: 2,
  specialist: 3,
  commander: 4,
  grandmaster: 5
};

const WIN_POINTS = 100;
const DRAW_POINTS = 20;

export default function Home() {
  const [game, setGame] = useState(new ChessGame());
  const [gameMode, setGameMode] = useState<GameMode>('pve'); 
  const [difficulty, setDifficulty] = useState<Difficulty>('specialist');
  const [headSkin, setHeadSkin] = useState<PiecePartStyle>('geometric');
  const [bodySkin, setBodySkin] = useState<PiecePartStyle>('geometric');
  const [baseSkin, setBaseSkin] = useState<PiecePartStyle>('geometric');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [hintMove, setHintMove] = useState<Move | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [isMuted, setIsMuted] = useState(false);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [scores, setScores] = useState<Score>({ white: 0, black: 0, draws: 0, tacticalPoints: 0 });
  const [gameCounted, setGameCounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [viewIndex, setViewIndex] = useState<number>(-1); 
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isInspectMode, setIsInspectMode] = useState(false);
  const [selectedPieceInfo, setSelectedPieceInfo] = useState<{ type: PieceType; color: PlayerColor } | null>(null);
  const [delayedGameOver, setDelayedGameOver] = useState(false);
  const { toast } = useToast();

  const t = translations[lang];

  useEffect(() => {
    const initializeApp = async () => {
      const savedScores = localStorage.getItem(SCORE_STORAGE_KEY);
      if (savedScores) {
        try {
          const parsed = JSON.parse(savedScores);
          setScores({
            white: parsed.white || 0,
            black: parsed.black || 0,
            draws: parsed.draws || 0,
            tacticalPoints: parsed.tacticalPoints || 0
          });
        } catch (e) {
          console.error('Failed to load scores', e);
        }
      }

      const savedDifficulty = localStorage.getItem(DIFFICULTY_STORAGE_KEY) as Difficulty;
      if (savedDifficulty && DIFFICULTY_MAP[savedDifficulty]) {
        setDifficulty(savedDifficulty);
      }

      const savedHead = localStorage.getItem(HEAD_SKIN_STORAGE_KEY);
      if (savedHead) setHeadSkin(savedHead as PiecePartStyle);
      const savedBody = localStorage.getItem(BODY_SKIN_STORAGE_KEY);
      if (savedBody) setBodySkin(savedBody as PiecePartStyle);
      const savedBase = localStorage.getItem(BASE_SKIN_STORAGE_KEY);
      if (savedBase) setBaseSkin(savedBase as PiecePartStyle);

      const savedMode = localStorage.getItem(GAME_MODE_STORAGE_KEY);
      if (savedMode) setGameMode(savedMode as GameMode);

      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      if (savedTheme) setTheme(savedTheme);

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
      } else {
        setIsBriefingOpen(true);
      }

      try {
        const sdk = await initYandexSDK();
        if (sdk) {
          const sdkLang = sdk.environment.i18n.lang.split('-')[0];
          setLang(sdkLang === 'ru' ? 'ru' : 'en');
          
          showFullscreenAd({
            onOpen: () => setIsAdPlaying(true),
            onClose: () => setIsAdPlaying(false)
          });
        }
      } catch (sdkError) {
        console.warn('Yandex SDK initialization skipped or failed:', sdkError);
      }

      setIsInitialized(true);
      gameReady();
    };

    initializeApp();
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
    localStorage.setItem(HEAD_SKIN_STORAGE_KEY, headSkin);
    localStorage.setItem(BODY_SKIN_STORAGE_KEY, bodySkin);
    localStorage.setItem(BASE_SKIN_STORAGE_KEY, baseSkin);
  }, [headSkin, bodySkin, baseSkin, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(GAME_MODE_STORAGE_KEY, gameMode);
  }, [gameMode, isInitialized]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'brown');
    if (theme !== 'light') {
      html.classList.add(theme);
    }
    
    if (isInitialized) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    if (game.history.length > 0) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(game.history));
    } else {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  }, [game.history, isInitialized]);

  useEffect(() => {
    if (game.isGameOver) {
      const timer = setTimeout(() => {
        setDelayedGameOver(true);
      }, 1000); // 1 second tactical delay for the UI transition
      return () => clearTimeout(timer);
    } else {
      setDelayedGameOver(false);
    }
  }, [game.isGameOver]);

  useEffect(() => {
    if (game.isGameOver && !gameCounted) {
      const status = game.status.toLowerCase();
      let nextScores = { ...scores };
      
      if (status.includes('white wins')) {
        nextScores.white += 1;
        nextScores.tacticalPoints += WIN_POINTS;
      } else if (status.includes('black wins')) {
        nextScores.black += 1;
      } else if (status.includes('draw') || status.includes('stalemate') || status.includes('insufficient material')) {
        nextScores.draws += 1;
        nextScores.tacticalPoints += DRAW_POINTS;
      }
      
      setScores(nextScores);
      setGameCounted(true);

      setYandexLeaderboardScore('TACTICALLEADERBOARD', nextScores.tacticalPoints);
      
      const adTimeout = setTimeout(() => {
        showFullscreenAd({
          onOpen: () => setIsAdPlaying(true),
          onClose: () => setIsAdPlaying(false)
        });
      }, 3000);
      return () => clearTimeout(adTimeout);
    }
  }, [game.isGameOver, game.status, gameCounted, scores, difficulty]);

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

  const getPieceName = useCallback((type: PieceType) => {
    switch (type) {
      case 'p': return t.rules_pawn_title;
      case 'r': return t.rules_rook_title;
      case 'n': return t.rules_knight_title;
      case 'b': return t.rules_bishop_title;
      case 'q': return t.rules_queen_title;
      case 'k': return t.rules_king_title;
      default: return '';
    }
  }, [t]);

  const handlePieceSelect = useCallback((type: PieceType, color: PlayerColor) => {
    setSelectedPieceInfo({ type, color });
  }, []);

  const startNewMission = () => {
    setIsBriefingOpen(false);
    
    showFullscreenAd({
      onOpen: () => setIsAdPlaying(true),
      onClose: () => setIsAdPlaying(false)
    });
    
    setGame(new ChessGame());
    setHintMove(null);
    setExplanation(null);
    setGameCounted(false);
    setViewIndex(-1);
    setSelectedPieceInfo(null);
    setIsInspectMode(false);
    setDelayedGameOver(false);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    toast({
      title: t.toast_reset_title,
      description: t.toast_reset_desc,
    });
  };

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
    if (gameMode === 'pve' && game.turn === 'black' && !game.isGameOver && !isSuggesting && !isReviewMode && !isAdPlaying && !isBriefingOpen) {
      const triggerAiOpponent = async () => {
        setIsSuggesting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
          const boardStr = game.exportToString();
          const legalMoves = game.getLegalMoves(game.turn).map(ChessGame.toAlgebraic);
          const suggestion = await aiMoveSuggestion({
            boardState: boardStr,
            currentPlayer: 'black',
            legalMoves: legalMoves,
            depth: DIFFICULTY_MAP[difficulty],
            lang: lang
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
  }, [game.turn, gameMode, game.isGameOver, handleMove, toast, game, t, isSuggesting, isReviewMode, difficulty, isAdPlaying, isBriefingOpen, lang]);

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
        depth: DIFFICULTY_MAP[difficulty],
        lang: lang
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

  const EnginePanel = (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 min-h-0 bg-secondary/10 rounded-xl p-2 sm:p-4 border border-white/5 relative overflow-hidden flex flex-col">
        {isReviewMode ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
            <History className="w-6 h-6 sm:w-10 sm:h-10 text-muted-foreground/30" />
            <p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">{t.history_playback_back}</p>
          </div>
        ) : (
          <>
            {!explanation && !isSuggesting && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <Button variant="outline" size="sm" onClick={getAiHint} className="h-7 px-3 text-[9px] sm:text-[10px] border-accent/30 bg-accent/5 hover:bg-accent/10">
                  <Zap className="w-3.5 h-3.5 mr-1 text-accent animate-pulse" />
                  <span>{t.engine_initiate}</span>
                </Button>
                <span className="text-[7px] sm:text-[8px] text-muted-foreground/50 uppercase tracking-[0.15em] mt-1">{(t as any)[`diff_${difficulty}`]} Depth Matrix Active</span>
              </div>
            )}
            {isSuggesting && (
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <div className="w-6 h-6 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                <p className="text-[8px] font-black text-accent uppercase tracking-widest animate-pulse">{t.engine_calculating}</p>
              </div>
            )}
            {explanation && !isSuggesting && (
              <ScrollArea className="h-full">
                <div className="space-y-2 sm:space-y-4">
                  <Badge className="bg-accent/20 text-accent font-black tracking-widest px-2 py-0.5 text-[7px] sm:text-[8px] border border-accent/30">{t.engine_eval}</Badge>
                  <p className="text-[9px] sm:text-[10px] text-foreground/90 leading-tight sm:leading-relaxed font-medium italic border-l border-accent/30 pl-2 sm:pl-3 whitespace-pre-line">
                    {explanation}
                  </p>
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
      
      <Dialog open={isBriefingOpen} onOpenChange={setIsBriefingOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[550px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-0 overflow-hidden ring-1 ring-white/10 max-h-[90vh] flex flex-col">
          <DialogHeader className="h-20 sm:h-28 w-full shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 flex flex-row items-center px-6 sm:px-8 text-left space-y-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
                  {t.briefing_title}
                </DialogTitle>
                <DialogDescription className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-80">
                  {t.briefing_subtitle}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
               <div className="space-y-3 sm:space-y-4">
                <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Swords className="w-3.5 h-3.5" /> {t.briefing_mode_label}
                </Label>
                <Tabs value={gameMode} onValueChange={(v) => setGameMode(v as GameMode)} className="w-full bg-secondary/40 border border-white/5 p-1 rounded-xl">
                  <TabsList className="grid grid-cols-2 bg-transparent gap-1 h-9 sm:h-10">
                    <TabsTrigger value="pve" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-2 uppercase text-[9px] sm:text-[10px]">
                      <Cpu className="w-3.5 h-3.5 mr-2" /> {t.mode_ai}
                    </TabsTrigger>
                    <TabsTrigger value="pvp" className="data-[state=active]:bg-foreground data-[state=active]:text-background font-bold rounded-lg px-2 uppercase text-[9px] sm:text-[10px]">
                      <Users className="w-3.5 h-3.5 mr-2" /> {t.mode_2p}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <Label className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> {t.briefing_difficulty_label}
                </Label>
                <Tabs value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)} className="w-full bg-secondary/40 border border-white/5 p-1 rounded-xl">
                  <TabsList className="grid grid-cols-5 bg-transparent gap-1 h-9 sm:h-10">
                    <TabsTrigger value="recruit" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-0.5 text-[7px] sm:text-[8px] uppercase">
                      {t.diff_recruit}
                    </TabsTrigger>
                    <TabsTrigger value="cadet" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-0.5 text-[7px] sm:text-[8px] uppercase">
                      {t.diff_cadet}
                    </TabsTrigger>
                    <TabsTrigger value="specialist" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-0.5 text-[7px] sm:text-[8px] uppercase">
                      {t.diff_specialist}
                    </TabsTrigger>
                    <TabsTrigger value="commander" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-0.5 text-[7px] sm:text-[8px] uppercase">
                      {t.diff_commander}
                    </TabsTrigger>
                    <TabsTrigger value="grandmaster" className="data-[state=active]:bg-primary data-[state=active]:text-white font-bold rounded-lg px-0.5 text-[7px] sm:text-[8px] uppercase">
                      {t.diff_grandmaster}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Button onClick={startNewMission} className="w-full h-10 sm:h-12 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 text-[10px] sm:text-xs">
                {t.briefing_engage}
                <ChevronRight className="w-4 h-4 sm:w-5 h-5 ml-2" />
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedPieceInfo} onOpenChange={(open) => { if(!open) setSelectedPieceInfo(null); }}>
        <DialogContent className="w-[85vw] max-w-[340px] bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl p-6 rounded-2xl flex flex-col items-center text-center gap-4">
          {selectedPieceInfo && (
            <>
              <div className="w-28 h-28 bg-secondary/40 rounded-2xl p-4 border border-white/10 flex items-center justify-center shadow-inner animate-in zoom-in-95 duration-300">
                <Piece 
                  type={selectedPieceInfo.type} 
                  color={selectedPieceInfo.color} 
                  headStyle={headSkin} 
                  bodyStyle={bodySkin} 
                  baseStyle={baseSkin} 
                />
              </div>
              <DialogHeader className="space-y-1 items-center">
                <Badge variant="outline" className={cn(
                  "text-[8px] font-black tracking-widest uppercase px-2.5 py-0.5 border-white/10 mb-1",
                  selectedPieceInfo.color === 'white' ? "bg-foreground text-background" : "bg-accent/20 text-accent"
                )}>
                  {selectedPieceInfo.color === 'white' ? t.score_white : t.score_black}
                </Badge>
                <DialogTitle className="text-lg font-black tracking-tight text-foreground uppercase">
                  {getPieceName(selectedPieceInfo.type)}
                </DialogTitle>
                <DialogDescription className="text-[11px] text-muted-foreground font-medium px-2 leading-normal">
                  {selectedPieceInfo.type === 'p' && t.rules_pawn_desc}
                  {selectedPieceInfo.type === 'r' && t.rules_rook_desc}
                  {selectedPieceInfo.type === 'n' && t.rules_knight_desc}
                  {selectedPieceInfo.type === 'b' && t.rules_bishop_desc}
                  {selectedPieceInfo.type === 'q' && t.rules_queen_desc}
                  {selectedPieceInfo.type === 'k' && t.rules_king_desc}
                </DialogDescription>
              </DialogHeader>
              <Button size="sm" className="w-full h-9 bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase rounded-xl tracking-wider" onClick={() => setSelectedPieceInfo(null)}>
                Dismiss
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <header className="px-4 py-1.5 sm:py-3 flex items-center justify-between shrink-0 border-b border-white/5 bg-secondary/10 backdrop-blur-xl z-40">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-xl shadow-2xl shadow-primary/30 ring-1 ring-white/20 sm:p-2 transition-transform hover:scale-105 duration-300">
            <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-6 sm:h-6 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <circle cx="12" cy="11" r="3" className="fill-white/20" />
              <path d="M12 8v6" />
              <path d="M10 11h4" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-secondary/40 border border-white/5 p-0.5 sm:p-1 rounded-lg">
          <div className="px-1 flex flex-col items-center">
            <span className="text-[6px] sm:text-[7px] font-black text-muted-foreground leading-none uppercase">W</span>
            <span className="text-[9px] sm:text-[10px] font-black text-foreground">{scores.white}</span>
          </div>
          <div className="px-1 flex flex-col items-center border-l border-white/5">
            <span className="text-[6px] sm:text-[7px] font-black text-accent/40 leading-none uppercase">B</span>
            <span className="text-[9px] sm:text-[10px] font-black text-accent">{scores.black}</span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button variant="outline" size="sm" onClick={() => setIsLogOpen(true)} className="border-primary/20 bg-primary/5 hover:bg-primary/10 font-bold text-primary h-8 px-1.5 sm:px-3 text-[10px]">
            <History className="w-3.5 h-3.5 sm:mr-2" />
            <span className="hidden sm:inline">{t.history_btn}</span>
          </Button>
          <RulesHelp lang={lang} />
          <SettingsDialog 
            lang={lang} 
            setLang={setLang} 
            isMuted={isMuted} 
            setIsMuted={setIsMuted} 
            headSkin={headSkin}
            setHeadSkin={setHeadSkin}
            bodySkin={bodySkin}
            setBodySkin={setBodySkin}
            baseSkin={baseSkin}
            setBaseSkin={setBaseSkin}
            theme={theme}
            setTheme={setTheme}
          />
          <Button variant="secondary" size="icon" onClick={() => setIsBriefingOpen(true)} className="h-8 w-8 bg-secondary/50">
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col landscape:flex-row lg:grid lg:grid-cols-12 lg:gap-8 lg:p-4 overflow-hidden">
        
        <div className="hidden lg:col-span-3 lg:flex flex-col gap-6 overflow-hidden">
           <Card className="flex-1 bg-card border-border shadow-2xl overflow-hidden flex flex-col">
            <CardHeader className="py-3 px-4 bg-secondary/20 border-b border-border/50">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-primary">
                <Users className="w-3.5 h-3.5" /> {t.player_white_command}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-secondary/20 border border-border flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 rounded-full bg-foreground shadow-[0_0_20px_rgba(var(--foreground),0.2)]" />
              </div>
              <div>
                <h3 className="text-xs font-black text-foreground uppercase tracking-widest">{t.player_white_label}</h3>
                <p className="text-[10px] text-muted-foreground font-medium">Strategic Command</p>
              </div>
              <div className="w-full pt-4 border-t border-border/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px] font-black text-muted-foreground uppercase">Win Rate</span>
                  <span className="text-[9px] font-black text-primary">
                    {scores.white + scores.black > 0 
                      ? Math.round((scores.white / (scores.white + scores.black + scores.draws)) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${scores.white + scores.black > 0 ? (scores.white / (scores.white + scores.black + scores.draws)) * 100 : 0}%` }} 
                  />
                </div>
              </div>
              <div className="w-full bg-accent/10 border border-accent/20 p-2 rounded-lg flex justify-between items-center">
                 <span className="text-[8px] font-black text-accent uppercase">{t.score_tactical}</span>
                 <span className="text-xs font-black text-accent">{scores.tacticalPoints}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shrink-0 bg-card border-border shadow-md p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-accent animate-pulse" />
              <div>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Link integrity</p>
                <p className="text-[10px] font-bold text-foreground">ENCRYPTED_SYNC_STABLE</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-2 lg:col-span-6 lg:p-0 min-h-0 landscape:flex-[2] landscape:p-2 landscape:justify-center">
          <div className="relative flex-1 w-full max-w-[550px] flex items-center justify-center min-h-0 landscape:max-h-[calc(100svh-120px)]">
            <Board 
              game={displayedGame} 
              onMove={handleMove} 
              hintMove={hintMove} 
              headSkin={headSkin} 
              bodySkin={bodySkin} 
              baseSkin={baseSkin} 
              onPieceSelect={handlePieceSelect}
              inspectMode={isInspectMode}
              showVictory={delayedGameOver}
            />
            {(isReviewMode || isAdPlaying || isBriefingOpen) && (
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none z-10 rounded-2xl flex items-center justify-center">
                <div className="bg-primary/90 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-2xl font-black text-[8px] sm:text-[9px] uppercase tracking-widest border border-white/20">
                  {isAdPlaying ? "TRANSMISSION ACTIVE" : isBriefingOpen ? "BRIEFING IN PROGRESS" : "REVIEW MODE"}
                </div>
              </div>
            )}
          </div>

          <div className="w-full max-w-[550px] mt-1 shrink-0 landscape:mt-0.5">
            <div className={cn(
              "px-3 py-1.5 sm:px-4 sm:py-3 rounded-xl border transition-all duration-500",
              delayedGameOver 
                ? "bg-primary/30 border-primary shadow-[0_0_40px_rgba(255,191,0,0.3)] animate-in zoom-in duration-700" 
                : "bg-secondary/40 border-white/5"
            )}>
              {delayedGameOver ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    {displayedGame.status.toLowerCase().includes('checkmate') ? (
                       <PartyPopper className="w-5 h-5 text-primary animate-bounce" />
                    ) : (
                       <Trophy className="w-4 h-4 text-primary animate-bounce" />
                    )}
                    <h2 className="text-xs sm:text-base font-black text-foreground uppercase italic leading-tight tracking-tight">{getLocalizedStatus(displayedGame.status)}</h2>
                  </div>
                  {!isReviewMode && (
                    <Button size="sm" onClick={() => setIsBriefingOpen(true)} className="h-7 sm:h-8 bg-primary text-primary-foreground font-black px-3 sm:px-6 text-[9px] sm:text-xs rounded-full shadow-lg hover:scale-105 transition-transform">
                      <RotateCcw className="w-3.5 h-3.5 mr-2" />
                      <span className="hidden sm:inline">{t.replay}</span>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-1 sm:gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary", !isReviewMode && "animate-ping")} />
                      <span className="text-[9px] sm:text-[11px] font-bold text-foreground/90 italic tracking-tight uppercase leading-none">
                        {isSuggesting && gameMode === 'pve' && displayedGame.turn === 'black' && !isReviewMode
                          ? t.engine_calculating
                          : getLocalizedStatus(displayedGame.status)
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant={isInspectMode ? "default" : "outline"}
                        onClick={() => setIsInspectMode(!isInspectMode)}
                        className={cn(
                          "h-6 text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 rounded-lg",
                          isInspectMode ? "bg-accent text-accent-foreground animate-pulse border-accent" : "border-white/10 text-muted-foreground bg-transparent"
                        )}
                      >
                        <Info className="w-3 h-3 sm:mr-1" />
                        <span className="hidden sm:inline">{isInspectMode ? t.inspect_active_btn : t.inspect_inactive_btn}</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={getAiHint} 
                        disabled={game.isGameOver || isSuggesting || isReviewMode || isAdPlaying}
                        className="h-5 w-5 sm:h-7 sm:w-7 p-0"
                      >
                        <Lightbulb className={cn("w-3.5 h-3.5 sm:w-4 h-4", isSuggesting ? "animate-spin text-accent" : "text-muted-foreground")} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-3 lg:flex flex-col gap-6 overflow-hidden">
          <Card className="flex-1 bg-card border-border shadow-2xl overflow-hidden flex flex-col">
            <CardHeader className="py-3 px-4 bg-secondary/20 border-b border-border/50">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-accent">
                <Cpu className="w-3.5 h-3.5" /> {t.engine_title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-4">
              {EnginePanel}
            </CardContent>
          </Card>
          
          <Card className="shrink-0 bg-card border-border shadow-md p-4 space-y-3">
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Session Statistics</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-secondary/30 p-2 rounded-lg border border-border/50">
                <p className="text-[7px] font-black text-muted-foreground uppercase">Moves</p>
                <p className="text-xs font-black text-foreground">{game.history.length}</p>
              </div>
              <div className="bg-secondary/30 p-2 rounded-lg border border-border/50">
                <p className="text-[7px] font-black text-muted-foreground uppercase">Draws</p>
                <p className="text-xs font-black text-foreground">{scores.draws}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Dialog open={isLogOpen} onOpenChange={setIsLogOpen}>
        <DialogContent className="max-w-none w-full h-svh p-0 bg-background border-none z-50 overflow-hidden flex flex-col">
          <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between border-b border-white/5 shrink-0 bg-secondary/20 text-left space-y-0">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
                <History className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-black text-foreground uppercase tracking-tighter">{t.history_title}</DialogTitle>
                <DialogDescription className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{t.history_btn} Protocol active</DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
               <Button variant="outline" size="sm" onClick={copyHistory} className="h-9 gap-2 font-black uppercase text-[10px] border-white/10 bg-secondary/20 hover:bg-secondary/40">
                {hasCopied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{hasCopied ? "COPIED" : "COPY LOG"}</span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsLogOpen(false)} className="h-10 w-10 hover:bg-white/5 rounded-full">
                <X className="w-6 h-6" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 min-h-0 grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-6 overflow-hidden">
            <div className="lg:col-span-7 landscape:col-span-1 flex flex-col items-center justify-center space-y-2 sm:space-y-6 min-h-0">
              <div className="relative h-full aspect-square flex items-center justify-center min-h-0 max-w-full">
                 <div className="w-full h-full shadow-[0_40px_100px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden ring-1 ring-white/10 relative">
                    <Board 
                        game={displayedGame} 
                        onMove={() => {}} 
                        headSkin={headSkin} 
                        bodySkin={bodySkin} 
                        baseSkin={baseSkin} 
                        onPieceSelect={handlePieceSelect}
                        inspectMode={true}
                    />
                    <div className="absolute top-4 right-4 z-40 flex flex-col items-end gap-2">
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-md text-foreground font-black tracking-widest px-4 py-1.5 text-[10px] border-white/10 shadow-xl">
                        {viewIndex === -1 ? `LIVE STATUS` : `FRAME ${viewIndex + 1}`}
                      </Badge>
                      <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] bg-black/40 px-2 py-1 rounded">
                        Vector Analysis Protocol
                      </div>
                    </div>
                 </div>
              </div>

              <div className="w-full max-w-[500px] space-y-2 sm:space-y-4 landscape:space-y-2">
                <div className="px-2">
                  <div className="flex justify-between text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1.5">
                    <span>Tactical Progression</span>
                    <span>{viewIndex === -1 ? game.history.length : viewIndex + 1} / {game.history.length}</span>
                  </div>
                  <Progress 
                    value={game.history.length > 0 
                      ? ((viewIndex === -1 ? game.history.length : viewIndex + 1) / game.history.length) * 100 
                      : 0} 
                    className="h-1.5 bg-secondary/40"
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-2 p-2 bg-secondary/30 rounded-2xl border border-white/5 backdrop-blur-md shadow-inner">
                  <Button variant="ghost" size="icon" className="h-10 sm:h-12 w-full hover:bg-white/5 transition-colors" onClick={() => setStep(0)} disabled={viewIndex === 0 || game.history.length === 0}>
                    <ChevronFirst className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 sm:h-12 w-full hover:bg-white/5 transition-colors" onClick={() => setStep(Math.max(0, (viewIndex === -1 ? game.history.length - 1 : viewIndex) - 1))} disabled={viewIndex === 0 || game.history.length === 0}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button variant={viewIndex === -1 ? "default" : "secondary"} size="icon" className={cn("h-10 sm:h-12 w-full font-black shadow-xl transition-all", viewIndex === -1 && "bg-primary text-white scale-105")} onClick={setLive}>
                    <PlayCircle className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 sm:h-12 w-full hover:bg-white/5 transition-colors" onClick={() => setStep(Math.min(game.history.length - 1, (viewIndex === -1 ? game.history.length - 1 : viewIndex) + 1))} disabled={viewIndex === -1 || viewIndex === game.history.length - 1 || game.history.length === 0}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 sm:h-12 w-full hover:bg-white/5 transition-colors" onClick={() => setStep(game.history.length - 1)} disabled={viewIndex === game.history.length - 1 || game.history.length === 0}>
                    <ChevronLast className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 landscape:col-span-1 flex flex-col bg-card/20 border-l border-white/5 overflow-hidden min-h-0">
              <div className="p-4 sm:p-6 border-b border-white/5 bg-secondary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Engagement Overview</span>
                </div>
                <Badge className="bg-accent/10 text-accent text-[8px] font-black border-accent/20">
                  {Math.ceil(game.history.length / 2)} FULL ROUNDS
                </Badge>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-4 sm:p-6">
                  {game.history.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-12 sm:py-24 text-center space-y-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary/20 flex items-center justify-center border border-dashed border-white/10">
                        <History className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/20" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-black text-foreground/50 uppercase tracking-widest">{t.history_empty_title}</h3>
                        <p className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.3em]">{t.history_empty_desc}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 pb-8">
                      {Array.from({ length: Math.ceil(game.history.length / 2) }).map((_, i) => (
                        <div key={i} className="flex gap-4 items-start group/row">
                          <div className="w-8 pt-4 flex flex-col items-center gap-1 opacity-30">
                            <span className="text-[10px] font-black text-muted-foreground font-mono">{String(i + 1).padStart(2, '0')}</span>
                            <div className="w-px h-full bg-border grow min-h-[40px]" />
                          </div>
                          <div className="flex-1 grid grid-cols-2 gap-3">
                            <Button 
                              variant="ghost" 
                              onClick={() => setStep(i * 2)} 
                              className={cn(
                                "relative flex flex-col items-start justify-center px-4 h-14 sm:h-16 rounded-xl border text-xs transition-all duration-300", 
                                viewIndex === i * 2 
                                  ? "bg-primary/20 border-primary text-foreground ring-1 ring-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.1)] scale-[1.02] z-10" 
                                  : "bg-secondary/20 border-white/5 hover:bg-white/5 hover:border-white/10"
                              )}
                            >
                              <span className={cn("text-[7px] font-black uppercase tracking-[0.2em] mb-1", viewIndex === i * 2 ? "text-primary" : "text-muted-foreground/60")}>White Unit</span>
                              <span className="font-black text-sm tracking-tight">{ChessGame.toAlgebraic(game.history[i * 2])}</span>
                              {viewIndex === i * 2 && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r" />}
                            </Button>
                            
                            {game.history[i * 2 + 1] ? (
                              <Button 
                                variant="ghost" 
                                onClick={() => setStep(i * 2 + 1)} 
                                className={cn(
                                  "relative flex flex-col items-start justify-center px-4 h-14 sm:h-16 rounded-xl border text-xs transition-all duration-300", 
                                  viewIndex === i * 2 + 1 
                                    ? "bg-accent/20 border-accent text-foreground ring-1 ring-accent/30 shadow-[0_0_30px_rgba(var(--accent),0.1)] scale-[1.02] z-10" 
                                    : "bg-secondary/20 border-white/5 hover:bg-white/5 hover:border-white/10"
                                )}
                              >
                                <span className={cn("text-[7px] font-black uppercase tracking-[0.2em] mb-1", viewIndex === i * 2 + 1 ? "text-accent" : "text-accent/40")}>Black Unit</span>
                                <span className="font-black text-sm tracking-tight">{ChessGame.toAlgebraic(game.history[i * 2 + 1])}</span>
                                {viewIndex === i * 2 + 1 && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r" />}
                              </Button>
                            ) : (
                              <div className="h-14 sm:h-16 rounded-xl border border-dashed border-white/5 bg-transparent flex items-center justify-center opacity-20">
                                <span className="text-[8px] font-black tracking-widest">PENDING</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <footer className="p-4 sm:p-6 border-t border-white/5 bg-secondary/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-primary animate-pulse" />
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{game.history.length} Manoeuvres Indexed</span>
                </div>
                <Button onClick={() => setIsLogOpen(false)} variant="secondary" className="h-8 sm:h-10 font-black text-[10px] uppercase px-6 sm:px-8 shadow-xl bg-foreground text-background hover:bg-foreground/90 rounded-full">
                  {t.history_playback_back}
                </Button>
              </footer>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
