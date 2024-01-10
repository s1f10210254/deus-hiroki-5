/* eslint-disable */
export type Riddle = {
  id: string;
  title: string;
  question: string;
  answer: string;
  createdAt: string;
  createdBy: string;
};

export type RiddleCreate = {
  title: string;
  question: string;
  answer: string;
};

export type Guess = {
  id: string;
  riddleId: string;
  userId: string;
  guess: string;
  isCorrect: boolean;
  createdAt: string;
};

export type GuessCreate = {
  guess: string;
};
