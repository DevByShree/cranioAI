import cv2
import numpy as np

from .constants import HEATMAP_POLYGONS


class AsymmetryHeatmap:

    def __init__(self,
                 sigma=35,
                 alpha=0.55):

        self.sigma = sigma
        self.alpha = alpha

    def normalize(self, pair_errors):

        values = np.array(
            [p["error"] for p in pair_errors],
            dtype=np.float32
        )

        mn = values.min()
        mx = values.max()

        if mx == mn:
            values[:] = 1.0
        else:
            values = (values - mn) / (mx - mn)

        for p, v in zip(pair_errors, values):
            p["weight"] = float(v)

        return pair_errors

    def build_landmark_weights(self, pair_errors):

        weights = {}

        for pair in pair_errors:

            error = pair["weight"]

            left = pair["left"]
            right = pair["right"]

            if left not in weights:
                weights[left] = []

            if right not in weights:
                weights[right] = []

            weights[left].append(error)
            weights[right].append(error)

        for idx in weights:

            weights[idx] = np.mean(
                weights[idx]
            )

        return weights

    def generate(self, image, landmarks, pair_errors):

        h, w = image.shape[:2]

        pair_errors = self.normalize(pair_errors)

        landmark_weights = self.build_landmark_weights(
            pair_errors
        )

        yy, xx = np.mgrid[0:h, 0:w]

        heat = np.zeros(
            (h, w),
            dtype=np.float32
        )

        for region, polygons in HEATMAP_POLYGONS.items():

            region_layer = np.zeros_like(heat)

            region_mask = np.zeros(
                (h, w),
                dtype=np.uint8
            )

            for polygon in polygons:

                pts = np.array(
                    [
                        landmarks[i][:2]
                        for i in polygon
                    ],
                    dtype=np.int32
                )

                cv2.fillPoly(
                    region_mask,
                    [pts],
                    255
                )

            ids = set()

            for polygon in polygons:
                ids.update(polygon)

            for idx in ids:

                if idx not in landmark_weights:
                    continue

                x = landmarks[idx][0]
                y = landmarks[idx][1]

                gaussian = np.exp(

                    -(
                        (xx - x) ** 2 +
                        (yy - y) ** 2
                    )

                    /

                    (2 * self.sigma ** 2)

                )

                region_layer = np.maximum(
                    region_layer,
                    gaussian * landmark_weights[idx]
                )

            region_layer *= (
                region_mask / 255.0
            )

            heat = np.maximum(
                heat,
                region_layer
            )

        if heat.max() > 0:
            heat /= heat.max()

        heat = cv2.GaussianBlur(
            heat,
            (0, 0),
            9
        )

        heat = (heat * 255).astype(np.uint8)

        colored = np.zeros(
            (h, w, 3),
            dtype=np.uint8
        )

        colored = cv2.applyColorMap(
            heat,
            cv2.COLORMAP_TURBO
        )

        colored[heat < 25] = image[heat < 25]

        overlay = image.copy()

        mask = heat > 20

        overlay[mask] = cv2.addWeighted(
            image[mask],
            0.35,
            colored[mask],
            0.65,
            0
        )

        return colored, overlay