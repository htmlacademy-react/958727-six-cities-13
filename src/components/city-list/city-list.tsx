import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/offers-data/offers-data';
import { getCity } from '../../store/offers-data/selectors';
import cn from 'classnames';
import { Cities } from '../../const';

function CityList(): JSX.Element {

  const activeCity = useAppSelector(getCity);
  const cities = Object.values(Cities);
  const dispatch = useAppDispatch();

  const handleCityClick = (cityName: keyof typeof Cities) => (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    evt.preventDefault();
    dispatch(setCity(Cities[cityName]));
  };

  return (
    <ul className="locations__list tabs__list">
      {Array.from(cities).map((city) => (
        <li key={city} className="locations__item">
          <a
            onClick={handleCityClick(Cities[city])}
            className={cn(
              'locations__item-link',
              'tabs__item',
              {'tabs__item--active': activeCity === city})}
            href="#"
          >
            <span>{Cities[city]}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
