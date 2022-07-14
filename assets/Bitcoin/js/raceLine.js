var BTCUSDTdata = function () {
    var tmp = null;

    $.ajax({
        url: "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m",
        type: 'GET',
        dataType: 'json', // added data type
        async: false,
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}();

var ETHUSDTdata = function () {
    var tmp = null;
    $.ajax({
        url: "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=15m",
        type: 'GET',
        dataType: 'json', // added data type
        async: false,
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}();

var ADAUSDTdata = function () {
    var tmp = null;
    $.ajax({
        url: "https://api.binance.com/api/v3/klines?symbol=ADAUSDT&interval=15m",
        type: 'GET',
        dataType: 'json', // added data type
        async: false,
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}();

var SHIBUSDTdata = function () {
    var tmp = null;
    $.ajax({
        url: "https://api.binance.com/api/v3/klines?symbol=SHIBUSDT&interval=15m",
        type: 'GET',
        dataType: 'json', // added data type
        async: false,
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}();


////////////////////////////////////////////////////////////////////////
let dataapache =[['Date','Close','Symbol']]
let date3
let timestampRaceLine
for (let i = 1; i < BTCUSDTdata.length; i++) {
    timestampRaceLine = BTCUSDTdata[i][0]
    date3 = new Date(timestampRaceLine);
    date4 = date3.getUTCFullYear()+"-"+(date3.getUTCMonth()+1)+"-"+date3.getUTCDate()+" "+date3.getUTCHours()+":"+date3.getUTCMinutes() ;
    dataapache.push([date4, Math.round(((BTCUSDTdata[i][4]-BTCUSDTdata[0][4])*100/BTCUSDTdata[i][4])*100)/100, 'BTCUSDT']) 
    dataapache.push([date4, Math.round(((ETHUSDTdata[i][4]-ETHUSDTdata[0][4])*100/ETHUSDTdata[i][4])*100)/100, 'ETHUSDT']) 
    dataapache.push([date4, Math.round(((ADAUSDTdata[i][4]-ADAUSDTdata[0][4])*100/ADAUSDTdata[i][4])*100)/100, 'ADAUSDT']) 
    dataapache.push([date4,Math.round(((SHIBUSDTdata[i][4]-SHIBUSDTdata[0][4])*100/SHIBUSDTdata[i][4])*100)/100,'SHIBUSDT']) 
}


// dataapache = BTCUSDTdata.concat(ETHUSDTdata)
// dataapache = dataapache.concat(ADAUSDTdata)
// dataapache = dataapache.concat(ADAUSDTdata)
// dataapache = dataapache.concat(SHIBUSDTdata)

console.log(dataapache)
//////////////////////////////////////////////////////////////////////////////

var chartDom = document.getElementById('CompareBTCUSDT');
var myChart = echarts.init(chartDom);
var option;
let plotted=0
$(window).scroll(function() {
    if ($('#CompareBTCUSDT').is(':visible')) {
        if (plotted==0){
            run(dataapache);
            plotted=1
        }
    }
});


function run(_rawData) {
    const symbols = [
        'BTCUSDT',
        'ETHUSDT',
        'ADAUSDT',
        'SHIBUSDT'
    ];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(symbols, function (symbol) {
        
        var datasetId = 'dataset_' + symbol;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'Symbol', '=': symbol }
                    ]
                }
            }
        });
        
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: symbol,
            endLabel: {
                show: true,
                formatter: function (params) {
                    return params.value[2] + ': ' + params.value[1];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'Date',
                y: 'Close',
                label: ['Symbol', 'Close'],
                itemName: 'Date',
                tooltip: ['Close']
            }
        });
    });
    
    option = {
        toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
        },
        legend:{
            bottom: 10,
            left: 'center',
        },
        animationDuration: 10000,
        dataset: [
            {
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: 'Percentage change between the current and a prior Close values'
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            nameLocation: 'middle'
        },
        yAxis: {
            name: 'Percentage change '
        },
        grid: {
            right: 140
        },
        series: seriesList
    };
    myChart.setOption(option);
}

option && myChart.setOption(option);
