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
      '# notesreact\n\nThis is an interactive coding environment. You can write JavaScript and React, see it executed live, and write comprehensive documentation using markdown.\n\n- Click any text cell to edit it.\n- Click **+ Code** to add a new code cell.\n- Call `show(<Component />)` to render React components to the preview window.',
  },
  {
    id: 'counter-plain-cell',
    type: 'code',
    content: `import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

show(<Counter />);`,
  },
  {
    id: 'counter-styled-cell',
    type: 'code',
    content: `const StyledCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        padding: '24px',
        maxWidth: '320px',
        margin: '16px auto',
        borderRadius: '12px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1e293b' }}>
        Styled Counter
      </h3>
      <div
        style={{
          fontSize: '40px',
          fontWeight: 700,
          margin: '12px 0',
          color: count >= 0 ? '#2563eb' : '#ef4444',
        }}
      >
        {count}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            background: '#2563eb',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

show(<StyledCounter />);`,
  },
];

const initialState: CellsState = {
  loading: true,
  error: null,
  order: [],
  data: {},
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
        state.loading = false;
        state.order = (action.payload || []).map(cell => cell.id);
        state.data = (action.payload || []).reduce((acc, cell) => {
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
        if (state.data[id]) {
          state.data[id].content = content;
        }
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter(cellId => cellId !== action.payload);
        return state;

      case ActionType.RESET_CELLS:
        state.order = [];
        state.data = {};
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
