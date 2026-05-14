import { useAppStore } from "@/components/StoreProvider";
import { CROPS } from "@/lib/data";
import { ArrowLeft, Leaf, Trash2, CalendarClock } from "lucide-react";

export function Dashboard() {
  const { t, state, setView, removeMyCrop } = useAppStore();
  const myCropsList = state.myCrops || [];
  const myCrops = CROPS.filter((c) => myCropsList.includes(c.id));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 px-4 pt-12 pb-[100px] max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setView("home")}
          className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-2xl font-black">Mes Cultures</h2>
      </div>

      {myCrops.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center text-zinc-500">
          <Leaf size={48} className="mb-4 opacity-50" />
          <p className="text-lg">Vous n'avez pas encore de cultures.</p>
          <button
            onClick={() => setView("recommendations")}
            className="mt-6 font-bold text-indigo-400"
          >
            Découvrir des recommandations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myCrops.map((c) => (
            <div
              key={c.id}
              className="bg-zinc-900 border border-emerald-500/30 rounded-3xl p-5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl">
                  {state.language === "en" ? c.nom_en : c.nom_fr}
                </h3>
                <button
                  onClick={() => removeMyCrop(c.id)}
                  className="text-red-400 p-2 bg-red-400/10 rounded-full hover:bg-red-400/20"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4 bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50">
                <CalendarClock size={16} className="text-emerald-400" />
                <span>Croissance en cours (Jour 1/{c.cycle_long_jours})</span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full"
                  style={{ width: "5%" }}
                ></div>
              </div>

              <button
                onClick={() => setView("market")}
                className="w-full mt-4 bg-zinc-800 border border-zinc-700 py-3 rounded-xl font-bold text-sm text-zinc-300"
              >
                Voir le prix sur le marché
              </button>
            </div>
          ))}

          <button
            onClick={() => setView("recommendations")}
            className="w-full py-4 text-sm font-bold text-indigo-400 border border-dashed border-indigo-500/30 rounded-2xl"
          >
            + Ajouter une autre culture
          </button>
        </div>
      )}
    </div>
  );
}
