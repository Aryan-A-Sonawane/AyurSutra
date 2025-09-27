import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { ChevronLeft, ChevronRight, Clock, User, Activity, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Session {
  id: number;
  date: string;
  time: string;
  therapy: string;
  practitioner: string;
  status: 'upcoming' | 'completed' | 'rescheduled';
  location: string;
  notes?: string;
}

interface CalendarViewProps {
  onBookAppointment: () => void;
  userType?: 'patient' | 'practitioner' | 'admin';
}

export function CalendarView({ onBookAppointment, userType = 'patient' }: CalendarViewProps) {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Enhanced session data with different views for different user types
  const getSessionsData = (): Session[] => {
    const baseSessions: Session[] = [
      {
        id: 1,
        date: '2025-09-25',
        time: '10:00 AM',
        therapy: 'Abhyanga',
        practitioner: 'Dr. Rajesh Sharma',
        status: 'upcoming',
        location: 'Room 101',
        notes: 'Full body oil massage therapy'
      },
      {
        id: 2,
        date: '2025-09-26',
        time: '2:00 PM',
        therapy: 'Swedana',
        practitioner: 'Dr. Priya Nair',
        status: 'upcoming',
        location: 'Room 203',
        notes: 'Steam therapy session'
      },
      {
        id: 3,
        date: '2025-09-27',
        time: '11:00 AM',
        therapy: 'Basti',
        practitioner: 'Dr. Rajesh Sharma',
        status: 'upcoming',
        location: 'Room 105',
        notes: 'Medicated enema therapy'
      },
      {
        id: 4,
        date: '2025-09-24',
        time: '10:00 AM',
        therapy: 'Abhyanga',
        practitioner: 'Dr. Rajesh Sharma',
        status: 'completed',
        location: 'Room 101',
        notes: 'Session completed successfully'
      },
      {
        id: 5,
        date: '2025-09-23',
        time: '3:00 PM',
        therapy: 'Snehana',
        practitioner: 'Dr. Priya Nair',
        status: 'completed',
        location: 'Room 102',
        notes: 'Oil preparation therapy'
      }
    ];

    // Add more sessions for practitioner and admin views
    if (userType === 'practitioner' || userType === 'admin') {
      baseSessions.push(
        {
          id: 6,
          date: '2025-09-25',
          time: '2:00 PM',
          therapy: 'Panchakarma Consultation',
          practitioner: 'Dr. Rajesh Sharma',
          status: 'upcoming',
          location: 'Room 201',
          notes: 'Initial consultation with patient Sarah'
        },
        {
          id: 7,
          date: '2025-09-25',
          time: '4:00 PM',
          therapy: 'Follow-up Session',
          practitioner: 'Dr. Priya Nair',
          status: 'upcoming',
          location: 'Room 102',
          notes: 'Progress review with patient John'
        },
        {
          id: 8,
          date: '2025-09-26',
          time: '9:00 AM',
          therapy: 'Abhyanga',
          practitioner: 'Dr. Rajesh Sharma',
          status: 'upcoming',
          location: 'Room 101',
          notes: 'Morning session for patient Lisa'
        }
      );
    }

    return baseSessions;
  };

  const sessions = getSessionsData();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getSessionsForDate = (date: string) => {
    return sessions.filter(session => session.date === date);
  };

  const formatDateForComparison = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDateForComparison(currentDate.getFullYear(), currentDate.getMonth(), day);
    const sessionsForDate = getSessionsForDate(dateStr);
    
    if (sessionsForDate.length > 0) {
      setSelectedDate(dateStr);
      setSelectedSession(sessionsForDate[0]); // Show first session for the date
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSessionColorCode = (sessions: Session[]) => {
    if (sessions.length === 0) return '';
    
    const hasUpcoming = sessions.some(s => s.status === 'upcoming');
    const hasCompleted = sessions.some(s => s.status === 'completed');
    const hasRescheduled = sessions.some(s => s.status === 'rescheduled');
    
    if (hasRescheduled) return 'border-blue-300 bg-blue-50';
    if (hasUpcoming) return 'border-amber-300 bg-amber-50';
    if (hasCompleted) return 'border-green-300 bg-green-50';
    return 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-green-800">Therapy Calendar</CardTitle>
              <CardDescription>View and manage your Panchakarma sessions</CardDescription>
            </div>
            <Button onClick={onBookAppointment} className="bg-green-600 hover:bg-green-700 text-white">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold text-green-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => {
              if (day === null) {
                return <div key={index} className="p-2 h-16"></div>;
              }

              const dateStr = formatDateForComparison(currentDate.getFullYear(), currentDate.getMonth(), day);
              const daySessions = getSessionsForDate(dateStr);
              const hasSession = daySessions.length > 0;
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`
                    p-2 h-16 border rounded-lg cursor-pointer transition-colors
                    ${isToday ? 'bg-green-100 border-green-400 ring-2 ring-green-200' : 'border-gray-200 hover:bg-gray-50'}
                    ${hasSession ? getSessionColorCode(daySessions) : ''}
                  `}
                >
                  <div className="text-sm font-medium text-gray-800 mb-1">{day}</div>
                  {hasSession && (
                    <div className="space-y-1">
                      {daySessions.slice(0, 2).map((session, i) => {
                        const bgColor = session.status === 'completed' ? 'bg-green-600' : 
                                       session.status === 'upcoming' ? 'bg-amber-600' : 
                                       session.status === 'rescheduled' ? 'bg-blue-600' : 'bg-gray-600';
                        return (
                          <div key={i} className={`text-xs px-1 py-0.5 ${bgColor} text-white rounded truncate`}>
                            {session.time}
                          </div>
                        );
                      })}
                      {daySessions.length > 2 && (
                        <div className="text-xs text-gray-600 font-medium">+{daySessions.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Session Details Dialog */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-800">Session Details</DialogTitle>
            <DialogDescription>
              {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSession && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{selectedSession.therapy}</h4>
                  <p className="text-sm text-gray-600">{selectedSession.notes}</p>
                </div>
                <Badge className={getStatusColor(selectedSession.status)}>
                  {t(selectedSession.status)}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{selectedSession.time}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{selectedSession.practitioner}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{selectedSession.location}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                >
                  Reschedule
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}