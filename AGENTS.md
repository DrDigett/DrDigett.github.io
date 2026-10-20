# AGENTS.md

Guía para agentes que trabajen en este repositorio (DrDigett.github.io, blog personal en Astro).

## Cuándo usar esta guía

Úsala **siempre** que se cree o edite un artículo en `src/content/articulos/`. Define el formato, el frontmatter y los estilos permitidos para que el resultado sea consistente con los demás artículos. (Los `relatos` tienen otras reglas de tono: no aplicar esta guía salvo para el frontmatter.)

Al terminar cualquier cambio de contenido, verifica con:

```
npm run build
```

## ⚠️ Regla de intervención del texto

**NO MODIFICAR LA ESTRUCTURA NI NINGUNA PALABRA DEL TEXTO**, a menos que falte una tilde o esté mal escrita una palabra; falte o sobre una coma,punto,doble punto, punto y coma; mejorar las citas y a lo mucho te puedes tomar la libertad de separar un parrafo para darle un estilo si lo ves 100% necesario por practicidad y estilo css de la web. Más que eso, no.

## Ubicación y nombre de archivo

- Carpeta: `src/content/articulos/`
- El **nombre del archivo es el slug de la URL**: kebab-case, minúsculas y sin espacios.
  - Correcto: `asimetria-productiva-e-IA.md`, `java-o-python-en-las-aulas.md`
  - La primera línea del archivo **no** es el título: el título va en el frontmatter.

## Frontmatter (obligatorio)

Esquema validado en `src/content/config.ts`:

```yaml
---
title: "Título del artículo"
date: "DD-MM-YYYY"
image: "https://i.imgur.com/XXXXXXXX.jpeg"   # opcional
description: "Resumen de una línea."          # opcional
draft: false                                  # opcional
---
```

- `title`: string (obligatorio).
- `date`: obligatorio, formato `DD-MM-YYYY` (o `DD/MM/YYYY`). Ej: `16-10-2026`. El índice ordena por fecha descendente.
- `image`: opcional. URL de imgur (`https://i.imgur.com/...`) o ruta local (`/images/...`). Si no se tiene aún, déjala comentada (`# image: "..."`).
- `description`: opcional; se muestra como bajada bajo el encabezado y como meta descripción.
- `draft: true` oculta el artículo del índice.

## Estructura y estilo del cuerpo

El contenido se renderiza dentro de `.story-content` (`src/layouts/ArticleLayout.astro`). Usa **Markdown estándar**:

- **No** incluyas un `#` (H1) en el cuerpo: el título ya viene del frontmatter.
- `##` para secciones principales y `###` para subsecciones. Puedes numerarlas (`## 1. ...`).
- `**negrita**` para conceptos o tesis clave (se resaltan en color secundario).
- `*cursiva*` para términos extranjeros, énfasis y títulos de obras.
- `>` (blockquote) para tesis, definiciones o ejemplos destacados.
- Listas con `-` (viñetas) o `1.` (ordenadas), no pegadas al párrafo.
- `---` como separador entre secciones cierre y Referencias.
- **Enlaces**: siempre con texto descriptivo, nunca URLs sueltas.
  - Correcto: `[informe de OpenAI](https://openai.com/...)`
  - Incorrecto: `[https://openai.com/...]`
- Párrafos separados por una línea en blanco. Codificación UTF-8.

## Referencias

Todo artículo que cite fuentes cierra con `## Referencias` en **lista con viñetas**, en orden alfabético:

```markdown
## Referencias

- **Autor** (año). *Título del texto*. Fuente. https://url
```

## Estilos disponibles

Todas las clases del artículo están definidas en `src/styles/global.css`, dentro del bloque `.story-content`. Ya hay estilos para: `p`, `h2`, `h3`, `img`, `a`, `strong`, `blockquote`, `ul`, `ol`, `li`, `hr`, `code`.

- Usa los elementos ya estilizados; **no agregues HTML ni CSS inline** en el `.md`.
- Si necesitas un elemento nuevo (p. ej. tablas), agrégalo como regla `.story-content <elemento>` en `src/styles/global.css` reutilizando las variables (`--color-primary`, `--color-secondary`, `--radius`, etc.), no dentro del Markdown.
- `.story-content` ya incluye `overflow-wrap: anywhere`, de modo que las URLs largas se parten y nunca desbordan la pantalla en móvil. Al añadir listas, tablas o bloques nuevos, no desactives este comportamiento (`overflow-wrap`, `word-break`, `white-space: nowrap`); si usas `nowrap`, envuélvelo con `overflow-x: auto`.

## Checklist antes de terminar

1. Frontmatter completo y `date` en `DD-MM-YYYY`.
2. Título solo en el frontmatter (sin H1 en el cuerpo).
3. Se usan `##` / `###`, blockquotes y listas según esta guía.
4. Todos los enlaces son descriptivos `[texto](url)`.
5. Si se citan fuentes, existe `## Referencias` en lista con viñetas.
6. No hay desbordamiento horizontal en móvil (revisa sobre todo las URLs largas de `## Referencias`).
7. `npm run build` pasa sin errores.
