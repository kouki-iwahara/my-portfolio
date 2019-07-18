<template>
  <div id="signup">
    <h1>SignUp!!</h1>
    <input type="text" placeholder="表示名" v-model="userName">
    <input type="text" placeholder="example@gmail.com" v-model="userMail">
    <input type="password" placeholder="パスワード" v-model="password">

    <button @click="signUp">登録</button>
    <nuxt-link to="/">ホーム画面</nuxt-link>
    <nuxt-link to="/signin">サインイン画面</nuxt-link>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

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
      // ユーザー名を登録する関数の宣言
      const setDisplayName = () => {
        const userData = firebase.auth().currentUser;
        // ユーザーのdisplayNameを更新し、stateのuserNameを書き換える
        return userData.updateProfile({
          displayName: this.userName,
        })
        .then(() => {
          this.$store.commit('setDisplayName', userData.displayName);
        })
      };
      // ユーザーの名前、メール、パスワード登録を実行する関数の宣言
      const createAccount = async() => {
        await firebase.auth().
        createUserWithEmailAndPassword(this.userMail, this.password)
        await setDisplayName()
      };
      // ユーザーデータを登録。成功でsigninのページへ遷移
      createAccount()
      .then(() => {
        alert(`こんにちは、${this.$store.state.userName}さん！登録完了です！` );
        this.$router.push({ path: '/signin' })
      })
      .catch(error => {
        alert(error.message);
      })
    }
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

