const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


const dogsController = require('./controllers/dogs.js');
app.use('/dogs', dogsController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// route here that will handle all the errors so basically this
// route will repond to errors 

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
