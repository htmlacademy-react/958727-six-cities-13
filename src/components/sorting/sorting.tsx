import { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import { SortingOptions } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setFilterType } from '../../store/offers-data/offers-data';

type SortingProps = {
  filter: SortingOptions;
}

function Sorting({filter}: SortingProps): JSX.Element {

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenuButtonClick = (): void => {
    setIsMenuOpened((prev) => !prev);
  };

  const createHandleOptionClick = (option: SortingOptions) => () => {
    dispatch(setFilterType(option));
    setIsMenuOpened(false);
  };

  const handleDocumentClick = useCallback((evt: MouseEvent) => {
    if (evt.target instanceof Element) {
      const item = evt.target.closest('.places__sorting');
      if (!item && isMenuOpened) {
        setIsMenuOpened(false);
      }
    }
  }, [isMenuOpened]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={handleMenuButtonClick} className="places__sorting-type" tabIndex={0}>
        {filter}
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
              onClick={createHandleOptionClick(option)}
              className={cn(
                'places__option',
                {'places__option--active': option === filter}
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
