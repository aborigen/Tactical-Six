# Tactical Six | Advanced 6x6 Strategic Chess

Tactical Six is a sophisticated 6x6 chess variant designed for fast-paced, high-intensity strategic engagement. It features a custom-built local tactical engine, kid-friendly visual themes, and a modular avatar skin system.

## 🚀 Key Features

- **6x6 Matrix Combat**: A condensed arena that forces tactical engagement and rewards precise positioning.
- **Victory Protocol**: Celebratory checkmate animations and overlays.
- **Modular Skin System**: Mix and match Head, Body, and Base modules to create unique piece avatars.
- **Kid-Friendly Vision**: Choose between Sunny, Galaxy, and Cookie color palettes designed for maximum clarity and appeal.
- **Advanced Tactical Engine**: Powered by a refactored Minimax algorithm with Alpha-Beta pruning. Includes 5 difficulty levels.
- **Synthesized Tactical Audio**: Real-time auditory feedback synthesized via Web Audio API.

## 🧠 Chess Engine Technical Logic

The AI in Tactical Six is a deterministic search engine implemented in TypeScript. It follows these core principles:

1. **Minimax Search**: Builds a recursive tree of possible moves.
2. **Alpha-Beta Pruning**: Stops evaluating branches once they are proven suboptimal.
3. **Move Ordering**: Evaluates captures and promotions first to trigger faster pruning.

---
*Tactical Operational Manual v1.10.0*