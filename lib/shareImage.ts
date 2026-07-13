import { withBasePath } from "./paths";

const WIDTH = 1000;
const HEIGHT = 1250;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`画像の読み込みに失敗しました: ${src}`));
    img.src = src;
  });
}

function formatToday(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let line = "";
  let cy = y;
  for (const ch of text) {
    const test = line + ch;
    if (line && ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, cy);
      line = ch;
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
  return cy;
}

/** Draws the same result share card shown in ResultScreen onto a canvas and
 * rasterizes it, so SNS share buttons can attach a real image file instead of
 * relying on link-unfurl previews (which a static export can't personalize). */
export async function renderShareCardImage(
  percent: number,
  comment: string
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("この端末は画像生成に対応していません");

  const bg = await loadImage(withBasePath("/images/others/komaba.jpg"));
  const scale = Math.max(WIDTH / bg.width, HEIGHT / bg.height);
  const drawW = bg.width * scale;
  const drawH = bg.height * scale;
  ctx.drawImage(bg, (WIDTH - drawW) / 2, (HEIGHT - drawH) / 2, drawW, drawH);

  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  gradient.addColorStop(0, "rgba(15,23,42,0.6)");
  gradient.addColorStop(0.5, "rgba(15,23,42,0.15)");
  gradient.addColorStop(1, "rgba(15,23,42,0.75)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const pad = 56;

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText("駒場検定", pad, pad + 36);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "600 18px sans-serif";
  ctx.fillText("K O M A B A   T E S T", pad, pad + 36 + 30);

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "22px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(formatToday(), WIDTH - pad, pad + 36);
  ctx.textAlign = "left";

  const scoreBaseline = HEIGHT - 300;
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 140px sans-serif";
  const percentText = String(percent);
  ctx.fillText(percentText, pad, scoreBaseline);
  const percentWidth = ctx.measureText(percentText).width;
  ctx.font = "bold 48px sans-serif";
  ctx.fillText("点", pad + percentWidth + 14, scoreBaseline);

  ctx.font = "bold 38px sans-serif";
  const commentBottom = wrapText(
    ctx,
    comment,
    pad,
    scoreBaseline + 76,
    WIDTH - pad * 2,
    50
  );

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "24px sans-serif";
  ctx.fillText("# 駒場検定", pad, Math.max(commentBottom + 60, HEIGHT - pad));

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("画像の生成に失敗しました"));
    }, "image/png");
  });
}
