import { createContext, useReducer, ReactNode, use, useCallback, type Dispatch } from 'react';

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
};

type ContactState = {
  submissions: ContactSubmission[];
};

type ContactAction = {
  type: 'ADD_SUBMISSION';
  payload: Omit<ContactSubmission, 'id' | 'submittedAt'>;
};

// Separate contexts for state and dispatch
export const ContactStateContext = createContext<ContactState | null>(null);
export const ContactDispatchContext = createContext<Dispatch<ContactAction> | null>(null);

// Custom hooks for using the contexts
export const useContactState = () => {
  const context = use(ContactStateContext);
  if (!context) {
    throw new Error('useContactState must be used within a ContactProvider');
  }
  return context;
};

export const useContactDispatch = () => {
  const context = use(ContactDispatchContext);
  if (!context) {
    throw new Error('useContactDispatch must be used within a ContactProvider');
  }
  return context;
};

// Action creator hook
export const useContactActions = () => {
  const dispatch = useContactDispatch();

  const addSubmission = useCallback(
    (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
      dispatch({
        type: 'ADD_SUBMISSION',
        payload: submission,
      });
    },
    [dispatch],
  );

  return { addSubmission };
};

const contactReducer = (state: ContactState, action: ContactAction): ContactState => {
  switch (action.type) {
    case 'ADD_SUBMISSION': {
      const newSubmission: ContactSubmission = {
        ...action.payload,
        id: crypto.randomUUID(),
        submittedAt: new Date(),
      };
      return {
        ...state,
        submissions: [...state.submissions, newSubmission],
      };
    }
    default:
      return state;
  }
};

const initialState: ContactState = {
  submissions: [],
};

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactStateContext.Provider value={state}>
      <ContactDispatchContext.Provider value={dispatch}>{children}</ContactDispatchContext.Provider>
    </ContactStateContext.Provider>
  );
};
