# Tactical Six | Visual Systems Intelligence

This document outlines the high-fidelity rendering architecture for the 6x6 tactical engagement arena.

## 🎨 Architecture: Programmatic SVG-in-JS

Tactical Six utilizes a "Programmatic SVG" architecture. Instead of loading static image files, piece geometry is embedded directly into React components.

### Benefits
- **Zero Latency**: No network requests for tactical unit assets.
- **Dynamic Reactivity**: Fill and stroke attributes are bound to CSS variables.
- **Perfect Scaling**: Vector-based units remain sharp at any tactical zoom level.

## 🧬 Modular Skin System

The system supports two primary rendering modes: **Unified Sets** and **Composite Modules**.

### 1. Unified Sets (Vanguard, Classical, Cyber, Geometric)
When all three modules (Head, Body, Base) share the same style, the engine renders a high-fidelity unified SVG. This ensures the most cohesive silhouette for professional engagement.

### 2. Composite Modules (Slimes, Doodles, etc.)
Commanders can mix and match different styles for the three core modules:
- **Head Module**: Defines the identity and "face" of the unit.
- **Core Body**: The central structural component.
- **Stabilizer Base**: The foundation anchoring the unit to the grid.

## 🌈 Theme-Aware Color Matrix

Colors are not hardcoded. They are driven by CSS Variables defined in `src/app/globals.css`.

| Variable | Galaxy (Dark) | Sunny (Light) | Cookie (Brown) |
| :--- | :--- | :--- | :--- |
| `--piece-white-fill` | #FFFFFF | #FFFFFF | #fffaf0 |
| `--piece-black-fill` | #120a1a (Violet Tint) | #2d3748 | #3e2723 |
| `--piece-black-stroke` | #c084fc (Primary) | #ffffff | #efebe9 |

### Rim Lighting Protocol
In the **Galaxy** theme, a specialized CSS filter applies a "Rim Light" (outer glow) to black pieces. This prevents dark tactical units from blending into dark squares, ensuring strategic clarity during low-light operations.

## 🚀 Vector Animation Engine

Tactical units are rendered on an **Absolute Pieces Layer** (`z-index: 20`) separate from the board grid.

- **Translation**: Uses standard CSS `top` and `left` properties with `percentage` values.
- **Interpolation**: Moves are animated using a 500ms `cubic-bezier(0.4, 0, 0.2, 1)` transition.
- **Identity Tracking**: Every piece has a persistent `id`, allowing React to maintain the DOM node and its animation state during board refreshes.

---
*Operational Intelligence Report | Visual Systems v1.0*
