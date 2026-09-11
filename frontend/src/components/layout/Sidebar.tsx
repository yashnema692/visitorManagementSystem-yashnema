import {
  Box,
  Button
} from "@mui/material";

import {
  Dashboard,
  PersonAdd
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: 220
        },
        borderRight: {
          xs: "none",
          md: "1px solid #ddd"
        },
        borderBottom: {
          xs: "1px solid #ddd",
          md: "none"
        },
        p: 2,
        display: "flex",
        flexDirection: {
          xs: "row",
          md: "column"
        },
        gap: 1
      }}
    >
      <Button
        fullWidth
        startIcon={<Dashboard />}
        variant={
          location.pathname === "/visitors"
            ? "contained"
            : "text"
        }
        onClick={() => navigate("/visitors")}
      >
        Visitors
      </Button>

      <Button
        fullWidth
        startIcon={<PersonAdd />}
        variant={
          location.pathname === "/visitors/add"
            ? "contained"
            : "text"
        }
        onClick={() =>
          navigate("/visitors/add")
        }
      >
        Add Visitor
      </Button>
    </Box>
  );
};

export default Sidebar;