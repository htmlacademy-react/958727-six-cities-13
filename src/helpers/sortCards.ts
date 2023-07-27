import { SortingOptions } from '../const';
import { PlaceCardType } from '../types/place-card';


export const sortCards = (cards: PlaceCardType[], option: string): PlaceCardType[] => {
  const cardsCopy = [...cards];
  switch(option) {
    case SortingOptions.popular:
      return cards;
    case SortingOptions.priceHighToLow:
      cardsCopy.sort((a, b) => b.price - a.price);
      break;
    case SortingOptions.priceLowToHigh:
      cardsCopy.sort((a, b) => a.price - b.price);
      break;
    case SortingOptions.topRatedFirst:
      cardsCopy.sort((a, b) => b.rating - a.rating);
      break;
    default:
      return cards;
  }
  return cardsCopy.sort((a, b) => {
    if (a.city > b.city) {
      return -1;
    }
    if (b.city > a.city) {
      return 1;
    }
    return 0;
  });
};
