import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Play,
  Pause,
  Square,
  Upload,
  Volume2,
  Globe,
  Sliders,
  Check,
  Sparkles,
} from 'lucide-react';

const voices = [
  { id: 1, name: 'Sarah', accent: 'American', gender: 'Female', style: 'Natural', languages: 29, popular: true, emoji: '👩' },
  { id: 2, name: 'James', accent: 'British', gender: 'Male', style: 'Corporate', languages: 24, popular: true, emoji: '👨' },
  { id: 3, name: 'Emma', accent: 'Australian', gender: 'Female', style: 'Energetic', languages: 31, popular: false, emoji: '👩‍🦰' },
  { id: 4, name: 'Alex', accent: 'American', gender: 'Male', style: 'Calm', languages: 22, popular: false, emoji: '🧑' },
  { id: 5, name: 'Mia', accent: 'Canadian', gender: 'Female', style: 'Friendly', languages: 27, popular: true, emoji: '👧' },
  { id: 6, name: 'Carlos', accent: 'Spanish', gender: 'Male', style: 'Warm', languages: 18, popular: false, emoji: '👨‍🦱' },
  { id: 7, name: 'Yuki', accent: 'Japanese', gender: 'Female', style: 'Gentle', languages: 15, popular: false, emoji: '👩‍🦳' },
  { id: 8, name: 'Hans', accent: 'German', gender: 'Male', style: 'Authoritative', languages: 20, popular: false, emoji: '🧔' },
  { id: 9, name: 'Priya', accent: 'Indian', gender: 'Female', style: 'Professional', languages: 23, popular: true, emoji: '👩‍💼' },
  { id: 10, name: 'Lucas', accent: 'French', gender: 'Male', style: 'Smooth', languages: 26, popular: false, emoji: '👱‍♂️' },
];

const clonedVoices = [
  { id: 'c1', name: 'My Voice Clone', samples: 3, status: 'ready', created: '2024-01-10' },
  { id: 'c2', name: 'Brand Voice', samples: 5, status: 'ready', created: '2024-01-12' },
  { id: 'c3', name: 'Narrator Voice', samples: 2, status: 'processing', created: '2024-01-18' },
];

export default function VoiceStudio() {
  const [activeTab, setActiveTab] = useState<'library' | 'clone' | 'settings'>('library');
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [sampleText, setSampleText] = useState('Hello! This is a sample of my voice. I want to create a digital clone that sounds just like me.');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePlayVoice = (id: number) => {
    if (playingVoice === id) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(id);
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Voice Studio</h1>
          <p className="text-text-secondary mt-1">Choose from 50+ AI voices or clone your own</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {[
          { id: 'library', label: 'Voice Library', icon: Volume2 },
          { id: 'clone', label: 'Voice Cloning', icon: Mic },
          { id: 'settings', label: 'Voice Settings', icon: Sliders },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-surface-light text-text-secondary hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Voice Library Tab */}
      {activeTab === 'library' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voices.map((voice, i) => (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedVoice(voice.id)}
                className={`glass-card rounded-2xl p-5 cursor-pointer transition-all hover:border-primary/50 ${
                  selectedVoice === voice.id ? 'border-primary ring-2 ring-primary/30' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-surface-lighter flex items-center justify-center text-2xl">
                      {voice.emoji}
                    </div>
                    <div>
                      <h3 className="font-semibold">{voice.name}</h3>
                      <p className="text-text-secondary text-sm">{voice.accent} • {voice.style}</p>
                    </div>
                  </div>
                  {voice.popular && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Popular
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-text-secondary" />
                  <span className="text-xs text-text-secondary">{voice.languages} languages</span>
                </div>

                {/* Waveform */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlayVoice(voice.id); }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      playingVoice === voice.id
                        ? 'bg-primary text-white'
                        : 'bg-surface-lighter text-text-secondary hover:text-white'
                    }`}
                  >
                    {playingVoice === voice.id ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                  </button>
                  <div className="flex-1 flex items-center gap-px h-8">
                    {[...Array(30)].map((_, j) => (
                      <motion.div
                        key={j}
                        className="flex-1 bg-accent/40 rounded-full"
                        animate={playingVoice === voice.id ? {
                          height: ['20%', `${Math.random() * 80 + 20}%`, '20%']
                        } : {}}
                        transition={{ delay: j * 0.02, duration: 0.5, repeat: playingVoice === voice.id ? Infinity : 0 }}
                        style={{ height: `${Math.random() * 60 + 20}%` }}
                      />
                    ))}
                  </div>
                </div>

                {selectedVoice === voice.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-border"
                  >
                    <button className="w-full py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Selected
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Cloning Tab */}
      {activeTab === 'clone' && (
        <div className="max-w-3xl">
          {/* Existing Clones */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">My Cloned Voices</h3>
            <div className="space-y-3">
              {clonedVoices.map((voice) => (
                <div key={voice.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{voice.name}</h4>
                      <p className="text-text-secondary text-sm">{voice.samples} samples • Created {voice.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {voice.status === 'processing' ? (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                        <div className="w-3 h-3 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                        Processing
                      </span>
                    ) : (
                      <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                        <Check className="w-3 h-3" /> Ready
                      </button>
                    )}
                    <button className="p-2 hover:bg-surface-lighter rounded-lg transition-colors">
                      <Play className="w-4 h-4 text-text-secondary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Clone */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Create New Voice Clone</h3>
            <p className="text-text-secondary text-sm mb-6">
              Upload at least 2 minutes of clear audio to create a high-quality voice clone.
            </p>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center mb-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-text-secondary mx-auto mb-3" />
              <p className="font-medium mb-1">Upload audio samples</p>
              <p className="text-text-secondary text-sm">MP3, WAV, or M4A • Min 2 minutes total</p>
              <button className="mt-3 px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
                Browse Files
              </button>
            </div>

            {/* Or Record */}
            <div className="text-center mb-6">
              <span className="text-text-secondary text-sm">— or record directly —</span>
            </div>

            {/* Recording Interface */}
            <div className="bg-surface rounded-xl p-6 text-center">
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block text-left">Read this text:</label>
                <textarea
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-white text-sm placeholder-text-secondary focus:outline-none focus:border-primary resize-none h-20"
                />
              </div>

              <div className="flex items-center justify-center gap-6 mt-4">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                  >
                    <Mic className="w-7 h-7 text-white" />
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors animate-pulse"
                  >
                    <Square className="w-7 h-7 text-white" />
                  </button>
                )}
                <div>
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-red-400 font-mono text-lg">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
                    </motion.div>
                  )}
                  {isRecording && (
                    <div className="flex items-center gap-1 justify-center mt-2">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [4, Math.random() * 30 + 10, 4] }}
                          transition={{ delay: i * 0.05, duration: 0.4, repeat: Infinity }}
                          className="w-1 bg-red-400 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
              Create Voice Clone
            </button>
          </div>
        </div>
      )}

      {/* Voice Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Voice Configuration</h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Pitch</label>
                <input type="range" min="-10" max="10" defaultValue="0" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Lower</span>
                  <span>Normal</span>
                  <span>Higher</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Speed</label>
                <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>0.5x</span>
                  <span>1.0x</span>
                  <span>2.0x</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Stability</label>
                <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Variable</span>
                  <span>Stable</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Clarity + Similarity Enhancement</label>
                <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Style Exaggeration</label>
                <input type="range" min="0" max="100" defaultValue="30" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>Subtle</span>
                  <span>Expressive</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
