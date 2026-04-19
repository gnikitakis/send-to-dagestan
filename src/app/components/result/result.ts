import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ToughnessBadge } from '../../models/toughness-result.model';
import { ToughnessService } from '../../services/toughness';

const BADGE_STYLE: Record<ToughnessBadge, { label: string; ring: string; text: string }> = {
  'MOUNTAIN LEGEND': {
    label: 'Mountain Legend',
    ring: 'ring-gold',
    text: 'text-gold',
  },
  'FUTURE WARRIOR': {
    label: 'Future Warrior',
    ring: 'ring-emerald-400',
    text: 'text-emerald-400',
  },
  'NEEDS WORK': {
    label: 'Needs Work',
    ring: 'ring-amber-400',
    text: 'text-amber-400',
  },
  'SERIOUS EMERGENCY': {
    label: 'Serious Emergency',
    ring: 'ring-blood',
    text: 'text-blood',
  },
  'LIFETIME RESIDENT': {
    label: 'Lifetime Resident',
    ring: 'ring-purple-500',
    text: 'text-purple-400',
  },
};

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
})
export class Result implements OnInit {
  private readonly router = inject(Router);
  private readonly toughness = inject(ToughnessService);

  readonly result = this.toughness.result;
  readonly analysis = this.toughness.imageAnalysis;

  readonly displayYears = signal(0);
  readonly barsVisible = signal(false);

  readonly badgeStyle = computed(() => {
    const badge = this.result()?.badge;
    return badge ? BADGE_STYLE[badge] : null;
  });

  readonly isForever = computed(() => !isFinite(this.result()?.years ?? 0));

  ngOnInit(): void {
    if (!this.result() || !this.analysis()) {
      this.router.navigate(['/upload']);
      return;
    }
    this.animateYears();
    setTimeout(() => this.barsVisible.set(true), 200);
  }

  formatYears(years: number): string {
    if (!isFinite(years)) return '∞';
    return years < 1 ? years.toFixed(1) : String(Math.round(years));
  }

  yearsLabel(): string {
    const years = this.result()?.years;
    if (years === undefined) return 'Years';
    if (!isFinite(years)) return 'Forever';
    if (years === 1 || years === 0.5) return 'Year';
    return 'Years';
  }

  restart(): void {
    this.toughness.uploadedImage.set(null);
    this.toughness.quizScore.set(0);
    this.toughness.imageAnalysis.set(null);
    this.toughness.result.set(null);
    this.router.navigate(['/upload']);
  }

  private animateYears(): void {
    const target = this.result()?.years ?? 0;
    if (!isFinite(target)) {
      this.displayYears.set(Infinity);
      return;
    }
    const durationMs = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayYears.set(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else this.displayYears.set(target);
    };
    requestAnimationFrame(tick);
  }
}
