import { describe, expect, it } from "vitest";
import type { Answer, Participant, Question } from "@son-q/types";
import { getQuestioner, getRespondent } from "../ResultGetter";

describe("ResultGetter", () => {
  // テスト用のモックデータ
  const mockParticipants: Array<Participant> = [
    { user_id: "user1", user_name: "田中太郎" },
    { user_id: "user2", user_name: "佐藤花子" },
    { user_id: "user3", user_name: "山田次郎" },
  ];

  const mockQuestion: Question = {
    ID: "question1",
    no: 1,
    url: "https://example.com/song1",
    select_user_id: "user1",
  };

  const mockAnswers: Array<Answer> = [
    {
      ID: "answer1",
      no: 1,
      answer_user_id: "user2",
      url: "https://example.com/song1",
      select_user_id: "user1",
      guess_user_id: "user3",
      question_id: "question1",
    },
    {
      ID: "answer2",
      no: 1,
      answer_user_id: "user3",
      url: "https://example.com/song1",
      select_user_id: "user1",
      guess_user_id: "user2",
      question_id: "question1",
    },
  ];

  describe("getQuestioner", () => {
    it("正常ケース: 質問者のユーザー名を正しく取得できる", () => {
      // Arrange: 既にmockParticipantsとmockQuestionが設定済み

      // Act: 実際の処理を実行
      const result = getQuestioner(mockParticipants, mockQuestion);

      // Assert: 結果を検証
      expect(result).toBe("田中太郎");
    });

    it("異常ケース: 存在しないユーザーIDの場合は空文字を返す", () => {
      // Arrange: 存在しないユーザーIDを持つ質問を設定
      const invalidQuestion: Question = {
        ID: "question2",
        no: 2,
        url: "https://example.com/song1",
        select_user_id: "nonexistent",
      };

      // Act: 実際の処理を実行
      const result = getQuestioner(mockParticipants, invalidQuestion);

      // Assert: 結果を検証
      expect(result).toBe("");
    });

    it("境界値テスト: 空の参加者配列の場合は空文字を返す", () => {
      // Arrange: 空の参加者配列を設定
      const emptyParticipants: Array<Participant> = [];

      // Act: 実際の処理を実行
      const result = getQuestioner(emptyParticipants, mockQuestion);

      // Assert: 結果を検証
      expect(result).toBe("");
    });

    it("境界値テスト: user_nameがundefinedの参加者の場合は空文字を返す", () => {
      // Arrange: user_nameがundefinedの参加者を設定
      const participantsWithUndefinedName: Array<Participant> = [
        { user_id: "user1", user_name: undefined as unknown as string },
      ];

      // Act: 実際の処理を実行
      const result = getQuestioner(participantsWithUndefinedName, mockQuestion);

      // Assert: 結果を検証
      expect(result).toBe("");
    });
  });

  describe("getRespondent", () => {
    const ansUser: Participant = { user_id: "user2", user_name: "佐藤花子" };

    it("正常ケース: 回答者の推測したユーザー名を正しく取得できる", () => {
      const result = getRespondent(ansUser, mockParticipants, mockQuestion, mockAnswers);
      expect(result).toBe("山田次郎");
    });

    it("異常ケース: 対応する回答が見つからない場合は空文字を返す", () => {
      const noMatchAnswers: Array<Answer> = [
        {
          ID: "answer3",
          no: 1,
          answer_user_id: "user1", // 異なるユーザー
          url: "https://example.com/song1",
          select_user_id: "user1",
          guess_user_id: "user3",
          question_id: "question1",
        },
      ];
      const result = getRespondent(ansUser, mockParticipants, mockQuestion, noMatchAnswers);
      expect(result).toBe("");
    });

    it("異常ケース: URLが一致しない場合は空文字を返す", () => {
      const differentUrlAnswers: Array<Answer> = [
        {
          ID: "answer4",
          no: 1,
          answer_user_id: "user2",
          url: "https://example.com/song2", // 異なるURL
          select_user_id: "user1",
          guess_user_id: "user3",
          question_id: "question1",
        },
      ];
      const result = getRespondent(ansUser, mockParticipants, mockQuestion, differentUrlAnswers);
      expect(result).toBe("");
    });

    it("異常ケース: select_user_idが一致しない場合は空文字を返す", () => {
      const differentSelectUserAnswers: Array<Answer> = [
        {
          ID: "answer5",
          no: 1,
          answer_user_id: "user2",
          url: "https://example.com/song1",
          select_user_id: "user2", // 異なるselect_user_id
          guess_user_id: "user3",
          question_id: "question1",
        },
      ];
      const result = getRespondent(ansUser, mockParticipants, mockQuestion, differentSelectUserAnswers);
      expect(result).toBe("");
    });

    it("異常ケース: 推測されたユーザーが参加者に存在しない場合は空文字を返す", () => {
      const invalidGuessAnswers: Array<Answer> = [
        {
          ID: "answer6",
          no: 1,
          answer_user_id: "user2",
          url: "https://example.com/song1",
          select_user_id: "user1",
          guess_user_id: "nonexistent", // 存在しないユーザー
          question_id: "question1",
        },
      ];
      const result = getRespondent(ansUser, mockParticipants, mockQuestion, invalidGuessAnswers);
      expect(result).toBe("");
    });

    it("境界値テスト: 空の回答配列の場合は空文字を返す", () => {
      const result = getRespondent(ansUser, mockParticipants, mockQuestion, []);
      expect(result).toBe("");
    });

    it("境界値テスト: 空の参加者配列の場合は空文字を返す", () => {
      const result = getRespondent(ansUser, [], mockQuestion, mockAnswers);
      expect(result).toBe("");
    });

    it("境界値テスト: guess_user_idに対応するuser_nameがundefinedの場合は空文字を返す", () => {
      const participantsWithUndefinedName: Array<Participant> = [
        { user_id: "user1", user_name: "田中太郎" },
        { user_id: "user2", user_name: "佐藤花子" },
        { user_id: "user3", user_name: undefined as unknown as string },
      ];
      const result = getRespondent(ansUser, participantsWithUndefinedName, mockQuestion, mockAnswers);
      expect(result).toBe("");
    });
  });

  describe("統合テスト", () => {
    it("実際のゲームフローでの動作確認", () => {
      // シナリオ: user1が質問を選択し、user2がuser3だと推測
      const questioner = getQuestioner(mockParticipants, mockQuestion);
      const respondent = getRespondent(mockParticipants[1], mockParticipants, mockQuestion, mockAnswers);
      
      expect(questioner).toBe("田中太郎");
      expect(respondent).toBe("山田次郎");
    });
  });
});