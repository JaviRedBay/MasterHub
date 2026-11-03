# Reglas de Rendimiento y Acceso Eficiente a Archivos

Este archivo establece las directrices de eficiencia operativa para agentes que trabajen en este repositorio.

## 1. Prohibición de Lecturas Completas de Archivos Grandes
Los archivos de este proyecto superan frecuentemente las 2500 líneas y hasta 6000 líneas (`dnd55Rules.js`, `spellsAndItems.js`, `characterSheet.js`, `characterWizard.js`).

- **Regla Estricta**: NUNCA llames a `read_file` sin especificar `StartLine` y `EndLine` en archivos de más de 500 líneas.
- **Rango Recomendado**: Lee en bloques específicos de 50 a 150 líneas (por ejemplo, `StartLine: 2065, EndLine: 2150`).
- **Paginación Inteligente**: Si necesitas inspeccionar una función larga, ubica su inicio con `Select-String` o consulta el índice de `AGENTS.md`, y luego lee únicamente el bloque correspondiente.

## 2. Búsquedas Ultrarrápidas con PowerShell
Antes de leer a ciegas o invocar búsquedas lentas, utiliza comandos de PowerShell con `run_command` para localizar funciones o constantes en milisegundos:

```powershell
# Localizar una función exacta y su número de línea:
Select-String -Path 'js/**/*.js' -Pattern 'function calculateArmorClass' -Context 0,2

# Buscar una constante específica:
Select-String -Path 'js/constants/spellsAndItems.js' -Pattern 'item_paquete_explorador' -Context 0,5

# Listar exportaciones de un módulo:
Select-String -Path 'js/constants/dnd55Rules.js' -Pattern '^export \{' -Context 0,20
```

## 3. Preservación del Presupuesto de Contexto
- No re-expliques código no modificado.
- Formula ediciones puntuales utilizando `edit_file` con bloques de contexto mínimos pero únicos.
- Evita cadenas de pensamiento repetitivas; ve directo al grano técnico.
- Valida siempre con `esbuild.exe` en 25ms tras realizar cambios de código.

