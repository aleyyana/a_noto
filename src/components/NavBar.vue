<template>

<div id="nav" class="header">
    <nav class="navbar navbar-expand-lg navbar-fixed-top">
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
        <!-- <button class="btn_logout" v-if="$store.state.user" @click="$store.dispatch('logout')">Logout</button> -->
    </nav>
    </div>
    
</template>

<script>

</script>

<style>

</style>