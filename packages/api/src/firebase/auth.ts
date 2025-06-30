import { auth } from "../plugins/firebase";
import type { Auth } from "@son-q/types";

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const awaitOnAuth = async (): Promise<Auth> => {
  return new Promise(function (resolve, reject) {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName || '',
        });
      } else {
        console.log("Failed!!");
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
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName || '',
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
        reject({
          ok: false,
          id: "",
          name: "",
        });
      });
  });
};

const awaitOnPasswordLogin = async (data: any): Promise<Auth> => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        resolve({
          ok: true,
          id: user.uid,
          name: user.displayName || '',
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        reject({
          ok: false,
          id: "",
          name: "",
        });
      });
  });
};

const signOutFirebase = async (): Promise<Auth> => {
  return new Promise(function (resolve, reject) {
    signOut(auth)
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
};

const createPasswordUser = async (data: any): Promise<boolean> => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    return true;
  } catch (e) {
    console.error('Create user error:', e instanceof Error ? e.message : String(e));
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
