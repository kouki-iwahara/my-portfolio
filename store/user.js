import firebase from '@/plugins/firebase'

export const state = () => ({
  userName: 'guest',
  userImage: '',
});

export const mutations = {
  setUserWithNameAndImage(state, {userName, photoURL}) {
    state.userName = userName,
    state.userImage = photoURL
  }
};

export const actions = {
  // ユーザのアイコン画像をアップロード
  async upLoadUserImage(ctx, file) {
    await firebase.storage().ref().child(`images/${file.name}`).put(file)
  },
  // ユーザのアイコン画像のダウンロードURLを取得
  async downLoadUserImage(ctx, file) {
    return await firebase.storage().ref().child(`images/${file.name}`).getDownloadURL();
  },
  // ユーザデータを設定
  async setUserData(ctx, {userName, userImage}) {
    const userData = firebase.auth().currentUser;
    await userData.updateProfile({
      displayName: userName,
      photoURL: userImage
    });
  },
  // ユーザデータを登録し、アカウント作成
  async createAccount(
    {dispatch},
    {userMail,
    password, 
    userName,
    userImage}) {
    await firebase.auth().
          createUserWithEmailAndPassword(userMail, password);
    await dispatch('setUserData', {userName, userImage});
  },
  // ユーザの名前をアラートに表示
  showUserNameOnAlert(ctx) {
    const userData = firebase.auth().currentUser;
    console.log(userData);
    alert(`こんにちは、${userData.displayName}さん！登録完了です！` );
  },
}