<template>
  <div id="signup">
    <h1>ユーザー登録</h1>

    <div class="register-form">
      <fieldset>
        <legend>メールとパスワードで登録</legend>
        <form @submit.prevent="signUp">
          <div class="user-name">
            <label for="user-name">
              <p>名前(ニックネーム)</p>
              <input type="text" id="user-name" placeholder="表示名" v-model="userName" required>
            </label>
          </div>
          <!-- /user-name -->
          <div class="user-mail">
            <label for="user-mail">
              <p>Eメール</p>
              <input type="email" id="user-mail" placeholder="example@gmail.com" v-model="userMail" required>
            </label>
          </div>
          <!-- /user-name -->
          <div class="password">
            <label for="password">
              <p>パスワード</p>
              <input type="password" id="password" placeholder="パスワード" v-model="password" required>
            </label>
          </div>
          <!-- /password -->
          <div class="user-image">
            <p>アイコン画像</p>
            <input type="file" @change="getFileData">
            <input type="button" value="画像をアップロード" @click="upLoadImage">

            <div class="user-image_preview">
              <img class="userImage" :src="this.userImage" alt="イメージ写真" width="200" height="200">
            </div>
            <!-- /user-image_preview -->
          </div>
          <!-- /user-image -->
          <input type="submit" value="登録">
        </form>
      </fieldset>
    </div>
    <!-- /register-form -->
    <nuxt-link to="/">ホーム画面</nuxt-link>
    <nuxt-link to="/signin">サインイン画面</nuxt-link>
  </div>
  <!-- /signup -->
</template>

<script>
import firebase from '@/plugins/firebase'
import { createAccount } from '~/definition/functions.js'

export default {
  name: 'Signup',
  asyncData() {
    return {
      userName: '',
      userMail: '',
      password: '',
      userImage: require("~/assets/no-image.jpg"),
      selectedFile: '',
      upLoad: false
    }
  },
  methods: {
    // ユーザーの名前、メール、パスワードを登録
    signUp() {
      // 選択したファイルをアップデートしたか確認
      if(this.selectedFile) {
        if(this.upLoad) {
          this.downLoadImage();
        } else {
          alert('画像をアップデートしてください');
          return;
        }
      };
      // ユーザーデータを登録。成功でsigninのページへ遷移
      createAccount(
        this.userMail,
        this.password,
        this.userName,
        this.userImage)
      .then(() => {
        //WARNING: 選んだファイルによっては'Photo URL too long.'のエラーが出ることがある。その時はemailだけが登録されている。よって、画像を変えて登録し直そうとしても、'The email address is already in use by another account.'のエラーが出てしまう。原因はまだ不明。
        const userData = firebase.auth().currentUser;
        console.log(userData)
        alert(`こんにちは、${userData.displayName}さん！登録完了です！` );
        this.$router.push({ path: '/signin' })
      })
      .catch(error => {
        alert(error.message);
      })
    },
    // ユーザのイメージ画像データを取得し、プレビューを作成
    getFileData(fileData) {
      this.upLoad = false;
      this.selectedFile = fileData.target.files[0];
      console.log(this.selectedFile)
      // ファイルを選んでなければ初期値に戻す
      if(!this.selectedFile) {
        this.userImage = require("~/assets/no-image.jpg");
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
        this.userImage = fileData.target.result;
      };
      reader.readAsDataURL(selectedFile);
    },
    // プレビュー画像をアップロード
    upLoadImage() {
      // ファイルを選択しているか確認
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
    },
    // storageの画像をダウンロードしURLを取得
    downLoadImage() {
      const storageRef = firebase.storage().ref();
      storageRef.child(`images/${this.selectedFile.name}`).getDownloadURL()
      .then((url) => {
        this.userImage = url;
        console.log(this.userImage)
      })
      .catch((error) => {
        console.log(error);
        alert(error)
        return;
      });
    },
  }
}
</script>

<style scoped>
#signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>