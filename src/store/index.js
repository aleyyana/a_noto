import {createStore} from 'vuex'
import router from '../router'
import { auth } from '../firebase/firebaseConfig'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
} from 'firebase/auth'

export default createStore({
  data(){
    return{
      email: '',
      password: '',
    }
  }
  ,
  state: {
    user:null
  },
  getters: {
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state){
      state.user = null
    }
  },
  actions: {
    async login ({ commit }, details){
      const {email, password } = details

      try{
        await signInWithEmailAndPassword(auth, email, password)
      }catch (error){
        switch(error.code){
          case 'auth/user-not-found':
            alert("Utilisateur non trouvé")
          break
          case 'auth/wrong-password':
            alert ("Mauvais mot de passe")
          break
          default: 
          alert("Quelque chose n'a pas fonctionné")
        }

        return
      }

      commit ('SET_USER', auth.currentUser)
      router.push('/canvas')
    },
    async register ({ commit }, details){
      const { email, password } = details

      try{
        await createUserWithEmailAndPassword(auth, email, password)
      }catch (error){
        switch(error.code){
          case 'auth/email-already-in-use':
            alert("Email déjà utilisé")
          break
          case 'auth/invalid-email':
            alert ("Email incorrect")
          break
          case 'auth/operation-not-allowed':
            alert("Action non autorisée")
          break
          case 'auth/weak-password':
            alert("Mot de passe faible")
          break
          default: 
          alert("Quelque chose n'a pas fonctionné")
        }

        return
      }

      commit ('SET_USER', auth.currentUser)
      router.push('/canvas')

    },
    async logout ({ commit } ){
      await signOut(auth)
      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser({ commit }){
      auth.onAuthStateChanged(async user =>{
        if (user === null) {
          commit('CLEAR_USER')
        }else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login'){
            router.push('/')
          }
        }
      })
    }
  },
})
