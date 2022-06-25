const {Schema, model} = require('mongoose')
const schema = new Schema(
{
    Name: {type: String, required: true, unique: false},
    Price: {type: Number, required: true, unique: false},
    Image: {type: String, required: true, unique: false},
    Rate: {type: Number, required: true, unique: false}
})

module.exports = model('Extension', schema)
