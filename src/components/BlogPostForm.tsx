import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  X, 
  FileImage, 
  Video, 
  Plus,
  Tag
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface BlogPostFormProps {
  onNavigate: (page: string) => void;
  doctorId?: string;
  doctorName?: string;
}

export function BlogPostForm({ onNavigate, doctorId = "D001", doctorName = "Dr. Rajesh Kumar" }: BlogPostFormProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    readTime: '',
    status: 'draft'
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>([]);
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const categories = [
    { value: 'panchakarma', label: 'Panchakarma' },
    { value: 'ayurvedic-diet', label: 'Ayurvedic Diet' },
    { value: 'herbal-medicine', label: 'Herbal Medicine' },
    { value: 'yoga-meditation', label: 'Yoga & Meditation' },
    { value: 'lifestyle', label: 'Ayurvedic Lifestyle' },
    { value: 'seasonal-health', label: 'Seasonal Health' },
    { value: 'womens-health', label: "Women's Health" },
    { value: 'mental-wellness', label: 'Mental Wellness' },
    { value: 'digestive-health', label: 'Digestive Health' },
    { value: 'skin-care', label: 'Natural Skin Care' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = files.filter(file => file.type.startsWith('image/'));
      setUploadedImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviewUrls[index]);
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addYoutubeVideo = () => {
    if (newYoutubeUrl.trim() && (newYoutubeUrl.includes('youtube.com') || newYoutubeUrl.includes('youtu.be'))) {
      setYoutubeUrls(prev => [...prev, newYoutubeUrl.trim()]);
      setNewYoutubeUrl('');
    }
  };

  const removeYoutubeVideo = (index: number) => {
    setYoutubeUrls(prev => prev.filter((_, i) => i !== index));
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      ...formData,
      images: uploadedImages,
      youtubeVideos: youtubeUrls,
      doctorId,
      doctorName,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    console.log('Blog post submitted:', blogData);
    // Handle blog submission logic here
    onNavigate('practitioner-dashboard');
  };

  const renderPreview = () => {
    return (
      <div className="prose prose-green max-w-none">
        <h1 className="text-3xl font-bold text-green-800 mb-4">{formData.title || 'Blog Title'}</h1>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
          <span>By {doctorName}</span>
          <span>•</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>•</span>
          <span>{formData.readTime || '5'} min read</span>
          {formData.category && (
            <>
              <span>•</span>
              <Badge className="bg-green-100 text-green-800">
                {categories.find(c => c.value === formData.category)?.label}
              </Badge>
            </>
          )}
        </div>

        <div className="text-gray-600 italic mb-6 p-4 bg-green-50 border-l-4 border-green-500">
          {formData.excerpt || 'Blog excerpt will appear here...'}
        </div>

        {/* Images */}
        {imagePreviewUrls.length > 0 && (
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imagePreviewUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Blog image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {formData.content || 'Blog content will appear here...'}
        </div>

        {/* YouTube Videos */}
        {youtubeUrls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {youtubeUrls.map((url, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    src={getYoutubeEmbedUrl(url)}
                    title={`YouTube video ${index + 1}`}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {formData.tags && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {formData.tags.split(',').map((tag, index) => (
                <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                  #{tag.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
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
              <h1 className="text-lg font-semibold text-green-800">Create Blog Post</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ? (
          <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {renderPreview()}
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Author Info */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-green-800">{doctorName}</h2>
                    <p className="text-sm text-gray-600">Doctor ID: {doctorId}</p>
                  </div>
                  <Badge className="bg-green-600 text-white">Author</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Blog Details</CardTitle>
                <CardDescription>Basic information about your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-green-700">Blog Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder="Enter an engaging title for your blog post"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-green-700">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-20"
                    placeholder="Write a brief summary that will appear on the blog listing page..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-green-700">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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

                  <div>
                    <Label htmlFor="readTime" className="text-green-700">Read Time (minutes)</Label>
                    <Input
                      id="readTime"
                      type="number"
                      min="1"
                      max="60"
                      value={formData.readTime}
                      onChange={(e) => handleInputChange('readTime', e.target.value)}
                      className="border-green-200 focus:border-green-400 focus:ring-green-400"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-green-700">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="border-green-200 focus:border-green-400 focus:ring-green-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags" className="text-green-700">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    placeholder="ayurveda, panchakarma, health, wellness (comma separated)"
                  />
                  <p className="text-sm text-gray-600 mt-1">Separate tags with commas</p>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Blog Content</CardTitle>
                <CardDescription>Write your blog post content</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="content" className="text-green-700">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-96"
                    placeholder="Write your blog content here. You can include paragraphs, lists, and detailed explanations..."
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <FileImage className="h-5 w-5 mr-2" />
                  Images
                </CardTitle>
                <CardDescription>Add relevant images to your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="imageUpload" className="text-blue-700">
                    Upload Images (JPG, PNG, GIF)
                  </Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <p className="text-sm text-blue-600 mt-1">
                    Select multiple images to add to your blog post
                  </p>
                </div>

                {/* Image Previews */}
                {imagePreviewUrls.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">Uploaded Images:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Blog image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-blue-200"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* YouTube Videos */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  YouTube Videos
                </CardTitle>
                <CardDescription>Add YouTube videos to your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newYoutubeUrl}
                    onChange={(e) => setNewYoutubeUrl(e.target.value)}
                    className="border-red-200 focus:border-red-400 focus:ring-red-400"
                    placeholder="Paste YouTube URL here..."
                  />
                  <Button
                    type="button"
                    onClick={addYoutubeVideo}
                    disabled={!newYoutubeUrl.trim()}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>

                {/* YouTube Video Previews */}
                {youtubeUrls.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-red-800">Added Videos:</h4>
                    {youtubeUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <iframe
                            src={getYoutubeEmbedUrl(url)}
                            title={`YouTube video ${index + 1}`}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeYoutubeVideo(index)}
                          className="absolute top-2 right-2"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex justify-between items-center pt-6">
              <Alert className="border-green-200 bg-green-50 flex-1 mr-4">
                <AlertDescription className="text-green-800">
                  Your blog post will be reviewed by our editorial team before publication.
                </AlertDescription>
              </Alert>

              <div className="flex space-x-3">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => handleInputChange('status', 'draft')}
                  className="border-gray-300 text-gray-700"
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {formData.status === 'published' ? 'Publish Post' : 'Submit for Review'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}