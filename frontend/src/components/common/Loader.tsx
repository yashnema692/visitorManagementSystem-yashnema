import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader = ({
  fullScreen = false
}: LoaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: fullScreen ? "100vh" : "200px"
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;