from django.urls import re_path, include, path
from rest_framework.urlpatterns import format_suffix_patterns
from kayak_app import views

urlpatterns = [
    path('airline/', views.AirlineList.as_view()),
    re_path(r'^flight/$', views.FlightList.as_view()),

    #FUNCTIONALITY
    
    path('reserve/', views.FlightDates.as_view()),
    path('search/<origin>/<departure_date>/<destiny>/', views.FlightDates.as_view()),
    path('search/<origin>/<departure_date>/<destiny>/<return_date>/', views.FlightDates.as_view()),
]
