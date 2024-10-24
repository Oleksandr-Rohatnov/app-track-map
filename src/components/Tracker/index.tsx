import React from 'react';
import { renderToString } from 'react-dom/server';
import { Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { observer } from 'mobx-react-lite';
import { TrackerT } from '../../types/tracker';
import NavigationIcon from '@mui/icons-material/Navigation';
import L from 'leaflet';
import { Grid2 as Grid, List, ListItem } from '@mui/material';

type PropsT = {
  tracker: TrackerT;
  isLost?: boolean;
};

const Tracker = observer(({ tracker, isLost }: PropsT) => {
  const icon = renderToString(
    <div
      style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <NavigationIcon
        style={{
          color: isLost ? '#717171' : '#0063ab',
          transformOrigin: 'center',
          transform: `rotate(${tracker.bearing}deg)`
        }}
      />
    </div>
  );

  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: icon,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  return (
    <Marker key={tracker.id} position={tracker.coordinates} icon={customIcon}>
      <Tooltip>
        <Grid>
          <List disablePadding>
            {isLost && (
              <ListItem divider disablePadding>
                Lost
              </ListItem>
            )}
            <ListItem disablePadding>ID: {tracker.id}</ListItem>
            <ListItem disablePadding>Coordinates: {tracker.coordinates.join(', ')}</ListItem>
            <ListItem disablePadding>Bearing: {tracker.bearing}&deg;</ListItem>
            <ListItem disablePadding>
              Last update: {new Date(tracker.lastUpdate).toLocaleString()}
            </ListItem>
          </List>
        </Grid>
      </Tooltip>
    </Marker>
  );
});

export default Tracker;
