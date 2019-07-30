import firebase from '@/plugins/firebase'

export const state = () => ({
  userName: 'guest',
  userImage: ''
});

export const mutations = {
  setDisplayName(state, user) {
    state.userName = user
  }
};

export const actions = {
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
      return url;
    })
    .catch((error) => {
      alert(error);
    });
  },
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