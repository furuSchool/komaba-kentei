import { withBasePath } from "@/lib/paths";
import type { RouteData, RouteKey } from "@/lib/types";

interface Props {
  routeKey: RouteKey;
  route: RouteData;
  onRestart: () => void;
}

const ROUTE_LABELS: Record<RouteKey, string> = {
  route1: "ルート1",
  route2: "ルート2",
  route3: "ルート3",
};

export default function RouteScreen({ routeKey, route, onRestart }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-6 px-5 py-8">
      <div className="text-center">
        <p className="text-sm font-semibold text-amber-700">
          あなたにおすすめの{ROUTE_LABELS[routeKey]}
        </p>
        <h2 className="text-2xl font-extrabold text-zinc-800">
          {route.title}
        </h2>
      </div>

      <div className="relative pl-9">
        <div className="absolute left-3 top-2 bottom-2 border-l-2 border-dashed border-amber-400" />

        {route.stops.map((stop, index) =>
          stop.type === "spot" ? (
            <div key={index} className="relative mb-6 flex gap-4">
              <span className="absolute -left-9 top-1 h-4 w-4 rounded-full border-4 border-amber-500 bg-white" />
              <img
                src={withBasePath(stop.image)}
                alt={stop.name}
                className="h-20 w-20 shrink-0 rounded-xl object-cover shadow"
              />
              <div className="flex-1 text-left">
                <p className="font-bold text-zinc-800">{stop.name}</p>
                <p className="text-sm text-zinc-600">{stop.description}</p>
                <p className="mt-1 text-xs text-amber-700">
                  滞在目安: 約{stop.stayMinutes}分
                </p>
              </div>
            </div>
          ) : (
            <div key={index} className="relative mb-6 pl-1 text-left">
              <span className="absolute -left-8 top-0.5 h-2 w-2 rounded-full bg-amber-300" />
              <a
                href={stop.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 underline"
              >
                {stop.transportMode}で約{stop.moveMinutes}分（Googleマップで見る）
              </a>
            </div>
          )
        )}
      </div>

      <button
        onClick={onRestart}
        className="mt-2 w-full rounded-full border-2 border-amber-500 px-6 py-3 text-base font-bold text-amber-600 transition active:scale-95"
      >
        もう一度診断する
      </button>
    </div>
  );
}
