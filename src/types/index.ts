export interface User {
  id: string;
  username: string;
  points: number;
  level: number;
  food_saved: number;
  badges: Badge[];
  organization?: Organization;
  achievements: Achievement[];
  impact_stats: ImpactStats;
  donor_type: 'individual' | 'restaurant' | 'organization';
  profile_image?: string;
}

export interface Organization {
  name: string;
  type: 'restaurant' | 'ngo' | 'food_bank' | 'other';
  address: string;
  contact: string;
  description: string;
  verified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward_points: number;
  completed: boolean;
  icon: string;
}

export interface ImpactStats {
  meals_provided: number;
  co2_saved: number;
  water_saved: number;
  money_saved: number;
}

export interface FoodEntry {
  id: string;
  user_id: string;
  food_name: string;
  quantity: number;
  saved_date: string;
  points_earned: number;
  likes: number;
  comments: Comment[];
  images?: string[];
  status: 'available' | 'claimed' | 'completed';
  expiry_date: string;
  location: string;
}

export interface Comment {
  id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  likes: number;
  user_image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  image_url: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prep_time: number;
  servings: number;
  calories: number;
  likes: number;
  comments: Comment[];
  author: {
    id: string;
    username: string;
    profile_image?: string;
  };
  tags: string[];
}