# notesreact

An interactive, browser-based JavaScript and React coding notebook with live preview and Markdown documentation.

---

## Installation

Install globally via npm:

```bash
npm install -g notesreact
```

Or run directly without global installation using `npx`:

```bash
npx notesreact serve
```

---

## Usage

### 1. Launch the Notebook

Start the interactive coding environment with the default notebook file (`notebook.json`):

```bash
notesreact serve
```

### 2. Custom Filename & Port

You can specify a custom filename and port:

```bash
notesreact serve my-notes.json --port 4005
```

#### CLI Options:

- `[filename]`: Name of the file to save/load code from (default: `notebook.json`).
- `-p, --port <number>`: Port to run the server on (default: `4005`).

---

## Key Features

- **Live React Rendering**: Call `show(<Component />)` or `show(value)` to render components, JSX, and data structures in the output preview.
- **Direct npm Imports**: Import any npm package directly in code cells (e.g. `import axios from 'axios'`), dynamically resolved and bundled in-browser.
- **Cumulative Execution**: Variables and functions defined in earlier code cells can be accessed in subsequent cells.
- **Markdown Notes**: Click on text cells to write rich documentation with Markdown.
- **Light & Dark Mode**: Toggle between light and dark themes anytime using the top sun/moon button.
- **Reset & Export**: Download your notebook as JSON or reset the canvas from the top control toolbar.
