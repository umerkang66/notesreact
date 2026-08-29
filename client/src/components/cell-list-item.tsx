import '../styles/cell-list-item.css';
import { FC } from 'react';
import { CellInterface } from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

interface CellListItemProps {
  cell: CellInterface;
  index?: number;
}

const CellListItem: FC<CellListItemProps> = ({ cell, index }) => {
  return (
    <div className="cell-list-item">
      <div className="cell-header-bar">
        <div className="cell-meta">
          {index && <span className="cell-index">#{index}</span>}
          {cell.type === 'code' ? (
            <span className="cell-badge code">
              <i className="fas fa-code"></i>
              <span>JavaScript</span>
            </span>
          ) : (
            <span className="cell-badge text">
              <i className="fas fa-file-alt"></i>
              <span>Markdown</span>
            </span>
          )}
        </div>
        <ActionBar id={cell.id} />
      </div>

      <div className="cell-content-area">
        {cell.type === 'code' ? (
          <CodeCell cell={cell} />
        ) : (
          <TextEditor cell={cell} />
        )}
      </div>
    </div>
  );
};

export default CellListItem;
