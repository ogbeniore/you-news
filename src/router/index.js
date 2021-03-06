import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Library from '../views/Library.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
  },
  {
    path: '/:category',
    name: 'category',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
