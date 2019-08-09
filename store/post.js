import firebase from '@/plugins/firebase'

export const actions = {
  async storageData(
    { ctx },
    {movieTitle,
    category,
    movieImage,
    memoryText}) {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    await db.collection('movies').add({
      userId: user.uid, //自分の投稿履歴の検索用
      userImage: user.photoURL,
      userName: user.displayName,
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