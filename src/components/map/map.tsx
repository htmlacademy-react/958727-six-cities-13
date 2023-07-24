import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_PIN_DEFAULT, URL_PIN_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { LocationType, LocationItemType } from '../../types/location';

type MapProps = {
  mainLocation: LocationType;
  locations: LocationItemType[];
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
  const {mainLocation, locations, selectedPointId} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, mainLocation);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      locations.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude
        });

        marker
          .setIcon(
            selectedPointId !== undefined && item.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, selectedPointId, locations]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
