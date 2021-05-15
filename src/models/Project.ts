import { Participant } from "./Participant";

type Project = {
  ID: string;
  name: string;
  content: string;
  creater: string;
  question_num: number;
  project_mode: string;
  participants: Participant[];
};

export type { Project };
