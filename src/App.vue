<template>
  <div id="app">
  <template>
    <b-navbar toggleable="md" type="dark" variant="dark" class="mb-3">
      <b-navbar-brand to="/">TMdB</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <span v-if="expanded">KAPA</span>
          <span v-else>AÇ</span>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item v-if="!loggedin" to="/login" active-class="active" exact>Login</b-nav-item>
          <b-nav-item v-if="loggedin" to="/profile" active-class="active" exact>{{username}}</b-nav-item>
          <b-button variant="danger" @click="logout">Log Out</b-button>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <div class="form-inline my-2 my-lg-0">
                <input v-debounce="delay" v-model.lazy="search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button to="/search" class="btn btn-outline-success my-2 my-sm-0" @click="searchMovie">Search</button>
            </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <b-alert show variant="danger" dismissible>This Project still under development.</b-alert>
          </div>
        </div>
      </div>
    <router-view></router-view>
  </div>
</template>

<script>
import debounce from './debounce/index'
import {mapState, mapActions} from 'vuex'
const axios = require('axios').default;
export default {
  name: 'App',
  components: {
    //PopularMovies
  },
  data() {
    return {
      search: "",
      delay: 500,
      movies: null
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      loggedin: state => state.user.loggedin,
    })
  },
  directives: {debounce},
  watch: {
    search() {
      this.searchMovie();
    }
  },
  methods: {
    ...mapActions('user',['logout']),
    searchMovie() {
      axios.get('https://api.themoviedb.org/3/search/movie?query='+this.search+'&api_key='+process.env.VUE_APP_API_KEY)
      .then(result => {
        this.movies = result.data.results;
        console.log(result.data.results);
      })
    }
  },
}
</script>

<style>
@import url('../node_modules/tiny-slider/dist/tiny-slider.css');
@import url('../node_modules/glightbox/dist/css/glightbox.min.css');
body{
  background-color: #121212 !important;
}


.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  animation: sk-chase-dot 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #fff;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); } 
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
}
</style>
