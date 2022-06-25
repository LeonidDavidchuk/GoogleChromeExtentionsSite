const {Router} = require('express')
const router = Router()
const Extension = require('../models/Extension')

router.get('/',async(req, res)=>{
    const extensions = await Extension.find({}).lean()
    res.render('index', 
    {
        title: 'Main Page',
        extensions
    })
})

router.get('/admin',async(req, res)=>{
    res.render('admin', {title: 'Admin Page'})
})

router.post('/createproduct',async(req, res)=>{
    const extension = new Extension(
    {
        Name: req.body.Name,
        Price: req.body.Price,
        Image: req.body.Image,
        Rate: req.body.Rate
    }) 
    await extension.save()
    res.redirect('/')
})







module.exports = router

