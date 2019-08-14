<template>
  <div class="content">
    <button @click="transitionPostData">投稿する</button>
    
    <h2>みんなの投稿</h2>
    <fieldset>
      <legend>検索する</legend>
      <div class="search-title">
        <label for="title">
          <p>題名で検索</p>
          <input id="title" type="text" v-model="movieTitle">
          <input type="button" value="検索" @click="searchByTitle">
        </label>
      </div>
      <!-- search-title -->
    </fieldset>
    
    <div class="post" v-for="post in posts" :key="post.id"> 
      <div class="post-img">
        <img :src="post.image" alt="" width="300" height="200">
      </div>
      <div class="post-title">
        <h3>{{ `Title: ${post.title}` }}</h3>
        <span>{{ `Category: ${post.category}` }}</span>
      </div>
      <div class="post-excerpt">
        <p>{{ post.text }}</p>
      </div>
      <div class="post-info">
        <img :src="post.userImage" alt="" width="35" height="35">
        {{ `投稿者: ${post.userName}` }}
      </div>
    </div>
    <!-- /post -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      movieTitle: ''
    }
  },
  methods: {
    transitionPostData() {
      this.$router.push({path: '/postData'});
    },
    // タイトルで検索し、対応するデータを表示
    async searchByTitle() {
      // タイトルが入力されていなければ警告表示
      if(!this.movieTitle) {
        alert('タイトルを入力してください');
        return;
      };
      // 入力されたタイトルを投稿順に表示
      try {
        const resultTitleData = await this.$store.dispatch('post/searchPostData', this.movieTitle);
        // タイトルが一致しなければ警告
        if(resultTitleData.docs.length === 0) {
          alert('一致するタイトルはありません');
          this.movieTitle = '';
          return;
        }
        this.posts.length = 0;
        resultTitleData.forEach(doc => {
          const data = doc.data();
          this.posts.unshift({
            moiveId: doc.id,
            userName: data.userName,
            userImage: data.userImage,
            title: data.title,
            category: data.category,
            image: data.image,
            text: data.text,
          });
        });
      } catch (error) {
        alert(error);
      };
    }
  },
  async created() {
    // サーバーからデータを取得して投稿順に表示する
    try {
      const postData = await this.$store.dispatch('post/getPostData');
      console.log(postData);
      postData.forEach(doc => {
        console.log(doc);
        const data = doc.data();
        this.posts.unshift({
          moiveId: doc.id,
          userName: data.userName,
          userImage: data.userImage,
          title: data.title,
          category: data.category,
          image: data.image,
          text: data.text,
        })
      });
    } catch (error) {
      alert(error);
    };
  }
}
</script>

<style>
fieldset {
  display: inline-block;
}
</style>

<style scoped>
.content {
  width: 1000px;
  margin: auto;
  background-color: grey;
}

.post {
  height: 200px;
  margin-bottom: 60px;
  background-color: pink;
}

.post-img {
  float: left;
}

.post-excerpt {
  margin-bottom: 20px;
  text-align: left;
}
</style>