import api from "./axios";
import type {
  Visitor,
  CreateVisitorData
} from "../types/visitor";

export const getVisitorsApi = async (): Promise<Visitor[]> => {
  const response = await api.get<Visitor[]>("/visitors");

  return response.data;
};

export const getVisitorByIdApi = async (
  id: string
): Promise<Visitor> => {
  const response = await api.get<Visitor>(`/visitors/${id}`);

  return response.data;
};

export const createVisitorApi = async (
  data: CreateVisitorData
): Promise<Visitor> => {
  const response = await api.post<Visitor>("/visitors", {
    ...data,
    status: "pending"
  });

  return response.data;
};

export const updateVisitorApi = async (
  id: string,
  data: Partial<CreateVisitorData>
): Promise<Visitor> => {
  const response = await api.patch<Visitor>(
    `/visitors/${id}`,
    data
  );

  return response.data;
};

export const deleteVisitorApi = async (
  id: string
): Promise<void> => {
  await api.delete(`/visitors/${id}`);
};

export const approveVisitorApi = async (
  id: string
): Promise<Visitor> => {
  const response = await api.patch<Visitor>(
    `/visitors/${id}/approve`
  );

  return response.data;
};

export const rejectVisitorApi = async (
  id: string
): Promise<Visitor> => {
  const response = await api.patch<Visitor>(
    `/visitors/${id}/reject`
  );

  return response.data;
};