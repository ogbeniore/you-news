<template>
  <div class="home">
    <k-news-nav></k-news-nav>
    <main class="news">
      <div class="tag">
        {{userCountry && userCountry.long_name}}
      </div>
      <div class="loader" v-if="isLoading">
        Loading...
      </div>
      <div class="news-grid" v-else-if="headlines.length">
        <k-news-item v-for="(headline, index) in headlines" :key="index" :story="headline" />
        <div class="news-pagination" v-show="noOfPages > 1">
          <button
            class="btn btn-primary-outline mr-2"
            v-if="currentPage !== 1"
            @click="currentPage -= 1">
            &#171; Previous Page
          </button>
          <button
            class="btn btn-primary-outline ml-2"
            v-if="currentPage !== noOfPages"
            @click="currentPage += 1">
            Next Page &#187;
          </button>
        </div>
      </div>
      <div class="empty" v-else>
        No headlines for the category or keyword
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import KNewsNav from '@/components/Navbar.vue';
import KNewsItem from '@/components/NewsItem.vue';

export default {
  name: 'Home',
  components: {
    KNewsNav,
    KNewsItem,
  },
  data: () => ({
    currentPage: 1,
    isLoading: true,
  }),
  watch: {
    currentPage(page) {
      const { params: { category }, query: { q, source } } = this.$route;
      if (page) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        this.isLoading = true;
        this.fetchTopHeadlines({
          page, category, query: q, source,
        });
      }
    },
    headlines: {
      deep: true,
      handler() {
        this.isLoading = false;
      },
    },
    $route: {
      immediate: true,
      handler(route) {
        const { params: { category }, name, query: { q, source } } = route;
        if (name === 'category') {
          this.isLoading = true;
          this.fetchTopHeadlines({
            page: 1, category, query: q, source,
          });
        }
      },
    },
  },
  mounted() {
    const { params: { category }, query: { q, source } } = this.$route;
    this.checkUserLocation({ category, query: q, source });
  },
  computed: {
    ...mapGetters(['userCountry', 'headlines', 'noOfPages']),
  },
  methods: {
    ...mapActions(['checkUserLocation', 'fetchTopHeadlines']),
  },
};
</script>
