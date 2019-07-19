<template>
  <div class="container">
    <Head/>
    <div class="main">
      <h1>思い出の本投稿アプリホーム画面</h1>
      <p>textが入りますtextが入りますtextが入ります</p>
      <img class="main-img" src="../book.jpg" alt="">
      <nav class="main-link">
        <nuxt-link to="/signup">サインアップ画面</nuxt-link> /
        <nuxt-link to="/signin">サインイン画面</nuxt-link>
      </nav>
    </div>
    <div class="content">
      <display-posts/>
    </div>
  </div>
</template>

<script>
import Head from '~/components/Head.vue'
import DisplayPosts from '~/components/DisplayPosts.vue'

export default {
  components: {
    Head,
    DisplayPosts
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  height: 480px;
}

.main-img {
  height: 300px;
  width: 100%;
}

.main-link {
  font-size: 20px;
  margin-bottom: 30px;
}
</style>
