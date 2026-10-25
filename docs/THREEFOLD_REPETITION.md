# Tactical Protocol: Threefold Repetition

This document outlines the implementation and strategic logic behind the **Threefold Repetition** rule in the Tactical Six 6x6 engagement arena.

## 📋 Definition
Threefold repetition is a standard chess rule designed to prevent games from continuing indefinitely when neither player can make progress. In Tactical Six, a game is declared a **Tactical Draw** if the same position occurs for the third time.

A position is considered "the same" if:
1.  All pieces of the same type and color occupy the exactly identical squares as before.
2.  It is the same player's turn to move.

## ⚙️ Technical Implementation

### 1. State Hashing
The engine generates a unique cryptographic-like string (hash) for every state of the mission. This hash is a composite of:
-   A string representation of the 6x6 matrix (using `exportToString()`).
-   The active player color (`white` or `black`).

### 2. History Tracking
The `ChessGame` class maintains a `positionHistory` array. Every time a commander completes a move, the resulting state hash is pushed into this registry.

### 3. Detection Logic
The `isThreefoldRepetition()` method iterates through the `positionHistory` and tallies occurrences of the current state hash. If the count reaches `3`, the game status is updated to `Draw! Threefold repetition.` and `isGameOver` is set to true.

```typescript
isThreefoldRepetition(): boolean {
  const currentHash = this.getPositionHash();
  let count = 0;
  for (const hash of this.positionHistory) {
    if (hash === currentHash) count++;
  }
  return count >= 3;
}
```

## 🧠 AI Strategic Awareness
The Minimax search algorithm is integrated with this protocol. When the AI evaluates potential move vectors:
-   It simulates the game state into the future.
-   If a branch leads to a position that has occurred twice before in the actual game history, the AI evaluates that terminal node as a **Score of 0** (Draw).
-   **Defensive Utility**: If the AI is at a material disadvantage, it will actively seek moves that force a threefold repetition to secure a draw.
-   **Offensive Avoidance**: If the AI is winning, it will prioritize moves that avoid repeated positions to ensure it can reach a checkmate.

---
*Operational Intelligence Report | Threefold Repetition Protocol v1.0*
