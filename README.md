# Clementine Hu — CV and case studies

An independent Astro site for a browser-readable and printable CV plus evidence-based case studies.

## Local development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the standalone production server after building:

```bash
npm start
```

Node 18.20.8 or newer is required.

## Editing the CV

`src/content/resume.md` is the CV's only factual source. Its frontmatter supplies the fixed header data and its Markdown body supplies every CV section. Do not duplicate or edit the CV body in an `.astro` page.

## Resume Markdown convention

- Use `##` for a section.
- Use `###` for an entry.
- Put an italic metadata line immediately after every entry that has time information.
- Put the entry's bullet list immediately after that metadata line.
- Do not use deeper headings.
- Preserve the date precision supported by the source. Do not invent a month to make formats look consistent.

The print stylesheet relies on this sequence to keep headings, metadata, and list items together.

## Adding a case study

1. Add an `.md` or `.mdx` file in `src/content/work/`.
2. Complete the validated frontmatter.
3. Use these five `##` sections in order: `Context`, `Problem`, `What I did`, `Artefacts and evidence`, and `Limits and what I'd change`.
4. Set `order` to keep published work in reverse chronological order (newest first; use the lower number for the newer case).
5. Set `draft: true` until the evidence and narrative are ready. Drafts are excluded from production lists and routes.
6. Add only real, directly related public artefacts.

Frontmatter fields:

- `title`: case-study title.
- `summary`: one-sentence list description.
- `kind`: `system`, `troubleshooting`, or `documentation`.
- `role`: the actual role performed.
- `period`: the most precise supported date or range.
- `stack`: verified tools and technologies.
- `artefacts`: labelled, directly related public links.
- `authorship`: optional `unassisted` or `ai-assisted-prose` metadata. It is defined but is not currently displayed in the UI.
- `order`: numeric reverse-chronological sort order; lower numbers appear first.
- `draft`: production publication control.

## INDEXABLE

`INDEXABLE` in `src/consts.ts` is the site-wide indexing kill switch. When it is `false`, every HTML page receives `noindex, nofollow` and `robots.txt` disallows all crawling. Restore it to `true` before the public production build.

## Fonts

Merriweather and Noto Sans are sourced from the official Google Fonts repository, stored locally, and served only from `/fonts/`. Noto Sans SC is not used, and the running site does not depend on a font CDN.

The upright and italic source variable TTF files were downloaded with:

```bash
curl -L --fail --silent --show-error \
  'https://raw.githubusercontent.com/google/fonts/main/ofl/notosans/NotoSans%5Bwdth,wght%5D.ttf' \
  -o NotoSans.ttf
curl -L --fail --silent --show-error \
  'https://raw.githubusercontent.com/google/fonts/main/ofl/notosans/NotoSans-Italic%5Bwdth,wght%5D.ttf' \
  -o NotoSans-Italic.ttf
curl -L --fail --silent --show-error \
  'https://raw.githubusercontent.com/google/fonts/main/ofl/merriweather/Merriweather%5Bopsz,wdth,wght%5D.ttf' \
  -o Merriweather.ttf
curl -L --fail --silent --show-error \
  'https://raw.githubusercontent.com/google/fonts/main/ofl/merriweather/Merriweather-Italic%5Bopsz,wdth,wght%5D.ttf' \
  -o Merriweather-Italic.ttf
```

FontTools 4.63.0 and Brotli 1.2.0 were installed in a temporary directory. Noto Sans was instanced at its normal width so the delivered upright and italic files retain the weight axis used by the site:

```bash
python -m fontTools.varLib.instancer NotoSans.ttf \
  wdth=100 \
  --output=NotoSans-weight.ttf
```

The same command was run for the italic source. Merriweather retains its weight, width, and optical-size axes to match the variable font capabilities used by the reference site. Each source was subset with this pattern:

```bash
python -m fontTools.subset SOURCE.ttf \
  --output-file=OUTPUT.woff2 \
  --flavor=woff2 \
  --unicodes='U+0000-024F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF' \
  --layout-features='*' \
  --no-hinting
```

The retained ranges cover Latin, Latin Extended, and the common punctuation, currency, letterlike, and arrow symbols required by the English content. Final files:

- `noto-sans-latin-variable.woff2`: 134,724 bytes.
- `noto-sans-latin-italic-variable.woff2`: 136,592 bytes.
- `merriweather-latin-variable.woff2`: 1,370,424 bytes.
- `merriweather-latin-italic-variable.woff2`: 1,358,304 bytes.
