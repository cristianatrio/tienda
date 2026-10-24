import { Moon, Star } from "lucide-react";

// Ceiling stickers: pale by day, glowing once the lights go off.
const STICKERS = [
  { x: 4, y: 7, size: 24, turn: -12 },
  { x: 14, y: 3.5, size: 14, turn: 18 },
  { x: 27, y: 8, size: 32, turn: 6 },
  { x: 39, y: 3, size: 16, turn: -20 },
  { x: 50, y: 9, size: 26, turn: -6, moon: true },
  { x: 62, y: 4, size: 14, turn: 12 },
  { x: 74, y: 6, size: 20, turn: -24 },
  { x: 88, y: 3.5, size: 16, turn: 22 },
  { x: 97, y: 9, size: 22, turn: -14 },
  { x: 56, y: 46, size: 12, turn: 10 },
];

export function GlowStars() {
  return (
    <div className="glow-stars" aria-hidden="true">
      {STICKERS.map(({ x, y, size, turn, moon }, i) => {
        const Shape = moon ? Moon : Star;
        return (
          <Shape
            key={`${x}-${y}`}
            className="sticker"
            size={size}
            fill="currentColor"
            strokeWidth={1.5}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              "--turn": `${turn}deg`,
              "--i": i,
              // Bigger stickers sit closer, so they drift further with the pointer.
              "--depth": `${size * 0.6}px`,
            }}
          />
        );
      })}
    </div>
  );
}
