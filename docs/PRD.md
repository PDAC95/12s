# Product Requirements Document (PRD)

## Soisi - P2P Betting Platform

**Version:** 1.0  
**Date:** September 9, 2025  
**Author:** Product Team  
**Status:** Active Development (MVP Phase)

---

## Executive Summary

Soisi is a peer-to-peer (P2P) betting platform that revolutionizes casual gaming wagering by creating a secure, community-driven environment where gamers can challenge each other using virtual currency. The platform addresses the trust and validation issues in informal gaming bets by implementing a unique community jury system for dispute resolution.

The core problem Soisi solves is the lack of a structured, fair platform for casual gaming bets. Currently, gamers make informal bets through messaging apps or verbal agreements, leading to disputes, non-payment, and lack of accountability. Soisi provides a formalized system with escrow services, evidence-based validation, and community governance.

Our target market consists of competitive casual gamers aged 18-35 who regularly play popular titles like FIFA, Call of Duty, Fortnite, and fighting games. These users seek the excitement of competitive stakes without the complexities of professional esports betting or the risks associated with unregulated gambling.

Key differentiating features include our community jury system for dispute resolution, evidence-based bet validation through screenshots and video uploads, a virtual coin economy that maintains legal compliance, and a progressive KYC system that balances user privacy with platform security.

Currently in MVP development, Soisi aims to launch with core betting functionality, basic user profiles, and the community validation system. The vision extends to becoming the primary platform for casual gaming wagers, eventually supporting tournaments, league systems, and potential integration with real money transactions in regulated markets.

## Problem Statement

### Identified Problems

**Problem 1: Trust Deficit in Informal Gaming Bets**
Gamers frequently make casual bets on match outcomes but lack a trusted intermediary. This results in approximately 30% of informal bets ending in disputes or non-payment, creating frustration and damaging gaming communities.

**Problem 2: No Structured Validation System**
When disputes arise in gaming bets, there's no impartial system to validate results. Players resort to screenshots that can be manipulated, leading to unresolved conflicts and broken friendships within gaming communities.

**Problem 3: Legal and Financial Barriers**
Existing betting platforms focus on professional esports with real money, creating legal complications and excluding younger or casual players. There's no middle ground for friendly competitive wagering with meaningful but non-monetary stakes.

### Problem Impact

- **Time Wasted:** Average of 2-3 hours per disputed bet in arguments and evidence gathering
- **Money Lost:** Estimated $50-200 per player annually in unpaid informal bets
- **Community Damage:** 40% of gaming friendships report strain from bet-related disputes
- **Missed Opportunity:** $2.5 billion casual gaming bet market remains unstructured

## Target Users

### Primary User: Competitive Casual Gamer

**Profile:** 18-25 years old, primarily male (70%), college students or young professionals

- **Needs:** Fair betting system, quick bet resolution, social validation, competitive excitement
- **Frustrations:** Friends not paying bets, arguments over results, no betting history/stats
- **Technology:** High comfort with apps, active on Discord/Twitch, owns console/gaming PC
- **Behavior:** Plays 10-20 hours weekly, makes 3-5 informal bets monthly, active in gaming communities

### Secondary User: Aspiring Semi-Pro Gamer

**Profile:** 20-30 years old, mixed gender, part-time streamers or tournament participants

- **Needs:** Practice with stakes, reputation building, potential monetization path
- **Frustrations:** Gap between casual and pro gaming, no structured progression system
- **Technology:** Advanced users, familiar with streaming/recording tools, multi-platform gamers
- **Behavior:** Plays 20+ hours weekly, seeks competitive validation, building online presence

### Tertiary User: Gaming Community Moderator

**Profile:** 25-35 years old, established gamers, community leaders

- **Needs:** Tools to organize community events, fair dispute resolution, engagement features
- **Frustrations:** Managing bet disputes in their communities, lack of structured tournament tools
- **Technology:** Experienced with community management tools, Discord/Reddit moderators
- **Behavior:** Organizes weekly/monthly events, mediates disputes, promotes fair play

## User Stories

### Account Management & KYC

1. **As a new user**, I want to register with minimal friction so that I can start exploring the platform immediately
2. **As a user**, I want to verify my age during registration so that the platform remains legally compliant
3. **As a user**, I want to complete KYC progressively so that I'm not overwhelmed with requirements upfront
4. **As a user**, I want to earn welcome coins after email verification so that I can try the platform without investment

### Betting Core Features

5. **As a gamer**, I want to create custom bets for any game so that I can challenge friends on my terms
6. **As a user**, I want to set bet amounts in virtual coins so that I can manage my risk
7. **As a bettor**, I want an escrow system so that funds are secure during the bet
8. **As a player**, I want to upload evidence (screenshots/videos) so that I can prove my victory
9. **As a user**, I want to search and join open bets so that I can find opponents easily

### Validation & Disputes

10. **As a winner**, I want the community to validate my evidence so that victories are confirmed fairly
11. **As a disputing party**, I want to request jury review so that conflicts are resolved impartially
12. **As a jury member**, I want to earn rewards for fair judgments so that I'm incentivized to participate
13. **As a user**, I want to see jury members' reputation scores so that I trust the validation process

