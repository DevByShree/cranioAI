import os
import traceback
import uuid

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import ImageUploadSerializer

from apps.symmetry_analysis.services import (SymmetryAnalysisService)
from apps.model_generation.services import (FaceModelGenerator)

from analysis.models import AnalysisHistory

class AnalyzeAndGenerateAPIView(APIView):
    
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ImageUploadSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        image_file = serializer.validated_data["image"]

        upload_dir = "media/uploads"
        os.makedirs(upload_dir, exist_ok=True)

        filename = f"{uuid.uuid4()}_{image_file.name}"

        image_path = os.path.join(
            upload_dir,
            filename
        )

        with open(image_path, "wb+") as destination:
            for chunk in image_file.chunks():
                destination.write(chunk)

        service = SymmetryAnalysisService()

        generator_service = FaceModelGenerator()
        
        try:
            
            symmetry_result = service.analyze(image_path)
            model_result = generator_service.generate(image_path)
            
            AnalysisHistory.objects.create(
                        user=request.user,

                        uploaded_image=f"uploads/{filename}",

                        overall_score=symmetry_result["overall_score"],

                        eyes_score=symmetry_result["region_scores"]["eyes"],
                        eyebrows_score=symmetry_result["region_scores"]["eyebrows"],
                        nose_score=symmetry_result["region_scores"]["nose"],
                        mouth_score=symmetry_result["region_scores"]["mouth"],
                        jaw_score=symmetry_result["region_scores"]["jaw"],

                        alignment_angle=symmetry_result["alignment_angle"],

                        overlay_image=symmetry_result["overlay_image"].replace("media/", ""),

                        glb_model=model_result["model_path"].replace("media/", "")
                    )
            
            
        except Exception as e:
            traceback.print_exc()
            return Response(
                { "success": False,
                    "error": str(e) },
                status=500)

        base_url = request.build_absolute_uri("/")[:-1]

        response_data = {
            "success": True,
            "symmetry_analysis": {
                **symmetry_result,
                "overlay_image": f"{base_url}/{symmetry_result['overlay_image']}"
            },
            "generated_model": {
                "glb_url": f"{base_url}/{model_result['model_path']}"
            }
        }

        return Response(response_data)