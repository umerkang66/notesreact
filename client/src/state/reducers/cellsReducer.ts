import produce from 'immer';
import { ActionType } from '../action-types';
import { Actions } from '../actions';
import { CellInterface } from '../CellInterface';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: CellInterface;
  };
}

const defaultStarterCells: CellInterface[] = [
  {
    id: 'intro-cell',
    type: 'text',
    content:
      '# notesreact\n\nWelcome to your browser-based interactive workspace! Here you can write executable JavaScript, build dynamic React UI components with live reloading, and document your projects with full Markdown.\n\n### 🚀 Quick Highlights\n- **Live React Rendering**: Call `show(<YourComponent />)` to instantly render React elements in the output window.\n- **Direct npm Imports**: `import axios from "axios"` or `import lodash from "lodash"` — packages are dynamically resolved on the fly!\n- **Cumulative Scope**: Any variable, function, or component defined in an earlier code cell is directly accessible in subsequent cells.\n- **Light & Dark Theme**: Toggle themes seamlessly from the top right sun/moon control.',
  },
  {
    id: 'counter-cell',
    type: 'code',
    content: `import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '24px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      color: 'white',
      maxWidth: '360px',
      margin: '0 auto',
      boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600 }}>
        ✨ Live React Demo
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '13px', opacity: 0.9 }}>
        Click the buttons to test real-time state!
      </p>
      <div style={{
        fontSize: '44px',
        fontWeight: 800,
        margin: '12px 0',
        letterSpacing: '-0.02em'
      }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() => setCount(c => c - 1)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          - Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: 'white',
            color: '#6366f1',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          + Increment
        </button>
      </div>
    </div>
  );
};

show(<App />);`,
  },
];

const initialState: CellsState = {
  loading: false,
  error: null,
  order: defaultStarterCells.map(c => c.id),
  data: defaultStarterCells.reduce((acc, cell) => {
    acc[cell.id] = cell;
    return acc;
  }, {} as CellsState['data']),
};

const cellsReducer = produce(
  (state: CellsState = initialState, action: Actions): CellsState => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;

      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;

      case ActionType.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map(cell => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
        return state;

      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        if (state.order.length === 0) {
          state.order = defaultStarterCells.map(c => c.id);
          state.data = defaultStarterCells.reduce((acc, cell) => {
            acc[cell.id] = cell;
            return acc;
          }, {} as CellsState['data']);
        }
        return state;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter(cellId => cellId !== action.payload);
        return state;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex(id => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1)
          return state;
        const temp = state.order[index];
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = temp;
        return state;

      case ActionType.INSERT_CELL_AFTER:
        const cell: CellInterface = {
          content: '',
          id: randomId(),
          type: action.payload.type,
        };
        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          id => id === action.payload.id
        );

        if (foundIndex === -1) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }
        return state;

      default:
        return state;
    }
  }
);

function randomId(): string {
  return Math.random().toString(36).substring(2, 6);
}

export default cellsReducer;
