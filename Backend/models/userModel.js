import { DataTypes } from "sequelize";
import { sequelizer } from "../config/db.js";

const User = sequelizer.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "prefer_not_to_say"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
    registeredEvents: {
      type: DataTypes.JSON, // Store registered events as JSON
      defaultValue: [], // Initialize as an empty array
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: true, // Enables createdAt and updatedAt automatically
    createdAt: "created_at", // Maps Sequelize's default createdAt
    updatedAt: "updated_at", // Maps Sequelize's default updatedAt
  }
);

export default User;

