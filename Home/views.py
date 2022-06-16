from django.shortcuts import render
from django.http import FileResponse, Http404

# Create your views here.

def HomeView(request):
    context={}
    return render(request, 'home.html', context)

def resume_view(request):
    try:
        return FileResponse(open('assets/Documents/SeyedmahdiAmin-DataScientist.pdf', 'rb'), content_type='application/force-download')
    except FileNotFoundError:
        raise Http404()