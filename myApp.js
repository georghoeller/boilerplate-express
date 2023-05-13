require('dotenv').config();


let express = require('express');
let app = express();


console.log('Hello World');

app.use( function middleware(req,res,next){
    const middlewareLogger = req.method + " " + req.path + " - " +req.ip;
    console.log(middlewareLogger);
    next();
});


// serve the index.html file as a main page 
app.get('/', function(req, res) {
    console.log('dirname',__dirname);
    const absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
  });

  
app.get('/json', function(req,res){
    
    console.log(process.env.MESSAGE_STYLE);
    
    if (process.env.MESSAGE_STYLE === 'uppercase') {
       res.json({"message": 'Hello json'.toUpperCase() });
    } else {  
      res.json({"message": 'Hello json' });
    }
    
  });

// app.use is for ressources to be used > here css styles are imported
app.use('/public', express.static(__dirname+'/public') );

 module.exports = app;
