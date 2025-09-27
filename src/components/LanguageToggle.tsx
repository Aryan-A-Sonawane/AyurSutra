import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
    </Button>
  );
}