import { useAppStore } from "@/components/StoreProvider";
import { Sprout, LayoutDashboard } from "lucide-react";

export function Home() {
  const { t, state, setView } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 p-6 text-center relative">
      <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-3xl flex items-center justify-center mb-6">
        <Sprout size={48} />
      </div>
      <h1 className="text-4xl font-black mb-2 tracking-tight">TerraGain</h1>
      <p className="text-lg text-zinc-400 mb-12 max-w-[280px]">
        L&apos;IA qui dit quoi planter pour gagner plus.
      </p>

      <button
        onClick={() => setView("location")}
        className="w-full max-w-[300px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-[0_0_20px_rgba(5,150,105,0.4)] transition-all active:scale-95"
      >
        {t("btn_start")}
      </button>

      {state.myCrops?.length > 0 && (
        <button
          onClick={() => setView("dashboard")}
          className="absolute top-6 right-6 w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center transition-all active:scale-95 border border-indigo-500/50"
        >
          <LayoutDashboard size={20} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 items-center justify-center text-[8px] font-bold text-zinc-950">
              {state.myCrops.length}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
