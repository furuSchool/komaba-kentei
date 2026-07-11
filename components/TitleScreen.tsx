import { withBasePath } from "@/lib/paths";

interface Props {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <img
        src={withBasePath("/images/others/yasuda.jpg")}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/75" />

      <div className="relative z-10 flex flex-1 flex-col">
        <header className="flex items-center px-5 py-4">
          <div className="leading-none">
            <p className="text-lg font-extrabold tracking-tight text-white drop-shadow-sm">
              駒場検定
            </p>
            <p className="text-[10px] font-semibold tracking-widest text-white/80 drop-shadow-sm">
              KOMABA TEST
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-3 px-6 pt-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow">
            まだ知らない
            <br />
            駒場に、
            <br />
            <span className="text-orange-400">出会</span>おう。
          </h1>
          <p className="text-sm font-medium text-white/85">
            東大生のための
            <br />
            駒場キャンパス検定
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="max-w-[15rem] rounded-2xl bg-white/95 p-4 text-left shadow-lg backdrop-blur">
            <p className="text-sm font-bold leading-snug text-zinc-800">
              どこまで知ってる？
              <br />
              あなたの駒場力を
              <br />
              試してみよう！
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
