import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Users, 
  Search,
  Filter,
  Navigation,
  Video
} from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface HospitalSearchPageProps {
  onNavigate: (page: string) => void;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  pincode: string;
  distance: string;
  rating: number;
  reviewCount: number;
  services: string[];
  doctors: {
    total: number;
    male: number;
    female: number;
  };
  timing: string;
  phone: string;
  image: string;
  consultationFee: number;
}

export function HospitalSearchPage({ onNavigate }: HospitalSearchPageProps) {
  const { language } = useLanguage();
  const [searchPincode, setSearchPincode] = useState('');
  const [malePreference, setMalePreference] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [hospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'Green Valley Ayurveda Hospital',
      address: 'Sector 21, Dwarka, New Delhi',
      pincode: '110075',
      distance: '2.5 km',
      rating: 4.8,
      reviewCount: 324,
      services: ['Panchakarma', 'Cardiac Care', 'Diabetes Management'],
      doctors: { total: 12, male: 7, female: 5 },
      timing: '8:00 AM - 8:00 PM',
      phone: '+91 9876543210',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
      consultationFee: 500
    },
    {
      id: '2',
      name: 'Ayurvedic Wellness Center',
      address: 'Janakpuri, New Delhi',
      pincode: '110058',
      distance: '4.2 km',
      rating: 4.6,
      reviewCount: 198,
      services: ['Panchakarma', 'Detox Therapy', 'Pain Management'],
      doctors: { total: 8, male: 3, female: 5 },
      timing: '9:00 AM - 7:00 PM',
      phone: '+91 9876543211',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      consultationFee: 400
    },
    {
      id: '3',
      name: 'Shree Krishna Ayurveda',
      address: 'Lajpat Nagar, New Delhi',
      pincode: '110024',
      distance: '6.1 km',
      rating: 4.7,
      reviewCount: 276,
      services: ['Traditional Panchakarma', 'Herbal Medicine', 'Yoga Therapy'],
      doctors: { total: 15, male: 9, female: 6 },
      timing: '7:00 AM - 9:00 PM',
      phone: '+91 9876543212',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400',
      consultationFee: 600
    }
  ]);

  const filteredHospitals = hospitals.filter(hospital => {
    if (searchPincode && !hospital.pincode.includes(searchPincode)) {
      return false;
    }
    if (malePreference && hospital.doctors.male === 0) {
      return false;
    }
    if (!malePreference && hospital.doctors.female === 0) {
      return false;
    }
    return true;
  });

  const handleBookAppointment = (hospitalId: string) => {
    onNavigate(`book-appointment?hospital=${hospitalId}`);
  };

  const handleVideoConsultation = (hospitalId: string) => {
    onNavigate(`video-consultation?hospital=${hospitalId}`);
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
              <Button variant="outline" onClick={() => onNavigate('patient-dashboard')}>
                {language === 'en' ? 'Back to Dashboard' : 'डैशबोर्ड पर वापस'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Find Panchakarma Centers' : 'पंचकर्म केंद्र खोजें'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' ? 'Discover the best Ayurvedic hospitals near you' : 'अपने पास के सर्वश्रेष्ठ आयुर्वेदिक अस्पतालों की खोज करें'}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder={language === 'en' ? 'Enter pincode to search' : 'खोजने के लिए पिनकोड दर्ज करें'}
                      value={searchPincode}
                      onChange={(e) => setSearchPincode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {language === 'en' ? 'Filters' : 'फिल्टर'}
                </Button>
              </div>

              {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="gender-preference"
                      checked={malePreference}
                      onCheckedChange={setMalePreference}
                    />
                    <Label htmlFor="gender-preference" className="cursor-pointer">
                      {malePreference 
                        ? (language === 'en' ? 'Prefer Male Doctors' : 'पुरुष डॉक्टर को प्राथमिकता')
                        : (language === 'en' ? 'Prefer Female Doctors' : 'महिला डॉक्टर को प्राथमिकता')
                      }
                    </Label>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Hospital Results */}
        <div className="space-y-6">
          {filteredHospitals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">
                  {language === 'en' ? 'No hospitals found matching your criteria.' : 'आपके मापदंडों से मेल खाने वाला कोई अस्पताल नहीं मिला।'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate(`hospital-detail?id=${hospital.id}`)}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Hospital Image */}
                    <div className="lg:w-64 h-48 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={hospital.image}
                        alt={hospital.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Hospital Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-green-800 mb-2 hover:text-green-600">{hospital.name}</h3>
                          <div className="flex items-center text-gray-600 mb-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{hospital.address}</span>
                            <Badge variant="outline" className="ml-2">{hospital.distance}</Badge>
                          </div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Phone className="w-4 h-4 mr-1" />
                            <span className="text-sm">{hospital.phone}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{hospital.timing}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold">{hospital.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({hospital.reviewCount} reviews)</span>
                          </div>
                          <div className="text-sm text-green-600 font-semibold">
                            ₹{hospital.consultationFee} consultation
                          </div>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          {language === 'en' ? 'Services:' : 'सेवाएं:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.services.map((service, index) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Doctors Info */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          {language === 'en' ? 'Doctors Available:' : 'उपलब्ध डॉक्टर:'}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {hospital.doctors.total} {language === 'en' ? 'Total' : 'कुल'}
                          </div>
                          <div>
                            {hospital.doctors.male} {language === 'en' ? 'Male' : 'पुरुष'}
                          </div>
                          <div>
                            {hospital.doctors.female} {language === 'en' ? 'Female' : 'महिला'}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookAppointment(hospital.id);
                          }}
                          className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                        >
                          <Navigation className="w-4 h-4" />
                          {language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVideoConsultation(hospital.id);
                          }}
                          className="flex items-center gap-2 border-green-600 text-green-600 hover:bg-green-50"
                        >
                          <Video className="w-4 h-4" />
                          {language === 'en' ? 'Video Consultation' : 'वीडियो परामर्श'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          {language === 'en' ? 'View on Map' : 'मैप पर देखें'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(`hospital-detail?id=${hospital.id}`);
                          }}
                          className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          {language === 'en' ? 'View Details' : 'विवरण देखें'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* No Results Message */}
        {searchPincode && filteredHospitals.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {language === 'en' ? 'No hospitals found in your area' : 'आपके क्षेत्र में कोई अस्पताल नहीं मिला'}
              </h3>
              <p className="text-gray-500 mb-4">
                {language === 'en' 
                  ? 'Try searching with a different pincode or browse all available hospitals.'
                  : 'किसी अन्य पिनकोड से खोजने का प्रयास करें या सभी उपलब्ध अस्पतालों को देखें।'
                }
              </p>
              <Button onClick={() => setSearchPincode('')} variant="outline">
                {language === 'en' ? 'View All Hospitals' : 'सभी अस्पताल देखें'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}