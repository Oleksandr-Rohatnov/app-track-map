import React from 'react';
import { renderToString } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { observer } from 'mobx-react-lite';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import L, { LatLngTuple } from 'leaflet';

type PropsT = {
  position: LatLngTuple;
};

const CurrentPosition = observer(({ position }: PropsT) => {
  const icon = renderToString(
    <div
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <GpsFixedIcon style={{ color: '#800000' }} />
    </div>
  );

  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: icon,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return <Marker position={position} icon={customIcon} />;
});

export default CurrentPosition;
