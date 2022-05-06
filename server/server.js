const express = require('express');
const mysql = require('mysql');
var cors = require('cors');

const routes = require('./routes');
const config = require('./config.json');

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

////////////////////////////////////////
/* route 1: selecting all the movie titles that has runtime >= 100mins */
app.get('/longruntime', routes.longruntime);

app.get('/findname', routes.findname);

app.get('/getmovie', routes.getMovie);

app.get('/getactor', routes.getActor);

app.get('/getpopularmovie', routes.getPopularMovie);

app.get('/getrandommovie', routes.getRandomMovie);

app.get('/getqualitymovie', routes.getQualityMovie);

app.get('/findKeyword', routes.findKeyword);

app.get('/getPost', routes.getPost);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
