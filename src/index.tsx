import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offer } from './mocks/offer';
import { reviews } from './mocks/rewiews';
import { Provider } from 'react-redux';
import { store } from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offer={offer}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
