import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Plus, Minus, Save, Info, Bell, Upload, X, FileImage } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface AddReportFormProps {
  onNavigate: (page: string) => void;
  patientId?: string;
  patientName?: string;
}

interface Reminder {
  id: number;
  hours: number;
  message: string;
}

export function AddReportForm({ onNavigate, patientId, patientName = "John Doe" }: AddReportFormProps) {
  const { t } = useLanguage();
  const [nextSessionDate, setNextSessionDate] = useState<Date>();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isTimeSensitive, setIsTimeSensitive] = useState(false);
  const [newReminderHours, setNewReminderHours] = useState<number>(24);
  const [newReminderMessage, setNewReminderMessage] = useState('');

  const [formData, setFormData] = useState({
    sessionType: '',
    findings: '',
    recommendations: '',
    improvementScore: '',
    nextSessionTherapy: '',
    nextSessionTime: '',
    postTherapyInstructions: '',
    medicationChanges: '',
    followUpNotes: ''
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const therapyTypes = [
    { value: 'abhyanga', label: 'Abhyanga' },
    { value: 'swedana', label: 'Swedana' },
    { value: 'basti', label: 'Basti' },
    { value: 'nasya', label: 'Nasya' },
    { value: 'snehana', label: 'Snehana' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addReminder = () => {
    if (newReminderHours > 0 && newReminderMessage.trim()) {
      const newReminder: Reminder = {
        id: Date.now(),
        hours: newReminderHours,
        message: newReminderMessage
      };
      setReminders(prev => [...prev, newReminder]);
      setNewReminderHours(24);
      setNewReminderMessage('');
    }
  };

  const removeReminder = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = files.filter(file => file.type.startsWith('image/'));
      setUploadedImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reportData = {
      ...formData,
      nextSessionDate,
      reminders: isTimeSensitive ? reminders : [],
      patientId,
      createdAt: new Date().toISOString()
    };
    console.log('Report submitted:', reportData);
    // Handle report submission logic here
    onNavigate('practitioner-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => onNavigate('practitioner-dashboard')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            
            <div>
              <h1 className="text-lg font-semibold text-green-800">Add Session Report</h1>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info */}
        <Card className="mb-6 border-green-100 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-800">{patientName}</h2>
                <p className="text-sm text-gray-600">Patient ID: {patientId || 'P-001'}</p>
              </div>
              <Badge className="bg-green-600 text-white">Active Treatment</Badge>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Details */}
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800">Session Details</CardTitle>
              <CardDescription>Record the details of today's therapy session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionType" className="text-green-700">Therapy Type</Label>
                  <Select value={formData.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select therapy type" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapyTypes.map((therapy) => (
                        <SelectItem key={therapy.value} value={therapy.value}>
                          {therapy.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="improvementScore" className="text-green-700">Improvement Score (%)</Label>
                  <Input
                    id="improvementScore"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.improvementScore}
                    onChange={(e) => handleInputChange('improvementScore', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder="0-100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="findings" className="text-green-700">Session Findings</Label>
                <Textarea
                  id="findings"
                  value={formData.findings}
                  onChange={(e) => handleInputChange('findings', e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-24"
                  placeholder="Describe patient response, observations, and session outcomes..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="recommendations" className="text-green-700">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={formData.recommendations}
                  onChange={(e) => handleInputChange('recommendations', e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-20"
                  placeholder="Treatment recommendations and adjustments..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Post-Therapy Instructions */}
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="text-amber-800">Post-Therapy Instructions</CardTitle>
              <CardDescription>Instructions for patient care after this session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="postTherapyInstructions" className="text-amber-700">Care Instructions</Label>
                <Textarea
                  id="postTherapyInstructions"
                  value={formData.postTherapyInstructions}
                  onChange={(e) => handleInputChange('postTherapyInstructions', e.target.value)}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 min-h-20"
                  placeholder="Diet restrictions, rest periods, activities to avoid, medication timing..."
                />
              </div>

              <div>
                <Label htmlFor="medicationChanges" className="text-amber-700">Medication Changes (if any)</Label>
                <Textarea
                  id="medicationChanges"
                  value={formData.medicationChanges}
                  onChange={(e) => handleInputChange('medicationChanges', e.target.value)}
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 min-h-16"
                  placeholder="New prescriptions, dosage adjustments, discontinued medications..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Next Session Scheduling */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-blue-800">Schedule Next Session</CardTitle>
              <CardDescription>Plan the patient's next therapy appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-blue-700">Next Session Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal border-blue-200 hover:bg-blue-100"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                        {nextSessionDate ? nextSessionDate.toLocaleDateString() : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={nextSessionDate}
                        onSelect={setNextSessionDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="nextSessionTime" className="text-blue-700">Time</Label>
                  <Select value={formData.nextSessionTime} onValueChange={(value) => handleInputChange('nextSessionTime', value)}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nextSessionTherapy" className="text-blue-700">Therapy Type</Label>
                  <Select value={formData.nextSessionTherapy} onValueChange={(value) => handleInputChange('nextSessionTherapy', value)}>
                    <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select therapy" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapyTypes.map((therapy) => (
                        <SelectItem key={therapy.value} value={therapy.value}>
                          {therapy.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time-Sensitive Reminders */}
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Patient Reminders
              </CardTitle>
              <CardDescription>Set up automated reminders for the patient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="timeSensitive"
                  checked={isTimeSensitive}
                  onCheckedChange={setIsTimeSensitive}
                  className="border-purple-300"
                />
                <Label htmlFor="timeSensitive" className="text-purple-700">
                  Set time-sensitive reminders for this patient
                </Label>
              </div>

              {isTimeSensitive && (
                <div className="space-y-4 p-4 bg-white rounded-lg border border-purple-200">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="reminderHours" className="text-purple-700">Remind after (hours)</Label>
                      <Input
                        id="reminderHours"
                        type="number"
                        min="1"
                        value={newReminderHours}
                        onChange={(e) => setNewReminderHours(parseInt(e.target.value) || 1)}
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="reminderMessage" className="text-purple-700">Reminder Message</Label>
                      <Input
                        id="reminderMessage"
                        value={newReminderMessage}
                        onChange={(e) => setNewReminderMessage(e.target.value)}
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        placeholder="e.g., Take prescribed medication, Follow diet restrictions..."
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    onClick={addReminder}
                    disabled={!newReminderMessage.trim() || newReminderHours <= 0}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reminder
                  </Button>

                  {reminders.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-purple-800">Scheduled Reminders:</h4>
                      {reminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 bg-purple-100 rounded-lg">
                          <div>
                            <p className="font-medium text-purple-800">After {reminder.hours} hours</p>
                            <p className="text-sm text-purple-600">{reminder.message}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeReminder(reminder.id)}
                            className="border-purple-300 text-purple-700 hover:bg-purple-200"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Upload Section */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center">
                <FileImage className="h-5 w-5 mr-2" />
                Report Images
              </CardTitle>
              <CardDescription>Upload relevant images, test results, or medical reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="imageUpload" className="text-blue-700">
                  Upload Images (JPG, PNG, GIF)
                </Label>
                <div className="mt-2">
                  <Input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <p className="text-sm text-blue-600 mt-1">
                    You can select multiple images at once. Maximum 10 images.
                  </p>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviewUrls.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-800">Uploaded Images:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Report image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-blue-200"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-1 left-1 right-1">
                          <Badge variant="secondary" className="text-xs truncate">
                            {uploadedImages[index]?.name}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Follow-up Notes */}
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800">Additional Notes</CardTitle>
              <CardDescription>Any additional observations or follow-up requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="followUpNotes" className="text-green-700">Follow-up Notes</Label>
                <Textarea
                  id="followUpNotes"
                  value={formData.followUpNotes}
                  onChange={(e) => handleInputChange('followUpNotes', e.target.value)}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-20"
                  placeholder="Special considerations, family involvement, lifestyle recommendations..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary Alert */}
          {nextSessionDate && formData.nextSessionTherapy && (
            <Alert className="border-green-200 bg-green-50">
              <Info className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Next session scheduled: {nextSessionDate.toLocaleDateString()} at {formData.nextSessionTime} for {formData.nextSessionTherapy}
                {isTimeSensitive && reminders.length > 0 && (
                  <span className="block mt-1">
                    {reminders.length} reminder(s) will be sent to the patient
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8">
              <Save className="h-4 w-4 mr-2" />
              Save Report & Schedule
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}