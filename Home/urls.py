from django.urls import path
from .views import *

app_name='Home'

urlpatterns = [
    path('', HomeView, name='Home'),
    path('cv', resume_view, name='cv'),
]

