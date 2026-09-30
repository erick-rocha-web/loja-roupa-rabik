// Gera derivações WebP otimizadas a partir dos PNGs originais em assets/generated/.
// Os originais nunca são alterados nem copiados para public/.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = path.join(root, "assets", "generated");
const out = path.join(root, "src", "assets", "generated");
const pub = path.join(root, "public");

const plan = {
  "personagem-laranja": [560, 1087],
  "look-azul-ilustrado-sem-marca": [560, 1086],
  "look-oliva-ilustrado": [560, 1086],
  "jaqueta-laranja-ilustrada": [560, 1100],
  "camiseta-azul-ilustrada": [520, 1000],
  "camiseta-oliva-ilustrada": [520, 1000],
  "tenis-street-ilustrado": [760, 1400],
  "acessorios-street-ilustrados": [760, 1400],
  "cenario-urbano-ilustrado": [960, 1672],
  "poster-urbano-laranja": [600, 1122],
};

await mkdir(out, { recursive: true });
for (const [name, widths] of Object.entries(plan)) {
  for (const w of widths) {
    const file = path.join(out, `${name}-${w}.webp`);
    const info = await sharp(path.join(src, `${name}.png`))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90, effort: 5 })
      .toFile(file);
    console.log(`${name}-${w}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}

// Favicons a partir do símbolo SVG original.
const favicon = path.join(pub, "favicon.svg");
await sharp(favicon, { density: 384 }).resize(32, 32).png().toFile(path.join(pub, "favicon-32.png"));
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#151515" } })
  .composite([{ input: await sharp(favicon, { density: 900 }).resize(132, 132).png().toBuffer(), gravity: "center" }])
  .png()
  .toFile(path.join(pub, "apple-touch-icon.png"));

// Social preview: três ilustrações sobre campo laranja + texto "Projeto conceitual".
const W = 1200, H = 630;
const figs = await Promise.all(
  ["personagem-laranja", "look-azul-ilustrado-sem-marca", "look-oliva-ilustrado"].map((n) =>
    sharp(path.join(src, `${n}.png`)).resize({ height: 560 }).png().toBuffer(),
  ),
);
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#F3F1EB"/>
  <polygon points="520,0 1200,0 1200,630 380,630" fill="#FF5A1F"/>
  <rect x="0" y="600" width="${W}" height="30" fill="#151515"/>
  <text x="56" y="140" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="84" fill="#151515">RUA STUDIO</text>
  <text x="58" y="200" font-family="Arial, sans-serif" font-size="30" fill="#151515">Streetwear interativo</text>
  <text x="58" y="560" font-family="Arial, sans-serif" font-size="24" fill="#151515">Projeto conceitual · Rabik</text>
</svg>`);
await sharp(overlay)
  .composite([
    { input: figs[0], left: 430, top: 40 },
    { input: figs[1], left: 650, top: 40 },
    { input: figs[2], left: 860, top: 40 },
  ])
  .jpeg({ quality: 82 })
  .toFile(path.join(pub, "og-image.jpg"));

// Imagem leve para o fallback <noscript>.
await sharp(path.join(src, "personagem-laranja.png"))
  .resize({ width: 420 })
  .webp({ quality: 78 })
  .toFile(path.join(pub, "noscript-look.webp"));
console.log("favicons, og-image e noscript gerados");
