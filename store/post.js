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
  async getAllPostData(ctx, {posts}) {
    const postData = await db.collection("movies").orderBy('created').get();
    console.log(postData);
    postData.forEach(doc => {
      console.log(doc);
      const data = doc.data();
      posts.unshift({
        movieId: doc.id,
        userName: data.userName,
        userImage: data.userImage,
        title: data.title,
        category: data.category,
        image: data.image,
        text: data.text,
      });
    });
  },
  async searchPostData(ctx, {searchType, searchData}) {
    return await db.collection("movies").where(searchType, '==', searchData).orderBy('created').get();
  },
  showSearchData(ctx, {searchData, posts}) {
    searchData.forEach(doc => {
      const data = doc.data();
      posts.unshift({
        moiveId: doc.id,
        userName: data.userName,
        userImage: data.userImage,
        title: data.title,
        category: data.category,
        image: data.image,
        text: data.text,
      });
    })
  }
}