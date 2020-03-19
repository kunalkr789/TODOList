const mongoose=require('mongoose');
var dateFormat = require('dateformat');
var now = new Date();
const listSchema=new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    }
});

const List=mongoose.model('List',listSchema);
module.exports=List;