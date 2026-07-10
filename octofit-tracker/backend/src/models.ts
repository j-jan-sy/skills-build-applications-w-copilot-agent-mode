import mongoose, { Schema, model, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessGoal: string;
  level: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
}

export interface IWorkout extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  level: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: [String], required: true },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
export const Team: Model<ITeam> = model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = model<IWorkout>('Workout', workoutSchema);
