import '../styles/action-bar.css';
import { FC } from 'react';
import { useActions } from '../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <button
        className="action-btn"
        onClick={() => moveCell(id, 'up')}
        title="Move cell up"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      <button
        className="action-btn"
        onClick={() => moveCell(id, 'down')}
        title="Move cell down"
      >
        <i className="fas fa-arrow-down"></i>
      </button>
      <button
        className="action-btn delete-btn"
        onClick={() => deleteCell(id)}
        title="Delete cell"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default ActionBar;
