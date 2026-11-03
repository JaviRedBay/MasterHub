---
name: fast-codebase-navigator
description: >-
  Herramientas de navegación ultrarrápida y comandos de PowerShell para inspeccionar el repositorio en milisegundos sin consumir contexto ni leer archivos completos.
  Activa esta habilidad cuando necesites localizar código, buscar constantes, validar sintaxis con esbuild o ejecutar tests rápidos con Node.
---

# Navegación Ultrarrápida y Comandos de Inspección

Esta habilidad permite a los agentes ejecutar búsquedas quirúrgicas y validaciones en milisegundos en el entorno Windows / PowerShell del proyecto.

## ⚡ Comandos de Búsqueda Quirúrgica (PowerShell)

### 1. Localizar cualquier función y su número de línea
En lugar de leer 6000 líneas:
```powershell
Select-String -Path 'js/**/*.js' -Pattern 'function calculateArmorClass' | Select-Object Filename, LineNumber, Line
```

### 2. Buscar una constante u objeto en `spellsAndItems.js`
```powershell
Select-String -Path 'js/constants/spellsAndItems.js' -Pattern 'item_paquete_explorador' -Context 0,4
```

### 3. Ver los métodos de una clase
```powershell
Select-String -Path 'js/modules/characterSheet.js' -Pattern '^\s{2}[a-zA-Z0-9_]+\s*\(' | Select-Object -First 25 LineNumber, Line
```

### 4. Buscar clases CSS temáticas
```powershell
Select-String -Path 'css/style.css' -Pattern '\.sheet-balanced-top|\.rpg-wizard-step-btn' -Context 0,5
```

---

## 🚀 Verificación Inmediata con `esbuild` (< 50 ms)

NUNCA esperes a que un usuario reporte un error de sintaxis o importación rota. Ejecuta el verificador tras cada edición:

```powershell
& "C:\Users\Wargo\source\repos\roleplay-master-utility-hub\package\esbuild.exe" js/main.js --bundle --outfile=nul --format=esm
```

Si el comando termina con código 0 y `nul 1.3mb Done in XXms`, la sintaxis y las importaciones están 100% correctas.

---

## 🧪 Pruebas Unitarias Rápidas con Node.js

Para verificar lógica o cálculos sin abrir el navegador:

```powershell
powershell -Command "
@'
import { calculateArmorClass, calculateHitPoints } from './js/constants/dnd55Rules.js';
const testChar = { classId: 'guerrero', level: 1, baseAbilityScores: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 8 }, armorId: 'cota_malla', hasShield: true };
console.log('AC:', calculateArmorClass(testChar).ac);
console.log('HP:', calculateHitPoints(testChar).maxHp);
'@ | Out-File -FilePath 'scratch_test.js' -Encoding utf8;

& 'C:\Users\Wargo\source\repos\roleplay-master-utility-hub\package\esbuild.exe' scratch_test.js --bundle --outfile=scratch_test.cjs --format=cjs;
& 'C:\Program Files\dotnet\packs\Microsoft.NET.Runtime.Emscripten.2.0.23.Node.win-x64\6.0.36\tools\bin\node.exe' scratch_test.cjs;
Remove-Item 'scratch_test.js','scratch_test.cjs' -Force;
"
```

