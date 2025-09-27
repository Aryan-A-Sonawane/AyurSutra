import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FileText, Download, Eye, Calendar, TrendingUp, Activity } from "lucide-react";
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
}

interface ReportsSectionProps {
  className?: string;
}

export function ReportsSection({ className }: ReportsSectionProps) {
  const { t } = useLanguage();

  const reports: Report[] = [
    {
      id: 1,
      sessionId: 1,
      therapy: 'Abhyanga',
      date: '2025-09-19',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'session',
      findings: 'Patient showed good response to oil massage. Muscle tension significantly reduced. Sleep quality improved.',
      recommendations: 'Continue with weekly Abhyanga sessions. Include gentle yoga in daily routine.',
      nextSession: '2025-09-26',
      improvementScore: 85
    },
    {
      id: 2,
      sessionId: 2,
      therapy: 'Swedana',
      date: '2025-09-17',
      practitioner: 'Dr. Priya Nair',
      status: 'completed',
      reportType: 'session',
      findings: 'Excellent sweat response. Toxin elimination process working well. Patient reports increased energy levels.',
      recommendations: 'Maintain hydration levels. Follow prescribed diet plan. Avoid cold foods.',
      nextSession: '2025-09-24',
      improvementScore: 78
    },
    {
      id: 3,
      sessionId: 3,
      therapy: 'Snehana',
      date: '2025-09-15',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'session',
      findings: 'Good oleation achieved. Digestive fire improved. Patient tolerance to ghee increased.',
      recommendations: 'Ready for Basti therapy in next session. Continue light, warm foods.',
      nextSession: '2025-09-22',
      improvementScore: 90
    },
    {
      id: 4,
      sessionId: 0,
      therapy: 'Overall Progress',
      date: '2025-09-20',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'progress',
      findings: 'Significant improvement in stress levels and sleep quality. Blood pressure normalized. Weight management on track.',
      recommendations: 'Continue current treatment plan. Consider adding meditation sessions. Regular follow-ups recommended.',
      improvementScore: 82
    },
    {
      id: 5,
      sessionId: 0,
      therapy: 'Medical Assessment',
      date: '2025-09-18',
      practitioner: 'Dr. Rajesh Sharma',
      status: 'completed',
      reportType: 'medical',
      findings: 'Lab results show improved liver function. Inflammatory markers reduced. Digestive enzymes normalized.',
      recommendations: 'Continue herbal medications. Schedule blood work after 4 weeks. Maintain current lifestyle changes.',
      improvementScore: 88
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
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageImprovement = reports
    .filter(r => r.improvementScore)
    .reduce((sum, r) => sum + (r.improvementScore || 0), 0) / 
    reports.filter(r => r.improvementScore).length;

  return (
    <div className={className}>
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="bg-green-50 border border-green-200">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              All Reports
            </TabsTrigger>
            <TabsTrigger value="session" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Session Reports
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Progress Reports
            </TabsTrigger>
            <TabsTrigger value="medical" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Medical Reports
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Average Improvement: <span className={`font-semibold ${getImprovementColor(averageImprovement)}`}>
                {averageImprovement.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Overall Progress Summary */}
        <Card className="border-green-100 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Treatment Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-800">{reports.filter(r => r.status === 'completed').length}</p>
                <p className="text-sm text-gray-600">Reports Generated</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-800">{averageImprovement.toFixed(0)}%</p>
                <p className="text-sm text-gray-600">Average Improvement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-purple-800">
                  {reports.filter(r => r.reportType === 'session').length}
                </p>
                <p className="text-sm text-gray-600">Sessions Completed</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Treatment Progress</span>
                <span className="text-sm font-medium text-green-800">{averageImprovement.toFixed(0)}%</span>
              </div>
              <Progress value={averageImprovement} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* All Reports Tab */}
        <TabsContent value="all" className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className={`border-2 transition-all hover:shadow-lg ${getReportColor(report.reportType)}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {getReportIcon(report.reportType)}
                    <div>
                      <CardTitle className="text-gray-800">{report.therapy}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{report.practitioner}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.improvementScore && (
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {report.improvementScore}% improvement
                      </Badge>
                    )}
                    <Badge className={report.status === 'completed' ? 'bg-green-600 text-white' : 'bg-yellow-100 text-yellow-800'}>
                      {report.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Findings:</h4>
                    <p className="text-gray-600 text-sm">{report.findings}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Recommendations:</h4>
                    <p className="text-gray-600 text-sm">{report.recommendations}</p>
                  </div>
                  
                  {report.nextSession && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Next Session:</h4>
                      <p className="text-gray-600 text-sm">{new Date(report.nextSession).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Report #{report.id}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Session Reports Tab */}
        <TabsContent value="session" className="space-y-4">
          {reports.filter(r => r.reportType === 'session').map((report) => (
            <Card key={report.id} className="border-green-200 bg-green-50/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-green-600" />
                    <div>
                      <CardTitle className="text-green-800">{report.therapy} Session</CardTitle>
                      <CardDescription>{new Date(report.date).toLocaleDateString()} • {report.practitioner}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">{report.improvementScore}% improvement</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{report.findings}</p>
                  <p className="text-sm font-medium text-green-800">Recommendations: {report.recommendations}</p>
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                      <Eye className="h-4 w-4 mr-1" />
                      View Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Progress Reports Tab */}
        <TabsContent value="progress" className="space-y-4">
          {reports.filter(r => r.reportType === 'progress').map((report) => (
            <Card key={report.id} className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-blue-800">Progress Assessment</CardTitle>
                      <CardDescription>{new Date(report.date).toLocaleDateString()} • {report.practitioner}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">{report.improvementScore}% overall</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{report.findings}</p>
                  <p className="text-sm font-medium text-blue-800">Next Steps: {report.recommendations}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Medical Reports Tab */}
        <TabsContent value="medical" className="space-y-4">
          {reports.filter(r => r.reportType === 'medical').map((report) => (
            <Card key={report.id} className="border-purple-200 bg-purple-50/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <CardTitle className="text-purple-800">Medical Assessment</CardTitle>
                      <CardDescription>{new Date(report.date).toLocaleDateString()} • {report.practitioner}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-purple-600 text-white">Medical Report</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">{report.findings}</p>
                  <p className="text-sm font-medium text-purple-800">Clinical Recommendations: {report.recommendations}</p>
                  <div className="flex justify-end">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Download className="h-4 w-4 mr-1" />
                      Download Medical Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}