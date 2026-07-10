import express from 'express';
import connectToDatabase from './config/database';
import { User, Team, Activity, LeaderboardEntry, Workout } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';

app.use(express.json());

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

const createResourceRoute = (resourceName: string, model: any) => {
  const router = express.Router();

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

app.use('/api/users', createResourceRoute('users', User));
app.use('/api/teams', createResourceRoute('teams', Team));
app.use('/api/activities', createResourceRoute('activities', Activity));
app.use('/api/leaderboard', createResourceRoute('leaderboard', LeaderboardEntry));
app.use('/api/workouts', createResourceRoute('workouts', Workout));

connectToDatabase().then(() => {
  app.listen(port, host, () => {
    console.log(`Backend listening on ${host}:${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
});
