<template>
  <div class="image-container">
    <input type="file" @change="handleFileUpload" />
    <img v-if="localProps.src" :src="localProps.src" :style="imageStyle" />
    <div class="controls" v-if="localProps.src">
      <label>Width:</label>
      <input type="number" v-model="localProps.width" @input="updateDimensions" min="50" max="1000" />
      <label>Height:</label>
      <input type="number" v-model="localProps.height" @input="updateDimensions" min="50" max="1000" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['props'],
  data() {
    return {
      localProps: { ...this.props },
    };
  },
  computed: {
    imageStyle() {
      return {
        width: this.localProps.width + 'px',
        height: this.localProps.height + 'px',
      };
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localProps.src = e.target.result;
          this.$emit('update-props', this.localProps);
        };
        reader.readAsDataURL(file);
      }
    },
    updateDimensions() {
      this.$emit('update-props', this.localProps);
    },
  },
  watch: {
    props: {
      handler(newProps) {
        this.localProps = { ...newProps };
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
.controls {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}
</style>
