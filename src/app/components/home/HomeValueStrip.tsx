import { BadgeCheck, BrainCircuit, Building2, ChartNoAxesCombined } from "lucide-react";

const highlights = [
  {
    icon: BrainCircuit,
    title: "AI Career Mapping",
    description: "Interest + skill based pathways tailored for every student profile.",
  },
  {
    icon: Building2,
    title: "College Intelligence",
    description: "Compare colleges, fees, placements and admission readiness instantly.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Progress Tracking",
    description: "Track assessments, counseling sessions and academic growth with clarity.",
  },
  {
    icon: BadgeCheck,
    title: "Expert Counseling",
    description: "Structured mentor support to convert decisions into real outcomes.",
  },
];

export default function HomeValueStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-8 relative z-20">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
