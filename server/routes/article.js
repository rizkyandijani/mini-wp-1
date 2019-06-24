const router = require('express').Router()
const ArticleController = require('../controllers/article')
const upload = require('../helpers/images')
// const cekTag = require('../helpers/googleVision')

const authentication = require('../middlewares/authentication')

router.use(authentication)

router.get('/',ArticleController.getAll)
router.get('/:articleId',ArticleController.getOne)
router.post('/',upload.multer.single('image'),upload.sendUploadToGCS,ArticleController.create)
router.patch('/:articleId',upload.multer.single('image'),upload.sendUploadToGCS,ArticleController.update)
router.delete('/:articleId',ArticleController.delete)


module.exports = router