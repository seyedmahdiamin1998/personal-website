from django.urls import path
from .views import *

app_name = 'Bitcoin'

urlpatterns = [
    path('Bitcoin/chart',Bitcoin_Chart_View,name='Chart'),
    path('Bitcoin/MLNoteBook',Bitcoin_MLNoteBook_View,name='MLNoteBook'),
]
