import '../styles/text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { FC, useEffect, useRef, useState } from 'react';
import { CellInterface } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTheme } from '../context/theme-context';

interface TextEditorProps {
  cell: CellInterface;
}

const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const { theme } = useTheme();
  const MDEditorDivRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        MDEditorDivRef.current &&
        e.target &&
        MDEditorDivRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div
        className="text-editor text-editor-edit"
        ref={MDEditorDivRef}
        data-color-mode={theme}
      >
        <MDEditor
          value={cell.content}
          onChange={v => updateCell(cell.id, v || '')}
          height={280}
        />
      </div>
    );
  }

  return (
    <div
      className="text-editor text-editor-view"
      onClick={() => setEditing(true)}
      data-color-mode={theme}
    >
      <span className="text-editor-hint">
        <i className="fas fa-pencil-alt" style={{ marginRight: '4px' }}></i>
        Click to edit
      </span>
      <MDEditor.Markdown
        source={cell.content || '*Click here to write Markdown notes & documentation...*'}
      />
    </div>
  );
};

export default TextEditor;
