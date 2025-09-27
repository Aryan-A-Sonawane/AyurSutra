import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Clock, Bell, Activity, FileText, User, LogOut, Leaf } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { CalendarView } from "./CalendarView";
import { ReportsSection } from "./ReportsSection";

interface PatientDashboardProps {
  onNavigate: (page: string) => void;
}

export function PatientDashboard({ onNavigate }: PatientDashboardProps) {
  const { t } = useLanguage();

  const upcomingSessions = [
    { id: 1, therapy: 'Abhyanga', date: '2025-09-22', time: '10:00 AM', status: 'upcoming' },
    { id: 2, therapy: 'Swedana', date: '2025-09-24', time: '2:00 PM', status: 'upcoming' },
    { id: 3, therapy: 'Basti', date: '2025-09-26', time: '11:00 AM', status: 'upcoming' },
  ];

  const recentSessions = [
    { id: 1, therapy: 'Abhyanga', date: '2025-09-19', status: 'completed', rating: 5 },
    { id: 2, therapy: 'Swedana', date: '2025-09-17', status: 'completed', rating: 4 },
    { id: 3, therapy: 'Snehana', date: '2025-09-15', status: 'completed', rating: 5 },
  ];

  const notifications = [
    { id: 1, message: 'Reminder: Abhyanga session tomorrow at 10:00 AM', time: '2 hours ago', type: 'reminder' },
    { id: 2, message: 'Your therapy progress report is ready', time: '1 day ago', type: 'report' },
    { id: 3, message: 'Please provide feedback for your last session', time: '2 days ago', type: 'feedback' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-green-800">{t('heroTitle')}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notification Bell Icon */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-50 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
              <Button 
                onClick={() => onNavigate('hospital-search')} 
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Find Hospitals
              </Button>
              <Button 
                onClick={() => onNavigate('book-appointment')} 
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('bookAppointment')}
              </Button>
              <LanguageToggle />
              <Button variant="outline" onClick={() => onNavigate('home')} className="text-green-700 border-green-200 hover:bg-green-50">
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-green-800 mb-2">Welcome back, Patient</h1>
          <p className="text-gray-600">Track your Panchakarma therapy progress and manage your sessions.</p>
        </div>

        {/* Current Therapy Section */}
        <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Current Therapy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">Ongoing Treatment</h3>
                <p className="text-lg font-medium">Panchakarma Detoxification Program</p>
                <p className="text-sm text-gray-600 mt-1">Started: September 15, 2024</p>
                <p className="text-sm text-gray-600">Duration: 21 days</p>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>Day 7 of 21</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-green-700 mb-2">Treating Doctor & Hospital</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-gray-600">Panchakarma Specialist</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="font-medium">Green Valley Ayurveda Hospital</p>
                      <p className="text-sm text-gray-600">Sector 21, Dwarka, New Delhi</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" className="text-xs">
                      📞 +91 9876543210
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      ✉️ Contact Doctor
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white text-xs"
                      onClick={() => onNavigate('video-consultation')}
                    >
                      📹 Request Online Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-semibold text-green-800">24</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-semibold text-green-800">18</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-semibold text-green-800">6</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-2xl font-semibold text-green-800">75%</p>
                </div>
                <div className="w-8">
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-green-50 border border-green-200">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              {t('schedule')}
            </TabsTrigger>
            <TabsTrigger value="routine" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Daily Routine
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              {t('therapyProgress')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              {t('reports')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              {t('notifications')}
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              {t('profile')}
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab with Enhanced Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarView onBookAppointment={() => onNavigate('book-appointment')} userType="patient" />
          </TabsContent>

          {/* Daily Routine Tab */}
          <TabsContent value="routine" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Daily Ayurvedic Routine</CardTitle>
                <CardDescription>Follow your personalized daily routine for optimal health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '6:00 AM', activity: 'Wake up and drink warm water', completed: true, description: 'Start your day with a glass of warm water to cleanse your system' },
                    { time: '6:30 AM', activity: 'Oil pulling (Gandusha)', completed: true, description: 'Swish sesame oil in your mouth for 10-15 minutes' },
                    { time: '7:00 AM', activity: 'Morning meditation', completed: false, description: '15 minutes of pranayama and meditation' },
                    { time: '8:00 AM', activity: 'Light exercise/Yoga', completed: false, description: 'Gentle yoga asanas suitable for your constitution' },
                    { time: '9:00 AM', activity: 'Breakfast (Kapha balancing)', completed: false, description: 'Light, warm breakfast with ginger tea' },
                    { time: '12:00 PM', activity: 'Lunch (Main meal)', completed: false, description: 'Largest meal of the day with all six tastes' },
                    { time: '3:00 PM', activity: 'Herbal tea', completed: false, description: 'Digestive herbal tea to aid afternoon digestion' },
                    { time: '6:00 PM', activity: 'Evening walk', completed: false, description: '20-30 minutes gentle walk in nature' },
                    { time: '7:00 PM', activity: 'Light dinner', completed: false, description: 'Early, light dinner 3 hours before sleep' },
                    { time: '9:00 PM', activity: 'Self-massage (Abhyanga)', completed: false, description: 'Warm oil massage before bath' },
                    { time: '10:00 PM', activity: 'Bedtime preparation', completed: false, description: 'Prepare for sleep, avoid screens' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-green-800">{item.time}</h4>
                            <Badge 
                              variant={item.completed ? 'default' : 'secondary'}
                              className={item.completed ? 'bg-green-600 text-white' : 'bg-amber-100 text-amber-800'}
                            >
                              {item.completed ? '✓ Completed' : 'Pending'}
                            </Badge>
                          </div>
                          <p className="text-gray-800 font-medium">{item.activity}</p>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!item.completed && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Mark Done
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-800">Recent Sessions</CardTitle>
                  <CardDescription>Your completed therapy sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{session.therapy}</h4>
                          <p className="text-sm text-gray-600">{session.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {t(session.status)}
                          </Badge>
                          <span className="text-sm text-amber-600">★ {session.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-800">Therapy Progress</CardTitle>
                  <CardDescription>Overall progress tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Treatment Completion</span>
                      <span className="text-sm font-medium text-green-800">75%</span>
                    </div>
                    <Progress value={75} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Symptom Improvement</span>
                      <span className="text-sm font-medium text-green-800">85%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Overall Wellness</span>
                      <span className="text-sm font-medium text-green-800">80%</span>
                    </div>
                    <Progress value={80} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <ReportsSection />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Recent Notifications</CardTitle>
                <CardDescription>Stay updated with your therapy schedule and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <Bell className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          {t('yes')}
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-300">
                          {t('remindLater')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Patient Profile</CardTitle>
                <CardDescription>Your personal information and health details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">Personal Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <p className="font-medium">John Doe</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Age</label>
                        <p className="font-medium">35 years</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Gender</label>
                        <p className="font-medium">Male</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Contact</label>
                        <p className="font-medium">+91 98765 43210</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">Health Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Primary Condition</label>
                        <p className="font-medium">Chronic stress and anxiety</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Treatment Plan</label>
                        <p className="font-medium">21-day Panchakarma</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Practitioner</label>
                        <p className="font-medium">Dr. Rajesh Sharma</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}