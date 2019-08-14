import firebase from '@/plugins/firebase'
import {db} from '@/plugins/firebase'

export const actions = {
  // 記入されたデータをstorageに保存。
  async storageData(
    { ctx },
    {movieTitle,
    category,
    movieImage,
    memoryText}) {
    const user = firebase.auth().currentUser;
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
  // 画像をアップロード
  async upLoadMovieImage(ctx, file) {
    await firebase.storage().ref().child(`images/${file.name}`).put(file);
  },
  // 画像のダウンロードURLを取得
  async downLoadMovieImage(ctx, file) {
    return await firebase.storage().ref().child(`images/${file.name}`).getDownloadURL();
  },
  async getPostData(ctx,) {
    return await db.collection("movies").orderBy('created').get();
  },
  async searchPostData(ctx, {searchType, searchData}) {
    return await db.collection("movies").where(searchType, '==', searchData).orderBy('created').get();
  },
}