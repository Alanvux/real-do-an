// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import lectureReducer from './slices/lectureSlice';
import assignmentReducer from './slices/assignmentSlice';
import messageReducer from './slices/messageSlice';
import aiChatReducer from './slices/aiChatSlice';
import uiReducer from './slices/uiSlice';

// Configure persist for auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'] // Only persist these fields
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  courses: courseReducer,
  lectures: lectureReducer,
  assignments: assignmentReducer,
  messages: messageReducer,
  aiChat: aiChatReducer,
  ui: uiReducer,
});

// Create and configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persisted store
export const persistor = persistStore(store);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;