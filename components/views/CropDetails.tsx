import { useAppStore } from "@/components/StoreProvider";
import { CROPS } from "@/lib/data";
import {
  ArrowLeft,
  Info,
  Droplets,
  Leaf,
  Calendar,
  ShieldAlert,
} from "lucide-react";

export function CropDetails() {
  const { t, state, setView, addMyCrop } = useAppStore();
  const crop = CROPS.find((c) => c.id === state.selectedCropId);

  if (!crop) return <div>Not found</div>;

  const ha = state.profile.surface_ha || 1;
  const isDrySeason = state.profile.saison === "Sèche";
  const plantingRange = isDrySeason ? "Octobre - Novembre" : "Avril - Mai";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 px-4 pt-12 pb-[100px] max-w-md mx-auto">
      <button
        onClick={() => setView("recommendations")}
        className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-6"
      >
        <ArrowLeft size={16} />
      </button>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-6">
        <h2 className="text-3xl font-black mb-1">
          {state.language === "en" ? crop.nom_en : crop.nom_fr}
        </h2>
        <div className="flex gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
          <span className="bg-zinc-800 px-2 py-1 rounded">
            Demande {crop.demande_marche}
          </span>
          <span className="bg-zinc-800 px-2 py-1 rounded">
            {crop.difficulte}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-l-2 border-indigo-500 pl-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              Rendement dist.
            </p>
            <p className="font-semibold text-xl">
              {(crop.rendement_moyen_t_ha * ha).toFixed(1)} t
            </p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              Durée
            </p>
            <p className="font-semibold text-xl">{crop.cycle_moyen_jours} j</p>
          </div>
          <div className="border-l-2 border-amber-500 pl-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              Eau requise
            </p>
            <p className="font-semibold text-xl">{crop.besoin_eau_mm} mm</p>
          </div>
          <div className="border-l-2 border-red-500 pl-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
              Risque
            </p>
            <p className="font-semibold text-xl">{crop.risque_meteo}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 px-2">
        Calendrier Cultural
      </h3>
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-6">
        <div className="flex gap-4">
          <div className="mt-1 text-emerald-400">
            <Leaf size={20} />
          </div>
          <div>
            <p className="font-bold">Semis</p>
            <p className="text-sm text-zinc-400 mt-1">
              {plantingRange}. Préparez le sol 2 semaines avant.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-blue-400">
            <Droplets size={20} />
          </div>
          <div>
            <p className="font-bold">Soins & Eau</p>
            <p className="text-sm text-zinc-400 mt-1">
              Sarclage régulier. Maintenir l&apos;humidité sans inonder.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="mt-1 text-amber-400">
            <Calendar size={20} />
          </div>
          <div>
            <p className="font-bold">Récolte</p>
            <p className="text-sm text-zinc-400 mt-1">
              Dans {crop.cycle_moyen_jours} jours environ.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-900/10 border border-amber-500/20 text-amber-200/90 rounded-2xl p-5 text-sm">
        <p className="font-bold flex items-center gap-2 mb-2">
          <Info size={16} /> Conseil expert
        </p>
        <p className="opacity-90">
          Privilégiez les semences certifiées. Un bon suivi peut augmenter le
          rendement de 20%.
        </p>
      </div>

      <button
        onClick={() => addMyCrop(crop.id)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
      >
        <Leaf size={18} /> Planter cette culture
      </button>
    </div>
  );
}
