// teamSlice.ts
import { createSlice, createAsyncThunk,type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosError } from "axios";
// -------------------- Types --------------------
export interface Team {
  _id: string;       // from MongoDB or backend
  name: string;
  members: string[];
  teamId: string;  // unique like username/handle
}

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

const tokenfromLocalStorage = localStorage.getItem('token')

// -------------------- Async Thunks --------------------

// Create Team,
export const createTeam = createAsyncThunk<Team, { teamData: Omit<Team, "_id">; token: string |null }  >(
  "teams/createTeam",
  async ({ teamData, token }, thunkAPI) => {
    try {
      const res = await axios.post("https://agni-9mw4.onrender.com/api/teams", teamData,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
      return res.data; // return created team
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create team"
      );
    }
  }
);

// Fetch Teams
export const fetchTeams = createAsyncThunk<Team[], string>(
  "teams/fetchTeams",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get("https://agni-9mw4.onrender.com/api/teams",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
      return res.data.teams; // array of teams
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch team"
      );
    }
  }
);

// Delete Team
export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (teamId: string, thunkAPI) => {
    try {
      await axios.delete(`https://agni-9mw4.onrender.com/api/teams/${teamId}`,{
      headers: {
        'Authorization': `Bearer ${tokenfromLocalStorage}`
      }
    });
      return teamId; // return deleted team id
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete team"
      );
    }
  }
);

// -------------------- Slice --------------------
const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Team
    builder.addCase(createTeam.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
      state.loading = false;
      state.teams.push(action.payload);
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Teams
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
      state.loading = false;
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Team
    builder.addCase(deleteTeam.fulfilled, (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((team) => team._id !== action.payload);
    });
  },
});

export default teamSlice.reducer;