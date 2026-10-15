import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import AvatarStudio from './components/AvatarStudio';
import VideoEditor from './components/VideoEditor';
import VoiceStudio from './components/VoiceStudio';
import Templates from './components/Templates';
import Sidebar from './components/Sidebar';

interface Project {
  id: string;
  name: string;
  avatar: string;
  voice: string;
  script: string;
  status: 'draft' | 'processing' | 'completed';
  createdAt: string;
  thumbnail?: string;
}

interface AppState {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const AppContext = createContext<AppState>({} as AppState);
export const useApp = () => useContext(AppContext);

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Product Demo Video',
      avatar: 'Professional Woman',
      voice: 'Sarah - Natural',
      script: 'Welcome to our product demonstration. Today I will show you how our AI platform can transform your workflow...',
      status: 'completed',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Training Module',
      avatar: 'Business Man',
      voice: 'James - Corporate',
      script: 'In this training module, we will cover the essential skills needed for effective communication...',
      status: 'processing',
      createdAt: '2024-01-18',
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      avatar: 'Casual Creator',
      voice: 'Emma - Energetic',
      script: '',
      status: 'draft',
      createdAt: '2024-01-20',
    },
  ]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      projects,
      setProjects,
      currentProject,
      setCurrentProject,
      isLoggedIn,
      setIsLoggedIn,
    }}>
      <div className="min-h-screen bg-surface">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Landing onLogin={handleLogin} />
            </motion.div>
          )}
          {currentPage !== 'landing' && (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex"
            >
              <Sidebar />
              <main className="flex-1 ml-64 min-h-screen">
                <AnimatePresence mode="wait">
                  {currentPage === 'dashboard' && (
                    <motion.div key="dashboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Dashboard />
                    </motion.div>
                  )}
                  {currentPage === 'avatars' && (
                    <motion.div key="avatars" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <AvatarStudio />
                    </motion.div>
                  )}
                  {currentPage === 'editor' && (
                    <motion.div key="editor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <VideoEditor />
                    </motion.div>
                  )}
                  {currentPage === 'voices' && (
                    <motion.div key="voices" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <VoiceStudio />
                    </motion.div>
                  )}
                  {currentPage === 'templates' && (
                    <motion.div key="templates" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Templates />
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

export default App;
