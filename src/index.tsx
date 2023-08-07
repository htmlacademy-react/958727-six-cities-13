import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offer } from './mocks/offer';
import { reviews } from './mocks/rewiews';
import { Provider } from 'react-redux';
import { store } from './store/index';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        offer={offer}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
