# ERROR LOG - Soisi P2P Betting Platform

## HOW TO DOCUMENT ERRORS

Each error entry must include:

1. **Date & Time** when error occurred
2. **File & Line** where error happened
3. **Error Message** complete and exact
4. **Context** what was being attempted
5. **Stack Trace** if applicable
6. **Solution Attempts** what was tried
7. **Resolution** final solution or current status

---

## 🔴 CRITICAL ERRORS (Blockers)

Errors that completely prevent development or break the system

### Active Critical Errors:

None currently active.

---

## 🟡 ACTIVE ERRORS (Non-Critical)

Errors that don't block development but need fixing

### Active Non-Critical Errors:

- [ ] [2025-09-26 16:30] **Avatares rotos en sección Friends** - DiceBear API SSL/Certificate issues
  - **File:** web/src/components/ui/HexagonAvatar.tsx:54, web/src/app/(protected)/friends/page.tsx:193,248,296,345
  - **Error:** Images broken/not loading from `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
  - **Context:** Users viewing Friends section (all 4 tabs: Friends list, Search, Received, Sent) see broken avatar images
  - **Root Cause:** SSL/Certificate connectivity issues with DiceBear API
  - **Evidence:**
    ```bash
    curl: (35) schannel: next InitializeSecurityContext failed: CRYPT_E_NO_REVOCATION_CHECK (0x80092012)
    - The revocation function was unable to check revocation for the certificate.
    ```
  - **Impact:** Poor UX in social network functionality, users cannot visually identify other players
  - **Attempted:**
    1. Verified Next.js remotePatterns configuration includes `api.dicebear.com` ✅
    2. Tested DiceBear API with WebFetch - API works correctly ✅
    3. Confirmed HexagonAvatar component structure is correct ✅
    4. Identified local environment SSL/Certificate validation issues ✅
  - **Status:** IDENTIFIED - User Story US-001 created for resolution
  - **Solution Planned:**
    1. Migrate from DiceBear (`api.dicebear.com`) to Pravatar (`i.pravatar.cc`)
    2. Implement consistent username→avatar number mapping function
    3. Add robust fallback mechanism for offline scenarios
    4. Comprehensive testing across all Friends sections
  - **Sprint:** Monday 2025-09-30 (3 story points, P1 priority)

- [x] [2025-09-18 18:30] React Hydration mismatch in ChallengeCard time display
  - **File:** src/components/feed/ChallengeCard.tsx:156
  - **Error:** "Hydration failed because the server rendered text didn't match the client"
  - **Context:** Time remaining display showing different values on server vs client (e.g., "22h 59m" vs "22h 53m")
  - **Stack:**
    ```
    at span (<anonymous>:null:null)
    at ChallengeCard (src/components/feed/ChallengeCard.tsx:156:17)
    at MixedFeedContainer (src/components/feed/MixedFeedContainer.tsx:202:17)
    at FeedPage (src/app/(protected)/feed/page.tsx:51:7)
    ```
  - **Attempted:**
    1. Identified formatTimeRemaining() function using Date.now() causing different calculations on server vs client
    2. Moved time calculation to client-side using useEffect
  - **Status:** RESOLVED
  - **Solution:**
    1. Added useState for timeRemaining with initial "Loading..." state
    2. Created useEffect that runs only on client-side to calculate time
    3. Added interval to update time every minute
    4. Replaced direct formatTimeRemaining() call with timeRemaining state
    5. Hydration mismatch eliminated by ensuring server renders stable content

- [x] [2025-09-16 20:30] Missing UI components causing build errors

  - **File:** web/src/app/(protected)/my-bets/page.tsx:8 & web/src/app/(protected)/bets-pool/page.tsx
  - **Error:** "Module not found: Can't resolve '@/components/ui/badge'" (and similar for select, tabs)
  - **Context:** Created new pages that use shadcn/ui components not yet installed in project
  - **Stack:**
    ```
    Module not found: Can't resolve '@/components/ui/badge'
       6 | import { Button } from '@/components/ui/button';
       7 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    >  8 | import { Badge } from '@/components/ui/badge';
         | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ```
  - **Attempted:**
    1. Checked existing UI components in project ✅
    2. Identified missing: Badge, Select, Tabs components ✅
    3. Checked for sonner toast library ✅
  - **Status:** RESOLVED
  - **Solution:**
    1. Created Badge component: `web/src/components/ui/badge.tsx`
    2. Created Select component: `web/src/components/ui/select.tsx`
    3. Created Tabs component: `web/src/components/ui/tabs.tsx`
    4. Created Button component: `web/src/components/ui/button.tsx`
    5. Created Card component: `web/src/components/ui/card.tsx`
    6. Created Input component: `web/src/components/ui/input.tsx`
    7. Installed missing dependencies: `npm install sonner @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-slot class-variance-authority`
    8. All components now available and build errors resolved

- [x] [2025-09-16 19:45] User login still failing with "Invalid email or password" from frontend

  - **File:** web/src/services/auth.service.ts:59 & web/src/contexts/AuthContext.tsx:56
  - **Error:** "Invalid email or password" - Frontend cannot authenticate despite backend working
  - **Context:** User attempting to login with test@test.com / password123
  - **Stack:**
    ```
    Error: Invalid email or password
    at AuthService.login (src/services/auth.service.ts:59:17)
    at async login (src/contexts/AuthContext.tsx:56:22)
    at async handleSubmit (src/app/(public)/login/page.tsx:59:23)
    ```
  - **Attempted:**
    1. Verified backend is running on port 3001 ✅
    2. Created user test@test.com with password123 ✅
    3. Verified login via curl works perfectly - returns JWT token ✅
    4. User has 1000 coins ✅
    5. Backend authentication 100% functional ✅
    6. Added debugging logs to auth service ✅
    7. CORS properly configured with credentials: true ✅
    8. Frontend API_URL correctly set to http://localhost:3001 ✅
  - **Status:** RESOLVED
  - **Solution:** Issue resolved automatically after system verification. All components working properly:
    - Backend authentication functional via curl
    - Frontend-backend communication working
    - CORS properly configured
    - User authentication now successful from frontend
    - Challenge creation working properly

- [ ] [2025-09-16 16:45] Insufficient coins error when creating challenge

  - **File:** web/src/app/(protected)/challenge/create/page.tsx:340 & src/lib/api/bets.ts:69
  - **Error:** "Insufficient coins to create this bet" - Mock wallet had only 234 coins
  - **Context:** User attempting to create challenge with bet amount higher than available balance
  - **Stack:**
    ```
    Error: "Insufficient coins to create this bet"
    at BetsApi.createBet (src/lib/api/bets.ts:88:15)
    at async handleSubmit (src/app/(protected)/challenge/create/page.tsx:356:24)
    ```
  - **Attempted:**
    1. Identified mock wallet only had 234 coins
    2. User trying to bet more than available balance
    3. Error handling was showing double error messages
  - **Status:** RESOLVED
  - **Solution:**
    1. Increased mock wallet balance from 234 to 1000 coins
    2. Updated all references (play page, wallet fallback, challenge creation)
    3. Improved error handling with more descriptive messages
    4. Added validation for positive bet amounts

- [ ] [2025-09-09 10:30] Registration success shows as browser alert

  - **File:** web/src/app/register/page.tsx:150
  - **Error:** Using `alert()` instead of proper UI notification
  - **Context:** After successful registration
  - **Stack:** N/A - Design issue
  - **Attempted:**
    1. Looked for toast component (doesn't exist yet)
  - **Status:** ACTIVE
  - **Solution:** Implement toast notification system

- [ ] [2025-09-09 11:00] No loading spinner during API calls

  - **File:** web/src/app/register/page.tsx
  - **Error:** Button shows "Creating account..." but no visual spinner
  - **Context:** During registration submission
  - **Stack:** N/A - UX issue
  - **Attempted:**
    1. Text change implemented
    2. Visual spinner pending
  - **Status:** ACTIVE
  - **Solution:** Create and implement loading spinner component

- [ ] [2025-09-09 14:30] JWT not fully implemented with Auth0
  - **File:** backend/src/auth/auth.service.ts
  - **Error:** Using temporary auth0Id instead of real Auth0 integration
  - **Context:** User registration creates temp ID
  - **Stack:** N/A - Implementation incomplete
  - **Attempted:**
    1. Basic user creation works
    2. Auth0 Management API pending
  - **Status:** ACTIVE
  - **Solution:** Implement Auth0 Management API integration

---

## 🟢 RESOLVED ERRORS (Reference)

Keep for future reference when similar issues occur

### Recently Resolved:

- [x] [2025-09-12 13:15] Registration error showing as 500 instead of proper validation
  - **File:** web/src/app/(public)/register/page.tsx:218
  - **Error:** Field name mismatch between frontend form and API call
  - **Context:** Frontend form used 'dateOfBirth' but API call sent 'birthDate'
  - **Stack:** No stack trace - logical error
  - **Attempted:**
    1. Checked backend logs (none found)
    2. Tested API endpoint directly with curl
    3. Verified frontend error handling
  - **Status:** RESOLVED
  - **Solution:** Changed API call to use 'formData.dateOfBirth' instead of 'formData.birthDate'

- [x] [2025-09-09 13:45] Dashboard page returns 404 after successful login
  - **File:** Renamed dashboard to feed, updated all references
  - **Error:** "404 - This page could not be found" 
  - **Context:** User successfully logs in and gets redirected to /dashboard
  - **Stack:** N/A - Page doesn't exist
  - **Attempted:**
    1. Created feed page as main dashboard
    2. Updated all navigation references
  - **Status:** RESOLVED
  - **Solution:** Created comprehensive feed system with BetCard and Stories components

### Previously Resolved:

- [x] [2025-09-09 13:00] Port 3001 already in use

  - **File:** backend/src/main.ts:22
  - **Error:** "Error: listen EADDRINUSE: address already in use :::3001"
  - **Context:** Starting backend server
  - **Stack:**
    ```
    Error: listen EADDRINUSE: address already in use :::3001
    at Server.setupListenHandle [as _listen2] (node:net:1939:16)
    ```
  - **Attempted:**
    1. Checked for running processes
    2. Used netstat to find PID
  - **Status:** RESOLVED
  - **Solution:** Kill process using `taskkill /PID [process_id] /F`

- [x] [2025-09-09 14:00] Import path error for auth service

  - **File:** web/src/app/register/page.tsx:8
  - **Error:** "Module not found: Can't resolve '../../services/auth.service'"
  - **Context:** Importing auth service in register page
  - **Stack:** Build error
  - **Attempted:**
    1. Checked relative path
    2. Counted directory levels
  - **Status:** RESOLVED
  - **Solution:** Changed path to `../../../services/auth.service`

- [x] [2025-09-09 10:00] Password validation errors showing as JSON

  - **File:** web/src/app/register/page.tsx:88
  - **Error:** Error displayed as JSON object instead of message
  - **Context:** Form validation errors
  - **Stack:** N/A - Display issue
  - **Attempted:**
    1. Added optional chaining
    2. Extracted message property
  - **Status:** RESOLVED
  - **Solution:** Use `error?.fieldError?.message` instead of full error object

- [x] [2025-09-09 12:00] Database connection error during migration
  - **File:** backend/prisma/schema.prisma
  - **Error:** "Foreign key constraints preventing migration"
  - **Context:** Running prisma migrate dev
  - **Stack:** Prisma migration error
  - **Attempted:**
    1. Checked existing tables
    2. Reviewed foreign keys
  - **Status:** RESOLVED
  - **Solution:** Used `prisma migrate reset --force` to rebuild database

- [x] [2025-09-10 14:40] Module not found after renaming folder structure
  - **File:** Multiple files referencing old dashboard path
  - **Error:** "Module not found: Can't resolve './page.tsx'" and "Can't resolve dashboard"
  - **Context:** Renamed dashboard folder to feed but forgot to update all references
  - **Stack:** Next.js build error
  - **Attempted:**
    1. Renamed folder from dashboard to feed
    2. Updated login redirect
    3. Searched for remaining references
  - **Status:** RESOLVED
  - **Solution:** Updated all references in middleware.ts, Navbar.tsx, and Sidebar.tsx from '/dashboard' to '/feed'

- [x] [2025-09-10 15:40] React Hydration mismatch error in HexagonAvatar component
  - **File:** src/components/ui/HexagonAvatar.tsx:58
  - **Error:** "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties"
  - **Context:** Using Math.random() to generate clipPath ID causing different IDs on server vs client
  - **Stack:** React hydration error at clipPath element
  - **Attempted:**
    1. Checked for conditional rendering
    2. Identified random ID generation as cause
    3. Reviewed React hydration documentation
  - **Status:** RESOLVED
  - **Solution:** Replaced `Math.random()` with React's `useId()` hook for consistent server/client IDs

- [x] [2025-09-10 17:00] Next.js Image unconfigured host error for external domain
  - **File:** src/components/layout/Header.tsx:21
  - **Error:** "Invalid src prop (https://i.pravatar.cc/150?img=3) on `next/image`, hostname 'i.pravatar.cc' is not configured under images"
  - **Context:** Using external image domain for test avatar without configuring it in next.config.ts
  - **Stack:** Next.js Image component validation error
  - **Attempted:**
    1. Located next.config.ts file 
    2. Checked existing remotePatterns configuration
    3. Added i.pravatar.cc to allowed domains
  - **Status:** RESOLVED
  - **Solution:** Added `i.pravatar.cc` domain to remotePatterns in next.config.ts and restarted dev server

---

## ⚠️ PROBLEMATIC PATTERNS

Recurring issues and their solutions

### Pattern: Missing Error Handling in Frontend

**Problem:** API errors crash the app or show poor UX
**Solution:** Always wrap API calls in try-catch with user-friendly messages

```typescript
try {
  const result = await authService.register(data);
  // Success handling
} catch (error) {
  if (error instanceof Error) {
    setError(error.message); // User-friendly message
  } else {
    setError("An unexpected error occurred");
  }
}
```

### Pattern: Port Conflicts on Development

**Problem:** Multiple instances of backend running
**Solution:** Check and kill existing processes before starting

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [process_id] /F

# Linux/Mac
lsof -i :3001
kill -9 [process_id]
```

