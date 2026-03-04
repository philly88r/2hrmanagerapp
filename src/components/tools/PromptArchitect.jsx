import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function PromptArchitect({ initialGoal = '' }) {
    const [formData, setFormData] = useState({
        goal: initialGoal,
        user: '',
        input: '',
        output: '',
        tone: 'Direct/Professional',
        forbidden: ''
    });

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (initialGoal) {
            setFormData(prev => ({ ...prev, goal: initialGoal }));
        }
    }, [initialGoal]);

    const handleCopy = () => {
        const prompt = `You are an expert, highly focused AI tool.
YOUR GOAL: ${formData.goal}
TARGET USER: ${formData.user}

WHEN GIVEN: ${formData.input}
YOU MUST RETURN: ${formData.output}

TONE & STYLE:
Adopt a ${formData.tone} tone. Ensure all outputs match this voice perfectly.

CRITICAL RULES (NEVER VIOLATE):
${formData.forbidden.split('\n').filter(Boolean).map(r => '- ' + r).join('\n')}`;

        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tones = ['Direct/Professional', 'Warm/Empathetic', 'Analytical', 'Punchy'];

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-serif text-zinc-100 mb-2">The Prompt Architect</h2>
                <p className="text-zinc-400">Eradicate blank-page syndrome. Build perfectly formatted System Instructions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">The Goal</label>
                        <textarea
                            rows="3"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:border-indigo-500"
                            placeholder="What exactly is this AI tool supposed to do?"
                            value={formData.goal}
                            onChange={e => setFormData({ ...formData, goal: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">The User</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:border-indigo-500"
                            placeholder="Who will use this? (e.g., A busy project manager)"
                            value={formData.user}
                            onChange={e => setFormData({ ...formData, user: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">The Input</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:border-indigo-500"
                            placeholder="What data will they give the AI? (e.g., a messy CSV)"
                            value={formData.input}
                            onChange={e => setFormData({ ...formData, input: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">The Output</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:border-indigo-500"
                            placeholder="What should the AI give back? (e.g., JSON, polite reply)"
                            value={formData.output}
                            onChange={e => setFormData({ ...formData, output: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">The Tone</label>
                        <div className="flex flex-wrap gap-2">
                            {tones.map(tone => (
                                <button
                                    key={tone}
                                    onClick={() => setFormData({ ...formData, tone })}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${formData.tone === tone
                                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                                            : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Forbidden Actions</label>
                        <textarea
                            rows="3"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:border-indigo-500"
                            placeholder="What should this AI NEVER do? (e.g., Never hallucinate advice)"
                            value={formData.forbidden}
                            onChange={e => setFormData({ ...formData, forbidden: e.target.value })}
                        />
                    </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col h-full relative group">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-zinc-200 uppercase tracking-widest text-xs">Compiled System Instruction</h3>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded transition-colors text-xs font-bold uppercase tracking-wider ${copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-transparent'
                                }`}
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
                        </button>
                    </div>

                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap overflow-y-auto">
                        {`You are an expert, highly focused AI tool.
YOUR GOAL: ${formData.goal || '[The Goal]'}
TARGET USER: ${formData.user || '[The User]'}

WHEN GIVEN: ${formData.input || '[The Input]'}
YOU MUST RETURN: ${formData.output || '[The Output]'}

TONE & STYLE:
Adopt a ${formData.tone} tone. Ensure all outputs match this voice perfectly.

CRITICAL RULES (NEVER VIOLATE):
${formData.forbidden ? formData.forbidden.split('\\n').filter(Boolean).map(r => '- ' + r).join('\\n') : '- [Forbidden Actions]'}`}
                    </div>
                </div>
            </div>
        </div>
    );
}
