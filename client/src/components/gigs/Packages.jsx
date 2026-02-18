import React from "react";

const Packages = ({ gig, selected, setSelected }) => {
  const base = Number(gig.price || 0);
  const packages = [
    { id: 'basic', title: 'Basic', price: base, delivery: '3 days', desc: 'Quick start' },
    { id: 'standard', title: 'Standard', price: Math.round(base * 1.5), delivery: '5 days', desc: 'Most popular' },
    { id: 'premium', title: 'Premium', price: Math.round(base * 2), delivery: '7 days', desc: 'Full package' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
      {packages.map(p => (
        <div key={p.id} role="button" tabIndex={0}
          onClick={() => setSelected(p.id)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(p.id)}
          className={`p-4 rounded-lg border cursor-pointer ${selected === p.id ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white'}`}>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-slate-800">{p.title}</div>
            <div className="text-primary font-bold">${p.price}</div>
          </div>
          <div className="text-sm text-gray-500 mt-2">{p.desc}</div>
          <div className="text-xs text-gray-400 mt-1">Delivery: {p.delivery}</div>
        </div>
      ))}
    </div>
  );
}

export default Packages;
