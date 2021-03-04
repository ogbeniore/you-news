import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'YouNews',
  reducer: (state) => ({
    savedArticles: state.savedArticles,
  }),
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    country: {
      long_name: '',
      short_name: '',
    },
    topHeadlines: [],
    totalItems: 0,
    sources: [],
    savedArticles: [],
  },
  mutations: {
    changeCountry: (state, payload) => { state.country = payload; },
    setTopHeadlines: (state, payload) => { state.topHeadlines = payload; },
    setTotalItems: (state, payload) => { state.totalItems = payload; },
    setSources: (state, payload) => { state.sources = payload; },
    saveArticleToState: (state, payload) => {
      const currentArticles = [...state.savedArticles];
      const articleExists = !!currentArticles.find((article) => (
        (article.source && article.source.id === payload.source && payload.source.id)
         && (article.title === payload.title)
      ));
      if (!articleExists) {
        currentArticles.push(payload);
        state.savedArticles = currentArticles;
        alert('Article saved successfully');
      } else {
        alert('Article already in storage');
      }
    },
    removeArticleFromState: (state, payload) => {
      const currentArticles = [...state.savedArticles];
      const articleExists = !!currentArticles.find((article) => (article.title === payload.title));
      if (articleExists) {
        currentArticles.filter((article) => (article.title !== payload.title));
        state.savedArticles = currentArticles;
        alert('Article removed successfully');
      }
    },
  },
  actions: {
    checkUserLocation: ({ commit, dispatch }, payload) => {
      const apiKey = process.env.VUE_APP_GOOGLE_KEY;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
          .then((res) => res.json())
          .then(({ results }) => {
            const { address_components: components } = results[0];
            const country = components.find(({ types }) => types.includes('country'));
            commit('changeCountry', country);
            dispatch('fetchTopHeadlines', payload);
          })
          .catch((err) => {
            dispatch('fetchTopHeadlines', payload);
            return err.message;
          }));
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    },
    fetchTopHeadlines: ({ commit, state }, payload) => {
      const {
        category = '', source = '', query = '', page = 1,
      } = payload;
      const baseUrl = process.env.VUE_APP_NEWS_BASE_URL;
      const apiKey = process.env.VUE_APP_NEWS_KEY;
      const country = state.country.short_name.toLowerCase() || 'ng';
      const fullApiUrl = `${baseUrl}top-headlines?apiKey=${apiKey}&category=${category}&sources=${source}&q=${query}&pageSize=5&page=${page}&country=${source ? '' : country}`;
      fetch(fullApiUrl).then((response) => response.json())
        .then(({ articles, totalResults }) => {
          commit('setTopHeadlines', articles);
          commit('setTotalItems', totalResults);
        })
        .catch((error) => alert(error.message));
    },
    fetchSources: ({ commit }, payload) => {
      const { category = '' } = payload;
      const baseUrl = process.env.VUE_APP_NEWS_BASE_URL;
      const apiKey = process.env.VUE_APP_NEWS_KEY;
      const fullApiUrl = `${baseUrl}sources?apiKey=${apiKey}&category=${category}`;
      fetch(fullApiUrl).then((response) => response.json())
        .then(({ sources }) => {
          commit('setSources', sources);
        })
        .catch((error) => alert(error.message));
    },
  },
  getters: {
    userCountry: (state) => state.country,
    headlines: (state) => state.topHeadlines,
    noOfPages: (state) => Math.round(Number(state.totalItems) / 5),
    allSources: (state) => state.sources,
    library: (state) => state.savedArticles,
  },
  plugins: [vuexLocal.plugin],
});
