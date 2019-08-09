import firebase from '@/plugins/firebase'

export const state = () => ({
  userName: 'guest',
<<<<<<< HEAD
  userImage: '',
=======
  userImage: ''
>>>>>>> 153125ed1d8c9009c1e509fcf374ad6667693e97
});

export const mutations = {
  setUserWithNameAndImage(state, {userName, photoURL}) {
    state.userName = userName,
    state.userImage = photoURL
  }
};

export const actions = {
<<<<<<< HEAD
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
=======
  upLoadImage(ctx, file) {
    return firebase.storage().ref().child(`images/${file.name}`).put(file)
    .then((snapshot) => {
      console.log(snapshot) //確認用
    })
    .catch((error) => {
      alert(error);
    });
  },
  downLoadImage(ctx, file) {
    return firebase.storage().ref().child(`images/${file.name}`).getDownloadURL()
    .then((url) => {
>>>>>>> 153125ed1d8c9009c1e509fcf374ad6667693e97
      return url;
    })
    .catch((error) => {
      alert(error);
    });
  },
<<<<<<< HEAD
  async setUserData(ctx, {userName, userImage}) {
    const userData = firebase.auth().currentUser;
    await userData.updateProfile({
      displayName: userName,
      photoURL: userImage
    });
  },
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
  showUserNameOnAlert(ctx) {
    const userData = firebase.auth().currentUser;
    console.log(userData);
    alert(`こんにちは、${userData.displayName}さん！登録完了です！` );
  }
}


=======
  storageData(
    { state },
    {movieTitle,
    category,
    movieImage,
    memoryText}) {
    const db = firebase.firestore();
    return db.collection('movies').add({
      userId: firebase.auth().currentUser.uid, //自分の投稿履歴の検索用
      userImage: state.userImage,
      userName: state.userName,
      title: movieTitle,
      category: category,
      image: movieImage,
      text: memoryText,
      created: firebase.firestore.FieldValue.serverTimestamp() //日付順にソートする為
    })
    .then((doc) => {
      console.log(doc)
    })
    .catch((error) => {
      alert(error);
    });
  },
  isLogin() {
    firebase.auth().onAuthStateChanged(user => {
      return user;
    });
  }
}
>>>>>>> 153125ed1d8c9009c1e509fcf374ad6667693e97
