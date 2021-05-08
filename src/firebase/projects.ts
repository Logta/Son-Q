import { firestore } from "@/plugins/firebase";
import { Auth, Project } from "@/models";

const getProject = async (user: Auth) => {
  const projects: Array<Project> = [];

  let snapShot = await firestore
    .collection("projects")
    .where("participants", "array-contains", {
      user_id: user.id,
      user_name: user.name,
    })
    .get();
  snapShot.docs.map((doc) => {
    projects.push({
      name: doc.data().name,
      content: doc.data().content,
      creater: doc.data().creater,
      questionNum: doc.data().questionNum,
      ID: doc.id,
      participants: doc.data().participants,
    });
  });

  return projects;
};

const createProject = async (user: Auth, data: Project) => {
  let collection = firestore.collection("projects");
  collection.add({
    name: data.name,
    content: data.content,
    questionNum: data.questionNum,
    creater: user.id,
    participants: [
      {
        user_id: user.id,
        user_name: user.name,
      },
    ],
  });
};

const deleteProject = async (index: string) => {
  let collection = firestore.collection("projects");
  collection
    .doc(index)
    .delete()
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

///プロジェクトに参加する
const joinProject = async (user: Auth, id: string) => {
  let postRef = firestore.collection("projects").doc(id);
  await postRef
    .get()
    .then(async function (doc: any) {
      if (!doc.exists) {
        console.log("入力IDはありません");
        return;
      }
      const participants = JSON.parse(JSON.stringify(doc.data().participants));
      const exist = await doc
        .data()
        .participants.some((p: any) => p.user_id === user.id);
      if (exist) return;
      participants.push({
        user_id: user.id,
        user_name: user.name,
      });
      let document = firestore.collection("projects").doc(id);
      await document
        .update({
          participants: participants,
        })
        .then(function () {
          console.log("更新が完了しました");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};

export { getProject, createProject, deleteProject, joinProject };
