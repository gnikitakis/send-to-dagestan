import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ImageAnalysisService } from '../../services/image-analysis';
import { ToughnessService } from '../../services/toughness';

@Component({
  selector: 'app-analyzing',
  imports: [],
  templateUrl: './analyzing.html',
})
export class Analyzing implements OnInit {
  private readonly imageAnalysis = inject(ImageAnalysisService);
  private readonly toughness = inject(ToughnessService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const image = this.toughness.uploadedImage();
    const quizScore = this.toughness.quizScore();

    this.imageAnalysis.analyze(image as File).subscribe({
      next: (analysis) => {
        this.toughness.imageAnalysis.set(analysis);
        const result = this.toughness.compute(quizScore, analysis.overall_image_score);
        this.toughness.result.set(result);
        this.router.navigate(['/result']);
      },
      error: () => this.router.navigate(['/upload']),
    });
  }
}
