import { firestore } from "@/plugins/firebase";
import { Auth, Result, Answer } from "@/models";

const getResult = async (projectId: string) => {
  const results: Array<Result> = [];

  const ans = await firestore
    .collection("projects")
    .doc(projectId)
    .collection("results")
    .get();
  ans.forEach((doc: any) => {
    const result: Result = {
      ID: doc.id,
      no: doc.data().no,
      url: doc.data().url,
      guess_user_id: doc.data().guess_user_id,
      select_user_id: doc.data().select_user_id,
      result_user_id: doc.data().result_user_id,
    };
    results.push(result);
  });

  return results;
};

const createResult = async (
  user: Auth,
  result: Result,
  projectId: string,
  questionNo: number
) => {
  const collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("results");
  await collection.add({
    no: questionNo,
    url: result.url,
    guess_user_id: result.guess_user_id,
    select_user_id: result.select_user_id,
    result_user_id: user.id,
    user_name: user.name,
  });
};

const updateResult = async (
  result: Result,
  projectId: string,
  questionNo: number
) => {
  const collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("results");
  await collection.doc(result.ID).update({
    no: questionNo,
    url: result.url,
    guess_user_id: result.guess_user_id,
    select_user_id: result.select_user_id,
  });
};

const registerResult = (
  user: Auth,
  results: Array<Result>,
  projectId: string
) => {
  results.forEach((result, index) => {
    if (result && result.ID !== "") {
      updateResult(result, projectId, index);
    } else {
      createResult(user, result, projectId, index);
    }
  });
};

// 全件取得する
const getAllAnswers = async (projectId: string) => {
  const answers: Array<Answer> = [];
  const ans = await firestore
    .collection("projects")
    .doc(projectId)
    .collection("answers")
    .get();

  ans.forEach((doc) => {
    const answer: Answer = {
      ID: doc.id,
      no: doc.data().no,
      url: doc.data().url,
      select_user_id: doc.data().select_user_id,
      guess_user_id: doc.data().guess_user_id,
      answer_user_id: doc.data().answer_user_id,
    };
    answers.push(answer);
  });

  return answers;
};

export { getResult, registerResult, getAllAnswers };
