export type Crop = {
  id: string;
  nom_fr: string;
  nom_en: string;
  nom_sw?: string;
  cycle_court_jours: number;
  cycle_moyen_jours: number;
  cycle_long_jours: number;
  besoin_eau_mm: number;
  difficulte: 'Facile' | 'Moyen' | 'Difficile';
  risque_meteo: 'Bas' | 'Moyen' | 'Élevé';
  demande_marche: 'Basse' | 'Moyenne' | 'Haute';
  prix_moyen_ar_kg: number;
  rendement_moyen_t_ha: number;
  zones_climatiques_adaptees: string[];
  icon: string;
};

export type Country = {
  id: string;
  code_iso: string;
  nom_fr: string;
  nom_en: string;
  devise: string;
  langue_principale: string;
  regions_count: number;
  zone_climatique_principale: string;
};

export type Region = {
  id: string;
  pays_id: string;
  nom: string;
  zone_climatique: string;
};

export const COUNTRIES: Country[] = [
  { id: '1', code_iso: 'SN', nom_fr: 'Sénégal', nom_en: 'Senegal', devise: 'CFA', langue_principale: 'fr', regions_count: 14, zone_climatique_principale: 'Sahel' },
  { id: '2', code_iso: 'ML', nom_fr: 'Mali', nom_en: 'Mali', devise: 'CFA', langue_principale: 'fr', regions_count: 8, zone_climatique_principale: 'Sahel' },
  { id: '3', code_iso: 'CI', nom_fr: "Côte d'Ivoire", nom_en: 'Ivory Coast', devise: 'CFA', langue_principale: 'fr', regions_count: 31, zone_climatique_principale: 'Forêt tropicale' },
  { id: '4', code_iso: 'GH', nom_fr: 'Ghana', nom_en: 'Ghana', devise: 'GHS', langue_principale: 'en', regions_count: 16, zone_climatique_principale: 'Savane' },
  { id: '5', code_iso: 'NG', nom_fr: 'Nigeria', nom_en: 'Nigeria', devise: 'NGN', langue_principale: 'en', regions_count: 36, zone_climatique_principale: 'Savane' },
  { id: '6', code_iso: 'CM', nom_fr: 'Cameroun', nom_en: 'Cameroon', devise: 'CFA', langue_principale: 'fr', regions_count: 10, zone_climatique_principale: 'Montagne' },
  { id: '7', code_iso: 'KE', nom_fr: 'Kenya', nom_en: 'Kenya', devise: 'KES', langue_principale: 'en', regions_count: 47, zone_climatique_principale: 'Montagne' },
  { id: '8', code_iso: 'TZ', nom_fr: 'Tanzanie', nom_en: 'Tanzania', devise: 'TZS', langue_principale: 'sw', regions_count: 31, zone_climatique_principale: 'Savane' },
  { id: '9', code_iso: 'UG', nom_fr: 'Ouganda', nom_en: 'Uganda', devise: 'UGX', langue_principale: 'en', regions_count: 134, zone_climatique_principale: 'Savane' },
  { id: '10', code_iso: 'ET', nom_fr: 'Éthiopie', nom_en: 'Ethiopia', devise: 'ETB', langue_principale: 'en', regions_count: 11, zone_climatique_principale: 'Montagne' }
];

export const REGIONS: Region[] = [
  ...Array.from({ length: 14 }).map((_, i) => ({ id: `r_sn_${i}`, pays_id: '1', nom: ['Dakar', 'Thiès', 'Kaolack', 'Saint-Louis', 'Ziguinchor', 'Louga', 'Fatick', 'Kaffrine', 'Matam', 'Diourbel', 'Tambacounda', 'Kolda', 'Sédhiou', 'Kédougou'][i] || `Region SN ${i}`, zone_climatique: i < 4 ? 'Côtière' : 'Sahel' })),
  ...Array.from({ length: 8 }).map((_, i) => ({ id: `r_ml_${i}`, pays_id: '2', nom: ['Bamako', 'Kayes', 'Sikasso', 'Ségou', 'Mopti', 'Tombouctou', 'Gao', 'Kidal'][i], zone_climatique: 'Sahel' })),
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `r_ci_${i}`, pays_id: '3', nom: ['Abidjan', 'Bouaké', 'Yamoussoukro'][i], zone_climatique: 'Forêt tropicale' })),
  ...Array.from({ length: 3 }).map((_, i) => ({ id: `r_ke_${i}`, pays_id: '7', nom: ['Nairobi', 'Rift Valley', 'Mombasa'][i], zone_climatique: i===1 ? 'Montagne' : 'Côtière' })),
];

