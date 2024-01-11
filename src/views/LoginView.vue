<template>
    <main class="login">
        <section class="title">
            <h1 class="text-center">Bienvenue sur A Noto, lance toi dans l'aventure !</h1>
        </section>
        <section class="forms">
            <form class="register" @submit.prevent="register">
                <h2 class="text-center">Inscription</h2>
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

                <h2 class="text-center">Connexion</h2>
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

<style scoped>

main{
    max-height: 100vh;
}

.forms{
    display: flex;
    min-height:94vh;
    border: #000 1px;
}

form{
   flex: 1 1 0%;
   padding: 8rem 1rem 1rem;
}

form.register{
    color: #FFF;
    background-color:#D3C7E6;
}

h2{
    font-size:2rem;
    text-transform: uppercase;
    font-family: Excon-Bold, sans-serif;
}

input{
    appearance: none;
    border: none; 
    outline:none;
    background: none;

    display:block;
    width: 100%;
    max-width: 400px;
    margin:0 auto 1rem;
    font-size: 1.5rem;
    padding: 0.5 rem 0rem;
}

input:not([type="submit"]){
    opacity: 0.8;
    transition: 0.4s;
}

input:focus:not([type="submit"]){
    opacity: 1;
}

input::placeholder{
    color:inherit;
}

form.register input:not([type="submit"]){
    color:#FFF;
    border-bottom: 2px solid #FFF;
}

form.login input:not([type="submit"]){
    color:#000;
    border-bottom: 2px solid #000;
}

form.login input[type="submit"]{
 background-color:#D3C7E6 ;
 color:#FFF;
 font-weight: 700;
 padding: 1rem 2rem;
 border-radius: 0.5rem;
 cursor: pointer;
}

form.register input[type="submit"]{
 background-color:#FFF ;
 color:#D3C7E6;
 font-weight: 700;
 padding: 1rem 2rem;
 border-radius: 0.5rem;
 cursor: pointer;
}

/* alert{
    background: #D3C7E6;} */

 </style>