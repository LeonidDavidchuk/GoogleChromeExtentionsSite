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

router.get('/registration',async(req, res)=>{
    res.render('registration', 
    {
        title: 'Registration',
    })
})

router.get('/login',async(req, res)=>{
    res.render('login', 
    {
        title: 'login',
    })
})

router.get('/admin',async(req, res)=>{
    const extensions = await Extension.find({}).lean()
    res.render('admin', {title: 'Admin Page', extensions})

})

router.post('/createproduct',async(req, res)=>{
    const extension = new Extension(
    {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Description,
        Image: req.body.Image,
        Image_Logo: req.body.Image_Logo,
        Image_Description1: req.body.Image_Description1,
        Image_Description2: req.body.Image_Description2,
        Image_Description3: req.body.Image_Description3,
        Rate: req.body.Rate
    }) 
    await extension.save()
    res.redirect('/')
})

router.post('/deleteproduct',async(req, res)=>{

    console.log(req.body.id)
    const extension = await Extension.findById(req.body.id)
    await extension.remove()
    res.redirect('/admin')

})




router.get('/extension/:extensionid', async (req, res) => {
    var extension = await Extension.findById(req.params.extensionid).lean()

    console.log(extension)

    res.render('extension', {
        title: extension.Name,
        IsLogin: true,
        extension
    })
})





module.exports = router

