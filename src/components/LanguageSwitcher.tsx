import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full relative overflow-hidden group">
          <Languages className="h-[1.2rem] w-[1.2rem] text-primary transition-all group-hover:scale-110" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-white">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={`cursor-pointer ${i18n.language === 'en' ? 'bg-primary/20 text-primary focus:bg-primary/30' : 'focus:bg-slate-800'}`}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('hi')}
          className={`cursor-pointer ${i18n.language === 'hi' ? 'bg-primary/20 text-primary focus:bg-primary/30' : 'focus:bg-slate-800'}`}
        >
          हिंदी (Hindi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
