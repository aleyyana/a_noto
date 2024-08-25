<template>
    <div>
      <h1>User Profile</h1>
      
      <!-- Show a loading message until the data is available -->
      <div v-if="loading">
        Loading...
      </div>
      
      <!-- Display user data once it is loaded -->
      <div v-else>
        <p v-if="userData">Name: {{ userData.name }}</p>
        <p v-if="userData">Email: {{ userData.email }}</p>
        
        <!-- Form to update the user profile -->
        <form @submit.prevent="updateProfile">
          <input v-model="userData.name" placeholder="Name" />
          <input v-model="userData.email" placeholder="Email" />
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { getDatabase, ref, onValue, set } from "firebase/database";
  
  export default {
    data() {
      return {
        userData: null,  // User data from Firebase
        loading: true,   // Loading state to handle asynchronous data fetching
      };
    },
    created() {
      const auth = getAuth();
      const database = getDatabase();
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = ref(database, "users/" + user.uid);
  
          // Listen for changes in the user's data
          onValue(userRef, (snapshot) => {
            this.userData = snapshot.val();
            this.loading = false;  // Data is loaded, stop loading
          });
        } else {
          this.loading = false;  // Stop loading if no user is authenticated
        }
      });
    },
    methods: {
      updateProfile() {
        const auth = getAuth();
        const database = getDatabase();
        const user = auth.currentUser;
  
        if (user) {
          const userRef = ref(database, "users/" + user.uid);
  
          // Update the user's data
          set(userRef, this.userData)
            .then(() => {
              console.log("Profile updated successfully");
            })
            .catch((error) => {
              console.error("Error updating profile: ", error);
            });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  