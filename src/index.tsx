import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import smoothscroll from 'smoothscroll-polyfill';
import App from './App';
import './index.css';
import ConnectedIntlProvider from './modules/intl/component/ConnectedIntlProvider';
import { setLocale } from './modules/intl/redux/intlReducer';
import configureStore, { history } from './redux/configureStore';
import reportWebVitals from './reportWebVitals';

smoothscroll.polyfill();

const { store, persistor } = configureStore({});

store.dispatch(setLocale('vi'));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ConnectedIntlProvider>
          <App />
        </ConnectedIntlProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
