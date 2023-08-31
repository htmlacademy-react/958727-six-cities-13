import { address, name, random, datatype, commerce, system } from 'faker';
import { PlaceCardType } from '../../types/place-card';

export const createFakeOffers = (isFavorite = false): PlaceCardType[] => new Array(5).fill(null).map(
  () =>
    ({
      id: datatype.uuid(),
      title: name.title(),
      type: random.word(),
      price: +commerce.price(),
      city: {
        name: address.cityName(),
        location: {
          latitude: +address.latitude(),
          longitude: +address.longitude(),
          zoom: datatype.number(12),
        },
      },
      location: {
        latitude: +address.latitude(),
        longitude: +address.longitude(),
        zoom: datatype.number(12),
      },
      isFavorite: isFavorite ? isFavorite : datatype.boolean(),
      isPremium: datatype.boolean(),
      rating: datatype.number(3),
      previewImage: system.filePath(),
    } as PlaceCardType)
);
