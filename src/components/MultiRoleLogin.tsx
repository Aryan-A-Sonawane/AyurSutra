import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, UserCheck, Building2, Eye, EyeOff } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface MultiRoleLoginProps {
  onNavigate: (page: string) => void;
}

interface LoginFormProps {
  role: string;
  language: string;
  loginData: any;
  showPassword: boolean;
  onInputChange: (role: string, field: string, value: string) => void;
  onLogin: (role: string) => void;
  onTogglePassword: () => void;
  onNavigate: (page: string) => void;
}

const LoginForm = React.memo(({ 
  role, 
  language, 
  loginData, 
  showPassword, 
  onInputChange, 
  onLogin, 
  onTogglePassword, 
  onNavigate 
}: LoginFormProps) => (
  <form onSubmit={(e) => { e.preventDefault(); onLogin(role); }} className="space-y-4">
    <div>
      <Label htmlFor={`${role}-email`}>
        {language === 'en' ? 'Email Address' : 'ईमेल पता'}
      </Label>
      <Input
        id={`${role}-email`}
        type="email"
        value={loginData[role as keyof typeof loginData].email}
        onChange={(e) => onInputChange(role, 'email', e.target.value)}
        required
        placeholder={language === 'en' ? 'Enter your email' : 'अपना ईमेल दर्ज करें'}
      />
    </div>
    <div>
      <Label htmlFor={`${role}-password`}>
        {language === 'en' ? 'Password' : 'पासवर्ड'}
      </Label>
      <div className="relative">
        <Input
          id={`${role}-password`}
          type={showPassword ? 'text' : 'password'}
          value={loginData[role as keyof typeof loginData].password}
          onChange={(e) => onInputChange(role, 'password', e.target.value)}
          required
          placeholder={language === 'en' ? 'Enter your password' : 'अपना पासवर्ड दर्ज करें'}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={onTogglePassword}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
    </div>
    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
      {language === 'en' ? 'Login' : 'लॉग इन करें'}
    </Button>
    <div className="text-center">
      <Button 
        type="button" 
        variant="link" 
        className="text-green-600"
        onClick={() => {
          if (role === 'patient') onNavigate('patient-register');
          else if (role === 'practitioner') onNavigate('doctor-register');
        }}
      >
        {language === 'en' ? 'Create new account' : 'नया खाता बनाएं'}
      </Button>
    </div>
  </form>
));

export function MultiRoleLogin({ onNavigate }: MultiRoleLoginProps) {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    patient: { email: '', password: '' },
    practitioner: { email: '', password: '' },
    hospital: { email: '', password: '' }
  });

  const handleInputChange = useCallback((role: string, field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [role]: { ...prev[role as keyof typeof prev], [field]: value }
    }));
  }, []);

  const handleLogin = useCallback((role: string) => {
    const data = loginData[role as keyof typeof loginData];
    console.log(`${role} login:`, data);
    
    // Navigate to appropriate dashboard
    switch (role) {
      case 'patient':
        onNavigate('patient-dashboard');
        break;
      case 'practitioner':
        onNavigate('practitioner-dashboard');
        break;
      case 'hospital':
        onNavigate('hospital-admin');
        break;
    }
  }, [loginData, onNavigate]);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
                <h1 className="text-2xl font-bold text-green-700">
                  {language === 'en' ? 'AyurSutra' : 'आयुर्सूत्र'}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button variant="outline" onClick={() => onNavigate('home')}>
                {language === 'en' ? 'Back to Home' : 'होम पर वापस'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              {language === 'en' ? 'Login to AyurSutra' : 'आयुर्सूत्र में लॉगिन करें'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patient" className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {language === 'en' ? 'Patient' : 'मरीज़'}
                </TabsTrigger>
                <TabsTrigger value="practitioner" className="flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  {language === 'en' ? 'Doctor' : 'डॉक्टर'}
                </TabsTrigger>
                <TabsTrigger value="hospital" className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {language === 'en' ? 'Hospital' : 'अस्पताल'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="patient" className="mt-6">
                <div className="text-center mb-4">
                  <User className="w-12 h-12 mx-auto text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">
                    {language === 'en' ? 'Patient Login' : 'मरीज़ लॉगिन'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Access your health records and appointments' : 'अपने स्वास्थ्य रिकॉर्ड और अपॉइंटमेंट तक पहुंचें'}
                  </p>
                </div>
                <LoginForm 
                  role="patient" 
                  language={language}
                  loginData={loginData}
                  showPassword={showPassword}
                  onInputChange={handleInputChange}
                  onLogin={handleLogin}
                  onTogglePassword={handleTogglePassword}
                  onNavigate={onNavigate}
                />
              </TabsContent>
              
              <TabsContent value="practitioner" className="mt-6">
                <div className="text-center mb-4">
                  <UserCheck className="w-12 h-12 mx-auto text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">
                    {language === 'en' ? 'Doctor Login' : 'डॉक्टर लॉगिन'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Manage patients and treatments' : 'मरीज़ों और उपचार का प्रबंधन करें'}
                  </p>
                </div>
                <LoginForm 
                  role="practitioner" 
                  language={language}
                  loginData={loginData}
                  showPassword={showPassword}
                  onInputChange={handleInputChange}
                  onLogin={handleLogin}
                  onTogglePassword={handleTogglePassword}
                  onNavigate={onNavigate}
                />
              </TabsContent>
              
              <TabsContent value="hospital" className="mt-6">
                <div className="text-center mb-4">
                  <Building2 className="w-12 h-12 mx-auto text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">
                    {language === 'en' ? 'Hospital Admin' : 'अस्पताल प्रशासन'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === 'en' ? 'Manage hospital operations and staff' : 'अस्पताल संचालन और कर्मचारियों का प्रबंधन करें'}
                  </p>
                </div>
                <LoginForm 
                  role="hospital" 
                  language={language}
                  loginData={loginData}
                  showPassword={showPassword}
                  onInputChange={handleInputChange}
                  onLogin={handleLogin}
                  onTogglePassword={handleTogglePassword}
                  onNavigate={onNavigate}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}