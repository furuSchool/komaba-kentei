"use client";

interface Props {
  percent: number;
}

export default function ShareButtons({ percent }: Props) {
  const shareText = `駒場理解度${percent}%でした！あなたも「駒場検定」に挑戦してみて！`;
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  function shareToX() {
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch {
        // ユーザーがシェアをキャンセルした場合は何もしない
      }
    } else {
      await navigator.clipboard?.writeText(`${shareText} ${shareUrl}`);
      alert(
        "この端末では共有機能が使えないため、シェア文言をコピーしました。Instagram等に貼り付けてご利用ください。"
      );
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <button
        onClick={shareToX}
        className="w-full rounded-full bg-black px-6 py-3 text-base font-bold text-white transition active:scale-95"
      >
        Xでシェアする
      </button>
      <button
        onClick={shareNative}
        className="w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-6 py-3 text-base font-bold text-white transition active:scale-95"
      >
        Instagram等でシェアする
      </button>
    </div>
  );
}
