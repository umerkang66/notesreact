import { editor } from 'monaco-editor';
import { monaco } from '@monaco-editor/react';

export const githubDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'c9d1d9' },
    { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
    { token: 'comment.doc', foreground: '8b949e', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'ff7b72' },
    { token: 'keyword.js', foreground: 'ff7b72' },
    { token: 'keyword.ts', foreground: 'ff7b72' },
    { token: 'keyword.tsx', foreground: 'ff7b72' },
    { token: 'keyword.jsx', foreground: 'ff7b72' },
    { token: 'keyword.control', foreground: 'ff7b72' },
    { token: 'storage', foreground: 'ff7b72' },
    { token: 'storage.type', foreground: 'ff7b72' },
    { token: 'operator', foreground: 'ff7b72' },
    { token: 'operator.js', foreground: 'ff7b72' },
    { token: 'string', foreground: 'a5d6ff' },
    { token: 'string.js', foreground: 'a5d6ff' },
    { token: 'string.ts', foreground: 'a5d6ff' },
    { token: 'string.escape', foreground: '7ee787' },
    { token: 'number', foreground: '79c0ff' },
    { token: 'number.hex', foreground: '79c0ff' },
    { token: 'number.float', foreground: '79c0ff' },
    { token: 'constant', foreground: '79c0ff' },
    { token: 'constant.language', foreground: '79c0ff' },
    { token: 'variable', foreground: 'e6edf3' },
    { token: 'variable.predefined', foreground: '79c0ff' },
    { token: 'variable.parameter', foreground: 'ffa657' },
    { token: 'identifier', foreground: 'e6edf3' },
    { token: 'type', foreground: 'ffa657' },
    { token: 'type.identifier', foreground: 'ffa657' },
    { token: 'tag', foreground: '7ee787' },
    { token: 'tag.id', foreground: '7ee787' },
    { token: 'tag.class', foreground: '7ee787' },
    { token: 'tag.attribute', foreground: '79c0ff' },
    { token: 'attribute.name', foreground: '79c0ff' },
    { token: 'attribute.value', foreground: 'a5d6ff' },
    { token: 'delimiter', foreground: 'c9d1d9' },
    { token: 'delimiter.bracket', foreground: 'c9d1d9' },
    { token: 'regexp', foreground: '7ee787' },
    { token: 'function', foreground: 'd2a8ff' },
  ],
  colors: {
    'editor.background': '#1e2630',
    'editor.foreground': '#c9d1d9',
    'editorCursor.foreground': '#58a6ff',
    'editor.lineHighlightBackground': '#25303c',
    'editorLineNumber.foreground': '#64748b',
    'editorLineNumber.activeForeground': '#f0f6fc',
    'editor.selectionBackground': '#388bfd38',
    'editor.inactiveSelectionBackground': '#388bfd1f',
    'editorBracketMatch.background': '#388bfd33',
    'editorBracketMatch.border': '#388bfd88',
    'editorIndentGuide.background': '#ffffff14',
    'editorIndentGuide.activeBackground': '#ffffff30',
    'editorWhitespace.foreground': '#ffffff18',
  },
};

export const githubLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: '', foreground: '24292f' },
    { token: 'comment', foreground: '6e7781', fontStyle: 'italic' },
    { token: 'comment.doc', foreground: '6e7781', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'cf222e' },
    { token: 'keyword.js', foreground: 'cf222e' },
    { token: 'keyword.ts', foreground: 'cf222e' },
    { token: 'keyword.tsx', foreground: 'cf222e' },
    { token: 'keyword.jsx', foreground: 'cf222e' },
    { token: 'keyword.control', foreground: 'cf222e' },
    { token: 'storage', foreground: 'cf222e' },
    { token: 'storage.type', foreground: 'cf222e' },
    { token: 'operator', foreground: 'cf222e' },
    { token: 'operator.js', foreground: 'cf222e' },
    { token: 'string', foreground: '0a3069' },
    { token: 'string.js', foreground: '0a3069' },
    { token: 'string.ts', foreground: '0a3069' },
    { token: 'string.escape', foreground: '116329' },
    { token: 'number', foreground: '0550ae' },
    { token: 'number.hex', foreground: '0550ae' },
    { token: 'number.float', foreground: '0550ae' },
    { token: 'constant', foreground: '0550ae' },
    { token: 'constant.language', foreground: '0550ae' },
    { token: 'variable', foreground: '24292f' },
    { token: 'variable.predefined', foreground: '0550ae' },
    { token: 'variable.parameter', foreground: '953800' },
    { token: 'identifier', foreground: '24292f' },
    { token: 'type', foreground: '953800' },
    { token: 'type.identifier', foreground: '953800' },
    { token: 'tag', foreground: '116329' },
    { token: 'tag.id', foreground: '116329' },
    { token: 'tag.class', foreground: '116329' },
    { token: 'tag.attribute', foreground: '0550ae' },
    { token: 'attribute.name', foreground: '0550ae' },
    { token: 'attribute.value', foreground: '0a3069' },
    { token: 'delimiter', foreground: '24292f' },
    { token: 'delimiter.bracket', foreground: '24292f' },
    { token: 'regexp', foreground: '116329' },
    { token: 'function', foreground: '8250df' },
  ],
  colors: {
    'editor.background': '#ffffff',
    'editor.foreground': '#24292f',
    'editorCursor.foreground': '#0969da',
    'editor.lineHighlightBackground': '#f6f8fa',
    'editorLineNumber.foreground': '#8c959f',
    'editorLineNumber.activeForeground': '#24292f',
    'editor.selectionBackground': '#b6e3ff',
    'editor.inactiveSelectionBackground': '#ebf5ff',
    'editorBracketMatch.background': '#b6e3ff',
    'editorBracketMatch.border': '#54aeff',
    'editorIndentGuide.background': '#d0d7de',
    'editorIndentGuide.activeBackground': '#8c959f',
    'editorWhitespace.foreground': '#d0d7de',
  },
};

export const registerGithubThemes = (monacoInstance: any) => {
  if (!monacoInstance || !monacoInstance.editor) return;
  try {
    monacoInstance.editor.defineTheme('github-dark', githubDarkTheme);
    monacoInstance.editor.defineTheme('github-light', githubLightTheme);
  } catch (e) {
    // Theme might already be defined
  }
};

// Pre-initialize themes
monaco.init().then(monacoInstance => {
  registerGithubThemes(monacoInstance);
});
