from rest_framework import serializers
from analysis.models import AnalysisHistory

class HistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = AnalysisHistory
        fields = "__all__"