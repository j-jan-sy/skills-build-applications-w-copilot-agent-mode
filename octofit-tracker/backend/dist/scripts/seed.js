"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await models_1.User.deleteMany({});
        await models_1.Team.deleteMany({});
        await models_1.Activity.deleteMany({});
        await models_1.LeaderboardEntry.deleteMany({});
        await models_1.Workout.deleteMany({});
        const users = await models_1.User.create([
            {
                name: 'Ava Chen',
                email: 'ava@example.com',
                fitnessGoal: 'Build endurance',
                level: 'Intermediate',
            },
            {
                name: 'Liam Patel',
                email: 'liam@example.com',
                fitnessGoal: 'Lose weight',
                level: 'Beginner',
            },
            {
                name: 'Mina Torres',
                email: 'mina@example.com',
                fitnessGoal: 'Increase strength',
                level: 'Advanced',
            },
        ]);
        await models_1.Team.create([
            {
                name: 'River Runners',
                sport: 'Running',
                members: users.slice(0, 2).map((user) => user.id),
            },
            {
                name: 'Peak Power',
                sport: 'CrossFit',
                members: [users[2].id],
            },
        ]);
        await models_1.Activity.create([
            {
                userId: users[0].id,
                type: 'Run',
                durationMinutes: 35,
                caloriesBurned: 320,
                date: new Date('2026-07-01'),
            },
            {
                userId: users[1].id,
                type: 'Cycling',
                durationMinutes: 45,
                caloriesBurned: 410,
                date: new Date('2026-07-02'),
            },
            {
                userId: users[2].id,
                type: 'Strength',
                durationMinutes: 60,
                caloriesBurned: 500,
                date: new Date('2026-07-03'),
            },
        ]);
        await models_1.LeaderboardEntry.create([
            { userId: users[0].id, score: 980, rank: 1 },
            { userId: users[2].id, score: 945, rank: 2 },
            { userId: users[1].id, score: 900, rank: 3 },
        ]);
        await models_1.Workout.create([
            {
                title: 'Morning Mobility Flow',
                description: 'A gentle 20-minute mobility routine for full-body recovery.',
                durationMinutes: 20,
                difficulty: 'Beginner',
            },
            {
                title: 'Interval Sprint Circuit',
                description: 'High-energy intervals for boosting cardiovascular fitness.',
                durationMinutes: 30,
                difficulty: 'Intermediate',
            },
            {
                title: 'Upper Body Strength',
                description: 'Compound lifts and core work for strength gains.',
                durationMinutes: 45,
                difficulty: 'Advanced',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
