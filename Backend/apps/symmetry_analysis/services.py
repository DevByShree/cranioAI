import cv2
import os

from .detector import FaceDetector
from .align import FaceAligner
from .symmetry import SymmetryAnalyzer
from .score import SymmetryScore
from .heatmap import AsymmetryHeatmap

import uuid

class SymmetryAnalysisService:

    def __init__(self):
        self.detector = FaceDetector()
        self.aligner = FaceAligner()
        self.analyzer = SymmetryAnalyzer()
        self.scorer = SymmetryScore()
        self.heatmap = AsymmetryHeatmap()

    def analyze(self, image_path):

        image = cv2.imread(image_path)

        landmarks = self.detector.detect(image)

        aligned_image, aligned_landmarks, angle = (
            self.aligner.align(
                image,
                landmarks
            )
        )

        normalized_results = self.analyzer.analyze(
            aligned_landmarks,
            normalize=True
        )

        pixel_results = self.analyzer.analyze(
            aligned_landmarks,
            normalize=False
        )

        overall_score, report = self.scorer.calculate(
            normalized_results
        )

        heatmap_img, overlay_img = self.heatmap.generate(
            aligned_image,
            aligned_landmarks,
            pixel_results["pair_errors"]
        )

        os.makedirs(
            "media/generated_images",
            exist_ok=True
        )

        import uuid

        file_id = str(uuid.uuid4())

        heatmap_path = f"media/generated_images/{file_id}_heatmap.png"
        overlay_path = f"media/generated_images/{file_id}_overlay.png"

        cv2.imwrite(heatmap_path, heatmap_img)
        cv2.imwrite(overlay_path, overlay_img)

        return {
            "overall_score": overall_score,
            "region_scores": report,
            "alignment_angle": angle,
            "heatmap_image": heatmap_path,
            "overlay_image": overlay_path
        }