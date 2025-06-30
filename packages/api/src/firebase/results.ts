import type { Answer, Auth, Result } from "@son-q/types";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from "../plugins/firebase";

const getResult = async (projectId: string) => {
  const results: Array<Result> = [];

  const docsRef = collection(firestore, "projects", projectId, "results");

  await getDocs(docsRef).then((snapshot) => {
    snapshot.forEach((doc) => {
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
  });

  return results;
};

const createResult = async (user: Auth, result: Result, projectId: string, questionNo: number) => {
  try {
    await addDoc(collection(firestore, "projects", projectId, "results"), {
      no: questionNo,
      url: result.url,
      guess_user_id: result.guess_user_id,
      select_user_id: result.select_user_id,
      result_user_id: user.id,
      user_name: user.name,
    });
    return { message: "作成が完了しました", variant: "success" };
  } catch {
    return { message: "作成に失敗しました", variant: "error" };
  }
};

const updateResult = async (result: Result, projectId: string, questionNo: number) => {
  const washingtonRef = doc(firestore, "projects", projectId, "results", result.ID);
  await updateDoc(washingtonRef, {
    no: questionNo,
    url: result.url,
    guess_user_id: result.guess_user_id,
    select_user_id: result.select_user_id,
  });
};

const registerResult = (user: Auth, results: Array<Result>, projectId: string) => {
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

  const docsRef = collection(firestore, "projects", projectId, "answers");

  await getDocs(docsRef).then((snapshot) => {
    snapshot.forEach((doc) => {
      const answer: Answer = {
        ID: doc.id,
        no: doc.data().no,
        url: doc.data().url,
        select_user_id: doc.data().select_user_id,
        guess_user_id: doc.data().guess_user_id,
        answer_user_id: doc.data().answer_user_id,
        question_id: doc.data().question_id,
      };
      answers.push(answer);
    });
  });

  return answers;
};

// プロジェクトモードを取得
const getProjectMode = async (projectId: string) => {
  let projectMode: string = "normal";
  const docRef = doc(firestore, "projects", projectId);
  const proj = await getDoc(docRef);

  if (proj.exists()) {
    const data = proj.data();
    projectMode = data?.project_mode || "normal";
  } else {
    console.warn("Project document not found for project mode, ID:", projectId);
  }
  return projectMode;
};

export { getResult, registerResult, getAllAnswers, getProjectMode };
