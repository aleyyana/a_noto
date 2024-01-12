<template>
    <HeaderView/>
    <main>
        <h1 class="text-center">Fonctionnalités du site</h1>
        <section class="calendar">
            <div class="container">
                <div class="row">
                    <div class="col text-center">
                        <img src="../assets/img/calendar.png" alt="">
                    </div>
                    <div class="col">
                        <h4 class="text-center">Le calendrier</h4>
                        <p class="text_feat">Le calendrier te sert à garder un oeil sur ce que tu dois faire en fonction du temps que t'as.
                            Toujours à l'heure et jamais en retard, tu vas pouvoir organiser tes plans de vie comme tu l'entends. Pas besoin 
                            de se stresse quand on reste organisé.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <div class="blank-space"></div>

        <section class="tasks">
            <div class="container">
                <div class="row">
                    <div class="col text-center">
                        <h4 class="text-center">Le calendrier</h4>
                        <p class="text_feat">Garde toujours tes tâches notées, cela te permet de ne rien oublier et surtout de savoir gérer ton temps. 
                            Aucun tracas, avec A Noto, tu sauras toujours quelles sont tes tâches et tu les feras quand tu veux. Malheureusement, si t'oublies 
                            dans ta tête, c'est point la faute de A Noto. Alors, note toujours tes tâches, ça facilite la vie.
                        </p>
                    </div>
                    <div class="col">
                        <img  class="mx-auto" src="../assets/img/tasks.png" alt="">
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import HeaderView from '../components/HeaderView.vue'

export default{
    setup(){

    },
    components:{
        HeaderView
    }
}

</script>

<style scoped>




.blank-space{
  height: 120px;
}

</style>