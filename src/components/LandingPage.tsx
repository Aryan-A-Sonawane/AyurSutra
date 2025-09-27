import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Leaf, Users, Calendar, Bell, BarChart3, BookOpen } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Patient Management",
      description: "Comprehensive patient profiles and health records management.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Smart Scheduling",
      description: "Automated therapy session scheduling with conflict resolution.",
    },
    {
      icon: <Bell className="h-8 w-8 text-green-600" />,
      title: "Multi-channel Notifications",
      description: "SMS, Email, WhatsApp and in-app notification system.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Progress Tracking",
      description: "Visual progress tracking and therapy outcome analytics.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-green-800">{t('heroTitle')}</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" onClick={() => onNavigate('hospital-register')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                Register Hospital
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('blog')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('blog')}
              </Button>
              <Button variant="outline" onClick={() => onNavigate('multi-role-login')} className="border-green-200 text-green-700 hover:bg-green-50">
                Login
              </Button>
              <LanguageToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-green-800 leading-tight">
                  {t('heroTitle')}
                </h1>
                <p className="text-xl text-green-700 opacity-90">
                  {t('heroSubtitle')}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('heroDescription')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onNavigate('patient-register')} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  {t('getStarted')}
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('blog')} className="border-green-200 text-green-700 hover:bg-green-50 px-8 py-3">
                  {t('learnMore')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-amber-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1724112856938-162e80b6f3f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwd2VsbG5lc3MlMjBncmVlbnxlbnwxfHx8fDE3NTgzMTY1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ayurveda herbs and wellness"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-400 rounded-full opacity-80"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-green-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
              Complete Panchakarma Management
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your Ayurvedic practice efficiently and provide the best care to your patients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-xl w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-green-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
              {t('panchakarmaScience')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {t('blogDescription')}
            </p>
            <Button onClick={() => onNavigate('blog')} className="bg-green-600 hover:bg-green-700 text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold">{t('heroTitle')}</span>
            </div>
            <p className="text-green-200">
              Modern Ayurvedic practice management for better patient care
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}