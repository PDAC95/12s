# PLANNING.md - Soisi Technical Architecture

## Project Vision

Soisi is a P2P betting platform for videogames where users can create and participate in bets using virtual coins, with a community-driven validation system for dispute resolution. The MVP focuses on basic betting functionality with user authentication, bet creation/acceptance, and jury-based validation.

**MVP Scope:** User registration/login, create/accept bets, evidence upload, jury validation, virtual coin wallet
**Current Status:** ✅ JWT Authentication System Complete - Ready for Sprint 2 (Betting Core)
**Target Launch:** November 2025 (MVP)

## Technical Architecture

### System Architecture Diagram (Updated with JWT)

```
┌───────────────────────────────────────────────────────────┐
│                    Cloudflare CDN                         │
└───────────────┬───────────────────────────┬──────────────┘
                │                           │
    ┌───────────▼──────────┐    ┌──────────▼──────────┐
    │   Next.js Frontend   │    │   Expo Mobile App    │
    │     (Vercel)         │    │   (EAS Build)        │
    └───────────┬──────────┘    └──────────┬──────────┘
                │                           │
    ┌───────────▼───────────────────────────▼──────────┐
    │              NestJS API Gateway                   │
    │                 (Railway)                         │
    └───────────┬───────────────────────────┬──────────┘
                │                           │
    ┌───────────▼──────────┐    ┌──────────▼──────────┐
    │  JWT Auth Service    │    │   Betting Service    │
    │   (Passport.js) ✅   │    │     (NestJS)         │
    └───────────┬──────────┘    └──────────┬──────────┘
                │                           │
    ┌───────────▼───────────────────────────▼──────────┐
    │           PostgreSQL Database (Railway)           │
    │        (UserPassword table added) ✅             │
    └───────────────────────────────────────────────────┘
                │                           │
    ┌───────────▼──────────┐    ┌──────────▼──────────┐
    │   Redis (Future)     │    │  Cloudinary (Media)  │
    └──────────────────────┘    └─────────────────────┘
```

### Frontend Architecture (Next.js 14)

- **Framework:** Next.js 14 with App Router
- **Component Structure:**
  ```
  src/
  ├── app/                    # App Router pages
  │   ├── (public)/          # Public routes
  │   │   ├── login/
  │   │   └── register/
  │   ├── (protected)/       # Protected routes
  │   │   ├── dashboard/
  │   │   ├── bets/
  │   │   └── profile/
  │   └── api/               # API routes
  ├── components/            # Reusable components
  │   ├── ui/               # shadcn/ui components
  │   ├── forms/
  │   └── layout/
  ├── services/             # API services
  ├── hooks/                # Custom hooks
  ├── lib/                  # Utilities
  └── types/                # TypeScript types
  ```
- **State Management:** Zustand for global state
- **Data Fetching:** React Query
- **Styling:** Tailwind CSS + shadcn/ui
- **Forms:** react-hook-form + zod

### Backend Architecture (NestJS)

- **Framework:** NestJS with TypeScript
- **Folder Structure:**
  ```
  src/
  ├── auth/              # Authentication module
  │   ├── auth.controller.ts
  │   ├── auth.service.ts
  │   ├── auth.module.ts
  │   └── dto/
  ├── users/             # Users module
  │   ├── users.controller.ts
  │   ├── users.service.ts
  │   └── users.module.ts
  ├── bets/              # Betting module
  │   ├── bets.controller.ts
  │   ├── bets.service.ts
  │   └── dto/
  ├── jury/              # Jury validation module
  ├── wallet/            # Wallet module
  ├── common/            # Shared resources
  │   ├── guards/
  │   ├── interceptors/
  │   └── pipes/
  ├── prisma/            # Database ORM
  └── config/            # Configuration
  ```
