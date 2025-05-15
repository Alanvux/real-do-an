// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '@/services/authService';
import { setMessage } from './uiSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const data = await authService.login(email, password);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { 
      email, 
      password, 
      firstName, 
      lastName, 
      role = 'student' 
    }: { 
      email: string; 
      password: string; 
      firstName: string; 
      lastName: string; 
      role?: string;
    }, 
    { dispatch, rejectWithValue }
  ) => {
    try {
      const data = await authService.register(email, password, firstName, lastName, role);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await authService.logout();
      dispatch(setMessage({ type: 'success', text: 'Logged out successfully' }));
      return null;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Logout failed';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      if (!state.auth.refreshToken) {
        throw new Error('No refresh token available');
      }
      const data = await authService.refreshToken(state.auth.refreshToken);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Token refresh failed';
      return rejectWithValue(message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Additional reducers if needed
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload as string;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      
      // Refresh token
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<any>) => {
        state.token = action.payload.token;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
// Interface for message notifications
export interface MessageState {
    type: 'success' | 'error' | 'info' | 'warning';
    text: string;
  }
  
  // UI state interface
  interface UIState {
    message: MessageState | null;
    loading: boolean;
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
  }
  
  // Initial state
  const initialState: UIState = {
    message: null,
    loading: false,
    theme: 'light',
    sidebarOpen: true,
  };
  
  // UI slice
  const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
      // Set notification message
      setMessage: (state, action: PayloadAction<MessageState>) => {
        state.message = action.payload;
      },
      // Clear notification message
      clearMessage: (state) => {
        state.message = null;
      },
      // Set loading state
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      // Toggle theme
      toggleTheme: (state) => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
      },
      // Set theme
      setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
        state.theme = action.payload;
      },
      // Toggle sidebar
      toggleSidebar: (state) => {
        state.sidebarOpen = !state.sidebarOpen;
      },
      // Set sidebar state
      setSidebarOpen: (state, action: PayloadAction<boolean>) => {
        state.sidebarOpen = action.payload;
      },
    },
  });
  
  export const {
    setMessage,
    clearMessage,
    setLoading,
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebarOpen,
  } = uiSlice.actions;
  
  export default uiSlice.reducer;