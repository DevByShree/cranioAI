from django.urls import path
from . import views

from .views import (ProfileAPIView)


urlpatterns = [
    
    path("signup/",views.signup),

    path("login/",views.login),
    
    path("google-login/", views.google_login),
    
    path("profile/", ProfileAPIView.as_view()),

]