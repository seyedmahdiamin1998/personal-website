from django.shortcuts import render

# Create your views here.

def Bitcoin_Chart_View(request):
    context={}
    return render(request,'BitcoinChart.html',context)

def Bitcoin_MLNoteBook_View(request):
    context={}
    return render(request,'MLNoteBook.html',context)