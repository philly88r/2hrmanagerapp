import { useState, useEffect } from 'react';
import { ArrowRight, Trash2, Zap } from 'lucide-react';

export function EnergyAudit({ onSendToArchitect }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('orchestrator-audit');
        return saved ? JSON.parse(saved) : [];
    });
    const [inputTitle, setInputTitle] = useState('');
    const [inputScore, setInputScore] = useState(5);

    useEffect(() => {
        localStorage.setItem('orchestrator-audit', JSON.stringify(tasks));
    }, [tasks]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!inputTitle.trim()) return;
        const newTask = {
            id: Date.now().toString(),
            title: inputTitle,
            score: inputScore,
            timestamp: new Date().toLocaleDateString(),
        };
        setTasks([newTask, ...tasks]);
        setInputTitle('');
        setInputScore(5);
    };

    const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

    const soulSuckers = [...tasks]
        .filter(t => t.score >= 7)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    const getColor = (score) => {
        if (score <= 4) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        if (score <= 7) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-serif text-zinc-100 mb-2">The 7-Day Energy Audit</h2>
                <p className="text-zinc-400">Track every task. Identify the 'Soul-Suckers' dragging you down.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 backdrop-blur-md">
                        <h3 className="font-semibold text-zinc-200 mb-4">Log a Task</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">What did you just do?</label>
                                <input
                                    type="text"
                                    value={inputTitle}
                                    onChange={e => setInputTitle(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="e.g., Compiled weekly team report..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2">
                                    Soul-Sucking Level (1 = Energizing, 10 = I reconsidered my career)
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="range"
                                        min="1" max="10"
                                        value={inputScore}
                                        onChange={e => setInputScore(Number(e.target.value))}
                                        className="w-full accent-indigo-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className={`px-3 py-1 rounded w-12 text-center font-bold text-sm border ${getColor(inputScore)}`}>
                                        {inputScore}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition-colors"
                            >
                                Log Task
                            </button>
                        </div>
                    </form>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <h3 className="font-semibold text-zinc-200 mb-4">Your Log</h3>
                        {tasks.length === 0 ? (
                            <p className="text-zinc-500 text-sm">No tasks logged yet. Start auditing your energy!</p>
                        ) : (
                            <div className="space-y-3">
                                {tasks.map(task => (
                                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800/50">
                                        <div>
                                            <span className="font-medium text-zinc-200 block text-sm">{task.title}</span>
                                            <span className="text-xs text-zinc-600">{task.timestamp}</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getColor(task.score)}`}>
                                                {task.score}
                                            </span>
                                            <button onClick={() => removeTask(task.id)} className="text-zinc-600 hover:text-rose-400">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-zinc-900/50 border border-indigo-500/20 rounded-xl p-6 sticky top-8 shadow-[0_0_30px_rgba(99,102,241,0.05)]">
                        <div className="flex items-center space-x-2 mb-4 text-indigo-400">
                            <Zap size={20} className="fill-indigo-500/20" />
                            <h3 className="font-bold uppercase tracking-wider text-sm">Top Targets</h3>
                        </div>
                        {soulSuckers.length === 0 ? (
                            <p className="text-sm text-zinc-500">Log tasks with a score of 7+ to identify your biggest automation opportunities.</p>
                        ) : (
                            <div className="space-y-4">
                                {soulSuckers.map(target => (
                                    <div key={'tgt-' + target.id} className="bg-zinc-950 border border-rose-500/20 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-sm font-medium text-zinc-200">{target.title}</span>
                                            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 rounded">{target.score}/10</span>
                                        </div>
                                        <button
                                            onClick={() => onSendToArchitect(target.title)}
                                            className="w-full flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-indigo-500/50 text-indigo-400 py-2 rounded transition-all"
                                        >
                                            <span>Architect Prompt</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
