from django.shortcuts import render

# Create your views here.

def BikeSharingView(request):
    context={}
    return render(request, 'BikeSharing.html', context)