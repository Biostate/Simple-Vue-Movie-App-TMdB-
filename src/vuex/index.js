import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        user:{
            namespaced:true,
            state : {
                username: localStorage.username || null,
                age: 17,
                loggedin: localStorage.session_id != null ? true : false,
                session_id: localStorage.session_id || null,
                request_token: localStorage.request_token || null,
                list: localStorage.lists ? JSON.parse(localStorage.lists) : null,
            },
            getters : {
                message(state){
                    return "Hey "+ state.username;
                },
                loggedin(state){
                    return state.loggedin;
                },
                getSessionID(state){
                    return state.session_id;
                }
            },
            mutations :{
                setUsername(state, value){
                    state.username = value;
                },
                updateRequestToken(state,value){
                    localStorage.request_token = value;
                    state.request_token = value;
                },
                updateSessionID(state,value){
                    localStorage.session_id = value.session_id;
                    state.session_id = value;
                    state.username = value.username;
                    localStorage.username = value.username;
                    state.loggedin = true;
                    if(value.redirect)
                        router.push({ path: value.redirect})
                    else
                        router.push({ name: 'Home'})
                },
                logout(state){
                    axios({
                        method: 'delete',
                        url: 'https://api.themoviedb.org/3/authentication/session?api_key='+process.env.VUE_APP_API_KEY, 
                        data: {session_id: localStorage.session_id}
                    }).then(result => {
                        if(result.data.success){
                            state.session_id = null;
                            localStorage.removeItem("session_id");
                            localStorage.removeItem("lists");
                            localStorage.removeItem("request_token");
                            localStorage.removeItem("username");
                            state.loggedin = false;
                            state.username = "Stranger";
                            router.push({ name: 'Login',})
                        }
                        console.log(result)
                    });
                   
                },
                pushlist(state, value){
                    state.list = value;
                    localStorage.lists = JSON.stringify(state.list);
                },
                removelist(state, value){
                    state.list = state.list.filter((key, index) => {
                        return index != value
                    });
                    localStorage.lists = JSON.stringify(state.list);
                }
            },
            actions : {
                update({ commit },value){
                    commit('setUsername',value);
                },
                login({ commit }){
                    commit('login');
                },
                logout({ commit }){
                    commit('logout');
                },
                updateRequestToken({ commit },value){
                    commit('updateRequestToken',value);
                },
                updateSessionID({ commit },value){
                    commit('updateSessionID',value);
                },
                addtolist({ commit },value){
                    commit('pushlist',value);
                },
                removefromlist({ commit },value){
                    commit('removelist',value);
                },
            },
        }
    }
});

export default store;