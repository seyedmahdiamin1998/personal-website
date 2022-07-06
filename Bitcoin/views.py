from django.shortcuts import render

# Create your views here.

def BitcoinChartView(request):
    context={}
    return render(request,'BitcoinChart.html',context)