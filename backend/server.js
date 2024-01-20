// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (adjust connection string accordingly)
mongoose.connect(
  "mongodb+srv://itzrohit:rohit6@ecommerce.tenbyh2.mongodb.net/reduxproject"
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
app.use(cors());
app.use(express.json());
// CRUD routes
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
app.post("/api/users", async (req, res) => {
  try {
    // Generate a random username and email
    const randomUsername = generateRandomUsername();
    const randomEmail = generateRandomEmail();

    // Create a new user with the random username and email
    const newUser = new User({
      name: randomUsername,
      email: randomEmail,
    });

    // Save the new user to the database
    await newUser.save();

    // Send the new user as a response
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to generate a random username
function generateRandomUsername() {
  const randomPrefix = Math.floor(Math.random() * 1000);
  return `User${randomPrefix}`;
}

// Helper function to generate a random email
function generateRandomEmail() {
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `user${randomSuffix}@gmail.com`;
}

app.put("/api/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
