const path = require("path");
const fs = require("fs");
const argon2 = require("argon2");

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

  async createUser(username, password) {
    if (!username.trim() || !password.trim()) {
      //return { success: false, message: "Invalid username or password." };
      console.log("NOTIFICATION: Invalid username or password")
      return createResponse(false, "Invalid username or password.")
    }

    if (this.findUser(username)) {
      console.log("NOTIFICATION: Username already exists")
      return { success: false, message: "Username already exists." };
    }

    console.log("Creating User...")
    try {
      // Hashed password
      const hashedPassword = await argon2.hash(password)

      const user = new User(username, hashedPassword);
      this.saveUser(user);
      return { success: true, message: "Signup successful!" };
    } catch (err) {
      console.error("Error hashing password:", err)
      return { success: false, message: "Internal error saving error. Try again." };
    }
  }

  async authenticateUser(username, password) {
    const user = this.findUser(username);
    if (!user) return { success: false, message: "User not found." };

    try {
      // Verify password against stored hash
      const isValid = await argon2.verify(user.password, password);
      if (!isValid) return {success: false, message: "Incorrect password."}

      return { success: true, message: "Login successful!" }; 
    } catch (err) {
      console.error("Error verifying password:", err);
      return {success: false, message: "Internal error verifying password. Try again."}
    }

  }
}

function createResponse(outcome, msg) {
  return {success: outcome, message: msg};
}

module.exports = new UserService();
