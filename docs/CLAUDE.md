# CLAUDE.md - Soisi Development Framework Rules

## PROJECT OVERVIEW

This is **Soisi** - a P2P betting platform for videogames using virtual coins with community-driven validation.

### Repository Structure

- **backend/** - NestJS API server (Port 3001)
- **web/** - Next.js 14 frontend (Port 3000)
- **mobile/** - Expo mobile app (Future)

### Current Development Status

- ✅ User registration/login working
- ✅ Age verification (18+)
- ✅ Database models created
- 🚧 Dashboard page needed
- 🚧 Betting system in development
- 📋 Jury validation system planned

## MANDATORY RULES FOR CLAUDE CODE

### 🚀 START OF EACH SESSION

1. **Environment Check:**

   ```bash
   # Backend (Terminal 1)
   cd C:\dev\12s\backend
   npm run start:dev  # Should run on port 3001

   # Frontend (Terminal 2)
   cd C:\dev\12s\web
   npm run dev       # Should run on port 3000

   # Database
   # PostgreSQL should be running on port 5432
   ```

2. **Read Current Status:**

   - Check git status for uncommitted changes
   - Review last commits
   - Verify which sprint/task is active

3. **Announce Work Plan:**
   ```
   "Ready to work on Soisi.
   Current task: [Task description]
   Files to modify: [List files]
   Approach: [Brief plan]"
   ```

### 💻 DEVELOPMENT STANDARDS

#### Tech Stack (DO NOT DEVIATE)

```yaml
Frontend:
  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS + shadcn/ui
  - Zustand (state)
  - React Query (data fetching)

Backend:
  - NestJS with TypeScript
  - Prisma ORM
  - PostgreSQL
  - Auth0 (authentication)
  - bcrypt (password hashing)

Mobile (Future):
  - Expo SDK 50
  - TypeScript
  - NativeWind
```

#### File Naming Conventions

```typescript
// Frontend (Next.js)
Pages: src / app / [route] / page.tsx;
Components: src / components / BetCard.tsx(PascalCase);
Services: src / services / auth.service.ts;
Hooks: src / hooks / useBets.ts;
Types: src / types / User.types.ts;

// Backend (NestJS)
Modules: src / auth / auth.module.ts;
Controllers: src / auth / auth.controller.ts;
Services: src / auth / auth.service.ts;
DTOs: src / auth / dto / register.dto.ts;
```

#### API Response Format (ALWAYS USE THIS)

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}

// Error
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

### 📝 BEFORE WRITING CODE

1. **State Your Intent:**

   ```
   "Task: [What you're doing]
   File: [Path to file]
   Changes: [What will change]
   Impact: [What might break]"
   ```

2. **Check for Related Issues:**

   - Any existing errors in this file?
   - Previous attempts at this feature?
   - Dependencies that might conflict?

3. **Follow Soisi Business Rules:**
   - Users must be 18+ (enforced at registration)
   - Usernames must be unique
   - Coins are virtual (not real money)
   - 100 coins given after email verification
   - Bets require evidence upload
   - Jury validates disputed bets

### 🧪 AFTER WRITING CODE

1. **Test Immediately:**

   ```bash
   # Backend - Check endpoint
   curl http://localhost:3001/[endpoint]

   # Frontend - Check page
   http://localhost:3000/[route]
   ```

2. **Verify No Errors:**

   - Console clean?
   - Network requests successful?
   - Database operations working?

3. **Update Related Files:**
   - If API changes → Update frontend service
   - If model changes → Run Prisma migration
   - If route changes → Update navigation

### 🚫 FORBIDDEN ACTIONS

**NEVER:**

1. Use different tech stack than specified
2. Install packages without justification
3. Skip age verification checks
4. Store passwords in plain text
5. Use localStorage for sensitive data (use httpOnly cookies)
6. Create endpoints without authentication guards
7. Ignore TypeScript errors
8. Skip input validation
9. Use any instead of proper types
10. Commit .env files

**ALWAYS:**

1. Validate user input with DTOs
2. Hash passwords with bcrypt
3. Check user age is 18+
4. Use Prisma for database queries
5. Handle errors with try-catch
6. Return consistent API responses
7. Use TypeScript strict mode
8. Test endpoints with curl/Postman
9. Keep components small and focused
10. Follow the established folder structure

### 🎯 CURRENT SPRINT TASKS

#### Priority Order:

1. **P0 - Dashboard Page** (Current)

   - Create `/dashboard` route
   - Show user info
   - Display coin balance
   - Add logout button

2. **P1 - Login Implementation**

   - Backend `/auth/login` endpoint
   - JWT token generation
   - Cookie management
   - Protected route middleware

3. **P1 - Bet Creation**

   - Create bet form
   - Bet model in database
   - Upload evidence to Cloudinary
   - Escrow coins logic

4. **P2 - UI Improvements**
   - Replace alerts with toasts
   - Add loading spinners
   - Improve error messages

### 🔧 COMMON PATTERNS TO FOLLOW

#### Backend Endpoint Pattern (NestJS)

```typescript
@Post('register')
async register(@Body() dto: RegisterDto) {
  try {
    // Validate age
    const age = calculateAge(dto.birthDate);
    if (age < 18) {
      throw new BadRequestException('Must be 18 or older');
    }

    // Check unique constraints
    const exists = await this.prisma.user.findUnique({
      where: { username: dto.username }
    });
    if (exists) {
      throw new ConflictException('Username taken');
    }

    // Create user
    const user = await this.prisma.user.create({ ... });

    return {
      success: true,
      data: user,
      message: 'Registration successful'
    };
  } catch (error) {
    throw error; // NestJS handles the response
  }
}
```

#### Frontend Service Pattern (Next.js)

```typescript
class AuthService {
  private API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  async register(data: RegisterData) {
    const response = await fetch(`${this.API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // For cookies
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Registration failed");
    }

    return result.data;
  }
}
```

#### Component Pattern (Next.js)

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ComponentName() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // API call
      // Success handling
      router.push("/success-route");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <div className="container">{/* Component JSX */}</div>;
}
```

### 📊 DATABASE OPERATIONS

#### Prisma Best Practices

```typescript
// Always use Prisma service in NestJS
constructor(private prisma: PrismaService) {}

