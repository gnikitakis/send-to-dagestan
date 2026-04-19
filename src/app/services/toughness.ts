import { Injectable, signal } from '@angular/core';

import { ImageAnalysis } from '../models/image-analysis.model';
import {
  ToughnessBadge,
  ToughnessResult,
} from '../models/toughness-result.model';

@Injectable({
  providedIn: 'root',
})
export class ToughnessService {
  readonly uploadedImage = signal<File | null>(null);
  readonly quizScore = signal<number>(0);
  readonly imageAnalysis = signal<ImageAnalysis | null>(null);
  readonly result = signal<ToughnessResult | null>(null);

  compute(quizScore: number, imageScore: number): ToughnessResult {
    const combined = (quizScore / 29) * 0.6 + (imageScore / 10) * 0.4;
    const { years, badge } = this.bandFor(combined);
    return {
      years,
      badge,
      verdict_title: '',
      verdict_sub: '',
    };
  }

  private bandFor(combined: number): { years: number; badge: ToughnessBadge } {
    if (combined < 0.25) return { years: randomInRange(10, 15), badge: 'SERIOUS EMERGENCY' };
    if (combined < 0.5) return { years: randomInRange(5, 9), badge: 'NEEDS WORK' };
    if (combined < 0.75) return { years: randomInRange(2, 4), badge: 'FUTURE WARRIOR' };
    return { years: Math.random() < 0.5 ? 0.5 : 1, badge: 'MOUNTAIN LEGEND' };
  }
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
