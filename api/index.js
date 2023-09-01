const express =require('express');
const cors =require('cors');
const morgan =require('morgan');
const path =require('path');
const bodyParser =require('body-parser');
const app =express();
const users =require("./routes/api/users");





//bodyparser middleware
app.use(bodyParser.json());
//for cross origin sharing 
app.use(cors());
//server logging or something
app.use(morgan('dev'));

//set up routes
app.use('/api/users',users);

app.use(express.static(path.join(__dirname+'/../client/', 'build')));
//for deployment
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname+'/../client/', 'build', 'index.html'));
});




//sert up the port number 
const port = process.env.PORT || 8000;
//run server 
app.listen(port,() => console.log(`Server Started on port ${port}`))

