from django.urls import path
from .views import *

app_name='Panel'

urlpatterns = [
    path('Panel',HomePanelView,name='HomePanel')
]
