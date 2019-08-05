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
    .then((snapshot) => {
      console.log(snapshot);
    })
    .catch((error) => {
      alert(error)
    });
  },
  // ユーザのアイコン画像のダウンロードURLを取得
  async downLoadUserImage(ctx, file) {
    return await firebase.storage().ref().child(`images/${file.name}`).getDownloadURL()
    .then((url) => {
      console.log(url);
      return url;
    })
    .catch((error) => {
      alert(error);
    });
  },
  // ユーザの名前と画像を表示
  async showUser({commit}) {
    await firebase.auth().onAuthStateChanged(user => {
      if(user) {
        return user;
      }
    });
  },
}


