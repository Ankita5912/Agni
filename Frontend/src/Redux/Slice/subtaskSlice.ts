import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { RootState } from "../Reducers/rootReducer"

//  Subtask type
export interface SubtaskType {
  _id: string;
  heading: string;
  status: "To Do" | "In Progress" | "Completed" | "Review" | "On hold";
  startDate?: Date;
  deadline?: Date;
  assignedTo?: string;
  projectId: string | undefined;
}

interface SubtaskState {
  subtasks: SubtaskType[];
  loading: boolean;
  error: string | null;
}

const initialState: SubtaskState = {
  subtasks: [],
  loading: false,
  error: null,
};

// ✅ Fetch subtasks for a project
export const fetchSubtasks = createAsyncThunk<
  SubtaskType[],
  string | undefined,
  { state: RootState }
>("subtasks/fetchByProject", async (projectId, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    const res = await axios.get(
      `https://agni-9mw4.onrender.com/api/projects/${projectId}/subtasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch subtasks"
    );
  }
});

// ✅ Create subtask
export const createSubtask = createAsyncThunk<
  SubtaskType,
  { projectId: string; subtask: Omit<SubtaskType, "_id" | "projectId"> },
  { state: RootState }
>("subtasks/create", async ({ projectId, subtask }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    const res = await axios.post(
      `https://agni-9mw4.onrender.com/api/projects/${projectId}/subtasks`,
      subtask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to create subtask"
    );
  }
});

// ✅ Update subtask
export const updateSubtask = createAsyncThunk<
  SubtaskType,
  { uuid: string; updates: Partial<Omit<SubtaskType, "_id" | "projectId">> },
  { state: RootState }
>("subtasks/update", async ({ uuid, updates }, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    const res = await axios.patch(
      `https://agni-9mw4.onrender.com/api/projects/subtasks/${uuid}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update subtask"
    );
  }
});

// ✅ Delete subtask
export const deleteSubtask = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("subtasks/delete", async (uuid, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  try {
    await axios.delete(
      `https://agni-9mw4.onrender.com/api/projects/subtasks/${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return uuid;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to delete subtask"
    );
  }
});

const subtaskSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubtasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubtasks.fulfilled,
        (state, action: PayloadAction<SubtaskType[]>) => {
          state.loading = false;
          state.subtasks = action.payload;
        }
      )
      .addCase(fetchSubtasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSubtask.fulfilled, (state, action) => {
        state.subtasks.push(action.payload);
      })
      .addCase(updateSubtask.fulfilled, (state, action) => {
        const idx = state.subtasks.findIndex(
          (s) => s._id === action.payload._id
        );
        if (idx !== -1) state.subtasks[idx] = action.payload;
      })
      .addCase(deleteSubtask.fulfilled, (state, action) => {
        state.subtasks = state.subtasks.filter(
          (s) => s._id !== action.payload
        );
      });
  },
});

export default subtaskSlice.reducer;
