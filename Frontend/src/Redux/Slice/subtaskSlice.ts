// src/redux/subtaskSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from "axios";

//  Subtask type
export interface SubtaskType {
  _id: string;
  heading: string;
  status: "To Do" | "In Progress" | "Completed" | "Review" | "On hold";
  startDate?: Date;
  deadline?: Date;
  assignedTo?: string;
  projectId: string | undefined; //link subtask to project
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

const token = localStorage.getItem('token')

// ✅ Fetch subtasks for a project
export const fetchSubtasks = createAsyncThunk<
  SubtaskType[],
  string | undefined
>("subtasks/fetchByProject", async (projectId, thunkAPI) => {
  try {
    const res = await axios.get(
      `https://agni-9mw4.onrender.com/api/projects/${projectId}/subtasks`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

// ✅ Create subtask inside a project
export const createSubtask = createAsyncThunk<
  SubtaskType,
  { projectId: string; subtask: Omit<SubtaskType, "_id" | "projectId"> }
>("subtasks/create", async ({ projectId, subtask }, thunkAPI) => {
  try {
    const res = await axios.post(
      `https://agni-9mw4.onrender.com/api/projects/${projectId}/subtasks`,
      subtask, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

//Update subtask (uuid comes from params)
export const updateSubtask = createAsyncThunk<
  SubtaskType,
  { uuid: string; updates: Partial<Omit<SubtaskType, "_id" | "projectId">> }
>("subtasks/update", async ({ uuid,  updates }, thunkAPI) => {
  try {
    const res = await axios.patch(
      `https://agni-9mw4.onrender.com/api/projects/subtasks/${uuid}`, // 🔹 uuid passed in params
      updates, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

// Delete subtask (uuid comes from params)
export const deleteSubtask = createAsyncThunk<string, string>(
  "subtasks/delete",
  async (uuid, thunkAPI) => {
    try {
      await axios.delete(`https://agni-9mw4.onrender.com/api/projects/subtasks/${uuid}`, {
        headers: {
        'Authorization': `Bearer ${token}`
      }
      }); // 🔹 uuid passed in params
      return uuid; // return deleted id
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

const subtaskSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🔹 fetch
    builder.addCase(fetchSubtasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchSubtasks.fulfilled,
      (state, action: PayloadAction<SubtaskType[]>) => {
        state.loading = false;
        state.subtasks = action.payload;
      }
    );
    builder.addCase(fetchSubtasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 🔹 create
    builder.addCase(
      createSubtask.fulfilled,
      (state, action: PayloadAction<SubtaskType>) => {
        state.subtasks.push(action.payload);
      }
    );

    // 🔹 update
    builder.addCase(
      updateSubtask.fulfilled,
      (state, action: PayloadAction<SubtaskType>) => {
        const idx = state.subtasks.findIndex(
          (s) => s._id === action.payload._id
        );
        if (idx !== -1) state.subtasks[idx] = action.payload;
      }
    );

    // 🔹 delete
    builder.addCase(
      deleteSubtask.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.subtasks = state.subtasks.filter(
          (s) => s._id !== action.payload
        );
      }
    );
  },
});

export default subtaskSlice.reducer;
