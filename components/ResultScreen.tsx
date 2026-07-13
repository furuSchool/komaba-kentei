import { withBasePath } from "@/lib/paths";
import ShareButtons from "./ShareButtons";

interface Props {
  percent: number;
  comment: string;
  onShowRoute: () => void;
}

const SUB_MESSAGE =
  "駒場には知らない魅力がたくさんあるはず。今日から、駒場キャンパスの外へ出てみよう！";

function formatToday(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

export default function ResultScreen({ percent, comment, onShowRoute }: Props) {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 px-6 py-8 text-center">
      <h1 className="w-full text-left text-2xl font-bold text-zinc-900">
        診断結果
      </h1>

      <div>
        <div className="flex items-center justify-center gap-3 text-orange-600">
          <span className="inline-block h-4 w-0.5 -rotate-12 bg-orange-500" />
          <p className="text-base font-bold text-zinc-800">
            あなたの駒場力は…
          </p>
          <span className="inline-block h-4 w-0.5 rotate-12 bg-orange-500" />
        </div>
        <p className="mt-1 flex items-end justify-center leading-none text-orange-600">
          <span className="text-8xl font-extrabold tracking-tight">
            {percent}
          </span>
          <span className="mb-1 ml-1 text-2xl font-bold text-zinc-900">点</span>
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-zinc-900">{comment}</p>
        <p className="mx-auto max-w-xs text-sm leading-relaxed text-zinc-600">
          {SUB_MESSAGE}
        </p>
      </div>

      <div className="relative w-full max-w-xs overflow-hidden rounded-2xl text-left text-white shadow-lg">
        <img
          src={withBasePath("/images/others/komaba.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/15 to-slate-900/70" />
        <div className="relative flex aspect-[4/5] flex-col p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold">駒場検定</p>
              <p className="text-[10px] tracking-widest text-white/80">
                KOMABA TEST
              </p>
            </div>
            <p className="text-[10px] text-white/80">{formatToday()}</p>
          </div>
          <div className="mt-auto">
            <p className="flex items-end leading-none">
              <span className="text-5xl font-extrabold">{percent}</span>
              <span className="ml-1 text-xl font-bold">点</span>
            </p>
            <p className="mt-2 line-clamp-2 text-sm font-medium">{comment}</p>
            <p className="mt-3 text-xs text-white/70"># 駒場検定</p>
          </div>
        </div>
      </div>

      <div className="mt-2 w-full max-w-xs space-y-4">
        <p className="text-sm font-semibold text-zinc-700">
          結果をシェアして友だちに自慢しよう！
        </p>
        <ShareButtons percent={percent} comment={comment} />
      </div>

      <button
        onClick={onShowRoute}
        className="mt-2 w-full max-w-xs rounded-full bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow-md transition active:scale-95 hover:bg-orange-700"
      >
        おすすめルートを見る
      </button>
    </div>
  );
}
