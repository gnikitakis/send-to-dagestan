import { Injectable, signal } from '@angular/core';

import { ImageAnalysis } from '../models/image-analysis.model';
import {
  ToughnessBadge,
  ToughnessResult,
} from '../models/toughness-result.model';

const VERDICTS: Record<ToughnessBadge, { title: string; sub: string }[]> = {
  'MOUNTAIN LEGEND': [
    { title: 'Khabib would nod approvingly.', sub: 'You already carry the mountain in your bones.' },
    { title: 'The eagle has landed.', sub: 'Born ready. Just keep the bears away.' },
  ],
  'FUTURE WARRIOR': [
    { title: 'The mountain is calling.', sub: 'Raw talent — just add winter and stew.' },
    { title: 'Promising bloodline detected.', sub: 'A short tour in Makhachkala and you are set.' },
  ],
  'NEEDS WORK': [
    { title: 'Book the flight.', sub: 'Promising, but the mountains demand more of you.' },
    { title: 'Moderate toughness deficiency.', sub: 'Treatable with 5 years of wrestling and lamb.' },
  ],
  'SERIOUS EMERGENCY': [
    { title: 'Send to Dagestan. Immediately.', sub: 'There is still hope — but only at altitude.' },
    { title: 'Intervention required.', sub: 'Cancel your plans. The mountain will schedule you.' },
  ],
};

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
    const verdict = pick(VERDICTS[badge]);
    return {
      years,
      badge,
      verdict_title: verdict.title,
      verdict_sub: verdict.sub,
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

function pick<T>(pool: T[]): T {
  return pool[Math.floor(Math.random() * pool.length)];
}
