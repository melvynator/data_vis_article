$(function () {
    $('#winLose').highcharts({
        colors: ['#70db70', '#ff3333'],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'Global win and lose'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Win',
            data: [{
                name: 'Win',
                y: data.total_win
            }]
        },
        {
            name: 'Lose',
            data: [{
                name: 'Lose',
                y: data.total_lose
            }]
        }]
    });

    var K = 0;
    var D = 0;
    var A = 0;
    for (champion in data.stat_per_champion){
      champ = data.stat_per_champion[champion]
      K += data.stat_per_champion[champion].kills
      D += data.stat_per_champion[champion].deaths
      A += data.stat_per_champion[champion].assists
    }


    $('#KDA').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Kill, Deaths, Assists'
        },
        xAxis: {
            categories: [
                'Kill',
                'Deaths',
                'Assist'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Value'
            }
        },
        tooltip: {
            pointFormat: '{point.y}',
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Average kill',
            data: [K/(data.total_win + data.total_lose)]

        },{
            name: 'Average death',
            data: [D/(data.total_win + data.total_lose)]

        },{
            name: 'Average assist',
            data: [A/(data.total_win + data.total_lose)]

        }]
    });

    $(function () {

      $('#gameplay').highcharts({
          chart: {
              type: 'column'
          },

          title: {
              text: 'Role',
          },

          pane: {
              size: '80%'
          },

          xAxis: {
              categories: ['Top', 'Mid', 'Jungle', 'Support', 'ADC'],
              tickmarkPlacement: 'on',
              lineWidth: 0
          },

          yAxis: {
              lineWidth: 0,
              min: 0
          },

          tooltip: {
              pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
          },

          legend: {
              align: 'right',
              verticalAlign: 'top',
              y: 70,
              layout: 'vertical'
          },
          credits: {
            enabled: false
          },

          series: [{
              name: 'Top',
              data: [data.top],
          },{
              name: 'Mid',
              data: [data.mid],
          },{
              name: 'Jungle',
              data: [data.jungle],
          },{
              name: 'Support',
              data: [data.support],
          },{
              name: 'ADC',
              data: [data.adc],
          }]

      });
  });

  for (champion in data.stat_per_champion){

    if (champion == "Alistar"){

    var div = document.createElement("div");
    div.id = 'winlose_' + champion.replace(/[^a-z0-9]/gi,'');
    div.className= "left";
    document.getElementById('championStats').appendChild(div);
    $('#winlose_' + champion.replace(/[^a-z0-9]/gi,'')).highcharts({
        colors: ['#70db70', '#ff3333'],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'Win and lose with ' + champion.replace(/[^a-z0-9]/gi,'')
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Win',
            data: [{
                name: 'Win',
                y: data.stat_per_champion[champion].win
            }]
        },
        {
            name: 'Lose',
            data: [{
                name: 'Lose',
                y: data.stat_per_champion[champion].nb_games - data.stat_per_champion[champion].win
            }]
        }]
    });


    var div = document.createElement("div");
    div.id = 'KDA_' + champion.replace(/[^a-z0-9]/gi,'');
    div.className= "right";
    document.getElementById('championStats').appendChild(div);
    $('#KDA_' + champion.replace(/[^a-z0-9]/gi,'')).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Kills, Deaths, Assists with ' + champion
        },
        subtitle : {
          text: 'Game number: ' + data.stat_per_champion[champion].nb_games
        },
        xAxis: {
            categories: [
                'Kill',
                'deaths',
                'Assist'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Value'
            }
        },
        tooltip: {
            pointFormat: '{point.y}',
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Average kills',
            data: [data.stat_per_champion[champion].kills / data.stat_per_champion[champion].nb_games]
        },{
            name: 'Average deaths',
            data: [data.stat_per_champion[champion].deaths / data.stat_per_champion[champion].nb_games]
        },{
            name: 'Number',
            data: [data.stat_per_champion[champion].assists / data.stat_per_champion[champion].nb_games]
        }]
    });

    var div = document.createElement("div");
    div.className= "left";
    div.id = 'dmg_' + champion.replace(/[^a-z0-9]/gi,'');
    document.getElementById('championFarms').appendChild(div);
    $('#dmg_' + champion.replace(/[^a-z0-9]/gi,'')).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Dammage dealt and taken with ' + champion
        },
        subtitle : {
          text: 'Game number: ' + data.stat_per_champion[champion].nb_games
        },
        xAxis: {
            categories: [
                'Dammage dealt',
                'Dammage taken'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Value'
            }
        },
        tooltip: {
            pointFormat: '{point.y}',
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Dammage dealt',
            data: [data.stat_per_champion[champion].dammage_taken/data.stat_per_champion[champion].nb_games]
        },
        {
            name: 'Dammage taken',
            data: [data.stat_per_champion[champion].dammage_dealt / data.stat_per_champion[champion].nb_games]
        }]
    });

    var div = document.createElement("div");
    div.id = 'gold_evolution_' + champion.replace(/[^a-z0-9]/gi,'');
    document.getElementById('champion').appendChild(div);
    $('#gold_evolution_' + champion.replace(/[^a-z0-9]/gi,'')).highcharts({
            title: {
                text: 'Gold evolution with ' + champion
            },
            subtitle: {
                text: 'Chronological order'
            },
            credits: {
              enabled: false
            },
            yAxis: [{ // Secondary yAxis
                gridLineWidth: 0,
                title: {
                  text: 'Gold',
                  style: {
                    color: Highcharts.getOptions().colors[0]
                  }
              },
              labels: {
                format: '{value} Gold',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
            opposite: true
            },
              { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                  text: 'Farms',
                  style: {
                    color: Highcharts.getOptions().colors[1]
                  }
              },
              labels: {
                format: '{value} cs',
                style: {
                  color: Highcharts.getOptions().colors[1]
                }
              }
            }],
            legend: {
              enabled: true,
              layout: 'vertical',
            },
            series: [{
                yAxis: 0,
                name: 'Gold earned',
                data: data.stat_per_champion[champion].gold_evolution
            },
            {
                yAxis: 1,
                name: 'Farm',
                data: data.stat_per_champion[champion].farm_evolution
            }]
        });

    var div = document.createElement("div");
    div.className= "right";
    div.id = 'farm_' + champion.replace(/[^a-z0-9]/gi,'');
    document.getElementById('championFarms').appendChild(div);
    $('#farm_' + champion.replace(/[^a-z0-9]/gi,'')).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Farm with ' + champion
        },
        subtitle : {
          text: 'Game number: ' + data.stat_per_champion[champion].nb_games
        },
        xAxis: {
            categories: [
                'Minions killed',
                'Monsters killed',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Value'
            }
        },
        tooltip: {
            pointFormat: '{point.y}',
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Minions',
            data: [data.stat_per_champion[champion].cs / data.stat_per_champion[champion].nb_games]
        },
        {
            name: 'Monster',
            data: [data.stat_per_champion[champion].monsters/data.stat_per_champion[champion].nb_games]
        }]
    });
  }
}
});
