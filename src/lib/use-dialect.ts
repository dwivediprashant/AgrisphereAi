import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialect, translateToDialect } from './dialect-translator';
import { getAutoDialect } from './dialect-mapping';
import { useAuthStore } from '@/store/authStore';

export function useDialect() {
  const { i18n } = useTranslation();
  const { user } = useAuthStore();
  const [dialect, setDialect] = useState<Dialect>(
    (localStorage.getItem('preferredDialect') as Dialect) || 'Standard'
  );

  // Derived effective dialect based on location if "Standard" is picked
  const [effectiveDialect, setEffectiveDialect] = useState<Dialect>(dialect);

  useEffect(() => {
    // Determine auto-dialect based on location
    if (dialect === 'Standard') {
        const userEmail = user?.email || "default";
        const stateKey = `profile_${userEmail}_state`;
        const districtKey = `profile_${userEmail}_district`;
        
        const state = localStorage.getItem(stateKey) || undefined;
        const district = localStorage.getItem(districtKey) || undefined;
        
        const auto = getAutoDialect(state, district);
        setEffectiveDialect(auto);
    } else {
        setEffectiveDialect(dialect);
    }
  }, [dialect, user?.email]);

  useEffect(() => {
    const handleDialectChange = (event: any) => {
      setDialect(event.detail);
    };

    window.addEventListener('dialectChanged', handleDialectChange);
    return () => window.removeEventListener('dialectChanged', handleDialectChange);
  }, []);

  /**
   * Localize a piece of text (usually from an API) into the current language + dialect
   */
  const localize = async (text: string, region: string = 'India') => {
    // i18n.language might be 'en', 'hi', etc. 
    // translateToDialect expects full name like 'Hindi' or 'English'
    const langMap: Record<string, string> = {
      'en': 'English',
      'hi': 'Hindi',
      'bn': 'Bengali',
      'as': 'Assamese',
      'kn': 'Kannada'
    };

    const targetLang = langMap[i18n.language] || 'Hindi';
    return await translateToDialect(text, targetLang, effectiveDialect, region);
  };

  return {
    language: i18n.language,
    dialect: effectiveDialect, // Return the auto-detected or manual dialect
    manualDialect: dialect,    // Raw manual choice
    localize,
    isStandard: effectiveDialect === 'Standard'
  };
}
