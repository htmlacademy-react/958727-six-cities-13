import { ChangeEvent } from 'react';
import { capitalize } from '../../helpers/capitalize';

type LoginFormFieldProps = {
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    name: string;
}

const LoginFormField = (props: LoginFormFieldProps): JSX.Element | null => {

  const {onChange, value, name} = props;

  return (
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">E-mail</label>
      <input
        onChange={onChange}
        value={value}
        className="login__input form__input"
        type={name}
        name={name}
        placeholder={capitalize(name)}
        required
      />
    </div>
  );
};

LoginFormField.displayName = 'LoginFormField';

export default LoginFormField;
