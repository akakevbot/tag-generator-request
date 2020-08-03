const express = require('express');
const https = require('https');
const app = express();
const port = 3000;
app.use(allowCrossDomain)


app.get('/', (req, res) => { 
    res.send("This is the home page");    
})

app.get('/url/*', (req, res) => {
    if (!req.header('tag') == 'generator'){
        res.send("It doesn't look like you have access to this app. :/");
    }
    //res.send(req.url.split('url/')[1]);
    function getURL(url){
        var opts = require('url').parse(url);
        opts.headers = {
        'User-Agent': 'javascript'
        };

        https.get(opts, (resp) => {
        let data = '';
    
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.send(data);
        });
    
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
    
    }
    getURL(req.url.split('url/')[1])
})

// app.post('/', function (req, res) {
//     let send = {
//         "query": req.query.id
//     }
//     res.send(req.query.id)
//   })

app.listen(process.env.PORT || 5000, () => {
    console.log(`Should be listening`)
})