export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type PlayerColor = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: PlayerColor;
}

export type BoardState = (Piece | null)[][];

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
}

export const BOARD_SIZE = 6;

export class ChessGame {
  board: BoardState;
  turn: PlayerColor;
  history: Move[];
  isGameOver: boolean;
  status: string;

  constructor() {
    this.board = this.initializeBoard();
    this.turn = 'white';
    this.history = [];
    this.isGameOver = false;
    this.status = 'White to move';
  }

  private initializeBoard(): BoardState {
    const board: BoardState = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

    // Standard 6x6 variant setup: R N B Q K R
    const backRank: PieceType[] = ['r', 'n', 'b', 'q', 'k', 'r'];

    // Black pieces
    for (let i = 0; i < BOARD_SIZE; i++) {
      board[0][i] = { type: backRank[i], color: 'black' };
      board[1][i] = { type: 'p', color: 'black' };
    }

    // White pieces
    for (let i = 0; i < BOARD_SIZE; i++) {
      board[4][i] = { type: 'p', color: 'white' };
      board[5][i] = { type: backRank[i], color: 'white' };
    }

    return board;
  }

  clone(): ChessGame {
    const newGame = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    newGame.board = this.board.map(row => row.map(p => p ? { ...p } : null));
    newGame.history = [...this.history];
    return newGame;
  }

  getLegalMoves(player: PlayerColor): Move[] {
    const moves: Move[] = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === player) {
          const pseudoLegal = this.getPseudoLegalMoves(row, col);
          for (const m of pseudoLegal) {
            if (!this.wouldLeaveKingInCheck(m, player)) {
              moves.push(m);
            }
          }
        }
      }
    }
    return moves;
  }

  private getPseudoLegalMoves(row: number, col: number): Move[] {
    const piece = this.board[row][col];
    if (!piece) return [];

    const moves: Move[] = [];
    const color = piece.color;
    const opponent = color === 'white' ? 'black' : 'white';

    const addMove = (r: number, c: number) => {
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return false;
      const target = this.board[r][c];
      if (!target) {
        moves.push({ from: { row, col }, to: { row: r, col: c } });
        return true;
      } else if (target.color === opponent) {
        moves.push({ from: { row, col }, to: { row: r, col: c } });
        return false;
      }
      return false;
    };

    switch (piece.type) {
      case 'p':
        const dir = color === 'white' ? -1 : 1;
        const nextR = row + dir;
        if (nextR >= 0 && nextR < BOARD_SIZE) {
          // Forward
          if (!this.board[nextR][col]) {
            moves.push({ from: { row, col }, to: { row: nextR, col: col } });
          }
          // Captures
          for (const dc of [-1, 1]) {
            const nextC = col + dc;
            if (nextC >= 0 && nextC < BOARD_SIZE) {
              const target = this.board[nextR][nextC];
              if (target && target.color === opponent) {
                moves.push({ from: { row, col }, to: { row: nextR, col: nextC } });
              }
            }
          }
        }
        break;
      case 'r':
        this.projectSliding(row, col, [[1, 0], [-1, 0], [0, 1], [0, -1]], moves);
        break;
      case 'b':
        this.projectSliding(row, col, [[1, 1], [1, -1], [-1, 1], [-1, -1]], moves);
        break;
      case 'n':
        const jumps = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
        for (const [dr, dc] of jumps) addMove(row + dr, col + dc);
        break;
      case 'q':
        this.projectSliding(row, col, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]], moves);
        break;
      case 'k':
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            addMove(row + dr, col + dc);
          }
        }
        break;
    }
    return moves;
  }

  private projectSliding(row: number, col: number, dirs: number[][], moves: Move[]) {
    const piece = this.board[row][col]!;
    const opponent = piece.color === 'white' ? 'black' : 'white';

    for (const [dr, dc] of dirs) {
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        const target = this.board[r][c];
        if (!target) {
          moves.push({ from: { row, col }, to: { row: r, col: c } });
        } else {
          if (target.color === opponent) {
            moves.push({ from: { row, col }, to: { row: r, col: c } });
          }
          break;
        }
        r += dr;
        c += dc;
      }
    }
  }

  private wouldLeaveKingInCheck(move: Move, color: PlayerColor): boolean {
    const originalBoard = this.board.map(row => [...row]);
    const { from, to } = move;

    this.board[to.row][to.col] = this.board[from.row][from.col];
    this.board[from.row][from.col] = null;

    const inCheck = this.isInCheck(color);

    this.board = originalBoard;
    return inCheck;
  }

  isInCheck(color: PlayerColor): boolean {
    let kingPos: Position | null = null;
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const piece = this.board[r][c];
        if (piece && piece.type === 'k' && piece.color === color) {
          kingPos = { row: r, col: c };
          break;
        }
      }
    }

    if (!kingPos) return false;

    const opponent = color === 'white' ? 'black' : 'white';
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        const piece = this.board[r][c];
        if (piece && piece.color === opponent) {
          const pseudoMoves = this.getPseudoLegalMoves(r, c);
          if (pseudoMoves.some(m => m.to.row === kingPos!.row && m.to.col === kingPos!.col)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  makeMove(move: Move): boolean {
    const legalMoves = this.getLegalMoves(this.turn);
    const isLegal = legalMoves.some(m => 
      m.from.row === move.from.row && m.from.col === move.from.col &&
      m.to.row === move.to.row && m.to.col === move.to.col
    );

    if (!isLegal) return false;

    this.board[move.to.row][move.to.col] = this.board[move.from.row][move.from.col];
    this.board[move.from.row][move.from.col] = null;
    this.history.push(move);
    this.turn = this.turn === 'white' ? 'black' : 'white';

    this.updateStatus();
    return true;
  }

  private updateStatus() {
    const legalMoves = this.getLegalMoves(this.turn);
    const inCheck = this.isInCheck(this.turn);

    if (legalMoves.length === 0) {
      this.isGameOver = true;
      if (inCheck) {
        this.status = `Checkmate! ${this.turn === 'white' ? 'Black' : 'White'} wins.`;
      } else {
        this.status = 'Draw! Stalemate.';
      }
    } else {
      this.status = `${this.turn.charAt(0).toUpperCase() + this.turn.slice(1)} to move${inCheck ? ' (Check!)' : ''}`;
    }
  }

  exportToString(): string {
    return this.board.map(row => 
      row.map(p => {
        if (!p) return '.';
        const char = p.type === 'n' ? 'n' : p.type;
        return p.color === 'white' ? char.toUpperCase() : char.toLowerCase();
      }).join('')
    ).join('\n');
  }

  static toAlgebraic(move: Move): string {
    const files = ['a', 'b', 'c', 'd', 'e', 'f'];
    const from = `${files[move.from.col]}${BOARD_SIZE - move.from.row}`;
    const to = `${files[move.to.col]}${BOARD_SIZE - move.to.row}`;
    return `${from}${to}`;
  }

  static fromAlgebraic(notation: string): Move {
    const files = ['a', 'b', 'c', 'd', 'e', 'f'];
    const fromCol = files.indexOf(notation[0]);
    const fromRow = BOARD_SIZE - parseInt(notation[1]);
    const toCol = files.indexOf(notation[2]);
    const toRow = BOARD_SIZE - parseInt(notation[3]);
    return {
      from: { row: fromRow, col: fromCol },
      to: { row: toRow, col: toCol }
    };
  }
}
