import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { MapPin, Phone, Mail, Globe, Star, Clock, Users, Plus, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

interface HospitalRegistrationProps {
  onNavigate: (page: string) => void;
}

interface Service {
  id: string;
  name: string;
  timing: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
}

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  website: string;
}

export function HospitalRegistration ({ onNavigate }: HospitalRegistrationProps) {
  const { language, translations } = useLanguage();
  const [formData, setFormData] = useState({
    ownerEmail: '',
    ownerName: '',
    ownerPhone: '',
    hospitalName: '',
    address: '',
    pincode: '',
    bannerImage: ''
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    website: ''
  });

  const [services, setServices] = useState<Service[]>([
    { id: '1', name: 'Panchakarma Therapy', timing: '9:00 AM - 6:00 PM' },
    { id: '2', name: 'Cardiac Care', timing: '10:00 AM - 5:00 PM' },
    { id: '3', name: 'Diabetes Management', timing: '9:00 AM - 4:00 PM' }
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Rajesh Kumar', specialization: 'Panchakarma Specialist' },
    { id: '2', name: 'Dr. Priya Sharma', specialization: 'Ayurvedic Physician' }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', patientName: 'Amit Singh', rating: 5, comment: 'Excellent treatment and caring staff' },
    { id: '2', patientName: 'Sunita Devi', rating: 4, comment: 'Very good experience with Panchakarma therapy' }
  ]);

  const [newService, setNewService] = useState({ name: '', timing: '' });
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '' });
  const [newReview, setNewReview] = useState({ patientName: '', rating: 5, comment: '' });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const addService = () => {
    if (newService.name && newService.timing) {
      setServices(prev => [...prev, { id: Date.now().toString(), ...newService }]);
      setNewService({ name: '', timing: '' });
    }
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const addDoctor = () => {
    if (newDoctor.name && newDoctor.specialization) {
      setDoctors(prev => [...prev, { id: Date.now().toString(), ...newDoctor }]);
      setNewDoctor({ name: '', specialization: '' });
    }
  };

  const removeDoctor = (id: string) => {
    setDoctors(prev => prev.filter(doctor => doctor.id !== id));
  };

  const addReview = () => {
    if (newReview.patientName && newReview.comment) {
      setReviews(prev => [...prev, { id: Date.now().toString(), ...newReview }]);
      setNewReview({ patientName: '', rating: 5, comment: '' });
    }
  };

  const removeReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Hospital Registration Data:', { formData, socialLinks, services, doctors, reviews });
    // Handle form submission
    alert('Hospital registration submitted successfully!');
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
              <Button variant="outline" onClick={() => onNavigate('home')}>
                {language === 'en' ? 'Back to Home' : 'होम पर वापस'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">
              {language === 'en' ? 'Hospital Registration' : 'अस्पताल पंजीकरण'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Basic Information' : 'मूलभूत जानकारी'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hospitalName">
                      {language === 'en' ? 'Hospital Name' : 'अस्पताल का नाम'} *
                    </Label>
                    <Input
                      id="hospitalName"
                      value={formData.hospitalName}
                      onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">
                      {language === 'en' ? 'Owner Name' : 'मालिक का नाम'} *
                    </Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange('ownerName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerEmail">
                      {language === 'en' ? 'Owner Email' : 'मालिक का ईमेल'} *
                    </Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone">
                      {language === 'en' ? 'Owner Phone' : 'मालिक का फोन'} *
                    </Label>
                    <Input
                      id="ownerPhone"
                      type="tel"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">
                      {language === 'en' ? 'Hospital Address' : 'अस्पताल का पता'} *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">
                      {language === 'en' ? 'Pincode' : 'पिनकोड'} *
                    </Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Social Media Links' : 'सोशल मीडिया लिंक'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">
                      <Globe className="inline w-4 h-4 mr-1" />
                      {language === 'en' ? 'Website' : 'वेबसाइट'}
                    </Label>
                    <Input
                      id="website"
                      value={socialLinks.website}
                      onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                      placeholder="https://www.hospital.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={socialLinks.facebook}
                      onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                      placeholder="https://facebook.com/hospital"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                      placeholder="https://instagram.com/hospital"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      placeholder="https://twitter.com/hospital"
                    />
                  </div>
                </div>
              </div>

              {/* Banner Image */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Hospital Banner' : 'अस्पताल बैनर'}
                </h3>
                <div>
                  <Label htmlFor="bannerImage">
                    {language === 'en' ? 'Banner Image URL' : 'बैनर छवि URL'}
                  </Label>
                  <Input
                    id="bannerImage"
                    value={formData.bannerImage}
                    onChange={(e) => handleInputChange('bannerImage', e.target.value)}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>
                {formData.bannerImage && (
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={formData.bannerImage}
                      alt="Hospital Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Services Available' : 'उपलब्ध सेवाएं'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    placeholder={language === 'en' ? 'Service Name' : 'सेवा का नाम'}
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder={language === 'en' ? 'Timing' : 'समय'}
                    value={newService.timing}
                    onChange={(e) => setNewService(prev => ({ ...prev, timing: e.target.value }))}
                  />
                  <Button type="button" onClick={addService}>
                    <Plus className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Add Service' : 'सेवा जोड़ें'}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <Card key={service.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{service.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.timing}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeService(service.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Doctors */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Doctors List' : 'डॉक्टरों की सूची'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    placeholder={language === 'en' ? 'Doctor Name' : 'डॉक्टर का नाम'}
                    value={newDoctor.name}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder={language === 'en' ? 'Specialization' : 'विशेषज्ञता'}
                    value={newDoctor.specialization}
                    onChange={(e) => setNewDoctor(prev => ({ ...prev, specialization: e.target.value }))}
                  />
                  <Button type="button" onClick={addDoctor}>
                    <Plus className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Add Doctor' : 'डॉक्टर जोड़ें'}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <Card key={doctor.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeDoctor(doctor.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Customer Reviews */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-700 border-b border-green-200 pb-2">
                  {language === 'en' ? 'Patient Reviews' : 'मरीज़ों की समीक्षा'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Input
                    placeholder={language === 'en' ? 'Patient Name' : 'मरीज़ का नाम'}
                    value={newReview.patientName}
                    onChange={(e) => setNewReview(prev => ({ ...prev, patientName: e.target.value }))}
                  />
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md"
                    value={newReview.rating}
                    onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>{rating} Stars</option>
                    ))}
                  </select>
                  <Textarea
                    placeholder={language === 'en' ? 'Review Comment' : 'समीक्षा टिप्पणी'}
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    className="md:col-span-1"
                  />
                  <Button type="button" onClick={addReview}>
                    <Plus className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Add Review' : 'समीक्षा जोड़ें'}
                  </Button>
                </div>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.patientName}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeReview(review.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                  size="lg"
                >
                  {language === 'en' ? 'Register Hospital' : 'अस्पताल पंजीकृत करें'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}