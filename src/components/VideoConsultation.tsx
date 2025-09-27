import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Video, 
  Clock, 
  Calendar, 
  CreditCard, 
  Check, 
  User,
  Phone,
  Mail
} from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoConsultationProps {
  onNavigate: (page: string) => void;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  consultationFee: number;
  nextAvailable: string;
  image: string;
}

interface ConsultationRequest {
  doctorId: string;
  patientSymptoms: string;
  preferredDate: string;
  preferredTime: string;
  urgency: string;
}

export function VideoConsultation({ onNavigate }: VideoConsultationProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState<'select' | 'request' | 'payment' | 'confirmation'>('select');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultationRequest, setConsultationRequest] = useState<ConsultationRequest>({
    doctorId: '',
    patientSymptoms: '',
    preferredDate: '',
    preferredTime: '',
    urgency: 'normal'
  });

  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Panchakarma Specialist',
      experience: '12 years',
      rating: 4.8,
      consultationFee: 800,
      nextAvailable: '2024-01-25 10:00 AM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      specialization: 'General Ayurvedic Physician',
      experience: '8 years',
      rating: 4.6,
      consultationFee: 600,
      nextAvailable: '2024-01-25 02:00 PM',
      image: 'https://images.unsplash.com/photo-1594824475270-b4ad2a6b2dbe?w=150'
    },
    {
      id: '3',
      name: 'Dr. Amit Singh',
      specialization: 'Cardiac Care Specialist',
      experience: '15 years',
      rating: 4.9,
      consultationFee: 1000,
      nextAvailable: '2024-01-26 11:00 AM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'
    }
  ]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setConsultationRequest(prev => ({ ...prev, doctorId: doctor.id }));
    setStep('request');
  };

  const handleRequestSubmit = () => {
    setStep('payment');
  };

  const handlePaymentConfirm = () => {
    setStep('confirmation');
  };

  const renderDoctorSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          {language === 'en' ? 'Select Doctor for Video Consultation' : 'वीडियो परामर्श के लिए डॉक्टर चुनें'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Choose from our experienced Ayurvedic specialists' : 'हमारे अनुभवी आयुर्वेदिक विशेषज्ञों में से चुनें'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-bold text-lg">{doctor.name}</h3>
                <p className="text-green-600 text-sm">{doctor.specialization}</p>
                <p className="text-gray-500 text-sm">{doctor.experience} experience</p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>{language === 'en' ? 'Rating:' : 'रेटिंग:'}</span>
                  <span className="text-yellow-600">★ {doctor.rating}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{language === 'en' ? 'Consultation Fee:' : 'परामर्श शुल्क:'}</span>
                  <span className="font-semibold">₹{doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{language === 'en' ? 'Next Available:' : 'अगली उपलब्धता:'}</span>
                  <span className="text-green-600 text-xs">{doctor.nextAvailable}</span>
                </div>
              </div>

              <Button
                onClick={() => handleDoctorSelect(doctor)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Video className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Select Doctor' : 'डॉक्टर चुनें'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderConsultationRequest = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            {language === 'en' ? 'Request Video Consultation' : 'वीडियो परामर्श का अनुरोध करें'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selected Doctor Info */}
          {selectedDoctor && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{selectedDoctor.name}</h3>
                  <p className="text-sm text-green-600">{selectedDoctor.specialization}</p>
                  <p className="text-sm text-gray-600">₹{selectedDoctor.consultationFee} consultation fee</p>
                </div>
              </div>
            </div>
          )}

          {/* Request Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms">
                {language === 'en' ? 'Describe your symptoms/concern' : 'अपने लक्षण/चिंता का वर्णन करें'} *
              </Label>
              <Textarea
                id="symptoms"
                value={consultationRequest.patientSymptoms}
                onChange={(e) => setConsultationRequest(prev => ({ ...prev, patientSymptoms: e.target.value }))}
                placeholder={language === 'en' ? 'Please describe your health concerns...' : 'कृपया अपनी स्वास्थ्य संबंधी चिंताओं का वर्णन करें...'}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">
                  {language === 'en' ? 'Preferred Date' : 'पसंदीदा तारीख'} *
                </Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={consultationRequest.preferredDate}
                  onChange={(e) => setConsultationRequest(prev => ({ ...prev, preferredDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <Label htmlFor="preferredTime">
                  {language === 'en' ? 'Preferred Time' : 'पसंदीदा समय'} *
                </Label>
                <Select
                  value={consultationRequest.preferredTime}
                  onValueChange={(value) => setConsultationRequest(prev => ({ ...prev, preferredTime: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select time' : 'समय चुनें'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="17:00">05:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="urgency">
                {language === 'en' ? 'Urgency Level' : 'तात्कालिकता का स्तर'}
              </Label>
              <Select
                value={consultationRequest.urgency}
                onValueChange={(value) => setConsultationRequest(prev => ({ ...prev, urgency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">{language === 'en' ? 'Normal' : 'सामान्य'}</SelectItem>
                  <SelectItem value="urgent">{language === 'en' ? 'Urgent' : 'तत्काल'}</SelectItem>
                  <SelectItem value="emergency">{language === 'en' ? 'Emergency' : 'आपातकाल'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep('select')} className="flex-1">
              {language === 'en' ? 'Back' : 'वापस'}
            </Button>
            <Button
              onClick={handleRequestSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!consultationRequest.patientSymptoms || !consultationRequest.preferredDate || !consultationRequest.preferredTime}
            >
              {language === 'en' ? 'Continue to Payment' : 'भुगतान के लिए जारी रखें'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {language === 'en' ? 'Payment Details' : 'भुगतान विवरण'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Consultation Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">
              {language === 'en' ? 'Consultation Summary' : 'परामर्श सारांश'}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Doctor:' : 'डॉक्टर:'}</span>
                <span>{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Date:' : 'तारीख:'}</span>
                <span>{consultationRequest.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Time:' : 'समय:'}</span>
                <span>{consultationRequest.preferredTime}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>{language === 'en' ? 'Consultation Fee:' : 'परामर्श शुल्क:'}</span>
                <span>₹{selectedDoctor?.consultationFee}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">{language === 'en' ? 'Card Number' : 'कार्ड नंबर'}</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">{language === 'en' ? 'Expiry Date' : 'समाप्ति तिथि'}</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div>
              <Label htmlFor="cardName">{language === 'en' ? 'Cardholder Name' : 'कार्डधारक का नाम'}</Label>
              <Input id="cardName" placeholder="John Doe" />
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep('request')} className="flex-1">
              {language === 'en' ? 'Back' : 'वापस'}
            </Button>
            <Button
              onClick={handlePaymentConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {language === 'en' ? 'Pay & Confirm' : 'भुगतान करें और पुष्टि करें'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center">
      <Card>
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {language === 'en' ? 'Request Submitted Successfully!' : 'अनुरोध सफलतापूर्वक जमा किया गया!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'en' 
              ? 'Your video consultation request has been sent to the doctor. You will receive a confirmation within 24 hours.'
              : 'आपका वीडियो परामर्श अनुरोध डॉक्टर को भेज दिया गया है। आपको 24 घंटे के अंदर पुष्टि मिल जाएगी।'
            }
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? 'What happens next?' : 'आगे क्या होगा?'}
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {language === 'en' ? 'Doctor will review your request' : 'डॉक्टर आपके अनुरोध की समीक्षा करेंगे'}</li>
              <li>• {language === 'en' ? 'You\'ll receive confirmation with meeting link' : 'आपको मीटिंग लिंक के साथ पुष्टि मिलेगी'}</li>
              <li>• {language === 'en' ? 'Join the video call at scheduled time' : 'निर्धारित समय पर वीडियो कॉल में शामिल हों'}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('patient-dashboard')}
              className="flex-1"
            >
              {language === 'en' ? 'Go to Dashboard' : 'डैशबोर्ड पर जाएं'}
            </Button>
            <Button
              onClick={() => {
                setStep('select');
                setSelectedDoctor(null);
                setConsultationRequest({
                  doctorId: '',
                  patientSymptoms: '',
                  preferredDate: '',
                  preferredTime: '',
                  urgency: 'normal'
                });
              }}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {language === 'en' ? 'Book Another Consultation' : 'एक और परामर्श बुक करें'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
              <Button variant="outline" onClick={() => onNavigate('hospital-search')}>
                {language === 'en' ? 'Back' : 'वापस'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {step === 'select' && renderDoctorSelection()}
        {step === 'request' && renderConsultationRequest()}
        {step === 'payment' && renderPayment()}
        {step === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
}