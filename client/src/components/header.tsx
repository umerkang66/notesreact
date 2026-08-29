import React, { FC, useState } from 'react';
import '../styles/header.css';
import { useTheme } from '../context/theme-context';
import { useTypedSelector } from '../hooks/use-typed-selector';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showShortcuts, setShowShortcuts] = useState(false);

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
