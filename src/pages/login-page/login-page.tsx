import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginForm from '../../components/login-form/login-form';

type LoginPageProps = {
  authorizationStatus: AuthorizationStatus;
}

function LoginPage(props: LoginPageProps): JSX.Element {
  const { authorizationStatus } = props;
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
              <Link to={AppRoute.Root} className="locations__item-link" >
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
      : <Navigate to={AppRoute.Root} />
  );

}

export default LoginPage;

