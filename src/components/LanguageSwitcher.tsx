import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Globe, Check, MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { Dialect } from '@/lib/dialect-translator';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', label: 'English' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', label: 'Hindi' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳', label: 'Bengali' },
  { code: 'as', name: 'অসমীয়া', flag: '🇮🇳', label: 'Assamese' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', label: 'Kannada' },
];

const dialects: { code: Dialect; name: string; region: string }[] = [
  { code: 'Standard', name: 'Standard (मानक)', region: 'General' },
  { code: 'Bhojpuri', name: 'Bhojpuri (भोजपुरी)', region: 'Bihar/UP' },
  { code: 'Maithili', name: 'Maithili (मैथिली)', region: 'Bihar' },
  { code: 'Khasi', name: 'Khasi', region: 'Meghalaya' },
  { code: 'Garo', name: 'Garo', region: 'Meghalaya' },
  { code: 'Mizo', name: 'Mizo', region: 'Mizoram' },
  { code: 'Kokborok', name: 'Kokborok', region: 'Tripura' },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentDialect, setCurrentDialect] = useState<Dialect>(
    (localStorage.getItem('preferredDialect') as Dialect) || 'Standard'
  );

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    
    // Reset dialect to Standard when changing language to avoid mixing (e.g. Bengali + Maithili)
    setCurrentDialect('Standard');
    localStorage.setItem('preferredDialect', 'Standard');
    window.dispatchEvent(new CustomEvent('dialectChanged', { detail: 'Standard' }));

    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  };

  const handleDialectChange = (dialect: Dialect) => {
    setCurrentDialect(dialect);
    localStorage.setItem('preferredDialect', dialect);
    window.dispatchEvent(new CustomEvent('dialectChanged', { detail: dialect }));
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all gap-2 group"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
          </motion.div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-bold uppercase tracking-wider">{currentLang.code}</span>
            {currentDialect !== 'Standard' && (
              <span className="text-[8px] text-primary font-medium">{currentDialect}</span>
            )}
          </div>
          <span className="text-lg leading-none">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 p-2 bg-slate-950/95 backdrop-blur-xl border-slate-800 text-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-2 py-1.5 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('nav.selectLanguage', 'Select Language')}</p>
        </div>

        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 mb-1
              ${i18n.language === lang.code
                ? 'bg-primary/20 text-primary border border-primary/20'
                : 'hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{lang.name}</span>
                <span className="text-[10px] opacity-50 uppercase">{lang.label}</span>
              </div>
            </div>
            {i18n.language === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-slate-800 my-2" />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer">
            <MessageSquare className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{t('nav.regionalDialect', 'Regional Dialect')}</span>
              <span className="text-[10px] opacity-50 uppercase">{currentDialect}</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-56 p-2 bg-slate-950/98 backdrop-blur-xl border-slate-800 text-white rounded-2xl shadow-2xl">
              <div className="px-2 py-1.5 mb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Select Dialect</p>
              </div>
              {dialects.map((d) => (
                <DropdownMenuItem
                  key={d.code}
                  onClick={() => handleDialectChange(d.code)}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer mb-1
                    ${currentDialect === d.code ? 'bg-primary/20 text-primary' : 'hover:bg-white/5'}
                  `}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{d.name}</span>
                    <span className="text-[9px] opacity-50 uppercase">{d.region}</span>
                  </div>
                  {currentDialect === d.code && <Check className="h-3 w-3" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
