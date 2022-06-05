import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import passportConfig from './configs/passport';
import sequelize from './services/database';
import authRouter from './router/auth.router';
import questionRouter from './router/question.router';
import categoryRouter from './router/category.router';
import * as dotenv from 'dotenv';

const app = express();
const PORT = process.env.API_PORT;
dotenv.config();

(async () => {
await sequelize.sync({ force: false });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  // Passport config
  passportConfig(passport);

  // Connect flash
  app.use(flash());

  // Express session
  app.use(session({
    secret: '132098fdsjlkrewoipu',
    resave: false,
    saveUninitialized: false,
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.send({
      message: 'It\'s working!',
      user: req.user || null,
    });
  });

  // Router
  app.use('/api/v1', authRouter);
  app.use('/api/v1', questionRouter);
  app.use('/api/v1', categoryRouter);

  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
})();
