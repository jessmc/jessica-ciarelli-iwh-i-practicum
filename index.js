const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.API_TOKEN;
const OBJECT_ID = '2-269447897';

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://api.hubspot.com/crm/v3/objects/${OBJECT_ID}`, {
            headers: {
                Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
                'Content-Type': 'application/json'
            },
            params: {
                properties: 'name,vision,location'
            }
        });
        const data = response.data.results;
        res.render('homepage', { title: 'Homepage | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// * Code for Route 2 goes here
app.get('/update-cobj', (req, res) => { 
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            "name": req.body.name,
            "vision": req.body.vision,
            "location": req.body.location
        }
    };

    const updateUrl = `https://api.hubspot.com/crm/v3/objects/${OBJECT_ID}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(updateUrl, update, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));