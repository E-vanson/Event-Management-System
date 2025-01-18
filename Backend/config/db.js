import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

// Initialize Sequelize
export const sequelizer = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

