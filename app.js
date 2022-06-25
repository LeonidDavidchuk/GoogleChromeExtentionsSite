const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = config.get('port')
async function start()
{
    try 
    {
        await mongoose.connect(config.get('connectionstring'), {
            useNewUrlParser:true,
            useUnifiedTopology: true
        })   
        app.listen(PORT, ()=>console.log('Server Start, Port: ', PORT))
    } 
    catch (error) 
    {
        console.log('error', error.message)
        process.exit(1)
    }
}
start()