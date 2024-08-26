<template>
  <div class="note" :style="noteStyles">

    <textarea v-model="localProps.text" @input="updateText" placeholder="Ajouter note" :styles="textareStyles"
     ></textarea>
  </div>
  
</template>

<script>
export default {
  props: {
    initialStyles: {
      type: Object,
      default: () => ({
        color: '#000000',
        fontSize: '16px',
        backgroundColor: '#ffffff',
      }),
    },
  },
  // props: ['props'],
  data() {
    return {
      styles: this.initialStyles,
      localProps: { ...this.props }, // Create a local copy of props
    };
  },
  computed: {
    noteStyles() {
      return {
        fontSize: this.localProps.fontSize + 'px',
        color: this.localProps.fontColor,
        backgroundColor: this.localProps.backgroundColor,
      };
    },
  },
  methods: {
    openmenu(event){
      this.$emit('openMenu', {
        id: this._uid,
        styles : this.styles,
        position: {
          top: event.clientY,
          left: event.clientX,
        }
      })
    },
    updateText() {
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
