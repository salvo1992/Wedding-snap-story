const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const path = require("path")
const fs = require("fs")

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/weddingSnapStory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads"
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

// Models
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weddingDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

const photoSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String, required: true },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ["confirmed", "pending", "declined"], default: "pending" },
  plusOne: { type: Boolean, default: false },
  table: { type: Number },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

const timelineEventSchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  category: { type: String, enum: ["ceremony", "reception", "preparation", "other"], default: "other" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

const honeymoonSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
  imageUrl: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
})

const User = mongoose.model("User", userSchema)
const Album = mongoose.model("Album", albumSchema)
const Photo = mongoose.model("Photo", photoSchema)
const Guest = mongoose.model("Guest", guestSchema)
const TimelineEvent = mongoose.model("TimelineEvent", timelineEventSchema)
const Honeymoon = mongoose.model("Honeymoon", honeymoonSchema)

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret")
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." })
  }
}

// Routes

// Auth routes
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, weddingDate } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      weddingDate,
    })

    await user.save()

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "7d" })

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        weddingDate: user.weddingDate,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "7d" })

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        weddingDate: user.weddingDate,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Album routes
app.post("/api/albums", auth, async (req, res) => {
  try {
    const { title, description } = req.body

    const album = new Album({
      title,
      description,
      userId: req.user._id,
    })

    await album.save()
    res.status(201).json(album)
  } catch (error) {
    console.error("Create album error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/albums", auth, async (req, res) => {
  try {
    const albums = await Album.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(albums)
  } catch (error) {
    console.error("Get albums error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Photo routes
app.post("/api/photos", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, albumId } = req.body

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" })
    }

    const photo = new Photo({
      title,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
      albumId,
      userId: req.user._id,
    })

    await photo.save()

    // Update album cover if it's the first photo
    const albumPhotos = await Photo.countDocuments({ albumId })
    if (albumPhotos === 1) {
      await Album.findByIdAndUpdate(albumId, { coverImage: photo.imageUrl })
    }

    res.status(201).json(photo)
  } catch (error) {
    console.error("Upload photo error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/photos/:albumId", auth, async (req, res) => {
  try {
    const photos = await Photo.find({ albumId: req.params.albumId }).sort({ createdAt: -1 })
    res.json(photos)
  } catch (error) {
    console.error("Get photos error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Guest routes
app.post("/api/guests", auth, async (req, res) => {
  try {
    const { name, email, status, plusOne, table } = req.body

    const guest = new Guest({
      name,
      email,
      status,
      plusOne,
      table,
      userId: req.user._id,
    })

    await guest.save()
    res.status(201).json(guest)
  } catch (error) {
    console.error("Add guest error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/guests", auth, async (req, res) => {
  try {
    const guests = await Guest.find({ userId: req.user._id }).sort({ name: 1 })
    res.json(guests)
  } catch (error) {
    console.error("Get guests error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.put("/api/guests/:id", auth, async (req, res) => {
  try {
    const { name, email, status, plusOne, table } = req.body

    const guest = await Guest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, email, status, plusOne, table },
      { new: true },
    )

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" })
    }

    res.json(guest)
  } catch (error) {
    console.error("Update guest error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Timeline routes
app.post("/api/timeline", auth, async (req, res) => {
  try {
    const { time, title, description, location, category } = req.body

    const event = new TimelineEvent({
      time,
      title,
      description,
      location,
      category,
      userId: req.user._id,
    })

    await event.save()
    res.status(201).json(event)
  } catch (error) {
    console.error("Add timeline event error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/timeline", auth, async (req, res) => {
  try {
    const events = await TimelineEvent.find({ userId: req.user._id }).sort({ time: 1 })
    res.json(events)
  } catch (error) {
    console.error("Get timeline events error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Honeymoon routes
app.post("/api/honeymoon", auth, upload.single("image"), async (req, res) => {
  try {
    const { destination, startDate, endDate, description } = req.body

    const honeymoon = new Honeymoon({
      destination,
      startDate,
      endDate,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      userId: req.user._id,
    })

    await honeymoon.save()
    res.status(201).json(honeymoon)
  } catch (error) {
    console.error("Add honeymoon error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/api/honeymoon", auth, async (req, res) => {
  try {
    const honeymoons = await Honeymoon.find({ userId: req.user._id }).sort({ startDate: 1 })
    res.json(honeymoons)
  } catch (error) {
    console.error("Get honeymoon error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

