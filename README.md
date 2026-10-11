# Cardboard Landing

Marketing landing for [Cardboard](https://cardboard.ai), the agentic AI video
editor. Make any video you can think of.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy

The production build targets Vercel:

```sh
npm run build
```

Nitro emits a Vercel Build Output API artifact in `.vercel/output`, which Vercel
deploys as-is.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- Three.js