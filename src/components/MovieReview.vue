<template>
    <div class="row row mt-3 py-2 bg-dark text-white rounded" v-if="review">
        <div class="col-12">
            <h6>{{review.author}} <a target="_blank" :href="review.url">Read on TMdB</a></h6>
            <p>
                {{review.content}}
            </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios' 
    export default {
        props: ['review_id','id'],
        data() {
            return {
                review: null
            }
        },
        mounted () {
            this.getReview().then(result => {
                this.review = result.data;
            });
        },
        methods: {
            getReview() {
                return axios.get('https://api.themoviedb.org/3/review/'+this.review_id+'?api_key='+process.env.VUE_APP_API_KEY);
            }
        },
    }
</script>

<style>

</style>