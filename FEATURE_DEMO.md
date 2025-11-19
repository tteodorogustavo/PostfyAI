# Translation Feature - Visual Guide

## Overview
This feature allows users to generate LinkedIn posts in three languages:
- 🇧🇷 **Portuguese (Português)** - Default
- 🇺🇸 **English**
- 🇪🇸 **Spanish (Español)**

## User Flow

### 1. Article Detail Page
When viewing an article, users will see a new language selector before the "Gerar Post com IA" button:

```
┌─────────────────────────────────────────────────────┐
│  ✨ Gerar Post para LinkedIn                        │
│                                                      │
│  Transforme este artigo científico em um post       │
│  envolvente para o LinkedIn com geração de          │
│  conteúdo por IA                                     │
│                                                      │
│  🌐 Idioma do Post                                  │
│  ┌─────────────────────┐                           │
│  │ 🇧🇷 Português    ▼  │  ← Dropdown selector     │
│  └─────────────────────┘                           │
│                                                      │
│  [ ✨ Gerar Post com IA ]                          │
└─────────────────────────────────────────────────────┘
```

**Language Options in Dropdown:**
- 🇧🇷 Português
- 🇺🇸 English
- 🇪🇸 Español

### 2. Generated Post Page
After generating the post, the selected language is displayed in a badge:

```
┌─────────────────────────────────────────────────────┐
│  ✓  Post Gerado com Sucesso!         🌐 🇧🇷 Português│
│     Seu post para LinkedIn está pronto              │
└─────────────────────────────────────────────────────┘
```

## Technical Implementation

### Code Changes

#### 1. Type Definitions (`src/types/article.ts`)
```typescript
export interface GeneratedPost {
  title: string;
  summary: string;
  hashtags: string[];
  language?: string;  // ← New field
}

export type Language = 'pt' | 'en' | 'es';  // ← New type
```

#### 2. Article Detail Page (`src/pages/ArticleDetail.tsx`)
- Added language selector UI component
- Sends selected language to webhook:
```typescript
body: JSON.stringify({
  title: article.title,
  abstract: article.abstract,
  authors: article.authors,
  url: article.url,
  language: selectedLanguage,  // ← New parameter
})
```

#### 3. Generated Post Page (`src/pages/GeneratedPost.tsx`)
- Displays language badge with flag emoji
- Shows which language was used for generation

## Webhook Integration

The n8n webhook at `https://webhook.terapiaempresarial.com.br/webhook/postfy-ia` now receives a `language` parameter:

```json
{
  "title": "Article Title",
  "abstract": "Article abstract...",
  "authors": ["Author 1", "Author 2"],
  "url": "https://arxiv.org/abs/...",
  "language": "pt"  // ← New parameter: "pt", "en", or "es"
}
```

## Backend Requirements

The webhook backend should:
1. Accept the `language` parameter
2. Use it to instruct the AI to generate content in the specified language
3. Return the response in the requested language

### Example Prompt Modifications:
- **Portuguese (pt)**: "Gere um post em português para o LinkedIn..."
- **English (en)**: "Generate a LinkedIn post in English..."
- **Spanish (es)**: "Genera una publicación en español para LinkedIn..."

## Benefits

✅ **User Choice**: Users can select the language that best fits their audience
✅ **Multilingual Support**: Reach audiences in Portuguese, English, and Spanish markets
✅ **Simple UI**: Intuitive dropdown with flag emojis for easy recognition
✅ **Minimal Changes**: Small, focused changes to the codebase
✅ **Backward Compatible**: Defaults to Portuguese if not specified