- **API Design:** RESTful with OpenAPI documentation
- **Authentication:** ✅ JWT with Passport.js (httpOnly cookies) - Complete with login/logout/protected routes
- **Database ORM:** Prisma (with UserPassword table for authentication)
- **Real-time:** Socket.io (future)

### Database Design (PostgreSQL)

- **Type:** PostgreSQL (Railway hosted)
- **Main Tables:**
  - `users`: User accounts and profiles ✅
  - `user_passwords`: JWT authentication passwords ✅
  - `wallets`: Virtual coin balances ✅
  - `user_reputations`: User reputation scores ✅
  - `bets`: Bet information and status (Sprint 2)
  - `evidence`: Uploaded evidence for bets (Sprint 3)
  - `jury_votes`: Jury validation votes (Sprint 4)
  - `transactions`: Coin transactions (Sprint 5)
  - `notifications`: User notifications (Sprint 6)
- **Indexes:**
  - `users.email`: Unique constraint
  - `users.username`: Unique constraint
  - `bets.status`: Filter active bets
  - `bets.creatorId, bets.acceptorId`: User's bets
- **Relationships:**
  - User → Many Bets (creator/acceptor)
  - Bet → Many Evidence items
  - Bet → Many JuryVotes
  - User → Many Transactions

## Technology Stack

### Frontend

```yaml
Framework: Next.js 14.0.0
Language: TypeScript 5.0
UI Library: Tailwind CSS 3.4 + shadcn/ui
State Management: Zustand 4.5
Data Fetching: React Query (TanStack Query) 5.0
Forms: react-hook-form 7.50 + zod 3.22
Authentication: Auth0 SDK
HTTP Client: Native fetch with custom wrapper
Image Handling: next/image + Cloudinary
Testing: Jest + React Testing Library
Build Tool: Turbopack (Next.js built-in)
Deployment: Vercel
```

### Backend

```yaml
Language: TypeScript 5.0
Runtime: Node.js 20 LTS
Framework: NestJS 10.0
Database: PostgreSQL 15
ORM: Prisma 5.0
Authentication: Auth0 + Passport.js
Validation: class-validator + class-transformer
File Storage: Cloudinary
Email Service: Resend (future)
Queue: Bull + Redis (future)
Logging: Winston
API Documentation: Swagger/OpenAPI
Testing: Jest + Supertest
Deployment: Railway
```

### Mobile (Future)

```yaml
Framework: Expo SDK 50
Language: TypeScript
Navigation: Expo Router
Styling: NativeWind (Tailwind for React Native)
State: React Query + Zustand
Build: EAS Build
Distribution: App Store + Google Play
```

### DevOps & Tools

```yaml
Version Control: Git + GitHub
CI/CD: GitHub Actions
Monitoring: Sentry
Analytics: Google Analytics 4
Package Manager: npm
Code Quality: ESLint + Prettier
Pre-commit: Husky + lint-staged
Environment Management: dotenv
```

## Code Conventions

### Naming Conventions

```typescript
// Frontend (Next.js)
Components: PascalCase.tsx (e.g., BetCard.tsx)
Pages: lowercase folders (e.g., /dashboard/page.tsx)
Hooks: use prefix (e.g., useBets.ts)
Services: camelCase.service.ts (e.g., auth.service.ts)
Types: PascalCase.types.ts (e.g., User.types.ts)
Constants: UPPER_SNAKE_CASE (e.g., API_ENDPOINTS.ts)

// Backend (NestJS)
Modules: PascalCase.module.ts (e.g., AuthModule)
Controllers: PascalCase.controller.ts
Services: PascalCase.service.ts
DTOs: PascalCase.dto.ts (e.g., CreateBetDto)
Entities: PascalCase.entity.ts
Guards: PascalCase.guard.ts
```

### Git Commit Format

```
type(scope): subject

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Examples:
feat(auth): add email verification flow
fix(bets): correct coin escrow calculation
docs(api): update swagger documentation
```

### API Response Format

