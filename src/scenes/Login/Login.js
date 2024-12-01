  import React from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import { Formik } from 'formik';
import * as yup from 'yup';
import { login } from '../../components/Api/api';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values);
      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={colors.primary[400]}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            sx={{
              p: 4,
              bgcolor: colors.primary[500],
              borderRadius: 2,
              width: '100%',
              maxWidth: 400,
            }}
          >
            <Typography variant="h2" color={colors.grey[100]} mb={3}>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="filled"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="filled"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                bgcolor: colors.greenAccent[600],
                color: colors.grey[100],
                '&:hover': {
                  bgcolor: colors.greenAccent[700],
                }
              }}
            >
              Sign In
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
