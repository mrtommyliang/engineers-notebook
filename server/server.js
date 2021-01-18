const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const webpack = require('./routes/webpackRoutes.js');
const frontend = require('./routes/frontendRoutes.js');
const backend = require('./routes/backendRoutes.js');
const appconfig = require('./routes/appConfigRoutes.js');
const personal = require('./routes/personalRoutes.js');

// body parsing/url parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve build folder/statically serving client folder
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.use('/api', webpack);
app.use('/api', frontend);
app.use('/api', backend);
app.use('/api', appconfig);
app.use('/api', personal);

// --------- wrapped in if statement -------------
// app.use('/', (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, '../index.html'));
// });
// -----------------------------------------------

// error handling
app.use((req, res) => {
  res.status(400).send("This is not the page you're looking");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught known middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen on port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
