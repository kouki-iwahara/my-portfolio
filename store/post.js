import firebase from '@/plugins/firebase'
import {db} from '@/plugins/firebase'

export const state = () => ({
  posts: [],
  movieImage: ''
});

export const mutations = {
  // 投稿データを追加する
  addPost(state, postData) {
    state.posts.unshift(postData)
  },
  delPost(state) {
    // 配列を空にする
    state.posts.length = 0;
  },
  getURL(state, url) {
    state.movieImage = url
  }
}

export const actions = {
  // 記入されたデータをstorageに保存。
  async storageData({ ctx }, movieData) {
    const user = firebase.auth().currentUser;
    await db.collection('movies').add({
      userId: user.uid, //自分の投稿履歴の検索用
      userImage: user.photoURL,
      userName: user.displayName,
      created: firebase.firestore.FieldValue.serverTimestamp(), //日付順にソートする為
      movieData
    });
  },
  // 画像をアップロード
  async upLoadMovieImage(ctx, file) {
    await firebase.storage().ref().child(`images/${file.name}`).put(file);
  },
  // 画像のダウンロードURLを取得
  async downLoadMovieImage({commit}, file) {
    const url = await firebase.storage().ref().child(`images/${file.name}`).getDownloadURL();
    commit('getURL', url);
  },
  // 全ての投稿データの取得
  async getAllPostData({dispatch}) {
    const allPostData = await db.collection("movies").orderBy('created').get();
    await dispatch('addSearchedData', {searchedData: allPostData})
  },
  // 検索した投稿を取得し表示
  async searchPostData({dispatch}, {searchType, searchData}) {
    const searchResults = await db.collection("movies").where(searchType, '==', searchData).orderBy('created').get();
    if(!searchResults.docs.length) {
      alert('一致する投稿はありません');
      return;
    };
    await dispatch('addSearchedData', {searchedData: searchResults});
  },
  // 投稿データをstateに保存する
  async addSearchedData({commit}, {searchedData}) {
    // 一度配列を空にしないと前のデータに積み重なる
    commit('delPost');
    searchedData.forEach(doc => {
      const data = doc.data();
      console.log(data.movieData)
      commit('addPost', {
        movieId: doc.id,
        userName: data.userName,
        userImage: data.userImage,
        title: data.movieData.title,
        category: data.movieData.category,
        movieImage: data.movieData.movieImage,
        text: data.movieData.text,
      });
    });
  }
}