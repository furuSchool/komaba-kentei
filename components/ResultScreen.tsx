import { withBasePath } from "@/lib/paths";
import ShareButtons from "./ShareButtons";

interface Props {
  percent: number;
  correctCount: number;
  totalQuestions: number;
  comment: string;
  onShowRoute: () => void;
}

export default function ResultScreen({
  percent,
  correctCount,
  totalQuestions,
  comment,
  onShowRoute,
}: Props) {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 px-6 py-10 text-center">
      <img
        src={withBasePath("/images/dummy.png")}
        alt="診断結果イラスト"
        className="w-40 h-40 rounded-3xl object-cover shadow-lg"
      />

      <div>
        <p className="text-sm text-zinc-500">
          {correctCount}/{totalQuestions}問正解
        </p>
        <p className="text-5xl font-extrabold text-amber-600">
          駒場理解度{percent}%
        </p>
      </div>

      <p className="max-w-xs text-base font-medium text-zinc-700">
        {comment}
      </p>

      <div className="mt-4 w-full max-w-xs space-y-4">
        <button
          onClick={onShowRoute}
          className="w-full rounded-full bg-amber-500 px-6 py-4 text-lg font-bold text-white shadow-md transition active:scale-95 hover:bg-amber-600"
        >
          おすすめルートを見る
        </button>
        <ShareButtons percent={percent} />
      </div>
    </div>
  );
}
