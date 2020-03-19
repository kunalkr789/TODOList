// Add mongoose
const mongoose=require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/todo_db');

// checking connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error in connection to database'));
db.once('open',function(){
    console.log('DB connection success');
})