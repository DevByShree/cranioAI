from django.apps import AppConfig

class ModelGenerationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.model_generation'