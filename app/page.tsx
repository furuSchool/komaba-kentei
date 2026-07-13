"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";
import {
  calcCommentTier,
  calcUnderstandingPercent,
  gradeAnswers,
  getComment,
  pickRecommendedRoute,
} from "@/lib/scoring";
import type { Answer, QuizData } from "@/lib/types";
import TitleScreen from "@/components/TitleScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultScreen from "@/components/ResultScreen";
import RouteScreen from "@/components/RouteScreen";

type Screen = "loading" | "title" | "quiz" | "result" | "route";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    fetch(withBasePath("/data/quiz.json"))
      .then((res) => res.json())
      .then((data: QuizData) => {
        setQuiz(data);
        setScreen("title");
      });
  }, []);

  if (screen === "loading" || !quiz) {
    return (
      <div className="flex flex-1 items-center justify-center text-zinc-400">
        読み込み中...
      </div>
    );
  }

  function handleStart() {
    setQuestionIndex(0);
    setSelections({});
    setAnswers([]);
    setScreen("quiz");
  }

  function handleAnswer(choiceId: number) {
    if (!quiz) return;
    const question = quiz.questions[questionIndex];
    const nextSelections = { ...selections, [question.id]: choiceId };
    setSelections(nextSelections);

    if (questionIndex + 1 < quiz.questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const graded = gradeAnswers(quiz.questions, nextSelections);
      setAnswers(graded);
      setScreen("result");
    }
  }

  function handleShowRoute() {
    setScreen("route");
  }

  function handleBackToResult() {
    setScreen("result");
  }

  if (screen === "title") {
    return <TitleScreen onStart={handleStart} />;
  }

  if (screen === "quiz") {
    const question = quiz.questions[questionIndex];
    return (
      <QuizScreen
        key={question.id}
        question={question}
        questionNumber={questionIndex + 1}
        totalQuestions={quiz.questions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (screen === "result") {
    const percent = calcUnderstandingPercent(answers);
    const comment = getComment(
      quiz,
      calcCommentTier(answers, Object.keys(quiz.comments).length)
    );
    return (
      <ResultScreen
        percent={percent}
        comment={comment}
        onShowRoute={handleShowRoute}
      />
    );
  }

  if (screen === "route") {
    const recommendedRouteKey = pickRecommendedRoute(quiz.questions, answers);
    return (
      <RouteScreen
        recommendedRouteKey={recommendedRouteKey}
        routes={quiz.routes}
        onBack={handleBackToResult}
      />
    );
  }

  return null;
}
