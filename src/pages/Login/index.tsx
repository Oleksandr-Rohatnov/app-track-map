import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import classes from './Login.module.scss';
import { observer } from 'mobx-react-lite';
import store from '../../store';
import { useNavigate } from 'react-router-dom';

const Login = observer(() => {
  const navigate = useNavigate();
  const { authStore } = store;

  useEffect(() => {
    authStore.logout();
  }, []);

  return (
    <Container maxWidth="xs" className={classes.container}>
      <img
        src={`${process.env.PUBLIC_URL}/logo.svg`}
        alt="image"
        width={100}
        className={classes.logo}
      />
      <Typography
        color="#00648d"
        variant="h5"
        fontWeight="bolder"
        align="center"
        mb={8}
        gutterBottom
        component="text"
      >
        Track Map
      </Typography>
      <Typography
        color="#00648d"
        fontWeight="bolder"
        variant="h4"
        align="center"
        gutterBottom
        component="h1"
      >
        Login
      </Typography>
      <Formik
        initialValues={{ key: '' }}
        onSubmit={async ({ key }, { setSubmitting, setFieldError }) => {
          const isSuccess = await authStore.login(key);
          setSubmitting(false);
          if (isSuccess) {
            navigate('/');
          } else {
            setFieldError('key', 'Invalid key');
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              variant="outlined"
              margin="normal"
              label="Key"
              placeholder="Enter Key"
              name="key"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.key}
              error={touched.key && Boolean(errors.key)}
              helperText={touched.key && errors.key}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting || !values.key}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  );
});

export default Login;