```typescript
// Success Response
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}

// Paginated Response
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### Error Handling Pattern

```typescript
// Backend (NestJS)
@Post('register')
async register(@Body() dto: RegisterDto) {
  try {
    const user = await this.authService.register(dto);
    return {
      success: true,
      data: user,
      message: 'Registration successful'
    };
  } catch (error) {
    if (error instanceof ConflictException) {
      throw new HttpException({
        success: false,
        error: {
          message: error.message,
          code: 'CONFLICT',
          statusCode: 409
        }
      }, 409);
    }
    throw error;
  }
}

// Frontend (Next.js)
try {
  const result = await authService.register(formData);
  router.push('/dashboard');
} catch (error) {
  if (error instanceof Error) {
    setError(error.message);
  }
}
```

## Folder Structure

### Complete Project Structure

```
soisi/
├── web/                      # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   ├── tests/
│   └── package.json
│
├── backend/                  # NestJS backend
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── bets/
│   │   ├── jury/
│   │   ├── wallet/
│   │   ├── common/
│   │   ├── prisma/
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── test/
│   └── package.json
│
├── mobile/                   # Expo app (future)
│   ├── app/
│   ├── components/
│   ├── services/
│   └── package.json
│
└── docs/
    ├── PRD.md
    ├── PLANNING.md
    ├── API.md
    └── DEPLOYMENT.md
```

## Environment Configuration

### Backend Environment Variables (.env)

```bash
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/soisi_db"

# Auth0
AUTH0_DOMAIN=dev-xxx.us.auth0.com
AUTH0_CLIENT_ID=xxx
AUTH0_CLIENT_SECRET=xxx
AUTH0_AUDIENCE=https://api.soisi.com

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Email (Future)
RESEND_API_KEY=xxx

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

### Frontend Environment Variables (.env.local)

```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:3001

# Auth0
NEXT_PUBLIC_AUTH0_DOMAIN=dev-xxx.us.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=xxx
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000/api/auth/callback
AUTH0_SECRET=xxx
AUTH0_BASE_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## API Design Patterns

### RESTful Endpoints Structure

```
# Authentication ✅ IMPLEMENTED
POST   /auth/register          # User registration ✅
POST   /auth/login            # User login ✅
GET    /auth/me               # Get current user ✅
POST   /auth/logout           # Logout ✅
POST   /auth/refresh          # Refresh token (future)
POST   /auth/verify-email     # Email verification (Sprint 3)
POST   /auth/forgot-password  # Password reset (future)

# Users
GET    /users/profile         # Get current user
PATCH  /users/profile         # Update profile
POST   /users/kyc             # Submit KYC documents
GET    /users/:id             # Get user by ID
GET    /users/:id/stats       # User statistics

# Bets
GET    /bets                  # List bets (with filters)
POST   /bets                  # Create bet
GET    /bets/:id             # Get bet details
POST   /bets/:id/accept      # Accept bet
POST   /bets/:id/evidence    # Upload evidence
POST   /bets/:id/complete    # Mark as complete
POST   /bets/:id/dispute     # Raise dispute

# Jury
GET    /jury/assignments     # Get jury assignments
POST   /jury/vote            # Submit jury vote
GET    /jury/history         # Jury participation history

