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
        const archive = this.getExtension(ev);
        let data = reader.result;
        
        let file = null;
        let title = '';

if(archive.ext ==='json'){
          file = JSON.parse(data);
        }else{ 
          // Es un csv
          file = this.processData(data,archive.title);
        }
        title = file.config.title;
        if(title!==''){
          //console.log('Objeto File',file);
          this.$emit('update-json',file);
        }
        //console.log(this.title);
      }.bind(this);
      reader.readAsText(ev.target.files[0]);
    },
    getExtension(ev){
      const path = ev.srcElement.value.split('\\');
      const title = path[path.length-1].split('.')[0]; 
      const ext = path[path.length-1].split('.')[1];
      return {'title': title, 'ext': ext};
    },
    processData(allText,title){
      const allTextLines = allText.split(/[\r\n]+/);
      const sep = ';'
      const headers = allTextLines[0].split(sep);

      const output = {'config':{'title':title}}
      const series = headers.map(e=>{
        return {"name": e};
      });
      series.shift();
      const periods = [];
      for(let i=1; i<allTextLines.length; ++i) {
        const data = allTextLines[i].split(sep);
        const values = []
        if (data.length == headers.length){
          for (let j=1; j<headers.length; ++j) {
            values.push(data[j]);
          }
        }
        periods.push({name: data[0], values: values});
      }
      output.config.series = series;
      output.periods = periods;
      return output;
    }
  }
}
</script>
<style>
.sep{
  padding: 20px;
}
</style>
