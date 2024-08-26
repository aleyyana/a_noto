<template>
    <div class="customization-menu" v-if="visible" :style="menuPosition">
      <div>
        <label>Font Color:</label>
        <input type="color" v-model="fontColor" @input="updateStyles" />
      </div>
      <div>
        <label>Font Size:</label>
        <input type="number" v-model="fontSize" @input="updateStyles" />
      </div>
      <div>
        <label>Background Color:</label>
        <input type="color" v-model="backgroundColor" @input="updateStyles" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      position: {
        type: Object,
        default: () => ({ top: 0, left: 0 }),
      },
      elementStyles: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        fontColor: this.elementStyles.color || '#000000',
        fontSize: parseInt(this.elementStyles.fontSize) || 16,
        backgroundColor: this.elementStyles.backgroundColor || '#ffffff',
      };
    },
    computed: {
      menuPosition() {
        return {
          top: this.position.top + 'px',
          left: this.position.left + 'px',
        };
      },
    },
    methods: {
      updateStyles() {
        this.$emit('updateStyles', {
          color: this.fontColor,
          fontSize: this.fontSize + 'px',
          backgroundColor: this.backgroundColor,
        });
      },
    },
    watch: {
      elementStyles: {
        immediate: true,
        handler(newStyles) {
          this.fontColor = newStyles.color || '#000000';
          this.fontSize = parseInt(newStyles.fontSize) || 16;
          this.backgroundColor = newStyles.backgroundColor || '#ffffff';
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .customization-menu {
    position: absolute;
    background: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
  }
  .customization-menu div {
    margin-bottom: 10px;
  }
  </style>
  