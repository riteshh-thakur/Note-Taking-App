require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_secret_key"; 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);


const NoteSchema = new mongoose.Schema({
  userId: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", NoteSchema);




app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }


  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  
  const token = jwt.sign({ id: user._id, email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token required" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};


app.get("/notes", authenticateToken, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: 1 });
  res.json(notes);
});


app.post("/notes", authenticateToken, async (req, res) => {
  const newNote = new Note({
    userId: req.user.id,
    content: req.body.content,
  });

  await newNote.save();
  res.json(newNote);
});


app.delete("/notes/:id", authenticateToken, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Note deleted" });
});


app.listen(5000, () => console.log("Server running on port 5000"));
