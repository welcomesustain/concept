const express = require('express');
const scaper = require('./scraper');
const app = express();

app.get('/',(req,res) =>{
    res.json({
        message:"Getting there"
    });
});

app.get('/search/:title',(req,res) =>{
    scaper.searchfood(req.params.title)
    .then(foodies =>{
        res.json(foodies);
    });

});


const port = process.env.PORT  || 3000;

app.listen(port, ()=>{
    console.log(`listening to ${port}`);
});