# **App Name**: Tactical Six

## Core Features:

- 6x6 Board Display: Renders the 6x6 chess board visually, with distinct square colors for clarity.
- Piece Placement & Movement: Displays standard chess pieces (adapted for 6x6 if needed) and allows players to select and move pieces.
- Valid Move Logic: Enforces standard chess rules for piece movement on a 6x6 board, preventing illegal moves.
- Turn Management: Manages player turns, indicating whose turn it is and only allowing valid moves for the active player.
- Check & Checkmate Detection: Automatically identifies when a player is in check or checkmate, declaring game end.
- AI Move Suggestion Tool: An AI-powered tool that suggests a legal move for the current player, aiding in strategic thinking.
- Game Reset: Allows players to reset the board to the initial 6x6 setup at any time.

## Style Guidelines:

- A dark color scheme is chosen to evoke focus and a sophisticated gaming experience, much like a strategy board game under focused lighting. Primary interactive elements will use a refined, slightly desaturated cool blue: '#2E75B8' (RGB: 46, 117, 184). The overall background will be a very dark, almost black, variant with a subtle hint of this blue, providing depth without distraction: '#161A1C' (RGB: 22, 26, 28). Important game states and highlights will be marked with a distinct, brighter cyan: '#60DEDE' (RGB: 96, 222, 222).
- Body and headline font: 'Inter', a grotesque-style sans-serif for its modern, machined, objective, and neutral look, ensuring high legibility for game information and labels.
- Chess pieces will utilize sleek, modern, and clearly distinguishable vector graphics. Control elements like 'Reset' or 'Hint' will employ minimalistic, line-art icons that blend seamlessly with the dark theme.
- The 6x6 chessboard will be the central focus, framed with ample negative space. Control elements and game information (e.g., current turn, status) will be clearly segregated, yet easily accessible, ideally positioned on either side or below the board, ensuring responsiveness for various screen sizes.
- Piece movements will feature smooth, subtle animations, enhancing the perception of flow. A soft 'glow' or 'pulse' animation will highlight the currently selected piece and available legal moves. Feedback for illegal moves or game state changes (e.g., check) will be indicated with subtle, quick visual cues.