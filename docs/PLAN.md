# SEND-TO-DAGESTAN — Project Plan

> A viral toughness calculator that analyzes your photo + quiz answers using AI,
> tells you how many years you need to train in Dagestan, and doubles as brand
> marketing by creating shareable, funny content that connects with a wide audience.

---

## 1. PROJECT VISION

### What It Is
A web app (and later mobile app) where users:
1. Upload their photo
2. Answer 6 funny self-assessment questions
3. Get an AI-powered verdict: **"You need X years in Dagestan"**

The AI analyzes the photo (face, posture, vibe) + quiz answers to generate a
personalized, funny, motivating result with scores and breakdowns.

### Why It Works
- **Viral by design** — the result is funny and shareable on social media
- **Brand marketing** — subtle branding on every result card people share
- **Community building** — Dagestan content section connects with MMA/fitness audience
- **Networking tool** — invite influencers, athletes, and public figures to try it publicly

### Target Audience
- MMA / combat sports fans
- Fitness and self-improvement community
- People who follow Khabib, Islam Makhachev, Dagestan fighters
- Anyone who enjoys funny personality quizzes

---

## 2. FEATURES PLAN

### Phase 1 — Core Web App (Angular)
- [ ] Photo upload with drag & drop
- [ ] 6-question self-assessment quiz
- [ ] AI image analysis via backend (face / posture / vibe scores)
- [ ] AI-generated personalized verdict + funny text
- [ ] Animated result card with years counter and score bars
- [ ] **Shareable result card** — generates an image people can post to Instagram/X/TikTok
- [ ] Responsive design (mobile-first)
- [ ] Basic branding on result card

### Phase 2 — Brand & Marketing Layer
- [ ] **Dagestan Content Section** — facts, culture, famous fighters, training tips
- [ ] **Leaderboard** — top users by toughness score (opt-in)
- [ ] **Social sharing** — pre-filled captions for Instagram, X, TikTok
- [ ] **"Challenge a friend"** — share link that invites someone else to take the test
- [ ] Analytics (how many people took the test, avg score, most common result)
- [ ] Brand logo / watermark on every shared result card

### Phase 3 — Community & Connections
- [ ] **Notable people wall** — show results of influencers/athletes who took the test
- [ ] Submit your result to a public gallery
- [ ] Comment / reaction on results
- [ ] Newsletter signup for "Dagestan Training Tips"

### Phase 4 — Flutter Mobile App (iOS & Android)
- [ ] Full feature parity with web app
- [ ] Native camera integration (take photo directly)
- [ ] Push notifications ("Your Dagestan training reminder")
- [ ] Share sheet integration for native sharing
- [ ] App Store + Google Play release

---

## 3. TECHNICAL ARCHITECTURE

### Stack

| Layer | Technology |
|-------|-----------|
| Frontend Web | Angular 17+ (standalone components) |
| Backend | Node.js + Express |
| AI - Image Analysis | Anthropic Claude API (Vision) |
| AI - Verdict Generation | Anthropic Claude API |
| Styling | SCSS + Angular Animations |
| Image Generation | html2canvas (result card export) |
| Mobile | Flutter (Phase 4) |
| Hosting (future) | Vercel (frontend) + Railway/Render (backend) |

### Project Structure

```
send-to-dagestan/
├── frontend/                     # Angular app
│   └── src/app/
│       ├── components/
│       │   ├── upload/           # Step 1 — photo upload
│       │   ├── quiz/             # Step 2 — questions
│       │   ├── analyzing/        # Step 3 — loading animation
│       │   ├── result/           # Step 4 — verdict + scores
│       │   ├── dagestan-content/ # Dagestan info section
│       │   └── navbar/           # Branding header
│       ├── services/
│       │   ├── image-analysis.service.ts   # Calls backend /analyze
│       │   └── toughness.service.ts        # Calls Claude API for verdict
│       ├── models/
│       │   ├── image-analysis.model.ts
│       │   └── toughness-result.model.ts
│       └── app.routes.ts
│
├── backend/                      # Express server
│   ├── server.js                 # Main server
│   ├── routes/
│   │   └── analyze.js            # POST /analyze endpoint
│   ├── services/
│   │   └── claude.service.js     # Claude API calls
│   └── package.json
│
└── mobile/                       # Flutter app (Phase 4)
    └── lib/
```

### API Endpoints

```
POST /analyze
  Body: multipart/form-data { image: File }
  Returns: {
    face:    { score: 0-10, observation: string },
    posture: { score: 0-10, observation: string },
    vibe:    { score: 0-10, observation: string },
    overall_image_score: number,
    image_summary: string
  }

GET /health
  Returns: { status: "ok" }
```

---

## 4. IMPLEMENTATION PLAN

### Step 1 — Backend Setup
1. Create Express server with CORS
2. Add `/analyze` endpoint using multer for image upload
3. Integrate Anthropic SDK for Claude Vision
4. Prompt Claude to return structured JSON with face/posture/vibe scores
5. Add error handling and fallback responses
6. Test with Postman or curl

### Step 2 — Angular App Scaffold
1. Generate Angular project: `ng new send-to-dagestan`
2. Create 4 main components: upload, quiz, analyzing, result
3. Create 2 services: image-analysis, toughness
4. Set up routing between steps
5. Add HttpClient module

