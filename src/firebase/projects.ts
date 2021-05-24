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
      question_num: doc.data().question_num,
      project_mode: doc.data().project_mode,
      ID: doc.id,
      participants: doc.data().participants,
    });
  });

  return projects;
};

const createProject = async (user: Auth, data: Project) => {
  try {
    let collection = firestore.collection("projects");
    await collection.add({
      name: data.name,
      content: data.content,
      question_num: data.question_num,
      creater: user.id,
      project_mode: data.project_mode,
      participants: [
        {
          user_id: user.id,
          user_name: user.name,
        },
      ],
    });
    alert("作成が完了しました");
  } catch {
    alert("作成に失敗しました");
  }
};

const deleteProject = async (index: string) => {
  let collection = firestore.collection("projects");
  collection
    .doc(index)
    .delete()
    .catch(function (error) {
      alert("削除に失敗しました");
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
        alert("入力IDはありません");
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
          alert("更新が完了しました");
        })
        .catch(function (error) {
          alert("更新に失敗しました");
          console.error("Error updating document: ", error);
        });
    })
    .catch(function (error) {
      alert("更新に失敗しました");
      console.log("Error getting document:", error);
    });
};

const getProjectFromID = async (projectId: string) => {
  let snapShot = await firestore.collection("projects").doc(projectId).get();
  return {
    name: snapShot.data().name,
    content: snapShot.data().content,
    creater: snapShot.data().creater,
    question_num: snapShot.data().question_num,
    ID: snapShot.id,
    participants: snapShot.data().participants,
    project_mode: snapShot.data().project_mode,
  };
};

const updateProject = async (projectId: string, data: Project) => {
  const project = firestore.collection("projects");
  await project
    .doc(projectId)
    .set(
      {
        name: data.name,
        content: data.content,
        question_num: data.question_num,
        project_mode: data.project_mode,
      },
      { merge: true }
    )
    .then(function () {
      alert("更新が完了しました");
    })
    .catch(function (error) {
      alert("更新に失敗しました");
      console.error("Error updating document: ", error);
    });
};

export {
  getProject,
  createProject,
  deleteProject,
  joinProject,
  getProjectFromID,
  updateProject,
};
