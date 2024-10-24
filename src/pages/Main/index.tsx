import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthKeyFromLocalStorage } from '../../helpers/localStorage';
import { observer } from 'mobx-react-lite';
import store from '../../store';
import Header from '../../components/Header';
import Map from '../../components/Map';

const Main = observer(() => {
  const { trackerStore, authStore } = store;
  const navigate = useNavigate();
  const authKeyFromLocalStorage = getAuthKeyFromLocalStorage();

  useEffect(() => {
    if (!authKeyFromLocalStorage && !authStore.authKey) {
      navigate('/login');
    }
  }, [authKeyFromLocalStorage, navigate, authStore.authKey]);

  useEffect(() => {
    const fetchTrackers = () => {
      trackerStore.getTrackers();
      trackerStore.cleanupLostTrackers();
    };
    fetchTrackers();

    const interval = setInterval(fetchTrackers, 2000);

    return () => clearInterval(interval);
  }, [trackerStore]);

  return (
    <>
      <Header />
      <Map trackers={trackerStore.trackers} lostTrackers={trackerStore.lostTrackers} />
    </>
  );
});

export default Main;
