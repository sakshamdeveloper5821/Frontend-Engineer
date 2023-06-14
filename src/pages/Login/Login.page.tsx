import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import users from "../../__mock__/userMock.json";
import { useStore } from "../../context";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify"

interface loginType {
  email: string,
  password: string,
  rememberMe?: boolean 
}

interface userTypes {
  email: string,
  password: string,
  jwt?: string 
}

function SignIn() {
  const { dispatch }= useStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values: loginType) => {
      const { email, password } = values;
      const userDetails = users.find(
        (data: userTypes) => data.email === email && data.password === password
      );

      if (userDetails) {
        const decoded :  {email: string}= jwtDecode(userDetails?.jwt)
        dispatch({
          type: "LOGGIN",
          payload: { email: decoded?.email , token: userDetails?.jwt },
        });
        navigate("/todo-list");
      } else {
        toast("Something Wrong With Password Or Email")
      }
    },
  });

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
             // name="email"
              autoComplete="email"
              autoFocus
              type="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={<>{formik.touched.email && formik.errors.email}</>}
            />
            <TextField
              margin="normal"
              fullWidth
              //name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              error={
                formik.touched.password && formik.errors.password ? true : false
              }
              helperText={<>{formik.touched.password && formik.errors.password}</>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...formik.getFieldProps("rememberMe")}
                  checked={formik.values.rememberMe}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