# Wallet
GET    /wallet/balance       # Get coin balance
GET    /wallet/transactions  # Transaction history
POST   /wallet/transfer      # Transfer coins (future)
```

## Security Standards

### Authentication & Authorization

- JWT tokens with httpOnly cookies
- Refresh token rotation
- Role-based access (user, jury, admin)
- Auth0 integration for social logins
- 2FA support (future)

### Data Protection

- Input validation with class-validator
- SQL injection prevention via Prisma
- XSS protection headers
- CORS configuration
- Rate limiting per endpoint
- File upload validation

### Security Headers (NestJS)

```typescript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      },
    },
  })
);
```

## Performance Optimization

### Backend Optimization

- Database connection pooling
- Query optimization with Prisma
- Pagination on all list endpoints
- Caching with Redis (future)
- Image optimization via Cloudinary
- Lazy loading relations

### Frontend Optimization

- Static generation where possible
- Dynamic imports for code splitting
- Image optimization with next/image
- Font optimization
- API route caching
- Service worker (PWA future)

### Monitoring Metrics

- API response time < 200ms
- Page load time < 3s
- Core Web Vitals targets
- Error rate < 1%
- Uptime > 99.9%

## Testing Strategy

### Unit Testing

```yaml
Coverage targets:
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%
```

### Integration Testing

- Auth flow testing
- Bet lifecycle testing
- Jury system testing
- Wallet operations

### E2E Testing

- Registration → Login → Create bet → Complete bet
- Dispute resolution flow
- KYC verification flow

## Deployment Architecture

### Development

- Local PostgreSQL
- Local Next.js dev server
- NestJS with watch mode
- Mock Auth0 tenant

### Staging

- Railway PostgreSQL
- Vercel preview deployments
- Railway review apps
- Auth0 staging tenant

### Production

- Railway PostgreSQL with backups
- Vercel production
- Railway production
- Cloudflare CDN
- Sentry monitoring

### CI/CD Pipeline

```yaml
1. Push to GitHub
2. Run ESLint + Prettier
3. Run unit tests
4. Run integration tests
5. Build applications
6. Deploy to staging
7. Run E2E tests
8. Manual approval
9. Deploy to production
10. Smoke tests
```

## Scaling Strategy

### Phase 1 (MVP - 1K users)

- Single API server
- Basic PostgreSQL
- Vercel free tier
- Cloudinary free tier

### Phase 2 (10K users)

- Multiple API instances
- PostgreSQL with read replicas
- Redis caching layer
- CDN for all assets

### Phase 3 (100K+ users)

- Microservices architecture
- Database sharding
- Event-driven architecture
- Global CDN
- Multi-region deployment

---

## RECENT TECHNICAL DECISIONS

### Avatar System Migration (September 26, 2025)

**Decision:** Migrate from DiceBear API to Pravatar for user avatars

**Context:**
- DiceBear API (`api.dicebear.com`) experiencing SSL/Certificate connectivity issues
- Users seeing broken avatar images in Friends section (all 4 tabs)
- Error: `CRYPT_E_NO_REVOCATION_CHECK (0x80092012)` in local environment

**Technical Solution:**
```typescript
// Old implementation (problematic)
src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}

// New implementation (reliable)
src={`https://i.pravatar.cc/150?img=${getUserAvatarNumber(username)}`}

// Consistent mapping function
function getUserAvatarNumber(username: string): number {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = ((hash << 5) - hash + username.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash % 99) + 1;
}
```

**Components Affected:**
- `web/src/components/ui/HexagonAvatar.tsx` (main avatar component)
- `web/src/app/(protected)/friends/page.tsx` (4 avatar usage locations)
- `web/src/utils/avatar.ts` (new utility file)

**Configuration Updates:**
- Next.js `remotePatterns` already includes `i.pravatar.cc`
- No additional external dependencies required

**Fallback Strategy:**
1. Primary: Pravatar service (`i.pravatar.cc`)
2. Secondary: Local initials-based avatar generation
3. Tertiary: Default avatar placeholder

**Implementation Timeline:**
- User Story: US-001 (3 story points, P1 priority)
- Target Sprint: Monday 2025-09-30
- Estimated Duration: 4-6 hours

**Benefits:**
- More reliable external service (Pravatar vs DiceBear)
- Consistent avatar assignment per username
- Better offline fallback support
- Improved UX in social network features

---

**Document Status:**

- Created: September 9, 2025
- Last Updated: September 26, 2025
- Version: 1.2 (Avatar System Migration + System Analysis Update)
- Maintained by: Engineering Team
