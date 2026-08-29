import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/main.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/theme-context';
import Header from './components/header';
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
    <ThemeProvider>
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <CellList />
        </main>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
