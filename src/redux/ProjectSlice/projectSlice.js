import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_BASE = "http://localhost:8000/api";
// const API_BASE = import.meta.env.REACT_APP_API_BASE;
const API_BASE = "https://dev-backend-zvor.onrender.com/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE}/projects`);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data?.msg || "Error fetching projects");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async ({ project, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE}/projects/create`,
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.project;
    } catch (e) {
      return rejectWithValue(e.response.data?.msg || "Error creating project");
    }
  }
);

export const commentOnProject = createAsyncThunk(
  "projects/commentOnProject",
  async ({ projectId, text, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_BASE}/projects/comment/${projectId}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.msg || "Error commenting on project"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        // state.projects = action.payload;
        state.projects = Array.isArray(action.payload) 
        ? action.payload 
        : action.payload.projects || []; 
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // When creating a project successfully,
      .addCase(createProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(commentOnProject.fulfilled, (state, action) => {
        if (action.payload?._id) {
          const index = state.projects.findIndex(
            (p) => p._id === action.payload._id
          );
          if (index !== -1) state.projects[index] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
