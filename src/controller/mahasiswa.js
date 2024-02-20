const db = require("../connection");
const response = require("../response");

const getAllMahasiswa = (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (error, result) => {
    // res.send(result)
    response(200, result, "get all data from mahasiswa", res);
  });
  // console.log({reqFromBody: req.body.password})
};

const postMahsiswa = (req, res) => {
  const { nim, nama_lengkap, prodi, alamat } = req.body;

  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, prodi, alamat) VALUES (${nim}, '${nama_lengkap}', '${prodi}', '${alamat}')`;
  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "data added successfuly", res);
    } else {
      console.log("ga masuk");
    }
    // console.log(result);
  });
};

const putMahasiswa = (req, res) => {
  const { nim, nama_lengkap, prodi, alamat } = req.body;
  const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', prodi = '${prodi}', alamat = '${alamat}' WHERE nim = '${nim}'`;

  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      };
      response(200, data, "Succesfully Update Data", res);
    } else {
      response(404, "user not found", "error", res);
    }
  });
};

const deleteMahasiswa = (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE From mahasiswa WHERE nim = '${nim}'`;
  db.query(sql, (error, result) => {
    if (error) response(500, "invalid", "error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
      };
      response(200, data, "Deleted Data Successfully", res);
    } else {
      response(404, "user not found", "error", res);
    }
  });
};

module.exports = {
  getAllMahasiswa,
  postMahsiswa,
  putMahasiswa,
  deleteMahasiswa,
};
