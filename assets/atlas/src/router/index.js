import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UseCaseSelection from "@/views/UseCaseSelection";
import ChooseUseCaseAndFillData from "@/views/ChooseUseCaseAndFillData";
import FillingData from "@/views/FillingData";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/use-case',
    name: 'ChooseUseCaseAndFillData',
    component: ChooseUseCaseAndFillData,
    children: [
      {
        path: 'fill_data',
        name: 'FillingData',
        component: FillingData,
      },
      {
        path: '',
        name: 'UseCaseSelection',
        component: UseCaseSelection,
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
