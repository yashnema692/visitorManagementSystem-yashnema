import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { useNavigate } from "react-router-dom";

import type {
  RootState,
  AppDispatch
} from "../../redux/store";

import {
  logout
} from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1
          }}
        >
          Visitor Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: {
                xs: "none",
                sm: "block"
              }
            }}
          >
            {user?.name}
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;