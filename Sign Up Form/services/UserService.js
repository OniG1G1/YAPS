const fs = require('fs');
const path = require('path');
const User = require('../models/User');

class UserService {
  constructor() {
    this.usersPath = path.join(__dirname, '../data/users.json');
  }

  getAllUsers() {
    try {
      const data = fs.readFileSync(this.usersPath, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (err) {
      return [];
    }
  }

  saveUser(user) {
    const users = this.getAllUsers();
    users.push(user);
    fs.writeFileSync(this.usersPath, JSON.stringify(users, null, 2), 'utf8');
  }

  isPasswordValid(password) {
    const hasCapital = /[A-Z]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasCapital && hasLetter && hasNumber;
  }

  createUser(username, password) {
    if (!username.trim() || !this.isPasswordValid(password)) {
      return { success: false, message: 'Invalid username or password. Password must include at least 1 capital letter, a number, and a letter.' };
    }

    const user = new User(username, password);
    this.saveUser(user);
    return { success: true, message: 'Signup successful!' };
  }
}

module.exports = UserService;
