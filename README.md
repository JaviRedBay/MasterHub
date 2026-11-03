# 🏰 Roleplay Master Utility Hub (D&D 5.5 + BTRS Engine)

Aplicación web modular, completa y lista para producción diseñada para mesas de rol presenciales y online de **Dungeons & Dragons 5.5 (PHB 2024 / Faerûn)** y el sistema económico de comercio **BTRS (Breiel Three-Role System)**.

Construida **exclusivamente con la tríada web clásica**:
- **HTML5 Semántico**: Templates nativos, `<dialog>` accesibles y formularios controlados.
- **CSS3 Puro + Bootstrap 5.3.2**: Tema medieval RPG con granate (`#8b0000`), dorado (`#d4af37`), pergamino y botones táctiles grandes para tablets.
- **Vanilla JavaScript Moderno**: Módulos ES6+, almacén reactivo (Store) con Pub/Sub y persistencia en `localStorage`.

---

## 🚀 Cómo Ejecutar la Aplicación

La aplicación no requiere `npm install`, compiladores ni bundlers. Para abrirla directamente:

### Opción 1: Servidor Local de PowerShell (Incluido)
Haz doble clic en `server.ps1` o ejecuta en PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Esto abrirá automáticamente `http://localhost:8080` en tu navegador predeterminado.

### Opción 2: Extensión Live Server de VS Code
Abre la carpeta en VS Code y haz clic en **"Go Live"** en la barra inferior.

### Opción 3: Cualquier Servidor Web Estático
```bash
python -m http.server 8080
# o npx serve
```

---

## 📂 Arquitectura de Archivos

```
DnD Master hub/
├── index.html                   # Contenedor raíz SPA con pestañas y modales
├── server.ps1                   # Servidor web local sin dependencias
├── css/
│   └── style.css                # Estilos temáticos RPG, responsivos e imprimibles A4
├── js/
│   ├── main.js                  # Inicializador, router de pestañas y modales globales
│   ├── state.js                 # Store reactivo con EventEmitter y persistencia localStorage
│   ├── constants/
│   │   ├── btrsData.js          # Tablas BTRS (mercados, rarezas, umbrales y regateo)
│   │   ├── dnd55Rules.js        # Reglas D&D 5.5, especies, trasfondos, clases y fórmulas
│   │   ├── spellsAndItems.js    # Grimorio 205+ conjuros, 96 subclases y 110 objetos
│   │   └── seedData.js          # Datos iniciales canónicos de campañas y personajes
│   ├── modules/
│   │   ├── masterPanel.js       # Panel DM en vivo (PG, ranuras, consumibles, descansos)
│   │   ├── characterWizard.js   # Asistente guiado de 7 pasos para crear personajes
│   │   ├── characterSheet.js    # Hoja oficial interactiva y versión imprimible A4
│   │   ├── btrsCalculator.js    # Calculadora procedural BTRS y generador de tiendas
│   │   ├── dnd55Manager.js      # Hub de campañas y gestión del roster
│   │   └── nameGenerator.js     # Generador de nombres temáticos por especie D&D 5.5
│   └── utils/
│       ├── dice.js              # Motor de tiradas de dados (d20, ventaja, 4d6, fórmulas)
│       ├── formatters.js        # Formateador métrico estricto (m, kg, p.o., mod)
│       ├── pdfExport.js         # Exportador e inyector interactivo a PDF Oficial PHB 2024
│       └── storage.js           # Exportación/importación JSON y respaldo seguro
```

---

## ⚔️ Módulos y Reglas de Negocio Implementadas

### 1. Panel de Seguimiento del Master (Master Panel)
- **Matriz de Habilidades Pasivas**: Percepción Pasiva, Investigación Pasiva y Perspicacia Pasiva de toda la mesa.
- **Tarjetas de Personaje Táctiles**: Barras de vida dinámicas (verde/amarillo/rojo), control de daño/cura (+1/-1, +5/-5), puntos de golpe temporales e Inspiración Heroica.
- **Ranuras de Conjuro**: Chips circulares interactivos para gastar o recuperar ranuras de nivel 1 a 9.
- **Rasgos con Usos Activos**: Furia (Bárbaro), Canalizar Divinidad (Clérigo/Paladín), Forma Salvaje (Druida), Segundo Aliento y Oleada de Acción (Guerrero), Puntos de Foco (Monje), Imposición de Manos (Paladín), Puntos de Hechicería (Hechicero), Puntos de Suerte (Dote Afortunado = BC usos).
  - *Exclusión estricta*: Rasgos pasivos como 'Bendición de la Salud' o 'Ingenio' no generan casillas de gasto.
