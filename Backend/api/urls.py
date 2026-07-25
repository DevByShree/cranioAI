from django.urls import path

from analysis import views
from .views import AnalyzeAndGenerateAPIView

urlpatterns = [
    path("analyze-generate/",AnalyzeAndGenerateAPIView.as_view(),name="analyze-generate"),
    
    path("dashboard/", views.DashboardAPIView.as_view(), name="dashboard"),
    
    path("history/", views.HistoryAPIView.as_view(), name="history"),
]

