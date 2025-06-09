import React, { createContext, use, useReducer, useState, useCallback, useMemo } from 'react';

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

type AppContextType = AppState & {
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
};

const initialContext: AppContextType = {
  ...initialState,
  addUser: async () => {},
  removeUser: async () => {},
};

export const AppContext = createContext<AppContextType>(initialContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
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

  const contextValue = useMemo(
    () => ({
      ...state,
      isLoading,
      addUser,
      removeUser,
    }),
    [state, isLoading, addUser, removeUser],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the context with React 19's use API
export const useAppState = () => {
  const context = use(AppContext);

  if (!context) {
    throw new Error('useAppState must be used within an AppProvider');
  }

  return context;
};
