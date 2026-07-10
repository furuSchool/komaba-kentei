"use client";

import { useState } from "react";
import { XIcon, InstagramIcon, LineIcon } from "./icons/BrandIcons";

interface Props {
  percent: number;
  comment: string;
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 15l6-6" />
      <path d="M11 5l1-1a4 4 0 015.7 5.7l-2 2" />
      <path d="M13 19l-1 1a4 4 0 01-5.7-5.7l2-2" />
    </svg>
  );
}

export default function ShareButtons({ percent, comment }: Props) {
  const [copied, setCopied] = useState(false);
  const shareText = `駒場力${percent}点でした！${comment} あなたも「駒場検定」に挑戦してみて！`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  function shareToX() {
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  }

  function shareToLine() {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function shareToInstagram() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch {
        // ユーザーがシェアをキャンセルした場合は何もしない
      }
    } else {
      await copyLink();
      alert(
        "この端末では共有機能が使えないため、シェア文言をコピーしました。Instagramアプリに貼り付けてご利用ください。"
      );
    }
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
      key: "copy",
      label: copied ? "コピーしました" : "リンクをコピー",
      onClick: copyLink,
      circleClass: "border border-zinc-300 bg-zinc-100",
      icon: <LinkIcon />,
      textClass: "text-zinc-700",
    },
  ];

  return (
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
          <span className={`text-[11px] font-medium ${item.textClass ?? "text-zinc-600"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
