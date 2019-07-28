<template>
  <div class="post-data">
    <fieldset >
      <legend>思い出の映画投稿</legend>
      <form action="" @submit.prevent="storageData">
        <div class="movie-title">
          <label for="title">
            <p>題名<span>(必須)</span></p>
            <input id="title" type="text" v-model="movieTitle" required>
          </label>
        </div>
        <!-- /movie-title -->
        <div class="movie-category">
          <p>カテゴリー<span>(必須)</span></p>
          <input name="category" type="radio" id="action" value="action" v-model="category" required>
          <label for="action">アクション</label>
          
          <input name="category" type="radio" id="sf" value="sf" v-model="category">
          <label for="sf">SF</label>

          <input name="category" type="radio" id="comedy" value="comedy" v-model="category">
          <label for="comedy">コメディ</label>

          <input name="category" type="radio" id="suspense" value="suspense" v-model="category">
          <label for="suspense">サスペンス</label>
          <br>
          <input name="category" type="radio" id="horror" value="horror" v-model="category">
          <label for="horror">ホラー</label>

          <input name="category" type="radio" id="romance" value="romance" v-model="category">
          <label for="romance">恋愛</label>

          <input name="category" type="radio" id="panic" value="panic" v-model="category">
          <label for="panic">パニック</label>

          <input name="category" type="radio" id="anime" value="anime" v-model="category">
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
            <p>思い出<span>(必須)</span></p>
            <textarea id="text" cols="30" rows="10" v-model="memoryText" required></textarea>
          </label>
        </div>
        <!-- /memory-text -->
        <input type="submit" value="投稿する">
        <input type="submit" @click="transitionMyPage" value="マイページに戻る">
      </form>
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
      upLoad: false,
    }
  },
  methods: {
    // 映画のイメージ画像データを取得し、プレビューを作成
    getFileData(fileData) {
      this.selectedFile = fileData.target.files[0];
      this.upLoad = false;
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
    // 選択された画像のアップロード
    upLoadImage() {
      // 画像を選択しているか確認
      if(!this.selectedFile) {
        alert('画像を選択してください');
        return;
      }
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${this.selectedFile.name}`);
      imageRef.put(this.selectedFile)
      .then((snapshot) => {
        console.log(snapshot); //確認用
        this.upLoad = true;
        alert('アップロードしました');
      })
      .catch((error) => {
        alert(error)
      })
    },
    // storageの画像からdownloadURL取得。関数storageData内で使用
    downLoadImage() {
      const storageRef = firebase.storage().ref();
      storageRef.child(`images/${this.selectedFile.name}`).getDownloadURL()
      .then((url) => {
        this.movieImage = url;
      })
      .catch((error) => {
        alert(error)
      })
    },
    // 入力されたデータをサーバに保存
    storageData() {
      // ユーザがログイン中ならデータをサーバに保存。ログインしていなければHOME画面へ遷移
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // 必須項目が入力されているか確認
          if(!this.movieTitle || !this.category || !this.memoryText) {
            return;
          }
          // 画像を選択しているならstorageの画像URLを取得
          if(this.selectedFile) {
            // uploadしているならdownloadURL取得
            if(this.upLoad) {
              this.downLoadImage();
            } else {
              alert('画像をアップロードしてください');
              return;
            }
          };
          // サーバへ入力されたデータを保存。
          const db = firebase.firestore();
          db.collection('movies').add({
            userId: user.uid, //自分の投稿履歴の検索用
            userImage: user.photoURL,
            userName: this.$store.state.userName,
            title: this.movieTitle,
            category: this.category,
            image: this.movieImage,
            text: this.memoryText,
            created: firebase.firestore.FieldValue.serverTimestamp() //日付順にソートする為
          })
          .then((doc) => {
            console.log(doc) //確認用
            this.$router.push({path: '/myPage'});
          })
          .catch((error) => {
            alert(error)
          });
        } else {
          this.$router.push({path: '/'});
          return;
        }
      })
    },
    transitionMyPage() {
      this.$router.push({path: '/myPage'});
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

span {
  color: rgba(255, 0, 0, 0.872);
}
</style>