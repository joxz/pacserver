const express = require('express');
const logger = require('morgan');


const networksRouter = require('./routes/networks');
const exceptionsRouter = require('./routes/exceptions');
const pacRouter = require('./routes/pac');
const getProxyRouter = require('./routes/getproxy');

const app = express();

/* connect to db */
const db = require("./db/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

/* middleware */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.use('/api/v1/networks', networksRouter);
app.use('/api/v1/exceptions', exceptionsRouter);
app.use('/pac/wpad.pac', pacRouter);
app.use('/api/v1/getproxyforip', getProxyRouter)

module.exports = app;
