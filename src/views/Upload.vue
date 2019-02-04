<template>
  <div class="upload">
    <h1 style="padding: 20px">Carga de Archivo</h1>
    <UploadFile />
  </div>
</template>

<script>
// @ is an alias to /src
import UploadFile from '@/components/UploadFile.vue'

export default {
  name: 'upload',
  components: {
      UploadFile
  }
}
</script>