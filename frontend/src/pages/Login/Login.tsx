import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from "@mui/material";

import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { useNavigate } from "react-router-dom";

import type {
  FormEvent
} from "react";

import type {
  AppDispatch,
  RootState
} from "../../redux/store";

import {
  loginUser
} from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    loading,
    error,
    isAuthenticated
  } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState(
    "admin@example.com"
  );

  const [password, setPassword] = useState(
    "admin123"
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/visitors");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password
      })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate("/visitors");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        p: 2
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 1
            }}
          >
            Visitor Management
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 4
            }}
          >
            Admin Login
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              sx={{ mb: 3 }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mt: 3
            }}
          >
            Demo: admin@example.com / admin123
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;