import {
  Alert,
  Box,
  Container,
  Snackbar,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import type {
  AppDispatch,
  RootState
} from "../../redux/store";

import {
  fetchVisitors,
  approveVisitor,
  rejectVisitor,
  deleteVisitor
} from "../../redux/slices/visitorSlice";

import VisitorTable from "../../components/visitors/VisitorTable";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import Loader from "../../components/common/Loader";

import type {
  Visitor
} from "../../types/visitor";

const VisitorList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    visitors,
    loading,
    error,
    actionLoading
  } = useSelector(
    (state: RootState) => state.visitors
  );

  const [deleteTarget, setDeleteTarget] =
    useState<Visitor | null>(null);

  const [notification, setNotification] =
    useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  const handleApprove = async (
    id: string
  ) => {
    const result = await dispatch(
      approveVisitor(id)
    );

    if (
      approveVisitor.fulfilled.match(result)
    ) {
      setNotification(
        "Visitor approved successfully."
      );
    }
  };

  const handleReject = async (
    id: string
  ) => {
    const result = await dispatch(
      rejectVisitor(id)
    );

    if (
      rejectVisitor.fulfilled.match(result)
    ) {
      setNotification(
        "Visitor rejected successfully."
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    const result = await dispatch(
      deleteVisitor(deleteTarget.id)
    );

    if (
      deleteVisitor.fulfilled.match(result)
    ) {
      setNotification(
        "Visitor deleted successfully."
      );

      setDeleteTarget(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold"
          }}
        >
          Visitor List
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Manage visitor requests and
          approvals.
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      <VisitorTable
        visitors={visitors}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={setDeleteTarget}
        actionLoading={actionLoading}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Visitor"
        message={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.name}?`
            : ""
        }
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={handleDelete}
        loading={actionLoading}
      />

      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={3000}
        onClose={() =>
          setNotification(null)
        }
        message={notification}
      />
    </Container>
  );
};

export default VisitorList;