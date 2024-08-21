<template>
    <NavBar/>
</template>

<script>
import NavBar from './NavBar.vue';

export default{
  components:{
    NavBar

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