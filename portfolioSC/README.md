# Santiago Calderón · Portafolio profesional

Rediseño editorial Mobile-First del portafolio original, basado en React 19, Vite 8, React Router e i18next. CSS propio con tokens de color y media queries; animaciones ligeras con IntersectionObserver y CSS. Se conserva el lockfile y las dependencias originales para minimizar cambios en el entorno. Tailwind y Framer Motion quedan instalables pero no se importan desde el código nuevo.

## Ejecutar en Windows / VS Code

Recomendado Node.js 24 LTS (Vite 8 requiere Node 20.19+ o 22.12+ según sus requisitos de motor; Node 24 cumple). Abre en VS Code la carpeta que contiene `package.json`. En PowerShell:

```powershell
npm ci
npm run dev
```

Abre la URL que Vite muestra. Validaciones antes de publicar:

```powershell
npm test
npm run lint
npm run build
npm run preview
```

Para Vercel, utiliza el preset Vite, build `npm run build` y salida `dist`. El archivo `vercel.json` conserva la reescritura SPA para casos de estudio. No se incluyen `node_modules`, `dist`, `.vercel` ni `.git`.

## Información y estructura

- `src/components/`: cabecera, hero, proyectos, servicios, perfil, contacto, footer y caso de estudio.
- `src/data/site.js`: contactos, stack, imágenes y slugs de proyectos.
- `src/locales/es.json`, `en.json`: contenido de la web y ambos casos en español e inglés.
- `src/hooks/useReveal.js`: animaciones al entrar en viewport, con reducción de movimiento.
- `src/index.css`: tokens, estilos Mobile-First (375–430 px y superiores), breakpoints, modo oscuro y estados de foco.
- `public/`: CV y marca originales.
- `scripts/check-content.mjs`: verifica paridad ES/EN y existencia de recursos esenciales.

### Rutas

`/` (secciones `#home`, `#work`, `#services`, `#about`, `#contact`), `/case-study/labstock`, `/case-study/tourcraft`. Los identificadores numéricos `/case-study/1` y `/case-study/2` siguen funcionando. `/portfolio` y `/about` redirigen a sus secciones. Las rutas antiguas de intereses redirigen al perfil, sin publicar las páginas personales.

### Antes de publicar

1. Confirma el número de WhatsApp en `src/data/site.js` (se extrajo del CV original, no se verificó que tenga cuenta activa). Confirma también correo y redes.
2. El formulario prepara un borrador en correo o WhatsApp; no tiene backend, no almacena datos ni confirma entrega. Para recepción directa sin cliente de correo será necesario integrar un proveedor o endpoint.
3. Revisa las cifras de LabStock antes de hacerlas públicas; proceden del caso original y no fueron verificadas externamente. TourCraft se presenta como proyecto académico con simulación de reservas; no se agregaron ventas ni usuarios inventados. El CV y el caso anterior contienen períodos distintos para TourCraft (2024–2025 frente a mayo–septiembre 2024); se usó 2024 como año del caso, pendiente de confirmación.
4. Verifica que las capturas y el certificado puedan mostrarse públicamente. Los enlaces a ambos casos y el CV son originales o derivados del repositorio original. Actualiza el CV si procede.
5. Abre DevTools y comprueba 375, 390, 430, 768, 1280 y 1440 px. Comprueba navegación, teclado, modo oscuro, idioma, casos de estudio, enlaces históricos, imágenes, descarga del CV, formulario válido/inválido y `prefers-reduced-motion`. Haz la revisión final en Safari iOS y Android/Chrome reales antes de desplegar.

## Validaciones del entorno de entrega

- ESLint de `src` y `vite.config.js`: pasó.
- `npm test`: pasó.
- Se renderizaron a HTML los componentes principales y ambos casos en ES/EN con un adaptador de prueba (no es un build real de Vite), incluidos IDs numéricos y caso inexistente, antes de los últimos ajustes menores de estilo y contenido.
- `npm run build` no pudo completarse en el entorno Linux: el ZIP original tenía bindings Windows de Rolldown, faltaba la variante Linux y la instalación de dependencias no se completó. La auditoría visual en Chromium tampoco pudo efectuarse por política de navegación del entorno. No se certifica el build, la ausencia de desbordes en navegador real ni el rendimiento de 60 fps hasta ejecutar las pruebas locales.

## Poda de contenido

Se retiraron HobbiesPage, InspirationsPage, PlaylistPage, Interests, LovedOnes, MyJourney, PortfolioPage y AboutMePage (los últimos tres se integraron en Inicio mediante componentes nuevos). Se eliminaron las imágenes de música/aficiones, fondos decorativos e imágenes redundantes. La experiencia y los proyectos se mantienen, con capturas convertidas a WebP. Se conserva el retrato principal, CV, logotipo y certificado iTEP.
