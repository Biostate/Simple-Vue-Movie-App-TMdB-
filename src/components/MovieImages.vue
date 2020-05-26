<template>
    <div class="row mt-3 py-2 bg-dark text-white rounded" v-if="images">
        <div class="col-md-12">
            <h3>Images</h3>
            <div class="slider" v-if="images.length > 0">
                <div class="imageSlider">
                    <div v-for="image in images" :key="image.id">
                        <div class="slider-item">
                            <a :href="'http://image.tmdb.org/t/p/w780'+image.file_path" class="glightbox">
                                <img :src="'http://image.tmdb.org/t/p/w185'+image.file_path" class="img-fluid  tns-lazy-img" :data-src="'https://image.tmdb.org/t/p/w185'+image.file_path" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="imageSliderControll mt-1 float-right">
                    <button class="btn btn-primary">PREV</button>
                    <button class="btn btn-primary ml-2">NEXT</button>
                </div>
            </div>
            <div class="error" v-else>
                There are no images about this movie.
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios').default;
    import { tns } from "../../node_modules/tiny-slider/src/tiny-slider";
    import GLightbox from 'glightbox'
    export default {
        props: ['id'],
        data() {
            return {
                images: null
            }
        },
        mounted () {
            this.getImages().then(result => {
                this.images = result.data.backdrops.slice(0,10);
            }).then(() => {
                tns({
                    container: '.imageSlider',
                    items: 4,
                    slideBy: 'page',
                    gutter: 5,
                    lazyload: true,
                    controlsContainer: '.imageSliderControll',
                    autoplay:false,
                    nav:false,
                });
                GLightbox();
            });
        },
        methods: {
            getImages() {
                return axios.get('https://api.themoviedb.org/3/movie/'+this.id+'/images?api_key='+process.env.VUE_APP_API_KEY);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>