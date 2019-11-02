var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var htmlRoutes = require("./controllers/htmlRoutes.js");
app.use(htmlRoutes);
var burgerController = require("./controllers/burgersController.js");
app.use(burgerController);




var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('server started on port ' + PORT);
});