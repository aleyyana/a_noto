<template>
    <button class="btn_logout navbar-right" v-if="$store.state.user" @click="$store.dispatch('logout')">Logout</button>
    <router-view/>
    <FooterView/>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import FooterView from './components/FooterView.vue';


export default{
  setup(){
    const store = useStore()

    onBeforeMount(()=> {
      store.dispatch('fetchUser')
    })
  },
  components:{
    FooterView,
  },
}

</script>

<style>

html{
  scroll-behavior: smooth;
}

.btn_logout{
  padding: 10px;
    width: 100px;
    background-color: #f1b598;
    border-radius: 1.5rem;
}

.navbar-brand{
  width: 100px;
}



/* h1, h2, h3, h4, h5{
  font-family: Moniqa, sans-serif;
  color: #7F803E;
}



p{
  font-family: Excon-Regular, sans-serif;
  color:#7F803E;
} */

.nav-link{
  color:#7F803E;
}

</style>
