<template>
  <div class="note" :style="noteStyle">
    <textarea v-model="localProps.text" @input="updateText" placeholder="Enter note..."></textarea>
    <div class="controls">
      <label>Font Size:</label>
      <input type="number" v-model="localProps.fontSize" @input="updateFontSize" min="10" max="50" />
      <label>Font Color:</label>
      <input type="color" v-model="localProps.fontColor" @input="updateFontColor" />
      <label>Background Color:</label>
      <input type="color" v-model="localProps.backgroundColor" @input="updateBackgroundColor" />
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
    noteStyle() {
      return {
        fontSize: this.localProps.fontSize + 'px',
        color: this.localProps.fontColor,
        backgroundColor: this.localProps.backgroundColor,
      };
    },
  },
  methods: {
    updateText() {
      this.$emit('update-props', this.localProps);
    },
    updateFontSize() {
      this.$emit('update-props', this.localProps);
    },
    updateFontColor() {
      this.$emit('update-props', this.localProps);
    },
    updateBackgroundColor() {
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
.note {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  position: relative;
}
textarea {
  width: 100%;
  height: 60px;
  border: none;
  resize: none;
  outline: none;
  font-family: inherit;
  background: transparent;
}
.controls {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
</style>
