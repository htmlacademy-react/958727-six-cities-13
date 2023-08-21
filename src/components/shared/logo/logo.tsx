import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';

type LogoProps = {
  width: number;
  height: number;
  blockName: string;
}

function Logo(props: LogoProps): JSX.Element {
  const { width, height, blockName } = props;
  return (
    <NavLink
      to={AppRoute.Root}
      className={({ isActive }) =>
        isActive ?
          `${blockName}__logo-link ${blockName}__logo-link--active`
          : `${blockName}__logo-link`}
    >
      <img
        className={`${blockName}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </NavLink>
  );
}

export default Logo;

