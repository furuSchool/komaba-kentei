export type RouteKey = "route1" | "route2" | "route3" | "route4" | "route5";

export interface Choice {
  id: number;
  image: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  correctChoiceId: number;
  /** Per-route points: added when the question is answered correctly, subtracted when incorrect. */
  scoring: Record<RouteKey, number>;
  /**
   * Attribution for an externally-sourced choice image, shown as a
   * question-level note (not attached to any one choice) so it doesn't
   * hint which option is the real photo.
   */
  citation?: {
    label: string;
    url: string;
  };
}

export interface SpotStop {
  type: "spot";
  name: string;
  image: string;
  description: string;
  stayMinutes: number;
  hours?: string;
  websiteUrl?: string;
  instagramUrl?: string;
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
