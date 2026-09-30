import { brand } from "../data/brand";

// Símbolo geométrico original: bloco grafite com dois cortes diagonais (laranja e marfim).
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="3" fill="#151515" />
      <path d="M6 6h13l-6 20H6z" fill="#FF5A1F" />
      <path d="M21 6h5v20H15z" fill="#F3F1EB" />
    </svg>
  );
}

// Wordmark vetorial: RUA condensado forte + STUDIO secundário.
export function Wordmark({ tone = "ink", className }: { tone?: "ink" | "paper"; className?: string }) {
  const fill = tone === "ink" ? "#151515" : "#F3F1EB";
  return (
    <svg
      className={className}
      viewBox="0 0 150 34"
      height="34"
      role="img"
      aria-label={brand.name}
      style={{ overflow: "visible" }}
    >
      <g transform="translate(0 1)">
        <rect width="32" height="32" rx="3" fill="#151515" stroke={tone === "paper" ? "#F3F1EB" : "none"} strokeWidth="1" />
        <path d="M6 6h13l-6 20H6z" fill="#FF5A1F" />
        <path d="M21 6h5v20H15z" fill="#F3F1EB" />
      </g>
      <text
        x="42"
        y="29"
        fill={fill}
        style={{ font: '800 34px "Barlow Condensed", "Arial Narrow", sans-serif', letterSpacing: "0.01em" }}
      >
        {brand.wordmark.main}
      </text>
      <text
        x="95"
        y="28"
        fill={fill}
        style={{ font: '600 13px "Barlow Condensed", "Arial Narrow", sans-serif', letterSpacing: "0.22em" }}
      >
        {brand.wordmark.sub}
      </text>
    </svg>
  );
}
