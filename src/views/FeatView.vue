<template>
      <div class="blank-space"></div>
    <main>
        <h1 class="text-center">Fonctionnalités du site</h1>
        <!-- <section class="calendar">
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
        </section> -->

        <div class="blank-space"></div>

        <section class="tasks">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col text-center">
                        <h4 class="text-center">La liste des tâches à faire</h4>
                        <p class="text_feat">Garde toujours tes tâches notées, cela te permet de ne rien oublier et surtout de savoir gérer ton temps. 
                            Aucun tracas, avec A Noto, tu sauras toujours quelles sont tes tâches et tu les feras quand tu veux.
                        </p>
                    </div>
                    <div class="col text-center">
                        <img  class="mx-auto" src="../assets/img/add_todolist.png" alt="">
                    </div>
                </div>
            </div>
        </section>

        <div class="blank-space"></div>

        <section class="notes">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col text-center">
                        <img  class="mx-auto" src="../assets/img/add_note.png" alt="">
                    </div>
                    <div class="col text-center">
                        <h4 class="text-center">Faire des notes</h4>
                        <p class="text_feat">Si tu veux raconter ta vie, c'est ici. Prends des notes faciles et arrange les sur ton canvas comme tu le souhaites
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <div class="blank-space"></div>

        <section class="image">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col text-center">
                        <h4 class="text-center">Ajouter des images</h4>
                        <p class="text_feat">Décore ton bullet journal avec les images que tu veux intégrer. 
                            Tu peux y mettre ta propre empreinte pour te sentir vraiment comme chez toi.
                        </p>
                    </div>
                    <div class="col">
                        <img  class="mx-auto" src="../assets/img/add_image.png" alt="">
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>


export default{
  components: {
  },
 } 

</script>

<style scoped>

h4{
    text-decoration: underline;
    text-decoration-color: #DAA38F;
}

.blank-space{
  height: 50px;
}

</style>