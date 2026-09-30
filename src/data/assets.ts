// Derivações WebP geradas por scripts/optimize-assets.mjs a partir de assets/generated/*.png.
import laranja560 from "../assets/generated/personagem-laranja-560.webp";
import laranja1087 from "../assets/generated/personagem-laranja-1087.webp";
import azul560 from "../assets/generated/look-azul-ilustrado-sem-marca-560.webp";
import azul1086 from "../assets/generated/look-azul-ilustrado-sem-marca-1086.webp";
import oliva560 from "../assets/generated/look-oliva-ilustrado-560.webp";
import oliva1086 from "../assets/generated/look-oliva-ilustrado-1086.webp";
import jaqueta560 from "../assets/generated/jaqueta-laranja-ilustrada-560.webp";
import jaqueta1100 from "../assets/generated/jaqueta-laranja-ilustrada-1100.webp";
import camAzul520 from "../assets/generated/camiseta-azul-ilustrada-520.webp";
import camAzul1000 from "../assets/generated/camiseta-azul-ilustrada-1000.webp";
import camOliva520 from "../assets/generated/camiseta-oliva-ilustrada-520.webp";
import camOliva1000 from "../assets/generated/camiseta-oliva-ilustrada-1000.webp";
import tenis760 from "../assets/generated/tenis-street-ilustrado-760.webp";
import tenis1400 from "../assets/generated/tenis-street-ilustrado-1400.webp";
import acess760 from "../assets/generated/acessorios-street-ilustrados-760.webp";
import acess1400 from "../assets/generated/acessorios-street-ilustrados-1400.webp";
import cenario960 from "../assets/generated/cenario-urbano-ilustrado-960.webp";
import cenario1672 from "../assets/generated/cenario-urbano-ilustrado-1672.webp";
import poster600 from "../assets/generated/poster-urbano-laranja-600.webp";
import poster1122 from "../assets/generated/poster-urbano-laranja-1122.webp";

export type ImageAsset = {
  src: string;
  small: string;
  srcSet: string;
  width: number;
  height: number;
};

const img = (small: string, sw: number, large: string, lw: number, width: number, height: number): ImageAsset => ({
  src: large,
  small,
  srcSet: `${small} ${sw}w, ${large} ${lw}w`,
  width,
  height,
});

export const images = {
  personagemLaranja: img(laranja560, 560, laranja1087, 1087, 1087, 1447),
  lookAzul: img(azul560, 560, azul1086, 1086, 1086, 1448),
  lookOliva: img(oliva560, 560, oliva1086, 1086, 1086, 1448),
  jaqueta: img(jaqueta560, 560, jaqueta1100, 1100, 1312, 1199),
  camisetaAzul: img(camAzul520, 520, camAzul1000, 1000, 1214, 1295),
  camisetaOliva: img(camOliva520, 520, camOliva1000, 1000, 1222, 1287),
  tenis: img(tenis760, 760, tenis1400, 1400, 1536, 1024),
  acessorios: img(acess760, 760, acess1400, 1400, 1536, 1024),
  cenario: img(cenario960, 960, cenario1672, 1672, 1672, 941),
  poster: img(poster600, 600, poster1122, 1122, 1122, 1402),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;
