import { auth, firebase } from "@/plugins/firebase";
import { Auth } from "@/models";

import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const awaitOnAuth = async (): Promise<Auth> => {
  return new Promise(function (resolve, reject) {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName,
        });
      } else {
        reject({
          ok: false,
          id: "",
          name: "",
        });
      }
    });
  });
};

const awaitOnGoogleLogin = async (): Promise<Auth> => {
  const provider = new GoogleAuthProvider();

  return new Promise(function (resolve, reject) {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName,
        });
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        reject({
          ok: false,
          id: "",
          name: "",
        });
      });
  })
}

const awaitOnPasswordLogin = async (data: any): Promise<Auth> => {
  const res = await firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password);

  if (res) {
    var user = res.user;
    return {
      ok: true,
      id: user.uid,
      name: user.displayName,
    };
  } else {
    return {
      ok: false,
      id: "",
      name: "",
    };
  }
};

const signOutFirebase = async (): Promise<Auth> => {
  return new Promise(function (resolve, reject) {
    auth.onAuthStateChanged((user) => {
      auth
        .signOut()
        .then(() => {
          resolve({
            ok: true,
            id: "",
            name: "",
          });
        })
        .catch((error) => {
          reject({
            ok: false,
            id: "",
            name: `ログアウト時にエラーが発生しました (${error})`,
          });
        });
    });
  });
};

const createPasswordUser = async (data: any): Promise<boolean> => {
  const auth = firebase.auth();
  try {
    await auth.createUserWithEmailAndPassword(data.email, data.password);
    return true;
  } catch (e) {
    alert(JSON.stringify(e.message));
    return false;
  }
};

export {
  awaitOnAuth,
  awaitOnGoogleLogin,
  awaitOnPasswordLogin,
  createPasswordUser,
  signOutFirebase,
};
