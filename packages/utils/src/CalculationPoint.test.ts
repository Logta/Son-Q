import type { Answer } from "@son-q/types";
import {
  getCorrectPoint,
  getDuplicateDeletionArray,
  getOnlyOneCorrectAnswer,
  getOnlyOneIncorrectAnswer,
  getCorrectAnswer,
  getPoint,
} from "@son-q/utils";

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

const getInitArray = () => {
  const answers: Array<Answer> = [];
  let num = 1;

  const ques = [...Array(6).keys()].map((i) => ++i);
  const partici = [...Array(6).keys()].map((i) => ++i);
  for (const q of ques) {
    for (const p of partici) {
      answers.push({
        ID: `${q}-${p}`,
        no: num,
        guess_user_id: `u${q > p ? "1" : "2"}`,
        select_user_id: "u1",
        answer_user_id: `u${p}`,
        url: "",
        question_id: `${q}`,
      });
      num++;
    }
  }
  return answers;
};

describe("getOnlyOneCorrectAnswer", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = getInitArray();
  });

  test("getOnlyOneCorrectAnswer", () => {
    expect(10).toBe(getOnlyOneCorrectAnswer("u1", answers, 6));
  });
});

describe("getOnlyOneIncorrectAnswer", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = answers = getInitArray();
  });

  test("getOnlyOneIncorrectAnswer", () => {
    expect(10).toBe(getOnlyOneIncorrectAnswer("u1", answers, 6));
  });
});

describe("getCorrectAnswer", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = [
      {
        ID: "1",
        no: 1,
        guess_user_id: "u1", // 正解
        select_user_id: "u1",
        answer_user_id: "u2",
        url: "",
        question_id: "q1",
      },
      {
        ID: "2",
        no: 2,
        guess_user_id: "u3", // 不正解
        select_user_id: "u1",
        answer_user_id: "u3",
        url: "",
        question_id: "q1",
      },
      {
        ID: "3",
        no: 3,
        guess_user_id: "u1", // 正解
        select_user_id: "u1",
        answer_user_id: "u4",
        url: "",
        question_id: "q2",
      },
      {
        ID: "4",
        no: 4,
        guess_user_id: "u1", // 自分の回答（除外される）
        select_user_id: "u1",
        answer_user_id: "u1",
        url: "",
        question_id: "q1",
      },
    ];
  });

  test("getCorrectAnswer - 正解数をカウント", () => {
    expect(2).toBe(getCorrectAnswer("u1", answers));
  });

  test("getCorrectAnswer - 別ユーザーの場合", () => {
    expect(0).toBe(getCorrectAnswer("u2", answers));
  });

  test("getCorrectAnswer - 空の回答配列", () => {
    expect(0).toBe(getCorrectAnswer("u1", []));
  });
});

describe("getPoint", (): void => {
  let answers: Array<Answer>;

  beforeEach(() => {
    answers = [
      {
        ID: "1",
        no: 1,
        guess_user_id: "u2",
        select_user_id: "u2",
        answer_user_id: "u1",
        url: "",
        question_id: "q1",
      },
    ];
  });

  test("getPoint - normal mode", () => {
    expect("1").toBe(getPoint("normal", "u1", answers, 4));
  });

  test("getPoint - getOnlyOneIncorrectAnswer mode", () => {
    const result = getPoint("getOnlyOneIncorrectAnswer", "u1", answers, 4);
    expect(result).toBe("1"); // getOnlyOneIncorrectAnswer(0) + getCorrectPoint(1)
  });

  test("getPoint - getOnlyOneCorrectAnswer mode", () => {
    const result = getPoint("getOnlyOneCorrectAnswer", "u1", answers, 4);
    expect(result).toBe("1"); // getOnlyOneCorrectAnswer(0) + getCorrectPoint(1)
  });

  test("getPoint - getCorrectAnswer mode", () => {
    const result = getPoint("getCorrectAnswer", "u1", answers, 4);
    expect(result).toBe("1"); // getCorrectAnswer(0) + getCorrectPoint(1)
  });

  test("getPoint - unknown mode", () => {
    expect("error").toBe(getPoint("unknown", "u1", answers, 4));
  });

  test("getPoint - 空文字列のmode", () => {
    expect("error").toBe(getPoint("", "u1", answers, 4));
  });
});
