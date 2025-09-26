📋 User Stories

Story 1: Configuración de Entorno de Desarrollo

Como desarrollador, quiero tener configuraciones específicas para desarrollo que me permitan bypasear restricciones de producción

Tasks:

1. Crear variables de entorno para modo desarrollo


    - Agregar NODE_ENV=development
    - Crear DEV_MODE_ENABLED=true
    - Configurar BYPASS_PROTECTION_RULES=true

2. Modificar sistema de protección para desarrollo


    - Actualizar ProtectionService para detectar modo dev
    - Agregar bypass condicional en validaciones
    - Mantener logs de cuándo se bypasean reglas

3. Crear endpoint de configuración de desarrollo


    - GET /dev/config - Ver configuración actual
    - POST /dev/config - Cambiar configuraciones en runtime
    - POST /dev/reset-restrictions - Reset temporal de restricciones

---

Story 2: Generador de Datos de Prueba Realistas

Como desarrollador, quiero generar usuarios y datos realistas para poder probar todas las funcionalidades de la plataforma

Tasks:

1. Crear servicio generador de usuarios


    - Generar usuarios con perfiles diversos
    - Diferentes niveles de experiencia (novato, intermedio, experto)
    - Diferentes montos en wallet
    - Reputación variada

2. Crear generador de relaciones sociales


    - Establecer relaciones de amistad entre usuarios
    - Crear grupos de usuarios que apuestan entre sí
    - Generar histórico de interacciones

3. Crear generador de apuestas históricas


    - Apuestas completadas entre amigos
    - Apuestas públicas con diferentes resultados
    - Torneos con participaciones pasadas
    - Transacciones financieras realistas

4. Crear endpoint de generación de datos


    - POST /dev/generate-users - Generar usuarios
    - POST /dev/generate-friendships - Crear relaciones
    - POST /dev/generate-betting-history - Crear historial
    - POST /dev/generate-full-scenario - Escenario completo

---

Story 3: Panel de Administración de Desarrollo

Como desarrollador, quiero un panel web simple para gestionar datos de prueba y monitorear el estado de la plataforma

Tasks:

1. Crear endpoints de administración


    - GET /dev/dashboard - Dashboard con métricas
    - DELETE /dev/reset-database - Reset completo
    - GET /dev/users-status - Estado de usuarios
    - POST /dev/simulate-scenario - Simular escenarios específicos

2. Crear página de administración frontend


    - Página simple en /dev-admin
    - Botones para operaciones comunes
    - Visualización de datos en tiempo real
    - Logs de operaciones realizadas

3. Implementar herramientas de monitoreo


    - Estado de restricciones activas
    - Contador de apuestas por usuario
    - Estado de wallets y transacciones
    - Logs de errores en tiempo real

---

Story 4: Escenarios de Prueba Predefinidos

Como desarrollador, quiero poder cargar escenarios específicos para probar diferentes flujos de la aplicación

Tasks:

1. Crear escenarios predefinidos


    - "Usuarios nuevos" - Para probar onboarding
    - "Usuarios experimentados" - Para probar funcionalidades avanzadas
    - "Torneo activo" - Para probar sistema de torneos
    - "Apuestas en curso" - Para probar resolución de apuestas

2. Implementar carga de escenarios


    - POST /dev/load-scenario/:scenarioName
    - Validación y rollback automático
    - Documentación de cada escenario

3. Crear herramientas de validación


    - Verificar que escenarios se cargaron correctamente
    - Validar integridad de datos
    - Reportar inconsistencias

---

Story 5: Herramientas de Testing y Debugging

Como desarrollador, quiero herramientas que me ayuden a debuggear problemas y validar funcionalidades rápidamente

Tasks:

1. Crear endpoints de debugging


    - GET /dev/debug/user/:userId - Info completa de usuario
    - GET /dev/debug/bet/:betId - Estado detallado de apuesta
    - POST /dev/debug/simulate-bet-flow - Simular flujo completo

2. Implementar logging mejorado


    - Logs estructurados para operaciones clave
    - Niveles de log configurables
    - Exportación de logs para análisis

3. Crear herramientas de validación


    - Validar consistencia de datos
    - Verificar reglas de negocio
    - Detectar datos huérfanos o inconsistentes

---

🚀 Plan de Implementación

Lunes - Sprint Planning & Story 1

- Morning: Configuración de entorno de desarrollo
- Afternoon: Sistema de bypass para desarrollo

Martes - Story 2

- Morning: Generador de usuarios y datos
- Afternoon: Generador de relaciones y historial

Miércoles - Story 3

- Morning: Endpoints de administración
- Afternoon: Panel frontend básico

Jueves - Story 4

- Morning: Escenarios predefinidos
- Afternoon: Testing y validación

Viernes - Story 5 & Testing

- Morning: Herramientas de debugging
- Afternoon: Testing completo del sistema

---

🎯 Criterios de Éxito

1. ✅ Puede crear apuestas sin restricciones en desarrollo
2. ✅ Datos realistas que permiten probar todos los flujos
3. ✅ Panel de admin funcional para gestión de datos
4. ✅ Escenarios de prueba documentados y funcionales
5. ✅ Herramientas de debugging que facilitan desarrollo
