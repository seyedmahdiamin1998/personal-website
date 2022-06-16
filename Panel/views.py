from django.shortcuts import render

# Create your views here.

def HomePanelView(request):
    context={}
    return render(request, 'HomePanel.html', context)