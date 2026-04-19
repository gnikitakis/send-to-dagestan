# send-to-dagestan — Claude Code Instructions

## What This Project Is
A funny viral web app that analyzes a user's photo + quiz answers using AI
and tells them how many years they need to train in Dagestan to become tough.
It also serves as brand marketing via shareable result cards.

## Tech Stack
- **Frontend**: Angular 17+ with standalone components, SCSS, Angular Animations
- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API (Vision for image analysis, text for verdict)
- **Image export**: html2canvas (result card → PNG for sharing)
- **Mobile** (Phase 4): Flutter

## Project Structure
```
send-to-dagestan/
├── frontend/src/app/
│   ├── components/
│   │   ├── upload/        # Step 1 — drag & drop photo upload
│   │   ├── quiz/          # Step 2 — 6 questions with scored radio answers
│   │   ├── analyzing/     # Step 3 — loading animation while APIs run
│   │   └── result/        # Step 4 — verdict, scores, share button
│   ├── services/
│   │   ├── image-analysis.service.ts  # POST image to backend /analyze
│   │   └── toughness.service.ts       # Call Claude API for final verdict
│   └── models/
│       ├── image-analysis.model.ts
│       └── toughness-result.model.ts
└── backend/
    ├── server.js
    └── routes/analyze.js
```

## Key Models

### ImageAnalysis
```typescript
interface ImageAnalysis {
  face:    { score: number; observation: string };
  posture: { score: number; observation: string };
  vibe:    { score: number; observation: string };
  overall_image_score: number;
  image_summary: string;
}
```

### ToughnessResult
```typescript
interface ToughnessResult {
  years: number;
  badge: 'MOUNTAIN LEGEND' | 'FUTURE WARRIOR' | 'NEEDS WORK' | 'SERIOUS EMERGENCY';
  verdict_title: string;
  verdict_sub: string;
}
```

## Scoring Logic
```
Quiz score:  0-29 points (weight 60%)
Image score: 0-10 points (weight 40%)

Combined = (quizScore/29 * 0.6) + (imageScore/10 * 0.4)

Years:
  0.00-0.25 → 10-15 years → SERIOUS EMERGENCY
  0.25-0.50 → 5-9 years   → NEEDS WORK
  0.50-0.75 → 2-4 years   → FUTURE WARRIOR
  0.75-1.00 → 0.5-1 year  → MOUNTAIN LEGEND
```

## Backend /analyze Endpoint
- Accepts: `multipart/form-data` with field `image`
- Uses multer with memory storage (no disk writes)
- Calls Claude Vision with this prompt structure:
  - Analyze face (expression, determination): score 0-10
  - Analyze posture (confidence, body language): score 0-10
  - Analyze vibe (overall energy, warrior potential): score 0-10
  - Return funny, kind observations for each
- Returns: ImageAnalysis JSON

## Design Guidelines
- Dark theme: background #0d0d0d, accent red #c0392b, gold #d4a017
- Bold display font (Bebas Neue or similar)
- Mountain / Dagestan flag motifs
- Smooth step transitions with Angular animations
- Mobile-first responsive layout

## Environment Variables
```
# backend/.env
ANTHROPIC_API_KEY=
PORT=3001
FRONTEND_URL=http://localhost:4200

# frontend/src/environments/environment.ts
backendUrl: 'http://localhost:3001'
```

## Coding Conventions
- Use standalone Angular components (no NgModules)
- Use Angular signals for state where possible
- Services return Observables
- SCSS with BEM naming
- All API calls have error handling with fallback behavior
- Never hardcode API keys

## Current Status
Phase 1 in development. Focus on:
1. Backend /analyze endpoint working
2. 4-step Angular flow working end to end
3. Result card with shareable image export
