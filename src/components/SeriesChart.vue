<template>
  <div class="series-chart">
    <div id="buttons">
      <button class="btn btn-outline-primary btn-sm" 
        v-on:click="changeChart">
        {{ typeChart }}
      </button>
    </div>
    <div class="container">
        <canvas id="planet-chart"></canvas>
    </div>
      <button class="btn btn-outline-secondary btn-sm" 
        v-on:click="resetZoom">Reiniciar</button>
        &nbsp;&nbsp;&nbsp;
    <download v-bind:imageBase="image">
    </download>
  </div>
</template>

<script>
/* eslint-disable */
import data from '../assets/serie.json'
// ChartJS
import Chart from 'chart.js'
import zoom from 'chartjs-plugin-zoom';
import { createData,options } from '../chart-data-json.js'
import download from '@/components/DownloadFile.vue'

export default {
  name: 'SeriesChart',
  components:{
    download
  },
  props: {
    msg: String,
    json: Object
  },
  data: function () {
      return {
        errored: false,
        loading: true,
        typeCounter: 0,
        types : ['Line','Bar'],
        typeChart: '',
        myChart: null,
        chartData: null,
        options: null,
        image: '',
      }
  },
  methods: {
    changeChart(){
      //Mostramos la carga
      this.loading = true;
      
      //Cambiamos el grafico
      this.typeCounter = (this.typeCounter+1) % (this.types.length);
      this.typeChart = this.types[this.typeCounter];
      this.myChart.destroy();
      this.createChart('planet-chart',this.chartData);
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      this.setImage(chartData);
      //console.log(chartData.options.animation);
      this.myChart = new Chart(ctx, {
        type: this.typeChart.toLowerCase(),
        data: chartData.data,
        options: chartData.options,
      });
    },
    setImage(chartData){
      chartData.options.animation = {
        onComplete: (animation) =>{
          this.image = this.myChart.toBase64Image();
          //document.getElementById("url").src = this.image;
          this.loading = false;
        }
      }
    },
    resetZoom(){
      this.myChart.resetZoom();
    }
  },
  mounted(){
    Chart.defaults.global.animation.duration = 1000;
    //Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(244,0,0,0.8)'
    this.chartData = createData(this.json);
    //Guardamos una copia
    this.options = options;//JSON.parse(JSON.stringify(options));
    this.typeChart = this.types[this.typeCounter];
    this.createChart('planet-chart',this.chartData);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#buttons{
  padding: 20px;
}
.chart-container{
  position: relative;
  height:90vh; 
  width:80vw;
  margin: auto;
}
#mini-chart{
  position: relative;
  width:20vw;
  margin: auto;
}
</style>