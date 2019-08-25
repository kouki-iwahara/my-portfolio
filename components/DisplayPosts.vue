<template>
  <div class="content">
    <button @click="transitionPostData">投稿する</button>
    
    <h2>みんなの投稿</h2>
    <fieldset>
      <legend>検索する</legend>
      <input type="button" value="全て表示" @click="showAllPostData">
      <div class="search-title">
        <label for="title">
          <p>題名で検索</p>
          <input id="title" type="text" v-model="movieTitle">
          <input type="button" value="検索" @click="searchByTitle">
        </label>
      </div>
      <!-- search-title -->
      <div class="movie-category">
        <p>カテゴリーで検索</p>
        <input name="category" type="radio" id="action" value="action" v-model="category">
        <label for="action">アクション</label>
        
        <input name="category" type="radio" id="sf" value="sf" v-model="category">
        <label for="sf">SF</label>

        <input name="category" type="radio" id="comedy" value="comedy" v-model="category">
        <label for="comedy">コメディ</label>

        <input name="category" type="radio" id="suspense" value="suspense" v-model="category">
        <label for="suspense">サスペンス</label>

        <input name="category" type="radio" id="horror" value="horror" v-model="category">
        <label for="horror">ホラー</label>

        <input name="category" type="radio" id="romance" value="romance" v-model="category">
        <label for="romance">恋愛</label>

        <input name="category" type="radio" id="panic" value="panic" v-model="category">
        <label for="panic">パニック</label>

        <input name="category" type="radio" id="anime" value="anime" v-model="category">
        <label for="anime">アニメ</label>

        <input type="button" value="検索" @click="searchByCategory">
      </div>
      <!-- movie-category -->
    </fieldset>
    
    <div class="post" v-for="post in posts" :key="post.id"> 
      <div class="post-img">
        <img :src="post.movieImage" alt="" width="300" height="200">
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
      movieTitle: '',
      category: '',
      resultTitleData: '',
      resultCategoryData: '',
    }
  },
  computed: {
    posts() {
      return this.$store.state.post.posts
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
      // タイトルと一致するデータを取得
      try {
        await this.$store.dispatch('post/searchPostData',{
          searchType: 'title',
          searchData: this.movieTitle
        });
      } catch (error) {
        alert(error);
      };
      // カテゴリーを初期値にして何を検索したかわかるようにした
      this.category = '';
    },
    // カテゴリーで検索し対応するデータを表示
    async searchByCategory() {
      // 選択されていなければ警告表示
      if(!this.category) {
        alert('カテゴリーを選択してください');
        return;
      };
      // 選択されたカテゴリーを投稿順に表示
      try {
        await this.$store.dispatch('post/searchPostData',{
            searchType: 'category',
            searchData: this.category
          });
        } catch (error) {
          alert(error);
        }
      // タイトル検索の値を初期値にして何を検索したかわかるようにした
      this.movieTitle = '';
    },
    async showAllPostData() {
      try {
        await this.$store.dispatch('post/getAllPostData');
      } catch (error) {
        alert(error);
      };
      this.movieTitle = '';
      this.category = '';
    }
  },
  created() {
    try {
      this.$store.dispatch('post/getAllPostData');
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