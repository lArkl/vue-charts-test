<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Prueba JSON</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item"
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="{active: currentTab === tab}"
          >
            <a class="nav-link"
            v-on:click="currentTab = tab">
              {{ tab }} 
              <span class="sr-only">(current)
                </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <component
      v-bind:json="json"
      v-bind:loaded="fileLoaded"
      v-bind:is="currentTabComponent"
      @update-json="updateJson"
      class="tab">
    </component>
    <div class="container">
      Ⓒ 2019. Designed with <span> ♥ </span> by <a href="https://github.com/lArkl">lArkl</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import inicio from '@/components/SeriesBox.vue';
import chartjs from '@/components/SeriesChart.vue';
import cargar from '@/components/UploadFile.vue';
import echarts from '@/components/SeriesEchart.vue';

import data from '../assets/serie.json';

export default {
  name: 'home',
  components: {
    inicio,
    chartjs,
    echarts,
    cargar
  },
  data() {
    return {
      fileLoaded: false,
      currentTab: 'Inicio',
      tabs: ['Inicio','ChartJS','Echarts','Cargar'],
      json: null
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase()
    }
  },
  methods: {
    updateJson(file){
      //console.log('Se recargo!');
      this.json = file;
      this.fileLoaded = true;
    }
  },
  beforeMount() {
    this.json = data;
  }
}
</script>
<style>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #f6f5f7;
  cursor: pointer;
  background: #353a40;
  color: rgb(232, 232, 241);
  margin-bottom: -1px;
  margin-right: -1px;
  margin-left: 20%;
}
.tab-button:hover {
  background: #4e5258;
}
.tab-button.active {
  background: #1b1b1b;
}
.tab {
  border: 1px solid #f6f5f7;
  padding: 10px;
}
</style>
