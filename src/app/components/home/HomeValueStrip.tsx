import { BadgeCheck, BrainCircuit, Building2, ChartNoAxesCombined } from "lucide-react";

const highlights = [
  {
    icon: BrainCircuit,
    title: "AI Career Mapping",
    description: "Interest + skill based pathways tailored for every student profile.",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-200",
    borderHover: "hover:border-violet-300",
    topBar: "bg-violet-500",
  },
  {
    icon: Building2,
    title: "College Intelligence",
    description: "Compare colleges, fees, placements and admission readiness instantly.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-200",
    borderHover: "hover:border-blue-300",
    topBar: "bg-blue-500",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Progress Tracking",
    description: "Track assessments, counseling sessions and academic growth with clarity.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200",
    borderHover: "hover:border-emerald-300",
    topBar: "bg-emerald-500",
  },
  {
    icon: BadgeCheck,
    title: "Expert Counseling",
    description: "Structured mentor support to convert decisions into real outcomes.",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200",
    borderHover: "hover:border-amber-300",
    topBar: "bg-amber-500",
  },
];

export default function HomeValueStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-8 relative z-20">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`group relative rounded-2xl border border-slate-200 ${item.borderHover} bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              {/* colored top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${item.topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div
                className={`w-11 h-11 rounded-xl ${item.iconBg} border ${item.iconBorder} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.8} />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900 group-hover:text-slate-800 transition-colors">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
