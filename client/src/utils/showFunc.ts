export const showFunc = (): string => {
  return `
    import _React from 'react';
    import _ReactDOM from 'react-dom/client';
    var show = (value) => {
      const _root = document.querySelector('#root');
      if (!_root) return;

      // If a component function is passed directly (e.g. show(Counter))
      if (typeof value === 'function') {
        try {
          value = _React.createElement(value);
        } catch (e) {}
      }

      if (typeof value === 'object' && value !== null) {
        if (value.$$typeof) {
          // JSX ELEMENT
          _root.innerHTML = '';
          if (_ReactDOM && _ReactDOM.createRoot) {
            const root = _ReactDOM.createRoot(_root);
            root.render(value);
          } else if (_ReactDOM && _ReactDOM.default && _ReactDOM.default.createRoot) {
            const root = _ReactDOM.default.createRoot(_root);
            root.render(value);
          } else if (_ReactDOM && _ReactDOM.render) {
            _ReactDOM.render(value, _root);
          } else if (_ReactDOM && _ReactDOM.default && _ReactDOM.default.render) {
            _ReactDOM.default.render(value, _root);
          }
        } else {
          _root.innerHTML = JSON.stringify(value, null, 2);
        }
      } else { 
        _root.innerHTML = value;
      }
    };
  `;
};

export const showFuncNoop = (): string => 'var show = () => {};';
