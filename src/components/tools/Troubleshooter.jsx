import { useState } from 'react';
import { AlertTriangle, MapPin, Terminal, Wrench } from 'lucide-react';

export function Troubleshooter() {
    const [code, setCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isFixing, setIsFixing] = useState(false);
    const [fix, setFix] = useState(null);

    const handleFix = () => {
        if (!code.trim() && !errorMsg.trim()) return;
        setIsFixing(true);
        setFix(null);

        // Mock API Call to LLM Backend
        setTimeout(() => {
            setIsFixing(false);
            setFix({
                line: 'Line 24',
                explanation: 'You tried to log a variable called `userData`, but it does not exist in the current scope. JavaScript threw a ReferenceError because it could not find that word anywhere.',
                codeSnippet: `// Replace this:
// console.log(userData.name);

// With this:
const userData = await response.json();
console.log(userData.name);`,
                nextStep: 'Copy the fixed code and replace the block pushing the error. Reload the Cloudflare Worker, and watch the console to see the JSON print correctly.'
            });
        }, 2000);
    };

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-serif text-zinc-100 mb-2">The Builder's Safety Net</h2>
                <p className="text-zinc-400">Paste your broken code and error message. The Senior Dev will find the exact fix.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                            <Terminal size={16} />
                            1. Broken Code
                        </h3>
                        <textarea
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-amber-500/80 focus:border-amber-500 h-64 resize-none"
                            placeholder="Paste your HTML, JS, or Worker code here..."
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col items-start shadow-xl">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-500 mb-3 flex items-center gap-2">
                            <AlertTriangle size={16} />
                            2. Error Message
                        </h3>
                        <textarea
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 font-mono text-xs text-rose-400 focus:border-rose-500 h-32 resize-none"
                            placeholder="Paste the red error text from your terminal or browser console..."
                            value={errorMsg}
                            onChange={e => setErrorMsg(e.target.value)}
                        />
                        <button
                            onClick={handleFix}
                            disabled={isFixing || (!code.trim() && !errorMsg.trim())}
                            className="mt-6 w-full flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
                        >
                            <Wrench size={18} />
                            {isFixing ? 'Diagnosing...' : 'Find The Fix'}
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-950/80 border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.05)] rounded-xl p-6 relative min-h-[500px] flex flex-col">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">
                            Senior Dev
                        </div>
                    </div>

                    <h3 className="text-xl font-serif text-zinc-100 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-sans text-sm font-bold shadow-lg shadow-indigo-500/30">
                            SD
                        </span>
                        Diagnosis & Fix
                    </h3>

                    {!fix && !isFixing && (
                        <div className="m-auto text-zinc-600 text-sm text-center max-w-xs">
                            Waiting for input. I will explain exactly what broke, why it broke, and how to fix it in plain English.
                        </div>
                    )}

                    {isFixing && (
                        <div className="m-auto flex flex-col items-center justify-center gap-4 text-amber-500">
                            <div className="w-12 h-12 border-4 border-amber-500/20 border-r-amber-500 rounded-full animate-spin"></div>
                            <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Running Stack Trace</p>
                        </div>
                    )}

                    {fix && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex gap-4">
                                <MapPin className="text-zinc-500 mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Where it broke</h4>
                                    <p className="text-zinc-400 font-mono text-sm bg-zinc-900 border border-zinc-800 rounded px-2 py-1 inline-block mt-1">{fix.line}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <AlertTriangle className="text-rose-400 mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-rose-300">What went wrong</h4>
                                    <p className="text-zinc-300 leading-relaxed mt-1">{fix.explanation}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Terminal className="text-emerald-400 mt-1 flex-shrink-0" size={20} />
                                <div className="w-full">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-300 mb-2">The Exact Fix</h4>
                                    <pre className="bg-zinc-900 border border-emerald-500/20 rounded-lg p-4 font-mono text-sm text-emerald-100 overflow-x-auto">
                                        <code>{fix.codeSnippet}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-5 mt-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Next Step</h4>
                                <p className="text-zinc-100">{fix.nextStep}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
