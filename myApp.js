let express = require('express');
let app = express();

require('dotenv').config()

console.log('Hello World');


// serve the index.html file as a main page 
app.get('/', function(req, res) {
    console.log(__dirname);
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
  });

// app.use is for ressources to be used > here css styles are imported
app.use('/public', express.static(__dirname+'/public') );

app.get('/json', function(req,res){
    
    let message;
    console.log(process.env.MESSAGE_STYLE);

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = 'Hello Json'.toUpperCase();
    } else {
        message = 'Hello Json';
    }

    const messageOject = {"message": message };
    res.json(messageOject);
});


 module.exports = app;
