<template>
    <div class="row mt-3 py-2 bg-dark text-white rounded">
        <div class="col-md-12"><h3>Cast</h3></div>
        <div class="col-md-12">
            <div class="row">
                <div v-for="actor in cast" :key="actor.id" class="col-md-2 p-1">
                    <img :src="'http://image.tmdb.org/t/p/w185/'+actor.profile_path" class="img-fluid">
                    <h6 class="mt-2">
                        <router-link class="text-white" :to="'/actor/'+actor.id">{{ actor.name }}</router-link>
                    </h6>
                    <span class="text-muted">{{ actor.character }}</span>
                </div>
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
                cast: null
            }
        },
        mounted () {
            this.getCast().then(result => {
                this.cast = result.data.cast.slice(0,6);
            });
        },
        methods: {
            getCast() {
                return axios.get('https://api.themoviedb.org/3/movie/'+this.id+'/credits?api_key='+process.env.VUE_APP_API_KEY);
            }
        },
    }
</script>

<style>

</style>