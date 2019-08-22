import firebase from '@/plugins/firebase'
import {db} from '@/plugins/firebase'

export const satae = () => ({
  posts: []
});

export const mutations = {
  // 投稿データを追加する
  addPost(state,{
    moiveId,
    userName,
    userImage,
    title,
    category,
    movieImage,
    text
  }) {
    state.posts.unshift({
      moiveId,
      userName,
      userImage,
      title,
      category,
      movieImage,
      text,
    })
  },
  delPost(state) {
    // 配列を空にする
    state.posts.length = 0;
  }
}

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
      movieImage: movieImage,
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
  // 全ての投稿データの取得
  async getAllPostData({dispatch}) {
    const allPostData = await db.collection("movies").orderBy('created').get();
    await dispatch('showData', {searchedData: allPostData})
  },
  async searchPostData(ctx, {searchType, searchData}) {
    return await db.collection("movies").where(searchType, '==', searchData).orderBy('created').get();
  },
  // 投稿データをstateに保存する
  async showData({commit}, {searchedData}) {
    // 一度配列を空にしないと前のデータに積み重なる
    commit('delPost');
    searchedData.forEach(doc => {
      const data = doc.data();
      commit('addPost', {
        moiveId: doc.id,
        userName: data.userName,
        userImage: data.userImage,
        title: data.title,
        category: data.category,
        movieImage: data.movieImage,
        text: data.text,
      })
    })
  }
}