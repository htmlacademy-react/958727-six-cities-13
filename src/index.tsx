import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/index';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAuth } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchAuth());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer limit={1} position='bottom-left'/>
      <App/>
    </Provider>
  </React.StrictMode>
);
