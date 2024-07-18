const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

const app = express();

// ADD DATABASE DETAILS
mongoose.connect('mongodb://???', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ADD CLOUDINARY API
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posts',
    allowed_formats: ['jpg', 'png', 'mp4', 'mov'],
  },
});

const postSchema = new mongoose.Schema({
  media: String,
  title: String,
  body: String,
  tags: [String],
  name: String,
  number: String,
});
const Post = mongoose.model('Post', postSchema);

const upload = multer({ storage: storage });
app.use(express.json());
app.post('/createPost', upload.single('media'), async (req, res) => {
  try {
    const { title, body, tags, name, number } = req.body;
    const mediaUrl = req.file.path;

    const newPost = new Post({
      media: mediaUrl,
      title: title,
      body: body,
      tags: tags.split(','),
      name: name,
      number: number,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
