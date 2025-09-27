import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Clock, User, Leaf, BookOpen } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const { t } = useLanguage();

  const articles = [
    {
      id: 1,
      title: "Understanding Panchakarma: The Science Behind Ancient Wisdom",
      excerpt: "Explore how modern research validates the traditional Panchakarma treatments and their effectiveness in treating chronic conditions.",
      author: "Dr. Rajesh Sharma",
      readTime: "8 min read",
      category: "Science",
      image: "https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MjEzNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "September 15, 2025"
    },
    {
      id: 2,
      title: "The Five Actions of Panchakarma: A Complete Guide",
      excerpt: "Learn about Vamana, Virechana, Basti, Nasya, and Raktamokshana - the five fundamental procedures of Panchakarma therapy.",
      author: "Dr. Priya Nair",
      readTime: "12 min read",
      category: "Treatment",
      image: "https://images.unsplash.com/photo-1724112856938-162e80b6f3f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwd2VsbG5lc3MlMjBncmVlbnxlbnwxfHx8fDE3NTgzMTY1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "September 10, 2025"
    },
    {
      id: 3,
      title: "Preparing for Your First Panchakarma Session",
      excerpt: "Essential pre-treatment guidelines, dietary recommendations, and what to expect during your first Panchakarma experience.",
      author: "Dr. Amit Verma",
      readTime: "6 min read",
      category: "Preparation",
      image: "https://images.unsplash.com/photo-1703300450387-047da16a89c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxpbmclMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTgzMTY1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "September 5, 2025"
    },
    {
      id: 4,
      title: "Digital Innovation in Traditional Ayurveda",
      excerpt: "How modern technology is enhancing traditional Ayurvedic practices while preserving ancient wisdom and improving patient outcomes.",
      author: "Dr. Rajesh Sharma",
      readTime: "10 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MjEzNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "August 28, 2025"
    },
    {
      id: 5,
      title: "Post-Treatment Care: Maintaining Your Wellness Journey",
      excerpt: "Guidelines for maintaining the benefits of Panchakarma therapy through proper diet, lifestyle, and follow-up care.",
      author: "Dr. Priya Nair",
      readTime: "7 min read",
      category: "Aftercare",
      image: "https://images.unsplash.com/photo-1724112856938-162e80b6f3f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwd2VsbG5lc3MlMjBncmVlbnxlbnwxfHx8fDE3NTgzMTY1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "August 20, 2025"
    },
    {
      id: 6,
      title: "Case Study: Stress Management Through Panchakarma",
      excerpt: "A detailed case study showing how a comprehensive Panchakarma treatment plan helped a patient overcome chronic stress and anxiety.",
      author: "Dr. Amit Verma",
      readTime: "15 min read",
      category: "Case Study",
      image: "https://images.unsplash.com/photo-1703300450387-047da16a89c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxpbmclMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTgzMTY1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      date: "August 15, 2025"
    }
  ];

  const categories = ["All", "Science", "Treatment", "Preparation", "Technology", "Aftercare", "Case Study"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={() => onNavigate('home')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-green-800">{t('heroTitle')} Blog</span>
            </div>
            
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            {t('panchakarmaScience')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('blogDescription')} Discover evidence-based insights, practical guidance, and expert perspectives on holistic wellness.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-green-50 border-green-200 text-green-700"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <Card className="mb-12 border-green-100 overflow-hidden bg-white/80 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-square relative">
              <ImageWithFallback
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600 text-white">Featured</Badge>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4 border-green-200 text-green-700">
                {articles[0].category}
              </Badge>
              <h2 className="text-2xl font-bold text-green-800 mb-4">{articles[0].title}</h2>
              <p className="text-gray-600 mb-6">{articles[0].excerpt}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{articles[0].author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{articles[0].readTime}</span>
                </div>
              </div>
              <Button 
                onClick={() => onNavigate(`article?id=${articles[0].id}`)}
                className="bg-green-600 hover:bg-green-700 text-white w-fit"
              >
                Read Full Article
              </Button>
            </div>
          </div>
        </Card>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <Card key={article.id} className="border-green-100 hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white/90 border-green-200 text-green-700">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-green-800 line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => onNavigate(`article?id=${article.id}`)}
                  variant="outline" 
                  className="w-full border-green-200 text-green-700 hover:bg-green-50"
                >
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 border-green-100 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Latest Insights</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive the latest articles about Panchakarma, Ayurveda, and holistic wellness directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 border-0 focus:ring-2 focus:ring-green-300"
              />
              <Button className="bg-white text-green-600 hover:bg-green-50">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}