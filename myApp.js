require('dotenv').config();
const bodyParser = require('body-parser');

let express = require('express');
let app = express();


console.log('Hello World');

app.use( function middleware(req,res,next){
    const middlewareLogger = req.method + " " + req.path + " - " +req.ip;
    console.log(middlewareLogger);
    next();
});

// app.use is for ressources to be used > here css styles are imported
app.use('/public', express.static(__dirname+'/public') );

app.use(bodyParser.urlencoded({extended: false}));


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

app.get('/now', function(req,res,next){
    req.time = new Date().toString();
    next();
},function(req,res){
    res.send({"time":req.time})
});

app.get('/:word/echo', function(req,res,next){
    res.send({"echo":req.params.word})
});

app.get('/name', function(req,res,next){
    const firstname = req.query.first;
    const lastname = req.query.last;
    res.send({"name": `${firstname} ${lastname}`})
});

app.post('/name', function(req,res){
    const string = req.body.first + " " + req.body.last; 
    res.json({name:string});
});


 module.exports = app;
