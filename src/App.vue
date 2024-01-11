<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg">
      <RouterLink to="/"><img src="../src/assets/img/logo_black_1.png" alt="logo" class="logo navbar-brand"></RouterLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav mr-auto">
              <router-link class="nav-item nav-link" to="/">Home</router-link> 
              <router-link class="nav-item nav-link" to="/about">FAQ</router-link>
              <router-link class="nav-item nav-link" to="/feat">Fonctions</router-link>
              <router-link class="nav-item nav-link" to="/canvas">Get Started</router-link>
          </div>
        </div>
        <TestView class="nav-item nav-link"/>
        <button class="btn_logout" v-if="$store.state.user" @click="$store.dispatch('logout')">Logout</button>
    </nav>
  </div>

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
    FooterView
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

h1, h2, h3, h4, h5{
  font-family: Moniqa, sans-serif;
  color: #D3C7E6;
}

p{
  font-family: Excon-Regular, sans-serif;
  color:#7F803E;
}

.nav-link{
  color:#7F803E;
}

</style>
