import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, MessageSquare } from 'lucide-react';
import type { User } from '../types';

const Community = () => {
  // Mock users data - replace with actual Supabase data
  const topUsers: User[] = [
    {
      id: '1',
      username: 'EcoWarrior',
      points: 1250,
      level: 5,
      food_saved: 23,
      badges: []
    },
    {
      id: '2',
      username: 'GreenChef',
      points: 980,
      level: 4,
      food_saved: 18,
      badges: []
    },
    {
      id: '3',
      username: 'ZeroWaster',
      points: 750,
      level: 3,
      food_saved: 15,
      badges: []
    }
  ];

  return (
    <div className="space-y-8">
      <header className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-green-800 mb-2"
        >
          Community
        </motion.h1>
        <p className="text-gray-600">Connect with fellow food waste warriors</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeaderboardSection users={topUsers} />
        <CommunityFeed />
      </div>
    </div>
  );
};

const LeaderboardSection = ({ users }: { users: User[] }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
      Top Food Savers
    </h2>
    <div className="space-y-4">
      {users.map((user, index) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <span className="font-bold text-lg text-gray-500">#{index + 1}</span>
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-sm text-gray-500">Level {user.level}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">{user.points} pts</p>
            <p className="text-sm text-gray-500">{user.food_saved}kg saved</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommunityFeed = () => {
  const posts = [
    {
      id: 1,
      username: 'EcoWarrior',
      content: 'Just turned my leftover vegetables into an amazing stir-fry! 🥘',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      username: 'GreenChef',
      content: 'Here\'s a tip: freeze your overripe bananas for smoothies! 🍌',
      likes: 8,
      comments: 5
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <MessageSquare className="w-6 h-6 text-blue-500 mr-2" />
        Community Feed
      </h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold">{post.username}</span>
            </div>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <button className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{post.likes}</span>
              </button>
              <span className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;