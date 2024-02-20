const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime()
        const fileName = file.originalname
        // const extension = path.extname(file.originalname)
        cb(null, `${timestamp}-${fileName}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1000 * 1000
    }
})

module.exports = upload