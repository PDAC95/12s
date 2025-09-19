# 🧪 Guía de Pruebas - Plataforma Soisi

## 🔗 URLs Principales
- **API Documentation**: http://localhost:3005/api
- **Backend API**: http://localhost:3005
- **Frontend**: http://localhost:3002

## 📊 Endpoints Disponibles para Probar

### 1. 👥 Sistema de Usuarios
```bash
# Obtener todos los usuarios
curl http://localhost:3005/users

# Obtener usuario específico
curl http://localhost:3005/users/44ec8104-8836-4ad5-b5cd-d4e9c2be4573
```

### 2. 🎮 Sistema de Apuestas
```bash
# Obtener todas las apuestas
curl http://localhost:3005/bets

# Obtener categorías de apuestas
curl http://localhost:3005/bets/my-bets/categories

# Obtener feed personal
curl http://localhost:3005/bets/feed/personal-public
```

### 3. 🏆 Sistema de Rankings
```bash
# Obtener leaderboard
curl http://localhost:3005/rating/leaderboard

# Obtener niveles de habilidad
curl http://localhost:3005/rating/skill-levels

# Verificar si dos usuarios pueden competir
curl http://localhost:3005/rating/can-compete/44ec8104-8836-4ad5-b5cd-d4e9c2be4573/781c93f3-d054-4238-aae7-5f66d134c839
```

### 4. 🏟️ Sistema de Torneos
```bash
# Obtener torneos
curl http://localhost:3005/tournaments

# Obtener formatos de torneos
curl http://localhost:3005/tournaments/formats

# Obtener estadísticas de torneos
curl http://localhost:3005/tournaments/stats
```

### 5. 📊 Sistema de Analíticas
```bash
# Dashboard de analíticas
curl http://localhost:3005/analytics/platform

# Métricas en tiempo real
curl http://localhost:3005/analytics/realtime

# Analíticas de crecimiento
curl http://localhost:3005/analytics/growth
```

### 6. 🔔 Sistema de Notificaciones
```bash
# Obtener notificaciones
curl http://localhost:3005/notifications

# Contar notificaciones no leídas
curl http://localhost:3005/notifications/unread-count

# Obtener configuración de notificaciones
curl http://localhost:3005/notifications/settings
```

### 7. ⚡ Sistema de Performance
```bash
# Métricas de rendimiento
curl http://localhost:3005/performance/metrics

# Estado de salud del sistema
curl http://localhost:3005/performance/health

# Estadísticas de caché
curl http://localhost:3005/performance/cache/stats

# Uso de memoria
curl http://localhost:3005/performance/memory
```

### 8. 🛠️ Debug y Utilidades
```bash
# Ver usuarios para debug
curl http://localhost:3005/debug/users

# Ver apuestas para debug
curl http://localhost:3005/debug/bets
```

## 🖥️ Cómo Probar en el Frontend

### Abrir la aplicación web:
```bash
cd C:\dev\12s\web
npm run dev
```

### Luego visitar:
- http://localhost:3002/feed - Feed de apuestas
- http://localhost:3002/profile - Perfil de usuario
- http://localhost:3002/play - Crear apuestas
- http://localhost:3002/challenge-friend - Retar amigos
- http://localhost:3002/bets/create - Crear nueva apuesta

## 🔐 Autenticación para Pruebas

Para endpoints que requieren autenticación, puedes:

1. **Usar Swagger UI**: http://localhost:3005/api
2. **Crear un token de prueba** o usar los usuarios existentes
3. **Usar headers de autorización** en las peticiones

## 💾 Base de Datos

Los datos están persistidos en PostgreSQL con Prisma. Usuarios existentes:
- testuser@example.com
- bettest@test.com
- admin@test.com
- test@test.com
- fresh@test.com

## ✅ Verificaciones Rápidas

1. **Backend funcionando**: `curl http://localhost:3005`
2. **API docs disponibles**: http://localhost:3005/api
3. **Usuarios cargados**: `curl http://localhost:3005/users`
4. **Sistema de apuestas**: `curl http://localhost:3005/bets`
5. **Rankings funcionando**: `curl http://localhost:3005/rating/leaderboard`

## 🎯 Casos de Uso Completos para Probar

### Crear una Apuesta
1. Ve a http://localhost:3002/play
2. Llena el formulario de nueva apuesta
3. Confirma la creación

### Ver Feed de Apuestas
1. Ve a http://localhost:3002/feed
2. Explora las apuestas disponibles
3. Acepta o rechaza apuestas

### Verificar Rankings
1. Ve a http://localhost:3005/rating/leaderboard
2. Verifica las posiciones de los usuarios

### Probar Notificaciones
1. Ve a http://localhost:3005/notifications
2. Verifica el conteo de no leídas

## 🚀 Todo está funcionando correctamente si:

✅ El backend responde en puerto 3005
✅ Swagger docs cargan correctamente
✅ Los endpoints devuelven datos válidos
✅ El frontend se conecta al backend
✅ Las funcionalidades principales funcionan

¡La plataforma Soisi está completamente operativa! 🎉