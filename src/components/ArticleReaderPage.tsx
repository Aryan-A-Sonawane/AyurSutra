import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Star
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleReaderPageProps {
  onNavigate: (page: string) => void;
  articleId?: string;
}

export function ArticleReaderPage({ onNavigate, articleId = "1" }: ArticleReaderPageProps) {
  const { language } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Sample article data - in real app, this would be fetched based on articleId
  const article = {
    id: articleId,
    title: "Understanding Panchakarma: The Science Behind Ancient Wisdom",
    excerpt: "Explore how modern research validates the traditional Panchakarma treatments and their effectiveness in treating chronic conditions.",
    content: `
Panchakarma, literally meaning "five actions," is one of the most powerful healing modalities in Ayurvedic medicine. This comprehensive detoxification and rejuvenation program has been practiced for thousands of years, and modern scientific research is now beginning to validate its remarkable therapeutic benefits.

## The Five Pillars of Panchakarma

### 1. Vamana (Therapeutic Vomiting)
Vamana is designed to eliminate excess Kapha dosha from the body, particularly from the chest and stomach areas. This procedure is especially beneficial for conditions like asthma, bronchitis, and chronic respiratory disorders.

**Modern Understanding:** Recent studies have shown that controlled therapeutic emesis can help reduce inflammatory markers in the respiratory system and improve lung function in patients with chronic obstructive pulmonary disease (COPD).

### 2. Virechana (Purgation Therapy)
This procedure focuses on eliminating excess Pitta dosha through controlled purgation. It's particularly effective for liver disorders, skin conditions, and digestive issues.

**Scientific Validation:** Research has demonstrated that Virechana therapy can significantly improve liver enzyme levels and reduce oxidative stress markers in patients with hepatic disorders.

### 3. Basti (Medicated Enemas)
Considered the most important of all Panchakarma procedures, Basti involves the administration of medicated oils or decoctions through the rectum. It's particularly effective for Vata-related disorders.

**Clinical Evidence:** Studies have shown that Basti therapy can be highly effective in managing neurological conditions, arthritis, and chronic pain syndromes by modulating neurotransmitter levels and reducing inflammation.

### 4. Nasya (Nasal Administration)
This procedure involves the administration of medicated oils or powders through the nasal passages, targeting disorders of the head and neck region.

**Research Findings:** Modern research has shown that Nasya can improve cognitive function, reduce stress hormones, and enhance overall neurological health by directly accessing the central nervous system through the nasal-brain pathway.

### 5. Raktamokshana (Bloodletting)
This purification procedure involves the removal of impure blood from the body, traditionally used for various skin and blood-related disorders.

**Contemporary Applications:** While traditional bloodletting has evolved, modern variations include techniques like leech therapy, which has been scientifically proven to improve circulation and reduce inflammation in localized areas.

## The Science of Preparation: Purvakarma

Before the main Panchakarma procedures, patients undergo preparatory treatments called Purvakarma:

### Snehana (Oleation Therapy)
Internal and external oleation with medicated ghee and oils prepares the body for detoxification. Research shows that this process:
- Enhances cellular membrane permeability
- Mobilizes fat-soluble toxins
- Reduces oxidative stress
- Improves tissue flexibility

### Swedana (Sudation Therapy)
Various forms of therapeutic sweating help open the body's channels and prepare for toxin elimination. Studies indicate that controlled hyperthermia:
- Activates heat shock proteins
- Enhances lymphatic drainage
- Improves circulation
- Supports immune function

## Modern Research Validation

### Neurological Benefits
A 2019 study published in the Journal of Ayurveda and Integrative Medicine found that patients undergoing Panchakarma showed significant improvements in:
- Cognitive function scores
- Stress hormone levels (cortisol reduction of 23%)
- Sleep quality indices
- Overall quality of life measures

### Metabolic Health
Research conducted at leading Ayurvedic institutions has demonstrated that Panchakarma can:
- Improve insulin sensitivity by up to 35%
- Reduce inflammatory markers (CRP, IL-6) by 40-60%
- Enhance liver detoxification capacity
- Normalize lipid profiles

### Cardiovascular Benefits
Long-term studies have shown that regular Panchakarma treatments can:
- Reduce blood pressure by 10-15 mmHg
- Improve endothelial function
- Decrease arterial stiffness
- Lower cardiovascular risk factors

## Integration with Modern Medicine

### Personalized Treatment Protocols
Modern Panchakarma centers now use advanced diagnostic tools alongside traditional pulse diagnosis:
- Genetic testing for personalized herb selection
- Biomarker analysis for treatment monitoring
- Advanced imaging for progress tracking
- Digital health platforms for follow-up care

### Quality Control and Standardization
Contemporary Panchakarma facilities maintain:
- GMP-certified herb preparation
- Standardized treatment protocols
- Trained and certified therapists
- Regular quality audits and assessments

## Patient Selection and Safety

### Contraindications
Modern Panchakarma practice carefully screens patients for:
- Cardiovascular instability
- Severe kidney or liver disease
- Active infections or fever
- Pregnancy (certain procedures)
- Severe mental health conditions

### Monitoring and Support
Patients receive comprehensive monitoring including:
- Daily vital sign assessment
- Regular physician consultations
- Nutritional counseling
- Psychological support
- Emergency medical backup

## The Future of Panchakarma

### Technological Integration
Emerging technologies are enhancing traditional Panchakarma:
- AI-powered dosha assessment
- Wearable devices for continuous monitoring
- Telemedicine for remote consultations
- Virtual reality for meditation and relaxation

### Research Frontiers
Current research is exploring:
- Genomic responses to Panchakarma treatments
- Microbiome changes during detoxification
- Epigenetic modifications
- Long-term health outcomes

## Conclusion

The ancient wisdom of Panchakarma is finding strong validation in modern scientific research. As we continue to understand the intricate mechanisms behind these time-tested therapies, we're witnessing a beautiful convergence of traditional knowledge and contemporary science.

For those considering Panchakarma, it's essential to choose a reputable center with qualified practitioners who can provide personalized treatment protocols based on both traditional assessment methods and modern diagnostic tools.

The journey of Panchakarma is not just about detoxification—it's about transformation, restoration, and the rediscovery of your body's innate healing wisdom.
    `,
    author: {
      name: "Dr. Rajesh Sharma",
      title: "Chief Ayurvedic Physician",
      avatar: null,
      bio: "Dr. Rajesh Sharma is a renowned Ayurvedic practitioner with over 20 years of experience in Panchakarma therapy. He holds an MD in Ayurveda and has published numerous research papers on integrative medicine."
    },
    publishDate: "September 15, 2025",
    readTime: "12 min read",
    category: "Science",
    tags: ["Panchakarma", "Ayurveda", "Detoxification", "Science", "Research"],
    image: "https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBuYXR1cmV8ZW58MXx8fHwxNzU4MjEzNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 127,
    bookmarks: 89,
    comments: [
      {
        id: 1,
        author: "Sarah Johnson",
        content: "This article beautifully explains the science behind Panchakarma. I've been considering this treatment for my chronic stress issues. Thank you for the detailed explanation!",
        date: "September 16, 2025",
        likes: 12,
        replies: []
      },
      {
        id: 2,
        author: "Dr. Michael Chen",
        content: "Excellent integration of traditional wisdom with modern research. The neurological benefits section was particularly insightful. Would love to see more on the genetic aspects.",
        date: "September 17, 2025",
        likes: 8,
        replies: [
          {
            id: 3,
            author: "Dr. Rajesh Sharma",
            content: "Thank you, Dr. Chen! I'm actually working on a follow-up article about genomic responses to Panchakarma. Should be published next month.",
            date: "September 17, 2025",
            likes: 5
          }
        ]
      }
    ]
  };

  const relatedArticles = [
    {
      id: 2,
      title: "The Five Actions of Panchakarma: A Complete Guide",
      author: "Dr. Priya Nair",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1724112856938-162e80b6f3f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwd2VsbG5lc3MlMjBncmVlbnxlbnwxfHx8fDE3NTgzMTY1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      title: "Preparing for Your First Panchakarma Session",
      author: "Dr. Amit Verma",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1703300450387-047da16a89c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxpbmclMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTgzMTY1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // Handle comment submission
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" onClick={() => onNavigate('blog')} className="text-green-700 hover:text-green-800 hover:bg-green-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600 hover:text-green-700"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${isBookmarked ? 'text-green-600' : 'text-gray-600'} hover:text-green-700`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <Badge className="bg-green-100 text-green-800 mb-4">
            {article.category}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{article.publishDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center space-x-6 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{article.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{article.comments.length}</span>
            </Button>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Bookmark className="h-4 w-4" />
              <span>{article.bookmarks}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-8 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <Card className="border-green-100 bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-8">
            <div className="prose prose-green prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                {article.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="border-green-300 text-green-700">
              #{tag}
            </Badge>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Author Bio */}
        <Card className="border-green-100 bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 mb-1">{article.author.name}</h3>
                <p className="text-sm text-green-600 mb-2">{article.author.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{article.author.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        {showComments && (
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-800 mb-6 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comments ({article.comments.length})
              </h3>

              {/* Add Comment */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
                  rows={3}
                  placeholder="Share your thoughts..."
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-green-200 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-green-800">{comment.author}</h4>
                        <p className="text-xs text-gray-500">{comment.date}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-4 mt-3 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-start justify-between mb-1">
                              <h5 className="font-medium text-green-700 text-sm">{reply.author}</h5>
                              <span className="text-xs text-gray-500">{reply.date}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Articles */}
        <div>
          <h3 className="text-2xl font-bold text-green-800 mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2 line-clamp-2">{relatedArticle.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{relatedArticle.author}</span>
                    <span>{relatedArticle.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}