const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  resolve:{
    alias:{
      vue$: 'vue/dist/vue/runtime.esm.js'
    }
  }
})
