from django.urls import path
from .views import AnalyzeAndGenerateAPIView

urlpatterns = [
    path(
        "analyze-generate/",
        AnalyzeAndGenerateAPIView.as_view(),
        name="analyze-generate"
    ),
]