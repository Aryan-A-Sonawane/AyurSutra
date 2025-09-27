import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Calendar, TrendingUp, Clock, Search, Plus, LogOut, Leaf, FileText, Bell } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { ViewReportsModal } from "./ViewReportsModal";
import { CalendarView } from "./CalendarView";
import { useState } from "react";

interface PractitionerDashboardProps {
  onNavigate: (page: string) => void;
}

export function PractitionerDashboard({ onNavigate }: PractitionerDashboardProps) {
  const { t } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState<{id: string, name: string} | null>(null);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  const patients = [
    { id: 'P-001', name: 'John Doe', age: 35, condition: 'Chronic stress', progress: 75, nextSession: '2025-09-22' },
    { id: 'P-002', name: 'Sarah Smith', age: 42, condition: 'Digestive issues', progress: 60, nextSession: '2025-09-23' },
    { id: 'P-003', name: 'Mike Johnson', age: 28, condition: 'Insomnia', progress: 90, nextSession: '2025-09-24' },
    { id: 'P-004', name: 'Lisa Wilson', age: 38, condition: 'Joint pain', progress: 45, nextSession: '2025-09-25' },
  ];

  const todaySchedule = [
    { time: '09:00 AM', patient: 'John Doe', therapy: 'Abhyanga', status: 'upcoming' },
    { time: '11:00 AM', patient: 'Sarah Smith', therapy: 'Swedana', status: 'upcoming' },
    { time: '02:00 PM', patient: 'Mike Johnson', therapy: 'Basti', status: 'completed' },
    { time: '04:00 PM', patient: 'Lisa Wilson', therapy: 'Snehana', status: 'upcoming' },
  ];

  const progressData = [
    { month: 'Jan', patients: 20, satisfaction: 4.2 },
    { month: 'Feb', patients: 25, satisfaction: 4.3 },
    { month: 'Mar', patients: 30, satisfaction: 4.5 },
    { month: 'Apr', patients: 28, satisfaction: 4.4 },
    { month: 'May', patients: 35, satisfaction: 4.6 },
    { month: 'Jun', patients: 32, satisfaction: 4.5 },
  ];

  const therapyStats = [
    { therapy: 'Abhyanga', count: 45, avg_rating: 4.7 },
    { therapy: 'Swedana', count: 38, avg_rating: 4.5 },
    { therapy: 'Basti', count: 32, avg_rating: 4.6 },
    { therapy: 'Snehana', count: 28, avg_rating: 4.4 },
  ];

  const handleUpdatePatient = (patientId: string, patientName: string) => {
    // Navigate to add report form with patient info
    onNavigate(`add-report?patientId=${patientId}&patientName=${encodeURIComponent(patientName)}`);
  };

  const handleViewReports = (patientId: string, patientName: string) => {
    setSelectedPatient({ id: patientId, name: patientName });
    setIsReportsModalOpen(true);
  };

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
              <span className="text-lg font-semibold text-green-800">{t('heroTitle')} - Practitioner</span>
            </div>
            
            <div className="flex items-center space-x-4">
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
          <h1 className="text-2xl font-semibold text-green-800 mb-2">Welcome, Dr. Rajesh Sharma</h1>
          <p className="text-gray-600">Manage your patients and track their Panchakarma therapy progress.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-semibold text-green-800">124</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Sessions</p>
                  <p className="text-2xl font-semibold text-green-800">8</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-semibold text-green-800">4.6</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Plans</p>
                  <p className="text-2xl font-semibold text-green-800">32</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-green-50 border border-green-200">
            <TabsTrigger value="patients" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              {t('patients')}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Clock className="h-4 w-4 mr-2" />
              Today's Schedule
            </TabsTrigger>
            <TabsTrigger value="blogs" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              {t('notifications')}
            </TabsTrigger>
          </TabsList>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-green-800">Patient Management</CardTitle>
                    <CardDescription>Monitor and manage your patients' therapy progress</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search patients..." className="pl-10 border-green-200" />
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Patient
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Next Session</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${patient.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{patient.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{patient.nextSession}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-green-200 text-green-700 hover:bg-green-50"
                              onClick={() => handleViewReports(patient.id, patient.name)}
                            >
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleUpdatePatient(patient.id, patient.name)}
                            >
                              Report
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                              onClick={() => onNavigate(`daily-routine-form?patientId=${patient.id}&patientName=${encodeURIComponent(patient.name)}`)}
                            >
                              Routine
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarView onBookAppointment={() => onNavigate('book-appointment')} userType="practitioner" />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Today's Schedule</CardTitle>
                <CardDescription>Manage your therapy sessions for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                          <Clock className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-800">{session.time}</h3>
                          <p className="text-gray-600">{session.patient}</p>
                          <p className="text-sm text-gray-500">{session.therapy}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={session.status === 'completed' ? 'default' : 'secondary'}
                          className={session.status === 'completed' ? 'bg-green-600 text-white' : 'bg-amber-100 text-amber-800'}
                        >
                          {session.status}
                        </Badge>
                        {session.status === 'upcoming' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Mark Complete
                          </Button>
                        )}
                        {session.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-green-200 text-green-700 hover:bg-green-50"
                            onClick={() => {
                              const patient = patients.find(p => p.name === session.patient);
                              if (patient) handleUpdatePatient(patient.id, patient.name);
                            }}
                          >
                            Add Report
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-green-800">Educational Blogs</CardTitle>
                    <CardDescription>Create and manage your educational blog posts</CardDescription>
                  </div>
                  <Button 
                    onClick={() => onNavigate('blog-post-form')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Blog
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample blog posts */}
                  {[
                    {
                      id: 1,
                      title: "Understanding Panchakarma: The Science Behind Ancient Wisdom",
                      excerpt: "Explore how modern research validates traditional Panchakarma treatments...",
                      status: "Published",
                      date: "2024-09-15",
                      views: 1247,
                      likes: 89
                    },
                    {
                      id: 2,
                      title: "Ayurvedic Diet for Modern Lifestyle",
                      excerpt: "Learn how to incorporate Ayurvedic dietary principles into your daily routine...",
                      status: "Draft",
                      date: "2024-09-18",
                      views: 0,
                      likes: 0
                    },
                    {
                      id: 3,
                      title: "Seasonal Health Tips in Ayurveda",
                      excerpt: "Discover how to maintain optimal health through seasonal adjustments...",
                      status: "Under Review",
                      date: "2024-09-20",
                      views: 0,
                      likes: 0
                    }
                  ].map((blog) => (
                    <Card key={blog.id} className="border-green-100 hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <Badge 
                            className={`text-xs ${
                              blog.status === 'Published' ? 'bg-green-100 text-green-800' :
                              blog.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                              'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {blog.status}
                          </Badge>
                          <div className="text-xs text-gray-500">{blog.date}</div>
                        </div>
                        
                        <h3 className="font-semibold text-green-800 mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-3">
                            <span>👁 {blog.views}</span>
                            <span>❤️ {blog.likes}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 text-xs border-green-200 text-green-700 hover:bg-green-50">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('blog')}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    View All Published Blogs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-800">Patient Progress Trends</CardTitle>
                  <CardDescription>Monthly patient count and satisfaction ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="patients" fill="#16a34a" />
                      <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-800">Therapy Statistics</CardTitle>
                  <CardDescription>Performance by therapy type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={therapyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="therapy" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Notification Center</CardTitle>
                <CardDescription>Manage patient notifications and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-blue-800">Session Reminder</h4>
                      <p className="text-blue-600">John Doe has an appointment tomorrow at 10:00 AM</p>
                      <p className="text-sm text-blue-500 mt-1">Reminder sent via SMS and WhatsApp</p>
                    </div>
                    <Badge className="bg-blue-600 text-white">Sent</Badge>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-amber-800">Feedback Request</h4>
                      <p className="text-amber-600">Sarah Smith completed her session - feedback pending</p>
                      <p className="text-sm text-amber-500 mt-1">Send feedback reminder?</p>
                    </div>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                      Send Reminder
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-green-800">Treatment Plan Update</h4>
                      <p className="text-green-600">Mike Johnson's progress is excellent - consider advanced therapies</p>
                      <p className="text-sm text-green-500 mt-1">Review and update treatment plan</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Review Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Reports Modal */}
        {selectedPatient && (
          <ViewReportsModal
            isOpen={isReportsModalOpen}
            onClose={() => {
              setIsReportsModalOpen(false);
              setSelectedPatient(null);
            }}
            patientName={selectedPatient.name}
            patientId={selectedPatient.id}
          />
        )}
      </main>
    </div>
  );
}