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
            <input type="file">
            <input type="button" value="画像をアップロード">

            <div class="user-image_preview">
              <img class="userImage" alt="" width="200" height="200">
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
    }
  },
  methods: {
    // ユーザーの名前、メール、パスワードを登録
    signUp() {
      // ユーザーデータを登録。成功でsigninのページへ遷移
      createAccount(this.userMail, this.password, this.userName)
      .then(() => {
        const userData = firebase.auth().currentUser;
        alert(`こんにちは、${userData.displayName}さん！登録完了です！` );
        this.$router.push({ path: '/signin' })
      })
      .catch(error => {
        alert(error.message);
      })
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

