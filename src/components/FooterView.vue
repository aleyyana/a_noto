<template>
    <hr>
       <div class="container-fluid background-footer">
      <div class="content"></div>
      <footer class="row footer">
    
        <div class="links col col-xs-12 col-sm-3 col-sm-pull-6">
          <router-link class="footer-links nav nav-link"  to="/">Home</router-Link>
          <router-link class="nav-item nav-link" to="/about">FAQ</router-link>
          <router-link class="nav-item nav-link" to="/feat">Fonctions</router-link>
        </div>
            <div class="copyright col-xs-12 col-sm-3 col-sm-pull-6">
          <p> &copy; Anne-Sophie El Sayyed </p>
        </div>
        
        <div class="impressum col-xs-12 col-sm-3 col-sm-pull-6">
          <RouterLink to="/" ><img src="../assets/img/logo_black_1.png" alt="logo" class="img"></RouterLink>
          <p>A Noto</p>
        </div>
      </footer>
    </div>
    </template>
    
    <style scoped>
    
    img{
  width: 100px;
    }
    
    .footer{
      align-items: center;
      justify-content: center;
    }
    
    
    .copyright,  .impressum, .links
    {
      text-align: center;
    }
    
    </style>