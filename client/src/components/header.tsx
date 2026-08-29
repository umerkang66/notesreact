import React, { FC, useState } from 'react';
import '../styles/header.css';
import { useTheme } from '../context/theme-context';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { resetCells } = useActions();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => data[id]).filter(Boolean);
  });

  const handleExport = () => {
    const jsonContent = JSON.stringify(cells, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notesreact-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetConfirm = () => {
    resetCells();
    setShowResetConfirm(false);
  };

  return (
    <>
      <div className="top-controls">
        <button
          className="btn-icon"
          onClick={() => setShowShortcuts(true)}
          title="Keyboard Shortcuts"
        >
          <i className="fas fa-keyboard"></i>
        </button>

        <button
          className="btn-icon"
          onClick={handleExport}
          title="Export Notebook JSON"
        >
          <i className="fas fa-download"></i>
        </button>

        <button
          className="btn-icon danger"
          onClick={() => setShowResetConfirm(true)}
          title="Reset Notebook (Restore default examples)"
        >
          <i className="fas fa-rotate-left"></i>
        </button>

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-rotate-left" style={{ color: 'var(--primary)' }}></i>
                Reset to Default Examples?
              </h3>
              <button
                className="btn-icon"
                onClick={() => setShowResetConfirm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '20px' }}>
                This will reset your notebook and reload the full suite of starter examples (Plain counter, Styled counter card, Axios API fetcher, and Tailwind dashboard component).
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  className="btn-ghost"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleResetConfirm}
                >
                  <i className="fas fa-rotate-left"></i>
                  Reset & Load Examples
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="modal-overlay" onClick={() => setShowShortcuts(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="fas fa-keyboard" style={{ color: 'var(--primary)' }}></i>
                Keyboard Shortcuts
              </h3>
              <button
                className="btn-icon"
                onClick={() => setShowShortcuts(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <table className="shortcuts-table">
                <tbody>
                  <tr>
                    <td>Format Code</td>
                    <td>
                      <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd> or click <strong>Format</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Render React / Object</td>
                    <td>
                      Call <kbd>show(&lt;Component /&gt;)</kbd>
                    </td>
                  </tr>
                  <tr>
                    <td>Import npm Packages</td>
                    <td>
                      <kbd>import axios from 'axios'</kbd> (Auto-fetched via unpkg)
                    </td>
                  </tr>
                  <tr>
                    <td>Cumulative Execution</td>
                    <td>
                      Variables & functions declared in upper cells are accessible in lower cells
                    </td>
                  </tr>
                  <tr>
                    <td>Edit Markdown</td>
                    <td>Click anywhere on a Markdown cell to switch to editor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
