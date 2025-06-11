import React, { createContext, use, useReducer, useState, useCallback } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type AppState = {
  users: User[];
  isLoading: boolean;
};

type Action = { type: 'ADD_USER'; payload: Omit<User, 'id'> } | { type: 'REMOVE_USER'; payload: number };

const initialState: AppState = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ],
  isLoading: false,
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, { ...action.payload, id: Math.max(0, ...state.users.map(u => u.id)) + 1 }],
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};

// Separate contexts for state and dispatch
export const AppStateContext = createContext<AppState | null>(null);
export const AppDispatchContext = createContext<React.Dispatch<Action> | null>(null);

// Custom hooks for using the contexts
export const useAppState = () => {
  const context = use(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }
  return context;
};

export const useAppDispatch = () => {
  const context = use(AppDispatchContext);
  if (!context) {
    throw new Error('useAppDispatch must be used within an AppProvider');
  }
  return context;
};

// Action creators
export const useAppActions = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const addUser = useCallback(
    async (user: Omit<User, 'id'>) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'ADD_USER', payload: user });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  const removeUser = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'REMOVE_USER', payload: id });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  return {
    addUser,
    removeUser,
    isLoading,
  };
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
