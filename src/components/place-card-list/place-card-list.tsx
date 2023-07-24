import { MemoizedPlaceCard } from '../place-card/memoized-place-card';
import { PlaceCardType } from '../../types/place-card';

type PlaceCardListProps = {
    className?: string;
    cards: PlaceCardType[];
    cardBlockName?: string;
    onMouseEnter: (id: string) => void;
    onMouseLeave: () => void;
  }

function PlaceCardList(props: PlaceCardListProps): JSX.Element {
  const {
    cardBlockName,
    className = '',
    cards,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <div className={className}>
      {
        cards.map((card: PlaceCardType) => (
          <MemoizedPlaceCard
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            isPremium={card.isPremium}
            key={card.id}
            cardData={card}
            blockName={cardBlockName}
          />
        ))
      }
    </div>
  );
}

export default PlaceCardList;
