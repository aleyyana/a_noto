<template>
  <HeaderView/>
  <main class="home">
    <section class="about">
      <div class="container">

          <div class="row">
              <div class="col text-center">
                  <img src="../assets/img/bullet_2.jpg" alt="">
              </div>

              <div class="col  text-center">
                <h1 class="text-center">A Noto</h1>
                 <p> A noto est un bullet journal en ligne qui vous permet de prendre votre vie en main. 
                  <br>
                  <span class="question">Tu cherches à organiser ta vie ? </span>
                  <br>
                  Ce site est pour toi ! Il t'aidera à organiser une partie de ta vie. 
                  <br>
                  <span class="question"> Tu aimes savoir ce que tu dois faire sans que ce soit sur pleins de papier différents ? </span>
                  <br>
                  Ici, tu peux faire la plus longue liste de choses à faire pour ne jamais oublier et de ne pas t'éparpiller pour rien.
                  <br>
                  Avec A Noto, sois toujours proche de tes tâches importantes.

                 </p>
              </div>
          </div>

      </div>

      <div class="blank-space"></div>
    </section>
    <section class="video">
      <div class="container video text-center">
      <video height="500" ref="videoPlayer" class="responsive_video">
          <source
            src="../assets/video/ELSAYYED_AnneSophie_VIDEO.mp4"
            type="video/mp4"
          />
    </video>

    <div class="text-center">
          <button class="primary btn px-4 py-2 m-1" @click="play"><img class="controls" src="../assets/img/play.png" alt=""> </button>
          <button class="primary btn px-4 py-2 m-1" @click="pause"><img class="controls" src="../assets//img/pause.png" alt=""></button>
          <button class="primary btn px-4 py-2 m-1" @click="stop"><img class="controls" src="../assets/img/stop.png" alt=""></button>
      </div>
    </div>
    </section>
  </main>
</template>

<script>
import HeaderView from '../components/HeaderView.vue'

 export default{
  components: {
    HeaderView
  },
  methods:{
    play() {
      this.$refs.videoPlayer.play();
    },
    pause() {
      this.$refs.videoPlayer.pause();
    },
    stop() {
      const { videoPlayer } = this.$refs;
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    },
    setSpeed(speed) {
      this.$refs.videoPlayer.playbackRate = speed;
    },
  }
 } 

</script>

<style scoped>

img{
  /* width: 729px; */
  max-width: 100%;
  flex-shrink: 0; 
}

.blank-space{
  height: 150px;
}

.video{
  padding: 0;
  margin:0  auto;
}


.question{
  font-weight: bolder;
}

.btn{
  background-color: #E9D7C0;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  border: none;

}

.controls{
  height:1.5rem;
  width:1.5rem;
}


</style>


