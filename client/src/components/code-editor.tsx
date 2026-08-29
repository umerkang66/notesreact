import '../styles/code-editor.css';
import { FC, useEffect, useRef } from 'react';
import { editor } from 'monaco-editor';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserTypeScript from 'prettier/parser-typescript';
import { useTheme } from '../context/theme-context';
import { registerGithubThemes } from '../utils/github-themes';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const { theme } = useTheme();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const activeTheme = theme === 'dark' ? 'github-dark' : 'github-light';

  useEffect(() => {
    if ((window as any).monaco) {
      registerGithubThemes((window as any).monaco);
      (window as any).monaco.editor.setTheme(activeTheme);
    }
  }, [activeTheme]);

  const onEditorDidMount: EditorDidMount = (getEditorValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    const monacoInstance = (window as any).monaco;
    if (monacoInstance) {
      registerGithubThemes(monacoInstance);
      monacoInstance.editor.setTheme(activeTheme);

      // Configure TypeScript / JavaScript compiler options
      monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monacoInstance.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monacoInstance.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        jsx: monacoInstance.languages.typescript.JsxEmit.React,
        jsxFactory: 'React.createElement',
        reactNamespace: 'React',
        allowJs: true,
        checkJs: false,
        esModuleInterop: true,
        typeRoots: ['node_modules/@types'],
      });

      monacoInstance.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monacoInstance.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monacoInstance.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        jsx: monacoInstance.languages.typescript.JsxEmit.React,
        jsxFactory: 'React.createElement',
        reactNamespace: 'React',
        allowJs: true,
        checkJs: false,
        esModuleInterop: true,
      });

      monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
        noSuggestionDiagnostics: true,
      });

      monacoInstance.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
        noSuggestionDiagnostics: true,
      });

      // Provide global ambient type definitions for show() and React
      monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(
        `
        declare function show(value: any): void;
        declare const React: any;
        `,
        'ts:filename/globals.d.ts'
      );
    }

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getEditorValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    if (!editorRef.current) return;

    const unformatted = editorRef.current.getModel()?.getValue();
    if (typeof unformatted === 'undefined') return;

    try {
      const formatted = prettier
        .format(unformatted, {
          parser: 'typescript',
          plugins: [parserTypeScript, parserBabel],
          useTabs: false,
          semi: true,
          singleQuote: true,
          arrowParens: 'avoid',
        })
        .replace(/\n$/, '');

      editorRef.current.setValue(formatted);
    } catch (e) {
      // If code has syntax errors while typing, fallback to babel parser or do nothing gracefully
      try {
        const formatted = prettier
          .format(unformatted, {
            parser: 'babel',
            plugins: [parserBabel],
            useTabs: false,
            semi: true,
            singleQuote: true,
            arrowParens: 'avoid',
          })
          .replace(/\n$/, '');
        editorRef.current.setValue(formatted);
      } catch (err) {}
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button-format"
        onClick={onFormatClick}
        title="Format code with Prettier"
      >
        <i className="fas fa-magic" style={{ marginRight: '4px' }}></i>
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        theme={activeTheme}
        height="100%"
        language="typescript"
        value={initialValue}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: true,
          lineNumbersMinChars: 3,
          fontSize: 13.5,
          fontWeight: '500',
          scrollBeyondLastLine: false,
          fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
          fontLigatures: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          renderLineHighlight: 'all',
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
