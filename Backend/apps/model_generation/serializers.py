from rest_framework import serializers


class ModelGenerationSerializer(serializers.Serializer):
    model_url = serializers.CharField()
    preview_image_url = serializers.CharField()