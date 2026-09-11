import {
  Alert,
  Container,
  Paper,
  Snackbar,
  Typography
} from "@mui/material";

import { useState } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { useNavigate } from "react-router-dom";

import type {
  AppDispatch,
  RootState
} from "../../redux/store";

import {
  addVisitor
} from "../../redux/slices/visitorSlice";

import VisitorForm from "../../components/visitors/VisitorForm";

import type {
  VisitorFormData
} from "../../utils/validation";

const AddVisitor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    actionLoading,
    error
  } = useSelector(
    (state: RootState) => state.visitors
  );

  const [notification, setNotification] =
    useState(false);

  const handleSubmit = async (
    data: VisitorFormData
  ) => {
    const result = await dispatch(
      addVisitor(data)
    );

    if (addVisitor.fulfilled.match(result)) {
      setNotification(true);

      setTimeout(() => {
        navigate("/visitors");
      }, 800);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1
        }}
      >
        Add Visitor
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 3
        }}
      >
        Enter visitor information below.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        <VisitorForm
          onSubmit={handleSubmit}
          loading={actionLoading}
        />
      </Paper>

      <Snackbar
        open={notification}
        autoHideDuration={2000}
        message="Visitor added successfully."
        onClose={() =>
          setNotification(false)
        }
      />
    </Container>
  );
};

export default AddVisitor;