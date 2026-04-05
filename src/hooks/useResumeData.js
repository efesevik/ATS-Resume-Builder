import { useState, useEffect } from 'react';

const INITIAL_DATA = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    profileImage: null,
    themeColor: '#111827',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  personalSkills: [],
  languages: [],
  projects: [],
};

const useResumeData = () => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('resume-shield-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Robust merge to prevent crashes from missing fields
        return {
          ...INITIAL_DATA,
          ...parsed,
          personalInfo: {
            ...INITIAL_DATA.personalInfo,
            ...(parsed.personalInfo || {})
          },
          experience: Array.isArray(parsed.experience) ? parsed.experience : [],
          education: Array.isArray(parsed.education) ? parsed.education : [],
          skills: Array.isArray(parsed.skills) ? parsed.skills : [],
          personalSkills: Array.isArray(parsed.personalSkills) ? parsed.personalSkills : [],
          languages: Array.isArray(parsed.languages) ? parsed.languages : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        };
      }
    } catch (e) {
      console.error("Critical error loading resume data, resetting to initial state.", e);
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('resume-shield-data', JSON.stringify(data));
    } catch (e) {
      console.warn("Storage warning: Possibly hitting limit with large profile image", e);
    }
  }, [data]);

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setData(prev => ({ ...prev, summary: value }));
  };

  const addItem = (section) => {
    const newItem = section === 'experience' 
      ? { company: '', position: '', duration: '', description: '' }
      : section === 'education'
      ? { school: '', degree: '', duration: '', description: '' }
      : section === 'projects'
      ? { name: '', link: '', description: '', technologies: '' }
      : section === 'languages'
      ? { name: '', level: 'B1 - Orta Seviye' }
      : section === 'personalSkills'
      ? { name: '' }
      : { name: '', level: '' };

    setData(prev => {
      const currentList = Array.isArray(prev[section]) ? prev[section] : [];
      return {
        ...prev,
        [section]: [...currentList, newItem]
      };
    });
  };

  const updateItem = (section, index, field, value) => {
    setData(prev => {
      const newList = Array.isArray(prev[section]) ? [...prev[section]] : [];
      if (newList[index]) {
        newList[index] = { ...newList[index], [field]: value };
      }
      return { ...prev, [section]: newList };
    });
  };

  const removeItem = (section, index) => {
    setData(prev => {
      const currentList = Array.isArray(prev[section]) ? prev[section] : [];
      return {
        ...prev,
        [section]: currentList.filter((_, i) => i !== index)
      };
    });
  };

  const clearImage = () => {
    updatePersonalInfo('profileImage', null);
  };

  const resetData = () => {
    if (window.confirm('Tüm veriler silinecek. Emin misiniz?')) {
      setData(INITIAL_DATA);
      localStorage.removeItem('resume-shield-data');
    }
  };

  return {
    data,
    updatePersonalInfo,
    updateSummary,
    addItem,
    updateItem,
    removeItem,
    clearImage,
    resetData
  };
};

export default useResumeData;
