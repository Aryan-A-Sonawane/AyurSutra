import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Calendar,
  Users,
  Award,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Heart,
  CheckCircle,
  Video
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface HospitalDetailPageProps {
  onNavigate: (page: string) => void;
  hospitalId?: string;
}

export function HospitalDetailPage({ onNavigate, hospitalId = "H001" }: HospitalDetailPageProps) {
  const { language } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  // Sample hospital data - in real app, this would be fetched based on hospitalId
  const hospitalData = {
    id: hospitalId,
    name: "Green Valley Ayurveda Hospital",
    tagline: "Healing through Ancient Wisdom",
    description: "A premier Ayurvedic healthcare institution dedicated to providing authentic Panchakarma treatments and holistic wellness solutions. Established in 1995, we have been serving patients with traditional Ayurvedic practices combined with modern healthcare standards.",
    address: "Sector 21, Dwarka, New Delhi - 110075",
    phone: "+91 11 4567 8900",
    email: "info@greenvalleyayurveda.com",
    website: "www.greenvalleyayurveda.com",
    rating: 4.7,
    totalReviews: 1247,
    establishedYear: 1995,
    specialties: ["Panchakarma", "Ayurvedic Medicine", "Yoga Therapy", "Meditation", "Herbal Medicine"],
    certifications: ["NABH Accredited", "AYUSH Certified", "ISO 9001:2015"],
    socialLinks: {
      facebook: "https://facebook.com/greenvalleyayurveda",
      twitter: "https://twitter.com/greenvalleyayur",
      instagram: "https://instagram.com/greenvalleyayurveda",
      youtube: "https://youtube.com/greenvalleyayurveda",
      linkedin: "https://linkedin.com/company/greenvalleyayurveda"
    },
    services: [
      {
        name: "Panchakarma Detox",
        description: "Complete 21-day detoxification program with personalized treatment plans",
        price: "₹45,000 - ₹75,000",
        duration: "21 days"
      },
      {
        name: "Abhyanga Massage",
        description: "Traditional full-body oil massage for relaxation and healing",
        price: "₹2,500 - ₹3,500",
        duration: "60 minutes"
      },
      {
        name: "Shirodhara Therapy",
        description: "Continuous pouring of medicated oil on forehead for mental peace",
        price: "₹3,000 - ₹4,000",
        duration: "45 minutes"
      },
      {
        name: "Ayurvedic Consultation",
        description: "Detailed consultation with experienced Ayurvedic doctors",
        price: "₹1,500 - ₹2,000",
        duration: "30 minutes"
      }
    ],
    doctors: [
      {
        id: "D001",
        name: "Dr. Rajesh Kumar",
        specialization: "Panchakarma Specialist",
        experience: "15 years",
        rating: 4.8,
        consultationFee: "₹2,000",
        availability: "Mon-Sat 9:00 AM - 6:00 PM",
        qualifications: ["BAMS", "MD (Ayurveda)", "PhD (Panchakarma)"],
        avatar: null
      },
      {
        id: "D002",
        name: "Dr. Priya Sharma",
        specialization: "Women's Health & Ayurveda",
        experience: "12 years",
        rating: 4.6,
        consultationFee: "₹1,800",
        availability: "Mon-Fri 10:00 AM - 5:00 PM",
        qualifications: ["BAMS", "MD (Stree Roga)"],
        avatar: null
      },
      {
        id: "D003",
        name: "Dr. Amit Gupta",
        specialization: "Ayurvedic Medicine & Herbs",
        experience: "20 years",
        rating: 4.9,
        consultationFee: "₹2,500",
        availability: "Tue-Sun 8:00 AM - 4:00 PM",
        qualifications: ["BAMS", "MD (Dravyaguna)", "Research Scholar"],
        avatar: null
      }
    ],
    facilities: [
      "24/7 Emergency Care",
      "In-patient Accommodation",
      "Pharmacy",
      "Yoga & Meditation Hall",
      "Herbal Garden",
      "Library",
      "Cafeteria",
      "Parking"
    ],
    testimonials: [
      {
        id: 1,
        name: "Rahul Verma",
        rating: 5,
        comment: "Amazing experience with Panchakarma treatment. The doctors are very knowledgeable and caring. Highly recommended!",
        date: "2024-08-15",
        treatment: "Panchakarma Detox"
      },
      {
        id: 2,
        name: "Sita Devi",
        rating: 5,
        comment: "Dr. Priya helped me with my chronic health issues. The natural approach really works. Thank you!",
        date: "2024-08-10",
        treatment: "Ayurvedic Consultation"
      },
      {
        id: 3,
        name: "Vikash Singh",
        rating: 4,
        comment: "Good facilities and professional staff. The Shirodhara therapy was very relaxing.",
        date: "2024-07-28",
        treatment: "Shirodhara Therapy"
      }
    ],
    blogs: [
      {
        id: 1,
        title: "Benefits of Panchakarma in Modern Lifestyle",
        author: "Dr. Rajesh Kumar",
        date: "2024-09-20",
        excerpt: "Discover how ancient Panchakarma practices can help combat modern stress and lifestyle diseases...",
        readTime: "5 min read"
      },
      {
        id: 2,
        title: "Ayurvedic Diet for Different Body Types",
        author: "Dr. Priya Sharma",
        date: "2024-09-15",
        excerpt: "Understanding your dosha and eating according to your Ayurvedic constitution for optimal health...",
        readTime: "7 min read"
      },
      {
        id: 3,
        title: "Herbal Remedies for Common Ailments",
        author: "Dr. Amit Gupta",
        date: "2024-09-10",
        excerpt: "Natural solutions using traditional herbs for everyday health problems...",
        readTime: "6 min read"
      }
    ]
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => onNavigate('hospital-search')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button onClick={() => onNavigate('home')} variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hospital Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{hospitalData.name}</h1>
                <p className="text-green-100 text-lg mb-4">{hospitalData.tagline}</p>
                <div className="flex items-center space-x-6 text-green-100">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-amber-300 fill-amber-300 mr-1" />
                    <span className="font-semibold text-white">{hospitalData.rating}</span>
                    <span className="ml-1">({hospitalData.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Est. {hospitalData.establishedYear}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                <Button 
                  onClick={() => onNavigate('book-appointment')}
                  className="bg-white text-green-600 hover:bg-green-50"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
                <Button 
                  onClick={() => onNavigate('video-consultation')}
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Online Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Address</p>
                    <p className="text-sm text-gray-600">{hospitalData.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Phone</p>
                    <p className="text-sm text-gray-600">{hospitalData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Email</p>
                    <p className="text-sm text-gray-600">{hospitalData.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-green-50 border border-green-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="doctors" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Doctors
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="blogs" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Blogs
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">About Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{hospitalData.description}</p>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold text-green-800 mb-3">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospitalData.specialties.map((specialty, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold text-green-800 mb-3">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospitalData.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {hospitalData.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="border-sky-200 text-sky-600 hover:bg-sky-50">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                        <Youtube className="w-4 h-4 mr-2" />
                        YouTube
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {hospitalData.services.map((service, index) => (
                <Card key={index} className="border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-800">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-green-700">{service.price}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </p>
                      </div>
                      <Button onClick={() => onNavigate('book-appointment')} className="bg-green-600 hover:bg-green-700">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalData.doctors.map((doctor) => (
                <Card key={doctor.id} className="border-green-100 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={doctor.avatar || ''} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-green-800">{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(doctor.rating)}
                      <span className="text-sm text-gray-600 ml-1">({doctor.rating})</span>
                    </div>
                    
                    <div className="text-center space-y-1">
                      <p className="text-sm text-gray-600">Experience: {doctor.experience}</p>
                      <p className="text-sm text-gray-600">Fee: {doctor.consultationFee}</p>
                      <p className="text-xs text-gray-500">{doctor.availability}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-green-700">Qualifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.qualifications.map((qual, index) => (
                          <Badge key={index} variant="outline" size="sm" className="text-xs border-green-200 text-green-600">
                            {qual}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        onClick={() => onNavigate('book-appointment')}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Book Appointment
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('video-consultation')}
                        className="border-green-200 text-green-700 hover:bg-green-50"
                      >
                        <Video className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Patient Reviews</CardTitle>
                <CardDescription>What our patients say about us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hospitalData.testimonials.map((review) => (
                    <div key={review.id} className="border-l-4 border-green-200 pl-4 py-2">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-green-800">{review.name}</h4>
                            <div className="flex space-x-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs border-green-200 text-green-600">
                            {review.treatment}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
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
                <CardTitle className="text-green-800">Educational Blogs</CardTitle>
                <CardDescription>Latest articles from our expert doctors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitalData.blogs.map((blog) => (
                    <div key={blog.id} className="border-b border-green-100 pb-4 last:border-b-0">
                      <h4 className="font-medium text-green-800 hover:text-green-600 cursor-pointer mb-2">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <span>By {blog.author}</span>
                          <span>•</span>
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('blog')}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    View All Blogs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-800">Get in Touch</CardTitle>
                  <CardDescription>Contact us for appointments and queries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-gray-600">{hospitalData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">{hospitalData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Website</p>
                      <p className="text-sm text-gray-600">{hospitalData.website}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-gray-600">{hospitalData.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => onNavigate('book-appointment')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  
                  <Button 
                    onClick={() => onNavigate('video-consultation')}
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Online Consultation
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Hospital
                  </Button>
                  
                  <Button 
                    onClick={() => onNavigate('blog')}
                    variant="outline"
                    className="w-full border-amber-200 text-amber-700 hover:bg-amber-50"
                  >
                    Read Our Blogs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}