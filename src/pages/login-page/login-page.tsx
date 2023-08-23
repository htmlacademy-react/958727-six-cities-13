import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Cities } from '../../const';
import LoginForm from '../../components/login-form/login-form';
import { getRandomElementFromArray } from '../../helpers/get-random-array-element';
import { useAppDispatch } from '../../hooks';
import { MouseEvent } from 'react';
import { setCity } from '../../store/offers-data/offers-data';
import browserHistory from '../../browser-history';
import './login-page-module.scss';

type LoginPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function LoginPage(props: LoginPageProps): JSX.Element {
  const { authorizationStatus } = props;
  const citiesKeys = Object.values(Cities);
  const randomCity = getRandomElementFromArray<keyof typeof Cities>(citiesKeys);
  const dispatch = useAppDispatch();
  const handleCityClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setCity(Cities[randomCity]));
    browserHistory.push(AppRoute.Root);
  };

  return (
    authorizationStatus === AuthorizationStatus.NoAuth ?
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button type="button" className="locations__item-link" onClick={handleCityClick} >
                <span>{randomCity}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
      : <Navigate to={AppRoute.Root} />
  );

}

export default LoginPage;

