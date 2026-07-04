import { withBasePath } from "@/lib/paths";

interface Props {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <img
        src={withBasePath("/images/dummy.png")}
        alt="駒場検定キャッチイラスト"
        className="w-48 h-48 rounded-3xl object-cover shadow-lg"
      />
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-amber-900">
          駒場検定
        </h1>
        <p className="text-sm text-zinc-600">
          全10問のクイズであなたの「駒場理解度」を診断しよう
        </p>
      </div>
      <button
        onClick={onStart}
        className="rounded-full bg-amber-500 px-10 py-4 text-lg font-bold text-white shadow-md transition active:scale-95 hover:bg-amber-600"
      >
        検定スタート
      </button>
    </div>
  );
}
