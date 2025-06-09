import { createContext, useState, ReactNode, use, useCallback, useMemo } from 'react';

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
};

type ContactContextType = {
  submissions: ContactSubmission[];
  addSubmission: (submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => void;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  //   const context = useContext(ContactContext);
  const context = use(ContactContext);

  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  const addSubmission = useCallback((submission: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: crypto.randomUUID(),
      submittedAt: new Date(),
    };
    setSubmissions(prev => [...prev, newSubmission]);
  }, []); // No dependencies since setSubmissions is stable

  const contextValue = useMemo(
    () => ({
      submissions,
      addSubmission,
    }),
    [submissions, addSubmission],
  );

  return <ContactContext.Provider value={contextValue}>{children}</ContactContext.Provider>;
};
