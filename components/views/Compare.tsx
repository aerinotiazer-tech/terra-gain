import { useAppStore } from '@/components/StoreProvider';
import { CROPS } from '@/lib/data';
import { ArrowLeft, Scale } from 'lucide-react';

export function Compare() {
  const { state, setView } = useAppStore();
  const c1 = CROPS.find(c => c.id === state.compareCropIds[0]);
  const c2 = CROPS.find(c => c.id === state.compareCropIds[1]);

  if (!c1 || !c2) return <div>Incomplete comparison</div>;

  const ha = state.profile.surface_ha || 1;

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

  const name1 = state.language === 'en' ? c1.nom_en : c1.nom_fr;
  const name2 = state.language === 'en' ? c2.nom_en : c2.nom_fr;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 px-4 pt-12 pb-[100px] max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('recommendations')} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-2xl font-black">Comparaison</h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-800 border-2 border-zinc-950 rounded-full flex items-center justify-center z-10 text-zinc-400">
           <Scale size={18} />
        </div>

        <div className="grid grid-cols-2 divide-x divide-zinc-800">
           <div className="pr-4 text-center">
             <div className="text-4xl mb-2">{getEmoji(c1.icon)}</div>
             <h3 className="font-bold text-lg mb-4">{name1}</h3>
             
             <div className="space-y-4 text-sm mt-6">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Rendement</p>
                  <p className="font-semibold text-indigo-300">{(c1.rendement_moyen_t_ha * ha).toFixed(1)} t</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Durée</p>
                  <p className="font-semibold">{c1.cycle_moyen_jours} j</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Eau</p>
                  <p className="font-semibold">{c1.besoin_eau_mm} mm</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Risque</p>
                  <p className="font-semibold">{c1.risque_meteo}</p>
                </div>
             </div>
           </div>
           
           <div className="pl-4 text-center">
             <div className="text-4xl mb-2">{getEmoji(c2.icon)}</div>
             <h3 className="font-bold text-lg mb-4">{name2}</h3>
             
             <div className="space-y-4 text-sm mt-6">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Rendement</p>
                  <p className="font-semibold text-indigo-300">{(c2.rendement_moyen_t_ha * ha).toFixed(1)} t</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Durée</p>
                  <p className="font-semibold">{c2.cycle_moyen_jours} j</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Eau</p>
                  <p className="font-semibold">{c2.besoin_eau_mm} mm</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Risque</p>
                  <p className="font-semibold">{c2.risque_meteo}</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
