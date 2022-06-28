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

router.get('/extension/:extensionid', async (req, res) => {
    var extension = await Extension.findById(req.params.extensionid).lean()

    console.log(extension)

    res.render('extension', {
        title: extension.Title,
        IsLogin: true,
        extension
    })
})





module.exports = router

