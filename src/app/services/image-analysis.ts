import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ImageAnalysis } from '../models/image-analysis.model';

const FACE_OBSERVATIONS = [
  'Eyes say "warrior", mouth says "needs sleep".',
  'Jawline showing promise, cheeks still negotiating.',
  'Quiet intensity detected. Low-key menacing.',
  'Face of someone who has never lost a staring contest.',
  'Expression calibrated for maximum Dagestani energy.',
];

const POSTURE_OBSERVATIONS = [
  'Shoulders back, chin up — respectable stance.',
  'Slightly slouched. Mountains will fix that.',
  'Posture of a man ready to wrestle a bear. Politely.',
  'Neutral spine, neutral vibes.',
  'Body language says champion, couch says otherwise.',
];

const VIBE_OBSERVATIONS = [
  'Aura level: mildly intimidating.',
  'Energy says "cardio day", eyes say "rest day".',
  'Radiates calm that could defuse a bar fight.',
  'Vibe check: surprisingly dangerous.',
  'Walks into rooms. Rooms notice.',
];

const SUMMARIES = [
  'Raw material is there. Refinement required.',
  'Promising candidate. Mountain air will do the rest.',
  'Unpolished but undeniable.',
  'Work ethic visible from space.',
  'Needs seasoning. A lot of seasoning.',
];

@Injectable({
  providedIn: 'root',
})
export class ImageAnalysisService {
  analyze(_image: File): Observable<ImageAnalysis> {
    const face = this.buildScore(FACE_OBSERVATIONS);
    const posture = this.buildScore(POSTURE_OBSERVATIONS);
    const vibe = this.buildScore(VIBE_OBSERVATIONS);
    const overall = Math.round(((face.score + posture.score + vibe.score) / 3) * 10) / 10;

    const payload: ImageAnalysis = {
      face,
      posture,
      vibe,
      overall_image_score: overall,
      image_summary: pick(SUMMARIES),
    };

    return of(payload).pipe(delay(1500));
  }

  private buildScore(pool: string[]) {
    return {
      score: randomScore(),
      observation: pick(pool),
    };
  }
}

function randomScore(): number {
  return Math.floor(Math.random() * 11);
}

function pick<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}
