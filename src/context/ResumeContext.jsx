import React, { createContext, useContext } from 'react';
import useResumeData from '../hooks/useResumeData';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const resumeData = useResumeData();
  
  return (
    <ResumeContext.Provider value={resumeData}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