### Pattern: Prisma Client Generation Issues

**Problem:** Prisma client not found after schema changes
**Solution:** Always run generate after schema changes

```bash
npx prisma generate
npx prisma migrate dev
```

### Pattern: CORS Issues Between Frontend and Backend

**Problem:** Frontend can't reach backend API
**Solution:** Ensure CORS is properly configured

```typescript
// backend/src/main.ts
app.enableCors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

### Pattern: Environment Variables Not Loading

**Problem:** undefined environment variables
**Solution:** Check .env file location and naming

```typescript
// Frontend: .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001

// Backend: .env
DATABASE_URL=postgresql://...
```

### Pattern: Folder/Route Rename Breaking References

**Problem:** After renaming folders, build fails with "Module not found" errors
**Solution:** Always search and update ALL references after folder renames

```bash
# Step 1: Rename folder
mv dashboard feed

# Step 2: Search for ALL references (CRITICAL STEP)
grep -r "dashboard" src/
grep -r "/dashboard" src/

# Step 3: Update ALL found references
# Common files to check:
# - middleware.ts (route matchers)  
# - Navigation components (Navbar, Sidebar)
# - Any hardcoded links or redirects
# - Import statements
```

**Files commonly missed:**
- `middleware.ts` - route protection patterns
- `Navbar.tsx` - navigation links  
- `Sidebar.tsx` - menu items
- API route references
- Redirect configurations

### Pattern: React Hydration Mismatches with Dynamic IDs

**Problem:** Server and client render different content due to random values
**Solution:** Always use stable, deterministic values in SSR components

```typescript
// ❌ BAD - Causes hydration mismatch
const clipPathId = `clip-${Math.random().toString(36).substr(2, 9)}`;

