'use client';

const fields = [
  { label: 'Display name',  value: 'Alex Kim',             sub: 'Shown across all apps'          },
  { label: 'Email',         value: 'alex@nexusos.io',      sub: 'Used for notifications'          },
  { label: 'Role',          value: 'QA Engineer',          sub: 'Your position in the workspace'  },
  { label: 'Theme',         value: 'Dark',                 sub: 'Appearance preference'           },
  { label: 'Notifications', value: 'All channels',         sub: 'Pulse notification scope'        },
];

export default function Settings() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-[52px] bg-[#111720] border-b border-[#1E2D42] flex items-center px-5 shrink-0">
        <span className="text-[13px] font-semibold text-[#D4DDE8]">Settings</span>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[520px]">
          <h1 className="text-[18px] font-bold text-[#D4DDE8] tracking-tight mb-5">Account Settings</h1>
          {fields.map(f => (
            <div key={f.label} className="flex items-center justify-between py-3.5 border-b border-[#1E2D42]">
              <div>
                <div className="text-[13px] font-medium text-[#D4DDE8] mb-0.5">{f.label}</div>
                <div className="text-[12px] text-[#4E6580]">{f.value}</div>
              </div>
              <button className="inline-flex items-center px-3 py-1.5 rounded text-[12px] font-medium bg-[#1C2535] text-[#D4DDE8] border border-[#1E2D42] hover:border-[#243448] transition-colors cursor-pointer">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
