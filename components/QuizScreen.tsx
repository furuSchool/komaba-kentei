"use client";

import { useState } from "react";
import { withBasePath } from "@/lib/paths";
import type { Question } from "@/lib/types";

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (choiceId: number) => void;
}

const HIGHLIGHT_DELAY_MS = 500;

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function handleSelect(choiceId: number) {
    if (selectedId !== null) return;
    setSelectedId(choiceId);
    setTimeout(() => {
      onAnswer(choiceId);
    }, HIGHLIGHT_DELAY_MS);
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-5 py-8">
      <div className="text-center text-sm font-semibold text-amber-700">
        {questionNumber}/{totalQuestions}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          return (
            <button
              key={choice.id}
              onClick={() => handleSelect(choice.id)}
              disabled={selectedId !== null}
              className={`aspect-square overflow-hidden rounded-2xl border-4 transition ${
                isSelected
                  ? "border-amber-500 ring-4 ring-amber-300 scale-95"
                  : "border-transparent"
              }`}
            >
              <img
                src={withBasePath(choice.image)}
                alt={`選択肢${choice.id}`}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      <p className="text-center text-lg font-bold text-zinc-800">
        {question.text}
      </p>
    </div>
  );
}
