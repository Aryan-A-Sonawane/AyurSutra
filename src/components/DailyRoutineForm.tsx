import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Clock, 
  Bell,
  Calendar,
  Repeat,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface DailyRoutineFormProps {
  onNavigate: (page: string) => void;
  patientId?: string;
  patientName?: string;
}

interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  reminderEnabled: boolean;
  reminderTime: number; // minutes before
}

export function DailyRoutineForm({ onNavigate, patientId = "P001", patientName = "John Doe" }: DailyRoutineFormProps) {
  const { language } = useLanguage();
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<RoutineItem>>({
    time: '',
    activity: '',
    description: '',
    priority: 'medium',
    category: 'general',
    reminderEnabled: true,
    reminderTime: 15
  });

  const categories = [
    { value: 'medicine', label: 'Medication', color: 'bg-red-100 text-red-800' },
    { value: 'diet', label: 'Diet & Nutrition', color: 'bg-green-100 text-green-800' },
    { value: 'exercise', label: 'Exercise & Yoga', color: 'bg-blue-100 text-blue-800' },
    { value: 'therapy', label: 'Therapy Activities', color: 'bg-purple-100 text-purple-800' },
    { value: 'meditation', label: 'Meditation & Breathing', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'hygiene', label: 'Personal Care', color: 'bg-teal-100 text-teal-800' },
    { value: 'sleep', label: 'Sleep & Rest', color: 'bg-gray-100 text-gray-800' },
    { value: 'general', label: 'General Activities', color: 'bg-amber-100 text-amber-800' }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'bg-red-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-amber-500' },
    { value: 'low', label: 'Low Priority', color: 'bg-green-500' }
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [
      { value: `${hour}:00`, label: `${hour}:00` },
      { value: `${hour}:30`, label: `${hour}:30` }
    ];
  }).flat();

  const predefinedActivities = {
    medicine: [
      'Take morning medication',
      'Take evening medication',
      'Apply herbal oil',
      'Take herbal supplements'
    ],
    diet: [
      'Drink warm water',
      'Have healthy breakfast',
      'Lunch with proper timing',
      'Light dinner',
      'Avoid cold drinks',
      'Take digestive tea'
    ],
    exercise: [
      'Morning walk',
      'Yoga practice',
      'Pranayama breathing',
      'Light stretching',
      'Evening exercise'
    ],
    therapy: [
      'Self oil massage',
      'Steam inhalation',
      'Warm compress',
      'Foot soak'
    ],
    meditation: [
      'Morning meditation',
      'Evening meditation',
      'Deep breathing exercise',
      'Mindfulness practice'
    ],
    hygiene: [
      'Oil pulling',
      'Tongue cleaning',
      'Nasal cleaning',
      'Warm shower'
    ],
    sleep: [
      'Prepare for sleep',
      'No screens before bed',
      'Herbal tea for sleep',
      'Early bedtime'
    ]
  };

  const addRoutineItem = () => {
    if (newItem.time && newItem.activity) {
      const item: RoutineItem = {
        id: Date.now().toString(),
        time: newItem.time!,
        activity: newItem.activity!,
        description: newItem.description || '',
        priority: newItem.priority || 'medium',
        category: newItem.category || 'general',
        reminderEnabled: newItem.reminderEnabled || true,
        reminderTime: newItem.reminderTime || 15
      };
      
      setRoutineItems(prev => [...prev, item].sort((a, b) => a.time.localeCompare(b.time)));
      setNewItem({
        time: '',
        activity: '',
        description: '',
        priority: 'medium',
        category: 'general',
        reminderEnabled: true,
        reminderTime: 15
      });
    }
  };

  const removeRoutineItem = (id: string) => {
    setRoutineItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const routineData = {
      patientId,
      patientName,
      routineItems,
      createdAt: new Date().toISOString(),
      createdBy: 'Dr. Rajesh Kumar' // This would come from authentication context
    };
    console.log('Daily routine submitted:', routineData);
    // Handle routine submission logic here
    onNavigate('practitioner-dashboard');
  };

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.value === category)?.color || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.value === priority)?.color || 'bg-gray-500';
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
              <h1 className="text-lg font-semibold text-green-800">Daily Routine Planner</h1>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info */}
        <Card className="mb-6 border-green-100 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-800">{patientName}</h2>
                <p className="text-sm text-gray-600">Patient ID: {patientId}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-600 text-white">
                  <Calendar className="w-3 h-3 mr-1" />
                  Daily Routine
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  {routineItems.length} Activities
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Activity */}
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Activity
              </CardTitle>
              <CardDescription>Create a new daily routine activity for the patient</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time" className="text-green-700">Time *</Label>
                  <Select 
                    value={newItem.time} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category" className="text-green-700">Category *</Label>
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="activity" className="text-green-700">Activity *</Label>
                <Input
                  id="activity"
                  value={newItem.activity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, activity: e.target.value }))}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  placeholder="e.g., Take morning medication, Do yoga practice"
                />
                
                {/* Predefined Activities */}
                {newItem.category && predefinedActivities[newItem.category as keyof typeof predefinedActivities] && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-1">
                      {predefinedActivities[newItem.category as keyof typeof predefinedActivities].map((activity, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setNewItem(prev => ({ ...prev, activity }))}
                          className="text-xs border-green-200 text-green-700 hover:bg-green-50"
                        >
                          {activity}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-green-700">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-16"
                  placeholder="Additional instructions or notes..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority" className="text-green-700">Priority</Label>
                  <Select 
                    value={newItem.priority} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, priority: value as 'high' | 'medium' | 'low' }))}
                  >
                    <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                            <span>{priority.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="reminderTime" className="text-green-700">Reminder (minutes before)</Label>
                  <Input
                    id="reminderTime"
                    type="number"
                    min="0"
                    max="120"
                    value={newItem.reminderTime}
                    onChange={(e) => setNewItem(prev => ({ ...prev, reminderTime: parseInt(e.target.value) || 0 }))}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reminderEnabled"
                  checked={newItem.reminderEnabled}
                  onCheckedChange={(checked) => setNewItem(prev => ({ ...prev, reminderEnabled: !!checked }))}
                  className="border-green-300"
                />
                <Label htmlFor="reminderEnabled" className="text-green-700">
                  Enable reminder notifications
                </Label>
              </div>

              <Button
                type="button"
                onClick={addRoutineItem}
                disabled={!newItem.time || !newItem.activity}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Routine
              </Button>
            </CardContent>
          </Card>

          {/* Daily Schedule Preview */}
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Daily Schedule
              </CardTitle>
              <CardDescription>Preview of the patient's daily routine</CardDescription>
            </CardHeader>
            <CardContent>
              {routineItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No activities added yet</p>
                  <p className="text-sm">Start by adding activities to create a routine</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {routineItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            {item.time}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
                          <Badge className={`text-xs ${getCategoryColor(item.category)}`}>
                            {categories.find(c => c.value === item.category)?.label}
                          </Badge>
                          {item.reminderEnabled && (
                            <Bell className="w-3 h-3 text-amber-600" />
                          )}
                        </div>
                        <h4 className="font-medium text-green-800 mb-1">{item.activity}</h4>
                        {item.description && (
                          <p className="text-sm text-gray-600">{item.description}</p>
                        )}
                        {item.reminderEnabled && (
                          <p className="text-xs text-amber-600 mt-1">
                            Reminder {item.reminderTime} min before
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRoutineItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary and Submit */}
        {routineItems.length > 0 && (
          <Card className="mt-8 border-green-100 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800">Routine Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-800">{routineItems.length}</div>
                  <div className="text-sm text-green-600">Total Activities</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-800">
                    {routineItems.filter(item => item.priority === 'high').length}
                  </div>
                  <div className="text-sm text-red-600">High Priority</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-800">
                    {routineItems.filter(item => item.reminderEnabled).length}
                  </div>
                  <div className="text-sm text-amber-600">With Reminders</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-800">
                    {new Set(routineItems.map(item => item.category)).size}
                  </div>
                  <div className="text-sm text-blue-600">Categories</div>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50 mb-6">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  This routine will be sent to the patient and integrated into their dashboard checklist. 
                  Reminder notifications will be sent based on the specified timing.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Daily Routine
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}