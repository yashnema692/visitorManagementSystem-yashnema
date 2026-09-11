import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type {
  Visitor,
  CreateVisitorData
} from "../../types/visitor";

import {
  getVisitorsApi,
  createVisitorApi,
  deleteVisitorApi,
  approveVisitorApi,
  rejectVisitorApi
} from "../../api/visitorApi";

interface VisitorState {
  visitors: Visitor[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
}

const initialState: VisitorState = {
  visitors: [],
  loading: false,
  error: null,
  actionLoading: false
};

// GET /visitors
export const fetchVisitors = createAsyncThunk<
  Visitor[],
  void,
  { rejectValue: string }
>(
  "visitors/fetchVisitors",
  async (_, { rejectWithValue }) => {
    try {
      return await getVisitorsApi();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load visitors"
      );
    }
  }
);

// POST /visitors
export const addVisitor = createAsyncThunk<
  Visitor,
  CreateVisitorData,
  { rejectValue: string }
>(
  "visitors/addVisitor",
  async (visitorData, { rejectWithValue }) => {
    try {
      return await createVisitorApi(visitorData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add visitor"
      );
    }
  }
);

// DELETE /visitors/:id
export const deleteVisitor = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "visitors/deleteVisitor",
  async (id, { rejectWithValue }) => {
    try {
      await deleteVisitorApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete visitor"
      );
    }
  }
);

// PATCH /visitors/:id/approve
export const approveVisitor = createAsyncThunk<
  Visitor,
  string,
  { rejectValue: string }
>(
  "visitors/approveVisitor",
  async (id, { rejectWithValue }) => {
    try {
      return await approveVisitorApi(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to approve visitor"
      );
    }
  }
);

// PATCH /visitors/:id/reject
export const rejectVisitor = createAsyncThunk<
  Visitor,
  string,
  { rejectValue: string }
>(
  "visitors/rejectVisitor",
  async (id, { rejectWithValue }) => {
    try {
      return await rejectVisitorApi(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to reject visitor"
      );
    }
  }
);

const visitorSlice = createSlice({
  name: "visitors",
  initialState,

  reducers: {
    clearVisitorError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      // FETCH VISITORS
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload;
      })

      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load visitors";
      })

      // ADD VISITOR
      .addCase(addVisitor.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(addVisitor.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.visitors.push(action.payload);
      })

      .addCase(addVisitor.rejected, (state, action) => {
        state.actionLoading = false;
        state.error =
          action.payload || "Failed to add visitor";
      })

      // DELETE VISITOR
      .addCase(deleteVisitor.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(deleteVisitor.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.visitors = state.visitors.filter(
          (visitor) => visitor.id !== action.payload
        );
      })

      .addCase(deleteVisitor.rejected, (state, action) => {
        state.actionLoading = false;
        state.error =
          action.payload || "Failed to delete visitor";
      })

      // APPROVE VISITOR
      .addCase(approveVisitor.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(approveVisitor.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.visitors.findIndex(
          (visitor) => visitor.id === action.payload.id
        );

        if (index !== -1) {
          state.visitors[index] = action.payload;
        }
      })

      .addCase(approveVisitor.rejected, (state, action) => {
        state.actionLoading = false;
        state.error =
          action.payload || "Failed to approve visitor";
      })

      // REJECT VISITOR
      .addCase(rejectVisitor.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(rejectVisitor.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.visitors.findIndex(
          (visitor) => visitor.id === action.payload.id
        );

        if (index !== -1) {
          state.visitors[index] = action.payload;
        }
      })

      .addCase(rejectVisitor.rejected, (state, action) => {
        state.actionLoading = false;
        state.error =
          action.payload || "Failed to reject visitor";
      });
  }
});

export const { clearVisitorError } =
  visitorSlice.actions;

export default visitorSlice.reducer;