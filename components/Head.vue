<template>
  <div id="header">
    <div class="header-userName">
      <img :src="this.$store.state.userImage" alt="" width="35" height="35">
      <span>{{ `こんにちは！${this.$store.state.userName}さん！` }}</span>
    </div>
    <div class="header-menu">
      <button @click="toSignin">ログイン</button>
      <button @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'Head',
  methods: {
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.$store.commit('setUserWithNameAndImage',{
          userName: 'guest',
          photoURL: ''
        });
        this.$router.push({ path: '/' })
      })
      .catch(error => {
        alert(error);
      });
    },
    toSignin() {
      this.$router.push({ path: '/signin' })
    }
  },
  async created() {
    // loginしていればユーザデータ表示。loginしていなければホームへページ遷移
    await firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.commit('setUserWithNameAndImage',{
          userName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        this.$router.push({ path: '/' });
      }
    });
  }
}
</script>

<style scoped>
#header {
  background-color: aquamarine;
  display:flex;
  justify-content: space-between;
}

.header-userName, .header-menu{
  margin: 10px;
}
</style>
