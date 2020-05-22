import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import MovieDetails from './components/MovieDetails.vue'
import SearchMovie from './components/SearchMovie.vue'
import ActorDetails from './components/ActorDetails.vue'
import MovieReviews from './components/MovieReviews.vue'
import MovieReview from './components/MovieReview.vue'
import MovieImages from './components/MovieImages.vue'
import MovieCast from './components/MovieCast.vue'

import store from './vuex/index.js'
//const auth = store.getters["user/loggedin"];
//console.log(store.getters["user/loggedin"]);

Vue.use(VueRouter)
const router =  new VueRouter({
    routes: [
        {'path': '/login', component: Login, name: "Login"},
        {'path': '/', component: Home, name: "Home"},
        {
          'path': '/movie/:id',
          component: MovieDetails,
          props: true,
          children:[
            {
              path:'reviews/:review_id',
              component: MovieReview,
              props: true,
            },
            {
              path: 'reviews',
              component: MovieReviews,
              props: true,
            },
            {
              path: '/',
              component: MovieImages,
              props: true,
            },
            {
              path: 'cast',
              component: MovieCast,
              props: true,
            },
          ]
        },
        {'path': '/search', component: SearchMovie, name: "Search"},
        {'path': '/actor/:id', component: ActorDetails, props: true, name: "ActorDetails"},
        //{'path': '/list/:id', component: List, props: true, name: "List"},
        {'path': '/profile', component: Profile, name: "Profile", meta: { requiresAuth: true }}
    ],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if(to.name === 'Login'){
        if (store.getters["user/loggedin"]) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        }
    }
    if (to.matched.some(record => record.meta.requiresAuth)) { 
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters["user/loggedin"]) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
            next()
        }
      } else {
        next() // make sure to always call next()!
      }
});

export default router;