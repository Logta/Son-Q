import { firestore } from "@/plugins/firebase";
import { Auth, Question } from "@/models";
import _ from "lodash";

const getQuestionNum = async (projectId: string): Promise<number> => {
  const proj = await firestore.collection("projects").doc(projectId).get();
  return _.isNil(proj) || _.isNil(proj.data()) ? 0 : +proj.data().question_num;
};

const getQuestion = async (user: Auth, projectId: string) => {
  const questions: Array<Question> = [];

  let snapShot = await firestore
    .collection("projects")
    .doc(projectId)
    .collection("questions")
    .where("select_user_id", "==", user.id)
    .get();
  snapShot.docs.map((doc) => {
    questions.push({
      ID: doc.id,
      no: doc.data().no,
      url: doc.data().url,
      select_user_id: doc.data().select_user_id,
    });
  });
  return questions;
};

const createQuestion = async (
  user: Auth,
  question: Question,
  projectId: string
) => {
  let collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("questions");
  collection.add({
    no: 0,
    url: question.url,
    select_user_id: user.id,
  });
};

const updateQuestion = async (
  user: Auth,
  question: Question,
  projectId: string
) => {
  let collection = firestore
    .collection("projects")
    .doc(projectId)
    .collection("questions");
  collection.doc(question.ID).set({
    no: 0,
    url: question.url,
    select_user_id: user.id,
  });
};

const registerQuestion = async (
  user: Auth,
  questions: Array<Question>,
  projectId: string
) => {
  for (const question of questions) {
    if (_.isNil(question)) continue;

    if (question.ID !== "") {
      updateQuestion(user, question, projectId);
    } else {
      createQuestion(user, question, projectId);
    }
  }
};

export { getQuestion, registerQuestion, getQuestionNum };
