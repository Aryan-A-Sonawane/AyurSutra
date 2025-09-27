import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Video, 
  FileText, 
  ArrowLeft,
  Bot,
  User,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatBotProps {
  onNavigate: (page: string) => void;
  onClose?: () => void;
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
  options?: string[];
  timestamp: string;
}

interface QuestionTree {
  id: string;
  question: string;
  options: {
    text: string;
    action?: string;
    nextQuestionId?: string;
  }[];
}

export function ChatBot({ onNavigate, onClose }: ChatBotProps) {
  const { language } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState('main');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: language === 'en' 
        ? 'Hello! I\'m your Ayurveda assistant. How can I help you today?'
        : 'नमस्ते! मैं आपका आयुर्वेद सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const questionTree: Record<string, QuestionTree> = {
    main: {
      id: 'main',
      question: language === 'en' 
        ? 'What would you like to do?'
        : 'आप क्या करना चाहेंगे?',
      options: [
        { 
          text: language === 'en' ? 'Schedule appointment with doctor' : 'डॉक्टर के साथ अपॉइंटमेंट शेड्यूल करें',
          nextQuestionId: 'appointment'
        },
        { 
          text: language === 'en' ? 'Find hospitals near me' : 'मेरे पास अस्पताल खोजें',
          nextQuestionId: 'hospitals'
        },
        { 
          text: language === 'en' ? 'Request online consultation' : 'ऑनलाइन परामर्श का अनुरोध करें',
          nextQuestionId: 'online-consultation'
        },
        { 
          text: language === 'en' ? 'View my reports' : 'मेरी रिपोर्ट देखें',
          nextQuestionId: 'reports'
        },
        { 
          text: language === 'en' ? 'Other queries' : 'अन्य प्रश्न',
          nextQuestionId: 'other'
        }
      ]
    },
    appointment: {
      id: 'appointment',
      question: language === 'en' 
        ? 'What type of appointment would you like to schedule?'
        : 'आप किस प्रकार की अपॉइंटमेंट शेड्यूल करना चाहते हैं?',
      options: [
        { 
          text: language === 'en' ? 'Panchakarma therapy' : 'पंचकर्म चिकित्सा',
          action: 'book-appointment'
        },
        { 
          text: language === 'en' ? 'General consultation' : 'सामान्य परामर्श',
          action: 'book-appointment'
        },
        { 
          text: language === 'en' ? 'Follow-up appointment' : 'फॉलो-अप अपॉइंटमेंट',
          action: 'book-appointment'
        },
        { 
          text: language === 'en' ? 'Emergency consultation' : 'आपातकालीन परामर्श',
          nextQuestionId: 'emergency'
        }
      ]
    },
    hospitals: {
      id: 'hospitals',
      question: language === 'en' 
        ? 'How would you like to search for hospitals?'
        : 'आप अस्पतालों की खोज कैसे करना चाहते हैं?',
      options: [
        { 
          text: language === 'en' ? 'Search by pincode' : 'पिनकोड से खोजें',
          action: 'hospital-search'
        },
        { 
          text: language === 'en' ? 'Show all hospitals' : 'सभी अस्पताल दिखाएं',
          action: 'hospital-search'
        },
        { 
          text: language === 'en' ? 'Hospitals with female doctors' : 'महिला डॉक्टरों वाले अस्पताल',
          action: 'hospital-search'
        },
        { 
          text: language === 'en' ? 'Hospitals with male doctors' : 'पुरुष डॉक्टरों वाले अस्पताल',
          action: 'hospital-search'
        }
      ]
    },
    'online-consultation': {
      id: 'online-consultation',
      question: language === 'en' 
        ? 'What type of online consultation do you need?'
        : 'आपको किस प्रकार के ऑनलाइन परामर्श की आवश्यकता है?',
      options: [
        { 
          text: language === 'en' ? 'Video consultation' : 'वीडियो परामर्श',
          action: 'video-consultation'
        },
        { 
          text: language === 'en' ? 'Chat consultation' : 'चैट परामर्श',
          nextQuestionId: 'chat-consultation'
        },
        { 
          text: language === 'en' ? 'Prescription review' : 'पर्चे की समीक्षा',
          nextQuestionId: 'prescription-review'
        }
      ]
    },
    reports: {
      id: 'reports',
      question: language === 'en' 
        ? 'What reports would you like to access?'
        : 'आप किन रिपोर्टों तक पहुंचना चाहते हैं?',
      options: [
        { 
          text: language === 'en' ? 'Latest reports' : 'नवीनतम रिपोर्ट',
          action: 'patient-dashboard'
        },
        { 
          text: language === 'en' ? 'Treatment history' : 'उपचार इतिहास',
          action: 'patient-dashboard'
        },
        { 
          text: language === 'en' ? 'Download reports' : 'रिपोर्ट डाउनलोड करें',
          action: 'patient-dashboard'
        },
        { 
          text: language === 'en' ? 'Share reports with doctor' : 'डॉक्टर के साथ रिपोर्ट साझा करें',
          nextQuestionId: 'share-reports'
        }
      ]
    },
    other: {
      id: 'other',
      question: language === 'en' 
        ? 'What other information do you need?'
        : 'आपको और क्या जानकारी चाहिए?',
      options: [
        { 
          text: language === 'en' ? 'Ayurvedic diet tips' : 'आयुर्वेदिक आहार सुझाव',
          nextQuestionId: 'diet-tips'
        },
        { 
          text: language === 'en' ? 'Panchakarma information' : 'पंचकर्म की जानकारी',
          nextQuestionId: 'panchakarma-info'
        },
        { 
          text: language === 'en' ? 'Contact support' : 'सहायता से संपर्क करें',
          nextQuestionId: 'support'
        },
        { 
          text: language === 'en' ? 'FAQ' : 'अक्सर पूछे जाने वाले प्रश्न',
          nextQuestionId: 'faq'
        }
      ]
    },
    emergency: {
      id: 'emergency',
      question: language === 'en' 
        ? 'For emergency consultations, please call our 24/7 helpline or visit the nearest hospital. Would you like our emergency contacts?'
        : 'आपातकालीन परामर्श के लिए, कृपया हमारी 24/7 हेल्पलाइन पर कॉल करें या निकटतम अस्पताल जाएं। क्या आपको हमारे आपातकालीन संपर्क चाहिए?',
      options: [
        { 
          text: language === 'en' ? 'Yes, show emergency contacts' : 'हाँ, आपातकालीन संपर्क दिखाएं',
          nextQuestionId: 'emergency-contacts'
        },
        { 
          text: language === 'en' ? 'Find nearest hospital' : 'निकटतम अस्पताल खोजें',
          action: 'hospital-search'
        }
      ]
    }
  };

  const addMessage = (message: string, type: 'bot' | 'user', options?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      message,
      options,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatHistory(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: any) => {
    // Add user's choice to chat
    addMessage(option.text, 'user');

    // Handle action or navigate to next question
    if (option.action) {
      setTimeout(() => {
        addMessage(
          language === 'en' 
            ? 'Redirecting you to the appropriate page...'
            : 'आपको उपयुक्त पृष्ठ पर भेजा जा रहा है...',
          'bot'
        );
        setTimeout(() => {
          onNavigate(option.action);
        }, 1000);
      }, 500);
    } else if (option.nextQuestionId) {
      setTimeout(() => {
        const nextQuestion = questionTree[option.nextQuestionId];
        if (nextQuestion) {
          setCurrentQuestionId(option.nextQuestionId);
          addMessage(nextQuestion.question, 'bot', nextQuestion.options.map(opt => opt.text));
        }
      }, 800);
    }
  };

  const goBack = () => {
    setCurrentQuestionId('main');
    const mainQuestion = questionTree.main;
    addMessage(mainQuestion.question, 'bot', mainQuestion.options.map(opt => opt.text));
  };

  const currentQuestion = questionTree[currentQuestionId];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => setIsMinimized(false)}
          className="bg-green-600 hover:bg-green-700 rounded-full w-12 h-12 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-[32rem] shadow-xl">
      <Card className="h-full flex flex-col max-h-[32rem]">
        <CardHeader className="bg-green-600 text-white p-4 rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-sm">
                {language === 'en' ? 'AyurSutra Assistant' : 'आयुर्सूत्र सहायक'}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(true)}
                className="text-white hover:bg-green-700 h-6 w-6 p-0"
              >
                _
              </Button>
              {onClose && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="text-white hover:bg-green-700 h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p>{message.message}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Options */}
          <div className="border-t p-4 space-y-2 flex-shrink-0 max-h-40 overflow-y-auto">
            {currentQuestionId !== 'main' && (
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                className="w-full flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'en' ? 'Back to Main Menu' : 'मुख्य मेनू पर वापस'}
              </Button>
            )}
            
            <div className="grid grid-cols-1 gap-2">
              {currentQuestion?.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleOptionClick(option)}
                  className="text-left justify-start h-auto p-2 text-xs"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}