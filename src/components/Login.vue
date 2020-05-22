<template>
     <div class="container text-white">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-sm-8 col-6 py-3 bg-dark rounded">
                <h3 class="text-center">Login</h3>
                <form v-on:submit.prevent>
                    <div class="form-group">
                        <label for="Username">Username</label>
                        <input type="text" class="form-control" id="Username" name="Username" v-model="tmpusername">
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="password" class="form-control" id="Password" name="Password" v-model="tmppassword">
                        <small class="form-text text-muted">Your password never stored.</small>
                    </div>
                    <button class="btn btn-primary" @click="login">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapActions} from 'vuex'
    export default {
        data() {
            return {
                tmpusername: null,
                tmppassword: null,
                session_request_token: null
            }
        },
        computed:{
            ...mapState({
                request_token: state => state.user.request_token,
                
            })
        },
        async mounted () {
            if(this.request_token == null)
                await this.getRequestToken().then(result => {
                    this.updateRequestToken(result.data.request_token);
                })
        },
        methods: {
            ...mapActions('user',[
                'updateRequestToken',
                'updateSessionID',
            ]),
            async login() {
                await this.getSessionRequestToken().then(result => {
                    this.session_request_token = result.data.request_token;
                });
                await this.getSessionToken().then(result => {
                    this.updateSessionID({session_id: result.data.session_id, username: this.tmpusername, redirect:this.$route.query.redirect});
                });
            },
            getRequestToken(){
                return axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key='+process.env.VUE_APP_API_KEY);
            },
            getSessionRequestToken(){
                return axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key='+process.env.VUE_APP_API_KEY, {
                    username: this.tmpusername,
                    password: this.tmppassword,
                    request_token: this.request_token
                });
            },
            getSessionToken(){
                return axios.post('https://api.themoviedb.org/3/authentication/session/new?api_key='+process.env.VUE_APP_API_KEY, {
                    request_token: this.session_request_token
                });
            },
        },
    }
</script>

<style scoped>

</style>