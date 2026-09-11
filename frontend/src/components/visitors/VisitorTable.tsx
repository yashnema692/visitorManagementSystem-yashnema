import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography
} from "@mui/material";

import type { Visitor } from "../../types/visitor";

import VisitorStatus from "./VisitorStatus";

interface VisitorTableProps {
  visitors: Visitor[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (visitor: Visitor) => void;
  actionLoading: boolean;
}

const VisitorTable = ({
  visitors,
  onApprove,
  onReject,
  onDelete,
  actionLoading
}: VisitorTableProps) => {
  if (visitors.length === 0) {
    return (
      <Paper sx={{ p: 4 }}>
        <Typography
          sx={{
            textAlign: "center"
          }}
          color="text.secondary"
        >
          No visitors found.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto"
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Visit Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>{visitor.name}</TableCell>

              <TableCell>{visitor.phone}</TableCell>

              <TableCell>{visitor.unit}</TableCell>

              <TableCell>{visitor.visitDate}</TableCell>

              <TableCell>
                <VisitorStatus status={visitor.status} />
              </TableCell>

              <TableCell>
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row"
                  }}
                  spacing={1}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={
                      actionLoading ||
                      visitor.status === "approved"
                    }
                    onClick={() =>
                      onApprove(visitor.id)
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    disabled={
                      actionLoading ||
                      visitor.status === "rejected"
                    }
                    onClick={() =>
                      onReject(visitor.id)
                    }
                  >
                    Reject
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    disabled={actionLoading}
                    onClick={() =>
                      onDelete(visitor)
                    }
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitorTable;