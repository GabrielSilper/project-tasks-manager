import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'express-async-errors';
import userRouter from './routes/user.routes';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

class App {
  public app: express.Express;
  private db = mongoose;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.app.use(ErrorMiddleware.handle);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.get('/live', (req: Request, res: Response) =>
      res.send('Manager tasks is live...')
    );
    this.app.use('/users', userRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  public async connectDB(uri: string): Promise<void> {
    try {
      await this.db.connect(uri, { authSource: 'admin' });
      console.log(`Good connection with database`);
    } catch (error) {
      console.log(`You have a trouble with the connection: ${error}`);
    }
  }
}

export default App;
