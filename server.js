const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', req.file.originalname);
  const pfpPath = path.join(__dirname, 'uploads', 'currentpfp.txt');

  fs.writeFile(pfpPath, filePath, (err) => {
    if (err) {
      return res.status(500).send('Error saving file path.');
    }
    res.send(`File "${req.file.originalname}" uploaded successfully and path saved.`);
  })
});

app.get('/uploads/currentpfp', (req, res) => {
  const pfpPath = path.join(__dirname, 'uploads', 'currentpfp.txt');

  fs.readFile(pfpPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading profile file path.');
    }
    res.send(data);
  });
});

app.get('/', (req, res) => {
  res.send('This is a dummy output for the /root route');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


