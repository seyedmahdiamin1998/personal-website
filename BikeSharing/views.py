from django.shortcuts import render

# Create your views here.

def BikeSharingView(request):
    context={}
    return render(request, 'BikeSharing.html', context)

def NoteBookView(request):
    context={}
    return render(request, 'BikeSharingNoteBook.html', context)