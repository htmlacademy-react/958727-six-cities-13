import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_PIN_DEFAULT, URL_PIN_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { CityType } from '../types/city';
import { PlaceCardType } from '../types/place-card';

type MapProps = {
  city: CityType;
  cards: PlaceCardType[];
  selectedPointId: string | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_PIN_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, cards, selectedPointId} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      cards.forEach((card) => {
        const marker = new Marker({
          lat: card.location.latitude,
          lng: card.location.longitude
        });

        marker
          .setIcon(
            selectedPointId !== undefined && card.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, cards, selectedPointId]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
