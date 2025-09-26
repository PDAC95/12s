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

**CURRENT PRIORITY: Implementar US-001 - Sistema Avatares Confiables**

✅ **SISTEMA FUNCIONANDO CORRECTAMENTE** - Backend compila sin errores y está operativo.

**Situación Actual (2025-09-26):**
- Epic Friends & Rating System 100% completado y funcional ✅
- Backend: 0 errores TypeScript, corriendo en puerto 3005 ✅
- Frontend: Corriendo en puerto 3001, 19 páginas funcionales ✅
- Database: 10 usuarios de prueba con billeteras configuradas ✅
- Red social: Sistema completo de amigos operativo ✅

**Único Issue Identificado:**
- Avatares rotos en sección Friends por problemas SSL con api.dicebear.com
- Solución: Migrar a Pravatar (más confiable)

**Estado de Puertos Actualizados:**
- Frontend runs on port 3001 ✅ (corregido)
- Backend runs on port 3005 ✅ (operativo)
- Prisma Studio on port 5555 ✅
- PostgreSQL database operational ✅

**User Story Lista para Lunes:**
- US-001: Sistema Avatares Confiables (3 story points, P1)
- Migrar HexagonAvatar de DiceBear a Pravatar
- Implementar función getUserAvatarNumber() consistente
- Testing completo en 4 secciones de Friends

**NEXT SESSION START COMMAND:**
```
Implementar US-001: Migrar avatares de DiceBear a Pravatar siguiendo el plan técnico documentado en PLANNING.md y TASKS.md
```

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

## 🤖 MODEL CONTEXT PROTOCOL (MCP) SERVIDORES

### MCPs Instalados y Configurados

Los siguientes MCPs están configurados para potencializar el desarrollo de Soisi:

#### 1. **Context 7 MCP**
- **Propósito**: Documentación actualizada automática para bibliotecas
- **Paquete**: `@upstash/context7-mcp@latest`
- **Beneficio**: Obtiene documentación en tiempo real para Next.js 15, NestJS 11, Prisma, Auth0
- **Uso**: Escribe `use context7` en prompts para documentación actual

#### 2. **Playwright MCP**
- **Propósito**: Automatización de pruebas E2E del frontend
- **Paquete**: `@executeautomation/playwright-mcp-server`
- **Beneficio**: Testing automatizado de flujos de usuario, autenticación Auth0, formularios
- **Scripts configurados**: `npm run test:e2e`, `npm run test:e2e:ui`, `npm run playwright:install`

#### 3. **Database Management MCP**
- **Propósito**: Gestión directa de PostgreSQL/Prisma
- **Paquete**: `mcp-server-git`
- **Beneficio**: Consultas SQL optimizadas, análisis de migraciones, debugging de schema
- **Scripts configurados**: `npm run db:migrate`, `npm run db:studio`, `npm run db:reset`

#### 4. **API Testing MCP**
- **Propósito**: Testing de endpoints del backend NestJS
- **Paquete**: `dkmaker-mcp-rest-api`
- **Beneficio**: Testing automatizado de APIs REST, validación de respuestas, debugging
- **Variable requerida**: `REST_BASE_URL=http://localhost:3001`
- **Scripts configurados**: `npm run test:api`

#### 5. **Git Advanced MCP**
- **Propósito**: Automatización avanzada de Git workflows
- **Paquete**: `@cyanheads/git-mcp-server`
- **Beneficio**: Commits inteligentes, branching automático, merging, análisis de cambios
- **Funciones**: Manejo de ramas, tags, resolución de conflictos, historial inteligente

#### 6. **Puppeteer MCP**
- **Propósito**: Browser automation para testing y scraping
- **Paquete**: `puppeteer-mcp-server`
- **Beneficio**: Screenshots automatizados, interacción con navegador, JavaScript execution
- **Uso**: Testing visual, scraping de datos, automatización de formularios web

#### 7. **Browser Automation MCP** (Playwright moderno)
- **Propósito**: Automatización moderna de navegadores
- **Paquete**: `@executeautomation/mcp-playwright`
- **Beneficio**: Cross-browser support (Chrome, Firefox, WebKit), APIs modernas
- **Ventajas**: Más estable que Puppeteer, mejor para testing cross-browser

#### 8. **Chrome DevTools MCP** 🆕
- **Propósito**: Debugging en tiempo real de aplicaciones web
- **Paquete**: `chrome-devtools-mcp`
- **Beneficio**: Integración directa con Chrome DevTools Protocol
- **Características**:
  - Monitoreo de requests de red en tiempo real
  - Tracking de errores de consola
  - Análisis de métricas de performance
  - Inspección de objetos JavaScript
  - Gestión de storage y cookies
- **Ideal para**: Debugging de Soisi frontend/backend en desarrollo

### Configuración MCP

#### Archivo de configuración principal: `.mcp.json`
```json
{
  "servers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "description": "Context7 MCP server for up-to-date documentation and code examples"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "description": "Playwright MCP server for browser automation and E2E testing"
    },
    "database": {
      "command": "npx",
      "args": ["-y", "mcp-server-git"],
      "description": "Database management MCP server for PostgreSQL/Prisma operations"
    },
    "api-testing": {
      "command": "npx",
      "args": ["-y", "dkmaker-mcp-rest-api"],
      "description": "REST API testing MCP server for backend endpoint validation"
    },
    "git-advanced": {
      "command": "npx",
      "args": ["-y", "@cyanheads/git-mcp-server"],
      "description": "Advanced Git automation MCP server for repository management"
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "puppeteer-mcp-server"],
      "description": "Alternative Puppeteer MCP server for browser automation and web scraping"
    },
    "browser-automation": {
      "command": "npx",
      "args": ["-y", "@executeautomation/mcp-playwright"],
      "description": "Modern browser automation using Playwright with cross-browser support"
    },
    "chrome-devtools": {
      "command": "chrome-devtools-mcp",
      "description": "Chrome DevTools MCP server for real-time web debugging, network monitoring, and performance analysis"
    }
  }
}
```

