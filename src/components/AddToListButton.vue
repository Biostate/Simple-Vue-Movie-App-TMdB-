<template>
    <div>
        <b-dropdown text="Add My List" v-if="lists">
            <b-dropdown-item-button v-for="list in lists" :key="list.id" @click="add(list.id,list.disable)" :active="list.disable" >
                {{ list.name }}
                </b-dropdown-item-button>
        </b-dropdown>

        <b-dropdown text="Add My List" v-if="!lists">
            <b-dropdown-header id="dropdown-header-label">
                You need to <router-link :to="{ name: 'Login', query: { redirect: $route.path } }">login</router-link> first!
            </b-dropdown-header>
        </b-dropdown>
    </div>
</template>

<script>
    import axios from 'axios'
    import Swal from 'sweetalert2'
    import {mapState} from 'vuex'
    export default {
        props: ['movie_id'],
        data() {
            return {
                lists: null
            }
        },
        computed: {
            ...mapState({
                loggedin: state => state.user.loggedin
            })
        },
        mounted () {
            if(this.loggedin)
            axios.get('https://api.themoviedb.org/3/account/'+localStorage.username+'/lists?session_id='+localStorage.session_id+'&api_key='+process.env.VUE_APP_API_KEY)
            .then(result => {
                this.lists = result.data.results;
            }).then(() => {
                this.lists.forEach(element => {
                    this.IsAdded(element.id).then((result) => {
                        //this.IsIn.push({list_id: element.id, result: result.data.item_present});
                        //element.disable = result.data.item_present;
                        this.$set(element, 'disable', result.data.item_present)
                    })
                });
            })
        },
        methods: {
            add(list_id,isInList) {
                if(!isInList){
                    axios.post('https://api.themoviedb.org/3/list/'+list_id+'/add_item?session_id='+localStorage.session_id+'&api_key='+process.env.VUE_APP_API_KEY,
                    {
                        media_id: this.movie_id
                    }).then(result => {
                        Swal.fire(
                            'Added!',
                            result.data.status_message,
                            'success'
                        )
                    }).catch(result => {
                        Swal.fire(
                            'Error!',
                            'There is a problem!',
                            'error'
                        )
                        console.log(result);
                    })
                }else{
                    axios.post('https://api.themoviedb.org/3/list/'+list_id+'/remove_item?session_id='+localStorage.session_id+'&api_key='+process.env.VUE_APP_API_KEY,
                    {
                        media_id: this.movie_id
                    }).then(result => {
                        Swal.fire(
                            'Removed!',
                            result.data.status_message,
                            'success'
                        )
                        console.log(result);
                    }).catch(() => {
                        Swal.fire(
                            'Error!',
                            'There is a problem!',
                            'error'
                        )
                    })
                }
                this.lists = this.lists.map(element => {
                    if(list_id == element.id)
                        element.disable = !element.disable;
                    return element;
                })
            },
            IsAdded(list_id) {
                return axios.get('https://api.themoviedb.org/3/list/'+list_id+'/item_status?movie_id='+this.movie_id+'&api_key='+process.env.VUE_APP_API_KEY)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>