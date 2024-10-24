import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import routes from './config/routes';
import store from './store';
import { getAuthKeyFromLocalStorage } from './helpers/localStorage';

function App() {
  const { authStore } = store;
  const authKeyFromLocalStorage = getAuthKeyFromLocalStorage();

  useEffect(() => {
    if (!authStore.authKey && authKeyFromLocalStorage) {
      authStore.authKey = authKeyFromLocalStorage;
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </HashRouter>
  );
}

export default App;
