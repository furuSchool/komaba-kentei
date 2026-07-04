export type RouteKey = "route1" | "route2" | "route3";

export interface Choice {
  id: number;
  image: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  correctChoiceId: number;
  scoring: {
    correct: Record<RouteKey, number>;
    incorrect: Record<RouteKey, number>;
  };
}

export interface SpotStop {
  type: "spot";
  name: string;
  image: string;
  description: string;
  stayMinutes: number;
}

export interface MoveStop {
  type: "move";
  moveMinutes: number;
  transportMode: string;
  googleMapsUrl: string;
}

export type Stop = SpotStop | MoveStop;

export interface RouteData {
  title: string;
  stops: Stop[];
}

export interface QuizData {
  questions: Question[];
  routes: Record<RouteKey, RouteData>;
  comments: Record<string, string>;
}

export interface Answer {
  questionId: string;
  choiceId: number;
  correct: boolean;
}
