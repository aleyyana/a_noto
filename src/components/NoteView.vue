<template>
  <div class="note" :style="noteStyles">
    <textarea 
      v-model="note.text" 
      @input="updateText" 
      placeholder="Ajouter note"
      :style="textareaStyles"
    ></textarea>
  </div>
</template>

<script>
import { saveCanvasData, fetchCanvasData } from '../firebase/firebaseService'; // Import Firestore service functions

export default {
  props: ['initialText', 'styles'],
  data() {
    return {
      note: {
        text: this.initialText || '',
      },
      localProps: { ...this.styles }, // Create a local copy of styles prop
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
    textareaStyles() {
      return {
        fontSize: this.localProps.fontSize + 'px',
        color: this.localProps.fontColor,
      };
    },
  },
  methods: {
    updateText() {
      this.$emit('update', this.note);  // Emit updated note data to parent component
      saveCanvasData();  // Save canvas data to Firestore whenever the text is updated
    },
    openmenu(event) {
      this.$emit('openMenu', {
        id: this._uid,
        styles: this.styles,
        position: {
          top: event.clientY,
          left: event.clientX,
        }
      });
    },
  },
  watch: {
    styles: {
      handler(newStyles) {
        this.localProps = { ...newStyles };
      },
      deep: true,
    },
  },
  async mounted() {
    // If you need to fetch the note data specifically when the component is mounted
    const canvasData = await fetchCanvasData();
    // Update the note's text if it has changed
    const noteFromCanvas = canvasData.find(item => item.type === 'Note' && item.props.text === this.note.text);
    if (noteFromCanvas) {
      this.note.text = noteFromCanvas.props.text;
    }
  }
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
