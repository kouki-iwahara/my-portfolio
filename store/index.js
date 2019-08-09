import firebase from '@/plugins/firebase'

export const actions = {
  async storageData(
    { state },
    {movieTitle,
    category,
    movieImage,
    memoryText}) {
    const db = firebase.firestore();
    await db.collection('movies').add({
      userId: firebase.auth().currentUser.uid, //自分の投稿履歴の検索用
      userImage: state.userImage,
      userName: state.userName,
      title: movieTitle,
      category: category,
      image: movieImage,
      text: memoryText,
      created: firebase.firestore.FieldValue.serverTimestamp() //日付順にソートする為
    });
  },
  async upLoadMovieImage(ctx, file) {
    await firebase.storage().ref().child(`images/${file.name}`).put(file);
  },
  async downLoadMovieImage(ctx, file) {
    return await firebase.storage().ref().child(`images/${file.name}`).getDownloadURL();
  },
}



