<template>

<header class="navbar px-3">
    <div class="container">
      <div class="logo">
        <RouterLink to="/"><img src="../assets/img/logo_2.png" alt="logo" class="logo navbar-brand"></RouterLink>
      </div>
      <nav :class="{ 'is-active': isNavOpen }">
        <ul>
          <li v-for="link in links" :key="link.text">
              <router-link :to="link.to">{{ link.text }}</router-link>
          </li>
          <!-- Conditionally show the logout button if the user is authenticated -->
          <li>
            <button class="logout-button" v-if="$store.state.user" @click="$store.dispatch('logout')">Logout</button>
          </li>
        </ul>
        
      </nav>
      <button class="menu-toggle" @click="toggleNav">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>

    
</template>

<script>

export default {
  data() {
    return {
      isNavOpen: false,
      links: [
        { text: 'Home', to: '/' },
        { text: 'About', to: '/about' },
        { text: 'Fonctionnalités', to: '/feat' },
        {text:  'Mon Canvas', to: '/login' }
        
      ]
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    logout() {
      // Handle logout logic here
      // For example, clearing the user session and redirecting
      this.isAuthenticated = false;
      this.$router.push('/login');
    }
  },
  created() {
    // Example of setting the authenticated state
    // In a real application, this would likely be based on an API call or a Vuex store
    this.isAuthenticated = !!localStorage.getItem('userToken'); // Adjust based on your auth logic
  }
};

</script>

<style>

.logo{
  width:7em;
}

.logout-button{
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  color: #E9D7C0;
  border: 3px solid #E9D7C0;
  background-color: #ffffff;
  font-family: Excon-Medium;
}

.navbar {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  background-color: #bad6d1;
  color: #bad6d1;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar .logo a {
  color: #000;
  text-decoration: none;
  font-size: 1.5rem;
}

.navbar nav {
  display: flex;
}

.navbar nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.navbar nav ul li a {
  color: #fff;
  text-decoration: none;
  font-family: Excon-Medium;
  padding-top: 2em;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle .bar {
  width: 2rem;
  height: 0.2rem;
  background: #DACBDB;
  border-radius: 0.2rem;
}

@media (max-width: 768px) {
  .navbar nav {
    display: none;
    flex-direction: column;
  }

  .navbar nav.is-active {
    display: flex;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