// Use select to limit data returned
const user = await this.prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    username: true,
    email: true,
    // Don't return sensitive data
  }
});

// Use transactions for multiple operations
const [user, wallet] = await this.prisma.$transaction([
  this.prisma.user.create({ ... }),
  this.prisma.wallet.create({ ... })
]);
```

### 🔒 SECURITY CHECKLIST

Before completing any task:

- [ ] Passwords hashed with bcrypt?
- [ ] Age verification enforced?
- [ ] Input validated with DTOs?
- [ ] SQL injection prevented (using Prisma)?
- [ ] XSS prevented (React handles this)?
- [ ] CORS configured correctly?
- [ ] Sensitive data in httpOnly cookies?
- [ ] Auth guards on protected routes?
- [ ] Rate limiting considered?
- [ ] Error messages don't leak info?

### 🚀 DEPLOYMENT READINESS

#### Environment Variables Required

```bash
# Backend (.env)
DATABASE_URL="postgresql://..."
AUTH0_DOMAIN="..."
AUTH0_CLIENT_ID="..."
AUTH0_CLIENT_SECRET="..."
JWT_SECRET="..."

# Frontend (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_AUTH0_DOMAIN="..."
AUTH0_SECRET="..."
```

#### Pre-deployment Checklist

- [ ] All TypeScript errors resolved
- [ ] Database migrations up to date
- [ ] Environment variables documented
- [ ] No console.log in production code
- [ ] API documentation updated
- [ ] Tests passing (if exists)

### 📈 PROGRESS TRACKING

After completing each task:

1. **Commit with proper message:**

   ```bash
   git add .
   git commit -m "feat(scope): description"
   # Examples:
   # feat(auth): add login endpoint
   # fix(bets): correct coin calculation
   # chore(deps): update packages
   ```

2. **Test the feature:**

   - Works as expected?
   - No new errors introduced?
   - Other features still working?

3. **Document if needed:**
   - Complex logic? Add comments
   - New endpoint? Update API docs
   - Breaking change? Note in commit

### 🆘 WHEN STUCK

1. **First 10 minutes:**

   - Read error message carefully
   - Check similar working code
   - Verify all services running
   - Check database connection

2. **After 10 minutes:**

   - Google the specific error
   - Check NestJS/Next.js docs
   - Try simpler approach
   - Break problem into smaller parts

3. **Still stuck:**
   - Document the blocker
   - Move to next task
   - Return with fresh perspective

### 🎯 CURRENT FOCUS

**Immediate Priority: Create Dashboard Page**

The user successfully registers and logs in but gets 404 on `/dashboard`. Need to create this page with:

- User welcome message
- Coin balance (0 for now)
- Logout functionality
- Basic navigation

**Remember:**

- Frontend runs on port 3002 (3000 in use)
- Backend runs on port 3001
- Use existing auth.service.ts
- Follow existing design patterns from login/register pages
- All pages use hexagon backgrounds and green (#B5FD1E) accent color
- Scrollbar-hide class implemented for clean scrolling

---

## QUALITY STANDARDS

**Your code is good when:**

- TypeScript has no errors
- API responses are consistent
- User can complete the flow
- Errors are handled gracefully
- Code follows project patterns
- Security is maintained
- Performance is acceptable

**Signs of success:**

- User can register → login → see dashboard
- No console errors
- Clean git status after commit
- Feature works as intended

---

_Follow these rules strictly. They ensure Soisi maintains high quality and security standards._
