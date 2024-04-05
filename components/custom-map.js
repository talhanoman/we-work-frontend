import React, { useCallback, useMemo, useState } from 'react';
import Map, {
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FiMinus, FiPlus } from 'react-icons/fi';
import MapLocationMarker from './map-location-marker';
import CITIES from '../data/cities.json';
import Image from 'next/image';

const MAPBOX_TOKEN = process?.env?.MapboxAccessToken;

function CustomMap({
  mapHeight,
  borderRadius = 'rounded-2xl',
  shadow = 'shadow-md',
}) {
  const [viewState, setViewState] = React.useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    // pitch: 50,
  });
  const [mapStyle, setMapStyle] = useState(false);

  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor='top'
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
          // color="red"
        >
          <MapLocationMarker />
        </Marker>
      )),
    []
  );

  return (
    <div className={`relative w-full h-full ${borderRadius} ${shadow}`}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{
          width: '100%',
          height: mapHeight,
          borderRadius:
            borderRadius == 'rounded-t-2xl' ? '16px 16px 0 0' : '16px',
          border: '1px solid #E2E2E2',
        }}
        mapStyle={
          mapStyle
            ? 'mapbox://styles/mapbox/satellite-v9'
            : 'mapbox://styles/mapbox/light-v11'
        }
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {pins}

        {popupInfo && (
          <Popup
            anchor='bottom'
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            offsetTop={10}
            offsetLeft={10}
            tipSize={5}
            className='w-[195px]'
          >
            <div className='w-full flex flex-col gap-1 items-center justify-center px-4 py-3 rounded-lg shadow-lg'>
              <h5 className='text-xs-semibold text-center text-gray-700'>
                {popupInfo.city} | {popupInfo.state}
              </h5>
              <h6 className='text-xs-regular text-center text-gray-500'>
                35 Eastcheap, London EC3M 1DE, UK
              </h6>
            </div>
          </Popup>
        )}
        <NavigationControl showCompass={false} position='top-right' />
      </Map>
      <div className='absolute top-6 left-6 flex items-center rounded-lg bg-white border border-gray-300 shadow-sm'>
        <button
          className={`flex items-center justify-center ${
            mapStyle ? 'bg-white text-sm-medium' : 'bg-gray-50 text-sm-bold'
          } text-gray-700 px-4 py-2.5 border-r rounded-l-lg border-gray-300`}
          onClick={(e) => {
            e.preventDefault();
            setMapStyle(false);
          }}
        >
          Map
        </button>
        <button
          className={`flex items-center justify-center ${
            mapStyle ? 'bg-gray-50 text-sm-bold' : 'bg-white text-sm-medium'
          } text-gray-700 px-4 py-2.5 rounded-r-lg border-gray-300`}
          onClick={(e) => {
            e.preventDefault();
            setMapStyle(true);
          }}
        >
          Satellite
        </button>
      </div>
    </div>
  );
}

export default CustomMap;
