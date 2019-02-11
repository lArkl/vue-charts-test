<template>
  <div class="series-chart">
    <div class="container">
      <div id="main" class="chart-container"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import data from '../assets/mundial.json'

import { createMap } from '../chart-data-json.js';
import * as echarts from 'echarts';

export default {
  name: 'SeriesMap',
  props: {
    msg: String,
    json: Object
  },
  data: function () {
      return {
        errored: false,
        loading: true,
        chartData: null,
        myChart: null,
      }
  },
  methods: {
    createChart(chartId, chartData) {
      //this.myChart = echarts.init(document.getElementById(chartId))
      //this.myChart.setOption(chartData);
        //const path = 'https://raw.githubusercontent.com/juaneladio/peru-geojson/master/peru_departamental_simple.geojson';
        const path = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95368/world.json'
        $.get(path, (geo)=>{
            echarts.registerMap('world', geo);
            this.myChart = echarts.init(document.getElementById(chartId));
            this.myChart.setOption(chartData);
        });
    },
  },
  mounted(){
    //Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(244,0,0,0.8)'
    this.chartData = createMap(data);
    //console.log(this.chartData);
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