import axios from 'axios';

export type Dialect = 'Standard' | 'Bhojpuri' | 'Maithili' | 'Magahi' | 'Awadhi' | 'Khasi' | 'Garo' | 'Mizo' | 'Kokborok' | 'Punjabi' | 'Haryanvi';

interface LocalizeRequest {
  text: string;
  language: string;
  dialect: Dialect;
  region: string;
}

interface LocalizeResponse {
  localized_text: string;
  dialect_used: string;
  language: string;
  status?: string;
}

/**
 * Utility to dynamically localize analytical results into regional dialects
 */
export const translateToDialect = async (
  text: string, 
  language: string = 'Hindi', 
  dialect: Dialect = 'Standard',
  region: string = 'India'
): Promise<string> => {
  if (!text || (dialect === 'Standard' && (language === 'English' || language === 'en'))) {
    return text;
  }

  try {
    const response = await axios.post<LocalizeResponse>('http://localhost:5000/localize-text', {
      text,
      language,
      dialect,
      region
    });

    return response.data.localized_text;
  } catch (error) {
    console.error('Dialect translation error:', error);
    return text; // Fallback to original text
  }
};

/**
 * Maps a state name to its most common agricultural dialect
 */
export const getDialectForState = (state: string): Dialect => {
  const mapping: Record<string, Dialect> = {
    'Bihar': 'Bhojpuri',
    'Uttar Pradesh': 'Bhojpuri', // simplified, could be Braj/Awadhi
    'Meghalaya': 'Khasi',
    'Mizoram': 'Mizo',
    'Tripura': 'Kokborok',
    'Jharkhand': 'Bhojpuri',
    // Default to Standard
  };

  return mapping[state] || 'Standard';
};
