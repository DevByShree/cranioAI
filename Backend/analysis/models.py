from django.db import models
from django.contrib.auth.models import User


class AnalysisHistory(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="history"
    )

    uploaded_image = models.ImageField(
        upload_to="uploads/"
    )

    overall_score = models.FloatField()

    eyes_score = models.FloatField()

    eyebrows_score = models.FloatField()

    nose_score = models.FloatField()

    mouth_score = models.FloatField()

    jaw_score = models.FloatField()

    alignment_angle = models.FloatField()

    overlay_image = models.ImageField(
        upload_to="generated_images/"
    )

    glb_model = models.FileField(
        upload_to="generated_models/"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%d/%m/%Y %H:%M')}"