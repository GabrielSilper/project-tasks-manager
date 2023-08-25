import App from './app';

const PORT = process.env.SERVER_PORT || 3001;
const DB_URI = process.env.DB_URI as string;

const app = new App();
app.start(PORT);
app.connectDB(DB_URI);
