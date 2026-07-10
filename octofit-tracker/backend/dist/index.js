"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';
app.use(express_1.default.json());
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};
const createResourceRoute = (resourceName, model) => {
    const router = express_1.default.Router();
    router.get('/', async (_req, res) => {
        const items = await model.find({}).lean();
        res.json({ resource: resourceName, items });
    });
    router.post('/', async (req, res) => {
        const item = await model.create(req.body);
        res.status(201).json(item);
    });
    return router;
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});
app.get('/', (_req, res) => {
    res.json({ message: 'Octofit Tracker API', apiBaseUrl: getApiBaseUrl() });
});
app.use('/api/users', createResourceRoute('users', models_1.User));
app.use('/api/teams', createResourceRoute('teams', models_1.Team));
app.use('/api/activities', createResourceRoute('activities', models_1.Activity));
app.use('/api/leaderboard', createResourceRoute('leaderboard', models_1.LeaderboardEntry));
app.use('/api/workouts', createResourceRoute('workouts', models_1.Workout));
(0, database_1.default)().then(() => {
    app.listen(port, host, () => {
        console.log(`Backend listening on ${host}:${port}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
});
