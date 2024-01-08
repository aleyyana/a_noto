<template>
    <main class="login">
        <section class="forms">
            <form class="register" @submit.prevent="register">
                <h2>S'inscrire</h2>
                <input 
                    type="email" 
                    placeholder="Adresse E-mail"
                    v-model="register_form.email"
                   />
                <input 
                    type="password"
                    placeholder="Mot de Passe"
                    v-model="register_form.password"
                    />
                <input 
                    type="submit" 
                    value="S'inscrire" />

            </form>


            <form class="login" @submit.prevent="login">

                <h2>Se connecter</h2>
                <input 
                    type="email" 
                    placeholder="Adresse E-mail"
                    v-model="login_form.email"
                   />
                <input 
                    type="password"
                    placeholder="Mot de Passe"
                    v-model="login_form.password"
                    />
                <input 
                    type="submit" 
                    value="Se connecter" />

            </form>
        </section>
    </main>
    
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';

export default{
    setup(){
        const login_form = ref({});
        const register_form = ref({});
        const store = useStore();

        const login = () => {
            store.dispatch('login', login_form.value)
        }

        const register = () => {
            store.dispatch('register', register_form.value)
        }

        return{
            login_form,
            register_form,
            login, 
            register
        }
    }

}

</script>

<style>
 </style>