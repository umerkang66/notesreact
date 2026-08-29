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
    content: `# notesreact Interactive Notebook

Welcome to **notesreact** — an interactive coding environment for modern JavaScript, React, and Markdown.

### Key Features
- **Live React Execution**: Call \`show(<Component />)\` to render any React element or JS value directly.
- **On-Demand npm Imports**: Directly \`import axios from 'axios'\` or any npm library (automatically fetched via unpkg).
- **Tailwind CSS Ready**: Write standard Tailwind utility classes in your components.
- **Cumulative Scope**: Functions, variables, and imported packages declared in previous cells remain accessible in later cells.
- **Rich Markdown**: Click any text cell to edit notes, formulas, and documentation.`,
  },
  {
    id: 'counter-plain-cell',
    type: 'code',
    content: `import { useState } from 'react';

// 1. Plain React Counter
const PlainCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Plain Counter</h3>
      <p style={{ margin: '0 0 14px 0' }}>
        Current count: <strong>{count}</strong>
      </p>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)} style={{ margin: '0 8px' }}>
        Reset
      </button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

show(<PlainCounter />);`,
  },
  {
    id: 'counter-styled-cell',
    type: 'code',
    content: `import { useState } from 'react';

// 2. Styled Counter Card
const StyledCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
        maxWidth: '320px',
        margin: '16px auto',
        borderRadius: '16px',
        background: '#1e293b',
        color: '#f8fafc',
        border: '1px solid #334155',
        textAlign: 'center',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      }}
    >
      <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#94a3b8' }}>
        Interactive Metrics
      </h4>
      <div
        style={{
          fontSize: '44px',
          fontWeight: 800,
          margin: '12px 0',
          color: count >= 0 ? '#38bdf8' : '#f87171',
        }}
      >
        {count}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #475569',
            background: '#334155',
            color: '#f8fafc',
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
            borderRadius: '8px',
            border: '1px solid #475569',
            background: '#334155',
            color: '#94a3b8',
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
            borderRadius: '8px',
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
  {
    id: 'api-fetch-cell',
    type: 'code',
    content: `import { useState, useEffect } from 'react';
import axios from 'axios';

// 3. Fetching Data from Public API (JSONPlaceholder)
const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '24px', fontFamily: 'sans-serif', textAlign: 'center', color: '#64748b' }}>
        ⏳ Fetching live data from API...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: '#ef4444', fontFamily: 'sans-serif' }}>
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '440px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h4 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>Team Members</h4>
        <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0284c7', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
          {users.length} loaded
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {users.map(user => (
          <div
            key={user.id}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{user.name}</strong>
              <div style={{ fontSize: '11.5px', color: '#64748b' }}>{user.email}</div>
            </div>
            <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 500 }}>
              {user.company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

show(<UserDirectory />);`,
  },
  {
    id: 'tailwind-cell',
    type: 'code',
    content: `import 'tailwindcss';
import { useState } from 'react';

// 4. Modern Component with Tailwind CSS Styling
const TailwindCard = () => {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');

  const handleLike = () => {
    setLikes(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
            NR
          </div>
          <div>
            <h4 className="font-semibold text-white leading-tight">Live Node Monitor</h4>
            <p className="text-xs text-slate-400">Tailwind CSS Component</p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
          Active
        </span>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 my-4 bg-slate-800/60 p-1 rounded-lg">
        {['metrics', 'activity'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={\`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-colors \${
              activeTab === tab
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'metrics' ? (
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Bundler Speed</span>
            <p className="text-lg font-bold text-sky-400 mt-1">~12ms</p>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Memory Load</span>
            <p className="text-lg font-bold text-emerald-400 mt-1">Optimal</p>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 mb-5 text-xs text-slate-300">
          <p>⚡ Fast in-browser esbuild bundling with dynamic unpkg resolution.</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-slate-400 font-mono">
          {likes} total likes
        </span>
        <button
          onClick={handleLike}
          className={\`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all transform active:scale-95 \${
            isLiked
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }\`}
        >
          <span>{isLiked ? '💙' : '🤍'}</span>
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
      </div>
    </div>
  );
};

show(<TailwindCard />);`,
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
        state.order = defaultStarterCells.map(c => c.id);
        state.data = defaultStarterCells.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
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
