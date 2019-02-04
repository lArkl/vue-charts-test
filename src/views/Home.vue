<template>
  <div class="home">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Prueba JSON</a>
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >{{ tab }}</button>
        <span class="navbar-text">
        by Ark
        </span>
    </nav>
    <component
      v-bind:json="json"
      v-bind:loaded="fileLoaded"
      v-bind:is="currentTabComponent"
      @update-json="updateJson"
      class="tab">
    </component>
  </div>
</template>

<script>
// @ is an alias to /src
import inicio from '@/components/SeriesBox.vue';
import chartjs from '@/components/SeriesChart.vue';
import cargar from '@/components/UploadFile.vue';

import data from '../assets/serie.json';

export default {
  name: 'home',
  components: {
    inicio,
    chartjs,
    cargar
  },
  data() {
    return {
      fileLoaded: false,
      currentTab: 'Inicio',
      tabs: ['Inicio','ChartJS','Cargar'],
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
