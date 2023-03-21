import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/app';
import { store } from './store';
import HistoryRouter from './components/history-router/histrory-router';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>
);
