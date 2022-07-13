function DrawDownFunc(data){
	let fall_series=[]
	let high_sries = []
	for (let i=0 ; i< data.length ;i++){
		high_sries.push(data[i].high);
		
		var h_high = high_sries.reduce(function(a, b) {
			return Math.max(a, b);
		});    

		if(data[i].high-h_high===0){
		fall_series.push({ "time":data[i].time ,"value":((data[i].high-h_high)*100/h_high)});
		}else{
		fall_series.push({ "time":data[i].time ,"value":((data[i].low-h_high)*100/h_high)});
		};
	};
	let MDD_={'time':0, 'value':0, 'Count':0, 'MaxPrice':0, 'MaxTime':0 };
	let last_high
	for (let i=0 ; i< data.length ;i++){
		if(fall_series[i].value==0){
			last_high = i
		};
		if (fall_series[i].value<MDD_['value']) {
			MDD_ ={'time':fall_series[i].time, 'value':fall_series[i].value, 'Count': i-last_high, 'MaxPrice':data[last_high].high,'MaxTime':fall_series[last_high].time}
		};
	};
	return {'fall_series': fall_series, 'MDD': MDD_} ;
};



/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////      plot      ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
var MDDchart = LightweightCharts.createChart(document.getElementById("MDDchart"), {
	width: $("#MDDchart").width()-200,  //865,
	height: 300,  //500,
	leftPriceScale: {
		scaleMargins: {
			top: 0.2,
			bottom: 0.2,
		},
		visible: false,
		borderVisible: false,
		borderColor: '#000000',
	},
	rightPriceScale: {
		visible: true,
		borderVisible: true,
		borderColor: '#000000',
	},
	layout: {
		backgroundColor: '#ffffff',
		textColor: '#000000',
	},
	grid: {
		vertLines: {
			color: '#000000',
		},
		horzLines: {
			color: '#000000',
		},
	},

	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},

	timeScale: {
		borderColor: '#000000',
		timeVisible: true,
    	secondsVisible: false,
	},
	grid: {
		vertLines: {
			visible: false,
		},
		horzLines: {
			visible: false,
		},
	},
	localization: {
		dateFormat: 'yyyy-MM-dd',
	},
	// priceScale: {
	// 	mode: LightweightCharts.PriceScaleMode.Logarithmic, //logarithm mode
	// 	autoScale: true,
	// },
});

MDDLineSeries=MDDchart.addLineSeries({
    color: '#FF0000',
    visible:true,
    // priceScaleId: 'left',
})


Series = MDDchart.addLineSeries({
	color: 'black',
	lineWidth: 1,
	lastValueVisible: true,
	priceLineVisible: false,
});

var baseLine = {
	price: 0,
	color: '#000000',
	lineStyle: LightweightCharts.LineStyle.LargeDashed,
	axisLabelVisible: true,
	title: '',
};


function plotMDD(MDDinfo) {
	var MDDLine = {
		price: MDDinfo,
		color: '#000000',
		lineStyle: LightweightCharts.LineStyle.LargeDashed,
		axisLabelVisible: true,
		title: 'MDD',
	};
	MDDLineSeries.createPriceLine(MDDLine);		
};

// Fall50_lineSeries.setData(Fall50);
  
/////////////////////////////////////////////////////////////////////////////////////////
// resize
$(document).ready(function () {
	MDDchart.applyOptions({ width: $('#MDDchart').width(), })
});
$(window).resize(function () {
	MDDchart.applyOptions({ width: $('#MDDchart').width(), })
});
/////////////////////////////////////////////////////////////////////////////////////////

// Fullscreen Chart 
$('#MDDchart').on('dblclick', function(){
    // if already full screen; exit
    // else go fullscreen
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        }
        MDDchart.applyOptions({ width: 500, height: 600 });
    } else {
        element = $('#MDDchart').get(0);
        if (element.requestFullscreen) {
        element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        }
        MDDchart.applyOptions({ width: screen.width, height:screen.height-20 });
    }
});
  
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);
  
function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        MDDchart.applyOptions({ width: $("#MDDchart").width(), height: 300 });

    }
}  
