from django.urls import path
from .views import *

app_name = 'BikeSharing'

urlpatterns = [
    path('BikeSharing',BikeSharingView,name='BikeSharingPanel'),
    path('BikeSharingNoteBook',NoteBookView,name='NoteBookPanel')
]
