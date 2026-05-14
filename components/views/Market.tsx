import { useAppStore } from '@/components/StoreProvider';
import { CROPS, getMarketPrice } from '@/lib/data';
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useMemo } from 'react';

export function Market() {
  const { t, state, setView } = useAppStore();

  const code = state.selectedCountryId === '6' ? 'KES' : state.selectedCountryId === '7' ? 'NGN' : 'CFA';

  const marketData = useMemo(() => {
    return CROPS.map(c => ({
      crop: c,
      ...getMarketPrice(c.id, code)
    }));
  }, [code]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 px-4 pt-12 pb-[100px] max-w-md mx-auto text-zinc-100">
      <button onClick={() => setView('recommendations')} className="absolute top-12 right-6 w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center">
        <ArrowLeft size={16} />
      </button>

      <div className="mb-6 px-2">
        <h2 className="text-3xl font-black tracking-tight">{t('tab_market') || 'Marché'}</h2>
        <div className="flex items-center gap-2 mt-2 text-xs font-medium text-emerald-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          </span>
          Live Update
        </div>
      </div>

      <div className="grid gap-3">
        {marketData.map((data, i) => (
          <div key={data.crop.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center group">
             <div>
                <h3 className="font-bold text-sm">{state.language === 'en' ? data.crop.nom_en : data.crop.nom_fr}</h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">{data.devise}/kg</p>
             </div>
             <div className="text-right">
               <div className="font-bold font-mono text-lg">{data.price}</div>
               <div className={`flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-widest mt-1 ${
                 data.trend === 'up' ? 'text-emerald-400' : 
                 data.trend === 'down' ? 'text-red-400' : 'text-zinc-500'
               }`}>
                 {data.trend === 'up' && <ArrowUpRight size={12} />}
                 {data.trend === 'down' && <ArrowDownRight size={12} />}
                 {data.trend === 'stable' && <Minus size={12} />}
                 {data.diff_percent}%
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
