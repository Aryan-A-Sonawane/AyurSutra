import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Download, Eye, FileText, TrendingUp, Activity, Clock, User } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Report {
  id: number;
  sessionId: number;
  therapy: string;
  date: string;
  practitioner: string;
  status: 'completed' | 'pending';
  reportType: 'session' | 'progress' | 'medical';
  findings: string;
  recommendations: string;
  nextSession?: string;
  improvementScore?: number;
  postTherapyInstructions?: string;
  medicationChanges?: string;
  followUpNotes?: string;
}

interface ViewReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  patientId: string;
}

export function ViewReportsModal({ isOpen, onClose, patientName, patientId }: ViewReportsModalProps) {
  const { t } = useLanguage();

  // Mock patient reports data
  const reports: Report[] = [
    {
      id: 1,
      sessionId: 1,
      therapy: 'Abhyanga',
      date: '2025-09-19',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'session',
      findings: 'Patient showed excellent response to oil massage therapy. Muscle tension significantly reduced in neck and shoulder areas. Sleep quality improved from previous session. Patient reports feeling more relaxed and energetic.',
      recommendations: 'Continue with weekly Abhyanga sessions. Include gentle yoga in daily routine. Increase warm oil application time by 5 minutes.',
      nextSession: '2025-09-26',
      improvementScore: 85,
      postTherapyInstructions: 'Rest for 30 minutes post-session. Take warm shower after 1 hour. Avoid cold foods and drinks for 24 hours.',
      medicationChanges: 'Reduced stress medication dosage from 10mg to 5mg daily.',
      followUpNotes: 'Patient responding well to treatment. Family members report positive behavioral changes.'
    },
    {
      id: 2,
      sessionId: 2,
      therapy: 'Swedana',
      date: '2025-09-17',
      practitioner: 'Dr. Priya Nair',
      status: 'completed',
      reportType: 'session',
      findings: 'Excellent sweat response observed during steam therapy. Toxin elimination process working efficiently. Patient reports increased energy levels and better appetite.',
      recommendations: 'Maintain current hydration levels. Follow prescribed Kapha-reducing diet. Avoid heavy, cold foods for next 48 hours.',
      nextSession: '2025-09-24',
      improvementScore: 78,
      postTherapyInstructions: 'Cool down gradually for 15 minutes. Shower with lukewarm water only. Rest for 2 hours minimum.',
      followUpNotes: 'Consider adding Nasya therapy in next cycle for enhanced respiratory benefits.'
    },
    {
      id: 3,
      sessionId: 3,
      therapy: 'Basti',
      date: '2025-09-15',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'session',
      findings: 'Medicated enema therapy completed successfully. Good retention time of 45 minutes. Patient tolerance excellent. Digestive function showing marked improvement.',
      recommendations: 'Continue light, warm foods only. Avoid physical exertion for 24 hours. Follow strict dietary guidelines provided.',
      nextSession: '2025-09-22',
      improvementScore: 90,
      postTherapyInstructions: 'Complete bed rest for 3 hours. Consume only prescribed khichdi and warm water. No travel or stress.',
      medicationChanges: 'Added digestive enzymes supplement twice daily with meals.',
      followUpNotes: 'Excellent progress. Patient ready for next phase of Panchakarma treatment.'
    },
    {
      id: 4,
      sessionId: 0,
      therapy: 'Overall Progress',
      date: '2025-09-20',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'progress',
      findings: 'Comprehensive evaluation shows significant improvement across all parameters. Stress levels reduced by 70%. Sleep quality normalized. Blood pressure within normal range. Weight management on track.',
      recommendations: 'Continue current treatment plan for 2 more weeks. Consider adding meditation sessions. Schedule monthly follow-ups after treatment completion.',
      improvementScore: 82,
      followUpNotes: 'Patient and family very satisfied with progress. Ready to transition to maintenance phase.'
    },
    {
      id: 5,
      sessionId: 0,
      therapy: 'Medical Assessment',
      date: '2025-09-18',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'medical',
      findings: 'Latest lab results show remarkable improvement. Liver function tests normalized. Inflammatory markers (CRP, ESR) significantly reduced. Digestive enzymes functioning optimally. Cholesterol levels improved.',
      recommendations: 'Continue herbal medications for 4 more weeks. Schedule comprehensive blood work after 1 month. Maintain current lifestyle modifications.',
      improvementScore: 88,
      medicationChanges: 'Discontinued anti-inflammatory medication. Continuing liver-supporting herbs.',
      followUpNotes: 'Excellent clinical response. Patient is model case for Panchakarma effectiveness.'
    }
  ];

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'session':
        return <Activity className="h-5 w-5 text-green-600" />;
      case 'progress':
        return <TrendingUp className="h-5 w-5 text-blue-600" />;
      case 'medical':
        return <FileText className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getReportColor = (type: string) => {
    switch (type) {
      case 'session':
        return 'border-green-200 bg-green-50';
      case 'progress':
        return 'border-blue-200 bg-blue-50';
      case 'medical':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getImprovementColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const sessionReports = reports.filter(r => r.reportType === 'session');
  const progressReports = reports.filter(r => r.reportType === 'progress');
  const medicalReports = reports.filter(r => r.reportType === 'medical');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-800 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Patient Reports - {patientName}
          </DialogTitle>
          <DialogDescription>
            Complete therapy history and progress reports (Patient ID: {patientId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-green-100 bg-green-50/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-green-800">{sessionReports.length}</p>
                <p className="text-sm text-green-600">Session Reports</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100 bg-blue-50/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-blue-800">
                  {reports.filter(r => r.improvementScore).reduce((sum, r) => sum + (r.improvementScore || 0), 0) / reports.filter(r => r.improvementScore).length || 0}%
                </p>
                <p className="text-sm text-blue-600">Avg. Improvement</p>
              </CardContent>
            </Card>
            <Card className="border-purple-100 bg-purple-50/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-semibold text-purple-800">{medicalReports.length}</p>
                <p className="text-sm text-purple-600">Medical Reports</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabbed Reports View */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-green-50 border border-green-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                All Reports
              </TabsTrigger>
              <TabsTrigger value="session" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Sessions
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Progress
              </TabsTrigger>
              <TabsTrigger value="medical" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Medical
              </TabsTrigger>
            </TabsList>

            {/* All Reports */}
            <TabsContent value="all" className="space-y-4 max-h-96 overflow-y-auto">
              {reports.map((report) => (
                <Card key={report.id} className={`${getReportColor(report.reportType)} hover:shadow-md transition-shadow`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        {getReportIcon(report.reportType)}
                        <div>
                          <CardTitle className="text-sm font-medium text-gray-800">{report.therapy}</CardTitle>
                          <CardDescription className="flex items-center space-x-2 text-xs">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(report.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <User className="h-3 w-3" />
                            <span>{report.practitioner}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {report.improvementScore && (
                          <Badge className={`${getImprovementColor(report.improvementScore)} border-0 text-xs`}>
                            {report.improvementScore}%
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {report.reportType}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-medium text-gray-700 mb-1">Findings:</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{report.findings}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-700 mb-1">Recommendations:</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{report.recommendations}</p>
                      </div>

                      {report.postTherapyInstructions && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-700 mb-1">Post-therapy Instructions:</h4>
                          <p className="text-xs text-gray-600 line-clamp-1">{report.postTherapyInstructions}</p>
                        </div>
                      )}

                      {report.nextSession && (
                        <div className="flex items-center text-xs text-blue-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Next session: {new Date(report.nextSession).toLocaleDateString()}
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                          <Eye className="h-3 w-3 mr-1" />
                          View Full
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs px-2">
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Session Reports */}
            <TabsContent value="session" className="space-y-4 max-h-96 overflow-y-auto">
              {sessionReports.map((report) => (
                <Card key={report.id} className="border-green-200 bg-green-50/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-green-800">{report.therapy} Session</CardTitle>
                        <CardDescription>{new Date(report.date).toLocaleDateString()} • {report.practitioner}</CardDescription>
                      </div>
                      <Badge className="bg-green-600 text-white">{report.improvementScore}% improvement</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-green-800 mb-1">Session Findings:</h4>
                        <p className="text-sm text-gray-700">{report.findings}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800 mb-1">Recommendations:</h4>
                        <p className="text-sm text-gray-700">{report.recommendations}</p>
                      </div>
                      {report.postTherapyInstructions && (
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">Post-therapy Care:</h4>
                          <p className="text-sm text-gray-700">{report.postTherapyInstructions}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Progress Reports */}
            <TabsContent value="progress" className="space-y-4 max-h-96 overflow-y-auto">
              {progressReports.map((report) => (
                <Card key={report.id} className="border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-blue-800">Progress Assessment</CardTitle>
                        <CardDescription>{new Date(report.date).toLocaleDateString()} • {report.practitioner}</CardDescription>
                      </div>
                      <Badge className="bg-blue-600 text-white">{report.improvementScore}% overall</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Assessment:</h4>
                        <p className="text-sm text-gray-700">{report.findings}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Future Plan:</h4>
                        <p className="text-sm text-gray-700">{report.recommendations}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Medical Reports */}
            <TabsContent value="medical" className="space-y-4 max-h-96 overflow-y-auto">
              {medicalReports.map((report) => (
                <Card key={report.id} className="border-purple-200 bg-purple-50/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-purple-800">Medical Assessment</CardTitle>
                        <CardDescription>{new Date(report.date).toLocaleDateString()} • {report.practitioner}</CardDescription>
                      </div>
                      <Badge className="bg-purple-600 text-white">Clinical Report</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-purple-800 mb-1">Clinical Findings:</h4>
                        <p className="text-sm text-gray-700">{report.findings}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-800 mb-1">Medical Recommendations:</h4>
                        <p className="text-sm text-gray-700">{report.recommendations}</p>
                      </div>
                      {report.medicationChanges && (
                        <div>
                          <h4 className="font-medium text-purple-800 mb-1">Medication Updates:</h4>
                          <p className="text-sm text-gray-700">{report.medicationChanges}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}