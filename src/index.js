const express = require("express");
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const port = process.env.PORT;
const db = require("./connection");
const response = require("./response");
const mahasiswa = require("./routes/mahasiswa");
const upload = require("./middleware/multer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/upload', upload.single('photo'),(req, res) => {
  res.json({
    message: 'Upload Berhasil !!'
  })
})
app.use('/assets', express.static('public'))

app.use("/mahasiswa", mahasiswa);

// app.get("/find", (req, res) => {
//   const sql = "SELECT * FROM mahasiswa";
//   db.query(sql, (error, result) => {
//     // res.send(result)
//     response(200, result, "get all data from mahasiswa", res);
//   });
//   // console.log({reqFromBody: req.body.password})
// });

app.get('/find', (req, res) => {
  // console.log({urlParam: req.query.nama})
  // res.send('Anda di Page hello')
  // console.log('find nim: ', req.query.nim)
  const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim}`
  db.query(sql, (error, result) => {
    response(200, result, "find mahasiswa name", res)
  })
})

app.get("/find", (req, res) => {
  // console.log({urlParam: req.query.nama})
  // res.send('Anda di Page hello')
  // console.log('find nim: ', req.query.nim)
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${req.query.nim}`;
  db.query(sql, (error, result) => {
    response(200, result, "find mahasiswa name", res);
  });
});

app.use((err, req, res, next) => {
  res.json({
    message: err.message
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
