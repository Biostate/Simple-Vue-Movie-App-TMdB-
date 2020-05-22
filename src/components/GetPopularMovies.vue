<template>
    <div v-if="popularMovies && genres && playingMovies" class="container">
        <div class="row text-white" v-if="customloaded">
            <div class="col-12">
                <h3 class="text-white py-2 pl-2">Choosed by Me</h3>
                <Slider :images="customMovies" sliderClass="custom-movies" controllerClass="custom-movies-controller"></Slider>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-white py-2 pl-2">Popular Movies</h3>
                <Slider 
                :images="popularMovies" 
                sliderClass="popular-movies" 
                controllerClass="popular-movies-controller"
                :genres="genres"></Slider>
            </div>
        </div>
        <div class="row mt-3">
             <div class="col-12">
                <h3 class="text-white py-2 pl-2">Playing Now</h3>
                <Slider :images="playingMovies" sliderClass="playing-movies" controllerClass="playing-movies-controller"></Slider>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios').default;
    import Slider from './MovieSlider'
    import * as firebase from 'firebase/app';
    import 'firebase/database';
    export default {
        data() {
            return {
                popularMovies: null,
                playingMovies:null,
                genres: null,
                customMovies: [],
                customloaded: false,
            }
        },
        components: {
            Slider,
        },
        mounted () {
            firebase.database().ref('/EditorChoises').once('value', snap => {
                this.customMovies = [];
                snap.forEach(item => {
                    this.getMovieDetails(item.val()).then(result => {
                        this.customMovies.push(result.data)
                        if(this.customMovies.length == snap.numChildren())
                            this.customloaded = true;
                    });
                });
            });
            axios.all([
                this.getPopularMovies(),this.getGenres(),this.getPlayingMovies()
                ])
                .then(axios.spread((popularMovies, genres, playingMovies) => {
                    this.popularMovies = popularMovies.data.results;
                    this.playingMovies = playingMovies.data.results;
                    this.genres = genres.data.genres;
                }))
        },
        methods: {
            getPlayingMovies() {
                return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+process.env.VUE_APP_API_KEY+'&language=en-US&page=1')
            },
            getPopularMovies() {
                return axios.get('https://api.themoviedb.org/3/movie/popular?api_key='+process.env.VUE_APP_API_KEY+'&language=en-US&page=1')
            },
            getGenres(){
                return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key='+process.env.VUE_APP_API_KEY+'&language=en-US')
            },
            getMovieDetails(movieID){
                return axios.get('https://api.themoviedb.org/3/movie/'+movieID+'?api_key='+process.env.VUE_APP_API_KEY+'&language=en-US')
            }
        },
    }
</script>

<style>
.slider-item{
    border-radius:10px;
    overflow: hidden;
    position: relative;
    font-family: 'Raleway', sans-serif;
    text-shadow: 2px 2px 2px #000000;
}

.slider-title{
    font-size:18px;
    font-weight: 700;
}

.slider-genres{
    font-size:13px;
}

.slider-vote{
    text-shadow: none;
}

.movie-info{
    position:absolute;
    bottom:0;
    background: rgb(0,0,0);
    background: -moz-linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%);
    background: -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.65) 0%, rgba(0,0,0,0) 100%);
    background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
    width: 100%
}
</style>