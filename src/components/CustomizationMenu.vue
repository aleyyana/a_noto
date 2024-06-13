<template>
    <div class="customization-menu" v-if="visible" :style="menuStyle">
      <div>
        <label>Font Family:</label>
        <select v-model="localProps.fontFamily" @change="updateProps">
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>
      <div>
        <label>Font Color:</label>
        <input type="color" v-model="localProps.fontColor" @input="updateProps" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      props: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localProps: { ...this.props }
      };
    },
    computed: {
      menuStyle() {
        return {
          position: 'absolute',
          top: `${this.y}px`,
          left: `${this.x}px`,
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '10px',
          zIndex: 1000
        };
      }
    },
    methods: {
      updateProps() {
        this.$emit('update-props', this.localProps);
      }
    },
    watch: {
      props: {
        handler(newProps) {
          this.localProps = { ...newProps };
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  .customization-menu {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  