import {
  getCorrectPoint,
  getOnlyOneCorrectAnswer,
  getDuplicateDeletionArray,
  getOnlyOneIncorrectAnswer,
} from "../../utils";

import { Answer } from "@/models";

describe("getCorrectPoint", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = [
      {
        ID: "1",
        no: 1,
        guess_user_id: "u1",
        select_user_id: "u0",
        answer_user_id: "u1",
        url: "",
        question_id: "1",
      },
      {
        ID: "2",
        no: 2,
        guess_user_id: "u3",
        select_user_id: "u0",
        answer_user_id: "u1",
        url: "",
        question_id: "1",
      },
      {
        ID: "3",
        no: 3,
        guess_user_id: "u0",
        select_user_id: "u0",
        answer_user_id: "u2",
        url: "",
        question_id: "1",
      },
      {
        ID: "4",
        no: 4,
        guess_user_id: "u3",
        select_user_id: "u3",
        answer_user_id: "u2",
        url: "",
        question_id: "1",
      },
      {
        ID: "5",
        no: 5,
        guess_user_id: "u1",
        select_user_id: "u3",
        answer_user_id: "u3",
        url: "",
        question_id: "1",
      },
      {
        ID: "6",
        no: 6,
        guess_user_id: "u3",
        select_user_id: "u3",
        answer_user_id: "u3",
        url: "",
        question_id: "1",
      },
    ];
  });

  test("getCorrectPoint - Uncorrect", () => {
    expect(0).toBe(getCorrectPoint("u1", answers));
  });

  test("getCorrectPoint - Correct", () => {
    expect(2).toBe(getCorrectPoint("u2", answers));
  });

  test("getCorrectPoint - Correct", () => {
    expect(1).toBe(getCorrectPoint("u3", answers));
  });
});

describe("getDuplicateDeletionArray", (): void => {
  let answers: Array<string>;

  beforeEach(() => {
    answers = ["1", "2", "2", "3", "3", "3", "5", "5"];
  });

  test("getDuplicateDeletionArray", () => {
    const dubRemove = getDuplicateDeletionArray(answers);
    expect(["1", "2", "3", "5"]).toEqual(expect.arrayContaining(dubRemove));
  });
});

describe("getOnlyOneCorrectAnswer", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = [
      {
        ID: "1",
        no: 1,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u1",
        url: "",
        question_id: "1",
      },
      {
        ID: "2",
        no: 2,
        guess_user_id: "u3",
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "1",
      },
      {
        ID: "3",
        no: 3,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "1",
      },
      {
        ID: "4",
        no: 4,
        guess_user_id: "u3",
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "2",
      },
      {
        ID: "5",
        no: 5,
        guess_user_id: "u2",
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "2",
      },
      {
        ID: "6",
        no: 6,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "3",
      },
      {
        ID: "7",
        no: 7,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "3",
      },
    ];
  });

  test("getOnlyOneCorrectAnswer", () => {
    expect(1).toBe(getOnlyOneCorrectAnswer("u1", answers, 3));
  });
});

describe("getOnlyOneIncorrectAnswer", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = [
      {
        ID: "1",
        no: 1,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u1",
        url: "",
        question_id: "1",
      },
      {
        ID: "2",
        no: 2,
        guess_user_id: "u3",
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "1",
      },
      {
        ID: "3",
        no: 3,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "1",
      },
      {
        ID: "4",
        no: 4,
        guess_user_id: "u3",
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "2",
      },
      {
        ID: "5",
        no: 5,
        guess_user_id: "u2",
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "2",
      },
      {
        ID: "6",
        no: 6,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "3",
      },
      {
        ID: "7",
        no: 7,
        guess_user_id: "u1",
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "3",
      },
    ];
  });

  test("getOnlyOneIncorrectAnswer", () => {
    expect(1).toBe(getOnlyOneIncorrectAnswer("u1", answers, 3));
  });
});
