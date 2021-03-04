<template>
  <div class="news-item">
    <!-- <img :src="story.urlToImage ? story.urlToImage : defualtUrl" :alt="story.title"> -->
    <div class="news__item__details">
      <div class="news-item__source">{{ story.source && story.source.name }}</div>
      <div class="news-item__title">{{story.title}}</div>
      <p class="news-item__content" v-html="story.content"></p>
      <div class="news-item__actions">
        <a
          :href="story.url"
          class="btn btn-primary"
          target="_blank"
          rel="noreferer noopener">
          Read Now
        </a>
        <button
          class="btn btn-primary-outline"
          v-if="!articleExists"
          @click="saveArticleToState(story)">
          &#9829; Add to library
        </button>
        <button
          class="btn btn-primary-outline"
          v-else
          @click="removeArticleFromState(story)">
          Remove from library
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'NewsItem',
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    defualtUrl: 'https://res.cloudinary.com/plushdeveloper/image/upload/v1571498243/twitter_image_iqzuir.png',
  }),
  computed: {
    ...mapGetters(['library']),
    articleExists() {
      const { story, library } = this;
      return !!library.find((article) => article.title === story.title);
    },
  },
  methods: {
    ...mapMutations(['saveArticleToState', 'removeArticleFromState']),
  },
};
</script>
