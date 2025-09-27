import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Leaf } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface PatientRegistrationProps {
  onNavigate: (page: string) => void;
}

export function PatientRegistration({ onNavigate }: PatientRegistrationProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    guardianName: '',
    guardianContact: '',
    guardianEmail: '',
    healthConditions: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', formData);
    onNavigate('patient-dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => onNavigate('home')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-green-800">{t('heroTitle')}</span>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <main className="py-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="border-green-100 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">Patient Registration</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account to access Panchakarma therapy management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-700">{t('name')}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-green-700">{t('age')}</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="border-green-200 focus:border-green-400 focus:ring-green-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-green-700">{t('gender')}</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t('male')}</SelectItem>
                        <SelectItem value="female">{t('female')}</SelectItem>
                        <SelectItem value="other">{t('other')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-green-700">{t('contact')}</Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-700">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>

                {/* Guardian Information */}
                <div className="space-y-4 bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">Guardian Information</h3>
                  <p className="text-sm text-gray-600">Guardian will receive notifications and updates about appointments</p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guardianName" className="text-green-700">Guardian Name</Label>
                    <Input
                      id="guardianName"
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => handleInputChange('guardianName', e.target.value)}
                      className="border-green-200 focus:border-green-400 focus:ring-green-400"
                      placeholder="Guardian's full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guardianContact" className="text-green-700">Guardian Contact</Label>
                      <Input
                        id="guardianContact"
                        type="tel"
                        value={formData.guardianContact}
                        onChange={(e) => handleInputChange('guardianContact', e.target.value)}
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guardianEmail" className="text-green-700">Guardian Email</Label>
                      <Input
                        id="guardianEmail"
                        type="email"
                        value={formData.guardianEmail}
                        onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        placeholder="guardian@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="healthConditions" className="text-green-700">{t('healthConditions')}</Label>
                  <Textarea
                    id="healthConditions"
                    value={formData.healthConditions}
                    onChange={(e) => handleInputChange('healthConditions', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-20"
                    placeholder="Please describe any existing health conditions..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-700">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {t('register')}
                </Button>

                <div className="text-center">
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={() => onNavigate('patient-login')}
                    className="text-green-600 hover:text-green-700"
                  >
                    Already have an account? {t('login')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}