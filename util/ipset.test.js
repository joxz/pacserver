const { IPSet, Address4 } = require('futoin-ipset');
//const db = require("../db");
//const Network = db.networks;


const db = require("../db/index.js");
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

const ipset = new IPSet();

db.networks.find()
.then(data => {
    data.forEach(element => {
        let ip = ipset.convertAddress(`${element.network}`);
        ipset.add(ip, element.proxystring);
    });
})
.catch(err => {
    console.log(err);
});
setTimeout(function() {
    console.log("Callback Funktion wird aufgerufen");
    console.log(ipset.match(new Address4('10.0.2.3')));
    console.log(ipset.match(new Address4('192.168.0.3')));
    console.log(ipset.match(new Address4('192.168.1.3')));
    console.log(ipset.match(new Address4('192.168.2.3')));
    db.mongoose.connection.close();
    }, 5000);

