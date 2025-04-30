<template>
  <div class="flex flex-col items-center p-4">
    <!-- File Upload Section -->
    <label for="file-input"
      class="p-4 bg-gray-100 text-gray-600 rounded-md border-2 border-dashed cursor-pointer hover:bg-gray-200 transition">
      <span class="text-sm">{{ placeholder }}</span>
      <input id="file-input" type="file" class="hidden" @change="handleFileChange" />
    </label>

    <!-- <div v-if="filePreview" class="mt-4 w-full max-w-xs">
      <div v-if="fileType.startsWith('image')" class="w-full">
        <img :src="filePreview" alt="Preview" class="rounded-lg" />
      </div>
      <div v-else class="text-center text-gray-600">
        <p><strong>{{ fileName }}</strong></p>
        <p class="text-sm text-gray-500">File Type: {{ fileType }}</p>
      </div>
    </div> -->

    <div v-if="fileName" class="mt-4">
      <a v-if="selectedFile" :href="filePreview" class="text-matcha hover:underline" :download="fileName">
        Download {{ fileName }}
      </a>
    </div>

    <div v-if="isUploading" class="w-full mt-4">
      <div class="bg-gray-200 rounded-full h-2.5">
        <div class="bg-matcha h-2.5 rounded-full transition-all" :style="{ width: `${uploadProgress}%` }"></div>
      </div>
    </div>

    <div v-if="isUploading" class="mt-2 text-center text-gray-600">
      <span>Uploading... {{ Math.round(uploadProgress) }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['update:modalValue'])
const props = defineProps({
  modalValue: {
    required: true,
  },
  placeholder: {
    type: String,
  },
})
const filePreview = ref(null)
const fileName = ref('')
// const fileType = ref('')
const isUploading = ref(false)
const selectedFile = ref(null)
const uploadProgress = ref(0)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    fileName.value = file.name
    // fileType.value = file.type

    // Preview for image files
    // if (file.type.startsWith('image')) {
    //   const reader = new FileReader()
    //   reader.onload = () => {
    //     filePreview.value = reader.result
    //   }
    //   reader.readAsDataURL(file)
    // } else {
    //   // For non-image files, show a generic preview
    //   filePreview.value = null
    // }
    filePreview.value = URL.createObjectURL(file)
    emit('update:modalValue', file);

    uploadFile(file)
  }
}

const uploadFile = (file) => {
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100
        uploadProgress.value = progress
      }
    }
  }

  isUploading.value = true
  uploadProgress.value = 0

  const fakeUploadInterval = setInterval(() => {
    if (uploadProgress.value < 100) {
      uploadProgress.value += Math.random() * 40;
      if (uploadProgress.value > 100) {
        uploadProgress.value = 100;
      }
    } else {
      clearInterval(fakeUploadInterval);
    }
  }, 200);
}
</script>

<style scoped>
/* Tailwind CSS classes handle styling */
</style>
