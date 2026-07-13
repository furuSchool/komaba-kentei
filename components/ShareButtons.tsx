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

  /** Tries the OS share sheet with the result image attached (works for
   * X/Instagram/LINE/BeReal alike on mobile). Returns true if it was handled
   * (shared or the user cancelled), false if the caller should fall back. */
  async function shareImageNative(): Promise<boolean> {
    try {
      const file = await getShareFile();
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText, url: shareUrl });
        return true;
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return true;
    }
    return false;
  }

  async function downloadImageFallback(instruction: string) {
    try {
      const file = await getShareFile();
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILE_NAME;
      a.click();
      URL.revokeObjectURL(url);
      notify(instruction);
    } catch {
      notify("画像の生成に失敗しました");
    }
  }

  async function shareToX() {
    if (await shareImageNative()) return;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  }

  async function shareToLine() {
    if (await shareImageNative()) return;
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  }

  async function shareToInstagram() {
    if (await shareImageNative()) return;
    await downloadImageFallback(
      "画像を保存しました。Instagramアプリに貼り付けてご利用ください。"
    );
  }

  async function shareToBeReal() {
    if (await shareImageNative()) return;
    await downloadImageFallback(
      "画像を保存しました。BeRealアプリの投稿画面から貼り付けてご利用ください。"
    );
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
