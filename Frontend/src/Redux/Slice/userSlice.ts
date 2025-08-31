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
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null as unknown as User,
  loading: false,
  error: null,
};

const token = localStorage.getItem('token')

// fetch user,
export const fetchUser = createAsyncThunk<User>(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/user",{
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



