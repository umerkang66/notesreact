export const startingInput = [
  {
    content:
      '# notesreact\n\nThis is an interactive coding environment. You can write JavaScript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell, including this one to edit the cell.\n- The code in each editor is all joined together in one file, if you have define a variable in cell #1, you can refer to it in any following cell.\n- You can show any react component, string, number or anything else by calling the ```show()``` function. This function is build into this environment. Call show multiple times to show multiple values.\n- Reorder or delete cells using the buttons on the top right.\n- Add new cells by hovering on the divider between cells.',
    id: 'intro-cell',
    type: 'text',
  },
  {
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
    id: 'counter-plain-cell',
    type: 'code',
  },
  {
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
          color: count >= 0 ? '#4f46e5' : '#ef4444',
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
            background: '#4f46e5',
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
    id: 'counter-styled-cell',
    type: 'code',
  },
];
