import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchLogin } from '../../store/api-actions';
import { validateEmail, validatePassword } from '../../helpers/token';
import LoginFormField from './login-form-field';

function LoginForm(): JSX.Element | null {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const isSubmitDisabled = !validateEmail(emailValue) || !validatePassword(passwordValue);
  const dispatch = useAppDispatch();

  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setEmailValue(event.target.value);
  }, []);
  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setPasswordValue(event.target.value.replaceAll(' ', ''));
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(fetchLogin({login: emailValue, password: passwordValue}));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
      <LoginFormField onChange={handleEmailChange} value={emailValue} name="email"/>
      <LoginFormField onChange={handlePasswordChange} value={passwordValue} name="password"/>
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
