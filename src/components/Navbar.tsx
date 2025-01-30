import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, ChefHat, Users, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sprout className="h-8 w-8 text-green-600 transform group-hover:scale-110 transition-transform" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              FoodSaver
            </span>
          </Link>
          
          <div className="flex space-x-8">
            <NavLink 
              to="/" 
              icon={<Sprout />} 
              text="Dashboard" 
              active={isActive('/')}
              onHover={() => setHovered('/')}
              isHovered={hovered === '/'}
              onLeave={() => setHovered(null)}
            />
            <NavLink 
              to="/recipes" 
              icon={<ChefHat />} 
              text="Recipes" 
              active={isActive('/recipes')}
              onHover={() => setHovered('/recipes')}
              isHovered={hovered === '/recipes'}
              onLeave={() => setHovered(null)}
            />
            <NavLink 
              to="/community" 
              icon={<Users />} 
              text="Community" 
              active={isActive('/community')}
              onHover={() => setHovered('/community')}
              isHovered={hovered === '/community'}
              onLeave={() => setHovered(null)}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onHover: () => void;
  isHovered: boolean;
  onLeave: () => void;
}

const NavLink = ({ to, icon, text, active, onHover, isHovered, onLeave }: NavLinkProps) => (
  <Link
    to={to}
    className="relative"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <motion.div
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
        active
          ? 'text-green-600 bg-green-50'
          : 'text-gray-600 hover:text-green-600'
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <span>{text}</span>
      {(active || isHovered) && (
        <motion.div
          layoutId="navunderline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  </Link>
);

export default Navbar;