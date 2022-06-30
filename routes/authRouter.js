const Router = require('express')
const router = new Router()
const controller = require('./Controllers/authController')
const { check } = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')

router.post('/registration', [
    check('username', "Имя пользователя должно быть больше 2 и меньше 18 символов").isLength({ min: 2, max: 18 }),
    check('password', "Пароль должен быть больше 5 и меньше 15 символов").isLength({ min: 5, max: 15 })

], controller.registration)

router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router