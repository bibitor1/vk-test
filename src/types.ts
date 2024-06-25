export interface Story {
  id: number;
  title: string;
  score: number;
  by: string;
  descendants: number;
  kids?: number[];
  url?: string;
}

export interface Comment {
  id: number;
  by: string;
  text: string;
  kids?: number[];
  parent: number;
}
