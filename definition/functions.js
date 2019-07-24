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
  userName, 
  store) {
  await firebase.auth().
        createUserWithEmailAndPassword(userMail, password);
  await setUserData(userName, store);
};

// ユーザー名を画面に表示する
// TODO: プロフィール画像も表示させる
export function showUserData (store, router) {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      store.commit('setDisplayName', user.displayName);
    } else {
      router.push({path: '/'});
    };
  });
};