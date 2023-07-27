import { useState, useEffect } from 'react';
import cn from 'classnames';
import { SortingOptions } from '../../const';

import { sortCards } from '../../helpers/sortCards';
import { setOffers } from '../../store/offers-data/offers-data';
import { PlaceCardType } from '../../types/place-card';
import { useAppDispatch } from '../../hooks';

type PlaceCardListProps = {
  cards: PlaceCardType[];
}

function Sorting({cards}: PlaceCardListProps): JSX.Element {

  const [activeOption, setActiveOption] = useState(SortingOptions.popular);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenuButtonClick = (): void => {
    setIsMenuOpened((prev) => !prev);
  };

  const handleOptionClick = (option: SortingOptions) => () => {
    const sortedCards = sortCards(cards, option);
    dispatch(setOffers(sortedCards));
    setActiveOption(option);
    setIsMenuOpened(false);
  };

  const handleDocumentClick = (evt: MouseEvent) => {
    if (evt.target instanceof Element) {
      const item = evt.target.closest('.places__sorting');
      if (!item && isMenuOpened) {
        setIsMenuOpened(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={handleMenuButtonClick} className="places__sorting-type" tabIndex={0}>
        {activeOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={cn(
        'places__options',
        'places__options--custom',
        {'places__options--opened': isMenuOpened})}
      >
        {
          Object.values(SortingOptions).map((option) => (
            <li
              key={option}
              onClick={handleOptionClick(option)}
              className={cn(
                'places__option',
                {'places__option--active': option === activeOption}
              )}
              tabIndex={0}
            >
              {option}
            </li>
          )

          )
        }
      </ul>
    </form>
  );
}

export default Sorting;
