export interface ImageAnalysisScore {
  score: number;
  observation: string;
}

export interface ImageAnalysis {
  face: ImageAnalysisScore;
  posture: ImageAnalysisScore;
  vibe: ImageAnalysisScore;
  overall_image_score: number;
  image_summary: string;
}
