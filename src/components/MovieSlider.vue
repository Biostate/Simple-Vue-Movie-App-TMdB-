<template>
    <div>
        <div :class="sliderClass">
            <div v-for="image in filterMovies" :key="image.id">
                <div class="slider-item" v-if="image.poster_path">
                    <router-link :to="'/movie/'+image.id">
                        <img :src="'https://image.tmdb.org/t/p/w500'+image.poster_path" class="img-fluid tns-lazy-img" :data-src="'https://image.tmdb.org/t/p/w500'+image.poster_path" />
                        <div class="movie-info pt-3 px-2 pb-2">
                            <div class="text-white slider-title">
                                {{image.title}}
                                <span class="text-white slider-vote float-right bg-danger px-2 rounded-pill">{{image.vote_average}}</span>
                            </div>
                            <div class="text-white slider-genres" v-if="genres">{{ getGenreNames(image.genre_ids) }}</div>    
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="mt-1 d-flex justify-content-between" :class="controllerClass">
            <button class="btn btn-primary prev">PREV</button>
            <button class="btn btn-primary next">NEXT</button>
        </div>
    </div>
</template>

<script>
    import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
    export default {
        props: ['images','sliderClass','controllerClass','genres'],
        computed: {
            filterMovies() {
                return this.images.filter((item) => (item.poster_path ? 1 : 0)); 
            }
        },
        mounted () {
            tns({
                container: '.'+this.sliderClass,
                items: 1,
                slideBy: 'page',
                gutter: 15,
                lazyload: true,
                mouseDrag:true,
                controlsContainer: '.'+this.controllerClass,
                autoplay:false,
                nav:false,
                responsive:{
                    992:{
                        items:4
                    },
                    768:{
                        items:3
                    },
                    576:{
                        items:2
                    },
                },
            });
        },
        methods: {
            getGenreNames(ids) {
                return this.genres.filter((item)=>{return ids.includes(item.id)}).map((item)=>{return item.name}).join(' - ')
            }
        },
    }
</script>

<style scoped>

</style>