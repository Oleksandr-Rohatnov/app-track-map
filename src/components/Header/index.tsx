import React, { useCallback } from 'react';
import classes from './Header.module.scss';
import { observer } from 'mobx-react-lite';
import store from '../../store';
import { Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = observer(() => {
  const { authStore } = store;

  const handleLogout = useCallback(() => {
    authStore.logout();
  }, [authStore]);

  return (
    <header className={classes.root}>
      <div className={classes.leftContainer}>
        <img
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          alt="image"
          width={32}
          className={classes.logo}
        />
        <Typography
          color="#00648d"
          variant="h5"
          fontWeight="bolder"
          mb={0}
          alignContent="center"
          align="center"
          gutterBottom
          component="h1"
        >
          Track Map
        </Typography>
      </div>
      <Button
        variant="text"
        color="primary"
        sx={{ fontWeight: 'bold' }}
        endIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  );
});

export default Header;
