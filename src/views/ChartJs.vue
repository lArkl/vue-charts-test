<template>
  <div class="chart-js">
    <h1 style="padding: 20px">Grafico con ChartJS</h1>
    <SeriesChart />
  </div>
</template>

<script>
// @ is an alias to /src
import SeriesChart from '@/components/SeriesChart.vue'

export default {
  name: 'ChartJS',
  components: {
    SeriesChart
  }
}
</script>