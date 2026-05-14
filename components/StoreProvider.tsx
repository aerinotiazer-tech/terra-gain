'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type ViewState = 'home' | 'location' | 'profile' | 'recommendations' | 'details' | 'market' | 'compare';

type AppState = {
  view: ViewState;
  language: string;
  selectedCountryId: string;
  selectedRegionId: string;
  selectedCropId: string | null;
  compareCropIds: string[];
  profile: {
    surface_ha?: number;
    budget?: string;
    saison?: string;
    eau?: string;
    sol?: string;
  };
};

type AppContextType = {
  state: AppState;
  setView: (view: ViewState) => void;
  setLocation: (countryId: string, regionId: string) => void;
  setProfile: (profile: Partial<AppState['profile']>) => void;
  setLanguage: (lang: string) => void;
  selectCrop: (cropId: string) => void;
  toggleCompareMode: (cropId: string) => void;
  t: (key: string) => string;
};

const defaultState: AppState = {
  view: 'home',
  language: 'fr',
  selectedCountryId: '',
  selectedRegionId: '',
  selectedCropId: null,
  compareCropIds: [],
  profile: {}
};

const AppContext = createContext<AppContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setView = (view: ViewState) => setState(s => ({ ...s, view }));
  const setLocation = (cId: string, rId: string) => setState(s => ({ ...s, selectedCountryId: cId, selectedRegionId: rId, view: 'profile' }));
  const setProfile = (p: Partial<AppState['profile']>) => setState(s => ({ ...s, profile: { ...s.profile, ...p }, view: 'recommendations' }));
  const setLanguage = (lang: string) => setState(s => ({ ...s, language: lang }));
  const selectCrop = (cId: string) => setState(s => ({ ...s, selectedCropId: cId, view: 'details' }));
  const toggleCompareMode = (cropId: string) => setState(s => {
    let newCompare = [...s.compareCropIds];
    if (newCompare.includes(cropId)) {
      newCompare = newCompare.filter(id => id !== cropId);
    } else {
      if (newCompare.length < 2) newCompare.push(cropId);
    }
    return { ...s, compareCropIds: newCompare };
  });

  const translations: Record<string, Record<string, string>> = {
    fr: {
      btn_start: 'Commencer',
      title_location: 'Où êtes-vous ?',
      btn_next: 'Suivant',
      title_profile: 'Votre profil',
      btn_view_recs: 'Voir mes recommandations',
      title_recs: 'Recommandations',
      tab_market: 'Marché',
      h_rentability: 'Rentabilité',
      h_risk: 'Risque',
      h_duration: 'Durée',
    },
    en: {
      btn_start: 'Start',
      title_location: 'Where are you?',
      btn_next: 'Next',
      title_profile: 'Your Profile',
      btn_view_recs: 'See my recommendations',
      title_recs: 'Recommendations',
      tab_market: 'Market',
      h_rentability: 'Rentability',
      h_risk: 'Risk',
      h_duration: 'Duration',
    }
  };

  const t = (key: string) => {
    return translations[state.language]?.[key] || translations['fr'][key] || key;
  };

  if (!isClient) return null;

  return (
    <AppContext.Provider value={{ state, setView, setLocation, setProfile, setLanguage, selectCrop, toggleCompareMode, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within StoreProvider');
  return context;
};
