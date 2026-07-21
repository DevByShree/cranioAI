from rest_framework import serializers


class SymmetryResultSerializer(serializers.Serializer):
    score = serializers.FloatField()
    details = serializers.DictField()