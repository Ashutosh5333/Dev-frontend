import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const BASE_URL = import.meta.env.REACT_APP_API_BASE;
// const BASE_URL = "http://localhost:8000/api";
const BASE_URL = "https://dev-backend-zvor.onrender.com/api";


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, userData);
      return response.data;
    } catch (err) {
      // Gracefully extract error message
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(message);
    }
  }
);

// --- Fetch User Profile
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.token) return rejectWithValue("No token found");
      
      const response = await axios.get(`${BASE_URL}/users/profile/me`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(message);
    }
  }
);


// --- Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(
        `${BASE_URL}/users/update`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    loggedinUser:[]
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed. Please try again.";
      })

      // --- Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
      })

      // --- Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedinUser = action.payload;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user profile.";
      })

      // --- Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user profile.";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
