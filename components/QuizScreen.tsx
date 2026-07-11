"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";
import ClipSafeImage from "./ClipSafeImage";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (choiceId: number) => void;
}

const CHOICE_LABELS = ["A", "B", "C", "D"];

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleSelect(choiceId: number) {
    setSelectedId(choiceId);
  }

  function handleNext() {
    if (selectedId === null) return;
    onAnswer(selectedId);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 bg-zinc-50 px-5 py-8">
      <div>
        <p className="mb-3 text-center text-xl font-bold text-zinc-900">
          Question {questionNumber} / {totalQuestions}
        </p>
        <div className="flex gap-2">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < questionNumber ? "bg-orange-600" : "bg-zinc-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="mb-1 text-2xl font-extrabold text-orange-600">Q.</p>
        <p className="text-xl font-bold leading-relaxed text-zinc-900">
          {question.text}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {question.choices.map((choice, index) => {
          const isSelected = selectedId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              className={`relative aspect-[4/5] overflow-hidden rounded-2xl border-4 shadow-sm transition ${
                isSelected
                  ? "border-orange-600 ring-4 ring-orange-200 scale-95"
                  : "border-transparent"
              }`}
            >
              <span className="absolute -left-2 -top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-extrabold text-orange-600 shadow-md">
                {CHOICE_LABELS[index]}
              </span>
              <ClipSafeImage
                src={choice.image}
                alt={`選択肢${CHOICE_LABELS[index]}`}
                className="h-full w-full"
              />
            </button>
          );
        })}
      </div>

      <p className="text-center text-sm font-medium text-zinc-600">
        💡 タップして選択してください
      </p>
      {question.citation && (
        <p className="-mt-4 text-center text-[10px] text-zinc-400">
          画像出典:{" "}
          <a
            href={question.citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {question.citation.label}
          </a>
        </p>
      )}

      <button
        onClick={handleNext}
        disabled={selectedId === null}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow-md transition active:scale-95 hover:bg-orange-700 disabled:bg-zinc-300 disabled:shadow-none disabled:active:scale-100"
      >
        次の問題へ
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
