import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchLogin } from '../../store/api-actions';
import { validateEmail, validatePassword } from '../../helpers/token';

function LoginForm(): JSX.Element | null {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const isSubmitDisabled = !validateEmail(emailValue) || !validatePassword(passwordValue);
  const dispatch = useAppDispatch();

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(evt.target.value);
  };
  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(evt.target.value.replaceAll(' ', ''));
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(fetchLogin({login: emailValue, password: passwordValue}));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          onChange={handleEmailChange}
          value={emailValue}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          onChange={handlePasswordChange}
          value={passwordValue}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={isSubmitDisabled}
      >
      Sign in
      </button>
    </form>
  );
}

export default LoginForm;
