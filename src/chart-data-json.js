//import data from './assets/serie.json'

//Colores html: https://htmlcolorcodes.com/color-chart/
const colors = ['236, 112, 99',
'165, 105, 189',
'93, 173, 226',
'69, 179, 157',
'244, 208, 63',
'202, 207, 210'];

const createData = (data)=>{
  const lbls = data.config.series.map(e=>e.name);
  const numDatasets = data.config.series.length;
  const periods = data.periods.map((p)=>p.name);
  var sets = new Array(numDatasets);
  for(let i=0; i<numDatasets;++i){
    //Almacenamos los valores de cada serie
    let vals = data.periods.map((p)=>p.values[i]);
    
    //Asignamos el color para cada dataset
    //var rand = Math.floor(Math.random() * colors.length);
    let color = 'rgba(' + colors[i] + ',.3)';
    //let color = new Array(periods.length).fill(colors[i+1]);
    
    //Ingresamos la data previa al dataset
    sets[i] = {
      label: lbls[i].split('-')[lbls.length-1],
      data: vals,
      backgroundColor: color,
      borderColor: color,
      borderWidth: 3,
    }
  }
  const chartData = {
    type: 'line',
    data: {
      labels: periods,
      datasets: sets
    },
    options: {
      responsive: true,
      lineTension: 1,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            padding: 25,
          }
        }]
      }
    }
  }
  return chartData;
}

const options = {
  responsive: true,
  aspectRatio: 5,
  legend:{
    display: false,
  },
  backgroundColor: 'rgba(0,0,0,.3)',
  lineTension: 1,
  scales: {
    yAxes: [{
      display: false,
      ticks: {
        beginAtZero: false,
        padding: 25,
      }
    }]
  }
}

//JSON.parse(JSON.stringify(options));

export {createData, options};