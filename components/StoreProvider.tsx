"use client";
import { createContext, useContext, useState, useEffect } from "react";

type ViewState =
  | "home"
  | "location"
  | "profile"
  | "recommendations"
  | "details"
  | "market"
  | "compare"
  | "dashboard";

type AppState = {
  view: ViewState;
  language: string;
  selectedCountryId: string;
  selectedRegionId: string;
  selectedCropId: string | null;
  compareCropIds: string[];
  myCrops: string[];
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
  setProfile: (profile: Partial<AppState["profile"]>) => void;
  setLanguage: (lang: string) => void;
  selectCrop: (cropId: string) => void;
  toggleCompareMode: (cropId: string) => void;
  addMyCrop: (cropId: string) => void;
  removeMyCrop: (cropId: string) => void;
  t: (key: string) => string;
};

const defaultState: AppState = {
  view: "home",
  language: "fr",
  selectedCountryId: "",
  selectedRegionId: "",
  selectedCropId: null,
  compareCropIds: [],
  myCrops: [],
  profile: {},
};

const AppContext = createContext<AppContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("terragain_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          ...parsed,
          compareCropIds: parsed.compareCropIds || [],
          myCrops: parsed.myCrops || [],
          profile: { ...prev.profile, ...(parsed.profile || {}) },
        }));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("terragain_state", JSON.stringify(state));
    }
  }, [state, isClient]);

  const setView = (view: ViewState) => setState((s) => ({ ...s, view }));
  const setLocation = (cId: string, rId: string) =>
    setState((s) => ({
      ...s,
      selectedCountryId: cId,
      selectedRegionId: rId,
      view: "profile",
    }));
  const setProfile = (p: Partial<AppState["profile"]>) =>
    setState((s) => ({
      ...s,
      profile: { ...s.profile, ...p },
      view: "recommendations",
    }));
  const setLanguage = (lang: string) =>
    setState((s) => ({ ...s, language: lang }));
  const selectCrop = (cId: string) =>
    setState((s) => ({ ...s, selectedCropId: cId, view: "details" }));
  const toggleCompareMode = (cropId: string) =>
    setState((s) => {
      let newCompare = [...(s.compareCropIds || [])];
      if (newCompare.includes(cropId)) {
        newCompare = newCompare.filter((id) => id !== cropId);
      } else {
        if (newCompare.length < 2) newCompare.push(cropId);
      }
      return { ...s, compareCropIds: newCompare };
    });
  const addMyCrop = (cropId: string) =>
    setState((s) => ({
      ...s,
      myCrops: Array.from(new Set([...(s.myCrops || []), cropId])),
      view: "dashboard",
    }));
  const removeMyCrop = (cropId: string) =>
    setState((s) => ({
      ...s,
      myCrops: (s.myCrops || []).filter((id) => id !== cropId),
    }));

  const translations: Record<string, Record<string, string>> = {
    fr: {
      btn_start: "Commencer",
      title_location: "Où êtes-vous ?",
      btn_next: "Suivant",
      title_profile: "Votre profil",
      btn_view_recs: "Voir mes recommandations",
      title_recs: "Recommandations",
      tab_market: "Marché",
      h_rentability: "Rentabilité",
      h_risk: "Risque",
      h_duration: "Durée",
    },
    en: {
      btn_start: "Start",
      title_location: "Where are you?",
      btn_next: "Next",
      title_profile: "Your Profile",
      btn_view_recs: "See my recommendations",
      title_recs: "Recommendations",
      tab_market: "Market",
      h_rentability: "Rentability",
      h_risk: "Risk",
      h_duration: "Duration",
    },
  };

  const t = (key: string) => {
    return (
      translations[state.language]?.[key] || translations["fr"][key] || key
    );
  };

  if (!isClient) return null;

  return (
    <AppContext.Provider
      value={{
        state,
        setView,
        setLocation,
        setProfile,
        setLanguage,
        selectCrop,
        toggleCompareMode,
        addMyCrop,
        removeMyCrop,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppStore must be used within StoreProvider");
  return context;
};
