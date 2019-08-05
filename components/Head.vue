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
    const userData = await this.$store.dispatch('showUser'); // テスト用
    await console.log(userData); // undefined 上記の処理が終わっていない？
    
    // この実行結果と同じ処理をaction経由で記述したい
    await firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(1); // async/awaitのテスト用
        this.$store.commit('setUserWithNameAndImage',{
          userName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        this.$router.push({ path: '/' });
      }
    });
    await console.log(2); // リロードすると'2','1'の順で表示されてしまう
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
