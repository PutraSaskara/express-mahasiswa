const express = require("express");
const router = express.Router();
const MahasiswaController = require("../controller/mahasiswa");

router.get("/", MahasiswaController.getAllMahasiswa);

router.post("/", MahasiswaController.postMahsiswa);

router.put("/", MahasiswaController.putMahasiswa);

router.delete("/", MahasiswaController.deleteMahasiswa);

module.exports = router;
