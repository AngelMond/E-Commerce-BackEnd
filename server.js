//Import express
const express = require('express');

//Import all my routes
const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Turn on routes
app.use(routes);


// // turn on connection to db and server
const init = async () => {
  try {
    await sequelize.sync({force:false});
    console.log('Sucessful connection to the database');

    app.listen(PORT, () => console.log('Express web server now listening'));
  } catch (err) {
    console.log(err);
  }
}

init();