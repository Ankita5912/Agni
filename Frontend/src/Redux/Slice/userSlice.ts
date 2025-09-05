import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosError } from "axios";

// user type recieved from API
export interface User {
  _id: string,
  username: string,
  name: string,
  email: string,
  skills: string[],
  teams: string[],
  avatarUrl :string
};

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};


// fetch user,
export const fetchUser = createAsyncThunk<User, string>(
  "user/fetchUser",
  async (token , thunkAPI) => {
    try {
      const res = await axios.get("https://agni-9mw4.onrender.com/api/users/user",{
      headers: {
        'Authorization': `Bearer ${token}`
      }
      });
      return res.data.user; // return single user object
      
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch User"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  }
})
export default userSlice.reducer;