import { useAppStore } from '@/components/StoreProvider';
import { useState } from 'react';
import { User } from 'lucide-react';

export function Profile() {
  const { t, state, setProfile, setLanguage } = useAppStore();
  const [profile, setLocalProfile] = useState({
    surface_ha: state.profile.surface_ha ?? 1,
    budget: state.profile.budget ?? '50k',
    saison: state.profile.saison ?? 'Pluie',
    eau: state.profile.eau ?? 'Pluvial',
    sol: state.profile.sol ?? 'Latérite'
  });

  const update = (k: string, v: any) => setLocalProfile(p => ({ ...p, [k]: v }));
  
  const getBtnClass = (active: boolean) => `py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all ${
    active ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-500'
  }`;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 px-4 pt-10 pb-[100px] max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8 px-2">
         <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center">
           <User size={20} />
         </div>
         <h2 className="text-2xl font-black tracking-tight">{t('title_profile')}</h2>
      </div>

      <div className="space-y-4">
        {/* Surface */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Surface (Ha)</label>
          <div className="relative">
            <input 
              type="number" min="0.1" step="0.1" value={profile.surface_ha ?? ''}
              onChange={e => update('surface_ha', e.target.value === '' ? '' : (parseFloat(e.target.value) || 1))}
              className="w-full bg-zinc-800/50 border border-zinc-700 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 font-mono text-lg"
            />
          </div>
        </div>

        {/* Budget */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Budget dispo</label>
          <div className="grid grid-cols-3 gap-2">
            {['25k', '50k', '100k', '250k', '500k', '1M+'].map(v => (
              <button key={v} onClick={() => update('budget', v)} className={getBtnClass(profile.budget === v)}>{v}</button>
            ))}
          </div>
        </div>

        {/* Saison & Eau */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
            <label className="block text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Saison</label>
            <div className="flex flex-col gap-2">
              {['Pluie', 'Sèche', 'Toute'].map(v => (
                <button key={v} onClick={() => update('saison', v)} className={getBtnClass(profile.saison === v)}>{v}</button>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
            <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Eau</label>
            <div className="flex flex-col gap-2">
              {['Pluvial', 'Irrigué', 'Proche'].map(v => (
                <button key={v} onClick={() => update('eau', v)} className={getBtnClass(profile.eau === v)}>{v}</button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Langue (global) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mt-4">
          <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Langue</label>
          <div className="grid grid-cols-3 gap-2">
            {[ {v:'fr',l:'FR'}, {v:'en',l:'EN'}, {v:'sw',l:'SWA'}, {v:'wo',l:'WOL'} ].map(lg => (
              <button key={lg.v} onClick={() => setLanguage(lg.v)} className={getBtnClass(state.language === lg.v)}>{lg.l}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setProfile(profile)} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
        {t('btn_view_recs')}
      </button>
    </div>
  );
}
