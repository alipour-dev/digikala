from django.urls import path

from basket.views import add_to_baske

urlpatterns = [
    path('add/',add_to_baske,name='add-to-basket'),
]