import { useApp } from '../App';
import { motion } from 'framer-motion';
import {
  Plus,
  Play,
  Clock,
  CheckCircle,
  Loader,
  Film,
  TrendingUp,
  Users,
  Video,
  Zap,
} from 'lucide-react';

export default function Dashboard() {
  const { projects, setCurrentPage, setCurrentProject } = useApp();

  const stats = [
    { label: 'Total Videos', value: projects.length.toString(), icon: Video, color: 'from-purple-500 to-pink-500' },
    { label: 'Completed', value: projects.filter(p => p.status === 'completed').length.toString(), icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { label: 'Processing', value: projects.filter(p => p.status === 'processing').length.toString(), icon: Loader, color: 'from-cyan-500 to-blue-500' },
    { label: 'Credits Used', value: '247', icon: Zap, color: 'from-orange-500 to-red-500' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case 'processing':
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
            <Loader className="w-3 h-3 animate-spin" /> Processing
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs">
            <Clock className="w-3 h-3" /> Draft
          </span>
        );
    }
  };

  const handleNewProject = () => {
    setCurrentPage('editor');
  };

  const handleOpenProject = (project: typeof projects[0]) => {
    setCurrentProject(project);
    setCurrentPage('editor');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's your video creation overview.</p>
        </div>
        <button
          onClick={handleNewProject}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          New Video
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setCurrentPage('avatars')}
          className="glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
        >
          <Users className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-1">Create with Avatar</h3>
          <p className="text-text-secondary text-sm">Choose an AI avatar and bring your script to life</p>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setCurrentPage('templates')}
          className="glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
        >
          <Film className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-1">Use a Template</h3>
          <p className="text-text-secondary text-sm">Start from a pre-made template for faster creation</p>
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setCurrentPage('voices')}
          className="glass-card rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
        >
          <TrendingUp className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold mb-1">Clone a Voice</h3>
          <p className="text-text-secondary text-sm">Create a custom AI voice from a short audio sample</p>
        </motion.button>
      </div>

      {/* Projects List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <span className="text-text-secondary text-sm">{projects.length} projects</span>
        </div>
        <div className="divide-y divide-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleOpenProject(project)}
              className="p-5 flex items-center gap-4 hover:bg-surface-lighter cursor-pointer transition-colors"
            >
              <div className="w-16 h-10 rounded-lg bg-surface-lighter flex items-center justify-center overflow-hidden">
                <Play className="w-5 h-5 text-text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{project.name}</h3>
                <p className="text-text-secondary text-sm truncate">{project.avatar} • {project.voice}</p>
              </div>
              {getStatusBadge(project.status)}
              <span className="text-text-secondary text-sm hidden md:block">{project.createdAt}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
