import React from 'react';
import Map, { Marker } from 'react-map-gl';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  locations: Location[];
}

const MapComponent = ({ locations }: MapComponentProps) => {
  return (
    <Map
      initialViewState={{
        latitude: -9.4438,
        longitude: 147.1803,
        zoom: 10
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {locations.map(loc => (
        <Marker key={loc.id} longitude={loc.longitude} latitude={loc.latitude} anchor="bottom" >
          <div style={{color: 'red', fontSize: '24px'}}>📍</div>
        </Marker>
      ))}
    </Map>
  );
};

export default MapComponent;
