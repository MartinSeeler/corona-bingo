export type GameSheet = {
  completed: string;
  words: string;
};

export type Game = {
  creator: string;
  created: number;
  players: {
    [uid: string]: GameSheet;
  };
};
