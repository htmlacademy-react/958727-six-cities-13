import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { offer } from './mocks/offer';
import { reviews } from './mocks/rewiews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cards={offers}
      offer={offer}
      reviews={reviews}
    />
  </React.StrictMode>
);
