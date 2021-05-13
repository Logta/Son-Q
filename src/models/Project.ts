import { Participant } from "./Participant";

type Project = {
  ID: string;
  name: string;
  content: string;
  creater: string;
  question_num: number;
  participants: Participant[];
};

export type { Project };
