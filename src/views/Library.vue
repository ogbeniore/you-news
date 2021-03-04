<template>
  <div class="home">
    <k-news-nav library></k-news-nav>
    <main class="news">
      <div class="tag">
        User library
      </div>
      <div class="news-grid" v-if="library.length">
        <k-news-item v-for="(headline, index) in library" :key="index" :story="headline" />
      </div>
      <div class="empty" v-else>
        No items in your library
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import KNewsNav from '@/components/Navbar.vue';
import KNewsItem from '@/components/NewsItem.vue';

export default {
  name: 'Library',
  components: {
    KNewsNav,
    KNewsItem,
  },
  computed: {
    ...mapGetters(['library']),
  },
};
</script>
