<template>
  <div class="myPage">
    <Head></Head>
    <h2>思い出の本投稿アプリ My Page</h2>
    <div class="myPage_main">
      <img class="myPage_main-img" src="../book.jpg" alt="">
    </div>
    <div class="my-page_content">
      <display-posts/>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import Head from '~/components/Head.vue'
import DisplayPosts from '~/components/DisplayPosts.vue'

export default {
  components: {
    Head,
    DisplayPosts,
  },
}
</script>

<style scoped>
  .myPage {
    text-align: center;
  }

  .myPage_main-img {
    height: 300px;
    width: 100%;
  }
</style>

