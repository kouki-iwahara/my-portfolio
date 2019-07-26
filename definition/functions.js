import firebase from '@/plugins/firebase'

// ユーザー名を登録
// TODO: プロフィール画像も登録する
export function setUserData (userName) {
  const userData = firebase.auth().currentUser;
  return userData.updateProfile({
    displayName: userName
  });
};

// アカウントに必要なユーザーデータを登録
export async function createAccount(
  userMail,
  password, 
  userName) {
  await firebase.auth().
        createUserWithEmailAndPassword(userMail, password);
  await setUserData(userName);
};