import firebase from '@/plugins/firebase'

// ユーザー名を登録する関数の宣言
export function setDisplayName (userName, store) {
  const userData = firebase.auth().currentUser;
  
  // ユーザーのdisplayNameを更新し、stateのuserNameを書き換える
  return userData.updateProfile({
    displayName: userName
  })
  .then(() => {
    store.commit('setDisplayName', userData.displayName);
  })
};

// ユーザーの名前、メール、パスワード登録を実行する関数の宣言
export async function createAccount(userMail, password, userName, store) {
  await firebase.auth().
  createUserWithEmailAndPassword(userMail, password)
  await setDisplayName(userName, store)
};