// ✅ GOOD - Consistent server/client IDs  
import { useId } from 'react';
const clipPathId = useId();
```

**Common causes:**
- `Math.random()` for generating IDs
- `Date.now()` for timestamps  
- `new Date()` without fixed timezone
- Browser-specific APIs in components
- Conditional rendering based on `typeof window`

**Prevention:**
- Use React's `useId()` hook for unique IDs
- Use `useState()` with lazy initialization for client-only values
- Move client-specific code to `useEffect()`
- Test components in both server and client environments

### Pattern: Missing UI Components in shadcn/ui Setup

**Problem:** Importing UI components that don't exist yet in the project
**Solution:** Always verify component exists before importing, or create/install it

```bash
# Check if component exists
ls src/components/ui/[component-name].tsx

# If missing, install via shadcn CLI (preferred)
npx shadcn-ui@latest add [component-name]

# Or create manually with proper structure
```

**Common missing components:**
- `Button` - Basic buttons (most common)
- `Card` - Content containers
- `Input` - Form inputs
- `Badge` - Status indicators
- `Select` - Dropdown menus
- `Tabs` - Tabbed interfaces
- `Dialog` - Modal dialogs
- `Toast/Sonner` - Notifications

**Prevention:**
- Check existing components before creating new pages
- Install shadcn components as needed
- Use consistent import patterns
- Test build after adding new components

### Pattern: Next.js Image External Domain Configuration

**Problem:** Using external image domains without configuring them in next.config.ts
**Solution:** Always configure external domains in remotePatterns

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
      // Add other domains as needed
    ],
  },
};
```

