# Soisi - P2P Betting Platform

## 🎯 Project Overview

Soisi is a peer-to-peer betting platform for video games using virtual coins with community-driven validation. Built as a social network where gamers can challenge friends, create bets, and build reputation through fair play.

## 🚀 Quick Start

### Prerequisites

- Node.js 20 LTS
- PostgreSQL 15+
- Git

### Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-org/soisi.git
cd soisi

# Backend setup
cd backend
npm install
npx prisma generate
npx prisma migrate dev

# Frontend setup
cd ../web
npm install

# Environment setup (copy and configure)
cp backend/.env.example backend/.env
cp web/.env.local.example web/.env.local
```

### Development Commands

```bash
# Start all services (run in separate terminals)

# Terminal 1: Database Studio
cd backend && npx prisma studio
# → Opens on http://localhost:5555

# Terminal 2: Backend API
cd backend && npm run start:dev
# → Runs on http://localhost:3005

# Terminal 3: Frontend
cd web && npm run dev
# → Runs on http://localhost:3001
```

### Verification

```bash
# Test backend
curl http://localhost:3005

# Test frontend
open http://localhost:3001

# Test database
open http://localhost:5555
```

## 📁 Project Structure

```
soisi/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── auth/           # JWT Authentication
│   │   ├── users/          # User management
│   │   ├── bets/           # Betting system
│   │   ├── friends/        # Social network
│   │   └── modules/        # Additional modules
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # DB migrations
│   └── package.json
│
├── web/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── (public)/  # Public routes
│   │   │   └── (protected)/ # Protected routes
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   └── utils/         # Utilities
│   └── package.json
│
└── docs/                  # Project Documentation
    ├── PROGRESS.md        # Development progress
    ├── TASKS.md           # Task management
    ├── PLANNING.md        # Technical architecture
    └── ERRORS.md          # Error documentation
```

## 🛠️ Technology Stack

### Backend
- **Framework:** NestJS 10
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** JWT with httpOnly cookies
- **Language:** TypeScript

### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** Tailwind CSS + shadcn/ui
- **State:** Zustand + React Query
- **Language:** TypeScript

## 🗄️ Database

### Current Users (Test Data)
- 10 test users with virtual wallets
- Users: `gamerking`, `challenger`, `competitive`, etc.
- Each user has coins, reputation, and social connections

### Key Models
- **User**: Authentication and profile
- **Wallet**: Virtual coin management
- **Bet**: P2P betting system
- **Friendship**: Social network relationships
- **Evidence**: Bet validation system

## 🔑 Environment Variables

### Backend (.env)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/soisi"
JWT_SECRET="your-jwt-secret"
PORT=3005
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL="http://localhost:3005"
```

## 📋 Available Features

### ✅ Implemented
- User registration & JWT authentication
- Social network (friends, search, requests)
- Betting system foundation
- Virtual wallet management
- User reputation system
- Protected routes & middleware

### 🚧 In Progress
- US-001: Avatar system migration (DiceBear → Pravatar)

### 📋 Planned
- Evidence upload for bets
- Jury validation system
- Tournament framework

## 🧪 Testing

### Test the System
```bash
# 1. Register new user
curl -X POST http://localhost:3005/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123","birthDate":"1990-01-01"}'

# 2. Login
curl -X POST http://localhost:3005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# 3. View users
curl http://localhost:3005/debug/users
```

### Frontend Testing
1. Open http://localhost:3001
2. Register → Login → Navigate to Friends
3. Test: search users, send friend requests
4. Test: create bets, view feed

## 🎮 System Status

**Current State (2025-09-26):**
- ✅ Backend: 0 TypeScript errors, fully operational
- ✅ Frontend: 19 pages functional, responsive design
- ✅ Database: 10 test users, relationships working
- ✅ Authentication: JWT system complete
- ✅ Social Network: Friends system operational
- ⚠️ Known issue: Avatar images broken (fix scheduled)

## 📊 Metrics

- **Backend Controllers:** 6 (Auth, Users, Bets, Friends, Debug, App)
- **Frontend Pages:** 19 (Login, Register, Feed, Friends, Bets, etc.)
- **Database Tables:** 8 main models with relationships
- **API Endpoints:** 20+ RESTful endpoints
- **Test Users:** 10 with virtual wallets

## 🐛 Known Issues

1. **Avatar Images Broken** (Priority: P1)
   - Cause: SSL/Certificate issues with DiceBear API
   - Fix: Migrate to Pravatar (US-001 scheduled)
   - Files affected: `HexagonAvatar.tsx`, `friends/page.tsx`

## 🔄 Development Workflow

### Daily Workflow
1. Pull latest changes
2. Start services (Database → Backend → Frontend)
3. Check Prisma Studio for data verification
4. Test endpoints with curl
5. Frontend testing in browser

### Code Standards
- TypeScript strict mode
- Consistent API response format
- JWT authentication required
- Form validation with zod
- Responsive design required

## 🚀 Deployment

### Ports Configuration
- **Frontend:** 3001 (Next.js)
- **Backend:** 3005 (NestJS)
- **Database Studio:** 5555 (Prisma)
- **PostgreSQL:** 5432 (Database)

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] JWT secrets generated
- [ ] CORS configured for production
- [ ] SSL certificates installed

## 📞 Support

### Documentation
- **Progress:** `docs/PROGRESS.md`
- **Tasks:** `docs/TASKS.md`
- **Architecture:** `docs/PLANNING.md`
- **Errors:** `docs/ERRORS.md`

### Getting Help
1. Check documentation in `/docs`
2. Review error logs in ERRORS.md
3. Verify service status (ports 3001, 3005, 5555)
4. Check database connection via Prisma Studio

---

**Last Updated:** September 26, 2025
**Version:** 1.0 (Social Network MVP)
**Status:** Development - Ready for Avatar Migration
**Next Sprint:** US-001 Avatar System Migration