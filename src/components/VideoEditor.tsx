import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Type,
  Image,
  Music,
  Layers,
  Download,
  Wand2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

const scriptSuggestions = [
  "Welcome to our product demo. Today I'll show you how our platform can revolutionize your workflow.",
  "In this tutorial, we'll explore the key features that make our solution stand out from the competition.",
  "Hello! I'm excited to share some amazing news with you today. Let's dive right in.",
];

const backgrounds = [
  { id: 1, name: 'Office', color: 'from-gray-700 to-gray-900', emoji: '🏢' },
  { id: 2, name: 'Studio', color: 'from-blue-900 to-indigo-900', emoji: '🎬' },
  { id: 3, name: 'Nature', color: 'from-green-800 to-emerald-900', emoji: '🌿' },
  { id: 4, name: 'Abstract', color: 'from-purple-900 to-pink-900', emoji: '✨' },
  { id: 5, name: 'Minimal', color: 'from-slate-800 to-slate-900', emoji: '⬜' },
  { id: 6, name: 'City', color: 'from-amber-900 to-orange-900', emoji: '🏙️' },
];

export default function VideoEditor() {
  const [script, setScript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(45);
  const [selectedBg, setSelectedBg] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState('Sarah - Natural');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'script' | 'background' | 'elements' | 'audio'>('script');
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handleGenerate = () => {
    if (!script.trim()) return;
    setIsGenerating(true);
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-surface-light">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-surface-lighter rounded-lg transition-colors">
            <Undo className="w-4 h-4 text-text-secondary" />
          </button>
          <button className="p-2 hover:bg-surface-lighter rounded-lg transition-colors">
            <Redo className="w-4 h-4 text-text-secondary" />
          </button>
          <div className="w-px h-6 bg-border" />
          <span className="text-sm font-medium">Untitled Project</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-white hover:bg-surface-lighter rounded-lg transition-colors">
            <Clock className="w-4 h-4" />
            <span>Auto-saved</span>
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !script.trim()}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating... {generationProgress}%
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Video
              </>
            )}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg text-sm font-medium hover:bg-surface-lighter transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Tools */}
        <div className="w-16 border-r border-border bg-surface-light flex flex-col items-center py-4 gap-2">
          {[
            { id: 'script', icon: Type, label: 'Script' },
            { id: 'background', icon: Image, label: 'Background' },
            { id: 'elements', icon: Layers, label: 'Elements' },
            { id: 'audio', icon: Music, label: 'Audio' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id as typeof activeTab)}
              className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                activeTab === tool.id
                  ? 'bg-primary/20 text-primary'
                  : 'text-text-secondary hover:text-white hover:bg-surface-lighter'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
              <span className="text-[9px]">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Left Sidebar - Panel Content */}
        <div className="w-72 border-r border-border bg-surface-light overflow-y-auto">
          {activeTab === 'script' && (
            <div className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Type className="w-4 h-4" /> Script Editor
              </h3>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Type or paste your script here..."
                className="w-full h-40 px-3 py-2 bg-surface border border-border rounded-lg text-white text-sm placeholder-text-secondary focus:outline-none focus:border-primary resize-none"
              />
              <div className="mt-3">
                <p className="text-xs text-text-secondary mb-2">AI Suggestions:</p>
                {scriptSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setScript(suggestion)}
                    className="w-full text-left p-2 rounded-lg text-xs text-text-secondary hover:text-white hover:bg-surface-lighter transition-colors mb-1"
                  >
                    {suggestion.substring(0, 60)}...
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Voice</label>
                <div className="relative">
                  <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-white text-sm appearance-none focus:outline-none focus:border-primary"
                  >
                    <option>Sarah - Natural</option>
                    <option>James - Corporate</option>
                    <option>Emma - Energetic</option>
                    <option>Alex - Calm</option>
                    <option>Mia - Friendly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Speaking Speed</label>
                <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'background' && (
            <div className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-4 h-4" /> Backgrounds
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBg(bg.id)}
                    className={`aspect-video rounded-lg bg-gradient-to-br ${bg.color} flex items-center justify-center text-2xl border-2 transition-all ${
                      selectedBg === bg.id ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    {bg.emoji}
                  </button>
                ))}
              </div>
              <p className="text-xs text-text-secondary mt-3 text-center">{backgrounds.find(b => b.id === selectedBg)?.name}</p>
              <div className="mt-4">
                <button className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-secondary hover:text-white hover:border-primary/50 transition-colors">
                  Upload Custom Background
                </button>
              </div>
            </div>
          )}

          {activeTab === 'elements' && (
            <div className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Elements
              </h3>
              <div className="space-y-2">
                {['Text Overlay', 'Lower Third', 'Logo', 'Shape', 'Arrow', 'Counter'].map((el) => (
                  <button
                    key={el}
                    className="w-full px-3 py-3 bg-surface rounded-lg text-sm text-left hover:bg-surface-lighter transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    {el}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Music className="w-4 h-4" /> Audio
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Background Music</label>
                  {['Corporate Upbeat', 'Calm Ambient', 'Energetic Pop', 'Cinematic'].map((track) => (
                    <button
                      key={track}
                      className="w-full px-3 py-2 bg-surface rounded-lg text-sm text-left hover:bg-surface-lighter transition-colors mb-1 flex items-center justify-between"
                    >
                      <span>{track}</span>
                      <Play className="w-3 h-3 text-text-secondary" />
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Volume</label>
                  <input type="range" min="0" max="100" defaultValue="30" className="w-full accent-primary" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center - Preview */}
        <div className="flex-1 flex flex-col bg-surface">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl">
              {/* Video Preview */}
              <div className={`absolute inset-0 bg-gradient-to-br ${backgrounds.find(b => b.id === selectedBg)?.color || 'from-gray-800 to-gray-900'}`}>
                {/* Avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={isPlaying ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-6xl md:text-8xl mb-4">
                      👩‍💼
                    </div>
                    {isPlaying && (
                      <div className="flex items-center gap-1 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [8, 24, 8] }}
                            transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity }}
                            className="w-1.5 bg-accent rounded-full"
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Script overlay */}
                {script && (
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-sm text-white/90">{script.substring(0, 100)}{script.length > 100 ? '...' : ''}</p>
                    </div>
                  </div>
                )}

                {/* Generation overlay */}
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-white font-medium">Generating your video...</p>
                      <p className="text-text-secondary text-sm mt-1">{generationProgress}% complete</p>
                      <div className="w-48 h-2 bg-surface rounded-full mt-3 mx-auto overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-border bg-surface-light p-4">
            {/* Controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentTime(0)} className="p-2 hover:bg-surface-lighter rounded-lg transition-colors">
                  <SkipBack className="w-4 h-4 text-text-secondary" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </button>
                <button className="p-2 hover:bg-surface-lighter rounded-lg transition-colors">
                  <SkipForward className="w-4 h-4 text-text-secondary" />
                </button>
                <span className="text-sm text-text-secondary ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-2 hover:bg-surface-lighter rounded-lg">
                  <ZoomOut className="w-4 h-4 text-text-secondary" />
                </button>
                <span className="text-xs text-text-secondary">{zoom}%</span>
                <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-2 hover:bg-surface-lighter rounded-lg">
                  <ZoomIn className="w-4 h-4 text-text-secondary" />
                </button>
                <button className="p-2 hover:bg-surface-lighter rounded-lg">
                  <Maximize2 className="w-4 h-4 text-text-secondary" />
                </button>
                <div className="flex items-center gap-1 ml-2">
                  <Volume2 className="w-4 h-4 text-text-secondary" />
                  <input type="range" min="0" max="100" defaultValue="80" className="w-20 accent-primary" />
                </div>
              </div>
            </div>

            {/* Timeline Track */}
            <div className="relative h-12 bg-surface rounded-lg overflow-hidden">
              {/* Progress */}
              <div
                className="absolute top-0 left-0 h-full bg-primary/20 border-r-2 border-primary"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              {/* Waveform visualization */}
              <div className="absolute inset-0 flex items-center gap-px px-2">
                {[...Array(80)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent/40 rounded-full"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  />
                ))}
              </div>
              {/* Click to seek */}
              <input
                type="range"
                min="0"
                max={duration * 10}
                value={currentTime * 10}
                onChange={(e) => setCurrentTime(Number(e.target.value) / 10)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
