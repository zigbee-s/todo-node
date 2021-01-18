const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({item:String});

const Todo = mongoose.model('Todo',todoSchema);
module.exports= Todo;
