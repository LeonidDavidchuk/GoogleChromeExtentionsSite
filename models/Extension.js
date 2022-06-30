const { Schema, model } = require('mongoose')
const schema = new Schema(
    {
        Name: { type: String, required: true, unique: false, index: true, sparse: true },
        Price: { type: Number, required: false, unique: false },
        Image_Logo: { type: String, required: true, unique: false },
        Image: { type: String, required: true, unique: false },
        Image_Description1: { type: String, required: true, unique: false },
        Image_Description2: { type: String, required: true, unique: false },
        Image_Description3: { type: String, required: true, unique: false },
        Rate: { type: Number, required: true, unique: false },
        Description: { type: String, required: true, unique: false }
    })

module.exports = model('Extension', schema)
