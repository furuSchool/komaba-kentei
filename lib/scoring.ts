import type { Answer, Question, QuizData, RouteKey } from "./types";

const ROUTE_KEYS: RouteKey[] = ["route1", "route2", "route3", "route4", "route5"];

export function gradeAnswers(
  questions: Question[],
  selections: Record<string, number>
): Answer[] {
  return questions.map((q) => ({
    questionId: q.id,
    choiceId: selections[q.id],
    correct: selections[q.id] === q.correctChoiceId,
  }));
}

export function calcUnderstandingPercent(answers: Answer[]): number {
  const correctCount = answers.filter((a) => a.correct).length;
  return Math.round((correctCount / answers.length) * 100);
}

export function calcCorrectCount(answers: Answer[]): number {
  return answers.filter((a) => a.correct).length;
}

/** Sums per-route scoring deltas across all answered questions and returns
 * the route key with the lowest total score (the route the user knows least about). */
export function pickRecommendedRoute(
  questions: Question[],
  answers: Answer[]
): RouteKey {
  const totals: Record<RouteKey, number> = {
    route1: 0,
    route2: 0,
    route3: 0,
    route4: 0,
    route5: 0,
  };

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;
    const sign = answer.correct ? 1 : -1;
    for (const key of ROUTE_KEYS) {
      totals[key] += sign * question.scoring[key];
    }
  }

  return ROUTE_KEYS.reduce((lowest, key) =>
    totals[key] < totals[lowest] ? key : lowest
  , ROUTE_KEYS[0]);
}

const COMMENT_TIERS = 6;

/** Buckets the answer rate into 6 tiers (0-5) by flooring rate*6, so the
 * comment set stays fixed at 6 stages regardless of the question count. */
export function calcCommentTier(answers: Answer[]): number {
  const rate = calcCorrectCount(answers) / answers.length;
  return Math.min(COMMENT_TIERS - 1, Math.floor(rate * COMMENT_TIERS));
}

export function getComment(quiz: QuizData, tier: number): string {
  return quiz.comments[String(tier)] ?? "";
}
