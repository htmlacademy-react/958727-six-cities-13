import { MemoizedFooter } from '../../components/footer/memoized-footer';
import { MemoizedPlaceCard } from '../../components/place-card/memoized-place-card';
import { PlaceCardType } from '../../components/types/place-card';

type FavoritesPageProps = {
  cards: PlaceCardType[];
}

function FavoritesPage(props: FavoritesPageProps): JSX.Element {
  const { cards } = props;

  const cardNames = Array.from(new Set(cards.reduce((acc: string[], cur) => {
    acc.push(cur.city.name);
    return acc;
  }, [])));
  return (
    <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                cardNames.map((name) => (
                  <li key={name} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{name}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cards.map((card) => card.city.name === name ? (
                        <MemoizedPlaceCard
                          key={card.id}
                          blockName='favorites'
                          cardData={card}
                          isPremium={card.isPremium}
                        />
                      ) : null
                      )}
                    </div>
                  </li>
                ))

              }
            </ul>
          </section>
        </div>
      </main>
      <MemoizedFooter/>
    </>
  );
}

export default FavoritesPage;
