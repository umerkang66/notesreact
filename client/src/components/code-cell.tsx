import '../styles/code-cell.css';
import { FC, useEffect } from 'react';

// Components
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

// State
import { CellInterface } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

// Hooks
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: CellInterface;
}

const CodeCell: FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, bundleCode } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      bundleCode(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(() => {
      bundleCode(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundleCode, cumulativeCode, cell.id]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell-container">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={value => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <div className="loader-spinner" />
              <span className="loader-text">Compiling bundle...</span>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
