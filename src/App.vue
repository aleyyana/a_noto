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
  padding: 10px 24px;
  width: 100px;
  background-color: #BAD6D1;
  border-radius: 1.5rem;
  border:none;
}

.navbar-brand{
  width: 100px;
}


</style>
