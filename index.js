const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const port = process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.mongoURI, {useNewUrlParser: true})
    .then(() => console.log("Connect to database"),
        (err) => console.log("Unable connect to database", err));

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors);

require('./services/auth/passport')(app);
require('./routing/authRouting')(app);


http.createServer(app).listen(port, () => {
    console.log("Server started on port " + port);
});
