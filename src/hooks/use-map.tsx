import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { LocationType } from '../types/location';
import { LAYER_ATTRIBUTION, LAYER_TYPE_URL } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: LocationType
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const {latitude, longitude, zoom} = location;

  useEffect(() => {

    let isMounted = true;
    if (isMounted) {
      if (mapRef.current !== null && !isRenderedRef.current) {
        const instance = new Map(mapRef.current, {
          center: {
            lat: latitude,
            lng: longitude
          },
          zoom: zoom
        });
        const layer = new TileLayer(LAYER_TYPE_URL,
          {
            attribution: LAYER_ATTRIBUTION
          });

        instance.addLayer(layer);

        setMap(instance);
        isRenderedRef.current = true;
      } else {
        map?.setView([latitude, longitude], zoom);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [mapRef, latitude, longitude, zoom, map]);

  return map;
}

export { useMap };
