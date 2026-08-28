# notesreact

An interactive browser-based JavaScript and React coding environment with Markdown support. Run React Snippets in code cells and write comprehensive documentation in markdown cells directly from your terminal.

## Architecture

This project uses a **Simple Architecture** (standalone, no Lerna):

- **CLI & Local Server** (`src/`): Commander CLI and Express server handling the `/cells` API for reading/writing local notebook files and serving the React application.
- **Client** (`client/`): React, Redux, Monaco Editor, and in-browser ESBuild WASM bundler.

## Installation

```bash
npm install -g notesreact
```

## Usage

Start the interactive notebook:

```bash
notesreact serve
```

Specify a custom file name or port:

```bash
notesreact serve my-notes.js --port 4005
```

## Development

1. Install root and client dependencies:

   ```bash
   npm install
   cd client && npm install
   ```

2. Run in development mode (starts client on port 3000 and CLI server with live proxy):

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
