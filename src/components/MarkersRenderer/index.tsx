import React, { useMemo } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { observer } from 'mobx-react-lite';
import { TrackerT } from '../../types/tracker';
import Tracker from '../Tracker';
import MarkerClusterGroup from 'react-leaflet-cluster';

type PropsT = {
  trackers?: TrackerT[];
  lostTrackers?: TrackerT[];
};

const MarkersRenderer = observer(({ trackers, lostTrackers }: PropsT) => {
  const map = useMap();

  const visibleTrackers = useMemo(
    () => trackers?.filter((item) => map.getBounds().contains(item.coordinates)),
    [trackers]
  );

  const visibleLostTrackers = useMemo(
    () => lostTrackers?.filter((item) => map.getBounds().contains(item.coordinates)),
    [lostTrackers]
  );

  const enableClusterView = useMemo(
    () => (visibleTrackers?.length || 0) + (visibleLostTrackers?.length || 0) > 20,
    [visibleTrackers, lostTrackers]
  );

  return enableClusterView ? (
    <MarkerClusterGroup>
      {visibleTrackers?.map((tracker) => <Tracker tracker={tracker} key={tracker.id} />)}
      {visibleLostTrackers?.map((tracker) => <Tracker tracker={tracker} key={tracker.id + 'L'} isLost />)}
    </MarkerClusterGroup>
  ) : (
    <>
      {visibleTrackers?.map((tracker) => <Tracker tracker={tracker} key={tracker.id} />)}
      {visibleLostTrackers?.map((tracker) => <Tracker tracker={tracker} key={tracker.id + 'L'} isLost />)}
    </>
  );
});

export default MarkersRenderer;
