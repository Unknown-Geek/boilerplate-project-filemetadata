var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'), (req,res) => {
  try {
      console.log(req.file);
      if (req.file) {
        res.json({
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size
        });
      } else {
        res.json({error : "No file found"});
      }
  } catch (err) {
        console.error(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