#### Claude Code configuración: `.claude/settings.local.json`
- ✅ `enableAllProjectMcpServers: true` - Auto-aprueba todos los MCPs del proyecto
- ✅ Permisos añadidos para todos los paquetes MCP
- ✅ Permisos para scripts de testing y automatización

### Scripts Añadidos

#### Frontend (web/package.json)
```json
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:debug": "playwright test --debug",
  "playwright:install": "playwright install",
  "playwright:codegen": "playwright codegen"
}
```

#### Backend (backend/package.json)
```json
{
  "test:api": "jest --testMatch=\"**/*.api.spec.ts\"",
  "test:integration": "jest --testMatch=\"**/*.integration.spec.ts\"",
  "db:migrate": "npx prisma migrate dev",
  "db:generate": "npx prisma generate",
  "db:push": "npx prisma db push",
  "db:reset": "npx prisma migrate reset --force",
  "db:studio": "npx prisma studio",
  "db:seed": "ts-node prisma/seed.ts"
}
```

#### Root (package.json)
```json
{
  "test:web": "cd web && npm run test",
  "test:backend": "cd backend && npm run test",
  "test:all": "npm run test:backend && npm run test:web",
  "test:e2e": "cd web && npm run test:e2e",
  "test:api": "cd backend && npm run test:api",
  "dev:web": "cd web && npm run dev",
  "dev:backend": "cd backend && npm run start:dev",
  "build:web": "cd web && npm run build",
  "build:backend": "cd backend && npm run build",
  "lint:web": "cd web && npm run lint",
  "lint:backend": "cd backend && npm run lint",
  "lint:all": "npm run lint:backend && npm run lint:web",
  "db:migrate": "cd backend && npm run db:migrate",
  "db:studio": "cd backend && npm run db:studio"
}
```

### Casos de Uso Específicos para Soisi

#### 1. **Testing de Autenticación con Auth0**
```typescript
// Usar Playwright MCP para testing E2E de Auth0
// Automatizar: register → email verification → login → dashboard
```

#### 2. **Validación de APIs del Backend**
```typescript
// Usar API Testing MCP para validar endpoints:
// POST /auth/register, POST /auth/login, GET /users/profile
// Verificar respuestas consistentes y manejo de errores
```

#### 3. **Testing del Sistema de Apuestas**
```typescript
// Playwright para flujos completos:
// Crear apuesta → Subir evidencia → Validación por jurado
// Cross-browser testing en Chrome, Firefox, Safari
```

#### 4. **Optimización de Database Queries**
```typescript
// Database MCP para:
// Analizar queries lentas de Prisma
// Optimizar índices para el sistema de rating
// Debugging de relaciones User ↔ Bet ↔ Evidence
```

#### 5. **Git Workflows Automatizados**
```typescript
// Git Advanced MCP para:
// Commits automáticos por feature
// Branching estratégico (feature/bet-system)
// Merge automático con validaciones
```

#### 6. **Debugging en Tiempo Real con Chrome DevTools**
```typescript
// Chrome DevTools MCP para debugging de Soisi:
// Monitoreo de API calls a backend (3001)
// Debugging de autenticación Auth0/JWT
// Análisis de performance en carga de feed
// Tracking de errores JavaScript en betting system
// Inspección de WebSocket connections (futuro)
// Análisis de storage de tokens y user data
```

### Variables de Entorno Requeridas

Añadir al `.env` correspondiente:

```bash
# Para API Testing MCP
REST_BASE_URL=http://localhost:3001

# Para Context7 (opcional, mejores rate limits)
CONTEXT7_API_KEY=your_api_key_from_context7.com
```

### Comandos de Verificación

```bash
# Verificar MCPs funcionando
npx @upstash/context7-mcp@latest --help
npx @executeautomation/playwright-mcp-server --help
npx @cyanheads/git-mcp-server --help
npx dkmaker-mcp-rest-api --help  # Requiere REST_BASE_URL
npx puppeteer-mcp-server --help

# Testing rápido
npm run test:all          # Todos los tests
npm run test:e2e         # E2E del frontend
npm run test:api         # APIs del backend
npm run lint:all         # Linting completo
```

### Beneficios Directos para Soisi

1. **Desarrollo más rápido**: Context7 proporciona documentación actualizada de Next.js 15, NestJS 11
2. **Testing automatizado**: Playwright cubre flujos críticos de Auth0 y sistema de apuestas
3. **APIs robustas**: Testing automático de endpoints del backend con validación de respuestas
4. **Base de datos optimizada**: Análisis y optimización de queries de Prisma
5. **Git inteligente**: Automatización de workflows de desarrollo y deployment
6. **Cross-browser**: Testing en múltiples navegadores para mejor UX

Los MCPs están listos para usar. Claude Code los cargará automáticamente cuando sean necesarios.

---

_Follow these rules strictly. They ensure Soisi maintains high quality and security standards._
