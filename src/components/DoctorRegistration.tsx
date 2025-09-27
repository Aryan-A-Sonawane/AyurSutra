import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Building2, Upload, UserCheck } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface DoctorRegistrationProps {
  onNavigate: (page: string) => void;
}

export function DoctorRegistration({ onNavigate }: DoctorRegistrationProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    licenseNumber: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    profilePicture: '',
    hospitalName: 'Green Valley Ayurveda Hospital', // From invite
    specialization: '',
    experience: '',
    qualifications: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Doctor Registration Data:', formData);
    alert('Doctor registration completed successfully! Please wait for hospital verification.');
    onNavigate('multi-role-login');
  };

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
              <Button variant="outline" onClick={() => onNavigate('multi-role-login')}>
                {language === 'en' ? 'Back to Login' : 'लॉगिन पर वापस'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <UserCheck className="w-6 h-6" />
              {language === 'en' ? 'Doctor Registration' : 'डॉक्टर पंजीकरण'}
            </CardTitle>
            <div className="text-center mt-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Building2 className="w-4 h-4 mr-1" />
                {formData.hospitalName}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.profilePicture} />
                  <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                    {formData.name ? formData.name.charAt(0) : 'D'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="profilePicture" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <Upload className="w-4 h-4" />
                      {language === 'en' ? 'Upload Photo' : 'फोटो अपलोड करें'}
                    </div>
                  </Label>
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Basic Information' : 'मूलभूत जानकारी'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      {language === 'en' ? 'Full Name' : 'पूरा नाम'} *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      placeholder={language === 'en' ? 'Dr. John Doe' : 'डॉ. नाम'}
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">
                      {language === 'en' ? 'Medical License Number' : 'मेडिकल लाइसेंस नंबर'} *
                    </Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      required
                      placeholder="MH/A/12345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      {language === 'en' ? 'Email Address' : 'ईमेल पता'} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="doctor@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      {language === 'en' ? 'Mobile Number' : 'मोबाइल नंबर'} *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">
                      {language === 'en' ? 'Gender' : 'लिंग'} *
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select gender' : 'लिंग चुनें'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{language === 'en' ? 'Male' : 'पुरुष'}</SelectItem>
                        <SelectItem value="female">{language === 'en' ? 'Female' : 'महिला'}</SelectItem>
                        <SelectItem value="other">{language === 'en' ? 'Other' : 'अन्य'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">
                      {language === 'en' ? 'Years of Experience' : 'अनुभव के वर्ष'} *
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      required
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Professional Information' : 'व्यावसायिक जानकारी'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">
                      {language === 'en' ? 'Specialization' : 'विशेषज्ञता'} *
                    </Label>
                    <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select specialization' : 'विशेषज्ञता चुनें'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="panchakarma">Panchakarma Specialist</SelectItem>
                        <SelectItem value="general">General Ayurvedic Physician</SelectItem>
                        <SelectItem value="cardiac">Cardiac Care Specialist</SelectItem>
                        <SelectItem value="diabetes">Diabetes Management</SelectItem>
                        <SelectItem value="pediatric">Pediatric Ayurveda</SelectItem>
                        <SelectItem value="gynecology">Ayurvedic Gynecology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="qualifications">
                      {language === 'en' ? 'Qualifications' : 'योग्यताएं'} *
                    </Label>
                    <Input
                      id="qualifications"
                      value={formData.qualifications}
                      onChange={(e) => handleInputChange('qualifications', e.target.value)}
                      required
                      placeholder="BAMS, MD (Panchakarma)"
                    />
                  </div>
                </div>
              </div>

              {/* Hospital Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Hospital Information' : 'अस्पताल की जानकारी'}
                </h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">
                      {language === 'en' ? 'You have been invited by:' : 'आपको आमंत्रित किया गया है:'}
                    </h4>
                  </div>
                  <p className="text-green-700">{formData.hospitalName}</p>
                  <p className="text-sm text-green-600 mt-2">
                    {language === 'en' 
                      ? 'Your registration will be verified by the hospital admin before activation.'
                      : 'सक्रियण से पहले अस्पताल प्रशासन द्वारा आपका पंजीकरण सत्यापित किया जाएगा।'
                    }
                  </p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="terms" className="mt-1" required />
                  <Label htmlFor="terms" className="text-sm text-gray-700">
                    {language === 'en' 
                      ? 'I agree to the terms and conditions and confirm that all information provided is accurate.'
                      : 'मैं नियमों और शर्तों से सहमत हूं और पुष्टि करता हूं कि प्रदान की गई सभी जानकारी सटीक है।'
                    }
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                  size="lg"
                >
                  {language === 'en' ? 'Complete Registration' : 'पंजीकरण पूरा करें'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}