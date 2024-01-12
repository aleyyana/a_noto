<template>

  <div id="nav" class="header">
    <nav class="navbar navbar-expand-lg">
      <RouterLink to="/"><img src="../assets/img/logo_black.png" alt="logo" class="logo navbar-brand"></RouterLink>
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


export default{
  components:{

  },
}

</script>

<style scoped>

  /* Style the header */
.header {
  padding: 10px 16px;
}

/* Page content */
.content {
  padding: 16px;
}

/* The sticky class is added to the header with JS when it reaches its scroll position */
.sticky {
  position: fixed;
  top: 0;
  width: 100%
}

/* Add some top padding to the page content to prevent sudden quick movement (as the header gets a new position at the top of the page (position:fixed and top:0) */
.sticky + .content {
  padding-top: 102px;
}
</style>