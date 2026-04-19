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
      { label: 'Cold shower at 5am, no exceptions', score: 5 },
      { label: 'Gym before anything else', score: 4 },
      { label: 'Coffee and a bit of scrolling', score: 2 },
      { label: 'Whenever my body decides', score: 0 },
    ],
  },
  {
    id: 'cardio',
    prompt: 'Your cardio situation?',
    options: [
      { label: 'I run up actual mountains', score: 5 },
      { label: '3–5 sessions a week', score: 3 },
      { label: 'I walk to the car', score: 1 },
      { label: 'Cardio is for horses', score: 0 },
    ],
  },
  {
    id: 'stress',
    prompt: 'How do you handle pressure?',
    options: [
      { label: 'I wrestle it into submission', score: 5 },
      { label: 'Breathing, discipline, silence', score: 4 },
      { label: 'Pretend it is not happening', score: 2 },
      { label: 'Snacks and a TV show', score: 0 },
    ],
  },
  {
    id: 'meal',
    prompt: 'Pick the meal that describes you.',
    options: [
      { label: 'Lamb, potatoes, mountain herbs', score: 4 },
      { label: 'Chicken, rice, broccoli', score: 3 },
      { label: 'Whatever is closest', score: 1 },
      { label: 'Delivery, again', score: 0 },
    ],
  },
  {
    id: 'combat',
    prompt: 'Combat sports — how often?',
    options: [
      { label: 'Every single day', score: 5 },
      { label: 'A couple of times a week', score: 3 },
      { label: 'I tried it once at a birthday party', score: 1 },
      { label: 'Never. Not once.', score: 0 },
    ],
  },
  {
    id: 'philosophy',
    prompt: 'Pick a philosophy.',
    options: [
      { label: 'Discipline is stronger than motivation', score: 5 },
      { label: 'No pain, no gain', score: 4 },
      { label: 'Balance in all things', score: 2 },
      { label: 'Vibes only', score: 0 },
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
