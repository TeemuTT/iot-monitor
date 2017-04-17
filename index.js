
const express = require('express');
const bodyParser = require('body-parser');
const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: process.env.INFLUX_HOST || 'influx',
    database: process.env.INFLUX_DBNAME || 'raspberrypi',
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/data', (req, res) => {
    const data = req.body;
    influx.writePoints([
        {
            measurement: 'temperatures',
            tags: {
                device_description: data.device_description,
                value_description: data.value_description
            },
            fields: {
                device_id: data.device_id,
                value: data.value
            },
        }
        ]).then(() => {
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
    });
});

const port = process.env.PORT || 8081;
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
