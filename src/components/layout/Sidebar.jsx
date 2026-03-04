import { Activity, Beaker, FileText, ShieldAlert } from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab }) {
    const tabs = [
        { id: 'audit', label: 'Energy Audit', icon: Activity },
        { id: 'architect', label: 'Prompt Architect', icon: Beaker },
        { id: 'vibe', label: 'Vibe Check', icon: FileText },
        { id: 'troubleshoot', label: 'Troubleshooter', icon: ShieldAlert },
    ];

    return (
        <div className="w-64 flex-shrink-0 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col pt-8 hidden md:flex">
            <div className="px-6 mb-12">
                <h1 className="text-xl font-bold tracking-wide text-zinc-100">
                    Orchestrator's
                    <span className="block text-indigo-400 text-sm font-normal uppercase tracking-widest mt-1">Toolkit</span>
                </h1>
            </div>
            <nav className="flex flex-col space-y-2 px-4">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 
              ${activeTab === tab.id
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent'}
            `}
                    >
                        <tab.icon size={18} />
                        <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-auto p-6 text-xs text-zinc-600">
                Companion App for <br /> <i>The 2-Hour AI Manager</i>
            </div>
        </div>
    );
}