**Common external domains:**
- `i.pravatar.cc` - Avatar generator
- `res.cloudinary.com` - Cloudinary CDN
- `images.unsplash.com` - Unsplash images
- `via.placeholder.com` - Placeholder images

**Prevention:**
- Configure domains before using external images
- Use domain wildcards (`/**`) for flexibility
- Restart dev server after config changes
- Test with actual image URLs, not localhost

---

## 📚 LESSONS LEARNED

### Database Issues

- Always backup before running `migrate reset`
- Use transactions for multiple related operations
- Index frequently queried fields (username, email)
- Handle unique constraint violations gracefully

### Authentication Issues

- Store JWT in httpOnly cookies, not localStorage
- Always hash passwords with bcrypt (minimum 10 rounds)
- Validate age (18+) before allowing registration
- Check username uniqueness before attempting insert

### Frontend Issues

- Next.js App Router requires 'use client' for interactive components
- Import paths are relative to file location
- Form validation should happen before API call
- Always provide loading states for better UX

### Backend Issues

- NestJS services need proper dependency injection
- DTOs should validate all input
- Always return consistent response format
- Use proper HTTP status codes (409 for conflicts)

---

## 🔧 COMMON SOLUTION SNIPPETS

### Soisi-Specific: Age Validation

```typescript
// Validate user is 18+
const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

if (calculateAge(birthDate) < 18) {
  throw new BadRequestException("You must be 18 or older to register");
}
```

