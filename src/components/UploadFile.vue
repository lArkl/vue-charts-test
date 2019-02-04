<template>
  <div class="upload">
    
    <input style="display:none" type="file"
    @change="onFileSelected" ref="fileInput">
    <button class="btn btn-outline-success btn-sm" 
      @click="$refs.fileInput.click()">
      Subir Archivo
    </button>
    <div v-if="loaded==true">
      <div class="sep">
        <h4> Nombre de la serie: {{ json.config.title }}  </h4>
      </div>
      <div class="sep">
            {{ json }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UploadFile',
  props: {
    msg: String,
    loaded: Boolean,
    json: Object
  },
  data: function () {
      return {
        title: '',
        loading: false,
      }
  },
  methods: {
    onFileSelected(ev){
      var reader = new FileReader();
      reader.onload = function(e) {
        let data = reader.result;
        let file = JSON.parse(data);
        let title = file.config.title;
        if(title!==''){
          //console.log('Objeto File',file);
          this.$emit('update-json',file);
        }
        //console.log(this.title);
      }.bind(this);
      reader.readAsText(ev.target.files[0]);
    }
  }
}
</script>
<style>
.sep{
  padding: 20px;
}
</style>
