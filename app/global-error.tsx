"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-xl font-bold">問題が発生しました</h2>
          <button
            onClick={() => unstable_retry()}
            className="rounded-full bg-amber-500 px-6 py-2 font-bold text-white"
          >
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  );
}
