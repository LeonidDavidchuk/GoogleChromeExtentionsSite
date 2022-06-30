const User = require('../../models/User')
const Role = require('../../models/Role')
const Extension = require('../../models/Extension')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();

const { validationResult } = require('express-validator')
const {secret} = require("../../config/config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "10h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty())
            {
                // return res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const {username, password} = req.body
            const candidate = await User.findOne({username})
            var message1 = ''

            if (candidate)
            {
                message1 = 'Такой пользователь уже существует'
                res.render('registration', {message1})
                // return res.status(400).json({message: "Такой пользователь уже существует"})
            }

            
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "User"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            res.redirect('/')
        } catch (e) {
            
            // res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            var message = ''
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                //return res.status(400).json({message: 'Пользователь ${username} не найден'})
                message = 'Логин или пароль введены неправильно'
                res.render('login', {message})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                //return res.status(400).json({message: 'Введен неправильный пароль'})
            }
            const token = generateAccessToken(user._id, user.roles)

            res.cookie('session_id', token)
            //return res.json({token})
            if (username === 'admin')
            {
                const extensions = await Extension.find({}).lean()
                res.render('admin', {title: 'Admin Page', extensions})
            }
            else {
            res.redirect('/')
            }




        } catch (e) {
            //res.status(400).json({message: 'Login error'})
        }
    }

    

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)

        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()