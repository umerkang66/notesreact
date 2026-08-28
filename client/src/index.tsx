import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './state';

// Suppress benign ResizeObserver loop error overlay from react-resizable / monaco-editor
window.addEventListener('error', (e: ErrorEvent) => {
  if (
    e.message &&
    (e.message.includes('ResizeObserver') ||
      e.message.includes('ResizeObserver loop completed with undelivered notifications') ||
      e.message.includes('ResizeObserver loop limit exceeded'))
  ) {
    e.stopImmediatePropagation();
  }
});

const App = () => {
  return (
    <div>
      <CellList />
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

