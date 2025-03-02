const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Create the uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage for handling profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (images) from the 'uploads' directory
app.use('/uploads', express.static(uploadDir));

// Helper function to read and write profile data from/to JSON file
const readProfileData = () => {
  const data = fs.readFileSync('profile.json', 'utf8');
  return JSON.parse(data);
};

const writeProfileData = (data) => {
  fs.writeFileSync('profile.json', JSON.stringify(data, null, 2));
};

// Route to get the current profile data (including profile picture)
app.get('/profile', (req, res) => {
  const profile = readProfileData();
  res.json(profile);
});

// Route to update profile picture
app.post('/profile/picture', upload.single('profilePicture'), (req, res) => {
  const profile = readProfileData();

  if (req.file) {
    // Update profile picture in the JSON data
    profile.user.profilePicture = req.file.filename;

    // Save updated profile data back to the JSON file
    writeProfileData(profile);

    res.json({ message: 'Profile picture updated successfully.' });
  } else {
    res.status(400).json({ message: 'No file uploaded.' });
  }
});

// Route to delete the profile picture (set it back to the default)
app.delete('/profile/picture', (req, res) => {
  const profile = readProfileData();

  // Delete the uploaded picture if it exists (only if it's not the default one)
  const currentPicturePath = path.join(uploadDir, profile.user.profilePicture);
  if (fs.existsSync(currentPicturePath) && profile.user.profilePicture !== 'default-profile.jpg') {
    fs.unlinkSync(currentPicturePath);
  }

  // Set profile picture to the default one
  profile.user.profilePicture = 'default-profile.jpg';

  // Save updated profile data back to the JSON file
  writeProfileData(profile);

  res.json({ message: 'Profile picture deleted (set to default).' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
