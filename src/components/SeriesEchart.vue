<template>
  <div class="series-chart">
    <div id="buttons">
      <button class="btn btn-outline-primary btn-sm" 
        v-on:click="changeChart">
        {{ typeChart }}
      </button>
    </div>
    <div class="chart-container">
      <canvas id="planet-chart"></canvas>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import data from '../assets/serie.json'
// ChartJS
import Chart from 'chart.js'
import planetChartData from '../chart-data-json.js'

export default {
  name: 'SeriesChart',
  props: {
    msg: String
  },
  data: function () {
      return {
        errored: false,
        loading: false,
        typeCounter: 0,
        types : ['Line','Bar','Pie'],
        typeChart: '',
        myChart: null,
        planetChartData: planetChartData,
      }
  },
  methods: {
    changeChart(){
      this.typeCounter = (this.typeCounter+1) % (this.types.length);
      this.typeChart = this.types[this.typeCounter];
      this.myChart.destroy();
      this.createChart('planet-chart',this.planetChartData);
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      this.myChart = new Chart(ctx, {
        type: this.typeChart.toLowerCase(),
        data: chartData.data,
        options: chartData.options,
      });
    }
  },
  mounted(){
    this.typeChart = this.types[this.typeCounter];
    this.createChart('planet-chart',this.planetChartData);
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
  height:40vh; 
  width:80vw;
  margin: auto;
}
</style>