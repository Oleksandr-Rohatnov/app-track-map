import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { observer } from 'mobx-react-lite';
import classes from './Map.module.scss';
import { TrackerT } from '../../types/tracker';
import CurrentPosition from '../CurrentPosition';
import MarkersRenderer from '../MarkersRenderer';

type PropsT = {
  trackers?: TrackerT[];
  lostTrackers?: TrackerT[];
};

const Map = observer(({ trackers, lostTrackers }: PropsT) => {
  const defaultPosition: LatLngTuple = [50.4501, 30.5234];
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCurrentPosition([latitude, longitude]);
    });
  }, []);

  return (
    <MapContainer
      className={classes.map}
      center={currentPosition || defaultPosition}
      zoom={6}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkersRenderer trackers={trackers} lostTrackers={lostTrackers} />
      {currentPosition && <CurrentPosition position={currentPosition} />}
    </MapContainer>
  );
});

export default Map;
