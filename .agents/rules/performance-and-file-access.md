# Reglas de Rendimiento, Acceso Eficiente y Control de Versiones

Este archivo establece las directrices de eficiencia operativa y control de cambios para cualquier agente que trabaje en este repositorio.

## 1. Prohibición de Lecturas Completas de Archivos Grandes
Los archivos principales superan las 2500-6200 líneas (`dnd55Rules.js`, `spellsAndItems.js`, `characterSheet.js`, `characterWizard.js`).

- **Regla Estricta**: NUNCA llames a `read_file` sin especificar `StartLine` y `EndLine` en archivos de más de 500 líneas.
- **Rango Recomendado**: Lee en bloques específicos de 50 a 150 líneas usando los mapas de líneas de `AGENTS.md` y de las skills (`.agents/skills/`).
- **Paginación Inteligente**: Si necesitas inspeccionar una función cuyo número de línea exacto desconoces, localízala primero con `Select-String` y luego lee únicamente el rango necesario.

## 2. Búsquedas Ultrarrápidas con PowerShell
Antes de leer a ciegas, utiliza `Select-String` con `run_command` para localizar funciones, modales o constantes en milisegundos:

```powershell
# Localizar una función exacta y su número de línea:
Select-String -Path 'js/**/*.js' -Pattern 'function calculateArmorClass' -Context 0,2

# Buscar un modal o elemento por ID:
Select-String -Path 'js/modules/characterSheet.js' -Pattern 'modal-sheet-edit-skills' -Context 0,5
```

## 3. Preservación del Contexto y Verificación Rápida
- Formula ediciones puntuales utilizando `edit_file` con bloques de contexto precisos.
- Valida siempre con `esbuild.exe` (< 50ms) tras realizar cambios en archivos JS.

## 4. Prohibición de Commit, Push o Subida de Versión Autodeterminada
- **Regla Estricta**: NUNCA ejecutes `git commit`, `git push` ni incrementes la versión en `js/constants/version.js` o `index.html` por iniciativa propia al terminar una tarea.
- Estas acciones **solo** deben realizarse cuando el usuario lo indique explícitamente en su petición.
