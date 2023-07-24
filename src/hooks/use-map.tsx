import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { LocationType } from '../components/types/location';
import { LAYER_ATTRIBUTION_LINK, LAYER_TYPE_URL } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: LocationType
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const {latitude, longitude, zoom} = location;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: zoom
      });

      const layer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: LAYER_TYPE_URL
        });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, latitude, longitude, zoom]);

  return map;
}

export default useMap;
