"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    level: { type: String, required: true },
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: { type: [String], required: true },
});
const activitySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
});
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
