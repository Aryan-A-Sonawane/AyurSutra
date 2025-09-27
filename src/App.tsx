import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { LandingPage } from './components/LandingPage';
import { PatientRegistration } from './components/PatientRegistration';
import { PatientDashboard } from './components/PatientDashboard';
import { PractitionerDashboard } from './components/PractitionerDashboard';
import { BlogPage } from './components/BlogPage';
import { BookAppointment } from './components/BookAppointment';
import { AddReportForm } from './components/AddReportForm';
import { HospitalRegistration } from './components/HospitalRegistration';
import { MultiRoleLogin } from './components/MultiRoleLogin';
import { HospitalAdminPanel } from './components/HospitalAdminPanel';
import { DoctorRegistration } from './components/DoctorRegistration';
import { HospitalSearchPage } from './components/HospitalSearchPage';
import { VideoConsultation } from './components/VideoConsultation';
import { ChatBot } from './components/ChatBot';
import { HospitalDetailPage } from './components/HospitalDetailPage';
import { BlogPostForm } from './components/BlogPostForm';
import { ArticleReaderPage } from './components/ArticleReaderPage';
import { DailyRoutineForm } from './components/DailyRoutineForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showChatBot, setShowChatBot] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'hospital-register':
        return <HospitalRegistration onNavigate={handleNavigate} />;
      case 'multi-role-login':
        return <MultiRoleLogin onNavigate={handleNavigate} />;
      case 'hospital-admin':
        return <HospitalAdminPanel onNavigate={handleNavigate} />;
      case 'doctor-register':
        return <DoctorRegistration onNavigate={handleNavigate} />;
      case 'hospital-search':
        return <HospitalSearchPage onNavigate={handleNavigate} />;
      case 'video-consultation':
        return <VideoConsultation onNavigate={handleNavigate} />;
      case 'patient-register':
        return <PatientRegistration onNavigate={handleNavigate} />;
      case 'patient-login':
        return <PatientRegistration onNavigate={handleNavigate} />;
      case 'patient-dashboard':
        return <PatientDashboard onNavigate={handleNavigate} />;
      case 'practitioner-dashboard':
        return <PractitionerDashboard onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'book-appointment':
        return <BookAppointment onNavigate={handleNavigate} />;
      case 'blog-post-form':
        return <BlogPostForm onNavigate={handleNavigate} />;
      default:
        // Handle add-report with parameters
        if (currentPage.startsWith('add-report')) {
          const urlParams = new URLSearchParams(currentPage.split('?')[1] || '');
          const patientId = urlParams.get('patientId') || undefined;
          const patientName = urlParams.get('patientName') || undefined;
          return <AddReportForm onNavigate={handleNavigate} patientId={patientId} patientName={patientName} />;
        }
        // Handle hospital detail pages
        if (currentPage.startsWith('hospital-detail')) {
          const urlParams = new URLSearchParams(currentPage.split('?')[1] || '');
          const hospitalId = urlParams.get('id') || undefined;
          return <HospitalDetailPage onNavigate={handleNavigate} hospitalId={hospitalId} />;
        }
        // Handle article reader pages
        if (currentPage.startsWith('article')) {
          const urlParams = new URLSearchParams(currentPage.split('?')[1] || '');
          const articleId = urlParams.get('id') || undefined;
          return <ArticleReaderPage onNavigate={handleNavigate} articleId={articleId} />;
        }
        // Handle daily routine form
        if (currentPage.startsWith('daily-routine-form')) {
          const urlParams = new URLSearchParams(currentPage.split('?')[1] || '');
          const patientId = urlParams.get('patientId') || undefined;
          const patientName = urlParams.get('patientName') || undefined;
          return <DailyRoutineForm onNavigate={handleNavigate} patientId={patientId} patientName={patientName} />;
        }
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="size-full">
        {renderPage()}
        {showChatBot && (
          <ChatBot 
            onNavigate={handleNavigate} 
            onClose={() => setShowChatBot(false)} 
          />
        )}
        {!showChatBot && currentPage !== 'home' && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setShowChatBot(true)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
            >
              💬
            </button>
          </div>
        )}
      </div>
    </LanguageProvider>
  );
}