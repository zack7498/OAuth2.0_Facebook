/*jshint esversion: 6 */
(function() {
  'use strict';


  const express = require('express'); 
  const bodyParser = require('body-parser');
  const compression = require('compression');
  const morgan = require('morgan');
  const timeout = require('connect-timeout'); //用於express設定逾時
  const path = require('path');
  let passport = require('passport');

  const PORT = 7777;
  let app = express();
  require('./mod/passport.js')(passport);

  app.set('trust proxy', 1);;
  app.use(morgan('common'));
  app.use(timeout('20s')); 
  app.use(compression());
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

  app.get('/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      return res.send({
        user : user,
        info : info
      });
    })(req, res, next);
  });

  app.listen(PORT, function() {
    console.log(`Service is ready on port ${PORT}`);
  });
}());
