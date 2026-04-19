import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ToughnessService } from '../../services/toughness';

interface QuizOption {
  label: string;
  score: number;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'morning',
    prompt: 'How do you start your morning?',
    options: [
      { label: 'Ice bath, 200 pushups, sunrise scowl', score: 5 },
      { label: 'Gym before the sun. No negotiation.', score: 4 },
      { label: 'Coffee, scrolling, mild existential dread', score: 2 },
      { label: 'My morning starts whenever my body allows', score: 0 },
    ],
  },
  {
    id: 'cardio',
    prompt: 'Your cardio situation?',
    options: [
      { label: 'I sprint up actual mountains', score: 5 },
      { label: 'Three sweaty sessions a week', score: 3 },
      { label: 'I do not run unless something is chasing me', score: 1 },
      { label: 'My cardio is carrying groceries up two flights', score: 0 },
    ],
  },
  {
    id: 'stress',
    prompt: 'How do you handle pressure?',
    options: [
      { label: 'I wrestle it. Literally. In the yard.', score: 5 },
      { label: 'Cold breath, warm tea, thousand-yard stare', score: 4 },
      { label: 'Loudly complain into my phone', score: 2 },
      { label: 'Snacks, Netflix, quick cry, repeat', score: 0 },
    ],
  },
  {
    id: 'meal',
    prompt: 'Pick the meal that describes you.',
    options: [
      { label: 'Lamb, khinkali, more lamb', score: 4 },
      { label: 'Chicken, rice, broccoli. Again.', score: 3 },
      { label: 'Pasta. Always pasta.', score: 1 },
      { label: 'Whatever the app recommended tonight', score: 0 },
    ],
  },
  {
    id: 'combat',
    prompt: 'Combat sports - how often?',
    options: [
      { label: 'I wrestle my cousin before breakfast', score: 5 },
      { label: 'A couple of gi sessions a week', score: 3 },
      { label: 'Watched one UFC event, got a bit scared', score: 1 },
      { label: 'I am a pacifist. Also slightly frightened.', score: 0 },
    ],
  },
  {
    id: 'philosophy',
    prompt: 'Pick a philosophy.',
    options: [
      { label: 'Suffer now, flex forever', score: 5 },
      { label: 'Discipline is freedom', score: 4 },
      { label: 'Balance in all things, namaste', score: 2 },
      { label: 'Vibes, bro. Pure vibes.', score: 0 },
    ],
  },
];

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
})
export class Quiz {
  private readonly router = inject(Router);
  private readonly toughness = inject(ToughnessService);

  readonly questions = QUIZ_QUESTIONS;
  readonly answers = signal<Record<string, number | null>>(
    Object.fromEntries(QUIZ_QUESTIONS.map((q) => [q.id, null])),
  );

  readonly answeredCount = computed(
    () => Object.values(this.answers()).filter((v) => v !== null).length,
  );
  readonly isComplete = computed(() => this.answeredCount() === this.questions.length);

  select(questionId: string, score: number): void {
    this.answers.update((prev) => ({ ...prev, [questionId]: score }));
  }

  isSelected(questionId: string, score: number): boolean {
    return this.answers()[questionId] === score;
  }

  submit(): void {
    if (!this.isComplete()) return;
    const total = Object.values(this.answers()).reduce<number>(
      (sum, v) => sum + (v ?? 0),
      0,
    );
    this.toughness.quizScore.set(total);
    this.router.navigate(['/analyzing']);
  }
}
