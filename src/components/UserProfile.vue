<template>
  <div class="profile">
    <h2>User Profile</h2>
    <div>
      <label>Email:</label>
      <input type="email" v-model="email" disabled />
    </div>
    <div>
      <label>Username:</label>
      <input type="text" v-model="username" @blur="updateProfile" />
    </div>
    <div>
      <label>New Password:</label>
      <input type="password" v-model="newPassword" />
    </div>
    <button @click="changePassword">Change Password</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { auth, db } from '../firebase/firebaseConfig';

export default {
  data() {
    return {
      email: '',
      username: '',
      newPassword: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  async created() {
    const user = auth.currentUser;
    if (user) {
      this.email = user.email;
      const doc = await db.collection('users').doc(user.uid).get();
      this.username = doc.exists ? doc.data().username : '';
    }
  },
  methods: {
    async updateProfile() {
      try {
        const user = auth.currentUser;
        if (user) {
          await db.collection('users').doc(user.uid).set({
            username: this.username,
          });
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';
        }
      } catch (error) {
        this.errorMessage = error.message;
        this.successMessage = '';
      }
    },
    async changePassword() {
      try {
        const user = auth.currentUser;
        if (user && this.newPassword) {
          await user.updatePassword(this.newPassword);
          this.successMessage = 'Password changed successfully!';
          this.errorMessage = '';
          this.newPassword = ''; // Clear password field
        }
      } catch (error) {
        this.errorMessage = error.message;
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.profile {
  padding: 20px;
  max-width: 400px;
  margin: auto;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
