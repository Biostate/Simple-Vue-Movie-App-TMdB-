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
        <div v-if="error" class="text-white">
            ERROR
        </div>
        <div v-if="loaded && color">
            <div :class="{row:true, 'py-4':true, 'text-white':color.isDark(), rounded:true,}" :style="'background:'+color.hex()">
                <div class="col-md-4" style="margin-top:-70px">
                    <img :src="'http://image.tmdb.org/t/p/w500'+movie.poster_path" class="img-fluid shadow" id="poster">
                </div>
                <div class="col-md-8">
                    <h3 class="mt-3 mt-md-0">{{movie.title}} <span :class="{'text-dark':true,'text-white-50':color.isDark()}">/ {{releaseDate}}</span></h3>
                    <h6 :class="{'text-dark':true, 'text-white-50':color.isDark()}">
                         {{genres}}
                    </h6>
                    <p>{{movie.overview}}</p>
                    <AddToListButton :movie_id="movie.id"></AddToListButton>
                </div>
            </div>
            <div class="row mt-3">
                <router-link :to="'/movie/'+movie.id" class="btn btn-dark mr-2" exact active-class="active">Images</router-link>
                <router-link :to="'/movie/'+movie.id+'/cast'" class="btn btn-dark mr-2" exact active-class="active">Cast</router-link>
                <router-link :to="'/movie/'+movie.id+'/reviews'" class="btn btn-dark mr-2" exact active-class="active">Reviews</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    const axios = require('axios').default;
    import ColorThief from 'colorthief'
    var Color = require('color')
    import AddToListButton from './AddToListButton.vue'
    export default {
        props: ['id'],
        data() {
            return {
                movie: null,
                error: false,
                loaded:false,
                color: null
            }
        },
        computed: {
            releaseDate() {
                return this.movie.release_date.substr(0,4); 
            },
            genres(){
                return this.movie.genres.map((item)=>{return item.name}).join(' - ');
            }
        },
        components: {
            AddToListButton,
        },
        created(){
                this.getMovieDetails()
                .then(result => {
                    this.movie = result.data;
                }).then(() => {
                    this.loaded = true;
                    const colorThief = new ColorThief();
                    const img = new Image();

                    img.crossOrigin = 'Anonymous';
                    img.src = 'http://image.tmdb.org/t/p/w185'+this.movie.poster_path

                    img.addEventListener('load', () => {
                        this.color = Color.rgb(colorThief.getColor(img));
                        //console.table({'Light/Dark':this.color.isDark(), 'DarkContrast':this.color.contrast(Color().hex('#343a40')), 'Light Contrast':this.color.contrast(Color('rgba(255,255,255,.5)'))});
                    });
                })
        },
        methods: {
            getMovieDetails() {
                return axios.get('https://api.themoviedb.org/3/movie/'+this.id+'?api_key='+process.env.VUE_APP_API_KEY);
            }
        },
    }
</script>

<style scoped>
.slider-item{
    border-radius:10px;
    overflow: hidden;
    position: relative;
}

</style>