<template>
  <div class="image-container">
    <input type="file" @change="handleFileUpload" />
    <div v-for="(image, index) in localProps.images" :key="index" class="image-item">
      <img :src="imagesrc" :style="getImageStyle(image)" />
      <!-- <div class="controls">
        <label>Width:</label>
        <input 
          type="number" 
          v-model.number="image.width" 
          @input="updateDimensions(index)" 
          min="50" 
          max="1000" 
        />
        <label>Height:</label>
        <input 
          type="number" 
          v-model.number="image.height" 
          @input="updateDimensions(index)" 
          min="50" 
          max="1000" 
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { saveCanvasData, fetchCanvasData } from '../firebase/firebaseService'; // Adjust the path accordingly

export default {
  props: {
    props: Object,
  },
  setup(props, { emit }) {
    const localProps = ref({ images: [] });

    const getImageStyle = (image) => ({
      width: image.width + 'px',
      height: image.height + 'px',
    });

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Add new image to the array
          localProps.value.images.push({
            src: e.target.result,
            width: 200,
            height: 200,
          });
          emit('update-props', localProps.value);
          saveCanvasData(localProps.value).catch(err => console.error('Error saving canvas data:', err));
        };
        reader.readAsDataURL(file);
      }
    };

    const updateDimensions = () => {
      emit('update-props', localProps.value);
      saveCanvasData(localProps.value).catch(err => console.error('Error saving canvas data:', err));
    };

    onMounted(async () => {
      try {
        const canvasData = await fetchCanvasData();
        const images = canvasData.filter(element => element.type === 'ImageComponent');
        localProps.value.images = images.map(image => image.props);
      } catch (err) {
        console.error('Error fetching canvas data:', err);
      }
    });

    watch(
      () => props.props,
      (newProps) => {
        localProps.value = { ...newProps };
      },
      { deep: true }
    );

    return {
      localProps,
      getImageStyle,
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
.image-item {
  margin-bottom: 10px;
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
