"use client";

import { useState } from "react";
import { XIcon, InstagramIcon, LineIcon, BeRealIcon } from "./icons/BrandIcons";
import { renderShareCardImage } from "@/lib/shareImage";

interface Props {
  percent: number;
  comment: string;
}

const FILE_NAME = "komaba-kentei-result.png";

export default function ShareButtons({ percent, comment }: Props) {
  const [status, setStatus] = useState<string | null>(null);
  const shareText = `駒場力${percent}点でした！${comment} あなたも「駒場検定」に挑戦してみて！`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  function notify(message: string) {
    setStatus(message);
    setTimeout(() => setStatus(null), 4000);
  }

  async function getShareFile(): Promise<File> {
    const blob = await renderShareCardImage(percent, comment);
    return new File([blob], FILE_NAME, { type: "image/png" });
  }

  /**
   * Hands off to the OS share sheet — the standard way to get an image into
   * apps (Instagram/LINE/X/BeReal) that have no web share URL of their own.
   * Tries image+text first, then falls back to a text-only native share
   * (still a single native share sheet, just without the picture attached).
   * Returns true once the OS flow has run (shared or user-cancelled) so the
   * caller knows not to fall further back.
   */
  async function shareViaOsSheet(): Promise<boolean> {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      return false;
    }
    try {
      const file = await getShareFile();
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText, url: shareUrl });
        return true;
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return true;
    }
    try {
      await navigator.share({ text: shareText, url: shareUrl });
      return true;
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return true;
    }
    return false;
  }

  async function copyTextFallback(appName: string) {
    try {
      await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`);
      notify(`投稿文をコピーしました。${appName}に貼り付けてご利用ください。`);
    } catch {
      notify("共有に対応していない端末です。スマートフォンでお試しください。");
    }
  }

  async function shareToX() {
    if (await shareViaOsSheet()) return;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  }

  async function shareToLine() {
    if (await shareViaOsSheet()) return;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  }

  async function shareToInstagram() {
    if (await shareViaOsSheet()) return;
    await copyTextFallback("Instagram");
  }

  async function shareToBeReal() {
    if (await shareViaOsSheet()) return;
    await copyTextFallback("BeReal");
  }

  const items = [
    {
      key: "x",
      label: "Xでシェア",
      onClick: shareToX,
      circleClass: "bg-black",
      icon: <XIcon className="h-5 w-5 text-white" />,
    },
    {
      key: "instagram",
      label: "Instagram",
      onClick: shareToInstagram,
      circleClass:
        "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
      icon: <InstagramIcon className="h-6 w-6 text-white" />,
    },
    {
      key: "line",
      label: "LINE",
      onClick: shareToLine,
      circleClass: "bg-[#06C755]",
      icon: <LineIcon className="h-6 w-6 text-white" />,
    },
    {
      key: "bereal",
      label: "BeReal",
      onClick: shareToBeReal,
      circleClass: "bg-black",
      icon: <BeRealIcon className="h-6 w-6 text-white" />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={item.onClick}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full shadow ${item.circleClass}`}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-medium text-zinc-600">
              {item.label}
            </span>
          </button>
        ))}
      </div>
      {status && (
        <p className="mt-3 text-center text-xs font-medium text-zinc-500">
          {status}
        </p>
      )}
    </div>
  );
}
