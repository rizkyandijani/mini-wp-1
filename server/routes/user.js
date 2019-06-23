const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/',UserController.getAll)
router.get('/:userId',UserController.getOne)
router.post('/register',UserController.create)
router.post('/login',UserController.login)
router.post('/loginGoogle',UserController.loginGoogle)
router.patch('/:userId',UserController.update)
router.delete('/:id',UserController.delete)

module.exports = router