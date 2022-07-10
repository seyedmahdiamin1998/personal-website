
// $.ajax({
//     url: "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=4h&limit=2000",
//     type: 'GET',
//     dataType: 'json', // added data type
//     success: function(res) {
//         console.log(res);
//         // alert(res);
//     }
// });

// fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=4h&startTime=1499331958000&endTime=1657114564000')
let data_ohlc = []
let data_close = []
let data_volume = []
// fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=4h&limit=1000')
// fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000')
fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m')
    .then((r) => r.json())
    .then((response) => {
        for (let i = 0; i < response.length; i++) {
            data_ohlc.push({'time':response[i][0]/1000,
                            'open':parseFloat(response[i][1]),
                            'high':parseFloat(response[i][2]),
                            'low':parseFloat(response[i][3]),
                            'close':parseFloat(response[i][4]),
                            // 'volume':parseFloat(response[i][5])
                        });
            data_volume.push({
                'time':response[i][0]/1000,
                'value':parseFloat(response[i][5]),
                'color': '#4169e1'
            });
            data_close.push({
                'time':response[i][0]/1000,
                'value':parseFloat(response[i][4]),
            });
        };

        candleSeries.setData(data_ohlc)
        volumeSeries.setData(data_volume);
        
        // fill Table
        MDD=DrawDownFunc(data_ohlc)
        let timestampMDD = MDD['MDD']['time']*1000
        let date = new Date(timestampMDD);
        
        let timestampMaxTime = MDD['MDD']['MaxTime']*1000
        let date2 = new Date(timestampMaxTime);
    
        document.getElementById('MDD_ID').innerHTML = Math.round(MDD['MDD']['value']*100)/100        
        document.getElementById('MDD_Time').innerHTML = date.getUTCFullYear()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCDate()+" "+date.getUTCHours()+":"+date.getUTCMinutes() ;
        document.getElementById('MDD_CandleCount').innerHTML = MDD['MDD']['Count']
        document.getElementById('MDD_MaxPrice').innerHTML = MDD['MDD']['MaxPrice']
        document.getElementById('MDD_MaxTime').innerHTML = date2.getUTCFullYear()+"-"+(date2.getUTCMonth()+1)+"-"+date2.getUTCDate()+" "+date2.getUTCHours()+":"+date2.getUTCMinutes() ;

        // MDDLineSeries.setData(DrawDownFunc(data_ohlc)['fall_series']);
        MDDLineSeries.setData(MDD['fall_series']);
        MDDLineSeries.createPriceLine(baseLine);
        plotMDD(MDD['MDD']['value'])
        // MDDLineSeries.createPriceLine(MDDLine);
    })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_4h')
var binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_15m')

binanceSocket.onmessage = function (event) {
    var message = JSON.parse(event.data);
    var candlestick = message.k;

    candleSeries.update({
        time:candlestick.t/1000,
        open:candlestick.o,
        high:candlestick.h,
        low:candlestick.l,
        close:candlestick.c
    })
    volumeSeries.update({
        time:candlestick.t/1000,
        value:candlestick.v,
        color:'#4169e1'
    });

};