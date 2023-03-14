from django.urls import path
from . import views

urlpatterns = [
    # path('myview/', views.myview)
    path('', views.myview)
]