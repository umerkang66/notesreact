import '../styles/cell-list.css';
import { FC, Fragment, useEffect } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: FC = () => {
  const { cells, loading } = useTypedSelector(({ cells: { order, data, loading } }) => {
    return {
      cells: order.map(id => data[id]).filter(Boolean),
      loading,
    };
  });
  const { fetchCells, insertCellAfter } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  if (loading && cells.length === 0) {
    return null;
  }

  const renderedCells = cells.map((cell, index) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} index={index + 1} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />

      {cells.length === 0 ? (
        <div className="empty-notebook">
          <div className="empty-notebook-icon">
            <i className="fas fa-layer-group"></i>
          </div>
          <h2 className="empty-notebook-title">Your notebook is empty</h2>
          <p className="empty-notebook-desc">
            Start coding interactively in JavaScript & React, or write documentation using Markdown.
          </p>
          <div className="empty-notebook-actions">
            <button
              className="btn-pill-code"
              onClick={() => insertCellAfter(null, 'code')}
            >
              <i className="fas fa-code"></i>
              Add First Code Cell
            </button>
            <button
              className="btn-pill-text"
              onClick={() => insertCellAfter(null, 'text')}
            >
              <i className="fas fa-align-left"></i>
              Add First Text Cell
            </button>
          </div>
        </div>
      ) : (
        renderedCells
      )}
    </div>
  );
};

export default CellList;
