import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/offers-data/offers-data';
import { getCity } from '../../store/offers-data/selectors';
import cn from 'classnames';
import { PlaceCardType } from '../../types/place-card';
import { INITIAL_CITY } from '../../const';

type CityListProps = {
    cards: PlaceCardType[];
}

function CityList({ cards }: CityListProps): JSX.Element {

  const activeCity = useAppSelector(getCity);
  const cities = new Set(cards.map((card) => card.city.name));
  cities.add(INITIAL_CITY);
  const dispatch = useAppDispatch();

  const handleCityClick = (cityName: string) => (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    evt.preventDefault();
    dispatch(setCity(cityName));
  };

  return (
    <ul className="locations__list tabs__list">
      {Array.from(cities).map((city) => (
        <li key={city} className="locations__item">
          <a
            onClick={handleCityClick(city)}
            className={cn(
              'locations__item-link',
              'tabs__item',
              {'tabs__item--active': activeCity === city})}
            href="#"
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
