import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import {
  Search,
  Play,
  Clock,
  Star,
  Filter,
  ChevronDown,
  Eye,
  Copy,
  Sparkles,
} from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'Product Demo',
    category: 'Marketing',
    duration: '2:00',
    rating: 4.9,
    uses: 12400,
    gradient: 'from-purple-600 to-pink-600',
    emoji: '📱',
    description: 'Professional product showcase with features highlight',
  },
  {
    id: 2,
    name: 'Training Video',
    category: 'Education',
    duration: '5:00',
    rating: 4.8,
    uses: 8900,
    gradient: 'from-blue-600 to-cyan-600',
    emoji: '📚',
    description: 'Step-by-step training module with clear explanations',
  },
  {
    id: 3,
    name: 'Social Media Ad',
    category: 'Marketing',
    duration: '0:30',
    rating: 4.9,
    uses: 23100,
    gradient: 'from-orange-600 to-red-600',
    emoji: '📣',
    description: 'Short-form vertical video for social platforms',
  },
  {
    id: 4,
    name: 'Company Update',
    category: 'Corporate',
    duration: '3:00',
    rating: 4.7,
    uses: 6700,
    gradient: 'from-green-600 to-emerald-600',
    emoji: '🏢',
    description: 'Internal communication and company news',
  },
  {
    id: 5,
    name: 'Tutorial',
    category: 'Education',
    duration: '4:00',
    rating: 4.8,
    uses: 15200,
    gradient: 'from-indigo-600 to-violet-600',
    emoji: '🎓',
    description: 'How-to guide with screen recording style',
  },
  {
    id: 6,
    name: 'Sales Pitch',
    category: 'Business',
    duration: '1:30',
    rating: 4.9,
    uses: 19800,
    gradient: 'from-amber-600 to-yellow-600',
    emoji: '💼',
    description: 'Persuasive sales presentation template',
  },
  {
    id: 7,
    name: 'News Report',
    category: 'Media',
    duration: '2:30',
    rating: 4.6,
    uses: 5400,
    gradient: 'from-slate-600 to-gray-700',
    emoji: '📰',
    description: 'Professional news-style broadcast format',
  },
  {
    id: 8,
    name: 'Testimonial',
    category: 'Marketing',
    duration: '1:00',
    rating: 4.8,
    uses: 11300,
    gradient: 'from-rose-600 to-pink-600',
    emoji: '💬',
    description: 'Customer review and testimonial showcase',
  },
  {
    id: 9,
    name: 'Onboarding',
    category: 'HR',
    duration: '6:00',
    rating: 4.7,
    uses: 7800,
    gradient: 'from-teal-600 to-cyan-600',
    emoji: '🤝',
    description: 'New employee onboarding and orientation',
  },
  {
    id: 10,
    name: 'Explainer Video',
    category: 'Marketing',
    duration: '2:00',
    rating: 4.9,
    uses: 28500,
    gradient: 'from-fuchsia-600 to-purple-600',
    emoji: '💡',
    description: 'Clear and engaging concept explanation',
  },
  {
    id: 11,
    name: 'Real Estate Tour',
    category: 'Real Estate',
    duration: '3:00',
    rating: 4.7,
    uses: 4200,
    gradient: 'from-emerald-600 to-green-600',
    emoji: '🏠',
    description: 'Property walkthrough and virtual tour',
  },
  {
    id: 12,
    name: 'Recipe Video',
    category: 'Lifestyle',
    duration: '2:30',
    rating: 4.8,
    uses: 9600,
    gradient: 'from-orange-500 to-amber-600',
    emoji: '🍳',
    description: 'Cooking tutorial with step-by-step instructions',
  },
];

const categories = ['All', 'Marketing', 'Education', 'Corporate', 'Business', 'Media', 'HR', 'Real Estate', 'Lifestyle'];

export default function Templates() {
  const { setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<number | null>(null);

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = () => {
    setCurrentPage('editor');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Template Gallery</h1>
          <p className="text-text-secondary mt-1">Start from a professional template and customize it to your needs</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-light border border-border rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 glass-card rounded-xl text-text-secondary hover:text-white transition-colors">
          <Filter className="w-5 h-5" />
          <span>Sort by Popular</span>
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

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredTemplates.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all"
          >
            {/* Preview */}
            <div className={`relative aspect-video bg-gradient-to-br ${template.gradient} flex items-center justify-center`}>
              <span className="text-5xl">{template.emoji}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setPreviewTemplate(template.id)}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Eye className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/40 text-white text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {template.duration}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{template.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-surface text-xs text-text-secondary">{template.category}</span>
              </div>
              <p className="text-text-secondary text-sm mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-text-secondary">{template.rating}</span>
                  <span className="text-xs text-text-secondary ml-2">• {(template.uses / 1000).toFixed(1)}k uses</span>
                </div>
                <button
                  onClick={handleUseTemplate}
                  className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-xs font-medium hover:bg-primary/30 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewTemplate(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl max-w-2xl w-full overflow-hidden"
          >
            {(() => {
              const template = templates.find(t => t.id === previewTemplate);
              if (!template) return null;
              return (
                <>
                  <div className={`aspect-video bg-gradient-to-br ${template.gradient} flex items-center justify-center relative`}>
                    <span className="text-8xl">{template.emoji}</span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4 text-white" />
                          <div className="flex-1 h-1 bg-white/20 rounded-full">
                            <div className="h-full w-1/3 bg-white rounded-full" />
                          </div>
                          <span className="text-white text-xs">0:42 / {template.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-bold">{template.name}</h2>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{template.rating}</span>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-4">{template.description}</p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {template.duration}</span>
                      <span>{template.category}</span>
                      <span>{(template.uses / 1000).toFixed(1)}k uses</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setPreviewTemplate(null)}
                        className="flex-1 px-4 py-3 glass-card rounded-xl text-text-secondary hover:text-white transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleUseTemplate}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Use This Template
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
