const express = require('express');
const logger = require('morgan');


const networksRouter = require('./routes/networks');
const exceptionsRouter = require('./routes/exceptions');
const pacRouter = require('./routes/pac');
const getProxyRouter = require('./routes/getproxy');
const swaggerRouter = require('./routes/swagger');

const app = express();

/* connect to db */
const db = require("./db/db");
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

/* disable X-Powered-By */
app.disable('x-powered-by');

/* middleware */
if (process.env.DEBUG) {
  app.use(logger('dev'));
} else {
  app.use(logger(':date[iso] :remote-addr :req[x-forwarded-for] ":method :url HTTP/:http-version" :status :res[content-length] :response-time[2] ms ":user-agent"'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routes */
app.use('/api/v1/networks', networksRouter);
app.use('/api/v1/exceptions', exceptionsRouter);
app.use('/api/v1/getproxyforip', getProxyRouter);
app.use('/pac/wpad.pac', pacRouter);
app.use('/api-docs', swaggerRouter);

module.exports = app;
