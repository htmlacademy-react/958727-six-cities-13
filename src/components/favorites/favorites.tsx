import { Link } from 'react-router-dom';
import { PlaceCardType } from '../../types/place-card';
import PlaceCard from '../place-card/place-card';
import { AppRoute, Cities } from '../../const';
import Layout from '../layout/layout';
import Footer from '../footer/footer';

type FavoritesProps = {
    cards: PlaceCardType[];
}

type citiesOffers = {
  [key in Cities]?: PlaceCardType[];
}

function Favorites({cards}: FavoritesProps): JSX.Element | null {
  if (!cards) {
    return null;
  }
  const cardNames = cards?.reduce((acc: citiesOffers, currentCard) => {
    const cityName = currentCard.city.name;
    if (cityName in acc) {
      acc[cityName]?.push(currentCard);
    } else {
      acc[cityName] = [currentCard];
    }
    return acc;
  }, {});
  return (
    <Layout>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                Object.entries(cardNames).map(([cityKey, cityValue]) => (
                  <li key={cityKey} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={AppRoute.Root}>
                          <span>{cityKey}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {cityValue.map((card) => (
                        <PlaceCard
                          key={card.id}
                          blockName='favorites'
                          cardData={card}
                          isPremium={card.isPremium}
                        />
                      )
                      )}
                    </div>
                  </li>
                ))

              }
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </Layout>
  );
}

export default Favorites;

