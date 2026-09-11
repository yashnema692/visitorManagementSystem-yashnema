import {
  Chip
} from "@mui/material";

import type {
  VisitorStatus as Status
} from "../../types/visitor";

interface VisitorStatusProps {
  status: Status;
}

const VisitorStatus = ({
  status
}: VisitorStatusProps) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      color: "warning"
    },
    approved: {
      label: "Approved",
      color: "success"
    },
    rejected: {
      label: "Rejected",
      color: "error"
    }
  } as const;

  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
    />
  );
};

export default VisitorStatus;