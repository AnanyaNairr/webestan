import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Clock, Users, Search, X, Heart, MessageCircle, Share2, Award, Star } from 'lucide-react';
import type { Recipe, Comment } from '../types';
import toast from 'react-hot-toast';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  // Mock recipes data - replace with actual Supabase data
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Leftover Vegetable Stir-Fry',
      ingredients: ['Mixed vegetables', 'Soy sauce', 'Ginger', 'Garlic'],
      instructions: [
        'Chop all vegetables into similar sizes',
        'Heat oil in a wok or large pan',
        'Add vegetables and stir-fry until tender-crisp',
        'Season with soy sauce and serve'
      ],
      image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80',
      difficulty: 'easy',
      prep_time: 20,
      servings: 4,
      calories: 250,
      likes: 42,
      comments: [
        {
          id: '1',
          user_id: '1',
          username: 'FoodLover',
          content: 'Great way to use leftover veggies!',
          created_at: '2024-01-30T10:00:00Z',
          likes: 5
        }
      ],
      author: {
        id: '1',
        username: 'ChefGreen',
        profile_image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
      },
      tags: ['quick', 'vegetarian', 'healthy']
    },
    {
      id: '2',
      title: 'Bread Pudding',
      ingredients: ['Stale bread', 'Milk', 'Eggs', 'Sugar', 'Vanilla'],
      instructions: [
        'Cut bread into cubes',
        'Mix milk, eggs, sugar, and vanilla',
        'Combine and let soak',
        'Bake until golden'
      ],
      image_url: 'https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?auto=format&fit=crop&q=80',
      difficulty: 'medium',
      prep_time: 45,
      servings: 6,
      calories: 350,
      likes: 28,
      comments: [],
      author: {
        id: '2',
        username: 'DessertPro'
      },
      tags: ['dessert', 'baking', 'comfort-food']
    },
    {
      id: '3',
      title: 'Overripe Banana Bread',
      ingredients: ['Overripe bananas', 'Flour', 'Sugar', 'Eggs', 'Butter'],
      instructions: [
        'Mash bananas in a bowl',
        'Mix with melted butter and eggs',
        'Fold in dry ingredients',
        'Bake for 1 hour'
      ],
      image_url: 'https://images.unsplash.com/photo-1595666944516-bbb485958fb5?auto=format&fit=crop&q=80',
      difficulty: 'easy',
      prep_time: 15,
      servings: 8,
      calories: 280,
      likes: 56,
      comments: [],
      author: {
        id: '3',
        username: 'BakingQueen'
      },
      tags: ['baking', 'breakfast', 'snack']
    }
  ];

  const filteredRecipes = recipes.filter(recipe =>
    (filter === 'all' || recipe.difficulty === filter) &&
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <motion.header 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          Zero-Waste Recipes
        </h1>
        <p className="text-gray-600">Turn your leftovers into delicious meals</p>
      </motion.header>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <motion.div 
          className="w-full md:w-96 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none pl-10 pr-10"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </motion.div>

        <div className="flex gap-2">
          {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
            <motion.button
              key={difficulty}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(difficulty)}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === difficulty
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const RecipeCard = ({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ scale: 1.02, y: -5 }}
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
  >
    <div className="relative">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-500" />
        {recipe.likes}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-2">
        {recipe.author.profile_image ? (
          <img
            src={recipe.author.profile_image}
            alt={recipe.author.username}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-gray-500" />
          </div>
        )}
        <span className="text-sm text-gray-600">{recipe.author.username}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
        {recipe.title}
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {recipe.prep_time} mins
        </span>
        <span className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {recipe.servings}
        </span>
        <span className="flex items-center">
          <Award className={`w-4 h-4 mr-1 ${
            recipe.difficulty === 'easy' ? 'text-green-500' :
            recipe.difficulty === 'medium' ? 'text-yellow-500' :
            'text-red-500'
          }`} />
          {recipe.difficulty}
        </span>
      </div>
    </div>
  </motion.div>
);

const RecipeModal = ({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) => {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    toast.success('Recipe link copied to clipboard!');
  };

  const handleComment = () => {
    if (comment.trim()) {
      toast.success('Comment added!');
      setComment('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="p-2 bg-white rounded-full shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-lg"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {recipe.author.profile_image ? (
              <img
                src={recipe.author.profile_image}
                alt={recipe.author.username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{recipe.title}</h2>
              <p className="text-gray-600">by {recipe.author.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <p className="text-sm text-gray-600">Prep Time</p>
              <p className="font-semibold">{recipe.prep_time} mins</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 mx-auto mb-1 text-gray-600" />
              <p className="text-sm text-gray-600">Servings</p>
              <p className="font-semibold">{recipe.servings}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Award className={`w-5 h-5 mx-auto mb-1 ${
                recipe.difficulty === 'easy' ? 'text-green-500' :
                recipe.difficulty === 'medium' ? 'text-yellow-500' :
                'text-red-500'
              }`} />
              <p className="text-sm text-gray-600">Difficulty</p>
              <p className="font-semibold capitalize">{recipe.difficulty}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20}} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.}}
                  >
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Comments ({recipe.comments.length})</h3>
              <div className="space-y-4 mb-4">
                {recipe.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleComment}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Comment
                </motion.button>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-6 w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CommentCard = ({ comment }: { comment: Comment }) => (
  <div className="flex gap-3">
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
      {comment.user_image ? (
        <img
          src={comment.user_image}
          alt={comment.username}
          className="w-full h-full rounded-full"
        />
      ) : (
        <User className="w-4 h-4 text-gray-500" />
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-medium">{comment.username}</span>
        <span className="text-xs text-gray-500">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 mt-1">{comment.content}</p>
      <div className="flex items-center gap-4 mt-2">
        <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700">
          <Heart className="w-4 h-4" />
          {comment.likes}
        </button>
        <button className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700">
          <MessageCircle className="w-4 h-4" />
          Reply
        </button>
      </div>
    </div>
  </div>
);

export default Recipes;