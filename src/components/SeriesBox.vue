<template>
  <div class="series-box">
    <h1>{{ msg }} </h1>
    <h2>{{ json.config.title }}</h2>
    
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    
  <section v-else>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <table class="table table-sm">
        <thead class="thead-light">
          <tr>
            <th>Periodo</th>
            <th v-for="serie in json.config.series" :key="serie.id"> 
              {{ serie.name.split("-")[1] }} 
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="period in json.periods" :key="period.id" >
            <td>{{ period.name }}</td>
            <td v-for="val in period.values" :key="val.id">
              {{ val }}
            </td>
          </tr>
        </tbody>
      </table>        
    </div>
  </section>
  </div>
</template>

<script>
import data from '../assets/serie.json'
//console.log(data)
/*
import axios from 'axios'
var cors = 'https://cors-anywhere.herokuapp.com/';
var path = 'https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PN01288PM-PN01289PM/json';
//var path = 'https://api.coindesk.com/v1/bpi/currentprice.json';
*/
export default {
  name: 'SeriesBox',
  props: {
    msg: String,
    json: Object
  },
  data: function () {
      return {
        errored: false,
        loading: false,
        info : null
      }
  },
  /*
  computed: {
    json: function () {
      console.log((data.config.title));
      return data
    }
  },
  mounted () {
    axios
    .get(cors + path)
    .then(response => {
      this.info = response
    })
    .catch(error => {
      console.log(error);
      this.errored = true;
    })
    .finally(()=>this.loading = false)
  }
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  padding: 20px;
}
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
table {
  width: 80%;
  margin: auto;
}
</style>
