<template>
  <div id="header">
    <div class="header-userName">
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
        this.$store.commit('setDisplayName', 'guest');
        this.$router.push({ path: '/' })
      })
      .catch(error => {
        alert(error);
      })
    },
    toSignin() {
      this.$router.push({ path: '/signin' })
    }
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
