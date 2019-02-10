//import data from './assets/serie.json'
var moment = require('moment');
//Colores html: https://htmlcolorcodes.com/color-chart/
const colors = ['236, 112, 99',
'165, 105, 189',
'93, 173, 226',
'69, 179, 157',
'244, 208, 63',
'202, 207, 210'];

const getFreq = (per)=>{
  let arr = per.name.split('.');
  var format = '';
  var freq = '';
  switch(arr.length){
    case 1: {
      freq = 'year';
      format = 'YYYY'
      break;
    }
    case 2: if(arr[0][0]==='T') {
      freq = 'quarter';
      format = 'TQ.YY';
      break;
    } else {
      freq = 'month';
      format = 'MMM.YYYY';
      break;
    } 
    case 3: {
      freq = 'day';
      format = 'DD.MMM.YY';
      break;
    } 
  }
  return {'format': format, 'freq': freq};
}

const createData = (data)=>{
  const lbls = data.config.series.map(e=>e.name);
  const numDatasets = data.config.series.length;
  
  const frequency = getFreq(data.periods[0]);
  
  const periods = data.periods.map((p)=>{
    let date =  p.name;
    return moment(date, frequency.format);
  });
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
          }
        }],
        xAxes: [{
          type: 'time',
        }]
      },
      pan: {
        // Boolean to enable panning
        enabled: true,
    
        // Panning directions. Remove the appropriate direction to disable 
        // Eg. 'y' would only allow panning in the y direction
        mode: 'x',
        speed: 10,
        threshold: 10
      },
      
      // Container for zoom options
      zoom: {
        // Boolean to enable zooming
        enabled: true,
    
        // Enable drag-to-zoom behavior
    
        // Drag-to-zoom rectangle style can be customized
        drag: false,
        /*
        drag: {
          borderColor: 'rgba(225,225,225,0.3)',
          borderWidth: 5,
          backgroundColor: 'rgb(225,225,225)'
        },
        */
        // Zooming directions. Remove the appropriate direction to disable 
        // Eg. 'y' would only allow zooming in the y direction
        mode: 'x',
        limits: {
          max: 10,
          min: 0.5
        },
      }
    }
  }
  return chartData;
}

const createEData = (data)=>{
  const numSeries = data.config.series.length;
  const labels = data.config.series.map(e=>{
    let l = e.name.split('-');
    return l[l.length-1];
  });
  labels.unshift('');
  const frequency = getFreq(data.periods[0]);
  
  const source = data.periods.map(elem=>{
    const date = moment(elem.name, frequency.format);
    const line = [date.format('YYYY/MM/DD')];
    elem.values.forEach((e)=>line.push(e));
    return line;
  });
  source.unshift(labels);
  //console.log(source);
  const type = new Array(numSeries).fill({type: 'line'});
  const option = {
    legend: {},
    tooltip: {},
    toolbox: {
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
      }
    },
    dataZoom: [{
      type: 'inside',
      start: 0,
      end: 100
     }, {
      start: 0,
      end: 10,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
      }
    }],
    dataset: {source},
    // Declare X axis, which is a category axis, mapping
    // to the first column by default.
    xAxis: {
      type: 'time',
      /*
      axisLabel: {
        formatter: asd,
      },
      */
    },
    // Declare Y axis, which is a value axis.
    yAxis: {
    },
    // Declare several series, each of them mapped to a
    // column of the dataset by default.
    series: type
  }
  return option;
}

const options = {
  responsive: true,
  aspectRatio: 5,
  legend:{
    display: false,
  },
  //backgroundColor: 'rgba(0,0,0,.3)',
  lineTension: 1,
  scales: {
    yAxes: [{
      //display: false,
      ticks: {
        beginAtZero: false,
        padding: 25,
      }
    }]
  }
}

//JSON.parse(JSON.stringify(options));

export {createData, options, createEData};