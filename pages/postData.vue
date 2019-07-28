<template>
  <div class="post-data">
    <fieldset >
      <legend>思い出の映画投稿</legend>

      <div class="movie-title">
        <label for="dd">
          <p>題名</p>
          <input id="dd" type="text" v-model="movieTitle">
        </label>
      </div>
      <!-- /movie-title -->
      <div class="movie-category">
        <p>カテゴリー</p>
        <input type="radio" id="action" value="action" v-model="category">
        <label for="action">アクション</label>
        
        <input type="radio" id="sf" value="sf" v-model="category">
        <label for="sf">SF</label>

        <input type="radio" id="comedy" value="comedy" v-model="category">
        <label for="comedy">コメディ</label>

        <input type="radio" id="suspense" value="suspense" v-model="category">
        <label for="suspense">サスペンス</label>
        <br>
        <input type="radio" id="horror" value="horror" v-model="category">
        <label for="horror">ホラー</label>

        <input type="radio" id="romance" value="romance" v-model="category">
        <label for="romance">恋愛</label>

        <input type="radio" id="panic" value="panic" v-model="category">
        <label for="panic">パニック</label>

        <input type="radio" id="anime" value="anime" v-model="category">
        <label for="anime">アニメ</label>
      </div>
      <!-- /movie-category -->
      <div class="movie-image">
        <p>画像</p>
        <input id="file" type="file" @change="getFileData">
        <input type="button" value="画像をアップロード" @click="upLoadImage">
        <img class="preview" :src="movieImage" alt="">
      </div>
      <!-- /movie-image -->
      <div class="memory-text">
        <label for="text">
          <p>思い出</p>
          <textarea name="" id="text" cols="30" rows="10" v-model="memoryText"></textarea>
        </label>
      </div>
      <!-- /memory-text -->
      <button>投稿する</button>
    </fieldset>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  asyncData() {
    return {
      movieTitle: '',
      category: '',
      selectedFile: '',
      memoryText: '',
      movieImage: require("~/assets/movie.jpg"),
    }
  },
  methods: {
    // 映画のイメージ画像データを取得し、プレビューを作成
    getFileData(fileData) {
      this.selectedFile = fileData.target.files[0];
      // ファイルを選んでなければ初期値に戻す
      if(!this.selectedFile) {
        this.movieImage = require("~/assets/movie.jpg");
        return;
      }
      // プレビューを作成
      this.previewImage(this.selectedFile);
    },
    // 画像のURLを取得しプレビューを表示する
    previewImage(selectedFile) {
      // FileReaderに対応しているか
      if(!(window.FileReader)) {
        alert('表示できません');
        return;
      }
      const reader = new FileReader();
      reader.onload = (fileData) => {
        this.movieImage = fileData.target.result;
      };
      reader.readAsDataURL(selectedFile);
    },
    upLoadImage() {
      if(!this.selectedFile) {
        alert('画像を選択してください');
        return;
      }
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${this.selectedFile.name}`);
      imageRef.put(this.selectedFile)
      .then((snapshot) => {
        console.log(snapshot); //確認用
        alert('アップロードしました');
      })
    },
    downLoadImage() {
      const storageRef = firebase.storage().ref();
      storageRef.child(`images/${this.selectedFile.name}`).getDownloadURL()
      .then((url) => {
        this.movieImage = url;
      })
      .catch((error) => {
        alert('画像をアップロードしてください')
        return;
      })
    }
  }
}
</script>

<style>
fieldset {
  display: inline-block;
}
</style>

<style scoped>
.preview {
  width: 300px;
  height: 200px;
  display: block;
}
</style>


