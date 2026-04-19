import { Injectable, signal } from '@angular/core';

import { ImageAnalysis } from '../models/image-analysis.model';
import {
  ToughnessBadge,
  ToughnessResult,
} from '../models/toughness-result.model';

const VERDICTS: Record<ToughnessBadge, { title: string; sub: string }[]> = {
  'MOUNTAIN LEGEND': [
    { title: 'Khabib would nod approvingly.', sub: 'You already carry the mountain in your bones.' },
    { title: 'The eagle has landed.', sub: 'Born ready. Try not to scare the sheep.' },
    { title: 'Blood pressure: mountain stream.', sub: 'Made in Makhachkala, shipped as finished goods.' },
    { title: 'Send you? We should learn from you.', sub: 'Please teach the elders. They are taking notes.' },
  ],
  'FUTURE WARRIOR': [
    { title: 'The mountain is calling.', sub: 'Raw talent. Just add winter and stew.' },
    { title: 'Promising bloodline detected.', sub: 'A short tour in Makhachkala and you are set.' },
    { title: 'You are one lamb dinner away.', sub: 'Close. The mountain tastes you from here.' },
    { title: 'Warrior energy at 78 percent.', sub: 'Plug in for a season. Fully charge.' },
  ],
  'NEEDS WORK': [
    { title: 'Book the flight.', sub: 'Promising, but the mountains demand more of you.' },
    { title: 'Moderate toughness deficiency.', sub: 'Treatable with 5 years of wrestling and lamb.' },
    { title: 'Your shoulders miss snow.', sub: 'A few winters will straighten them out.' },
    { title: 'We respect the effort. But also: no.', sub: 'Come back after some wrestling and a haircut.' },
  ],
  'SERIOUS EMERGENCY': [
    { title: 'Send to Dagestan. Immediately.', sub: 'There is still hope, but only at altitude.' },
    { title: 'Intervention required.', sub: 'Cancel your plans. The mountain has a spot.' },
    { title: 'Situation is grim. Not hopeless.', sub: 'Pack warm. Do not bring your phone.' },
    { title: 'Your softness is visible from orbit.', sub: 'Ten years minimum. Eagles will supervise.' },
  ],
  'LIFETIME RESIDENT': [
    { title: 'You are not coming back.', sub: 'Pack light. Stay forever. We insist.' },
    { title: 'The mountain adopts you.', sub: 'Softness has exceeded known limits. You are now Goat Guardian.' },
    { title: 'Forever sentence.', sub: 'Even the sheep look concerned. No release date.' },
    { title: 'Beyond redemption by normal means.', sub: 'The only cure is permanent altitude. Do not buy a return ticket.' },
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
    if (combined < 0.1) return { years: Infinity, badge: 'LIFETIME RESIDENT' };
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