### Social & Progression

14. **As a user**, I want to view my betting history and stats so that I can track my performance
15. **As a competitive player**, I want leaderboards so that I can compare myself to others
16. **As a user**, I want to follow other players so that I can track their bets and challenges
17. **As a winner**, I want to share victories on social media so that I can build my reputation

## Functional Requirements

### User Management

- Email/password registration with Auth0 integration
- Username uniqueness validation
- Age verification (18+ requirement)
- Progressive KYC: Basic → Verified → Premium tiers
- Profile customization (avatar, bio, favorite games)
- Account recovery via email

### Betting System

- Create bet: game selection, rules, coin amount, time limit
- Bet types: 1v1, tournament, group challenges
- Maximum bet limits based on verification level
- Escrow service holds coins during active bets
- Evidence upload: images (via Cloudinary), video links
- Auto-expiry for unaccepted bets (48 hours)

### Validation System

- Automated validation for clear victories (unanimous evidence)
- Community jury pool selection (random, reputation-based)
- 5-member jury panels for disputed bets
- 24-hour validation period
- Majority vote (3/5) determines outcome
- Appeal process for significant bets (>500 coins)

### Virtual Economy

- Coin system: non-monetary virtual currency
- Welcome bonus: 100 coins post-email verification
- Coin packages for purchase (future feature)
- Jury rewards: 5-10 coins per validated judgment
- Referral bonuses: 50 coins per verified referral
- Daily login bonuses to maintain engagement

## Non-Functional Requirements

### Performance

- Page load time < 2 seconds on 4G connection
- API response < 200ms for critical endpoints
- Support for 10,000 concurrent users
- Image upload processing < 5 seconds
- Real-time bet updates via WebSocket

### Security

- HTTPS encryption for all communications
- JWT tokens with httpOnly cookies
- Auth0 for authentication management
- Input validation and sanitization
- Rate limiting: 100 requests/minute per user
- GDPR compliance for EU users

### Scalability

- Microservices architecture ready
- Database sharding capability
- CDN for static assets (Cloudinary)
- Horizontal scaling for API servers
- Queue system for heavy processing

### Usability

- Mobile-first responsive design
- WCAG 2.1 Level AA accessibility
- Multi-language support (English, Spanish initially)
- Maximum 3 clicks to create a bet
- Onboarding tutorial for new users

### Availability

- 99.9% uptime target
- Daily automated backups
- 15-minute recovery time objective
- Maintenance windows: Tuesdays 2-4 AM EST
- Graceful degradation for non-critical features

## Technology Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **API Client:** React Query
- **Build Tool:** Turbopack

### Backend

- **Runtime:** Node.js
- **Framework:** NestJS
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Auth0

### Mobile

- **Framework:** Expo SDK 50
- **Navigation:** Expo Router
- **Styling:** NativeWind
- **State:** React Query

### Infrastructure

- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway
- **Database:** Railway PostgreSQL
- **File Storage:** Cloudinary
- **Monitoring:** Sentry
- **Analytics:** Google Analytics

### External Integrations

- **Auth0:** User authentication and management
- **Cloudinary:** Image/video upload and processing
- **Resend:** Transactional emails
- **Stripe:** Payment processing (future)

## Success Metrics

### Adoption Metrics

- **Target Users:** 1,000 active users in 3 months
- **Registration Rate:** 40% of landing page visitors
- **Email Verification Rate:** 70% within 24 hours
- **KYC Completion:** 30% complete full verification

### Engagement Metrics

- **Session Duration:** Average 15 minutes
- **Return Rate:** 60% weekly active users
- **Bets per User:** Average 3 bets/week
- **Jury Participation:** 20% of users serve as jury

### Business Metrics

- **Coin Purchase Rate:** 10% of users (future)
- **Cost per User:** < $0.50/month
- **Viral Coefficient:** 1.2 (referral rate)
- **Platform Commission:** 5% of bet amounts (future)

### Technical Metrics

- **API Response Time:** P95 < 500ms
- **Error Rate:** < 0.1%
- **Uptime:** > 99.9%
- **Image Upload Success:** > 95%

## MVP vs Full Version

### MVP (Minimum Viable Product)

**Timeline:** 8-10 weeks

**Included Features:**

- User registration with age verification
- Basic KYC (email verification)
- Create and accept simple 1v1 bets
- Virtual coin wallet
- Evidence upload (images only)
- Community jury validation
- Basic user profiles
- Simple bet history

**Excluded Features:**

- Advanced KYC with ID verification
- Tournaments
- Video evidence
- Social features (follow, chat)
- Coin purchases
- Mobile app
- Advanced analytics

### Full Version

**Timeline:** 6 months

**Additional Features:**

- Complete KYC with ID/selfie verification
- Tournament creation and management
- Video evidence support
- Real-time chat
- Social feed of bets
- Coin package purchases
- Native mobile apps
- Streaming integration
- Advanced analytics dashboard
- Reputation leagues
- Sponsored tournaments
- API for third-party integration

