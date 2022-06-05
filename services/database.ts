import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import 'dotenv/config';

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  models: [process.cwd() + '/build/models/**/*.model.js'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default sequelize;
