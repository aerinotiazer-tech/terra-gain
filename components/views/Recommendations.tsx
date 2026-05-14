import { useAppStore } from '@/components/StoreProvider';
import { CROPS, REGIONS } from '@/lib/data';
import { ArrowRight, Leaf, ShieldAlert, BadgeCheck } from 'lucide-react';
import { useMemo } from 'react';

export function Recommendations() {
  const { t, state, selectCrop, toggleCompareMode, setView } = useAppStore();
  
  const region = REGIONS.find(r => r.id === state.selectedRegionId);
  const p = state.profile;
  const ha = p.surface_ha || 1;

  const getEmoji = (icon: string) => {
    switch(icon) {
      case 'Plant': return '🌽';
      case 'Leaf': return '🥬';
      case 'Wheat': return '🌾';
      case 'Nut': return '🥜';
      case 'Apple': return '🍅';
      case 'Circle': return '🧅';
      case 'Sprout': return '🌱';
      case 'Cloud': return '🥔';
      default: return '🌱';
    }
  };

  const scoredCrops = useMemo(() => {
    return CROPS.map(c => {
      let score = 0;
      // Zone climatique 30%
      if (c.zones_climatiques_adaptees.includes(region?.zone_climatique || '')) score += 0.3;
      // Budget 20%
      if (p.budget === '25k' && c.difficulte === 'Facile') score += 0.2;
      else if (p.budget === '1M+') score += 0.2;
      // Eau 15%
      if (p.eau === 'Pluvial' && c.besoin_eau_mm < 600) score += 0.15;
      else if (p.eau !== 'Pluvial') score += 0.15;
      // Random pour éviter égalités
      score += Math.random() * 0.1;
      
      return { ...c, score };
    }).sort((a,b) => b.score - a.score).slice(0, 4);
  }, [region, p]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 px-4 pt-10 pb-[100px] max-w-md mx-auto">
      <div className="mb-6 px-2">
        <h2 className="text-3xl font-black tracking-tight">{t('title_recs')}</h2>
        <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2">
          <BadgeCheck size={14} className="text-emerald-400" />
          Basé sur votre profil ({region?.nom})
        </p>
      </div>

      <div className="space-y-4">
        {scoredCrops.map(c => (
          <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
               <button 
                 onClick={() => toggleCompareMode(c.id)}
                 className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${state.compareCropIds.includes(c.id) ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}
               >
                 {state.compareCropIds.includes(c.id) ? 'Sélectionné' : 'Comparer'}
               </button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-zinc-700/50">
                {getEmoji(c.icon)}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-xl">{state.language === 'en' ? c.nom_en : c.nom_fr}</h3>
                <div className="flex gap-2 text-xs mt-1">
                  <span className={`px-2 py-0.5 rounded font-bold uppercase ${c.risque_meteo === 'Bas' ? 'bg-emerald-500/10 text-emerald-400' : c.risque_meteo === 'Moyen' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                    Risque {c.risque_meteo}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-zinc-800/40 rounded-xl p-3">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest block mb-1">Rendement dist.</span>
                <span className="font-semibold text-lg text-indigo-300">{(c.rendement_moyen_t_ha * ha).toFixed(1)} t</span>
              </div>
              <div className="bg-zinc-800/40 rounded-xl p-3">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest block mb-1">Durée</span>
                <span className="font-semibold text-lg">{c.cycle_moyen_jours}j</span>
              </div>
            </div>

            <button onClick={() => selectCrop(c.id)} className="w-full flex items-center justify-between text-zinc-100 font-bold bg-zinc-800 hover:bg-zinc-700 py-4 px-5 rounded-xl transition-colors">
              Détails complets <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>

      {state.compareCropIds.length === 2 && (
        <div className="fixed bottom-6 left-0 w-full px-4 flex justify-center z-50">
           <button onClick={() => setView('compare')} className="bg-amber-500 text-zinc-950 font-black px-6 py-4 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.5)] flex items-center gap-2">
             Comparer les 2 cultures <ArrowRight size={20} />
           </button>
        </div>
      )}
      
      {state.compareCropIds.length !== 2 && (
         <div className="fixed bottom-0 left-0 w-full px-4 pb-6 pt-10 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent flex justify-center z-40 gap-4">
            <button onClick={() => setView('market')} className="bg-zinc-800 border border-zinc-700 flex-1 px-4 py-4 rounded-xl font-bold flex flex-col items-center gap-1">
               <span className="text-zinc-300">Marché</span>
               <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Prix Live</span>
            </button>
         </div>
      )}
    </div>
  );
}
