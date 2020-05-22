<template>
    <div class="row row mt-3 py-2 bg-dark text-white rounded" v-if="reviews">
        <div class="col-12">
            <h3>REVİEWS</h3>
            <b-media v-for="review in reviews" :key="review.id" class="my-4">
                <template v-slot:aside>
                    <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
                </template>
                <h5 class="mt-0 mb-1">Author: {{ review.author }}</h5>
                <p class="mb-0">
                    {{review.content.substring(0, 100)}}... <router-link :to="$route.path+'/'+review.id">more</router-link>
                </p>
            </b-media>
            <div v-if="reviews.length == 0">
                There is no review.
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios' 
    export default {
        props: ['id'],
        data() {
            return {
                reviews: null
            }
        },
        mounted () {
            this.getReviews().then(result => {
                this.reviews = result.data.results;
            });
        },
        methods: {
            getReviews() {
                return axios.get('https://api.themoviedb.org/3/movie/'+this.id+'/reviews?api_key='+process.env.VUE_APP_API_KEY);
            }
        },
    }
</script>

<style>

</style>