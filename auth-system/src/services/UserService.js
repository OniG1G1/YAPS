const path = require("path");
const fs = require("fs");
const argon2 = require("argon2");

const User = require("../models/User");

class UserService {
  constructor() {
    this.usersPath = path.join(__dirname, "../../data/users.json");
  }

  // consider using Promises
  // always doing getAllUsers, very expensive operation, consider storing it and only retrieving when you detect a change in the DB, pagination

  getAllUsers() {
    try {
      const data = fs.readFileSync(this.usersPath, "utf8");
      return data ? JSON.parse(data) : []; // consider global error handling
    } catch (err) {
      return [];
    }
  }

  saveUser(user) {
    const users = this.getAllUsers();
    users.push(user);
    fs.writeFileSync(this.usersPath, JSON.stringify(users, null, 2));
  }

  findUser(username) {
    return this.getAllUsers().find(u => u.username === username); // strict equality, same value, same type
  }

  async createUser(username, password) {
    if (!username.trim() || !password.trim()) {
      console.log("[UserService] invalid signup input");
      return response(false, "Invalid username or password.")
    }

    if (this.findUser(username)) {
      console.log("[UserService] username exists:", username);
      return response(false, "Username already exists.");
    }

    try {
      console.log("[UserService] hashing password");
      const hashedPassword = await argon2.hash(password)

      this.saveUser(new User(username, hashedPassword));
      return response(true, "Signup successful!");

    } catch (err) {
      console.error("[UserService] signup error:", err.message);
      return response(false, "Internal error. Try again.");
    }
  }

  async authenticateUser(username, password) {
    const user = this.findUser(username);
    if (!user) { // future implementation, 2 users have the same username
      console.log("[UserService] login failed: user not found");
      return response(false, "User not found.");
    }

    try {
      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        console.log("[UserService] login failed: bad password");
        return response(false, "Incorrect password.");
      }

      console.log("[UserService] login success:", username);
      return response(true, "Login successful!");

    } catch (err) {
      console.error("[UserService] verification error:", err.message);
      return response(false, "Internal error. Try again.");
    }
  }
}

function response(success, message) {
  return { success, message };
}

module.exports = new UserService();
