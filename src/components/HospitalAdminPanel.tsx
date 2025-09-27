import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  Mail, 
  UserCheck, 
  Clock, 
  Users, 
  Building2, 
  Bell,
  Settings,
  Calendar,
  FileText,
  Send,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { CalendarView } from './CalendarView';

interface HospitalAdminPanelProps {
  onNavigate: (page: string) => void;
}

interface DoctorInvite {
  id: string;
  email: string;
  name: string;
  designation: string;
  status: 'pending' | 'accepted' | 'rejected';
  sentAt: string;
}

interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  available: boolean;
}

interface ServiceTiming {
  id: string;
  service: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  maxCapacity: number;
}

export function HospitalAdminPanel({ onNavigate }: HospitalAdminPanelProps) {
  const { language } = useLanguage();
  const [notifications] = useState(3);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingTiming, setEditingTiming] = useState<ServiceTiming | null>(null);
  
  const [inviteForm, setInviteForm] = useState({
    email: '',
    name: '',
    designation: ''
  });

  const [hospitalSettings, setHospitalSettings] = useState({
    bannerText: 'Welcome to Green Valley Ayurveda Hospital - Your Journey to Wellness Begins Here',
    bannerImage: '',
    address: 'Sector 21, Dwarka, New Delhi - 110075',
    phone: '+91 11 2345 6789',
    email: 'info@greenvalleyayurveda.com',
    website: 'www.greenvalleyayurveda.com'
  });

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Panchakarma Detox',
      description: 'Complete 21-day panchakarma detoxification program',
      duration: 21,
      price: 50000,
      available: true
    },
    {
      id: '2',
      name: 'Abhyanga Massage',
      description: 'Traditional full-body oil massage therapy',
      duration: 60,
      price: 2500,
      available: true
    },
    {
      id: '3',
      name: 'Swedana Therapy',
      description: 'Steam therapy for deep cleansing and relaxation',
      duration: 45,
      price: 1500,
      available: true
    }
  ]);

  const [serviceTimings, setServiceTimings] = useState<ServiceTiming[]>([
    {
      id: '1',
      service: 'Abhyanga Massage',
      startTime: '09:00',
      endTime: '17:00',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      maxCapacity: 8
    },
    {
      id: '2',
      service: 'Swedana Therapy',
      startTime: '10:00',
      endTime: '16:00',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      maxCapacity: 4
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0
  });

  const [newTiming, setNewTiming] = useState({
    service: '',
    startTime: '',
    endTime: '',
    daysOfWeek: [] as string[],
    maxCapacity: 1
  });

  const [invites, setInvites] = useState<DoctorInvite[]>([
    {
      id: '1',
      email: 'dr.rajesh@email.com',
      name: 'Dr. Rajesh Kumar',
      designation: 'Senior Panchakarma Specialist',
      status: 'accepted',
      sentAt: '2024-01-15'
    },
    {
      id: '2',
      email: 'dr.priya@email.com',
      name: 'Dr. Priya Sharma',
      designation: 'Ayurvedic Physician',
      status: 'pending',
      sentAt: '2024-01-20'
    }
  ]);

  const [staff, setStaff] = useState<Staff[]>([
    {
      id: '1',
      name: 'Receptionist User',
      email: 'reception@hospital.com',
      role: 'receptionist',
      status: 'active',
      joinedAt: '2024-01-10'
    }
  ]);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvite: DoctorInvite = {
      id: Date.now().toString(),
      ...inviteForm,
      status: 'pending',
      sentAt: new Date().toISOString().split('T')[0]
    };
    setInvites(prev => [...prev, newInvite]);
    setInviteForm({ email: '', name: '', designation: '' });
    alert('Doctor invitation sent successfully!');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const service: Service = {
      id: Date.now().toString(),
      ...newService,
      available: true
    };
    setServices(prev => [...prev, service]);
    setNewService({ name: '', description: '', duration: 60, price: 0 });
    alert('Service added successfully!');
  };

  const handleUpdateService = (service: Service) => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
    setEditingService(null);
    alert('Service updated successfully!');
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
      alert('Service deleted successfully!');
    }
  };

  const handleAddTiming = (e: React.FormEvent) => {
    e.preventDefault();
    const timing: ServiceTiming = {
      id: Date.now().toString(),
      ...newTiming
    };
    setServiceTimings(prev => [...prev, timing]);
    setNewTiming({ service: '', startTime: '', endTime: '', daysOfWeek: [], maxCapacity: 1 });
    alert('Service timing added successfully!');
  };

  const handleUpdateTiming = (timing: ServiceTiming) => {
    setServiceTimings(prev => prev.map(t => t.id === timing.id ? timing : t));
    setEditingTiming(null);
    alert('Service timing updated successfully!');
  };

  const handleDeleteTiming = (timingId: string) => {
    if (confirm('Are you sure you want to delete this timing?')) {
      setServiceTimings(prev => prev.filter(t => t.id !== timingId));
      alert('Service timing deleted successfully!');
    }
  };

  const handleUpdateHospitalSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Hospital settings updated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              <div className="ml-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {language === 'en' ? 'Hospital Admin' : 'अस्पताल प्रशासन'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <LanguageToggle />
              <Button variant="outline" onClick={() => onNavigate('multi-role-login')}>
                {language === 'en' ? 'Logout' : 'लॉग आउट'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'en' ? 'Hospital Admin Dashboard' : 'अस्पताल प्रशासन डैशबोर्ड'}
          </h2>
          <p className="text-gray-600">
            {language === 'en' ? 'Manage your hospital staff and operations' : 'अपने अस्पताल के कर्मचारियों और संचालन का प्रबंधन करें'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Total Doctors' : 'कुल डॉक्टर'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {invites.filter(i => i.status === 'accepted').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Pending Invites' : 'लंबित आमंत्रण'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {invites.filter(i => i.status === 'pending').length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Active Staff' : 'सक्रिय कर्मचारी'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {staff.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {language === 'en' ? 'Today\'s Appointments' : 'आज के अपॉइंटमेंट'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">24</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="doctors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="doctors">
              {language === 'en' ? 'Doctor Management' : 'डॉक्टर प्रबंधन'}
            </TabsTrigger>
            <TabsTrigger value="staff">
              {language === 'en' ? 'Staff Management' : 'कर्मचारी प्रबंधन'}
            </TabsTrigger>
            <TabsTrigger value="services">
              {language === 'en' ? 'Services' : 'सेवाएं'}
            </TabsTrigger>
            <TabsTrigger value="calendar">
              {language === 'en' ? 'Calendar' : 'कैलेंडर'}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {language === 'en' ? 'Settings' : 'सेटिंग्स'}
            </TabsTrigger>
            <TabsTrigger value="reports">
              {language === 'en' ? 'Reports' : 'रिपोर्ट्स'}
            </TabsTrigger>
          </TabsList>

          {/* Doctor Management */}
          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {language === 'en' ? 'Invite New Doctor' : 'नए डॉक्टर को आमंत्रित करें'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendInvite} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="doctorEmail">
                        {language === 'en' ? 'Doctor Email' : 'डॉक्टर का ईमेल'} *
                      </Label>
                      <Input
                        id="doctorEmail"
                        type="email"
                        value={inviteForm.email}
                        onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        placeholder="doctor@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorName">
                        {language === 'en' ? 'Doctor Name' : 'डॉक्टर का नाम'} *
                      </Label>
                      <Input
                        id="doctorName"
                        value={inviteForm.name}
                        onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder={language === 'en' ? 'Dr. Name' : 'डॉ. नाम'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="designation">
                        {language === 'en' ? 'Designation' : 'पद'} *
                      </Label>
                      <Select
                        value={inviteForm.designation}
                        onValueChange={(value) => setInviteForm(prev => ({ ...prev, designation: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'en' ? 'Select designation' : 'पद चुनें'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Senior Panchakarma Specialist">Senior Panchakarma Specialist</SelectItem>
                          <SelectItem value="Ayurvedic Physician">Ayurvedic Physician</SelectItem>
                          <SelectItem value="Junior Doctor">Junior Doctor</SelectItem>
                          <SelectItem value="Consultant">Consultant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Send Invitation' : 'आमंत्रण भेजें'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Doctor Invitations' : 'डॉक्टर आमंत्रण'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invites.map((invite) => (
                    <div key={invite.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{invite.name}</h4>
                        <p className="text-sm text-gray-600">{invite.email}</p>
                        <p className="text-sm text-gray-500">{invite.designation}</p>
                        <p className="text-xs text-gray-400">
                          {language === 'en' ? 'Sent on:' : 'भेजा गया:'} {invite.sentAt}
                        </p>
                      </div>
                      <Badge className={getStatusColor(invite.status)}>
                        {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Management */}
          <TabsContent value="staff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Staff Members' : 'कर्मचारी सदस्य'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                        <p className="text-xs text-gray-400">
                          {language === 'en' ? 'Joined:' : 'शामिल हुए:'} {member.joinedAt}
                        </p>
                      </div>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            {/* Add New Service */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {language === 'en' ? 'Add New Service' : 'नई सेवा जोड़ें'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddService} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="serviceName">
                        {language === 'en' ? 'Service Name' : 'सेवा का नाम'} *
                      </Label>
                      <Input
                        id="serviceName"
                        value={newService.name}
                        onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                        required
                        placeholder={language === 'en' ? 'Enter service name' : 'सेवा का नाम दर्ज करें'}
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceDuration">
                        {language === 'en' ? 'Duration (minutes)' : 'अवधि (मिनट)'} *
                      </Label>
                      <Input
                        id="serviceDuration"
                        type="number"
                        value={newService.duration}
                        onChange={(e) => setNewService(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="servicePrice">
                        {language === 'en' ? 'Price (₹)' : 'मूल्य (₹)'} *
                      </Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                        required
                        min="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="serviceDescription">
                      {language === 'en' ? 'Description' : 'विवरण'} *
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                      required
                      placeholder={language === 'en' ? 'Describe the service...' : 'सेवा का विवरण दें...'}
                    />
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Add Service' : 'सेवा जोड़ें'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Existing Services */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Current Services' : 'वर्तमान सेवाएं'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                      {editingService?.id === service.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              value={editingService.name}
                              onChange={(e) => setEditingService(prev => prev ? { ...prev, name: e.target.value } : null)}
                              placeholder="Service name"
                            />
                            <Input
                              type="number"
                              value={editingService.duration}
                              onChange={(e) => setEditingService(prev => prev ? { ...prev, duration: parseInt(e.target.value) } : null)}
                              placeholder="Duration (minutes)"
                            />
                            <Input
                              type="number"
                              value={editingService.price}
                              onChange={(e) => setEditingService(prev => prev ? { ...prev, price: parseInt(e.target.value) } : null)}
                              placeholder="Price (₹)"
                            />
                          </div>
                          <Textarea
                            value={editingService.description}
                            onChange={(e) => setEditingService(prev => prev ? { ...prev, description: e.target.value } : null)}
                            placeholder="Service description"
                          />
                          <div className="flex space-x-2">
                            <Button onClick={() => handleUpdateService(editingService)} className="bg-green-600 hover:bg-green-700">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" onClick={() => setEditingService(null)}>
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="secondary">{service.duration} min</Badge>
                              <Badge variant="secondary">₹{service.price}</Badge>
                              <Badge className={service.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {service.available ? 'Available' : 'Unavailable'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setEditingService(service)}
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleDeleteService(service.id)}
                              className="border-red-200 text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Timings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {language === 'en' ? 'Service Timings' : 'सेवा समय'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTiming} className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Service</Label>
                      <Select
                        value={newTiming.service}
                        onValueChange={(value) => setNewTiming(prev => ({ ...prev, service: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.name}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={newTiming.startTime}
                        onChange={(e) => setNewTiming(prev => ({ ...prev, startTime: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={newTiming.endTime}
                        onChange={(e) => setNewTiming(prev => ({ ...prev, endTime: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label>Max Capacity</Label>
                      <Input
                        type="number"
                        value={newTiming.maxCapacity}
                        onChange={(e) => setNewTiming(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) }))}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Timing
                  </Button>
                </form>

                <div className="space-y-4">
                  {serviceTimings.map((timing) => (
                    <div key={timing.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{timing.service}</h4>
                          <p className="text-sm text-gray-600">
                            {timing.startTime} - {timing.endTime} | Capacity: {timing.maxCapacity}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            {timing.daysOfWeek.map((day) => (
                              <Badge key={day} variant="secondary" className="text-xs">
                                {day.substring(0, 3)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditingTiming(timing)}
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteTiming(timing.id)}
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarView onBookAppointment={() => onNavigate('book-appointment')} userType="admin" />
          </TabsContent>

          {/* Hospital Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {language === 'en' ? 'Hospital Settings' : 'अस्पताल सेटिंग्स'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateHospitalSettings} className="space-y-4">
                  <div>
                    <Label htmlFor="bannerText">
                      {language === 'en' ? 'Banner Text' : 'बैनर टेक्स्ट'}
                    </Label>
                    <Textarea
                      id="bannerText"
                      value={hospitalSettings.bannerText}
                      onChange={(e) => setHospitalSettings(prev => ({ ...prev, bannerText: e.target.value }))}
                      placeholder="Enter banner text..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address">
                        {language === 'en' ? 'Hospital Address' : 'अस्पताल का पता'}
                      </Label>
                      <Textarea
                        id="address"
                        value={hospitalSettings.address}
                        onChange={(e) => setHospitalSettings(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter hospital address..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">
                        {language === 'en' ? 'Phone Number' : 'फोन नंबर'}
                      </Label>
                      <Input
                        id="phone"
                        value={hospitalSettings.phone}
                        onChange={(e) => setHospitalSettings(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 11 2345 6789"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">
                        {language === 'en' ? 'Email Address' : 'ईमेल पता'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={hospitalSettings.email}
                        onChange={(e) => setHospitalSettings(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="info@hospital.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="website">
                        {language === 'en' ? 'Website' : 'वेबसाइट'}
                      </Label>
                      <Input
                        id="website"
                        value={hospitalSettings.website}
                        onChange={(e) => setHospitalSettings(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="www.hospital.com"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Save Settings' : 'सेटिंग्स सेव करें'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Hospital Reports' : 'अस्पताल रिपोर्ट्स'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {language === 'en' ? 'Hospital analytics and reports will be available here.' : 'अस्पताल विश्लेषण और रिपोर्ट यहां उपलब्ध होंगी।'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}