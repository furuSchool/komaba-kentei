import { withBasePath } from "@/lib/paths";

interface Props {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <img
        src={withBasePath("/images/dummy.png")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <header className="flex items-center px-5 py-4">
          <div className="leading-none">
            <p className="text-lg font-extrabold tracking-tight text-zinc-900 drop-shadow-sm">
              駒場検定
            </p>
            <p className="text-[10px] font-semibold tracking-widest text-zinc-800/90 drop-shadow-sm">
              KOMABA TEST
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-12 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-amber-900">
              駒場検定
            </h1>
            <p className="text-sm text-zinc-600">
              全10問のクイズであなたの「駒場理解度」を診断しよう
            </p>
          </div>
        </div>

        <div className="px-6 pb-10">
          <button
            onClick={onStart}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition active:scale-95 hover:bg-orange-700"
          >
            検定をはじめる
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
