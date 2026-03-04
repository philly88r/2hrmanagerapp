import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { EnergyAudit } from './components/tools/EnergyAudit';
import { PromptArchitect } from './components/tools/PromptArchitect';
import { VibeCheck } from './components/tools/VibeCheck';
import { Troubleshooter } from './components/tools/Troubleshooter';

function App() {
  const [activeTab, setActiveTab] = useState('audit');
  const [architectGoal, setArchitectGoal] = useState('');

  const handleSendToArchitect = (taskTitle) => {
    setArchitectGoal(`Automate or eliminate this task: ${taskTitle}`);
    setActiveTab('architect');
  };

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 right-0 h-full overflow-y-auto w-full">
        <div className="w-full max-w-7xl px-8 py-10 pb-24 lg:pb-10">

          {/* Mobile Header (Hidden on md) */}
          <div className="md:hidden flex flex-col mb-8">
            <h1 className="text-2xl font-bold tracking-wide text-zinc-100">
              Orchestrator's
              <span className="block text-indigo-400 text-sm font-normal uppercase tracking-widest mt-1">Toolkit</span>
            </h1>
            <div className="flex flex-wrap gap-2 mt-4 mt-8 pb-4 border-b border-zinc-800">
              <button onClick={() => setActiveTab('audit')} className={`text-sm px-3 py-1 rounded-full border ${activeTab === 'audit' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-zinc-400 border-zinc-800'}`}>Audit</button>
              <button onClick={() => setActiveTab('architect')} className={`text-sm px-3 py-1 rounded-full border ${activeTab === 'architect' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-zinc-400 border-zinc-800'}`}>Architect</button>
              <button onClick={() => setActiveTab('vibe')} className={`text-sm px-3 py-1 rounded-full border ${activeTab === 'vibe' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-zinc-400 border-zinc-800'}`}>Vibe Check</button>
              <button onClick={() => setActiveTab('troubleshoot')} className={`text-sm px-3 py-1 rounded-full border ${activeTab === 'troubleshoot' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'text-zinc-400 border-zinc-800'}`}>Troubleshooter</button>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'audit' && <EnergyAudit onSendToArchitect={handleSendToArchitect} />}
            {activeTab === 'architect' && <PromptArchitect initialGoal={architectGoal} />}
            {activeTab === 'vibe' && <VibeCheck />}
            {activeTab === 'troubleshoot' && <Troubleshooter />}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
