<template>
  <div class="post-data">
    <fieldset >
      <legend>思い出の映画投稿</legend>
      <form action="" @submit.prevent="postData">
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
    // 入力されたデータをサーバに保存
    async postData() {
      // ログインしていなければHOME画面へ遷移
      if(!this.$store.dispatch('isLogin')) {
        this.$router.push({path: '/'});
        return;
      } 
      // 必須項目が入力されているか確認
      if(!this.movieTitle || !this.category || !this.memoryText) {
        return;
      }
      // 画像を選択しているならアップロードし、ダウンロードURLを取得
      if(this.selectedFile) {
        await this.$store.dispatch('upLoadImage', this.selectedFile);
        this.movieImage = await this.$store.dispatch('downLoadImage', this.selectedFile);
      };
      // サーバへ入力されたデータを保存。
      await this.$store.dispatch('storageData',
        {movieTitle: this.movieTitle,
        category: this.category,
        movieImage: this.movieImage,
        memoryText: this.memoryText});

      alert('投稿しました！');
      // 全て成功したらmyPageへ遷移。エラーが出るなら遷移させないようにしたい。
      this.$router.push({ path: '/myPage' });
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