import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { PlaceCardType } from '../types/place-card';
import { OfferCardType } from '../types/offer-card';
import { ReviewType } from '../types/review';


type AppProps = {
    cards: PlaceCardType[];
    offer: OfferCardType;
    reviews: ReviewType[];
}

function App({cards, offer, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout/>}
        >
          <Route
            index
            element={<MainPage cards={cards} />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage authorizationStatus={AuthorizationStatus.Auth}/>}
          />
          <Route
            path={`${AppRoute.Offer}`}
            element={
              <OfferPage
                cards={cards}
                offer={offer}
                reviews={reviews}
                authorizationStatus={AuthorizationStatus.Auth}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage cards={cards}/>
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
