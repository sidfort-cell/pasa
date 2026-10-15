import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, Star, Filter, ChevronDown, Play } from 'lucide-react';

const avatars = [
  { id: 1, name: 'Sarah', category: 'Professional', gender: 'Female', emoji: '👩‍💼', style: 'Business', rating: 4.9, languages: 29 },
  { id: 2, name: 'James', category: 'Corporate', gender: 'Male', emoji: '👨‍💼', style: 'Executive', rating: 4.8, languages: 24 },
  { id: 3, name: 'Emma', category: 'Casual', gender: 'Female', emoji: '👩‍🎤', style: 'Creative', rating: 4.9, languages: 31 },
  { id: 4, name: 'Alex', category: 'Tech', gender: 'Male', emoji: '👨‍💻', style: 'Modern', rating: 4.7, languages: 22 },
  { id: 5, name: 'Mia', category: 'Education', gender: 'Female', emoji: '👩‍🏫', style: 'Friendly', rating: 4.8, languages: 27 },
  { id: 6, name: 'David', category: 'News', gender: 'Male', emoji: '👨‍💼', style: 'Formal', rating: 4.6, languages: 19 },
  { id: 7, name: 'Sofia', category: 'Lifestyle', gender: 'Female', emoji: '💃', style: 'Energetic', rating: 4.9, languages: 25 },
  { id: 8, name: 'Marcus', category: 'Fitness', gender: 'Male', emoji: '🏋️', style: 'Dynamic', rating: 4.7, languages: 18 },
  { id: 9, name: 'Luna', category: 'Fashion', gender: 'Female', emoji: '👗', style: 'Trendy', rating: 4.8, languages: 21 },
  { id: 10, name: 'Ryan', category: 'Gaming', gender: 'Male', emoji: '🎮', style: 'Casual', rating: 4.6, languages: 16 },
  { id: 11, name: 'Aria', category: 'Medical', gender: 'Female', emoji: '👩‍⚕️', style: 'Professional', rating: 4.9, languages: 23 },
  { id: 12, name: 'Chen', category: 'Tech', gender: 'Male', emoji: '🧑‍💻', style: 'Minimalist', rating: 4.7, languages: 20 },
];

const categories = ['All', 'Professional', 'Corporate', 'Casual', 'Tech', 'Education', 'News', 'Lifestyle', 'Fitness', 'Fashion', 'Gaming', 'Medical'];

export default function AvatarStudio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredAvatars = avatars.filter(a => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Avatar Studio</h1>
          <p className="text-text-secondary mt-1">Choose from 100+ AI avatars or create your own</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Upload className="w-5 h-5" />
          Create Custom Avatar
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search avatars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-light border border-border rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 glass-card rounded-xl text-text-secondary hover:text-white transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface-light text-text-secondary hover:text-white hover:bg-surface-lighter'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Avatar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAvatars.map((avatar, i) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`glass-card rounded-2xl p-5 cursor-pointer transition-all hover:border-primary/50 ${
              selectedAvatar === avatar.id ? 'border-primary ring-2 ring-primary/30' : ''
            }`}
          >
            <div className="relative mb-4">
              <div className="w-full aspect-square rounded-xl bg-surface-lighter flex items-center justify-center text-6xl">
                {avatar.emoji}
              </div>
              <div className="absolute inset-0 rounded-xl bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
              {selectedAvatar === avatar.id && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              )}
            </div>
            <h3 className="font-semibold">{avatar.name}</h3>
            <div className="flex items-center justify-between mt-1">
              <span className="text-text-secondary text-sm">{avatar.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-text-secondary">{avatar.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-surface text-xs text-text-secondary">{avatar.style}</span>
              <span className="px-2 py-0.5 rounded-full bg-surface text-xs text-text-secondary">{avatar.languages} langs</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUploadModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl p-8 max-w-lg w-full"
          >
            <h2 className="text-2xl font-bold mb-2">Create Custom Avatar</h2>
            <p className="text-text-secondary mb-6">Upload a photo or video to create your own AI avatar</p>

            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-6 hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-text-secondary mx-auto mb-3" />
              <p className="font-medium mb-1">Drop your photo or video here</p>
              <p className="text-text-secondary text-sm">PNG, JPG, or MP4 • Max 50MB</p>
              <button className="mt-4 px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/30 transition-colors">
                Browse Files
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Avatar Name</label>
                <input
                  type="text"
                  placeholder="My Custom Avatar"
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea
                  placeholder="Describe your avatar..."
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-primary resize-none h-20"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-3 glass-card rounded-xl text-text-secondary hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium hover:opacity-90 transition-opacity">
                Create Avatar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
