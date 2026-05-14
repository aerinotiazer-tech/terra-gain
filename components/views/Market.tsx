import { useAppStore } from "@/components/StoreProvider";
import { CROPS, getMarketPrice } from "@/lib/data";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  BellRing,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";

export function Market() {
  const { t, state, setView } = useAppStore();
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);

  const code =
    state.selectedCountryId === "6"
      ? "KES"
      : state.selectedCountryId === "7"
        ? "NGN"
        : "CFA";

  const marketData = useMemo(() => {
    return CROPS.map((c) => ({
      crop: c,
      ...getMarketPrice(c.id, code),
    }));
  }, [code]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 px-4 pt-12 pb-[100px] max-w-md mx-auto text-zinc-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setView("recommendations")}
          className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={() => setView("dashboard")}
          className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-indigo-400"
        >
          <BellRing size={16} />
        </button>
      </div>

      <div className="mb-6 px-2">
        <h2 className="text-3xl font-black tracking-tight">
          {t("tab_market") || "Marché"}
        </h2>
        <div className="flex items-center gap-2 mt-2 text-xs font-medium text-emerald-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          </span>
          Live Update (Derniers 30 jours)
        </div>
      </div>

      <div className="mb-6 bg-indigo-900/40 border border-indigo-500/50 rounded-2xl p-4 flex gap-3 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <ArrowUpRight size={64} className="text-indigo-400" />
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
          <ArrowUpRight size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            Alerte Opportunité
          </p>
          <p className="text-sm font-semibold text-indigo-100 mt-1 leading-tight">
            Forte demande estimée pour les prochaines semaines. Rentabilité
            +15%.
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {marketData.map((data, i) => (
          <div
            key={data.crop.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col group cursor-pointer"
            onClick={() =>
              setSelectedCropId(
                selectedCropId === data.crop.id ? null : data.crop.id,
              )
            }
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">
                  {state.language === "en"
                    ? data.crop.nom_en
                    : data.crop.nom_fr}
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  {data.devise}/kg
                </p>
              </div>
              <div className="text-right">
                <div className="font-bold font-mono text-lg">{data.price}</div>
                <div
                  className={`flex items-center justify-end gap-1 text-[10px] font-bold uppercase tracking-widest mt-1 ${
                    data.trend === "up"
                      ? "text-emerald-400"
                      : data.trend === "down"
                        ? "text-red-400"
                        : "text-zinc-500"
                  }`}
                >
                  {data.trend === "up" && <ArrowUpRight size={12} />}
                  {data.trend === "down" && <ArrowDownRight size={12} />}
                  {data.trend === "stable" && <Minus size={12} />}
                  {data.diff_percent}%
                </div>
              </div>
            </div>

            {selectedCropId === data.crop.id && data.history && (
              <div className="h-32 mt-4 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.history}>
                    <XAxis dataKey="day" hide />
                    <YAxis domain={["dataMin - 10", "dataMax + 10"]} hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: "12px",
                      }}
                      itemStyle={{ color: "#818cf8", fontWeight: "bold" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#818cf8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
