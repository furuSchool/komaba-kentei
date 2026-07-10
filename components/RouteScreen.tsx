"use client";

import { useState } from "react";
import { withBasePath } from "@/lib/paths";
import type { RouteData, RouteKey } from "@/lib/types";
import { InstagramIcon } from "./icons/BrandIcons";

function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
    </svg>
  );
}

interface Props {
  recommendedRouteKey: RouteKey;
  routes: Record<RouteKey, RouteData>;
  onBack: () => void;
}

const ROUTE_ORDER: RouteKey[] = ["route1", "route2", "route3", "route4", "route5"];

const ROUTE_LABELS: Record<RouteKey, string> = {
  route1: "ルート1",
  route2: "ルート2",
  route3: "ルート3",
  route4: "ルート4",
  route5: "ルート5",
};

export default function RouteScreen({
  recommendedRouteKey,
  routes,
  onBack,
}: Props) {
  const [index, setIndex] = useState(ROUTE_ORDER.indexOf(recommendedRouteKey));

  const routeKey = ROUTE_ORDER[index];
  const route = routes[routeKey];
  const isRecommended = routeKey === recommendedRouteKey;

  function handlePrev() {
    setIndex((i) => (i - 1 + ROUTE_ORDER.length) % ROUTE_ORDER.length);
  }

  function handleNext() {
    setIndex((i) => (i + 1) % ROUTE_ORDER.length);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 bg-zinc-50 px-5 py-8">
      <div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="前のルートを見る"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-orange-600 shadow-sm transition active:scale-95"
          >
            <span aria-hidden>←</span>
          </button>

          <div className="text-center">
            <p className="text-sm font-bold text-orange-600">
              {isRecommended ? "あなたにおすすめの" : ""}
              {ROUTE_LABELS[routeKey]}
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-zinc-900">
              {route.title}
            </h2>
          </div>

          <button
            onClick={handleNext}
            aria-label="次のルートを見る"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-orange-600 shadow-sm transition active:scale-95"
          >
            <span aria-hidden>→</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          {ROUTE_ORDER.map((key) => (
            <span
              key={key}
              className={`h-1.5 rounded-full transition-all ${
                key === routeKey
                  ? "w-5 bg-orange-600"
                  : "w-1.5 bg-orange-200"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-zinc-500">
          ← → で他のルートも見てみよう
        </p>
      </div>

      <div className="relative pl-9">
        <div className="absolute left-3 top-2 bottom-2 border-l-2 border-dashed border-orange-400" />

        {route.stops.map((stop, stopIndex) =>
          stop.type === "spot" ? (
            <div key={stopIndex} className="relative mb-6 flex gap-4">
              <span className="absolute -left-9 top-1 h-4 w-4 rounded-full border-4 border-orange-600 bg-white" />
              <img
                src={withBasePath(stop.image)}
                alt={stop.name}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm"
              />
              <div className="flex-1 text-left">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-zinc-900">{stop.name}</p>
                  {(stop.instagramUrl || stop.websiteUrl) && (
                    <div className="flex shrink-0 gap-1.5">
                      {stop.instagramUrl && (
                        <a
                          href={stop.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${stop.name}のInstagramを見る`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] shadow-sm transition active:scale-95"
                        >
                          <InstagramIcon className="h-4 w-4 text-white" />
                        </a>
                      )}
                      {stop.websiteUrl && (
                        <a
                          href={stop.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${stop.name}の公式サイトを見る`}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 shadow-sm transition active:scale-95"
                        >
                          <WebsiteIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm text-zinc-600">{stop.description}</p>
                {stop.hours && (
                  <p className="mt-1 text-xs text-zinc-500">
                    営業時間: {stop.hours}
                  </p>
                )}
                <p className="mt-1 text-xs font-semibold text-orange-700">
                  滞在目安: 約{stop.stayMinutes}分
                </p>
              </div>
            </div>
          ) : (
            <div key={stopIndex} className="relative mb-6 pl-1 text-left">
              <span className="absolute -left-8 top-0.5 h-2 w-2 rounded-full bg-orange-300" />
              <a
                href={stop.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-blue-600 underline"
              >
                {stop.transportMode}で約{stop.moveMinutes}分（経路をGoogleマップで見る）
              </a>
            </div>
          )
        )}
      </div>

      <button
        onClick={onBack}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow-md transition active:scale-95 hover:bg-orange-700"
      >
        <span aria-hidden>←</span>
        診断結果に戻る
      </button>
    </div>
  );
}
