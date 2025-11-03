const fs = require("fs");
const path = require("path");
const User = require("../models/User");

class UserService {
  constructor() {
    this.usersPath = path.join(__dirname, "../../data/users.json");
  }

  getAllUsers() {
    try {
      const data = fs.readFileSync(this.usersPath, "utf8");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      return [];
    }
  }

  saveUser(user) {
    const users = this.getAllUsers();
    users.push(user);
    fs.writeFileSync(this.usersPath, JSON.stringify(users, null, 2), "utf8");
  }

  findUser(username) {
    return this.getAllUsers().find(u => u.username === username); 
  }

  createUser(username, password) {
    if (!username.trim() || !password.trim()) {
      return { success: false, message: "Invalid username or password." };
    }

    if (this.findUser(username)) {
      return { success: false, message: "Username already exists." };
    }

    const user = new User(username, password);
    this.saveUser(user);
    return { success: true, message: "Signup successful!" };
  }

  authenticateUser(username, password) {
    const user = this.findUser(username);
    if (!user) return { success: false, message: "User not found." };
    if (user.password !== password) return { success: false, message: "Wrong password." };
    return { success: true, message: "Login successful!" };
  }
}

module.exports = new UserService();
