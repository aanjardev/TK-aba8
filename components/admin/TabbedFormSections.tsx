"use client";
import { useState } from "react";
type Tab = {
  id: string;
  label: string;
  description?: string;
  content: React.ReactNode;
};
export default function TabbedFormSections({
  tabs,
  initialTab,
  actions,
}: {
  tabs: Tab[];
  initialTab?: string;
  actions?: React.ReactNode;
}) {
  const [active, setActive] = useState(
    tabs.some((tab) => tab.id === initialTab) ? initialTab! : tabs[0]?.id,
  );
  return (
    <div className="space-y-5">
      <div className="sticky top-0 z-20 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:thin]">
          <div className="flex min-w-max gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${active === tab.id ? "bg-emerald-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {tabs.map((tab) => (
        <section
          key={tab.id}
          hidden={active !== tab.id}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">{tab.label}</h2>
            {tab.description && (
              <p className="mt-1 text-sm text-slate-500">{tab.description}</p>
            )}
          </div>
          {tab.content}
        </section>
      ))}
    </div>
  );
}
