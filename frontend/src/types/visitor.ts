export type VisitorStatus = "pending" | "approved" | "rejected";

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
  status: VisitorStatus;
}

export interface CreateVisitorData {
  name: string;
  phone: string;
  unit: string;
  visitDate: string;
}