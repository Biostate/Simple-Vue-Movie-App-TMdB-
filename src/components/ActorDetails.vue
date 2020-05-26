<template>
    <div class="container mt-5 pt-5">
        <div v-if="!loaded" class="d-flex justify-content-center">
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>
        <div v-if="error">
            ERROR
        </div>
        <div v-if="loaded">
            <div class="row py-4 text-white rounded bg-dark">
                <div class="col-md-4" style="margin-top:-70px">
                    <img :src="'http://image.tmdb.org/t/p/w500'+actorData.profile_path" class="img-fluid shadow" id="poster" crossorigin="anonymous">
                </div>
                <div class="col-md-8">
                    <h3>{{actorData.name}} <span class="text-white-50">/ {{actorData.birthday}}</span></h3>
                    <h6 class="text-white-50">
                         {{actorData.place_of_birth}}
                    </h6>
                    <p>{{actorData.biography}}</p>
                </div>
                <div class="col-12 mt-3">
                    <h3>{{actorData.name}}'s Top 10</h3>
                    <MovieSlider 
                    :images="movies.slice(0,10)" 
                    sliderClass="actor-popular-movies" 
                    controllerClass="actor-popular-movies-controller" />
                </div>
                <div class="col-12 mt-3">
                    <div v-for="item in movies" :key="item.id">
                        <span class="badge badge-warning">{{ item.vote_average }}</span> <router-link class="text-white" :to="'/movie/'+item.id">{{ item.title }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// TODO:
// Change movie_credits to combined_credits for get all tv and movie credits.
import axios from 'axios'
import MovieSlider from './MovieSlider'
    export default {
        props: ['id'],
        data() {
            return {
                actorData: null,
                movies: null,
                error: false,
                loaded:false,
                color: null
            }
        },
        components: {
            MovieSlider,
        },
        created () {
            axios.all([
                this.getActorDetails(),
                this.getActorCreditMovies(),
                ])
                .then(axios.spread((actorData,movies) => {
                    this.actorData = actorData.data;
                    this.movies = movies.data.cast;
                    this.movies.sort((a,b) => {
                        return b.vote_average - a.vote_average;
                    });
                    this.loaded = true;
                }))
        },
        methods: {
            getActorDetails() {
                return axios.get('https://api.themoviedb.org/3/person/'+this.id+'?api_key='+process.env.VUE_APP_API_KEY);
            },
            getActorCreditMovies() {
                return axios.get('https://api.themoviedb.org/3/person/'+this.id+'/movie_credits?api_key='+process.env.VUE_APP_API_KEY);
            },
        },
    }
</script>

<style scoped>

</style>