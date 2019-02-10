<template>
  <div class="series-chart">
    <div id="buttons">
      <button class="btn btn-outline-primary btn-sm" 
        v-on:click="changeChart">
        {{ typeChart }}
      </button>
    </div>
    <div class="container">
      <div id="main" class="chart-container"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import data from '../assets/serie.json'

import { createEData } from '../chart-data-json.js';
import download from '@/components/DownloadFile.vue';
import * as echarts from 'echarts';

export default {
  name: 'SeriesEChart',
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
        typeChart:'',
        chartData: null,
        types : ['Line','Bar'],
        myChart: null,
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
      const type = this.chartData.series.map((e)=>{
        const t = {type: this.typeChart.toLowerCase()};
        return t;
      });
      this.chartData.series = type;
      this.myChart.setOption(this.chartData);
    },
    createChart(chartId, chartData) {
      this.myChart = echarts.init(document.getElementById(chartId))
      this.myChart.setOption(chartData);
    },
  },
  mounted(){
    //Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(244,0,0,0.8)'
    this.chartData = createEData(this.json);
    //console.log(this.chartData);
    //Guardamos una copia
    this.typeChart = this.types[this.typeCounter];
    this.createChart('main',this.chartData);
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
  height:70vh; 
  width:60vw;
  margin: auto;
}
</style>