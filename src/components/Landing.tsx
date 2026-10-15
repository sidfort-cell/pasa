import { motion } from 'framer-motion';
import { Play, Sparkles, Video, Mic, Users, Zap, ArrowRight, Star } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
}

export default function Landing({ onLogin }: LandingProps) {
  return (
    <div className="min-h-screen bg-surface overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">VidGenius AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-text-secondary hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-text-secondary hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-text-secondary hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="px-4 py-2 text-text-secondary hover:text-white transition-colors">
              Log In
            </button>
            <button
              onClick={onLogin}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-text-secondary">Powered by Advanced AI Models</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Create Stunning{' '}
              <span className="text-gradient">AI Videos</span>
              <br />in Minutes
            </h1>

            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Transform text into professional videos with AI avatars, natural voices, and cinematic quality. No camera, no studio, no experience needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onLogin}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-all animate-pulse-glow flex items-center gap-2"
              >
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 glass-card rounded-xl text-white font-semibold text-lg hover:bg-surface-lighter transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-text-secondary text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-2">4.9/5 from 10,000+ users</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden glass-card p-1">
              <div className="bg-surface-light rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Preview Card 1 */}
                  <div className="bg-surface-lighter rounded-xl p-6 animate-float" style={{ animationDelay: '0s' }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center text-2xl">
                      👩‍💼
                    </div>
                    <p className="text-center text-sm text-text-secondary">AI Avatar Speaking</p>
                    <div className="mt-3 h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ delay: 1, duration: 2 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                  {/* Preview Card 2 */}
                  <div className="bg-surface-lighter rounded-xl p-6 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mx-auto mb-4 flex items-center justify-center text-2xl">
                      🎬
                    </div>
                    <p className="text-center text-sm text-text-secondary">Video Rendering</p>
                    <div className="mt-3 h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        transition={{ delay: 1.5, duration: 2 }}
                        className="h-full bg-gradient-to-r from-accent to-green-400 rounded-full"
                      />
                    </div>
                  </div>
                  {/* Preview Card 3 */}
                  <div className="bg-surface-lighter rounded-xl p-6 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mx-auto mb-4 flex items-center justify-center text-2xl">
                      🎙️
                    </div>
                    <p className="text-center text-sm text-text-secondary">Voice Generation</p>
                    <div className="mt-3 flex items-center gap-1 justify-center">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 4 }}
                          animate={{ height: [4, 20, 4] }}
                          transition={{ delay: i * 0.1, duration: 0.8, repeat: Infinity }}
                          className="w-1 bg-accent rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Create</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Professional video production tools powered by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'AI Avatars', desc: '100+ realistic AI presenters or create your own custom avatar', color: 'from-purple-500 to-pink-500' },
              { icon: Mic, title: 'Voice Cloning', desc: 'Clone any voice in 30 seconds with our advanced voice AI', color: 'from-cyan-500 to-blue-500' },
              { icon: Video, title: 'Text to Video', desc: 'Simply type your script and watch AI bring it to life', color: 'from-orange-500 to-red-500' },
              { icon: Zap, title: 'Instant Export', desc: 'Export in 4K quality in minutes, not hours', color: 'from-green-500 to-emerald-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-surface-light/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Create Videos in 3 Simple Steps</h2>
            <p className="text-text-secondary text-lg">From idea to finished video in under 5 minutes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Avatar', desc: 'Select from 100+ AI avatars or upload a photo to create your own digital twin', emoji: '👤' },
              { step: '02', title: 'Write Your Script', desc: 'Type or paste your text, choose a voice, and customize the presentation style', emoji: '✍️' },
              { step: '03', title: 'Generate & Export', desc: 'Click generate and download your professional video in minutes', emoji: '🎬' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{item.emoji}</div>
                <div className="text-sm font-bold text-primary mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Create Your First AI Video?</h2>
              <p className="text-text-secondary text-lg mb-8">Join 100,000+ creators who are already making professional videos with AI</p>
              <button
                onClick={onLogin}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Get Started Free — No Credit Card Required
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gradient">VidGenius AI</span>
          </div>
          <p className="text-text-secondary text-sm">© 2024 VidGenius AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
