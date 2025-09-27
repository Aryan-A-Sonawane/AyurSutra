import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    patientLogin: 'Patient Login',
    practitionerLogin: 'Practitioner Login',
    blog: 'Educational Blog',
    logout: 'Logout',
    
    // Hero Section
    heroTitle: 'AyurSutra',
    heroSubtitle: 'Complete Panchakarma Management Software',
    heroDescription: 'Streamline your Ayurvedic practice with automated scheduling, digital health records, and patient care management.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Forms
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    contact: 'Contact Number',
    email: 'Email',
    healthConditions: 'Health Conditions',
    password: 'Password',
    register: 'Register',
    login: 'Login',
    
    // Dashboard
    dashboard: 'Dashboard',
    patients: 'Patients',
    schedule: 'Schedule',
    notifications: 'Notifications',
    profile: 'Profile',
    
    // Calendar
    upcoming: 'Upcoming',
    completed: 'Completed',
    rescheduled: 'Rescheduled',
    today: 'Today',
    thisWeek: 'This Week',
    
    // Therapy
    therapyProgress: 'Therapy Progress',
    sessionHistory: 'Session History',
    feedback: 'Feedback',
    symptoms: 'Symptoms',
    sideEffects: 'Side Effects',
    improvement: 'Improvement',
    submit: 'Submit',
    
    // Blog
    panchakarmaScience: 'Science Behind Panchakarma',
    blogDescription: 'Learn about the ancient wisdom and modern applications of Panchakarma therapy.',
    
    // Notifications
    reminderSent: 'Reminder sent successfully',
    appointmentConfirmed: 'Appointment confirmed',
    remindLater: 'Remind me later',
    yes: 'Yes',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    active: 'Active',
    inactive: 'Inactive',
    
    // Additional translations for practitioner features
    addReport: 'Add Report',
    sessionDetails: 'Session Details',
    sessionFindings: 'Session Findings',
    postTherapyInstructions: 'Post-Therapy Instructions',
    scheduleNextSession: 'Schedule Next Session',
    patientReminders: 'Patient Reminders',
    timeSensitiveReminders: 'Set time-sensitive reminders for this patient',
    reminderAfterHours: 'Remind after (hours)',
    reminderMessage: 'Reminder Message',
    addReminder: 'Add Reminder',
    scheduledReminders: 'Scheduled Reminders',
    improvementScore: 'Improvement Score (%)',
    careInstructions: 'Care Instructions',
    medicationChanges: 'Medication Changes',
    additionalNotes: 'Additional Notes',
    followUpNotes: 'Follow-up Notes',
    saveReportSchedule: 'Save Report & Schedule',
    
    // Booking Form
    dateTime: 'Date & Time',
    therapyType: 'Therapy Type',
    confirmation: 'Confirmation',
    selectTherapy: 'Select Panchakarma Therapy',
    importantInstructions: 'Important Instructions',
    pretreatmentRequirements: 'Pre-Treatment Requirements',
    posttreatmentCare: 'Post-Treatment Care',
    appointmentSummary: 'Appointment Summary',
    specialRequests: 'Special Requests',
    emergencyContact: 'Emergency Contact',
    callReception: 'Call Reception',
    needHelp: 'Need Help?',
    confirmBooking: 'Confirm Booking',
    nextStep: 'Next Step',
    previous: 'Previous',
    
    // Reports
    reports: 'Reports',
    sessionReports: 'Session Reports',
    progressReports: 'Progress Reports',
    medicalReports: 'Medical Reports',
    allReports: 'All Reports',
    treatmentProgress: 'Treatment Progress',
    reportsGenerated: 'Reports Generated',
    averageImprovement: 'Average Improvement',
    sessionsCompleted: 'Sessions Completed',
    overallProgress: 'Overall Treatment Progress',
    findings: 'Findings',
    recommendations: 'Recommendations',
    nextSession: 'Next Session',
    viewFullReport: 'View Full Report',
    downloadReport: 'Download Report',
    
    // Therapies
    abhyanga: 'Abhyanga',
    swedana: 'Swedana',
    basti: 'Basti',
    nasya: 'Nasya',
    snehana: 'Snehana',
  },
  hi: {
    // Navigation
    home: 'होम',
    patientLogin: 'रोगी लॉगिन',
    practitionerLogin: 'चिकित्सक लॉगिन',
    blog: 'शिक्षा ब्लॉग',
    logout: 'लॉगआउट',
    
    // Hero Section
    heroTitle: 'आयुर्सूत्र',
    heroSubtitle: 'संपूर्ण पंचकर्म प्रबंधन सॉफ्टवेयर',
    heroDescription: 'स्वचालित शेड्यूलिंग, डिजिटल स्वास्थ्य रिकॉर्ड और रोगी देखभाल प्रबंधन के साथ अपनी आयुर्वेदिक प्रैक्टिस को सुव्यवस्थित करें।',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    
    // Forms
    name: 'नाम',
    age: 'आयु',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    contact: 'संपर्क नंबर',
    email: 'ईमेल',
    healthConditions: 'स्वास्थ्य स्थितियां',
    password: 'पासवर्ड',
    register: 'पंजीकरण',
    login: 'लॉगिन',
    
    // Dashboard
    dashboard: 'डैशबोर्ड',
    patients: 'रोगी',
    schedule: 'अनुसूची',
    notifications: 'सूचनाएं',
    profile: 'प्रोफाइल',
    
    // Calendar
    upcoming: 'आगामी',
    completed: 'पूर्ण',
    rescheduled: 'पुनर्निर्धारित',
    today: 'आज',
    thisWeek: 'इस सप्ताह',
    
    // Therapy
    therapyProgress: 'चिकित्सा प्रगति',
    sessionHistory: 'सत्र इतिहास',
    feedback: 'प्रतिक्रिया',
    symptoms: 'लक्षण',
    sideEffects: 'दुष्प्रभाव',
    improvement: 'सुधार',
    submit: 'जमा करें',
    
    // Blog
    panchakarmaScience: 'पंचकर्म के पीछे का विज्ञान',
    blogDescription: 'पंचकर्म चिकित्सा की प्राचीन बुद्धि और आधुनिक अनुप्रयोगों के बारे में जानें।',
    
    // Notifications
    reminderSent: 'अनुस्मारक सफलतापूर्वक भेजा गया',
    appointmentConfirmed: 'नियुक्ति की पुष्टि',
    remindLater: 'बाद में याद दिलाएं',
    yes: 'हां',
    
    // Common
    save: 'सेव करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    all: 'सभी',
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    
    // Additional translations for practitioner features
    addReport: 'रिपोर्ट जोड़ें',
    sessionDetails: 'सत्र विवरण',
    sessionFindings: 'सत्र निष्कर्ष',
    postTherapyInstructions: 'पश्चात चिकित्सा निर्देशन',
    scheduleNextSession: 'अगला सत्र अनुसूची बनाएं',
    patientReminders: 'रोगी के अनुस्मारक',
    timeSensitiveReminders: 'इस रोगी के लिए समय संबंधित अनुस्मारक सेट करें',
    reminderAfterHours: 'अनुस्मारक दें (घंटे)',
    reminderMessage: 'अनुस्मारक संदेश',
    addReminder: 'अनुस्मारक जोड़ें',
    scheduledReminders: 'अनुस्मारक अनुसूची',
    improvementScore: 'सुधार स्कोर (%)',
    careInstructions: 'देखभाल निर्देशन',
    medicationChanges: 'चिकित्सा परिवर्तन',
    additionalNotes: 'अतिरिक्त नोट्स',
    followUpNotes: 'निष्कर्ष नोट्स',
    saveReportSchedule: 'रिपोर्ट और अनुसूची सेव करें',
    
    // Booking Form
    dateTime: 'दिन और समय',
    therapyType: 'चिकित्सा प्रकार',
    confirmation: 'पुष्टि',
    selectTherapy: 'पंचकर्म चिकित्सा चुनें',
    importantInstructions: 'महत्वपूर्ण निर्देशन',
    pretreatmentRequirements: 'पूर्व चिकित्सा की आवश्यकताएं',
    posttreatmentCare: 'पश्चात चिकित्सा',
    appointmentSummary: 'नियुक्ति सारांश',
    specialRequests: 'विशेष मांग',
    emergencyContact: 'आपातकाल संपर्क',
    callReception: 'प्रवास लगाएं',
    needHelp: 'सहायता की जरूरत है?',
    confirmBooking: 'नियुक्ति पुष्टि करें',
    nextStep: 'अगला चरण',
    previous: 'पिछला',
    
    // Reports
    reports: 'रिपोर्ट',
    sessionReports: 'सत्र रिपोर्ट',
    progressReports: 'प्रगति रिपोर्ट',
    medicalReports: 'स्वास्थ्य रिपोर्ट',
    allReports: 'सभी रिपोर्ट',
    treatmentProgress: 'चिकित्सा प्रगति',
    reportsGenerated: 'रिपोर्ट उत्पन्न',
    averageImprovement: 'औसत सुधार',
    sessionsCompleted: 'सत्र पूर्ण',
    overallProgress: 'संपूर्ण चिकित्सा प्रगति',
    findings: 'सामान्य',
    recommendations: 'सुझाव',
    nextSession: 'अगला सत्र',
    viewFullReport: 'पूरा रिपोर्ट देखें',
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    
    // Therapies
    abhyanga: 'अभ्यांग',
    swedana: 'स्वेदन',
    basti: 'बस्ती',
    nasya: 'नास्य',
    snehana: 'स्नेहन',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}