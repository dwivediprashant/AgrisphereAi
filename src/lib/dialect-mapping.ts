import { Dialect } from './dialect-translator';

/**
 * Mapping of Indian States and Districts to Regional Dialects
 * Used for "Auto-Dialect Detection" features.
 */

export interface DialectMapping {
  state: string;
  districts?: Record<string, Dialect>;
  defaultDialect: Dialect;
}

export const STATE_DIALECT_MAP: Record<string, DialectMapping> = {
  "Bihar": {
    state: "Bihar",
    defaultDialect: "Bhojpuri",
    districts: {
      "Patna": "Magahi",
      "Gaya": "Magahi",
      "Jehanabad": "Magahi",
      "Nalanda": "Magahi",
      "Madhubani": "Maithili",
      "Darbhanga": "Maithili",
      "Samastipur": "Maithili",
      "Saharsa": "Maithili",
      "Supaul": "Maithili",
      "Madhepura": "Maithili",
      "Araria": "Maithili",
      "Sitamarhi": "Maithili",
      "Bhojpur": "Bhojpuri",
      "Buxar": "Bhojpuri",
      "Saran": "Bhojpuri",
      "Siwan": "Bhojpuri",
      "Gopalganj": "Bhojpuri",
      "Rohtas": "Bhojpuri",
      "East Champaran": "Bhojpuri",
      "West Champaran": "Bhojpuri"
    }
  },
  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    defaultDialect: "Bhojpuri",
    districts: {
      "Lucknow": "Awadhi",
      "Faizabad": "Awadhi",
      "Ayodhya": "Awadhi",
      "Varanasi": "Bhojpuri",
      "Gorakhpur": "Bhojpuri",
      "Deoria": "Bhojpuri",
      "Ballia": "Bhojpuri",
      "Ghazipur": "Bhojpuri",
      "Azamgarh": "Bhojpuri"
    }
  },
  "Meghalaya": {
    state: "Meghalaya",
    defaultDialect: "Khasi",
    districts: {
        "East Khasi Hills": "Khasi",
        "West Khasi Hills": "Khasi",
        "South West Khasi Hills": "Khasi",
        "Ri Bhoi": "Khasi",
        "East Garo Hills": "Garo",
        "West Garo Hills": "Garo",
        "South Garo Hills": "Garo",
        "North Garo Hills": "Garo",
        "South West Garo Hills": "Garo"
    }
  },
  "Mizoram": {
    state: "Mizoram",
    defaultDialect: "Mizo"
  },
  "Tripura": {
    state: "Tripura",
    defaultDialect: "Kokborok"
  },
  "Punjab": {
    state: "Punjab",
    defaultDialect: "Punjabi"
  },
  "Haryana": {
    state: "Haryana",
    defaultDialect: "Haryanvi"
  }
};

/**
 * Get the most likely dialect for a given state and district
 */
export function getAutoDialect(state?: string, district?: string): Dialect {
  if (!state) return "Standard";
  
  const mapping = STATE_DIALECT_MAP[state];
  if (!mapping) return "Standard";
  
  if (district && mapping.districts && mapping.districts[district]) {
    return mapping.districts[district];
  }
  
  return mapping.defaultDialect;
}
