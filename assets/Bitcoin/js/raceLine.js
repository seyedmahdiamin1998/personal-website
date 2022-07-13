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
var dataapache = function () {
    var tmp = null;
    $.ajax({
        url: "https://echarts.apache.org/examples/data/asset/data/life-expectancy-table.json",
        type: 'GET',
        dataType: 'json', // added data type
        async: false,
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}();
console.log(dataapache)
//////////////////////////////////////////////////////////////////////////////

var chartDom = document.getElementById('CompareBTCUSDT');
var myChart = echarts.init(chartDom);
var option;

run(dataapache);


function run(_rawData) {
    // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
    const countries = [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
    ];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(countries, function (country) {
        var datasetId = 'dataset_' + country;
        datasetWithFilters.push({
            id: datasetId,
            fromDatasetId: 'dataset_raw',
            transform: {
                type: 'filter',
                config: {
                    and: [
                        { dimension: 'Year', gte: 1930 },
                        { dimension: 'Country', '=': country }
                    ]
                }
            }
        });
        seriesList.push({
            type: 'line',
            datasetId: datasetId,
            showSymbol: false,
            name: country,
            endLabel: {
                show: true,
                formatter: function (params) {
                    return params.value[3] + ': ' + params.value[0];
                }
            },
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            encode: {
                x: 'Year',
                y: 'Income',
                label: ['Country', 'Income'],
                itemName: 'Year',
                tooltip: ['Income']
            }
        });
    });
    
    option = {
        animationDuration: 10000,
        dataset: [
            {
                id: 'dataset_raw',
                source: _rawData
            },
            ...datasetWithFilters
        ],
        title: {
            text: 'Income of Germany and France since 1950'
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
            name: 'Income'
        },
        grid: {
            right: 140
        },
        series: seriesList
    };
    myChart.setOption(option);
}

option && myChart.setOption(option);
