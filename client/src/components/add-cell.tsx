import '../styles/add-cell.css';
import { FC } from 'react';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({
  previousCellId,
  forceVisible = false,
}) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
      <div className="divider-line" />
      <div className="add-buttons">
        <button
          className="btn-add code-btn"
          onClick={() => insertCellAfter(previousCellId, 'code')}
          title="Insert JavaScript/React code cell"
        >
          <i className="fas fa-plus"></i>
          <span>Code</span>
        </button>
        <button
          className="btn-add text-btn"
          onClick={() => insertCellAfter(previousCellId, 'text')}
          title="Insert Markdown documentation cell"
        >
          <i className="fas fa-plus"></i>
          <span>Text</span>
        </button>
      </div>
    </div>
  );
};

export default AddCell;
