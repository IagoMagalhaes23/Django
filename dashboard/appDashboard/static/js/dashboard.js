var dadosCorrenteTotal = [];
var dadosTensaoTotal = [];
var dadosPotencia = [];
var dadosTempo;
var cont = [];
var contador = 0;

var stt = document.getElementById("status");
var tabela = document.getElementById("dataTable");
var conteudoTabela = "";

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

async function plotaGrafico(){
  var data;
  var dadosTensao;

  readTextFile("http://iotconan.com.br/conansolar", function(text){
    data = JSON.parse(text);
    let dadosTensao = data.v.map(function(e) {
      dadosTensaoTotal.push(e/10);
      return e;
    });
    dadosTempo = data.t.map(function(e) {
      return e;
    });

    if(contador == 0){
      for(let j = 0; j < dadosTempo.length; j++){
        let date = new Date(dadosTempo[j] * 1000);
        let aux = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        cont.push(aux);
      }
    }else{
      let date = new Date(dadosTempo[9] * 1000);
      let aux = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      cont.push(aux);
    }

    contador = contador + 1;

    let dadosCorrente = data.i.map(function(e) {
      dadosCorrenteTotal.push(e/10);
      return e;
    });
    
    //console.log(cont.length);

    var ctxCorrenteS1 = correnteChartS1.getContext('2d');
    var configCorrenteS1 = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Corrente String 01 - (A)',
          data: dadosCorrenteTotal,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: 'rgb(255,99,71)',
          borderWidth: 1,
          pointBackgroundColor: 'rgb(255,99,71)'
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              color: 'red',
              display: true,
              text: 'Month'
            }
          },
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    var ctxCorrenteS2 = correnteChartS2.getContext('2d');
    var configCorrenteS2 = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Corrente String 02 - (A)',
          data: dadosCorrenteTotal,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: 'rgb(255,99,71)',
          borderWidth: 1,
          pointBackgroundColor: 'rgb(255,99,71)'
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              color: 'red',
              display: true,
              text: 'Month'
            }
          },
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    //Gerando dados de potência
    for(let i = 0; i < dadosCorrente.length; i++){
      dadosPotencia.push((dadosCorrente[i] * dadosTensao[i]).toFixed(2) / 100);
    }

    var ctxPotenciaS1 = potenciaChartS1.getContext('2d');
    var configPotenciaS1 = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Potência String 01 - (W)',
          data: dadosPotencia,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: 'rgb(60,179,113)',
          borderWidth: 1,
          pointBackgroundColor: 'rgb(60,179,113)'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    var ctxPotenciaS2 = potenciaChartS2.getContext('2d');
    var configPotenciaS2 = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Potência String 02 - (W)',
          data: dadosPotencia,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: 'rgb(60,179,113)',
          borderWidth: 1,
          pointBackgroundColor: 'rgb(60,179,113)'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    var ctxTemperaturaS1 = temperaturaChartS1.getContext('2d');
    var configTemperaturaS1 = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Temperatura String 01 - (°C)',
          data: dadosTensaoTotal,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 1,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    var ctxTemperaturaS2 = temperaturaChartS2.getContext('2d');
    var configTemperaturaS2 = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Temperatura String 02 - (°C)',
          data: dadosTensaoTotal,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 1,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    var ctxTensao = tensaoChart.getContext('2d');
    var configTensao = {
      type: 'line',
      data: {
        labels: cont,
        datasets: [{
          label: 'Tensão - (V)',
          data: dadosTensaoTotal,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 1,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true
        }
      }
    }

    var chartCorrenteS1 = new Chart(ctxCorrenteS1, configCorrenteS1);
    var chartCorrenteS2 = new Chart(ctxCorrenteS2, configCorrenteS2);
    var chartPotenciaS1 = new Chart(ctxPotenciaS1, configPotenciaS1);
    var chartPotenciaS2 = new Chart(ctxPotenciaS2, configPotenciaS2);
    var chartTemperaturaS1 = new Chart(ctxTemperaturaS1, configTemperaturaS1);
    var chartTemperaturaS2 = new Chart(ctxTemperaturaS2, configTemperaturaS2);
    var chartTensao = new Chart(ctxTensao, configTensao);

    let date = new Date;
    var hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    stt.innerHTML = "Última atualizaçao do sistema: " + hora;

    for(let i = 0; i < cont.length; i++){
      let dadosLinha = "<tr>"
                            + "<td>" + cont[i] + "</td>"
                            + "<td>" + dadosCorrenteTotal[i] + "A</td>"
                            + "<td>" + dadosCorrenteTotal[i] + "A</td>"
                            + "<td>" + dadosPotencia[i] + "W</td>"
                            + "<td>" + dadosPotencia[i] + "W</td>"
                            + "<td>" + dadosTensaoTotal[i] + "°C</td>"
                            + "<td>" + dadosTensaoTotal[i] + "°C</td>"
                            + "<td>" + dadosTensaoTotal[i] + "V</td>"
                        + "</tr>";
        
      conteudoTabela = conteudoTabela + dadosLinha;
    }
    tabela.innerHTML = conteudoTabela;
    conteudoTabela = "";
    
  });
}

let date = new Date;
let hora = date.getHours();

$(function() {
  setTime();
  function setTime() {
    plotaGrafico();
    setTimeout(setTime, 60000);
  }
});