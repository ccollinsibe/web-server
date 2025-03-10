const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
    res.render('index',{
        title: "Weather App",
        name: "Chiemeka Collins-Ibe"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: "About me",
        name: "Chiemeka Collins-Ibe"     
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: "Help page",
        helpText: "This is some helpfull text",
        name: "Collins-ibe Chiemeka"
    })    
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({ error })//shorthand format 
        }
        
        forecast(latitude,longitude,(error, forecastData) => {
            if(error){
                return res.send({ error })
            }
           
            res.send({
                forecast: forecastData,
                location,
                adddress: req.query.address   
            });
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query)
    console.log(req.query.search)
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: 'Chiemeka Collins-Ibe',
        errorMessage: 'Help Article not found.'
    });
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: "404 page",
        name: 'Chiemeka Collins-Ibe',
        errorMessage: 'Page not found.'
    });
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});

