<template>
  <div>
    <div class="bg-white">
      <nav class="navigation">
        <span class="navigation__logo">
          YouNews
        </span>
        <div class="navigation__search">
          <input
            type="search"
            name="search"
            id="search"
            class="navigation__search__input"
            placeholder="Search">
        </div>
      </nav>
    </div>
    <div class="bg-gray-200">
      <ul class="navigation__menu">
        <li class="navigation__menu__item" v-for="{ name, value } in categories" :key="name">
          <router-link :to="{ name: 'category', params: { category: value } }">
            {{ name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YNewsNav',
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
  }),
};
</script>
