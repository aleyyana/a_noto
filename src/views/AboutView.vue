<template>
  <main class="about">
    <section class="Header">
      <h1 class="text-center">A Noto, c'est quoi ?</h1>
    </section>
    <div class="blank-space"></div>
    <section class="info">

      <div class="container">
        <div class="row">
          <div class="col">
            <img class="img_about" src="../assets/img/bullet_1.jpg" alt="">
          </div>
          <div class="col">
            <p class="content">
              A noto est un projet qui est inspiré des bullet journaux. 
              D'une simplicité très claire, le site permet à son utilisateur
              de facilement prendre en main les différentes fonctionnalités 
              tout en gardant ses informations liées à des adresse mail différentes.
              Si vous appréciez avoir un endroit où vous pouvez gérer votre vie,
              vos listes de tâches à faire ou encore votre liste de course, A noto
              est fait pour vous. Il est facile de s'y retrouver, facile d'effacer
              les tâches accomplies et facile d'en ajouter. Vous pouvez même y prendre 
              des notes pour des cours ou encore juste des informations que souhaitez ne pas
              oublier comme un mémo, un petit rappel placé pile devant vos yeux quand vous travaillez
              sur l'ordinateur. A noto est un site conçu par une fan de bullet journal pour des personnes
              curieuse de tenter également l'expérience d'une vie plus rangée, plus organisée.
            </p>
          </div>
        </div>
      </div>

      <div class="blank-space"></div>
    </section>
    <section class="faq">
        <div class="container">
            <h1 class="text-center"> Foire à questions</h1>
            <div class="card">
                <div class="card-body">
                <h3 class="card-title text-center">Qu'est-ce qu'un Bullet Journal ?</h3>
                <p class="card-text">Le concept de Bullet Journal est apparu grâce à un designer du nom de <i>Ryder Carroll</i>.
                C'est une méthode d'organisation personnelle et personnalisable qui se fait sous la forme de cahiers. 
                </p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                <h3 class="card-title text-center">A Noto est-il aussi efficace qu'un vrai Bullet Journal ?</h3>
                <p class="card-text"> Comme c'est une version numérique encore en développement, l'utilisateur peut déjà y faire quelques activités. 
                  D'autres activités pourraient effectivement s'ajouter se rapprochant donc d'un vrai Bullet Journal. 
                </p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                <h3 class="card-title text-center">Un Bullet Journal, ça demande beaucoup de créativité ?</h3>
                <p class="card-text">En général, ceux qui font des Bullet journal papier sont très créatifs. Ce n'est pas ce qui est important sur A Noto étant 
                  donné qu'il est là surtout pour aider son utilisateur à y noter les tâches importantes à faire.
                </p>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>

<script>



export default{
  components:{

  }

}


</script>

<style scoped>
  .img_about{
    height: 50vh;
  }

  .blank-space{
  height: 80px;
}

.card{
  border-color: #BAD6D1;
  border-radius: 25px;
  border-width: 3px;
}

.card-title{
  font-size: 1.2rem;
  color:#BAD6D1;
}

</style>