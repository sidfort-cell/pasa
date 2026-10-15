import { useApp } from '../App';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Video,
  Mic,
  LayoutTemplate,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'avatars', icon: Users, label: 'Avatar Studio' },
  { id: 'editor', icon: Video, label: 'Video Editor' },
  { id: 'voices', icon: Mic, label: 'Voice Studio' },
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, setIsLoggedIn } = useApp();

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-64 bg-surface-light border-r border-border flex flex-col z-40"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gradient text-lg">VidGenius AI</h1>
            <p className="text-xs text-text-secondary">Video Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-text-secondary hover:text-white hover:bg-surface-lighter'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 rounded-full bg-primary"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-border space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-white hover:bg-surface-lighter transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-white hover:bg-surface-lighter transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Help & Support</span>
        </button>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setCurrentPage('landing');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User</p>
            <p className="text-xs text-text-secondary">Pro Plan</p>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
            PRO
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
