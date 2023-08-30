import { SortingOptions } from '../const';
import { PlaceCardType } from '../types/place-card';


export const sortCards = (cards: PlaceCardType[], option: string): PlaceCardType[] => {
  switch(option) {
    case SortingOptions.Popular:
      return cards;
    case SortingOptions.PriceHighToLow:
      cards.sort((a, b) => b.price - a.price);
      break;
    case SortingOptions.PriceLowToHigh:
      cards.sort((a, b) => a.price - b.price);
      break;
    case SortingOptions.TopRatedFirst:
      cards.sort((a, b) => b.rating - a.rating);
      break;
    default:
      return cards;
  }
  return cards;
};
