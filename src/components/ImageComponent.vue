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
import { ref, watch, onMounted, computed } from 'vue';
import { saveCanvasData, fetchCanvasData } from '../firebase/firebaseService'; // Adjust the path accordingly

export default {
  props: ['props'],
  setup(props, { emit }) {
    const localProps = ref({ ...props });

    const imageStyle = computed(() => ({
      width: localProps.value.width + 'px',
      height: localProps.value.height + 'px',
    }));

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          localProps.value.src = e.target.result;
          emit('update-props', localProps.value);
          saveCanvasData(); // Save canvas data to Firestore
        };
        reader.readAsDataURL(file);
      }
    };

    const updateDimensions = () => {
      emit('update-props', localProps.value);
      saveCanvasData(); // Save canvas data to Firestore
    };

    onMounted(async () => {
      const canvasData = await fetchCanvasData();
      const imageComponent = canvasData.find(element => element.type === 'ImageComponent');
      if (imageComponent) {
        localProps.value = { ...imageComponent.props };
      }
    });

    watch(
      () => props,
      (newProps) => {
        localProps.value = { ...newProps };
      },
      { deep: true }
    );

    return {
      localProps,
      imageStyle,
      handleFileUpload,
      updateDimensions,
    };
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
