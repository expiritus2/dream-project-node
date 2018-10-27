const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const port = process.env.PORT || 3000;

const passporRouter = require('./services/auth/passport');
const authRouter = require('./routing/authRouting');
const personalAreaRouter = require('./routing/personalAreaRouting');

mongoose.set('useFindAndModify', false);

const options = {
    useNewUrlParser: true,
    useCreateIndex: true
};
mongoose.connect(process.env.mongoURI, options).then(
    () => console.log("Connect to database"),
    (err) => console.log("Unable connect to database", err));

const app = express();
// app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors);

app.use(passporRouter);
app.use('/auth', authRouter);
app.use('/personal-area', personalAreaRouter);


http.createServer(app).listen(port, () => {
    console.log("Server started on port " + port);
});