export const CROPS: Crop[] = [
  { id: 'c1', nom_fr: 'Maïs', nom_en: 'Maize', cycle_court_jours: 90, cycle_moyen_jours: 110, cycle_long_jours: 120, besoin_eau_mm: 500, difficulte: 'Moyen', risque_meteo: 'Moyen', demande_marche: 'Haute', prix_moyen_ar_kg: 250, rendement_moyen_t_ha: 3, zones_climatiques_adaptees: ['Savane', 'Montagne'], icon: 'Plant' },
  { id: 'c2', nom_fr: 'Haricot', nom_en: 'Beans', cycle_court_jours: 60, cycle_moyen_jours: 75, cycle_long_jours: 90, besoin_eau_mm: 400, difficulte: 'Facile', risque_meteo: 'Bas', demande_marche: 'Haute', prix_moyen_ar_kg: 600, rendement_moyen_t_ha: 1.5, zones_climatiques_adaptees: ['Sahel', 'Savane', 'Montagne', 'Côtière'], icon: 'Leaf' },
  { id: 'c3', nom_fr: 'Riz', nom_en: 'Rice', cycle_court_jours: 100, cycle_moyen_jours: 130, cycle_long_jours: 150, besoin_eau_mm: 1200, difficulte: 'Difficile', risque_meteo: 'Élevé', demande_marche: 'Haute', prix_moyen_ar_kg: 400, rendement_moyen_t_ha: 4, zones_climatiques_adaptees: ['Côtière', 'Forêt tropicale', 'Savane'], icon: 'Wheat' },
  { id: 'c4', nom_fr: 'Arachide', nom_en: 'Peanut', cycle_court_jours: 90, cycle_moyen_jours: 110, cycle_long_jours: 120, besoin_eau_mm: 500, difficulte: 'Facile', risque_meteo: 'Bas', demande_marche: 'Moyenne', prix_moyen_ar_kg: 500, rendement_moyen_t_ha: 1.2, zones_climatiques_adaptees: ['Sahel', 'Savane'], icon: 'Nut' },
  { id: 'c5', nom_fr: 'Tomate', nom_en: 'Tomato', cycle_court_jours: 75, cycle_moyen_jours: 90, cycle_long_jours: 110, besoin_eau_mm: 600, difficulte: 'Difficile', risque_meteo: 'Élevé', demande_marche: 'Haute', prix_moyen_ar_kg: 800, rendement_moyen_t_ha: 20, zones_climatiques_adaptees: ['Côtière', 'Savane', 'Montagne'], icon: 'Apple' },
  { id: 'c6', nom_fr: 'Oignon', nom_en: 'Onion', cycle_court_jours: 90, cycle_moyen_jours: 120, cycle_long_jours: 150, besoin_eau_mm: 500, difficulte: 'Moyen', risque_meteo: 'Moyen', demande_marche: 'Haute', prix_moyen_ar_kg: 700, rendement_moyen_t_ha: 25, zones_climatiques_adaptees: ['Côtière', 'Sahel'], icon: 'Circle' }, 
  { id: 'c7', nom_fr: 'Manioc', nom_en: 'Cassava', cycle_court_jours: 240, cycle_moyen_jours: 300, cycle_long_jours: 360, besoin_eau_mm: 800, difficulte: 'Facile', risque_meteo: 'Bas', demande_marche: 'Haute', prix_moyen_ar_kg: 150, rendement_moyen_t_ha: 15, zones_climatiques_adaptees: ['Forêt tropicale', 'Savane', 'Côtière'], icon: 'Sprout' },
  { id: 'c8', nom_fr: 'Mil', nom_en: 'Millet', cycle_court_jours: 70, cycle_moyen_jours: 85, cycle_long_jours: 100, besoin_eau_mm: 300, difficulte: 'Facile', risque_meteo: 'Bas', demande_marche: 'Moyenne', prix_moyen_ar_kg: 300, rendement_moyen_t_ha: 0.8, zones_climatiques_adaptees: ['Sahel'], icon: 'Wheat' },
  { id: 'c9', nom_fr: 'Sorgho', nom_en: 'Sorghum', cycle_court_jours: 100, cycle_moyen_jours: 120, cycle_long_jours: 140, besoin_eau_mm: 350, difficulte: 'Facile', risque_meteo: 'Bas', demande_marche: 'Moyenne', prix_moyen_ar_kg: 320, rendement_moyen_t_ha: 1.0, zones_climatiques_adaptees: ['Sahel'], icon: 'Wheat' },
  { id: 'c10', nom_fr: 'Pomme de terre', nom_en: 'Potato', cycle_court_jours: 80, cycle_moyen_jours: 100, cycle_long_jours: 120, besoin_eau_mm: 500, difficulte: 'Moyen', risque_meteo: 'Moyen', demande_marche: 'Haute', prix_moyen_ar_kg: 600, rendement_moyen_t_ha: 15, zones_climatiques_adaptees: ['Montagne'], icon: 'Cloud' },
];

export const getMarketPrice = (cropId: string, countryIso: string): { price: number; devise: string; trend: 'up' | 'down' | 'stable'; diff_percent: number } => {
  const crop = CROPS.find(c => c.id === cropId);
  const country = COUNTRIES.find(c => c.code_iso === countryIso);
  const basePrice = crop?.prix_moyen_ar_kg || 500;
  
  let multiplier = 1;
  if(countryIso === 'KES') multiplier = 0.8;
  if(countryIso === 'NGN') multiplier = 2.5; 

  const finalPrice = Math.round(basePrice * multiplier);
  
  const hash = cropId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomTrend = (hash % 10) / 10;
  
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (randomTrend > 0.6) trend = 'up';
  else if (randomTrend < 0.3) trend = 'down';

  return { 
    price: finalPrice, 
    devise: country?.devise || 'CFA', 
    trend,
    diff_percent: (hash % 15) + 1
  };
}
