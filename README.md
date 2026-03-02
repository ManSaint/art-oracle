# 🎨 Art Oracle

> AI-powered museum explorer built with Next.js, Met Museum API & Grok

Art Oracle låter dig utforska över 470 000 konstverk från Metropolitan Museum of Art i New York. Välj ett verk och få en AI-genererad beskrivning uppläst av en röst — som att ha en privat museiguide i fickan.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Bun](https://img.shields.io/badge/Bun-latest-fbf0df?logo=bun)

---

## ✨ Funktioner

- **Utforska konstverk** — Bläddra bland Mets 17 avdelningar och 470 000+ verk
- **Dagens konstverk** — Ett nytt verk lyfts fram varje dag på startsidan
- **AI-beskrivningar** — Grok genererar en rik, engagerande text om varje konstverk
- **Röstuppläsning** — ElevenLabs läser upp beskrivningen med en djup, brittisk röst
- **Sök & filtrera** — Sök på konstnär, titel, era eller kultur
- **Favoriter** — Spara dina favoritverk lokalt i webbläsaren

---

## 🛠 Tech Stack

| Verktyg | Användning |
|---|---|
| Next.js 16 (App Router) | Ramverk, routing, Server Components |
| React 19 | UI-komponenter |
| TypeScript | Typsäkerhet |
| Tailwind CSS v4 | Styling |
| Bun | Pakethanterare |
| Met Museum API | Konstverksdata (gratis, ingen nyckel) |
| Grok API (xAI) | AI-genererade beskrivningar |
| ElevenLabs | Text-till-tal, röstuppläsning |

---

## 🚀 Kom igång

### Förutsättningar

- [Bun](https://bun.sh) installerat
- Konto på [x.ai](https://x.ai/api) för Grok API-nyckel
- Konto på [elevenlabs.io](https://elevenlabs.io) för TTS (valfritt)

### Installation

```bash
git clone https://github.com/ManSaint/art-oracle.git
cd art-oracle
bun install
```

### Miljövariabler

Skapa en `.env.local` fil i projektets rotmapp:

```env
GROK_API_KEY=din_grok_nyckel_här
ELEVENLABS_API_KEY=din_elevenlabs_nyckel_här   # Valfritt
ELEVENLABS_VOICE_ID=JBFqnCBsd6RMkjVDRZzb       # George (standard)
```

> **OBS:** Lägg aldrig `.env.local` i Git. Den finns redan i `.gitignore`.

### Starta lokalt

```bash
bun dev
```

Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

---

## 📁 Projektstruktur

```
art-oracle/
├── app/
│   ├── page.tsx                 # Startsida
│   ├── search/page.tsx          # Söksida
│   ├── artwork/[id]/page.tsx    # Konstverks-detaljsida
│   ├── department/[id]/page.tsx # Avdelningssida
│   ├── favorites/page.tsx       # Favoritsida
│   └── api/
│       ├── grok/route.ts        # Proxy för Grok API
│       └── tts/route.ts         # Proxy för ElevenLabs
├── components/                  # Återanvändbara komponenter
├── lib/                         # Hjälpfunktioner, API-klienter
└── types/                       # TypeScript-typer
```

---

## 🔑 API:er

### Met Museum API
Helt gratis, ingen API-nyckel behövs.
```
GET https://collectionapi.metmuseum.org/public/collection/v1/search?q=monet
GET https://collectionapi.metmuseum.org/public/collection/v1/objects/[id]
GET https://collectionapi.metmuseum.org/public/collection/v1/departments
```

### Grok API
Anropas via `/api/grok` för att skydda nyckeln från klienten.

### ElevenLabs TTS
Anropas via `/api/tts`. Faller tillbaka på Web Speech API om nyckeln saknas.

---

## 🎨 Designskiss

Interaktiv wireframe med tre sidor — startsida, konstverks-detaljsida och söksida.

**[→ Visa wireframe live](https://mansaint.github.io/art-oracle/wireframe.html)**

---

## 📚 Kurs

Individuellt arbete — [Lexicon Frontend System Development 2025–2026](https://github.com/Lexicon-Utbildning-Front-end-2025-2026/individuellt-arbete)
