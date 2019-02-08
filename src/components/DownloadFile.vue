<template>
  <div class="download">
    
    <a id="download" class="btn btn-outline-info btn-sm" 
      download="grafico.png"
      href=""
      @click="onDirSelected">
      Descargar Grafico
    </a>
  </div>
</template>

<script>

export default {
  name: 'DownloadFile',
  props: {
    imageBase: String,
  },
  data: function () {
      return {
        title: '',
        loading: false,
      }
  },
  methods: {
    onDirSelected(ev){
      var image = new Image();
      console.log(this.imageBase);
      image.src = this.imageBase;
      document.getElementById("download").href = image.src;
    }
  }
}
</script>
<style>
.sep{
  padding: 20px;
}
</style>
