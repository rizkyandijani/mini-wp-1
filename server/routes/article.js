const router = require('express').Router()
const ArticleController = require('../controllers/article')
const upload = require('../helpers/images')
const cekTag = require('../helpers/googleVision')

const authentication = require('../middlewares/authentication')

const Multer = require('multer')
const uploadToLocal = Multer ( { dest : './localStorage'} )

router.use(authentication)

router.post('/cekTag', uploadToLocal.single('image'), cekTag ,ArticleController.localTag)

router.get('/',ArticleController.getAll)
router.get('/:articleId',ArticleController.getOne)
router.get('/:userId/userArticle',ArticleController.getUserArticle)
router.post('/',upload.multer.single('image'),upload.sendUploadToGCS,ArticleController.create)
router.patch('/:articleId',upload.multer.single('image'),upload.sendUploadToGCS,ArticleController.update)
router.delete('/:articleId',ArticleController.delete)


module.exports = router
