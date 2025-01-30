import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, TrendingUp, Sparkles } from 'lucide-react';
import { User } from '../types';
import Confetti from 'react-confetti';

const Dashboard = () => {
  const [showConfetti, setShowConfetti] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock user data - replace with actual Supabase data
  const user: User = {
    id: '1',
    username: 'EcoWarrior',
    points: 1250,
    level: 5,
    food_saved: 23,
    badges: [],
    achievements: [],
    impact_stats: {
      meals_provided: 0,
      co2_saved: 0,
      water_saved: 0,
      money_saved: 0
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {showConfetti && <Confetti gravity={0.2} numberOfPieces={100} />}
      
      <motion.header 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            Welcome Back, {user.username}!
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h1>
        </motion.div>
        <p className="text-gray-600 text-lg">Let's reduce food waste together</p>
      </motion.header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <StatsCard
            icon={<Leaf className="w-8 h-8 text-green-500" />}
            title="Food Saved"
            value={`${user.food_saved} kg`}
            color="green"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            icon={<Award className="w-8 h-8 text-purple-500" />}
            title="Level"
            value={user.level}
            color="purple"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
            title="Points"
            value={user.points}
            color="blue"
          />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.div variants={item}>
          <LeaderboardSection />
        </motion.div>
        <motion.div variants={item}>
          <AchievementsSection />
        </motion.div>
      </motion.div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string | number; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500 relative overflow-hidden group`}
  >
    <motion.div
      className={`absolute inset-0 bg-${color}-50 opacity-0 group-hover:opacity-100 transition-opacity`}
      initial={false}
    />
    <div className="flex items-center space-x-4 relative z-10">
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
    </div>
  </motion.div>
);

const LeaderboardSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-bold mb-4">Top Food Savers</h2>
    {/* Add leaderboard content */}
  </div>
);

const AchievementsSection = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
    {/* Add achievements content */}
  </div>
);

export default Dashboard;