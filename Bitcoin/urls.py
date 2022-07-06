from django.urls import path
from .views import *

app_name = 'Bitcoin'

urlpatterns = [
    path('Bitcoin/chart',BitcoinChartView,name='BitcoinChart'),
]