## Data Model Specification

### User Schema

```javascript
{
  id: String (UUID),
  email: String (unique),
  username: String (unique),
  auth0Id: String (unique),
  birthDate: DateTime,
  emailVerified: Boolean,
  kycLevel: Enum ['basic', 'verified', 'premium'],
  coins: Integer (default: 0),
  reputation: Integer (default: 100),
  wins: Integer (default: 0),
  losses: Integer (default: 0),
  juryScore: Float (default: 0),
  termsAcceptedAt: DateTime,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Bet Schema

```javascript
{
  id: String (UUID),
  creatorId: String (FK -> User),
  acceptorId: String (FK -> User, nullable),
  game: String,
  betType: Enum ['1v1', 'tournament', 'group'],
  amount: Integer,
  description: String,
  rules: String,
  status: Enum ['pending', 'active', 'disputed', 'completed', 'cancelled'],
  winnerId: String (FK -> User, nullable),
  evidence: Array[{
    userId: String,
    type: Enum ['image', 'video'],
    url: String,
    uploadedAt: DateTime
  }],
  expiresAt: DateTime,
  completedAt: DateTime (nullable),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### JuryVote Schema

```javascript
{
  id: String (UUID),
  betId: String (FK -> Bet),
  jurorId: String (FK -> User),
  vote: Enum ['creator', 'acceptor', 'invalid'],
  reasoning: String (optional),
  rewardEarned: Integer,
  createdAt: DateTime
}
```

## System Architecture

### High-Level Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Next.js   │◄──►│   NestJS    │◄──►│ PostgreSQL  │
│   Frontend  │    │   Backend   │    │  Database   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Cloudinary │    │    Auth0    │    │    Redis    │
│   (Images)  │    │    (Auth)   │    │   (Cache)   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Vercel   │    │   Railway   │    │   Sentry    │
│   (Hosting) │    │  (Backend)  │    │ (Monitoring)│
└─────────────┘    └─────────────┘    └─────────────┘
```

## API Specification

### Authentication Endpoints

#### POST /api/auth/register

**Request:**

```json
{
  "email": "string",
  "username": "string",
  "password": "string",
  "birthDate": "YYYY-MM-DD"
}
```

**Response (201):**

```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "emailVerified": false
  }
}
```

#### POST /api/auth/login

**Request:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "username": "string",
    "coins": 100
  },
  "token": "jwt_token"
}
```

### Bet Endpoints

#### POST /api/bets

**Request:**

```json
{
  "game": "string",
  "amount": 100,
  "description": "string",
  "rules": "string",
  "expiresIn": 48
}
```

#### GET /api/bets

**Query Parameters:**

- `status` - Filter by bet status
- `game` - Filter by game
- `page` - Page number
- `limit` - Items per page

## Risks and Mitigations

### Technical Risks

**Risk:** Evidence manipulation/fake screenshots

- **Probability:** High
- **Impact:** High
- **Mitigation:** Multi-juror validation, reputation system, future AI detection

**Risk:** Scaling issues with user growth

- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Microservices architecture, caching layer, CDN usage

### Business Risks

**Risk:** Legal challenges in certain jurisdictions

- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Virtual currency only, clear terms of service, geo-blocking if needed

**Risk:** Low user adoption

- **Probability:** Medium
- **Impact:** High
- **Mitigation:** Referral program, influencer partnerships, tournament sponsorships

### Adoption Risks

**Risk:** Users preferring informal bets

- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Seamless UX, social features, community building

## Timeline

### Phase 1: Foundation (Weeks 1-2) ✅

- Week 1: Project setup, database design, authentication
- Week 2: User registration, login, basic profile

### Phase 2: Core Betting (Weeks 3-4) 🚧

- Week 3: Create bet, accept bet, coin wallet
- Week 4: Evidence upload, bet completion flow

### Phase 3: Validation System (Weeks 5-6)

- Week 5: Jury selection algorithm, voting interface
- Week 6: Dispute resolution, reward distribution

### Phase 4: Polish & Testing (Weeks 7-8)

- Week 7: UI/UX improvements, performance optimization
- Week 8: Testing, bug fixes, deployment preparation

### Phase 5: Launch Preparation (Weeks 9-10)

- Week 9: Beta testing with limited users
- Week 10: Marketing preparation, final adjustments

## Next Steps

1. **Complete Dashboard Implementation**

   - Description: Create user dashboard with wallet, active bets, history
   - Timeline: 2 days
   - Owner: Development Team

2. **Implement JWT Authentication**

   - Description: Secure routes with proper token management
   - Timeline: 1 day
   - Owner: Backend Team

3. **Design Bet Creation Flow**
   - Description: UI/UX for creating and accepting bets
   - Timeline: 3 days
   - Owner: Frontend Team

---

**Document Control:**

- Last Updated: September 9, 2025
- Next Review: September 16, 2025
- Owner: Product Team
- Stakeholders: Development, Design, Business
