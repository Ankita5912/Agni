import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from "axios";

// Project Interface
export interface ProjectType {
  _id: string;
  heading: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed" | "On Hold" | "Review";
  startDate: Date | string;
  deadline: Date | string;
  team?: string;
}

// State Interface
interface ProjectState {
  projects: ProjectType[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const token = localStorage.getItem("token");

// ------------------ Async Thunks ------------------ //

// Fetch All
export const fetchProjects = createAsyncThunk<
  ProjectType[],
  void,
  { rejectValue: string }
>("projects/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("https://agni-9mw4.onrender.com/api/projects", {
      headers: {
        Authorization : `Bearer ${token}`,
      },
    });
    return res.data.projects;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

// Create
export const createProject = createAsyncThunk<
  ProjectType,
  Omit<ProjectType, "_id">
>("projects/create", async (project, thunkAPI) => {
  try {
    const res = await axios.post("https://agni-9mw4.onrender.com/api/projects",  project , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data.project;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

// Update
export const updateProject = createAsyncThunk<
  ProjectType,
  { uuid: string; updates: Partial<Omit<ProjectType, "_id">> }
>("projects/update", async ({ uuid, updates }, thunkAPI) => {
  try {
    const res = await axios.patch(
      `https://agni-9mw4.onrender.com/api/projects/${uuid}`,
      updates, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    );
    return res.data.project;
  } catch (err) {
    console.log(err)
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update project"
    );
  }
});

// Delete
export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("projects/delete", async (uuid, thunkAPI) => {
  try {
    await axios.delete(`https://agni-9mw4.onrender.com/api/projects/${uuid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return uuid; // return only id to remove from state
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch projects"
    );
  }
});

// ------------------ Slice ------------------ //

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<ProjectType[]>) => {
        state.loading = false;
        state.projects = action.payload;
      }
    );
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error fetching projects";
    });

    // CREATE
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<ProjectType>) => {
        state.projects.push(action.payload);
      }
    );

    // UPDATE
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<ProjectType>) => {
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload,
        };
      }
      }
    );

    // DELETE
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(
          (p) => p._id !== action.payload
        );
      }
    );
  },
});

export default projectSlice.reducer;
