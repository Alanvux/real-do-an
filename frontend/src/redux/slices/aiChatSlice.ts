// src/redux/slices/aiChatSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import aiChatService from '@/services/aiChatService';
import { setMessage } from './uiSlice';

// Types
export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  userId: string;
  query: string;
  response: string;
  createdAt: Date;
}

interface AIChatState {
  messages: ChatMessage[];
  chatHistory: ChatHistory[];
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AIChatState = {
  messages: [
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. How can I help with your studies today?',
      timestamp: new Date()
    }
  ],
  chatHistory: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const sendMessage = createAsyncThunk(
  'aiChat/sendMessage',
  async ({ query, courseId }: { query: string; courseId?: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await aiChatService.sendMessage(query, courseId);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to send message';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

export const fetchChatHistory = createAsyncThunk(
  'aiChat/fetchChatHistory',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await aiChatService.getChatHistory();
      return response.chatHistory;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch chat history';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

export const generateQuiz = createAsyncThunk(
  'aiChat/generateQuiz',
  async ({ lectureId, numQuestions }: { lectureId: string; numQuestions?: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await aiChatService.generateQuiz(lectureId, numQuestions);
      return response.questions;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to generate quiz';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

export const extractConcepts = createAsyncThunk(
  'aiChat/extractConcepts',
  async (lectureId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await aiChatService.extractConcepts(lectureId);
      return response.concepts;
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to extract concepts';
      dispatch(setMessage({ type: 'error', text: message }));
      return rejectWithValue(message);
    }
  }
);

// AI Chat slice
const aiChatSlice = createSlice({
  name: 'aiChat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [
        {
          role: 'assistant',
          content: 'Hello! I\'m your AI learning assistant. How can I help with your studies today?',
          timestamp: new Date()
        }
      ];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.messages.push({
          role: 'assistant',
          content: action.payload.response,
          timestamp: new Date()
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Chat History
      .addCase(fetchChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action: PayloadAction<ChatHistory[]>) => {
        state.isLoading = false;
        state.chatHistory = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, clearMessages, clearError } = aiChatSlice.actions;
export default aiChatSlice.reducer;