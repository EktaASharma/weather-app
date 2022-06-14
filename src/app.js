const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('../src/utils/forecast');

const app = express();

// const staticPagePath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// app.use(express.static(staticPagePath));

app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ekta Sharma'
    });
})

app.get('/help', (req, res) => {
    // res.send({
    //     "name": "Ekta Sharma",
    //     "age": 27
    // });
    res.render('help', {
        title: "Help Page",
        helpMessage: "This is the help page. Find help here.",
        name: "Ekta Sharma"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Ekta Sharma",
        title: "About Me"
    })
})

app.get('/weather', (req, res) => {
    if (!(req.query.lat && req.query.long)) {
        return res.send({
            error: 'Please provide the latitude and longitude to get the details'
        });
    }
    forecast(req.query.lat, req.query.long, (error, response) => {
        if (error) {
            return res.send({
                error
            });
        }

        res.send(JSON.stringify({ ...response }));

    });

    // res.send({
    //     "forecast": "Weather forecast",
    //     "lat": req.query.lat,
    //     "long": req.query.long
    // });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        name: "Ekta Sharma",
        message: 'Help page not found',
        title: "Help 404"
    })
});

// app.get('*', (req, res) => {
//     res.render('error', {
//         name: "Ekta Sharma",
//         message: 'Page not found 404',
//         title: "Help 404"
//     })
// })

app.listen(3000, () => {
    console.log('App listening on port 3000');
})