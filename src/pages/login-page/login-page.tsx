import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Cities } from '../../const';
import LoginForm from '../../components/login-form/login-form';
import { getRandomElementFromArray } from '../../helpers/get-random-array-element';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/offers-data/offers-data';
import Layout from '../../components/layout/layout';

type LoginPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function LoginPage(props: LoginPageProps): JSX.Element {
  const { authorizationStatus } = props;
  const citiesKeys = Object.values(Cities);
  const randomCity = getRandomElementFromArray<keyof typeof Cities>(citiesKeys);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const handleCityClick = () => {
    dispatch(setCity(Cities[randomCity]));
  };

  return (
    <Layout className='page--gray page--login'>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Root} className="locations__item-link" onClick={handleCityClick} >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );

}

export default LoginPage;

