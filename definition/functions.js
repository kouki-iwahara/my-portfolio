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

// ログイン状況を真偽値で判定し、条件分岐に使おうとしたコード。 真偽値が返らない
// export function isLogin() {
//   return firebase.auth().onAuthStateChanged(user => {
//      if(user) {
//        return true;
//      } else {
//        return false;
//      }
//   });
// }