
var express = require('express');
var mongoose = require('mongoose');
const Todo = require('./models/todo');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:true});

var app =express();
const { PORT =3000 } = process.env;

const dbURI="mongodb+srv://test:test@cluster0.l3ifv.mongodb.net/todo?retryWrites=true&w=majority";

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology:true})
  .then((result)=> app.listen(PORT))
  .catch((err)=>console.log(err));

app.set('view engine','ejs');
app.use(express.static('./public'));

app.get('/',function(req,res){
  Todo.find()
    .then((data)=>res.render('todo',{todos:data}))
    .catch((err)=>console.log(err));
});

app.post('/',urlencodedParser, function(req,res){
  const todoInstance = new Todo(req.body);
  todoInstance.save()
    .then((data)=> res.json(data))
    .catch((err)=> console.log(err));
});

app.delete('/:item',function(req,res){
  var toDelete=req.params.item.slice(0,-1);
  var id;
  Todo.find({},function(err,data){
    data.forEach((todoItem, i) => {
      if(todoItem.item==toDelete){
        id=todoItem._id;
      }
    });
  });
  Todo.deleteOne(id)
    .then((data)=>res.json(data))
    .catch((err)=>console.log(err));
  });
