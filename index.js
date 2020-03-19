// Setting up the express server
const express=require('express');

const db=require('./config/mongoose');
const List=require('./models/list');

const app=express();
const port=8000;
var due_date=new Date();
const path=require('path'); // setting the path template engine

// Returning response from the server to check
// app.get('/',function(req,res){
//     res.send('<h1>TODO List</h1>');
// })

// setting the path template engine
    app.set('view engine', 'ejs');
    app.set('views',path.join(__dirname,'views'));
    app.use(express.urlencoded());
    
// Accessing static files
    app.use(express.static('assets'));

// Create List items
var listItems=[
    
];

    app.get('/',function(req,res){
        List.find({},function(err,lists){
            if(err){
                console.log('Error in fetching list from DB',err);
                return;
            }
            return res.render('home',{
                title:"TODO List",
                list_item:lists
            });

        });
    });

app.post('/create-list',function(req,res){
    List.create({
        description: req.body.description,
        category: req.body.category,
        due_date: req.body.due_date
    },function(err,newList){
        if(err){
            console.log('Error in create new list',err);
            return;
        }
        console.log('======',newList);
        return res.redirect('back');
    })
});

// Delete item from TODO Database
app.post('/delete-item',function(req,res){
    console.log(req.body);
    Object.keys(req.body).forEach(function(key){
        List.findByIdAndDelete(key,function(err){
            if(err){
                console.log('Error in deleting an list from database',err);
                return;
            }
            console.log('One list is deleted');
            
        });
    });
    return res.redirect('back');
    
});

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Server is running');
});