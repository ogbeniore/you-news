<template>
  <div>
    <div class="bg-white">
      <nav class="navigation">
        <router-link to="/" class="navigation__logo">
          YouNews
        </router-link>
        <div class="navigation__nav">
          <p class="navigation__menu__item px-4">
            <router-link to="/library">
              Library
            </router-link>
          </p>
          <div class="navigation__search" v-if="!library">
            <select
              v-model="currentSource"
              name="category"
              id="caetgory"
              class="navigation__search__input">
              <option :value="''">All</option>
              <option
                v-for="{ name, id } in allSources"
                :key="id"
                :value="id">
                {{ name }}
              </option>
            </select>
          </div>
          <form class="navigation__search" @submit.prevent="searchItem" v-if="!library">
            <input
              type="search"
              name="search"
              id="search"
              v-model="keyword"
              class="navigation__search__input"
              placeholder="Search">
          </form>
        </div>
      </nav>
    </div>
    <div class="bg-gray-200" v-if="!library">
      <ul class="navigation__menu">
        <li class="navigation__menu__item" v-for="{ name, value } in categories" :key="name">
          <router-link
            :to="{ name: 'category', params: { category: value } }"
            :class="{'active' : $route.name === 'Home' && value === ''}">
            {{ name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'YNewsNav',
  props: {
    library: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    categories: [
      {
        name: 'Home',
        value: '',
      },
      {
        name: 'Business',
        value: 'business',
      },
      {
        name: 'Entertainment',
        value: 'entertainment',
      },
      {
        name: 'General',
        value: 'general',
      },
      {
        name: 'Health',
        value: 'health',
      },
      {
        name: 'Science',
        value: 'science',
      },
      {
        name: 'Sports',
        value: 'sports',
      },
      {
        name: 'Technology',
        value: 'technology',
      },
    ],
    keyword: '',
    currentSource: '',
  }),
  computed: {
    ...mapGetters(['allSources']),
  },
  mounted() {
    const { query: { q, source }, params: { category } } = this.$route;
    if (q) {
      this.keyword = q;
    }
    if (source) {
      this.currentSource = source;
    }
    this.fetchSources({ category });
  },
  watch: {
    $route: {
      handler(route) {
        const { query: { q } } = route;
        if (!q) {
          this.keyword = '';
        }
      },
    },
    currentSource(source) {
      const { query: { q }, params } = this.$route;
      this.$router.push({ name: 'category', params, query: { source, q } });
    },
  },
  methods: {
    ...mapActions(['fetchSources']),
    searchItem() {
      const { params, query: { source } } = this.$route;
      this.$router.push({ name: 'category', params, query: { source, q: this.keyword } });
    },
  },
};
</script>
