<template>
  <div id="signin">
    <h1>SignIn!!</h1>
    <input type="text" placeholder="example@gmail.com" v-model="userMail">
    <input type="password" placeholder="パスワード" v-model="password">
    <button @click="signIn">サインイン</button>

    <button @click="googleLogin">Googleアカウントでログイン</button>
    <nuxt-link to="/">ホーム画面</nuxt-link>
    <nuxt-link to="/signup">サインアップ画面</nuxt-link>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'Signin',
  asyncData() {
    return {
      userMail: '',
      password: '',
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('user/signIn',{
          userMail: this.userMail,
          password: this.password
        })
      } catch (error) {
        alert(error);
      }
      this.$router.push({path: '/mypage'});
    },
    async googleLogin() {
      await this.$store.dispatch('user/googleLogin');
      this.$router.push({path: '/mypage'});
    }
  }
}
</script>


<style scoped>
#signin {
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