### Step 3 — Upload Component
1. Drag & drop file input
2. Image preview
3. File validation (image only, max 10MB)
4. Store file reference for later API call

### Step 4 — Quiz Component
1. 6 questions with radio button options
2. Each answer has a numeric score value
3. Validate all questions answered before proceeding
4. Calculate total quiz score (0-29)

### Step 5 — Analyzing Component
1. Animated loading screen with step indicators
2. Trigger image-analysis.service — POST to backend
3. Trigger toughness.service — Claude API with quiz score + image analysis
4. Navigate to result when both complete

### Step 6 — Result Component
1. Display years count with animated counter
2. Show badge (MOUNTAIN LEGEND / FUTURE WARRIOR / NEEDS WORK / SERIOUS EMERGENCY)
3. Show face/posture/vibe score bars (animated)
4. Show funny verdict text
5. Show breakdown cards with observations
6. Add share button (html2canvas export)

### Step 7 — Shareable Result Card
1. Hidden div styled as a 1080x1080 card
2. Includes: years, badge, scores, branding logo
3. html2canvas converts to PNG
4. User can download or share directly

### Step 8 — Dagestan Content Section
1. Static section below the calculator
2. Famous Dagestani fighters with fun facts
3. Training tips "straight from the mountains"
4. Links to Dagestan culture / places

### Step 9 — Styling & Polish
1. Dark theme: black / deep red / gold
2. Bebas Neue or similar bold display font
3. Mountain/flag motifs
4. Smooth Angular animations between steps
5. Mobile responsive layout

### Step 10 — Deployment
1. Backend — Railway or Render (free tier)
2. Frontend — Vercel or Netlify
3. Environment variables for API keys
4. CORS configuration for production URLs

---

## 5. RESULT SCORING LOGIC

```
Quiz Score:  max 29 points  (weight: 60%)
Image Score: max 10 points  (weight: 40%)

Combined Score = (quizScore/29 * 0.6) + (imageScore/10 * 0.4)
Combined Score range: 0.0 — 1.0

Years in Dagestan:
  0.0 - 0.25  → 10-15 years  (SERIOUS EMERGENCY)
  0.25 - 0.50 → 5-9 years   (NEEDS WORK)
  0.50 - 0.75 → 2-4 years   (FUTURE WARRIOR)
  0.75 - 1.0  → 0.5-1 year  (MOUNTAIN LEGEND)
```

---

## 6. BRAND MARKETING STRATEGY

### On the App
- Logo / brand name visible on every result card
- Watermark on all shared images
- "Made by [Your Brand]" in footer with link

### Social Media Strategy
- Share your own result first — seed the content
- Reach out to MMA influencers / fitness accounts to try it
- Tag Dagestani fighters' official accounts when sharing
- Use hashtags: #SendToDagestan #DagestanToughness #ToughnessTest

### Networking with Notable People
- Create a "Wall of Fame" section for public figures' results
- Reach out via DM: "We built a funny toughness calculator, would love your result"
- Feature their result on the site with their permission
- This creates a loop: they share — their followers try it — brand grows

### Content Ideas
- "We tested [fighter name]'s training habits" style posts
- Weekly "Dagestan tip of the week"
- Before/after: "I scored X, came back 6 months later and scored Y"

---

## 7. PHASE 4 — FLUTTER MOBILE APP

### Why Flutter
- Single codebase for iOS and Android
- Native camera access (better UX than web upload)
- Push notifications
- App Store presence = credibility

### Key Differences from Web
- Native camera picker instead of file upload
- Biometric/face detection pre-processing (optional enhancement)
- Local result history (see your past scores)
- Share sheet uses native OS sharing
- Offline mode: cache last result

### Flutter Dependencies
```yaml
dependencies:
  image_picker: ^1.0.0       # Camera / gallery access
  http: ^1.1.0               # API calls
  share_plus: ^7.0.0         # Native sharing
  flutter_animate: ^4.0.0    # Animations
  screenshot: ^2.1.0         # Result card capture
```

---

## 8. CLAUDE CODE INSTRUCTIONS

When using Claude Code to implement this project, use these prompts:

### Initial Setup
```
Set up an Angular 17 project called send-to-dagestan with:
- Standalone components
- Angular routing
- HttpClient
- SCSS styling
- 4 components: upload, quiz, analyzing, result
- 2 services: image-analysis, toughness
```

### Backend
```
Create an Express backend in /backend with:
- POST /analyze endpoint using multer (memory storage)
- Anthropic SDK integration for Claude Vision
- Returns JSON with face/posture/vibe scores (0-10 each)
- CORS enabled for localhost:4200
- .env for ANTHROPIC_API_KEY
```

### Result Card Export
```
In the result component, add html2canvas to capture
the result card as a PNG image the user can download or share.
The card should be 1080x1080px and include the years, badge,
scores, and brand logo.
```

---

## 9. ENVIRONMENT VARIABLES

```env
# Backend .env
ANTHROPIC_API_KEY=your_key_here
PORT=3001
FRONTEND_URL=http://localhost:4200

# Angular environment.ts
backendUrl: 'http://localhost:3001'
anthropicModel: 'claude-opus-4-5'
```

---

*Last updated: April 2026*
*Project: send-to-dagestan*
*Status: Phase 1 — In Development*