### Soisi-Specific: Username Uniqueness Check

```typescript
// Check if username is already taken
const existingUser = await this.prisma.user.findUnique({
  where: { username: dto.username },
});

if (existingUser) {
  throw new ConflictException("Username already taken");
}
```

### Soisi-Specific: Consistent API Response

```typescript
// Success response
return {
  success: true,
  data: result,
  message: "Operation successful",
};

// Error response (in exception filter)
return {
  success: false,
  error: {
    message: exception.message,
    code: "ERROR_CODE",
    statusCode: exception.getStatus(),
  },
};
```

### Soisi-Specific: Protected Route Pattern

```typescript
// Frontend route protection
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = document.cookie.includes("token=");
      if (!token) {
        router.push("/login");
      }
    };
    checkAuth();
  }, []);

  // Component JSX
}
```

---

## 🚨 FRAMEWORK-SPECIFIC ERRORS

### Next.js Errors

- **Module not found**: Check relative import paths
- **Hydration mismatch**: Ensure server and client render same content
- **'use client' missing**: Add directive for interactive components

### NestJS Errors

- **Dependency injection**: Ensure services are provided in module
- **CORS blocked**: Configure CORS in main.ts
- **Validation pipe**: Install and configure class-validator

### Prisma Errors

- **P2002**: Unique constraint violation
- **P2025**: Record not found
- **Migration failed**: Check foreign key constraints

### PostgreSQL Errors

- **ECONNREFUSED**: Database not running
- **Authentication failed**: Check DATABASE_URL
- **Permission denied**: Check user privileges

---

## 📊 ERROR LOG HISTORY

### Week of 2025-09-09

- Total errors encountered: 8
- Critical errors: 1 (dashboard 404)
- Resolved: 4
- Still active: 4

### Error Categories:

- Configuration: 2
- UI/UX: 2
- Database: 2
- Integration: 2

---

## 🔍 DEBUGGING CHECKLIST

When encountering a new error:

1. **Immediate Actions:**

   - [ ] Copy exact error message
   - [ ] Note file and line number
   - [ ] Check if both servers running (3000, 3001)
   - [ ] Verify PostgreSQL is running
   - [ ] Check browser console and network tab

2. **Investigation:**

   - [ ] Search this file for similar errors
   - [ ] Check recent git changes
   - [ ] Verify npm packages installed
   - [ ] Check .env variables loaded
   - [ ] Review TypeScript errors

3. **Documentation:**
   - [ ] Add error to appropriate section
   - [ ] Include full error message
   - [ ] Document all attempts
   - [ ] Update status when resolved
   - [ ] Add to patterns if recurring

---

**Last Updated:** 2025-09-10 17:05  
**Total Documented Errors:** 11  
**Resolution Rate:** 64%  
**Most Common Issue:** Configuration/Path/Reference/Hydration/External Domain errors
