import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Phone, HelpCircle, Info, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface BookAppointmentProps {
  onNavigate: (page: string) => void;
}

interface TherapyInfo {
  name: string;
  duration: string;
  description: string;
  prerequisites: string[];
  postCare: string[];
}

export function BookAppointment({ onNavigate }: BookAppointmentProps) {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTherapy, setSelectedTherapy] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    specialRequests: '',
    emergencyContact: ''
  });

  const therapies: Record<string, TherapyInfo> = {
    abhyanga: {
      name: 'Abhyanga',
      duration: '60 minutes',
      description: 'Full body warm oil massage that nourishes the skin and relaxes the nervous system',
      prerequisites: [
        'Fast for 2-3 hours before the session',
        'Avoid heavy meals on the day of treatment',
        'Wear comfortable, loose clothing',
        'Inform about any skin allergies'
      ],
      postCare: [
        'Rest for 30 minutes after treatment',
        'Take a warm shower after 1 hour',
        'Drink warm water throughout the day',
        'Avoid cold foods and drinks'
      ]
    },
    swedana: {
      name: 'Swedana',
      duration: '45 minutes',
      description: 'Herbal steam therapy to open pores and eliminate toxins through sweat',
      prerequisites: [
        'Have a light breakfast 2 hours before',
        'Stay well hydrated before the session',
        'Avoid alcohol 24 hours prior',
        'Inform about any heart conditions'
      ],
      postCare: [
        'Cool down gradually for 15 minutes',
        'Shower with lukewarm water',
        'Rest and avoid strenuous activities',
        'Maintain hydration with warm fluids'
      ]
    },
    basti: {
      name: 'Basti',
      duration: '90 minutes',
      description: 'Medicated enema therapy for deep cleansing and rejuvenation',
      prerequisites: [
        'Complete fasting from midnight before',
        'Take prescribed preparatory medicines',
        'Empty bladder before treatment',
        'Wear loose, comfortable clothing'
      ],
      postCare: [
        'Rest completely for 2-3 hours',
        'Eat only prescribed light foods',
        'Avoid physical exertion for 24 hours',
        'Follow strict dietary guidelines'
      ]
    },
    nasya: {
      name: 'Nasya',
      duration: '30 minutes',
      description: 'Nasal administration of medicated oils for respiratory and mental clarity',
      prerequisites: [
        'Avoid eating 1 hour before treatment',
        'Clear nasal passages naturally',
        'Inform about any nasal conditions',
        'Avoid cold drinks before session'
      ],
      postCare: [
        'Rest with head elevated for 30 minutes',
        'Avoid cold air exposure',
        'Drink warm water only',
        'No nose blowing for 1 hour'
      ]
    },
    snehana: {
      name: 'Snehana',
      duration: '75 minutes',
      description: 'Internal and external oleation therapy to prepare body for panchakarma',
      prerequisites: [
        'Fast for 4-6 hours before treatment',
        'Take prescribed preparatory medicines',
        'Avoid cold foods and drinks',
        'Inform about digestive issues'
      ],
      postCare: [
        'Rest completely for 2 hours',
        'Eat only warm, easily digestible foods',
        'Avoid exercise and stress',
        'Follow prescribed diet plan'
      ]
    }
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const bookedSlots = ['10:00 AM', '02:30 PM', '04:00 PM']; // Mock booked slots

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking:', { selectedDate, selectedTime, selectedTherapy, formData });
    // Navigate to confirmation or dashboard
    onNavigate('patient-dashboard');
  };

  const isSlotBooked = (slot: string) => bookedSlots.includes(slot);
  const selectedTherapyInfo = selectedTherapy ? therapies[selectedTherapy] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => onNavigate('patient-dashboard')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            
            <div>
              <h1 className="text-lg font-semibold text-green-800">Book Appointment</h1>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}
                `}>
                  {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {step === 1 ? 'Date & Time' : step === 2 ? 'Therapy Type' : 'Confirmation'}
                </span>
                {step < 3 && <div className="w-16 h-0.5 bg-gray-300 ml-4"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Date & Time Selection */}
        {currentStep === 1 && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border-green-200"
                />
              </CardContent>
            </Card>

            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Select Time</CardTitle>
                <CardDescription>Choose your preferred time slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTime === slot ? "default" : "outline"}
                      disabled={isSlotBooked(slot)}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        ${selectedTime === slot 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'border-green-200 text-green-700 hover:bg-green-50'
                        }
                        ${isSlotBooked(slot) ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot}
                      {isSlotBooked(slot) && <span className="ml-1 text-xs">(Booked)</span>}
                    </Button>
                  ))}
                </div>
                
                {selectedDate && selectedTime && (
                  <Alert className="mt-4 border-green-200 bg-green-50">
                    <Info className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Selected: {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {selectedTime}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Therapy Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Select Panchakarma Therapy</CardTitle>
                <CardDescription>Choose the type of treatment you would like to receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(therapies).map(([key, therapy]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all border-2 ${
                        selectedTherapy === key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setSelectedTherapy(key)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-green-800 mb-2">{therapy.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{therapy.duration}</p>
                        <p className="text-sm text-gray-700">{therapy.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedTherapyInfo && (
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <CardTitle className="text-amber-800 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    {selectedTherapyInfo.name} - Important Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2">Pre-Treatment Requirements:</h4>
                    <ul className="space-y-1">
                      {selectedTherapyInfo.prerequisites.map((req, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start">
                          <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2">Post-Treatment Care:</h4>
                    <ul className="space-y-1">
                      {selectedTherapyInfo.postCare.map((care, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start">
                          <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {care}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Appointment Summary</CardTitle>
                <CardDescription>Please review your appointment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-green-700">Date & Time</Label>
                      <p className="font-medium">
                        {selectedDate?.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} at {selectedTime}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-green-700">Therapy</Label>
                      <p className="font-medium">{selectedTherapyInfo?.name}</p>
                      <p className="text-sm text-gray-600">{selectedTherapyInfo?.duration}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="specialRequests" className="text-green-700">Special Requests (Optional)</Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        placeholder="Any special requirements or health conditions to note..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyContact" className="text-green-700">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                        className="border-green-200 focus:border-green-400 focus:ring-green-400"
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Options */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-4 text-center">
                  <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-blue-800 mb-1">Call Reception</h3>
                  <p className="text-sm text-blue-600 mb-3">Speak directly with our reception team</p>
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50/50">
                <CardContent className="p-4 text-center">
                  <HelpCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-medium text-purple-800 mb-1">Need Help?</h3>
                  <p className="text-sm text-purple-600 mb-3">Get assistance with your booking</p>
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Get Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {currentStep < 3 ? (
              <Button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && (!selectedDate || !selectedTime)) ||
                  (currentStep === 2 && !selectedTherapy)
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleBooking}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}