import { useAppStore } from '@/components/StoreProvider';
import { COUNTRIES, REGIONS } from '@/lib/data';
import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

export function Location() {
  const { t, setLocation } = useAppStore();
  const [countryId, setCountryId] = useState(COUNTRIES[0].id);
  const availableRegions = REGIONS.filter(r => r.pays_id === countryId);
  const [regionId, setRegionId] = useState(availableRegions[0]?.id);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryId = e.target.value;
    setCountryId(newCountryId);
    
    const newAvailableRegions = REGIONS.filter(r => r.pays_id === newCountryId);
    if (!newAvailableRegions.find(r => r.id === regionId)) {
      setRegionId(newAvailableRegions[0]?.id || '');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 p-6 pt-12 max-w-md mx-auto">
      <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mb-6">
         <MapPin size={24} />
      </div>
      <h2 className="text-3xl font-black mb-8 tracking-tight">{t('title_location')}</h2>
      
      <div className="space-y-6 flex-1">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden">
           <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Pays</label>
           <select 
             value={countryId} 
             onChange={handleCountryChange}
             className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-4 appearance-none outline-none focus:border-indigo-500"
           >
             {COUNTRIES.map(c => <option key={c.id} value={c.id}>{c.nom_fr}</option>)}
           </select>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden">
           <label className="block text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Région</label>
           <select 
             value={regionId} 
             onChange={(e) => setRegionId(e.target.value)}
             className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-4 appearance-none outline-none focus:border-indigo-500"
           >
             {availableRegions.map(r => <option key={r.id} value={r.id}>{r.nom}</option>)}
           </select>
           
           <button className="mt-4 w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-zinc-400 bg-zinc-950 rounded-xl border border-zinc-800">
             <Navigation size={16} /> Détection GPS (Auto)
           </button>
        </div>
      </div>

      <button 
        onClick={() => setLocation(countryId, regionId)}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all active:scale-95 mb-6"
      >
        {t('btn_next')}
      </button>
    </div>
  );
}
