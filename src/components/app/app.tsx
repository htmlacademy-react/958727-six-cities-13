import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { OfferCardType } from '../../types/offer-card';
import { ReviewType } from '../../types/review';
import { getAuthorizationStatus } from './../../store/user-process/selectors';
import { useAppSelector } from '../../hooks';


type AppProps = {
    offer: OfferCardType;
    reviews: ReviewType[];
}

function App({offer, reviews}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout />}
        >
          <Route
            index
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage authorizationStatus={authorizationStatus} />}
          />
          <Route
            path={`${AppRoute.Offer}`}
            element={
              <OfferPage
                offer={offer}
                reviews={reviews}
                authorizationStatus={authorizationStatus}
              />
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesPage />
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