- **Descansos Automatizados (2024)**:
  - *Descanso Corto*: Restaura recursos de descanso corto y recupera 1 uso de rasgos clave de 2024 (Canalizar Divinidad, Furia, Forma Salvaje, Segundo Aliento).
  - *Descanso Largo*: Restaura todos los PG al máximo, retira PG temporales, resetea todos los espacios de conjuro a 0 usados y restablece al máximo todos los rasgos de descanso. Otorga Inspiración Heroica automática a los humanos.

### 2. Asistente Guiado de Creación (Character Wizard)
- **7 Pasos**:
  1. *Datos de la partida*: Campaña, jugador, máster, alineamiento y nivel (1-20).
  2. *Especie y Linaje*: 10 especies con rasgos canónicos. Humano con selección de habilidad extra (Hábil) y dote de origen adicional (Versátil).
  3. *Trasfondo y Dote*: 35 trasfondos (16 PHB + 18 Faerûn + Personalizado) con asignación estricta de bonificaciones (+2/+1) a las características permitidas y su dote de origen obligatoria.
  4. *Características*: 4 métodos (Conjunto Estándar, Compra por Puntos de 27 pts, tiradas 4d6 descartando el menor interactivas o personalizado).
  5. *Clase y Equipo*: 12 clases, selección de habilidades, estilos de combate, armadura, escudo y armas con Maestría en Armas (Weapon Mastery).
  6. *Subclase y Dotes*: Selección de subclase a partir de nivel 3 (96 subclases canónicas) y dotes de nivel 4+.
  7. *Resumen y Cálculos*: CA automática con fórmulas especiales (Bárbaro, Monje, con/sin escudo), PG desglosados, Iniciativa con Bono de Alerta y capacidad de carga en kilogramos.

### 3. Hoja Oficial Interactiva e Imprimible (Character Sheet)
- Vista interactiva táctil completa con combate, atributos, 18 habilidades, salvaciones, ataques con maestrías, inventario en kg y límite de sintonización mágica (máximo 3).
- **Vista Imprimible A4**: Maquetación limpia en blanco y negro / pergamino formateada para impresión física o guardado en PDF de acuerdo a la hoja oficial de referencia.

### 4. Calculadora de Precios y Tiendas BTRS
- **4 Pasos Canónicos**:
  1. *Disponibilidad*: Comprobación `1d20 + shop.rollMod >= AVAILABILITY_THRESHOLDS[población_rareza]`.
  2. *Condición*: Tirada `1d6` de factores de condición (Dañado, Deshacerse, Materiales caros, Abundante, Escaso, Reservado).
  3. *Precio Base*: Sistema A (tablas de rareza de 3 tiradas) o Sistema B (variante de precio fijo).
  4. *Regateo*: Tirada de Carisma con bonificaciones/recargos porcentuales oficiales.
- **Generador de Tiendas**: Creación procedural de inventarios temáticos con nombres de mercaderes y listas de existencias.

### 5. Hub de Campañas y Gestión de Personajes
- Gestión completa (crear, editar, eliminar) de campañas.
- Roster de personajes agrupados por campaña activa.

### 6. Generador de Nombres por Especie
- Generador de nombres temáticos y de fantasía organizados por especie canónica de D&D 5.5 (Humano, Elfo, Enano, Mediano, Dracónido, Gnomo, Tiefling, etc.) con filtros de género y apellidos/clanes.

---

## ⚖️ Licencias y atribuciones

- **Código fuente**: [Licencia MIT](LICENSE). Se aplica solo al código original; el contenido de juego y las librerías de terceros conservan sus propias licencias (ver la sección "Alcance" del `LICENSE`).
- Este trabajo incluye material del System Reference Document 5.2.1 ("SRD 5.2.1") de Wizards of the Coast LLC, disponible en https://www.dndbeyond.com/srd. El SRD 5.2.1 está licenciado bajo la [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode).
- Contenido de fans no oficial permitido por la [Política de Contenido de Fans](https://company.wizards.com/es/legal/fancontentpolicy). No aprobado ni respaldado por Wizards. Partes de los materiales utilizados son propiedad de Wizards of the Coast. ©Wizards of the Coast LLC. Dungeons & Dragons y D&D son marcas registradas de Wizards of the Coast LLC.
- Proyecto gratuito, sin ánimo de lucro y de uso privado.
- Licencias de librerías de terceros (pdf-lib, Bootstrap, Lucide, Google Fonts): ver [`js/vendor/THIRD_PARTY_LICENSES.txt`](js/vendor/THIRD_PARTY_LICENSES.txt).
- Los PDFs de referencia (`BTRS.pdf`, `Manual para Casi Todo…`, `SP_SRD_CC_v5.2.1.pdf`) y los JSON de personajes/campañas son material local de desarrollo y están excluidos mediante `.gitignore`.
